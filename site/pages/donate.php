<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Donate extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Donate';
    public $root = 'app';
    public $type = 'donate';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_donate';

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

        $this->page_title = esc_html__( 'Donate', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

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

        <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ); ?>" />

        <?php
        zume_hreflang_fixed( $this->lang_code, $this->type );
    }

    public function body(){
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-2 | page">

            <h1 class="text-center"><?php echo esc_html__( 'Donate', 'zume' ) ?></h1>

            <div class="mx-auto w-3rem brand-lighter s--1">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/coach-2guys.svg' ) ?>" class="h-5rem" />
            </div>

            <div class="center">
                <div class="stack-1">
                    <h2 class="brand h3 uppercase d-flex align-items-center gap-1"></h2>
                    <p><?php echo esc_html__( 'We are crowdfunded, and we love that you want to be part of the Zúme vision.', 'zume' ) ?></p>

                    <div>
                        <!--spinner-->
                        <div id="give-loading-spinner">
                            <div class="center"><span class="loading-spinner active"></span></div>
                        </div>

                        <iframe allow="payment"
                                height="650"
                                src="https://axiainternational.net/embed/giving/662-2892CRE?project_id=938" width="100%" id="givingWidget662-2892CRE"
                                style="border: none" scrolling="no">
                        </iframe>
                        <script>window.addEventListener("message", function (event) {if (event.origin === "https://axiainternational.net" && (typeof event.data == "number" || typeof event.data == "string")) {
                            document.getElementById("givingWidget662-2892CRE").height = event.data;
                          }});</script>
                    </div>
                </div>
            </div>

            <!--<a href="https://give.zume.vision/projects" class="btn uppercase fit-content mx-auto">--><?php //echo esc_html__( 'View All Giving Opportunities', 'zume' ) ?><!-- --><?php //require plugin_dir_path( __DIR__ ) . 'assets/images/external-link.svg' ?><!--</a>-->

        </div>
        <?php
    }
}
Zume_Training_Donate::instance();
