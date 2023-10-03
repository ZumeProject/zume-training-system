<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Wizard extends Zume_Magic_Page
{

    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'wizard';
    public $wizard_type = '';
    public $lang = 'en_US';
    public static $token = 'zume_app_wizard';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';
        $this->wizard_type = $url_parts[1] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 );
            add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
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

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
                'translations' => [
                    'bad_wizard' => esc_html__( 'Bad Wizard', 'zume' ),
                    'found_bad_wizard' => esc_html__( 'You found a bad wizard', 'zume' ),
                    'home' => esc_html__( 'Get back home', 'zume' ),
                    'back' => esc_html__( 'Back', 'zume' ),
                    'next' => esc_html__( 'Next', 'zume' ),
                    'skip' => esc_html__( 'Skip', 'zume' ),
                    'finish' => esc_html__( 'Finish', 'zume' ),
                ],
            ]) ?>][0]

        </script>
        <?php
    }

    public function body(){
        ?>

        <div class="container cover-page | text-center">
            <div>
                <zume-wizard
                    type="<?php echo esc_attr( $this->wizard_type ) ?>"
                    finishUrl="<?php echo esc_url( zume_dashboard_url() ) ?>"
                ></zume-wizard>
            </div>
        </div>

        <?php
    }
}
Zume_Training_Wizard::instance();
