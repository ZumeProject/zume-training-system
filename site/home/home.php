<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Home extends DT_Magic_Url_Base
{
    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'home';
    public $lang = 'en';
    public static $token = 'zume_app_home';

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
        $codes = zume_language_codes();
        if ( ( empty( $url ) || ( count( $url_parts ) === 1 && in_array( $url_parts[0], $codes ) ) ) && ! dt_is_rest() ) {

            dt_write_log( $url_parts[0] );

            if ( true ) {
                $this->lang = $url_parts[0];
                add_filter('locale', function( $locale ) {
                    return $this->lang;
                }, 100, 1);
            }

            dt_write_log( get_locale() );

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
        <?php
    }

    public function body(){
        global $zume_languages;
        ?>
        <a data-open="language-menu-reveal"><?php esc_html_e( 'Language', 'zume' ) ?></a> | current: <?php echo esc_html( get_locale() ) ?>

        <br>

        <?php if ( is_user_logged_in() ) : ?>

            <a href="<?php echo esc_url( wp_logout_url() ) ?>"><?php esc_html_e( 'Logout', 'zume' ) ?></a>

        <?php else : ?>

            <a href="/login"><?php esc_html_e( 'Login', 'zume' ) ?></a>

        <?php endif; ?>

        <my-element>
            <h1>Vite + Lit</h1>
        </my-element>


        <div id="language-menu-reveal" class="reveal" data-reveal data-v-offset="0">
            <h3><?php esc_html_e( 'Language', 'zume' ) ?></h3>
            <hr>
            <table class="hover" id="language-table">
                <?php
                foreach ( $zume_languages as $item ){
                    if ( 'en' === $item['code'] ) {
                        $url = esc_url( site_url() );
                    } else {
                        $url = esc_url( site_url() ) . '/' . $item['code'] . '/';
                    }
                    ?>
                    <tr class="language-selector" data-url="<?php echo esc_url( $url ) ?>" data-value="<?php echo esc_attr( $item['code'] ) ?>" id="row-<?php echo esc_attr( $item['code'] ) ?>">
                        <td><?php echo esc_html( $item['nativeName'] ) ?></td>
                        <td><?php echo esc_html( $item['enDisplayName'] ) ?></td>
                    </tr>
                    <?php
                }
                ?>
            </table>
            <style>
                .language-selector {
                    cursor: pointer;
                }
            </style>
            <script>
                jQuery(document).ready(function($){
                    jQuery('.language-selector').on('click', function(e){
                        let lang = jQuery(this).data('value')
                        let url = jQuery(this).data('url')
                        jQuery('.language-selector:not(#row-'+lang+')').fadeTo("fast", 0.33)
                        window.location = url
                    })
                })
            </script>
            <button class="close-button" data-close aria-label="Close modal" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>




        <?php
    }
}
Zume_Training_Home::instance();
