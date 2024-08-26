<?php
/**
 * Plugin Name: Zúme - Training System
 * Plugin URI: https://github.com/ZumeProject/zume-training-system
 * Description: Zume Training System
 * Text Domain: zume-training-system
 * Domain Path: /languages
 * Version:  0.3
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
    define( 'ZUME_TRAINING_URL', 'https://zume.training/' );
}
if ( ! defined( 'ZUME_TRAINING_ASSETS_URL' ) ) {
    define( 'ZUME_TRAINING_ASSETS_URL', 'https://zume.training/wp-content/plugins/zume-training-system/site/assets/' );
}
if ( ! defined( 'ZUME_COACHING_URL' ) ) {
    define( 'ZUME_COACHING_URL', 'https://zume.training/coaching/' );
}

function zume_training() {
    $zume_training_required_dt_theme_version = '1.0';
    $wp_theme = wp_get_theme();
    $version = $wp_theme->version;

    if ( is_network_admin() ){
        return false;
    }

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
add_action( 'after_setup_theme', 'zume_training', 15 );

add_action( 'template_redirect', 'action_template_redirect' );

/**
 * Fires before determining which template to load.
 *
 */
function action_template_redirect() : void {
    require_once( __DIR__ . '/404.php' );
}

//register the D.T Plugin
add_filter( 'dt_plugins', function ( $plugins ) {
    $plugin_data = get_file_data( __FILE__, [ 'Version' => 'Version', 'Plugin Name' => 'Zúme Training' ], false );
    $plugins['zume-coaching'] = [
        'plugin_url' => trailingslashit( plugin_dir_url( __FILE__ ) ),
        'version' => $plugin_data['Version'] ?? null,
        'name' => $plugin_data['Plugin Name'] ?? null,
    ];
    return $plugins;
});

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
        global $wpdb, $table_prefix;
        $wpdb->dt_zume_message_plan = $table_prefix . 'dt_zume_message_plan';

        $this->define_constants();
        $this->setup_hooks();
        require_once( 'utilities/loader.php' );
        require_once( 'globals.php' );

        $this->i18n();

        require_once( 'appearance/loader.php' );
        require_once( 'site/loader.php' );
        require_once( 'maps/loader.php' );

        require_once( 'languages/translator-app/loader.php' );
    }
    public static function activation() {
    }
    public static function deactivation() {
    }
    public function define_constants() {
        if ( !defined( 'ZUME_LANGUAGE_COOKIE' ) ) {
            define( 'ZUME_LANGUAGE_COOKIE', 'zume_language' );
        }
        if ( !defined( 'ZUME_EMAIL_HEADER' ) ) {
            define( 'ZUME_EMAIL_HEADER', 'X-Zume-Email-System' );
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
        add_filter( 'email_change_email', [ $this, 'filter_email_change_email' ], 10, 1 );
        add_action( 'dt_create_users_corresponding_contact', [ $this, 'dt_create_users_corresponding_contact' ], 10, 2 );
        add_action( 'dt_post_updated', [ $this, 'update_coaching_contact' ], 10, 5 );
        add_filter( 'pre_redirect_guess_404_permalink', '__return_false' );
        add_filter( '404_template_hierarchy', [ $this, 'filter_404_template_hierarchy' ], 100, 3 );
        add_filter( 'language_attributes', [ $this, 'filter_language_attributes' ], 10, 2 );

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
        if ( class_exists( 'DT_Login_Fields' ) ) { // if outside DT context, don't run this
            DT_Login_Fields::update( $fields );
        }
    }

    /**
     * Filters the path of the queried template by type.
     *
     * @param string[] $templates A list of template candidates, in descending order of priority.
     * @return string[] Path to the template. See locate_template().
     */
    public function filter_404_template_hierarchy( array $templates ) : array {
        $templates = [
            'template-blank.php',
        ];

        return $templates;
    }

    /**
     * Filters the language attributes for display in the 'html' tag.
     *
     * @param string $output  A space-separated list of language attributes.
     * @param string $doctype The type of HTML document (xhtml|html).
     * @return string A space-separated list of language attributes.
     */
    public function filter_language_attributes( string $output, string $doctype ) : string {
        global $zume_languages_by_code;
        if ( str_contains( $output, 'dir=' ) ) {
            return $output;
        }

        $lang_code = zume_current_language();

        if ( !isset( $zume_languages_by_code[$lang_code] ) ) {
            return $output;
        }

        $dir = $zume_languages_by_code[$lang_code]['rtl'] ? 'rtl' : 'ltr';

        $output .= ' dir="'.$dir.'"';

        return $output;
    }

    /**
     * Filters the contents of the email sent when the user's email is changed.
     *
     * @param array $email_change_email { Used to build wp_mail(). @type string $to, @type string $subject, @type string $message, @type string $headers
     * @return array
     */
    public function filter_email_change_email( array $email_change_email ) : array {
        $email_change_email['headers'] = self::add_zume_email_header( $email_change_email['headers'] );

        return $email_change_email;
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

    /**
     * @param string|string[] $headers
     * @return string
     */
    public function filter_retrieve_password_headers( $headers ): string {
        return self::add_zume_email_header( $headers );
    }

    public static function add_zume_email_header( $headers ) {
        if ( is_array( $headers ) ) {
            $headers[ZUME_EMAIL_HEADER] = 1;
        }

        $headers .= ' ' . ZUME_EMAIL_HEADER . ": 1\n\r";

        return $headers;
    }

    // @todo maybe the following functions should be moved into the system and out of this root file. @c

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
            if ( !isset( $fields['user_timezone'] ) ){
                $fields['user_timezone'] = [
                    'name' => __( 'User Timezone', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_friend_key'] ) ){
                $fields['user_friend_key'] = [
                    'name' => __( 'User Friend Key', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_preferred_language'] ) ){ // @todo should user_ui_language and user_language be included here as well? @c
                $fields['user_preferred_language'] = [
                    'name' => __( 'User Preferred Language', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_communications_email'] ) ){
                $fields['user_communications_email'] = [
                    'name' => __( 'User Preferred Email', 'zume' ),
                    'type' => 'text',
                    'tile' => 'profile_details',
                    'only_for_types' => [ 'user' ],
                ];
            }
            if ( !isset( $fields['user_contact_preference'] ) ) {
                $fields['user_contact_preference'] = [
                    'name' => __( 'Preferred Contact Methods', 'zume' ),
                    'type' => 'multi_select',
                    'tile' => 'profile_details',
                    'default' => [
                        'email' => [ 'label' => __( 'Email', 'zume' ) ],
                        'text' => [ 'label' => __( 'Text', 'zume' ) ],
                        'phone' => [ 'label' => __( 'Phone', 'zume' ) ],
                        'whatsapp' => [ 'label' => __( 'Whatsapp', 'zume' ) ],
                        'signal' => [ 'label' => __( 'Signal', 'zume' ) ],
                        'telegram' => [ 'label' => __( 'Telegram', 'zume' ) ],
                        'messenger' => [ 'label' => __( 'Messenger', 'zume' ) ],
                    ],
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

        global $wpdb;
        $user_friend_key = substr( md5( rand( 10000, 100000 ) ), 0, 3 ) . substr( md5( rand( 10000, 100000 ) ), 0, 3 );
        $key_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE meta_key = 'user_friend_key' AND meta_value = %s", $user_friend_key ) );
        while ( $key_exists ){
            $user_friend_key = substr( md5( rand( 10000, 100000 ) ), 0, 3 ) . substr( md5( rand( 10000, 100000 ) ), 0, 3 );
            $key_exists = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE meta_key = 'user_friend_key' AND meta_value = %s", $user_friend_key ) );
        }

        $user_language = zume_get_user_language();

        $fields = [
            'user_email' => $user->user_email,
            'user_communications_email' => $user->user_email,
            'user_phone' => '',
            'user_timezone' => $ip_result['time_zone']['id'] ?? '',
            'user_friend_key' => $user_friend_key,
            // @TODO These language codes aren't being used anywhere. Commented out ready for stripping out entirely
            //'user_ui_language' => $user_language['code'] ?? 'en',
            //'user_language' => $user_language['code'] ?? 'en',
            'user_preferred_language' => $user_language['code'] ?? 'en',
            'location_grid_meta' => [
                'values' => [
                    [
                        'label' => $label,
                        'level' => $level,
                        'lng' => $lng,
                        'lat' => $lat,
                        'source' => 'ip',
                    ],
                ],
            ],
        ];
        $contact_location = DT_Posts::update_post( 'contacts', $new_user_contact['ID'], $fields, true, false );

        zume_log_insert('training', 'registered', [
            'user_id' => $user->ID,
            'post_id' => $new_user_contact['ID'],
            'post_type' => 'zume',
            'type' => 'training',
            'subtype' => 'registered',
            'value' => 0,
            'lng' => $contact_location['location_grid_meta'][0]['lng'],
            'lat' => $contact_location['location_grid_meta'][0]['lat'],
            'level' => $contact_location['location_grid_meta'][0]['level'],
            'label' => $contact_location['location_grid_meta'][0]['label'],
            'grid_id' => $contact_location['location_grid_meta'][0]['grid_id'],
            'time_end' => time(),
            'language_code' => $user_language['code'] ?? 'en',
        ], true );

        zume_log_insert('system', 'current_level', [
            'user_id' => $user->ID,
            'post_id' => $new_user_contact['ID'],
            'post_type' => 'zume',
            'type' => 'system',
            'subtype' => 'current_level',
            'value' => 1,
            'lng' => $contact_location['location_grid_meta'][0]['lng'],
            'lat' => $contact_location['location_grid_meta'][0]['lat'],
            'level' => $contact_location['location_grid_meta'][0]['level'],
            'label' => $contact_location['location_grid_meta'][0]['label'],
            'grid_id' => $contact_location['location_grid_meta'][0]['grid_id'],
            'time_end' => time(),
            'language_code' => $user_language['code'] ?? 'en',
        ], true );

        Zume_System_Encouragement_API::_install_plan( $user->ID, Zume_System_Encouragement_API::_get_recommended_plan( $user->ID, 'training', 'registered' ) );
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
        if ( isset( $url_parts[0] ) && $url_parts[0] === 'wp-login.php' && isset( $_SERVER['HTTP_REFERER'] ) ) {
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

        if ( isset( $parsed_url['query'] ) && !empty( $parsed_url['query'] ) ) {
            $path .= '?' . $parsed_url['query'];
        }

        $redirect_url = $parsed_url['scheme'] . '://' . $parsed_url['host'] . '/' . $path;
        return $redirect_url;
    }
    public function update_coaching_contact( string $post_type, int $post_id, array $initial_request_fields, array $post_fields_before_update, array $post_fields_after_update ) {
        if ( $post_type !== 'contacts' ) {
            return;
        }

        if ( !key_exists( 'corresponds_to_user', $post_fields_after_update ) ) {
            return;
        }

        $user_id = $post_fields_after_update['corresponds_to_user'];

        $profile = zume_get_user_profile( $user_id );

        if ( !isset( $profile['coaching_contact_id'] ) || empty( $profile['coaching_contact_id'] ) ) {
            return;
        }

        $coaching_contact_id = $profile['coaching_contact_id'];
        $changes = [];

        if ( $post_fields_after_update['user_preferred_language'] !== $post_fields_before_update['user_preferred_language'] ) {
            $changes['language_preference'] = $post_fields_after_update['user_preferred_language'];
        }

        $old_location_label = isset( $post_fields_before_update['location_grid'] )
                        && !empty( $post_fields_before_update['location_grid'] )
                        ? $post_fields_before_update['location_grid'][0]['label']
                        : '';
        $new_location_label = isset( $post_fields_after_update['location_grid'] )
                        && !empty( $post_fields_after_update['location_grid'] )
                        ? $post_fields_after_update['location_grid'][0]['label']
                        : '';
        if ( $old_location_label !== $new_location_label ) {
            if ( $new_location_label !== '' ) {
                $changes['location_grid_meta'] = [
                    'values' => [
                        [
                            'lat' => $post_fields_after_update['location_grid_meta'][0]['lat'],
                            'lng' => $post_fields_after_update['location_grid_meta'][0]['lng'],
                            'level' => $post_fields_after_update['location_grid_meta'][0]['level'],
                            'label' => $post_fields_after_update['location_grid_meta'][0]['label'],
                            'grid_id' => $post_fields_after_update['location_grid_meta'][0]['grid_id'],
                        ],
                    ],
                    'force_values' => true,
                ];
            } else {
                $changes['location_grid_meta'] = [
                    'values' => [],
                    'force_values' => true,
                ];
            }
        }

        if ( empty( $changes ) ) {
            return;
        }

        /* Update the coaching contact on the coaching subsite */
        Zume_Get_A_Coach_Endpoints::update_coaching_contact( $coaching_contact_id, $changes );
    }

    public function i18n() {
        zume_i18n();
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
