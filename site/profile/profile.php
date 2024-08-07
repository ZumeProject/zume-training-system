<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Profile extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Profile';
    public $root = 'app';
    public $type = 'profile';
    public $lang = 'en';
    public static $token = 'app_profile';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        $this->page_title = esc_html__( 'Profile', 'zume' );

        $this->lang = get_locale();

        [
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->require_authentication();

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

            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 999 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume-profile';
        $allowed_js[] = 'zume-profile-utilities';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function enqueue_scripts() {
        wp_enqueue_script( 'zume-profile-utilities', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'profile-utilities.js', array(), filemtime( trailingslashit( plugin_dir_path( __FILE__ ) ) . 'profile-utilities.js' ), true );
        wp_enqueue_script( 'zume-profile', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'profile.js', array( 'zume-profile-utilities' ), filemtime( trailingslashit( plugin_dir_path( __FILE__ ) ) . 'profile.js' ), true );
    }

    public function header_style(){
        global $zume_user_profile;
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'map_key' => DT_Mapbox_API::get_key(),
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'profile' => $zume_user_profile,
                'mapbox_selected_id' => 'current',
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
            ]) ?>][0]

        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;
        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container">

            <h1 class="text-center"><?php echo esc_html__( 'Profile', 'zume' ) ?></h1>

            <form action="" id="profile-form">

                <div class="">
                    <label for="full_name"><?php echo esc_html__( 'Name', 'zume' ) ?></label>
                    <input required type="text" id="full_name" name="full_name" value="<?php echo esc_attr( $zume_user_profile['name'] ) ?>">
                </div>
                <div class="">
                    <label for="phone"><?php echo esc_html__( 'Phone', 'zume' ) ?></label>
                    <input type="tel" id="phone" name="phone" value="<?php echo esc_attr( $zume_user_profile['phone'] ) ?>">
                </div>
                <div class="">
                    <label for="email"><?php echo esc_html__( 'Email', 'zume' ) ?></label>
                    <input type="email" id="email" name="email" value="<?php echo esc_attr( $zume_user_profile['email'] ) ?>">
                </div>
                <div class="">
                    <label for="city"><?php echo esc_html__( 'City', 'zume' ) ?></label>
                    <input type="text" id="city" name="city" value="<?php echo esc_attr( $zume_user_profile['location']['label'] ?? '' ) ?>">
                </div>
                <div id="address_results">

                </div>

                <?php global $zume_languages_by_code; ?>

                <div>
                    <label for="preferred-language"><?php echo esc_html__( 'Language', 'zume' ) ?></label>
                    <select name="preferred-language" id="preferred-language">

                    <?php foreach ( $zume_languages_by_code as $item ) : ?>

                        <option value="<?php echo esc_attr( $item['code'] ) ?>" <?php echo $zume_user_profile['preferred_language'] === $item['code'] ? 'selected' : '' ?>>
                            <?php echo esc_html( $item['nativeName'] ) ?> -
                            <?php echo esc_html( $item['enDisplayName'] ) ?>
                        </option>

                    <?php endforeach; ?>

                    </select>
                </div>

                <button class="btn" id="submit-profile"><?php echo esc_html__( 'Save', 'zume' ) ?></button>
                <span class="loading-spinner"></span>

            </form>

            <br>
            <a href="<?php echo esc_url( dt_login_url( 'logout' ) ) ?>" class="btn outline"><?php echo esc_html__( 'Logout', 'zume' ) ?></a>

            <hr>
            <p><strong><?php echo esc_html__( 'User Profile', 'zume' ) ?></strong><pre><?php print_r( $zume_user_profile ); ?></pre></p>
        </div>
        <?php
    }
}
Zume_Training_Profile::instance();

