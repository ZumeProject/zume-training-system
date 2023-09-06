<?php
/**
 * Plugin Name: Zúme - Training System
 * Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Description: Zume Training System
 * Text Domain: zume-training-system
 * Domain Path: /languages
 * Version:  0.2
 * Author URI: https://github.com/ZumeProject/zume-training-system
 * GitHub Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Requires at least: 4.7.0
 * (Requires 4.7+ because of the integration of the REST API at 4.7 and the security requirements of this milestone version.)
 * Tested up to: 6.2
 *
 * @package Disciple_Tools
 * @link    https://github.com/DiscipleTools
 * @license GPL-2.0 or later
 *          https://www.gnu.org/licenses/gpl-2.0.html
 */

if ( ! defined( 'ZUME_TRAINING_URL' ) ) {
    define( 'ZUME_TRAINING_URL', 'https://zume5.training/' );
}
if ( ! defined( 'ZUME_COACHING_URL' ) ) {
    define( 'ZUME_COACHING_URL', 'https://zume5.training/coaching/' );
}

function zume_training() {
    $zume_training_required_dt_theme_version = '1.0';
    $wp_theme = wp_get_theme();
    $version = $wp_theme->version;

    if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
        require_once __DIR__ . '/vendor/autoload.php';
    }

    if ( class_exists( 'Dotenv\Dotenv' ) ) {
        $dotenv = Dotenv\Dotenv::createImmutable( __DIR__ );
        $dotenv->safeLoad();
    }

    /*
     * Check if the Disciple.Tools theme is loaded and is the latest required version
     */
    $is_theme_dt = strpos( $wp_theme->get_template(), 'disciple-tools-theme' ) !== false || $wp_theme->name === 'Disciple Tools';
    if ( $is_theme_dt && version_compare( $version, $zume_training_required_dt_theme_version, '<' ) ) {
        return false;
    }
    if ( !$is_theme_dt ){
        return false;
    }

    if ( !defined( 'DT_FUNCTIONS_READY' ) ){
        require_once get_template_directory() . '/dt-core/global-functions.php';
    }

    return Zume_Training::instance();
}
add_action( 'after_setup_theme', 'zume_training', 20 );


class Zume_Training {
    private static $_instance = null;
    private string $login_url = 'login';
    private string $builtin_login_url = 'login-url-not-to-be-used';
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    private function __construct() {
        // datatable
        global $wpdb;
        $wpdb->dt_zume_message_plan = $wpdb->prefix . 'dt_zume_message_plan';

        $this->define_constants();
        require_once( 'globals.php' );
        require_once( 'appearance/loader.php' );
        require_once( 'integrations/loader.php' );
        require_once( 'encouragement/loader.php' );
        require_once( 'classes/loader.php' );
        require_once( 'site/loader.php' );
        require_once( 'site/login/loader.php' );
        $this->i18n();
        $this->setup_hooks();
    }
    public static function activation() {
    }
    public static function deactivation() {
    }
    public function define_constants() {
        if ( !defined( 'ZUME_LANGUAGE_COOKIE' ) ) {
            define( 'ZUME_LANGUAGE_COOKIE', 'zume_language' );
        }
    }
    public function setup_hooks() {
        add_filter( 'dt_custom_fields_settings', [ $this, 'dt_contact_fields' ], 1, 2 );
        add_filter( 'dt_details_additional_tiles', [ $this, 'dt_details_additional_tiles' ], 10, 2 );
        add_action( 'dt_create_users_corresponding_contact', [ $this, 'dt_update_users_corresponding_contact' ], 10, 2 );
        add_action( 'dt_update_users_corresponding_contact', [ $this, 'dt_update_users_corresponding_contact' ], 10, 2 );
        add_filter( 'dt_login_url', [ $this, 'dt_login_url' ] );
        add_filter( 'dt_login_redirect_url', [ $this, 'dt_login_redirect_url' ] );
        add_filter( 'retrieve_password_title', [ $this, 'filter_retrieve_password_title' ], 10, 3 );
        remove_filter( 'retrieve_password_message', 'dt_multisite_retrieve_password_message', 99 );
        add_filter( 'retrieve_password_message', [ $this, 'filter_retrieve_password_message' ], 10, 4 );
        add_filter( 'retrieve_password_headers', [ $this, 'filter_retrieve_password_headers' ], 10, 1 );
        add_filter( 'password_hint', function ( string $hint ): string {
            return '';
        } );
        add_action( 'dt_create_users_corresponding_contact', [ $this, 'dt_create_users_corresponding_contact' ], 10, 2 );

        /* Ensure that Login is enabled and settings set to the correct values */
        $fields = [
            'login_enabled' => 'on',
            'redirect_url' => 'dashboard',
            'login_url' => $this->builtin_login_url,
            'ui_smallprint' => 'off',
            'identity_providers_google' => 'on',
            'identity_providers_facebook' => 'on',
        ];
        if ( isset( $_ENV['FIREBASE_API_KEY'] ) ) {
            $fields['firebase_api_key'] = sanitize_text_field( $_ENV['FIREBASE_API_KEY'] );
        }
        if ( isset( $_ENV['FIREBASE_PROJECT_ID'] ) ) {
            $fields['firebase_project_id'] = sanitize_text_field( $_ENV['FIREBASE_PROJECT_ID'] );
        }
        if ( isset( $_ENV['FIREBASE_APP_ID'] ) ) {
            $fields['firebase_app_id'] = sanitize_text_field( $_ENV['FIREBASE_APP_ID'] );
        }
        DT_Login_Fields::update( $fields );
    }

