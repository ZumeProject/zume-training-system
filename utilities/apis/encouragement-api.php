<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Encouragement_API
{
    public $language_code;
    public $user_id;

    public function __construct()
    {
        if ( ! has_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'] ) ) {
            add_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'], 10, 3 );
            // add_action( 'wp_mail_failed', ['Zume_System_Encouragement_API', 'log_mail_failure'], 10, 1 );
            // add_action( 'wp_mail_succeeded', ['Zume_System_Encouragement_API', 'log_mail_success'], 10, 1 );
        }
    }
    // public static function log_mail_success( $mail_data ) {
    //     dt_write_log( 'Mail sent: ' );
    //     dt_write_log( $mail_data );
    // }
    // public static function log_mail_failure( $error ) {
    //     dt_write_log( 'Mail failed: ' );
    //     dt_write_log( $error );
    // }

    /**
     * Create a new plan for a user
     * 
     * @param int $user_id The ID of the user to create the plan for
     * @param array $new_plan The new plan to create
     * 
     */
    public static function create_plan( $user_id, $new_plan ) {
        global $wpdb;

        if ( ! is_null( $new_plan ) && ! is_array( $new_plan ) ) {
            return;
        }

        $profile = zume_get_user_profile( $user_id );
        $email = $profile['communications_email'];
        $language_code = $profile['preferred_language'];
        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'MIME-Version: 1.0',
            'X-Zume-Email-System: 1.0'
        );
        
        $templates = self::_build_user_templates( $language_code, $user_id );

        // dt_write_log( $new_plan );

        foreach ( $new_plan as $message ) {
            unset( $message['replace_plan'] );
            $message['to'] = $email;
            $message['user_id'] = $user_id;
            $message['lang_code'] = $language_code;
            $message['message'] = self::build_email( $templates[$message['message_post_id']]['body'], $language_code, $user_id );
            $message['subject'] = $templates[$message['message_post_id']]['subject'];
            
            // dt_write_log( $message );
           
            // if immediate is true, send the email immediately
            if ( empty($message['drop_date'] ) ) {
                // dt_write_log( 'Sending email immediately' );
                $sent = wp_mail( $message['to'], $message['subject'], $message['message'], $headers );
                $message['sent'] = $sent;
                // dt_write_log( '$sent' );
                // dt_write_log( $sent );
                // dt_write_log( $message );
            }

            if ( isset( $message['id'] ) ) {
                $wpdb->update( 'zume_dt_zume_message_plan', $message, [ 'id' => $message['id'] ] );
                // dt_write_log( 'Updated message' );
                // dt_write_log( $message );
            } else {
                $wpdb->insert( 'zume_dt_zume_message_plan', $message );
                // dt_write_log( 'Inserted message' );
                // dt_write_log( $message );
            }
        }
    }
    
    /**
     * Read the plan for a user
     * 
     * @param int $user_id The ID of the user to read the plan for
     * @return array The plan for the user
     * 
     */
    public static function read_plan( $user_id ) {

        // Query the message queue in the zume_dt_zume_message_plan table
        // Exclude any sent messages and return the current plan for communication
        global $wpdb;
        
        $current_plan = $wpdb->get_results( $wpdb->prepare(
            "SELECT * 
            FROM zume_dt_zume_message_plan 
            WHERE user_id = %d 
            AND sent = 0 
            ORDER BY drop_date ASC",
            $user_id
        ), ARRAY_A);
        
        // If we have messages in the plan, enrich them with message content
        if (!empty($current_plan)) {
            $messages = self::_query_messages();
            
            foreach ($current_plan as $key => $message) {
                if (isset($messages[$message['message_post_id']])) {
                    $current_plan[$key]['message_content'] = $messages[$message['message_post_id']];
                }
            }
        }
        
        return $current_plan;
    }

    /**
     * Update the plan for a user
     * 
     * @param int $user_id The ID of the user to update the plan for
     * @param string $type The type of plan to update
     * @param string $subtype The subtype of plan to update
     *  
     * @return bool True if the plan was updated, false otherwise
     * 
     */
    public static function update_plan( $user_id, $type, $subtype ) {
        if ( wp_doing_cron() ) {
            // dt_write_log( __METHOD__ . " is running as a cron job" );
            return false;
        }
   
        // get suggested plan from type and subtype 
        $new_plan = self::_get_recommended_plan( $user_id, $type, $subtype );
        // if no plan, return false
        if ( empty( $new_plan ) ) {
            // dt_write_log( "No plan suggested for type: $type, subtype: $subtype" );
            return false;
        }
        // dt_write_log( __METHOD__ );

        // get send messages from user
        $messages = self::_query_user_queue( $user_id );
        $sent_messages = $messages['sent'];
        $scheduled_messages = $messages['scheduled'];

        // remove sent messages from the new plan
        $new_plan = array_filter( $new_plan, function( $message ) use ( $sent_messages ) {
            return !in_array( $message['message_post_id'], array_column( $sent_messages, 'message_post_id' ) );
        });

        // if there are no new messages, return false
        if ( empty( $new_plan ) ) {
            // dt_write_log( "No new messages to add to the plan" );
            return false;
        }

        // check if the new plan and scheduled messages are the same via message_post_id
        $new_plan_ids = array_column( $new_plan, 'message_post_id' );
        $scheduled_ids = array_column( $scheduled_messages, 'message_post_id' );
        // remove duplicates from the new plan that already exist in the scheduled messages
        $new_plan = array_filter( $new_plan, function( $message ) use ( $scheduled_ids ) {
            return !in_array( $message['message_post_id'], $scheduled_ids );
        });

        // if there are no new messages, return false
        if ( empty( $new_plan ) ) {
            // dt_write_log( "No new messages to add to the plan that are not already scheduled" );
            return false;
        }

        // check if new plan has replace_plan set to true
        $replace_plan = array_column( $new_plan, 'replace_plan' );
        $replace_plan = in_array( true, $replace_plan );

        // delete the plan
        if ( $replace_plan ) {
            self::delete_plan( $user_id );
        }
        
        // create the new plan, with the differences
        self::create_plan( $user_id, $new_plan );
        
        // return true
        return true; // plan updated successfully
    }

    /**
     * Delete the plan for a user
     * 
     * @param int $user_id The ID of the user to delete the plan for
     * 
     */
    public static function delete_plan( $user_id ) {
        global $wpdb;
        $wpdb->query( $wpdb->prepare( 'DELETE FROM zume_dt_zume_message_plan WHERE user_id = %d AND ( sent < 1 OR sent IS NULL )', $user_id ) );
    }

    public static function _get_recommended_plan( $user_id, $type, $subtype ) {
        $plan = [];
        

        if ( 'training' === $type && 'registered' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 100044, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                    'replace_plan' => true,
                ],
                [
                    'message_post_id' => 100017, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+1 day' ), // 0 means immediate
                    'replace_plan' => true,
                ],
                [
                    'message_post_id' => 100018, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+2 day' ), // 0 means immediate
                    'replace_plan' => true,
                ],
                [
                    'message_post_id' => 100019, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+4 day' ), // 0 means immediate
                    'replace_plan' => true,
                ],
                
            ];
        }
        else if ( 'system' === $type && 'plan_created' === $subtype ) {
            $plan = [
                [
                    'message_post_id' => 100046, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                    'replace_plan' => true,
                ],
                [
                    'message_post_id' => 100049, // Finish Strong #1
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+2 day' ),
                    'replace_plan' => true,
                ],
                [
                    'message_post_id' => 100050, // Finish Strong #2
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+4 day' ),
                    'replace_plan' => true,
                ],
                
            ];
        }
        else if ( 'coaching' === $type && 'requested_a_coach' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 100045, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                    'replace_plan' => false,
                ],
                
            ];
        }
        else if ( 'training' === $type && in_array( $subtype, ['set_a_01', 'set_b_01', 'set_c_01'] ) ) {
            $plan = [
                
                [
                    'message_post_id' => 100047, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                    'replace_plan' => false,
                ],
                
            ];
        }
        else if ( 'training' === $type && 'made_post_training_plan' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 100055, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                    'replace_plan' => false,
                ],
                
            ];
        }
        

        return $plan;
    }
    /**
     * Query all message templates from the database and organize them by post_id
     *
     * @return array Array of recommended messages for the user
     * 
     * @since 1.0
     */
    public static function _build_user_templates( $language_code, $user_id ) {
        global $wpdb;
        $raw_messages = $wpdb->get_results( "
            SELECT pm.post_id, pm.meta_key, pm.meta_value
            FROM zume_posts p
            LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key NOT IN ('last_modified', '_edit_lock', '_edit_last')
            WHERE p.post_type = 'zume_messages'", ARRAY_A
        );

        $messages = [];

        foreach ( $raw_messages as $message ) {
            if ( !isset( $messages[$message['post_id']] ) ) {
                $messages[$message['post_id']] = [];
            }
            if ( str_ends_with( $message['meta_key'], $language_code ) ) {
                if ( 'es_es' === $language_code ) {
                    $new_key = str_replace( '_es_es', '', $message['meta_key'] );
                    $messages[$message['post_id']][$new_key] = $message['meta_value'];
                } else {
                    $new_key = str_replace( '_'.$language_code, '', $message['meta_key'] );
                    $messages[$message['post_id']][$new_key] = $message['meta_value'];
                }
            }
            if ( 'body' === $message['meta_key'] ) {
                $messages[$message['post_id']]['body'] = self::build_email( $message['meta_value'], $language_code, $user_id );
            }
        }
        // dt_write_log($messages);
       
        return $messages;
    }
   /**
    * Query all messages sent to a user from the database
    *
    * @param int $user_id The ID of the user to get messages for
    * @return array Array of messages sent to the user
    * 
    * @since 1.0
    */
    public static function _query_user_queue( $user_id ) {
        global $wpdb, $table_prefix;
        $messages = [
            'sent' => [],
            'scheduled' => [],
        ];

        $sent_messages = $wpdb->get_results( $wpdb->prepare(
            'SELECT * FROM zume_dt_zume_message_plan WHERE user_id = %d',
            $user_id
        ), ARRAY_A );

        foreach ( $sent_messages as $value ) {
            if ( $value['sent'] ) {
                $messages['sent'][] = $value;
            } else {
                $messages['scheduled'][] = $value;
            }
        }
        
        return $messages;
    } 


    public static function build_email( $message, $language_code, $user_id ){
        
        $email = self::email_head_part();
        $email .= self::email_content_part( $message );
        $email .= self::email_footer_part();

        $email_with_placeholders = zume_replace_placeholder( $email, $language_code, $user_id );

        return $email_with_placeholders;
    }

    public static function email_head_part(){
        global $zume_user_profile;
        ob_start();
        ?>
        <html>
        <head>
            <style>
               
                #zmail{
                    font-family:Arial,Helvetica,sans-serif;
                    color:#333;
                    font-size:16px;
                    line-height:1.55;
                    -webkit-text-size-adjust:100%;
                    width:100%;
                    max-width:600px;
                    margin:0 auto;
                }

                /*—Body copy container—*/
                #zmail .zmail-body{
                }

                /*—Top bar—*/
                #zmail .zmail-topbar{
                    background:#008cc7;
                    color:#fff;
                    padding:12px 16px;
                    text-align:center;
                }
                #zmail .zmail-logo img{
                    max-height:48px;
                    width:auto;
                    display:block;
                    margin:0 auto;
                }

                /*—Headings—*/
                #zmail h3{
                    margin:24px 0 8px;
                    font-size:20px;
                    font-weight:700;
                    color:#008cc7;
                }

                /*—Buttons—*/
                #zmail .button{
                    display:inline-block;
                    text-decoration:none;
                    text-transform:uppercase;
                    font-weight:600;
                    font-size:14px;
                    padding:8px 40px;
                    border-radius:999px;
                    cursor:pointer;
                }
                /* primary (filled) */
                #zmail .button--primary{
                    background:#008cc7;
                    color:#fff !important;
                    border:2px solid #008cc7;
                }
                #zmail .button.small {
                    background:#008cc7;
                    color:#fff !important;
                    border:2px solid #008cc7;
                }
                #zmail .button.medium {
                    background:#008cc7;
                    color:#fff !important;
                    border:2px solid #008cc7;
                }
                #zmail .button.large {
                    background:#008cc7;
                    color:#fff !important;
                    border:2px solid #008cc7;
                }
                /* secondary (outline) */
                #zmail .button--secondary{
                    background:#ffffff;
                    color:#008cc7 !important;
                    border:2px solid #008cc7;
                }

                /*—Lists—*/
                #zmail ul{
                    margin:0 0 16px 0;
                    padding:0;
                }
                #zmail ul li{
                    margin:0 0 8px 20px;
                    padding:0;
                    line-height:1.5;
                    list-style-type:disc;
                }

                /*—Strong / emphasis—*/
                #zmail strong{
                    font-weight:700;
                    color:#008cc7;
                }

                /*—Footer—*/
                #zmail .zmail-footer{
                    background:#f2f7fa;
                    border-top:1px solid #dfe7ec;
                    text-align:center;
                    padding:24px 12px;
                    font-size:13px;
                    color:#666;
                }
                #zmail .zmail-footer a{
                    color:#008cc7;
                    text-decoration:none;
                }
                #zmail .zmail-footer a:hover{
                    text-decoration:underline;
                }
            </style>
        </head>
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

    public static function email_content_part( $message ){
        global $zume_user_profile;
        ob_start();
        ?>
        <body>
            <div id="zmail">
                <header class="zmail-header">
                    <div class="zmail-topbar" style="margin-bottom:20px;">
                        <div class="zmail-logo"><img src="<?php echo esc_url( zume_mirror_url() . 'images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                    </div>
                </header>
                <?php
                if ( isset( $zume_user_profile['has_set_name'] ) && $zume_user_profile['has_set_name'] ) {
                    ?>
                    <div class="zmail-body">
                        <?php echo wp_kses( $zume_user_profile['name'], 'post' ) ?>,
                    </div>
                    <?php
                } else {
                    ?>
                    <div class="zmail-body">
                        <?php echo esc_html__( 'Friend', 'zume' ) ?>
                    </div>
                    <?php
                }
                ?>
                <div class="zmail-body">
                    <?php echo wp_kses( $message, 'post' ) ?>
                </div>
                <div class="zmail-footer-divider"></div>
                <div class="zmail-footer">
                    <p><img src="<?php echo esc_url( zume_mirror_url() . 'images/zume-training-logo.svg' ) ?>" alt="logo" style="height:40px; margin: 1em auto;"></p>
                    <p><?php echo esc_html__( 'Zúme Training exists to saturate the globe with multiplying disciples in our generation.', 'zume' ) ?></p>
                    <p>
                        [link_dashboard]<br>
                        [magiclink_preferences]<br>
                    </p>
                    <p style="width:90%;margin:0 auto;">
                        [link_getacoach]
                        | [link_joincommunity]
                        | [link_checkin]
                        | <a href="<?php echo esc_url( zume_donate_url() ); ?>"><?php echo esc_html__( 'Donate', 'zume' ) ?></a><br>
                        109 S. Main Street, Mooreland, OK 73852 USA
                    </p>
                </div>
            </div> 
        </body>
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

    public static function email_footer_part(){
        ob_start();
        ?>
        </html>
        <?php
        $html = ob_get_contents();
        ob_end_clean();
        return $html;
    }

    /**
     * Query messages by date and get the oldest message per user
     * 
     * @param string $date The date to query messages for (format: Y-m-d)
     * @return array Array of messages with one message per user (the oldest one)
     */
    public static function query_messages_by_date($date) {
        global $wpdb;
        
        // Convert date to timestamp for comparison
        $timestamp = strtotime($date);
        if (!$timestamp) {
            return [];
        }
        
        // Query to get the oldest message per user for the given date
        $sql = $wpdb->prepare(
            "SELECT m1.* 
            FROM zume_dt_zume_message_plan m1
            INNER JOIN (
                SELECT user_id, MIN(drop_date) as oldest_drop_date
                FROM zume_dt_zume_message_plan
                WHERE DATE(FROM_UNIXTIME(drop_date)) = DATE(FROM_UNIXTIME(%d))
                GROUP BY user_id
            ) m2 ON m1.user_id = m2.user_id AND m1.drop_date = m2.oldest_drop_date
            WHERE DATE(FROM_UNIXTIME(m1.drop_date)) = DATE(FROM_UNIXTIME(%d))
            ORDER BY m1.drop_date ASC",
            $timestamp,
            $timestamp
        );
        
        $messages = $wpdb->get_results($sql, ARRAY_A);
        
        // If we have messages, enrich them with message content
        if (!empty($messages)) {
            $message_templates = self::_query_messages();
            
            foreach ($messages as $key => $message) {
                if (isset($message_templates[$message['message_post_id']])) {
                    $messages[$key]['message_content'] = $message_templates[$message['message_post_id']];
                }
            }
        }
        
        return $messages;
    }

    /**
     * Query message templates from the database
     * 
     * @return array Array of message templates indexed by post_id
     */
    private static function _query_messages() {
        global $wpdb;
        
        $sql = "SELECT ID, post_content 
                FROM {$wpdb->posts} 
                WHERE post_type = 'zume_message' 
                AND post_status = 'publish'";
        
        $results = $wpdb->get_results($sql, ARRAY_A);
        
        $messages = [];
        foreach ($results as $result) {
            $messages[$result['ID']] = $result['post_content'];
        }
        
        return $messages;
    }
}
new Zume_System_Encouragement_API;


