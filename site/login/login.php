<?php

/**
 * Displays a page for the user to login/register and recover password etc.
 *
 * Any part of the site can send the user to the login page with an encoded redirect url to get back to where they were,
 * after the login/registration.
 */
class Zume_Training_Login extends Zume_Magic_Page {

    public $magic = false;
    public $parts = false;
    public $page_title = 'User Login';
    public $root = 'app';
    public $type = 'login';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_login';
    public $url;

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        $this->page_title = esc_html__( 'Login', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        if ( isset( $url_parts[0] ) && $url_parts[0] === $this->type && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;

            $this->register_url_and_access();
            $this->header_content();


            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_javascript(){

        ?>
        <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ); ?>" />
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const registerEmailToggles = document.querySelectorAll('.register-email-toggle')
                const ssoRegister = document.querySelector('.sso-register')
                const emailRegister = document.getElementById('email_signup_form')

                registerEmailToggles.forEach( (toggleElement) =>
                    toggleElement.addEventListener('click', function() {
                        ssoRegister.classList.toggle('hidden')
                        emailRegister.classList.toggle('hidden')
                    })
                )

                // Handle ref parameter in form submission
                const form = document.getElementById('loginform');
                if (form) {
                    form.addEventListener('submit', function(e) {
                        const urlParams = new URLSearchParams(window.location.search);
                        const ref = urlParams.get('ref');
                        
                        if (ref && !document.querySelector('input[name="ref"]')) {
                            const refInput = document.createElement('input');
                            refInput.type = 'hidden';
                            refInput.name = 'ref';
                            refInput.value = ref;
                            form.appendChild(refInput);
                        }
                    });
                }
            });
        </script>
        <?php
    }

    public function body() {

        $url = new DT_URL( dt_get_url_path() );
        $hide_nav = $url->query_params->has( 'hide-nav' );
        $show_nav = !$hide_nav;

        ?>
        

        <div class="cover-page | position-relative bg-brand-gradient">

            <?php if ( $show_nav === true ) : ?>

                <?php require_once __DIR__ . '/../parts/nav.php' ?>

            <?php endif; ?>

            <div class="multiply-cover show-for-medium"></div>
            <div class="multiply-cover flip show-for-medium"></div>

            <div class="center">

                <?php require_once __DIR__ . '/login-template.php' ?>

            </div>

        </div>
        
        <!-- Event snippet for Submit lead form conversion page
        In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
        <script>
        function gtag_report_conversion(url) {
            var callback = function () {
                if (typeof(url) != 'undefined') {
                window.location = url;
                }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-16678073167/XNCdCMzCyssaEM_m3JA-',
                'event_callback': callback
            });
            return false;
        }
        </script>
        <?php
    }
}
Zume_Training_Login::instance();
