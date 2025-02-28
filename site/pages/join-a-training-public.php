<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Join_A_Training_Public extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Get A Coach';
    public $root = 'app';
    public $type = 'join-a-training';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_get_a_coach';

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

        $this->page_title = esc_html__( 'Join a Training', 'zume' );
        $this->page_description = esc_html__( 'Zúme is 20 hours of training. But those 20 hours can be broken up differently depending on your training group‘s availability.', 'zume' );

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
            <div class="container-md stack-2 center | py-2">
                <h1 class="text-center"><?php echo esc_html__( 'Join a Training', 'zume' ) ?></h1>
                <p><?php echo esc_html__( 'Every athletic sport, especially at higher levels, uses coaching. Even olympic athletes have coaches, and often more than one. Disciple making can equally benefit from coaching by those who have more experience.', 'zume' ) ?></p>
                <div class="switcher | training-path">
                <table>
                <thead>
                    <tr>
                        <td><!--?lit$4923634952$-->Name</td>
                        <td><!--?lit$4923634952$-->Session</td>
                        <td><!--?lit$4923634952$-->Next Session Date</td>
                        <td><!--?lit$4923634952$-->Start Time</td>
                        <td><!--?lit$4923634952$-->Timezone</td>
                        <td><!--?lit$4923634952$-->Language</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <!--?lit$4923634952$--><!---->
            <tr>
                <td data-label="Name"><!--?lit$4923634952$-->Online Zume (1hr sessions)</td>
                <td data-label="Session"><!--?lit$4923634952$-->6 / <!--?lit$4923634952$-->20</td>
                <td data-label="Next Session Date"><!--?lit$4923634952$-->Mar 4, 2025</td>
                <td data-label="Start Time"><!--?lit$4923634952$-->1:00 PM</td>
                <td data-label="Timezone"><!--?lit$4923634952$-->Central Chicago</td>
                <td data-label="Language"><!--?lit$4923634952$-->English</td>
                <td><button class="btn" data-code="882093"><!--?lit$4923634952$-->Join</button></td>
            </tr>
        <!----><!---->
            <tr>
                <td data-label="Name"><!--?lit$4923634952$-->For Africans Only</td>
                <td data-label="Session"><!--?lit$4923634952$-->7 / <!--?lit$4923634952$-->10</td>
                <td data-label="Next Session Date"><!--?lit$4923634952$-->Mar 5, 2025</td>
                <td data-label="Start Time"><!--?lit$4923634952$-->8 a.m. - 10 a.m.</td>
                <td data-label="Timezone"><!--?lit$4923634952$-->Pacific Time Zone</td>
                <td data-label="Language"><!--?lit$4923634952$-->English</td>
                <td><button class="btn" data-code="f0b764"><!--?lit$4923634952$-->Join</button></td>
            </tr>
        <!----><!---->
            <tr>
                <td data-label="Name"><!--?lit$4923634952$-->Shepherd Farsi</td>
                <td data-label="Session"><!--?lit$4923634952$-->12 / <!--?lit$4923634952$-->20</td>
                <td data-label="Next Session Date"><!--?lit$4923634952$-->Mar 4, 2025</td>
                <td data-label="Start Time"><!--?lit$4923634952$-->7:00 pm</td>
                <td data-label="Timezone"><!--?lit$4923634952$-->Pacific Time Zone</td>
                <td data-label="Language"><!--?lit$4923634952$-->Farsi</td>
                <td><button class="btn" data-code="7f0a2c"><!--?lit$4923634952$-->Join</button></td>
            </tr>
        <!----><!---->
            <tr>
                <td data-label="Name"><!--?lit$4923634952$-->BH</td>
                <td data-label="Session"><!--?lit$4923634952$-->10 / <!--?lit$4923634952$-->10</td>
                <td data-label="Next Session Date"><!--?lit$4923634952$-->Nov 27, 2024</td>
                <td data-label="Start Time"><!--?lit$4923634952$-->10:00am</td>
                <td data-label="Timezone"><!--?lit$4923634952$-->Mountain</td>
                <td data-label="Language"><!--?lit$4923634952$-->English</td>
                <td><button class="btn" data-code="zume_group_6594127c715c4"><!--?lit$4923634952$-->Join</button></td>
            </tr>
        <!----><!---->
            <tr>
                <td data-label="Name"><!--?lit$4923634952$-->Implenter with Tony Japan (6:45Am)</td>
                <td data-label="Session"><!--?lit$4923634952$-->10 / <!--?lit$4923634952$-->10</td>
                <td data-label="Next Session Date"><!--?lit$4923634952$-->Mar 28, 2022</td>
                <td data-label="Start Time"><!--?lit$4923634952$--></td>
                <td data-label="Timezone"><!--?lit$4923634952$--></td>
                <td data-label="Language"><!--?lit$4923634952$--></td>
                <td><button class="btn" data-code="zume_group_61e61dead22a5"><!--?lit$4923634952$-->Join</button></td>
            </tr>
        <!---->
               </tbody>
            </table>
                </div>
            </div>

            <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn large uppercase fit-content mx-auto"><?php echo esc_html__( 'Get A Coach', 'zume' ) ?></a>

        </div>
        <?php
    }
}
Zume_Join_A_Training_Public::instance();
