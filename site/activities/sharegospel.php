<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_Sharegospel extends Zume_Activites
{
    

    public $page_title = 'Zúme Activity - Share the Gospel';
    public $root = 'activities';
    public $type = 'sharegospel';
    public static $token = 'zume_activity_sharegospel';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = strtolower( esc_html__( 'ACTIVITY', 'zume' ) );

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
            add_action( 'dt_blank_head', [ $this, 'header_style' ], 10 );
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
            
            function scrollToSection(sectionId) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const headerHeight = 70; // Buffer for fixed header
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                }
            }
        </script>
        <?php
    }
    public function body(){
        global $wpdb;
        $sql = $wpdb->prepare( "SELECT ID FROM zume_posts p WHERE p.post_type = 'zume_activities' AND p.post_title = %s", $this->type );

        $code = zume_current_language();
        $display_code = zume_get_language_display_code( $code );

        //phpcs:ignore
        $post_id = $wpdb->get_var( $sql );

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
                </div>
                </nav>
            </div>

            <div class="container-md">
                <h1 class="activity-title"><?php self::content_header( $post_id ); ?></h1>
                
                <!-- Navigation Buttons -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin: 1rem 0;" class="nav-buttons-container">
                    <button class="btn btn-primary btn-sm" style="width: 100%; max-width: 300px; font-size: 14px; white-space: nowrap;" onclick="scrollToSection('presentation1')">
                        <?php echo esc_html__( 'Presentation 1', 'zume' ); ?>
                    </button>
                    <button class="btn btn-primary btn-sm" style="width: 100%; max-width: 300px; font-size: 14px; white-space: nowrap;" onclick="scrollToSection('presentation2')">
                        <?php echo esc_html__( 'Presentation 2', 'zume' ); ?>
                    </button>
                </div>
            </div>
            <hr>
            <div class="container-md activity-content">
                <div id="presentation1">
                    <?php 
                        // creation to judgement content
                        self::content_body( $post_id ); 
                    ?>
                </div>
                <div id="presentation2">
                    <?php 
                        // 3 circles gospel presentation content
                        self::content_three_circles( $post_id );
                     ?>
                </div>
                </div>
        </div>
        </hr>
        <?php
    }
    public function content_header( $post_id ){
        $title = get_post_meta( $post_id, 'title_'.$this->language_code, true );
        echo wp_kses( $title, 'post' );
    }
    public function content_body( $post_id ){
        $content = zume_replace_placeholder( get_post_meta( $post_id, 'content_'.$this->language_code, true ), $this->language_code );
        echo wp_kses( $content, 'post' );
    }
    public function content_three_circles( ){
    // Create a hr divider
    echo '<hr>';

    // Create a translated title "3 Circles Gospel Presentation"
    $translated_title = __( '3 Circles Gospel Presentation', 'zume' );
    echo '<h2>' . esc_html( $translated_title ) . '</h2>';

    // Query zume_scripts by languages and select the meta data by key 63. And publish the script content.
    global $wpdb;

    // Get current language code
    $language_code = $this->language_code;

    // Query for zume_scripts post in the current language
    $script_post_id = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT ID FROM {$wpdb->posts} WHERE post_type = 'zume_scripts' AND post_status = 'publish' AND post_title = %s LIMIT 1",
            $language_code
        )
    );

    if ( $script_post_id ) {
        // Get the meta value for key 63
        $script_content = get_post_meta( $script_post_id, '63', true );
        if ( ! empty( $script_content ) ) {
            // Output the script content, allowing post HTML
            echo wp_kses_post( $script_content );
        } else {
            // Fallback if no content found
            echo '<p>' . esc_html__( 'No script content found for this language.', 'zume' ) . '</p>';
        }
    } else {
        // Fallback if no script post found
        echo '<p>' . esc_html__( 'No script found for this language.', 'zume' ) . '</p>';
    }
    }

    public function _footer() {
        if ( ! isset( $_GET['description'] ) ) :
            wp_footer();
            $this->footer_javascript();
            require plugin_dir_path( __DIR__ ) .'parts/language-selector.php';
        endif;
    }
}
Zume_Activites_Sharegospel::instance();
