<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Friend_Invite extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Friend Invite';
    public $root = 'app';
    public $type = 'friend-invite';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_friend_invite';

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

        $this->page_title = esc_html__( 'Friend Invitation', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        if ( isset( $url_parts[0] ) && ( $this->root === $url_parts[0] && $this->type === $url_parts[1] ) && ! dt_is_rest() ) {

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
        global $zume_user_profile;
        ?>
         <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ); ?>" />

        <script>
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'connect_friend_url' => zume_connect_with_friend_wizard_url(),
                'is_logged_in' => is_user_logged_in(),
                'translations' => [
                    'enter_code' => __( 'Please enter a friend code.', 'zume' ),
                    'bad_code' => __( 'Not a recognized code. Please check the number.', 'zume' ),
                ],
            ]) ?>][0]

            jQuery(document).ready(function(){
                jQuery(document).foundation();

                const warningBanner = document.querySelector('.warning.banner')

                jQuery('.code_submit').click(function() {
                    var code = jQuery('#code').val();
                    if ( ! code ) {
                        show_error(jsObject.translations.enter_code)
                        return;
                    }

                    redirect_to_login( code )

                });

                function show_error( message ) {
                    warningBanner.innerHTML = SHAREDFUNCTIONS.escapeHTML(message)
                    jQuery(warningBanner).show()
                }

                function redirect_to_login( code ) {
                    const connectFriendUrl = new URL( jsObject.connect_friend_url )

                    const redirect =connectFriendUrl.searchParams.get('redirect_to')

                    const redirectURL = new URL(redirect)
                    redirectURL.searchParams.append( 'code', code )

                    connectFriendUrl.searchParams.delete('redirect_to')
                    connectFriendUrl.searchParams.append('redirect_to', redirectURL.href)
                    connectFriendUrl.searchParams.append('hide-nav', true)

                    location.href = connectFriendUrl.href
                }

                function submit_code( code ){
                    jQuery('.warning.banner').hide()
                    let user_id = '<?php echo esc_html( $zume_user_profile['user_id'] ); ?>';

                    zumeRequest.post( 'connect/friend', { code: code, user_id: user_id }).then( function( data ) {
                        console.log(data)
                        successBanner.innerHTML = successBanner.innerHTML.replace('::name::', data.name)
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
        zume_hreflang_fixed( $this->lang_code, $this->type );
    }

    public function body(){
        global $zume_user_profile;

        $key_code = false;
        if ( isset( $_GET['code'] ) ) {
            $key_code = sanitize_text_field( wp_unslash( $_GET['code'] ) );
        }

        if ( $key_code !== false ) {
            wp_redirect( zume_connect_with_friend_wizard_url( $key_code ) );
            exit;
        }

        ?>

        <div class="cover-page | bg-brand-gradient">

            <?php require __DIR__ . '/../parts/nav.php' ?>

            <div class="center" id="friend-invitation">

                <div class="grid-container rounded-multi">
                    <div class="hidden | text-center bg-brand-light px-1 py-0 shadow">
                        <div class="cover">
                            <div class="center | w-100">
                                <div class="w-70"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/Jesus-01.svg' ) ?>" alt=""></div>
                            </div>
                        </div>
                    </div>

                    <div class="text-center bg-white px-1 py-0 shadow rounded-start rounded-start-on-medium">
                        <h1 class="brand"><?php esc_html_e( 'Friend Invitation', 'zume' ) ?></h1>
                        <div class="stack-1 invitation-form">
                            <p><?php echo esc_html__( 'Use the code your friend sent you.', 'zume' ) ?></p>
                            <div class="">
                                <label for="code"></label>
                                <input class="input" id="code" type="text" placeholder="012345" value="<?php echo ( $key_code ) ? esc_attr( $key_code ) : ''  ?>" >
                            </div>
                            <button class="btn code_submit"><?php echo esc_html__( 'Connect', 'zume' ) ?></button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <?php
    }
}
Zume_Training_Friend_Invite::instance();
