<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_System_CTA_API
{
    public $namespace = 'zume_system/v1';
    private static $_instance = null;

    public static function instance()
    {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct()
    {
        if (dt_is_rest()) {
            add_action('rest_api_init', [$this, 'add_api_routes']);
            add_filter('dt_allow_rest_access', [$this, 'authorize_url'], 10, 1);
        }
    }

    public function authorize_url($authorized)
    {
        if (isset($_SERVER['REQUEST_URI']) && strpos(sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])), $this->namespace) !== false) {
            $authorized = true;
        }
        return $authorized;
    }

    public function add_api_routes()
    {
        $namespace = $this->namespace;
        register_rest_route(
            $namespace, '/user_ctas', [
                'methods' => ['GET', 'POST'],
                'callback' => [$this, 'request_sorter'],
                'permission_callback' => '__return_true'
            ]
        );
    }

    public function request_sorter(WP_REST_Request $request)
    {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( is_user_logged_in() ) {
            return $this->user($params);
        } else {
            return $this->guest($params);
        }
    }

    public function user($params)
    {
        if ( ! isset( $params['user_id'], $params['language'] ) ) {
            return new WP_Error( 'no_user_id', 'Missing parames user_id or language', array( 'status' => 400 ) );
        }

        global $zume_languages_by_code;
        $language = $zume_languages_by_code[$params['language']];

        switch_to_locale($language['locale']);

        return self::_get_ctas( $params['user_id'] );
    }
    public static function _get_ctas( $user_id, $log = NULL ) : array
    {
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
            if ( is_null( $log ) ) {
                return [];
            }
        }

        $stage = zume_get_user_stage( $user_id, $log );

        $log_keys = [];
        foreach( $log as $row ) {
            $log_keys[] = $row['log_key'];
        }

        $templates = self::get_ctas();

        $ctas = [];
        foreach($templates as $template) {
            if ( in_array( $stage['value'], $template['stages'] ) ) {
                $ctas[] = $template;
            }
        }
        if ( ! empty( $ctas ) ) {
            foreach( $ctas as $key => $cta ) {
                foreach( $cta['required_keys'] as $required_key) {
                    if ( ! in_array( $required_key, $log_keys ) ) {
                        unset( $ctas[$key] );
                    }
                }
                foreach( $cta['disable_keys'] as $disable_key) {
                    if ( in_array( $disable_key, $log_keys ) ) {
                        unset( $ctas[$key] );
                    }
                }
            }
        }

        return $ctas;
    }

    public function guest( $params )
    {
        $templates = self::get_ctas();

        $ctas = [];
        foreach($templates as $template) {
            if ( in_array( 0, $template['stages'] ) ) {
                $ctas[] = $template;
            }
        }

        return $ctas;
    }

    public static function get_ctas()
    {
        $templates = [
            [
                'stages' => [0],
                'required_keys' => [],
                'disable_keys' => ['system_registered'],
                'key' => 'registered',
                'type' => 'system',
                'subtype' => 'registered',
                'content' => [
                    'title' => __( 'Register', 'zume' ),
                    'description' => __( 'Register to start your training', 'zume' ),
                    'link_text' => __( 'Register', 'zume' ),
                    'link' => zume_login_url(),
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [0,1],
                'required_keys' => [],
                'disable_keys' => ['system_joined_online_training'],
                'key' => 'system_joined_online_training',
                'type' => 'system',
                'subtype' => 'joined_online_training',
                'content' => [
                    'title' => __( 'Join Online Training', 'zume' ),
                    'description' => __( 'Join the online training to learn more', 'zume' ),
                    'link_text' => __( 'Join', 'zume' ),
                    'link' => zume_join_a_public_plan_wizard_url(),
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [2,3,4,5,6],
                'required_keys' => ['system_joined_online_training'],
                'disable_keys' => ['system_celebrated_joining_training'],
                'key' => 'system_celebrated_joining_training',
                'type' => 'system',
                'subtype' => 'celebrated_joining_training',
                'content' => [
                    'title' => __( 'Congratulations!', 'zume' ),
                    'description' => __( 'You joined a training', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1,2,3,4,5,6],
                'required_keys' => [],
                'disable_keys' => ['system_requested_a_coach'],
                'key' => 'system_requested_a_coach',
                'type' => 'system',
                'subtype' => 'requested_a_coach',
                'content' => [
                    'title' => __( 'Get a Coach', 'zume' ),
                    'description' => __( 'Get a coach to help you on your journey', 'zume' ),
                    'link_text' => __( 'Get a Coach', 'zume' ),
                    'link' => zume_get_a_coach_wizard_url(),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1,2,3,4,5,6],
                'required_keys' => ['system_requested_a_coach'],
                'disable_keys' => ['system_celebrated_coach_request'],
                'key' => 'system_celebrated_coach_request',
                'type' => 'system',
                'subtype' => 'celebrated_coach_request',
                'content' => [
                    'title' => __( 'Congratulations!', 'zume' ),
                    'description' => __( 'You have requested a coach', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1],
                'required_keys' => [],
                'disable_keys' => ['system_plan_created'],
                'key' => 'system_plan_created',
                'type' => 'system',
                'subtype' => 'plan_created',
                'content' => [
                    'title' => __( 'Create a Plan', 'zume' ),
                    'description' => __( 'Create a plan to help you grow', 'zume' ),
                    'link_text' => __( 'Create a Plan', 'zume' ),
                    'link' => zume_make_a_plan_wizard_url(),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1,2],
                'required_keys' => ['system_plan_created'],
                'disable_keys' => ['system_celebrate_plan_created'],
                'key' => 'system_celebrate_plan_created',
                'type' => 'system',
                'subtype' => 'celebrate_plan_created',
                'content' => [
                    'title' => __( 'Congratulations!', 'zume' ),
                    'description' => __( 'You have created a training', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [1,2],
                'required_keys' => [],
                'disable_keys' => ['system_invited_friends'],
                'key' => 'system_invited_friends',
                'type' => 'system',
                'subtype' => 'invited_friends',
                'content' => [
                    'title' => __( 'Invite Friends', 'zume' ),
                    'description' => __( 'Invite friends to join you on your journey', 'zume' ),
                    'link_text' => __( 'Invite Friends', 'zume' ),
                    'link' => zume_invite_friends_url(),
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [1,2,3,4,5,6],
                'required_keys' => [],
                'disable_keys' => ['system_set_profile'],
                'key' => 'system_set_profile',
                'type' => 'system',
                'subtype' => 'set_profile',
                'content' => [
                    'title' => __( 'Set Profile', 'zume' ),
                    'description' => __( 'Set your profile to help others know you', 'zume' ),
                    'link_text' => __( 'Set Profile', 'zume' ),
                    'link' => zume_set_profile_wizard(),
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1,2,3,4,5,6],
                'required_keys' => ['system_set_profile'],
                'disable_keys' => ['system_celebrated_set_profile'],
                'key' => 'system_celebrated_set_profile',
                'type' => 'system',
                'subtype' => 'celebrated_set_profile',
                'content' => [
                    'title' => __( 'Congratulations!', 'zume' ),
                    'description' => __( 'Your profile is set', 'zume' ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/thumbs-up.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [2],
                'required_keys' => ['training_26_heard'],
                'disable_keys' => ['system_made_post_training_plan'],
                'key' => 'system_made_post_training_plan',
                'type' => 'system',
                'subtype' => 'made_post_training_plan',
                'content' => [
                    'title' => __( 'Create 3 Month Plan', 'zume' ),
                    'description' => __( 'Create a 3 month plan to help you grow', 'zume' ),
                    'link_text' => __( 'Create 3 Month Plan', 'zume' ),
                    'link' => '/create-3-month-plan',
                ],
                'content_template' => 'card',
            ],
            [
                'stages' => [1,2],
                'required_keys' => ['training_26_heard'],
                'disable_keys' => ['system_celebrated_plan_unlocked'],
                'key' => 'system_celebrated_plan_unlocked',
                'type' => 'system',
                'subtype' => 'celebrated_plan_unlocked',
                'content' => [
                    'title' => __( 'Congratulations!', 'zume' ),
                    'description' => sprintf( __( '%s unlocked', 'zume' ), __( '3 month plan', 'zume' ) ),
                    'image_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '../site/assets/images/unlocked.svg' ),
                ],
                'content_template' => 'celebration',
            ],
            [
                'stages' => [3],
                'required_keys' => [],
                'disable_keys' => ['system_completed_3_month_plan'],
                'key' => 'system_completed_3_month_plan',
                'type' => 'system',
                'subtype' => 'completed_3_month_plan',
                'content' => [
                    'title' => __( 'Complete 3 Month Plan', 'zume' ),
                    'description' => __( 'Complete your 3 month plan to help you grow', 'zume' ),
                    'link_text' => __( 'Complete 3 Month Plan', 'zume' ),
                    'link' => '/complete-3-month-plan',
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [3,4,5,6],
                'required_keys' => [],
                'disable_keys' => [],
                'key' => 'report_practitioner_report',
                'type' => 'report',
                'subtype' => 'practitioner_report',
                'content' => [
                    'title' => __( 'Submit Report', 'zume' ),
                    'description' => __( 'Submit a report to help you grow', 'zume' ),
                    'link_text' => __( 'Submit Report', 'zume' ),
                    'link' => '/submit-report',
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [4,5,6],
                'required_keys' => [],
                'disable_keys' => ['system_joined_affinity_hub'],
                'key' => 'system_joined_affinity_hub',
                'type' => 'system',
                'subtype' => 'joined_affinity_hub',
                'content' => [
                    'title' => __( 'Join a Hub', 'zume' ),
                    'description' => __( 'Join a hub to help you grow', 'zume' ),
                    'link_text' => __( 'Join a Hub', 'zume' ),
                    'link' => '/join-hub',
                ],
                'content_template' => 'card'
            ],


            // HOST triggers
            [
                'stages' => [2],
                'required_keys' => ['training_03_heard'],
                'disable_keys' => ['training_03_shared'],
                'key' => 'training_03_shared',
                'type' => 'training',
                'subtype' => '03_shared',
                'content' => [
                    'title' => __( 'Share Spiritual Breathing', 'zume' ),
                    'description' => __( 'Share Spiritual Breathing with someone', 'zume' ),
                    'link_text' => __( 'Share Spiritual Breathing', 'zume' ),
                    'link' => '/training_03_shared',
                ],
                'content_template' => 'card'
            ],
            [
                'stages' => [2],
                'required_keys' => ['training_08_heard'],
                'disable_keys' => ['training_08_shared'],
                'key' => 'training_08_shared',
                'type' => 'training',
                'subtype' => '08_shared',
                'content' => [
                    'title' => __( 'Share Relational Stewardship', 'zume' ),
                    'description' => __( 'Share Relational Stewardship with someone', 'zume' ),
                    'link_text' => __( 'Share Relational Stewardship', 'zume' ),
                    'link' => '/training_08_shared',
                ],
                'content_template' => 'card',
            ],
        ];
        return $templates;
    }

}
Zume_System_CTA_API::instance();
