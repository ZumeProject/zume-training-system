<?php


class Zume_Training_Pieces_URL extends DT_Magic_Url_Base
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Title';
    public $root = 'starter_app';
    public $type = 'home';
    public $postid = false;
    public static $token = 'starter_app_home';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        if ( $this->postid ) {
            return;
        }

        $url_parts = explode( '/', dt_get_url_path() );

        $lang_code = $this->get_lang_code( $url_parts );

        if ( isset( $url_parts[0] ) ) {

            global $wpdb;
            $this->postid = $wpdb->get_var( $wpdb->prepare( "SELECT ID FROM $wpdb->posts WHERE post_name = %s AND post_type = %s", $url_parts[0], 'zume_pieces' ) );
            if ( ! $this->postid ) {
                return;
            }

            $this->set_locale( $lang_code );

            $this->page_title = get_the_title( $this->postid );

            $this->meta = get_post_meta( $this->postid );
            $this->page_title = empty( $this->meta['zume_piece_h1'][0] ) ? get_the_title( $this->postid ) : $this->meta['zume_piece_h1'][0];


            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter('dt_blank_access', function () {
                return true;
            }, 100, 1); // allows non-logged in visit
            add_filter('dt_allow_non_login_access', function () {
                return true;
            }, 100, 1);
            add_filter('dt_override_header_meta', function () {
                return true;
            }, 100, 1);

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
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
    }

    public function body(){

        $tool_number = $this->meta['zume_piece'][0] ?? 0;
        $pre_video_content = $this->meta['zume_pre_video_content'][0] ?? '';
        $post_video_content = $this->meta['zume_post_video_content'][0] ?? '';
        $ask_content = $this->meta['zume_ask_content'][0] ?? '';

        echo '<h1>' . esc_html( $this->page_title ) . '</h1>';

        echo "Tool Number: $tool_number";

        echo wp_kses_post( wpautop( $pre_video_content ) );

        echo wp_kses_post( wpautop( $post_video_content ) );

        echo wp_kses_post( wpautop( $ask_content ) );
    }
}
Zume_Training_Pieces_URL::instance();
