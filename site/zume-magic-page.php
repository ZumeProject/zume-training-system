<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Magic_Page extends DT_Magic_Url_Base {

    public function __construct() {
        /**
         * Override DT_Magic_Url_Base constructor to allow keyless public map pages.
         *
         * DT theme v1.79+ redirects to the expired-link page whenever post_id is
         * empty after determine_post_id(). For Zume's public map pages (e.g.
         * /zume_app/last100_hours) there is intentionally no public_key in the URL,
         * so post_id will always be empty. We replicate the base constructor here,
         * replacing the unconditional empty-post_id redirect with a conditional one:
         * only redirect when a public_key was supplied but resolved to no post_id
         * (i.e. the key is genuinely invalid/expired). When no public_key is present
         * at all, allow the page to continue loading normally.
         *
         * If DT_Magic_Url_Base::__construct() gains new hooks in a future theme
         * upgrade, review this override for parity.
         */

        // check for an instance_id in the magic_link url
        $id = $this->fetch_incoming_link_param( 'id' );
        $this->instance_id = ( ! empty( $id ) ) ? $id : '';

        // register type
        $this->magic = new DT_Magic_URL( $this->root );
        add_filter( 'dt_magic_url_register_types', [ $this, 'dt_magic_url_register_types' ], 10, 1 );
        // register REST and REST access
        add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
        // add send and tiles
        add_filter( 'dt_settings_apps_list', [ $this, 'dt_settings_apps_list' ], 10, 1 );

        // fail if not valid url
        $this->parts = $this->magic->parse_url_parts();
        if ( ! $this->parts ) {
            return;
        }

        // fail if does not match type
        if ( $this->type !== $this->parts['type'] ) {
            return;
        }

        $this->magic->determine_post_id( $this->parts );

        // Only redirect when a public_key was supplied but could not be resolved.
        // Keyless public pages (no public_key) intentionally have no post_id and
        // must be allowed through.
        if ( ! empty( $this->parts['public_key'] ) && empty( $this->parts['post_id'] ) ) {
            $this->magic->redirect_to_expired_landing_page();
        }

        // Wider callout to ensure link is still valid (keyed flows only).
        if ( apply_filters( 'dt_magic_link_continue', true, $this->parts ) === false ) {
            $this->magic->redirect_to_expired_landing_page();
        }

        // register url and access
        add_filter( 'dt_blank_access', [ $this, '_has_access' ] );
        add_filter( 'dt_templates_for_urls', [ $this, 'register_url' ], 199, 1 );
        add_filter( 'dt_allow_non_login_access', function () {
            return true;
        }, 100, 1 );
        add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
        add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 5 );
        add_action( 'wp_print_footer_scripts', [ $this, 'print_scripts' ], 5 );
        add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

        add_action( 'dt_blank_head', [ $this, '_header' ] );
        add_action( 'dt_blank_footer', [ $this, '_footer' ] );

        // determine language locale to be adopted
        $this->determine_language_locale( $this->parts );

        add_filter( 'dt_custom_dir_attr_override', '__return_true' );
    }

    public function register_url_and_access() {
        add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
        add_filter( 'dt_blank_access', '__return_true', 100, 1 );
        add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
        add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );
        add_filter( 'dt_templates_for_urls', [ $this, 'register_url' ], 199, 1 ); // registers url as valid once tests are passed
    }

    public function header_content() {
        add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
        add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
        add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );
    }

    public function register_url( $template_for_url ){
        $url = dt_get_url_path( true );
        $url_parts = explode( '/', $url );
        $template_for_url[join( '/', $url_parts )] = 'template-blank.php';
        return $template_for_url;
    }

    public function consistent_head() {

        ?>
        <!-- Google tag (gtag.js) for Google Analytics -->
        <!-- phpcs:disable -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N27P3H7SBT"></script>
        <!-- phpcs:enable -->
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-N27P3H7SBT');
        </script>
        <!-- Google tag (gtag.js) for Google Ads -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16678073167">
        </script>
        <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'AW-16678073167');
        </script>

        <?php require_once trailingslashit( __DIR__ ) . 'parts/head.php'; ?>

        <?php if ( isset( $this->page_description ) && !empty( $this->page_description ) ) : ?>
            <meta name="description" content="<?php echo esc_attr( wp_strip_all_tags( trim( $this->page_description ), true ) ) ?>">
        <?php else : ?>
            <meta name="description" content="<?php echo esc_attr__( 'Zúme Training is an on-line and in-life learning experience designed for small groups who follow Jesus. An online, in-life disciple making movement training', 'zume' ) ?>">
        <?php endif; ?>

        <?php
        // keep not ready version 5 languages from being indexed
        /*
        global $zume_languages_by_code;
        [
            'lang_code' => $lc,
        ] = zume_get_url_pieces();
        if ( isset( $zume_languages_by_code[$lc]['enable_flags']['version_5_ready'] )
            && empty( $zume_languages_by_code[$lc]['enable_flags']['version_5_ready'] ) ) {
             ?><meta name="robots" content="noindex, nofollow"><?php  // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
        }
         */
    }

    /**
     * Prints scripts or data before the closing body tag on the front end.
     *
     */
    public function action_wp_footer(): void {
        require trailingslashit( __DIR__ ) . 'parts/footer.php';
    }

    public function require_authentication() {
        if ( !is_user_logged_in() ) {
            $redirect_url = site_url( dt_get_url_path() );
            wp_redirect( zume_login_url( 'login', $redirect_url ) );
            exit;
        }
    }

    public function enqueue_zume_training_scripts() {
        zume_training_load_scripts( '' );
    }
}
