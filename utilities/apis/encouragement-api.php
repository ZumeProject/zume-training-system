<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_Encouragement_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function __construct()
    {
        add_action( 'zume_update_encouragement_plan', [$this, '_update_encouragement_plan'], 10, 3 );
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [$this, 'add_api_routes'] );
            add_filter( 'dt_allow_rest_access', [$this, 'authorize_url'], 10, 1 );
        }
    }
    
    public function authorize_url( $authorized )
    {
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
    public function add_api_routes()
    {
        $namespace = $this->namespace;
        register_rest_route(
            $namespace, '/encouragement/get', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'request_sorter'],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/send_encouragement', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'send_encouragement'],
                'permission_callback' => '__return_true',
            ]
        );
        register_rest_route(
            $namespace, '/respond_encouragement', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'respond_encouragement'],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function request_sorter( WP_REST_Request $request )
    {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( is_user_logged_in() ) {
            return $this->user( $params );
        } else {
            return $this->guest( $params );
        }
    }
    public function user( $params )
    {
        if ( ! isset( $params['user_id'] ) ) {
            $user_id = get_current_user_id();
        }
        else {
            $user_id = $params['user_id'];
        }
        return self::get_plan( $user_id );
    }
    public static function get_plan( $user_id ) {

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

    public function _update_encouragement_plan( $user_id, $type, $subtype ) {
        self::update_plan( $user_id, $type, $subtype );
    }
    public static function update_plan( $user_id, $type, $subtype ) {
        if ( wp_doing_cron() ) {
            dt_write_log( __METHOD__ . " is running as a cron job" );
            return false;
        }

        // get the recommended plan
        $potential_plans = self::_get_recommended_plan( $user_id, $type, $subtype );
        if ( empty( $potential_plans ) ) {
            return false; // no plan suggested
        }
        $potential_plan_ids = array_unique(array_column($potential_plans, 'message_post_id'));

        // compare the potential plan to the raw plan
        $raw_plan = self::_query_user_messages( $user_id );
        $raw_plan_ids = array_unique(array_column( $raw_plan, 'message_post_id' ));
        
        $new_plan = array_diff( $potential_plan_ids, $raw_plan_ids );
        if ( empty( $new_plan ) ) {
            return false; // no new plan to install
        }

        $install_plan = array_filter( $potential_plans, function( $message ) use ( $new_plan ) {
            return in_array( $message['message_post_id'], $new_plan );
        });

        self::delete_current_plan( $user_id );
        self::_install_plan( $user_id, $install_plan );

        return true; // plan installed
    }
    public static function delete_current_plan( $user_id ) {
        global $wpdb, $table_prefix;
        $wpdb->query( $wpdb->prepare( 'DELETE FROM zume_dt_zume_message_plan WHERE user_id = %s AND sent IS NULL', $user_id ) );
    }





    public static function _install_plan( $user_id, $install_plan ) {
        dt_write_log( __METHOD__ );
        dt_write_log( $install_plan );
        // return true;

        global $wpdb;

        if ( ! is_null( $install_plan ) && ! is_array( $install_plan ) ) {
            return;
        }

        // $user = get_user_by( 'id', $user_id );
        foreach ( $install_plan as $message ) {

            // if immediate is true, send the email immediately
            if ( 0 === $message['drop_date'] ) {
                dt_schedule_mail( $message['to'], $message['subject'], $message['message'], $message['headers'] );
                $message['sent'] = true;
                $wpdb->insert( 'zume_dt_zume_message_plan', $message );
            }
            else {
                $wpdb->insert( 'zume_dt_zume_message_plan', $message );
            }
        }
    }
    
   
   
    public static function _query_user_messages( $user_id ) {
        global $wpdb, $table_prefix;
        $sent_messages = $wpdb->get_results( $wpdb->prepare(
            'SELECT * FROM zume_dt_zume_message_plan WHERE user_id = %d',
            $user_id
        ), ARRAY_A );

        return $sent_messages;
    }

    /**
     * Process the message queue for all users
     * This function is designed to be called by a cron job
     * It will find all messages that are due to be sent and send them
     * 
     * @return array Results of processing
     */
    public static function process_message_queue() {
        global $wpdb;
        
        $current_time = time();
        $results = [
            'processed' => 0,
            'sent' => 0,
            'errors' => 0,
            'details' => []
        ];
        
        // Get all messages that are due to be sent
        $messages = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM zume_dt_zume_message_plan 
                WHERE drop_date <= %d 
                AND sent IS NULL",
                $current_time
            ),
            ARRAY_A
        );
        
        $results['processed'] = count($messages);
        
        foreach ($messages as $message) {
            // Get user email if not specified in the message
            if (empty($message['to'])) {
                $user = get_user_by('id', $message['user_id']);
                if ($user) {
                    $message['to'] = $user->user_email;
                } else {
                    // Log error - user not found
                    $results['errors']++;
                    $results['details'][] = [
                        'error' => 'User not found',
                        'message_id' => $message['id'],
                        'user_id' => $message['user_id']
                    ];
                    continue;
                }
            }
            
            // Send the email
            $sent = dt_schedule_mail(
                $message['to'],
                $message['subject'],
                $message['message'],
                $message['headers']
            );
            
            if ($sent) {
                // Update the message as sent
                $wpdb->update(
                    'zume_dt_zume_message_plan',
                    ['sent' => 1],
                    ['id' => $message['id']]
                );
                $results['sent']++;
            } else {
                $results['errors']++;
                $results['details'][] = [
                    'error' => 'Failed to send email',
                    'message_id' => $message['id'],
                    'user_id' => $message['user_id']
                ];
            }
        }
        
        return $results;
    }
    public static function _get_recommended_plan( $user_id, $type, $subtype ) {
        $plan = [];
        $profile = zume_get_user_profile( $user_id );
        $messages = self::_query_messages();
        $email = $profile['communications_email'];
        $language_code = $profile['preferred_language'];
        $headers = ['Content-Type: text/html; charset=UTF-8'];

        if ( 'training' === $type && 'registered' === $subtype ) {
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 100017, // new registration email
                    'message_type' => 'email',
                    'to' => $email,
                    'subject' => get_post_meta( 100017, 'subject_'.$language_code, true ),
                    'message' => get_post_meta( 100017, 'body_'.$language_code, true ),
                    'headers' => '',
                    'drop_date' => 0, // 0 means immediate
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23606,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Registered Post 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23607,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Registered Post 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+3 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23608,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Registered Post 4 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+1 week' ),
                // ],
            ];
        }
        else if ( 'system' === $type && 'plan_created' === $subtype ) {

            
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 100046,
                    'message_type' => 'email',
                    'to' =>  $email,
                    'subject' => $messages[100046]['subject_'.$profile['preferred_language']],
                    'message' => $messages[100046]['body_'.$profile['preferred_language']],
                    'headers' => $headers,
                    'drop_date' => 0, // 0 means immediate
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 100046,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Plan Created Post 1 Day',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+1 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23632,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Plan Created Post 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
            ];
            
        }
        else if ( 'system' === $type && 'training_completed' === $subtype ) {
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 23631,
                    'message_type' => 'email',
                    'to' => '',
                    'subject' => 'Training Completed Post 1 Day',
                    'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                    'headers' => '',
                    'drop_date' => strtotime( '+1 day' ),
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 236382,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Training Completed Post 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 236933,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Training Completed Post 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
            ];
        }
        else if ( 'system' === $type && 'first_practitioner_report' === $subtype ) {
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 2343,
                    'message_type' => 'email',
                    'to' => '',
                    'subject' => 'Post First Practitioner Report  1 Day',
                    'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                    'headers' => '',
                    'drop_date' => strtotime( '+1 day' ),
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23644,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Post First Practitioner Report 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23634,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Post First Practitioner Report 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23624,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Post First Practitioner Report 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23643,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'Post First Practitioner Report 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
            ];
        }
        else if ( 'system' === $type && 'mawl_completed' === $subtype ) {
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 23645,
                    'message_type' => 'email',
                    'to' => '',
                    'subject' => 'MAWL Completed 1 Day',
                    'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                    'headers' => '',
                    'drop_date' => strtotime( '+1 day' ),
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23655,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'MAWL Completed 2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23656,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'MAWL Completed 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23657,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'MAWL Completed 4 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23658,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'MAWL Completed 5 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
            ];
        }
        else if ( 'system' === $type && 'seeing_generational_fruit' === $subtype ) {
            $plan = [
                [
                    'user_id' => $user_id,
                    'message_post_id' => 23667,
                    'message_type' => 'email',
                    'to' => '',
                    'subject' => 'seeing_generational_fruit 1 Day',
                    'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                    'headers' => '',
                    'drop_date' => strtotime( '+1 day' ),
                ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23677,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'seeing_generational_fruit2 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
                // [
                //     'user_id' => $user_id,
                //     'message_post_id' => 23678,
                //     'message_type' => 'email',
                //     'to' => '',
                //     'subject' => 'seeing_generational_fruit 3 Days',
                //     'message' => 'laskjdf ;laskd jf;alskj df;aslkd jf;laskj df;laskj d;flaskj d;flaks djf;l',
                //     'headers' => '',
                //     'drop_date' => strtotime( '+2 day' ),
                // ],
            ];
        }

        return $plan;
    }
    public static function _query_messages() {
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
            $messages[$message['post_id']][$message['meta_key']] = $message['meta_value'];
        }
        // dt_write_log($messages);

        return $messages;
    }
   



    public function send_encouragement( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        return $params;
    }
    public function respond_encouragement( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        return $params;
    }

    public function guest( $params )
    {
        return [];
    }
}
Zume_System_Encouragement_API::instance();
