<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Plan_Invite extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'plan_invite';
    public $lang = 'en';
    public static $token = 'zume_app_plan_invite';

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

        if ( ( 'zume_app' === $url_parts[0] && 'plan_invite' === $url_parts[1] ) && ! dt_is_rest() ) {

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
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'redirect_url' => zume_login_url( 'login' ),
                'is_logged_in' => is_user_logged_in(),
                'translations' => [
                    'enter_code' => __( 'Please enter a plan code.', 'zume' ),
                ],
            ]) ?>][0]
        </script>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const successBanner = document.querySelector('.success.banner')
                const warningBanner = document.querySelector('.warning.banner')

                jQuery('.plan_code_submit').click(function() {
                    var plan_code = jQuery('#plan_code').val();
                    if ( ! plan_code ) {
                        warningBanner.innerHTML = SHARED_FUNCTIONS.escapeHTML(jsObject.translations.enter_code)
                        jQuery(warningBanner).show()
                        return;
                    }

                    if ( jsObject.is_logged_in ) {
                        submit_code( plan_code )
                    } else {
                        redirect_to_login( plan_code )
                    }

                });

                function redirect_to_login( plan_code ) {
                    const redirect_to = new URL( location.href )
                    redirect_to.searchParams.append('code', plan_code)

                    const url = new URL( jsObject.redirect_url )
                    url.searchParams.append('hide-nav', true)
                    url.searchParams.delete('redirect_to')
                    url.searchParams.append('redirect_to', redirect_to)

                    location.href = url.href
                }

                function submit_code( plan_code ){
                    jQuery('.warning.banner').hide()

                    makeRequest('POST', 'connect/plan', { "value": plan_code }, 'zume_system/v1' ).done( function( data ) {
                        console.log(data)
                        jQuery('.plan_code_submit').text('Done').prop('disabled', true);
                        successBanner.innerHTML =successBanner.innerHTML.replace('::name::', data.name)
                        jQuery(successBanner).show()
                        jQuery('.invitation-form').hide()
                    }).catch(function(error) {
                        console.log(error)
                        jQuery('.warning.banner').show()
                    })
                }
            });
        </script>

        <?php
    }

    public function body(){
        global $zume_user_profile;

        $plan_code = false;
        if ( isset( $_GET['code'] ) ) {
            $plan_code = sanitize_text_field( wp_unslash( $_GET['code'] ) );
        }

        $is_user_logged_in = false;

        if ( is_user_logged_in() ) {
            $is_user_logged_in = true;

            if ( $plan_code !== false ) {
                $success = Zume_Friends_Endpoints::connect_to_plan( $plan_code );
            }
        }

        $auto_submitted = isset( $success );
        $failed = $auto_submitted && is_wp_error( $success );
        $show_success = isset( $success ) && !is_wp_error( $success );

        $show_form = !$plan_code || !$is_user_logged_in || $auto_submitted && $failed;

        $name = $show_success ? $success['name'] : '::name::';

        ?>

        <div class="cover-page | bg-brand-gradient">

            <?php require __DIR__ . '/../parts/nav.php' ?>

            <div class="center" id="plan-invitation">

                <div class="grid-container rounded-multi">
                    <div class="hidden | text-center bg-brand-light px-1 py-0 shadow">
                        <div class="cover">
                            <div class="center | w-100">
                                <div class="w-70"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Jesus-01.svg' ) ?>" alt=""></div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center bg-white px-1 py-0 shadow rounded-start rounded-start-on-medium">
                        <h1 class="brand"><?php esc_html_e( 'Plan Invitation', 'zume' ) ?></h1>
                        <div class="stack-1 invitation-form" style="<?php echo $show_form ? '' : 'display: none;' ?>">

                            <div class="banner warning text-center" style="<?php echo $failed ? '' : 'display: none' ?>">
                                <?php echo esc_html__( 'Error connecting to plan', 'zume' ); ?>
                            </div>

                            <p><?php echo esc_html__( 'Use the code your friend sent you.', 'zume' ) ?></p>
                            <div class="">
                                <label for="plan_code"></label>
                                <input class="input" id="plan_code" type="text" placeholder="012345" value="<?php echo ( $plan_code ) ? esc_html( $plan_code ) : ''  ?>" >
                            </div>
                            <button class="btn plan_code_submit"><?php echo esc_html__( 'Connect', 'zume' ) ?></button>
                        </div>

                        <div class="success banner text-center" style="<?php echo $auto_submitted && !$failed ? '' : 'display: none;' ?>">
                            <?php echo esc_html( sprintf( __( 'Successfully connected to %s', 'zume' ), $name ) ) ?>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <?php
    }
}
Zume_Training_Plan_Invite::instance();
