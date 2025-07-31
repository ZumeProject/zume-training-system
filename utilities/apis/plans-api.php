<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}

class Zume_Plans_Endpoints
{
    private $namespace;
    private static $post_type = 'zume_plans';
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
            $this->namespace = 'zume_system/v1';
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        }
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/plans', [
                'methods' => 'GET',
                'callback' => [ $this, 'list_plans' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/(?P<code>\w+)', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'POST',
                'callback' => [ $this, 'create_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/(?P<code>\w+)', [
                'methods' => 'PUT',
                'callback' => [ $this, 'update_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan', [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete_plan' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/completed-sessions', [
                'methods' => 'GET',
                'callback' => [ $this, 'completed_sessions' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/edit-session', [
                'methods' => 'POST',
                'callback' => [ $this, 'edit_session' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/plan/complete-session', [
                'methods' => 'POST',
                'callback' => [ $this, 'mark_session_complete' ],
                'permission_callback' => 'is_user_logged_in',
            ]
        );
        register_rest_route(
            $this->namespace, '/public_plans', [
                'methods' => 'POST',
                'callback' => [ $this, 'public_plans' ],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function list_plans( WP_REST_Request $request ){
        $user_id = get_current_user_id();

        return zume_get_user_plans( $user_id );
    }
    public function get_plan( WP_REST_Request $request ) {
        /* Get the plan */
        $code = $request['code'];

        $user_id = get_current_user_id();
        $post_id = Zume_Plans_Model::can_user_access_plan( $code, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        return Zume_Plans_Model::get_plan( $post_id );
    }
    public function create_plan( WP_REST_Request $request ){
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $title = $params['title'];
        $user_id = $params['user_id'];
        $contact_id = $params['contact_id'];
        $set_type = isset( $params['set_type'] ) ? $params['set_type'] : '';
        $set = $params['set'];

        return Zume_Plans_Model::create_plan( $title, $user_id, $contact_id, $set_type, $set );
    }
    public function update_plan( WP_REST_Request $request ){
        $code = $request['code'];
        $params = dt_recursive_sanitize_array( $request->get_params() );

        $post_id = Zume_Plans_Model::can_user_edit_plan( $code );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        return Zume_Plans_Model::update_plan( $post_id, $params );
    }
    public function delete_plan( WP_REST_Request $request ) {
        if ( ! is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $params = dt_recursive_sanitize_array( $request->get_params() );
        if ( ! isset( $params['key'], $params['user_id'] ) ) {
            return new WP_Error( __METHOD__, 'key and user_id required.', array( 'status' => 401 ) );
        }
        $user_id = zume_validate_user_id_request( $params['user_id'] );
        if ( is_wp_error( $user_id ) ) {
            return $user_id;
        }

        $post_id = Zume_Plans_Model::can_user_edit_plan( $params['key'], $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        return Zume_Plans_Model::delete_plan( $params['type'], $params['subtype'], $user_id );
    }

    public function completed_sessions( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['post_id'] ) || empty( $params['post_id'] ) ) {
            return new WP_Error( __METHOD__, 'post_id required', array( 'status' => 401 ) );
        }

        return Zume_Plans_Model::get_completed_sessions( $params['post_id'] );
    }
    public function edit_session( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['session_id'], $params['key'] ) ) {
            return new WP_Error( __METHOD__, 'session_id and key required', array( 'status' => 401 ) );
        }

        $user_id = get_current_user_id();
        if ( !$user_id ) {
            return new WP_Error( 'not-authorized', 'you are not authenticated', array( 'status' => 400 ) );
        }

        $key = $params['key'];
        $post_id = Zume_Plans_Model::can_user_edit_plan( $key, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        $meta_key = $params['session_id'];
        $meta_value = $params['session_time'];

        return Zume_Plans_Model::edit_session( $post_id, $meta_key, $meta_value );
    }
    public function mark_session_complete( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( !isset( $params['session_id'], $params['key'] ) ) {
            return new WP_Error( __METHOD__, 'session_id and key required', array( 'status' => 401 ) );
        }
        $session_id = $params['session_id'];
        $key = $params['key'];

        $completed = isset( $params['completed'] ) && $params['completed'] === 'false' ? false : true;

        // access check
        $user_id = get_current_user_id();
        $post_id = Zume_Plans_Model::can_user_edit_plan( $key, $user_id );
        if ( is_wp_error( $post_id ) ) {
            return $post_id;
        }

        // return new list
        return Zume_Plans_Model::mark_session_complete( $post_id, $session_id, $completed );
    }

    public function public_plans( WP_REST_Request $request ){
        return Zume_Plans_Model::get_public_plans();
    }
}
Zume_Plans_Endpoints::instance();
