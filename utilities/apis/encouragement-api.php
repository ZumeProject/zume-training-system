<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Encouragement_API
{
    public function __construct()
    {
        if ( ! has_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'] ) ) {
            add_action( 'zume_update_encouragement_plan', ['Zume_System_Encouragement_API', 'update_plan'], 10, 3 );
            add_action( 'wp_mail_failed', ['Zume_System_Encouragement_API', 'log_mail_failure'], 10, 1 );
            add_action( 'wp_mail_succeeded', ['Zume_System_Encouragement_API', 'log_mail_success'], 10, 1 );
        }
    }
    
    public static function create_plan( $user_id, $new_plan ) {
        global $wpdb;

        if ( ! is_null( $new_plan ) && ! is_array( $new_plan ) ) {
            return;
        }

        $profile = zume_get_user_profile( $user_id );
        $email = $profile['communications_email'];
        $language_code = $profile['preferred_language'];
        $headers = ['Content-Type: text/html; charset=UTF-8; X-Zume-Email-System: Zume'];
        $templates = self::_query_messages( $language_code );

        foreach ( $new_plan as $message ) {
            $message['to'] = $email;
            $message['headers'] = $headers;
            $message['user_id'] = $user_id;
            // $message['body'] = $templates[$message['message_post_id']]['body'];
            $message['message'] = Encouragement_Email_Template::build_email( $templates[$message['message_post_id']]['body'] );
            $message['subject'] = $templates[$message['message_post_id']]['subject'];
            
            // dt_write_log( $message );
           
            // if immediate is true, send the email immediately
            if ( 0 === $message['drop_date'] ) {
                dt_write_log( 'Sending email immediately' );
                $sent = wp_mail( $message['to'], $message['subject'], $message['message'], $message['headers'] );
                $message['sent'] = $sent;
            }

            if ( isset( $message['id'] ) ) {
                $wpdb->update( 'zume_dt_zume_message_plan', $message, [ 'id' => $message['id'] ] );
            } else {
                $wpdb->insert( 'zume_dt_zume_message_plan', $message );
            }
        }
    }
    public static function log_mail_success( $mail_data ) {
        dt_write_log( 'Mail sent: ' . $mail_data['to'] );
    }
    public static function log_mail_failure( $error ) {
        dt_write_log( 'Mail failed: ' . $error );
    }
    
    public static function read_plan( $user_id ) {

        // Query the message queue in the zume_dt_zume_message_plan table
        // Exclude any sent messages and return the current plan for communication
        global $wpdb;
        
        $current_plan = $wpdb->get_results($wpdb->prepare(
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

    public static function update_plan( $user_id, $type, $subtype ) {
        if ( wp_doing_cron() ) {
            dt_write_log( __METHOD__ . " is running as a cron job" );
            return false;
        }
        dt_write_log( __METHOD__ );
        // check for plans for type and subtype
        $potential_plans = self::_get_recommended_plan( $user_id, $type, $subtype );
        if ( empty( $potential_plans ) ) {
            dt_write_log( "No plan suggested for type: $type, subtype: $subtype" );
            return false; // no plan suggested
        }
        $potential_plan_ids = array_unique( array_column( $potential_plans, 'message_post_id' ) );
        
        // get current sent messages and plan messages
        $raw_plan = self::_query_user_messages( $user_id );
        $raw_plan_ids = array_unique( array_column( $raw_plan, 'message_post_id' ) );
        
        // compare the two arrays
        $plan_diff = array_diff( $potential_plan_ids, $raw_plan_ids );
        
        // if there are no differences, return false
        if ( empty( $plan_diff ) ) {
            dt_write_log( "No new messages to add to the plan" );
            return false;
        }

        dt_write_log( $plan_diff );
        
        // if there are differences, get the differences
        $new_plan = array_filter( $potential_plans, function( $message ) use ( $plan_diff ) {
            return in_array( $message['message_post_id'], $plan_diff );
        });
        
        // delete the plan
        self::delete_plan( $user_id );
        
        // create the new plan, with the differences
        self::create_plan( $user_id, $new_plan );
        
        // return true
        return true; // plan updated successfully

    }

    public static function delete_plan( $user_id ) {
        global $wpdb, $table_prefix;
        $wpdb->query( $wpdb->prepare( 'DELETE FROM zume_dt_zume_message_plan WHERE user_id = %s AND sent IS NULL', $user_id ) );
    }

    public static function _get_recommended_plan( $user_id, $type, $subtype ) {
        $plan = [];
        

        if ( 'training' === $type && 'registered' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 100017, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'plan_created' === $subtype ) {
            $plan = [
                [
                    'message_post_id' => 100046, // New Training Created
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                [
                    'message_post_id' => 100049, // Finish Strong #1
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+2 day' ),
                ],
                [
                    'message_post_id' => 100050, // Finish Strong #2
                    'message_type' => 'email',
                    'drop_date' => strtotime( '+4 day' ),
                ],
                
            ];
        }
        else if ( 'system' === $type && 'training_completed' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 23631, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'first_practitioner_report' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 2343, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
                
            ];
        }
        else if ( 'system' === $type && 'mawl_completed' === $subtype ) {
            $plan = [
                
                [
                    'message_post_id' => 23645, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
                ],
               
            ];
        }
        else if ( 'system' === $type && 'seeing_generational_fruit' === $subtype ) {
            $plan = [ 
                [
                    'message_post_id' => 23667, 
                    'message_type' => 'email',
                    'drop_date' => 0, // 0 means immediate
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
    public static function _query_messages( $language_code ) {
        global $wpdb;
        $raw_messages = $wpdb->get_results( "
            SELECT pm.post_id, pm.meta_key, pm.meta_value
            FROM zume_posts p
            LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key NOT IN ('last_modified', '_edit_lock', '_edit_last')
            WHERE p.post_type = 'zume_messages'", ARRAY_A
        );

        foreach ( $raw_messages as $message ) {
            if ( !isset( $messages[$message['post_id']] ) ) {
                $messages[$message['post_id']] = [];
            }
            if ( str_ends_with( $message['meta_key'], $language_code ) ) {
                $new_key = str_replace( '_'.$language_code, '', $message['meta_key'] );
                $messages[$message['post_id']][$new_key] = $message['meta_value'];
            }
            if ( 'body' === $message['meta_key'] ) {
                $messages[$message['post_id']]['body'] = Encouragement_Email_Template::build_email( $message['meta_value'] );
            }
        }
        // dt_write_log($messages);
       
        return $messages;
    }
    /**
     * Query all messages sent to a user from the database
     *
     * @param int $user_id The user ID to get messages for
     * @return array Array of messages sent to the user
     * 
     * @since 1.0
     */
    public static function _query_user_messages( $user_id ) {
        global $wpdb, $table_prefix;
        $sent_messages = $wpdb->get_results( $wpdb->prepare(
            'SELECT * FROM zume_dt_zume_message_plan WHERE user_id = %d',
            $user_id
        ), ARRAY_A );

        return $sent_messages;
    } 
}
new Zume_System_Encouragement_API;


class Encouragement_Email_Template {


    public static function build_email( $content ){

        $email = self::email_head_part();
        $email .= $content;
        $email .= self::email_footer_part();
        return $email;
    }


    public static function email_head_part(){
        return '';

        ob_start();
        ?>
        
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_logo_part( $campaign_id, $logo_url = null ){
        $logo_url = self::get_email_logo_url( $campaign_id, $logo_url );
        ob_start();
        ?>
        
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_content_part( $content ){
        ob_start();
        ?>

        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_greeting_part( $content ){
        ob_start();
        ?>
        
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_button_part( $button_text, $button_url, $button_color = '#dc3822' ){

        ob_start();
        ?>
        
        <?php
        $part = ob_get_clean();
        return $part;
    }

    public static function email_footer_part(){
        return '';

        ob_start();
        ?>
        
        <?php
        $part = ob_get_clean();
        return $part;
    }
}
