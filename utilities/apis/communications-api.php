<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Communications_API
{
    public $permissions = [ 'access_contacts' ];
    public $namespace = 'zume_system/v1';
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function __construct() {
        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
            add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        }
    }
    public function add_api_routes() {
        $namespace = $this->namespace;

        register_rest_route(
            $namespace, '/send_email_to_subscribers', [
                'methods'  => [ 'GET', 'POST' ],
                'callback' => [ $this, 'send_email_to_subscribers' ],
                'permission_callback' => function () {
                    return dt_has_permissions( $this->permissions );
                },
            ]
        );
    }

    public function send_email_to_subscribers( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['join_key'] ) ) {
            return new WP_Error( 'missing_join_key', 'Join key is required', [ 'status' => 400 ] );
        }

        $post_id = Zume_Plans_Model::can_user_access_plan( $params['join_key'], get_current_user_id() );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $logs = zume_get_user_log( get_current_user_id(), 'system', 'email_notification' );
        $has_emailed = array_search( $post_id, array_column( $logs, 'post_id' ) );
        if ( false !== $has_emailed ) {
            return new WP_Error( 'email_already_sent', 'Email already sent', [ 'status' => 400 ] );
        }

        $training = Zume_Plans_Model::get_plan( $post_id );

        $subscribers = zume_get_notification_subscribers();

        foreach ( $subscribers['posts'] as $subscriber ) {
            $email = $subscriber['user_email'];
            $name = $subscriber['name'];
            $message = $this->create_email_message( $training, $name );

            wp_queue()->push( new Zume_Email_Job( $email, $message ) );
        }

        zume_log_insert( 'system', 'email_notification', [
            'post_id' => $post_id,
        ] );

        DT_Posts::add_post_comment( 'zume_plans', $post_id, 'Email notification sent to subscribers of new public plans' );

        return [
            'timestamp' => time(),
        ];
    }

    private function create_email_message( $training, $name ) {
        $email = [
            'subject' => 'Zume Training',
            'body' => 'This is a test email.',
        ];
        $email['subject'] = 'New online Zume Training Available';

        $course_type = '';
        switch ( $training['set_type']['key'] ) {
            case 'set_b':
                $course_type = '20 session';
                break;
            case 'set_c':
                $course_type = 'intensive 5 day';
                break;
            case 'set_a':
            default:
                $course_type = '10 session';
        }
        $public_training_url = zume_join_a_public_plan_url();
        $join_training_url = zume_join_a_public_plan_wizard_url( $training['join_key'] );
        $first_session_date = $training[ $training['set_type']['key'] . '_01' ]['formatted'];
        $email['body'] = '
        <p>Hello ' . $name . ',</p>
        <p>A new online Zume Training is now available. You can view it at the following link: ' . $public_training_url . '</p>
        <p>The training is in the ' . $course_type . ' format and will be held in ' . $training['location_note'] . '.</p>
        <p>First session: ' . $training['time_of_day_note'] . ' ' . $first_session_date . ' (' . $training['timezone_note'] . ').</p>
        <p>You can also join the training by clicking the link below:</p>
        <a href="' . $join_training_url . '" class="btn-primary">Join the Training</a>
        <p>The training will be led by ' . $training['language_note'] . ' speakers.</p>
        <p>Best regards,</p>
        <p>The Zume Team</p>
        ';

        return $email;
    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_Communications_API::instance();
