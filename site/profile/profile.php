<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Profile extends DT_Magic_Url_Base
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'profile';
    public $lang = 'en';
    public static $token = 'zume_app_profile';

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

        $url = dt_get_url_path();
        $url_parts = explode( '/', $url );

        $lang_code = $this->get_lang_code( $url_parts );

        if ( $url_parts[0] === 'profile' && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_allow_non_login_access', function (){ return true;
            }, 100, 1 );
            add_filter( 'dt_override_header_meta', function (){ return true;
            }, 100, 1 );

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

            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 999 );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume-profile';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function enqueue_scripts() {
        wp_enqueue_script( 'zume-profile', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'profile.js', array(), filemtime( trailingslashit( plugin_dir_url( __FILE__ ) ) . 'profile.js' ), true );
    }

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const zume_profile = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
            ]) ?>][0]

        </script>
        <?php
    }

    public function body(){

        zume_training_header();
        ?>

        <div class="container">

            <h1 class="text-center"><?php echo esc_html__( 'Profile', 'zume' ) ?></h1>

            <form action="" id="profile-form">

                <div class="">
                    <label for="full_name"><?php echo esc_html__( 'Name', 'zume' ) ?></label>
                    <input required type="text" id="full_name" name="full_name">
                </div>
                <div class="">
                    <label for="phone"><?php echo esc_html__( 'Phone', 'zume' ) ?></label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <div class="">
                    <label for="email"><?php echo esc_html__( 'Email', 'zume' ) ?></label>
                    <input type="email" id="email" name="email">
                </div>
                <div class="">
                    <label for="city"><?php echo esc_html__( 'City', 'zume' ) ?></label>
                    <input type="text" id="city" name="city">
                </div>

                <button class="button">Save</button>

            </form>


        </div>
        <?php
    }
}
Zume_Training_Profile::instance();