    /**
     * Filters the message body of the password reset mail.
     *
     * @param string   $message    Email message.
     * @param string   $key        The activation key.
     * @param string   $user_login The username for the user.
     * @param \WP_User $user_data  WP_User object.
     * @return string Email message.
     */
    public function filter_retrieve_password_message( string $message, string $key, string $user_login, \WP_User $user_data ): string {
        $site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );

        $message = __( 'Someone has requested a password reset for the following account:', 'zume' ) . "\r\n\r\n";
        /* translators: %s: site name */
        $message .= sprintf( __( 'Site Name: %s', 'zume' ), $site_name ) . "\r\n\r\n";
        /* translators: %s: user login */
        $message .= sprintf( __( 'Username: %s', 'zume' ), $user_login ) . "\r\n\r\n";
        $message .= __( 'If this was a mistake, just ignore this email and nothing will happen.', 'zume' ) . "\r\n\r\n";
        $message .= __( 'To reset your password, visit the following address:', 'zume' ) . "\r\n\r\n";
        $message .= '<' . dt_login_url( 'login' ) . "&action=rp&key=$key&login=" . rawurlencode( $user_login ) . ">\r\n";

        return $message;
    }

    /**
     * Filters the subject of the password reset email.
     *
     * @param string   $title      Email subject.
     * @param string   $user_login The username for the user.
     * @param \WP_User $user_data  WP_User object.
     * @return string Email subject.
     */
    public function filter_retrieve_password_title( string $title, string $user_login, \WP_User $user_data ): string {
        $site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );

        /* translators: Password reset email subject. %s: Site name */
        $title = sprintf( __( '[%s] Password Reset', 'zume' ), $site_name );

        return $title;
    }

    public function filter_retrieve_password_headers( string $headers ): string {

        $headers .= ' X-Zume-Email-System';

        return $headers;
    }


    public function dt_details_additional_tiles( $tiles, $post_type = '' ) {
        if ( $post_type === 'contacts' ) {
            $tiles['profile_details'] = [
                'label' => __( 'Profile Details', 'zume' ),
                'display_for' => [
                    'type' => [ 'user' ],
                ],
            ];
        }
        return $tiles;
    }
    public function dt_contact_fields( array $fields, string $post_type = '' ) {
        if ( $post_type === 'contacts' ) {
            if ( !isset( $fields['user_email'] ) ){
                $fields['user_email'] = [
                    'name' => __( 'User Email', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'readonly' => true,
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_phone'] ) ){
                $fields['user_phone'] = [
                    'name' => __( 'User Phone', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
        }
        return $fields;
    }
    public function dt_create_users_corresponding_contact( $new_user_contact, $user ) {
        // adds support fields after registration

        $ip_address = DT_Ipstack_API::get_real_ip_address();
        $ip_result = DT_Ipstack_API::geocode_ip_address( $ip_address );

        // @todo add error handling

        $lng = $ip_result['longitude'] ?? '';
        $lat = $ip_result['latitude'] ?? '';
        if ( !empty( $ip_result['city'] ) ) {
            $label = $ip_result['city'] . ', ' . $ip_result['region_name'] . ', ' . $ip_result['country_name'];
            $level = 'place';
        } elseif ( !empty( $ip_result['region_name'] ) ) {
            $label = $ip_result['region_name'] . ', ' . $ip_result['country_name'];
            $level = 'region';
        } elseif ( !empty( $ip_result['country_name'] ) ) {
            $label = $ip_result['country_name'];
            $level = 'country';
        } elseif ( !empty( $ip_result['continent_name'] ) ) {
            $label = $ip_result['continent_name'];
            $level = 'world';
        } else {
            $label = '';
            $level = '';
        }

        $fields = [
            'user_email' => $user->user_email,
            'user_phone' => '',
            'location_grid_meta' => [
                'values' => [
                    [
                        'label' => $label,
                        'level' => $level,
                        'lng' => $lng,
                        'lat' => $lat,
                        'source' => 'ip',
                    ]
                ],
            ]
        ];
        $contact_location = DT_Posts::update_post( 'contacts',  $new_user_contact['ID'], $fields, true, false );

        dt_report_insert( [
            'user_id' => $user->ID,
            'post_id' => $new_user_contact['ID'],
            'post_type' => 'zume',
            'type' => 'system',
            'subtype' => 'registered',
            'value' => 0,
            'lng' => $contact_location['location_grid_meta'][0]['lng'],
            'lat' => $contact_location['location_grid_meta'][0]['lat'],
            'level' => $contact_location['location_grid_meta'][0]['level'],
            'label' => $contact_location['location_grid_meta'][0]['label'],
            'grid_id' => $contact_location['location_grid_meta'][0]['grid_id'],
            'time_end' =>  time(),
        ]);

        dt_report_insert( [
            'user_id' => $user->ID,
            'post_id' => $new_user_contact['ID'],
            'post_type' => 'zume',
            'type' => 'stage',
            'subtype' => 'current_level',
            'value' => 1,
            'lng' => $contact_location['location_grid_meta'][0]['lng'],
            'lat' => $contact_location['location_grid_meta'][0]['lat'],
            'level' => $contact_location['location_grid_meta'][0]['level'],
            'label' => $contact_location['location_grid_meta'][0]['label'],
            'grid_id' => $contact_location['location_grid_meta'][0]['grid_id'],
            'time_end' =>  time(),
        ]);

        Zume_System_Encouragement_API::_install_plan( $user->ID, Zume_System_Encouragement_API::_get_recommended_plan( $user->ID, 'system', 'registered' ) );

    }
    public function dt_update_users_corresponding_contact( mixed $contact, WP_User $user ) {
        $current_user = wp_get_current_user();

        if ( $user->ID !== $current_user->ID ) {
            return;
        }

        $contact_id = Disciple_Tools_Users::get_contact_for_user( $user->ID );
        $contact_record = DT_Posts::get_post( 'contacts', $contact_id, true, false );

        if ( is_wp_error( $contact_record ) ) {
            dt_write_log( __METHOD__ );
            dt_write_log( $contact_record->get_error_message() );
            return;
        }

        if ( $contact_record && $contact_record['user_email'] != $user->user_email ) {
            DT_Posts::update_post( 'contacts', $contact_record['ID'], [
                'user_email' => $user->user_email,
            ], false, false );
        }
    }
    public function dt_login_url( $dt_login_url ) {
        $dt_login_url = str_replace( $this->builtin_login_url, $this->login_url, $dt_login_url );

        $current_language = 'en';

        if ( function_exists( 'zume_current_language' ) ) {
            $current_language = zume_current_language();
        }

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        /**
         * When the login fails with bad email/password, we need to get the lang_code from the
         * HTTP_REFERER url, otherwise it redirects back to english
         */
        if ( $url_parts[0] === 'wp-login.php' && isset( $_SERVER['HTTP_REFERER'] ) ) {
            $url = wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) );
            [
                'lang_code' => $lang_code,
            ] = zume_get_url_pieces( ltrim( $url['path'], '/' ) );
            if ( $lang_code !== $current_language ) {
                $current_language = $lang_code;
            }
        }

        if ( $current_language === 'en' ) {
            return $dt_login_url;
        }

        return $current_language . '/' . $dt_login_url;
    }
    public function dt_login_redirect_url( $redirect_url ) {
        $url = new DT_URL( $redirect_url );

        $parsed_url = $url->parsed_url;

        /* Get the current lang_code in the current url */
        [ 'lang_code' => $lang_code ] = zume_get_url_pieces();

        /* Get the path from the redirect url without any lang codes */
        [ 'path' => $path ] = zume_get_url_pieces( ltrim( $parsed_url['path'], '/' ) );

        if ( $lang_code !== 'en' ) {
            $path = $lang_code . '/' . $path;
        }

        $redirect_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . '/' . $path;
        return $redirect_url;
    }

    public function i18n() {
        $domain = 'zume';
        load_plugin_textdomain( $domain, false, trailingslashit( dirname( plugin_basename( __FILE__ ) ) ). 'languages' );
    }
    public function __toString() {
        return 'zume';
    }
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, 'Whoah, partner!', '0.1' );
    }
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, 'Whoah, partner!', '0.1' );
    }
    public function __call( $method = '', $args = array() ) {
        _doing_it_wrong( 'zume_training::' . esc_html( $method ), 'Method does not exist.', '0.1' );
        unset( $method, $args );
        return null;
    }
}
add_action( 'plugins_loaded', function () {
    if ( is_admin() && !( is_multisite() && class_exists( 'DT_Multisite' ) ) || wp_doing_cron() ){
        // Check for plugin updates
        if ( ! class_exists( 'Puc_v4_Factory' ) ) {
            if ( file_exists( get_template_directory() . '/dt-core/libraries/plugin-update-checker/plugin-update-checker.php' ) ) {
                require( get_template_directory() . '/dt-core/libraries/plugin-update-checker/plugin-update-checker.php' );
            }
        }
        if ( class_exists( 'Puc_v4_Factory' ) ){
            Puc_v4_Factory::buildUpdateChecker(
                'https://raw.githubusercontent.com/ZumeProject/zume-training-system/master/version-control.json',
                __FILE__,
                'zume-training-system'
            );
        }
    }
} );
