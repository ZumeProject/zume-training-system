<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Workbook extends Zume_Activites
{
    

    public $page_title = 'Zúme Workbook';
    public $root = 'workbook';
    public $type = '10';
    public static $token = 'zume_workbook_10';
    public $book_gen;
    public $lang;

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'Workbook', 'zume' ) );

        [
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $this->lang = $lang_code ?? $this->lang;

        if ( $this->url_matches_this_activity() ) {

            

            $this->language_code = $lang_code;

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_head', [ $this, 'meta' ], 5 );
            // add_action( 'dt_blank_head', [ $this, 'header_style' ], 10 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
//            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }

    public function url_matches_this_activity() {
        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        return isset( $url_parts[0] ) && $this->root === $url_parts[0] && isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest();
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function meta() {
        ?>
        <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->language_code . '/' .  $this->root . '/' . $this->type ); ?>" />
        <?php
         zume_hreflang_fixed( $this->language_code, $this->root . '/' . $this->type );
    }
    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function($){
                document.cookie = "zume_language=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                jQuery(document).foundation()
            });
        </script>
      
        <?php
        $object = Zume_Book_Generator::instance();
        $object->header_style();
    }
    public function body(){
        $code = zume_current_language();
        $display_code = zume_get_language_display_code( $code );
        $book_gen = Zume_Book_Generator::instance();
        ?>
        <div class="activity content">
            <div class="header">
                <div class="d-flex justify-content-between px-1">
                    <div class="d-flex gap-0">
                        <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                    </div>

                    <nav class="d-flex align-items-center gap-0">
                        <button class="nav__link" data-open="language-menu-reveal" data-tool="" aria-controls="language-menu-reveal" aria-haspopup="dialog" tabindex="0">
                            <?php require plugin_dir_path( __DIR__ ) . 'assets/images/globe-outline.svg' ?>
                            <span><?php echo esc_html( strtoupper( $display_code ) ) ?></span>
                        </button>
                    </nav>
                </div>
            </div>
            <?php 
                $course = Zume_Course_Builder::builder( $this->type, $this->language_code );
                // dt_write_log( $course );
                ?><div class="print-content"><?php

                foreach ( $course as $session ) {
                    foreach ( $session as $slide ) {
                        $book_gen->_template( $slide, $this->language_code );
                    }
                }

                ?></div><?php
            ?>
        </div>
        
        <?php
    }
   
}
Zume_Workbook::instance();

class Zume_Workbook_20 extends Zume_Workbook {
    public $type = '20';
    public static $token = 'zume_workbook_20';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Workbook_20::instance();

class Zume_Workbook_Intensive extends Zume_Workbook {
    public $type = 'intensive';
    public static $token = 'zume_workbook_intensive';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();
    }
}
Zume_Workbook_Intensive::instance();