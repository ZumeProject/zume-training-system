<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Get_A_Coach_Endpoints
{
    public $permissions = [ 'access_contacts' ];
    public $namespace = 'zume_system/v1';
    const SITE_CONNECTION_POST_ID = 20125;
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
            $namespace, '/get_a_coach', [
                'methods'  => [ 'GET', 'POST' ],
                'callback' => [ $this, 'get_a_coach' ],
                'permission_callback' => function () {
                    return dt_has_permissions( $this->permissions );
                },
            ]
        );
    }

    public function get_a_coach( WP_REST_Request $request ) {
        $params = dt_recursive_sanitize_array( $request->get_params() );

        if ( ! isset( $params['user_id'] ) ) {
            if ( is_user_logged_in() ) {
                $params['user_id'] = get_current_user_id();
            } else {
                return new WP_Error( 'no_user_id', 'No user id provided', array( 'status' => 400 ) );
            }
        }

        if ( !isset( $params['data'] ) ) {
            return new WP_Error( 'no_data', 'No data provided', array( 'status' => 400 ) );
        }

        // create coaching request
        $coaching_result = self::register_request_to_coaching( $params['user_id'], $params['data'] );

        if ( is_wp_error( $coaching_result ) ) {
            return $coaching_result;
        }

        return [
            'coach_request' => $coaching_result,
        ];
    }

    public static function register_request_to_coaching( $user_id, $data = [] ) {
        return self::manage_user_coaching( $user_id, null, $data );
    }

    /**
     * Creates/updates user's coaching contact.
     *
     * If the coaching contact already exists, this function will update it.
     * If it doesn't already exist it will be created.
     *
     * @param int $user_id
     * @param int $coach_id
     */
    private static function manage_user_coaching( $user_id, $coach_id = null, $data = [] )
    {
        $update_training_fields = [];
        $profile = zume_get_user_profile( $user_id );

        $coaching_contact_id = $profile['coaching_contact_id'];

        if ( $coaching_contact_id && $coach_id === null ) {
            return new WP_Error( 'already_has_coach', 'User has already requested a coach', array( 'status' => 400 ) );
        }

        $preferred_language = empty( $data ) ? $profile['preferred_language'] : $data['preferred-language']['value'];
        $preferred_language = empty( $preferred_language ) ? 'en' : $preferred_language;

        $fields = [
            'title' => $profile['name'],
            'overall_status' => 'new',
            'sources' => [
                'values' => [
                    [ 'value' => 'zume_training' ],
                ],
            ],
            'language_preference' => $preferred_language,
            'trainee_user_id' => $profile['user_id'],
            'trainee_contact_id' => $profile['contact_id'],
            'contact_email' => [
                'values' => [
                    [ 'value' => $profile['communications_email'] ],
                ],
            ],
        ];

        if ( isset( $data['contact-preferences'] ) && !empty( $data['contact-preferences'] ) ) {
            $contact_preferences = [];
            foreach ( $data['contact-preferences'] as $preference => $value ) {
                if ( $value === 'false' ) {
                    continue;
                }
                $contact_preferences[] = [ 'value' => $preference ];
            }

            $fields['communication_preferences'] = $update_training_fields['contact_preferences'] = [
                'values' => $contact_preferences,
                'force_values' => true,
            ];
        }

        if ( $coach_id !== null ) {
            $fields['coached_by'] = [
                'values' => [
                    [ 'value' => $coach_id ],
                ],
            ];
        }

        if ( ! empty( $profile['location'] ) ) {
            $fields['location_grid_meta'] = [
                'values' => [
                    [
                        'lng' => $profile['location']['lng'],
                        'lat' => $profile['location']['lat'],
                        'level' => $profile['location']['level'],
                        'label' => $profile['location']['label'],
                        'grid_id' => $profile['location']['grid_id'],
                    ],
                ],
            ];
        } else {
            $location = zume_get_user_location( $user_id );
            $fields['location_grid_meta'] = [
                'values' => [
                    [
                        'lng' => $location['lng'],
                        'lat' => $location['lat'],
                        'level' => $location['level'],
                        'label' => $location['label'],
                        'grid_id' => $location['grid_id'],
                    ],
                ],
            ];
        }

        if ( !empty( $update_training_fields ) ) {
            $update_training_fields['preferred_language'] = $preferred_language;
            $result = Zume_Profile_Model::update( $update_training_fields );
        }

        $site = Site_Link_System::get_site_connection_vars( self::SITE_CONNECTION_POST_ID );
        if ( ! $site ) {
            dt_write_log( __METHOD__ . ' FAILED TO GET SITE LINK TO GLOBAL ' );
            return new WP_Error( 'site_link_failed', 'Failed to link to coaching site ', array( 'status' => 400 ) );
        }

        $args = [
            'method' => 'POST',
            'body' => json_encode( $fields ),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $site['transfer_token'],
            ],
        ];

        $url = 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts';

        if ( $coaching_contact_id ) {
            $method = 'UPDATE';
            $url .= "/$coaching_contact_id";
        } else {
            $method = 'CREATE';
        }

        $result = wp_remote_post( $url, $args );
        if ( is_wp_error( $result ) || $result['response']['code'] !== 200 ) {
            dt_write_log( __METHOD__ . " FAILED TO $method COACHING CONTACT FOR " . $profile['name'] );
            dt_write_log( $fields );
            dt_write_log( $result );
            return new WP_Error( 'coach_request_failed', "Failed to $method coaching contact", array( 'status' => 400 ) );
        }

        $body = json_decode( $result['body'], true );

        update_post_meta( $profile['contact_id'], 'coaching_contact_id', $body['ID'] );

        if ( !empty( $data ) && isset( $data['how-can-we-serve'] ) ) {
            $coaching_needs = [
                'coaching-request' => '&nbsp;&nbsp;* Someone to coach them',
                'technical-assistance' => '&nbsp;&nbsp;* Technical assistance',
                'question-about-implementation' => '&nbsp;&nbsp;* Help with implementing the training',
                'question-about-content' => '&nbsp;&nbsp;* Help with the course content',
                'help-with-group' => '&nbsp;&nbsp;* Help with what to do after starting a group',
            ];

            $comments = "This contact is requesting:\n";
            foreach ( $data['how-can-we-serve'] as $key => $value ) {
                if ( $value === 'false' ) {
                    continue;
                }

                $comment = $coaching_needs[$key];
                $comments .= "$comment\n";
            }

            $fields = [
                'comment' => $comments,
            ];

            $comment_args = $args;
            $comment_args['body'] = json_encode( $fields );

            $url = 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts/' . $body['ID'] . '/comments';

            $result = wp_remote_post( $url, $comment_args );
            if ( is_wp_error( $result ) ) {
                dt_write_log( __METHOD__ . ' FAILED TO ADD COMMENTS TO COACHING CONTACT FOR ' . $profile['name'] );
            }
        }

        if ( $coach_id !== null ) {
            Zume_System_Log_API::log( 'coaching', 'requested_a_coach', [ 'user_id' => $user_id ], true );
            Zume_System_Log_API::log( 'system', 'celebrated_coach_request', [ 'user_id' => $user_id ], true );
            Zume_System_Log_API::log( 'coaching', 'connected_to_coach', [ 'user_id' => $user_id, 'payload' => $coach_id ], true );
        } else {
            Zume_System_Log_API::log( 'coaching', 'requested_a_coach', [ 'user_id' => $user_id ], true );
        }

        return $body;
    }

    /**
     * Update the $contact_id on the coaching system with the $updates
     *
     * @param int $contact_id
     * @param array $updates
     */
    public static function update_coaching_contact( int $contact_id, array $updates ) {

        $site = Site_Link_System::get_site_connection_vars( self::SITE_CONNECTION_POST_ID );
        if ( ! $site ) {
            dt_write_log( __METHOD__ . ' FAILED TO GET SITE LINK TO GLOBAL ' );
            return false;
        }

        $args = [
            'method' => 'POST',
            'body' => json_encode( $updates ),
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $site['transfer_token'],
            ],
        ];

        $result = wp_remote_post( 'https://' . trailingslashit( $site['url'] ) . 'wp-json/dt-posts/v2/contacts/' . $contact_id, $args );
        if ( is_wp_error( $result ) ) {
            dt_write_log( __METHOD__ . ' FAILED TO UPDATE COACHING_CONTACT FOR ' . $contact_id );
            return false;
        }

        $body = json_decode( $result['body'], true );

        return $body;
    }

    public function authorize_url( $authorized ){
        if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
            $authorized = true;
        }
        return $authorized;
    }
}
Zume_Get_A_Coach_Endpoints::instance();
