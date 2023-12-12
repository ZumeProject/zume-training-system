<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Wizard extends Zume_Magic_Page
{

    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'wizard';
    public $wizard_type = '';
    public $lang = 'en_US';
    public static $token = 'zume_app_wizard';

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
        $this->wizard_type = $url_parts[1] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
            add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 999 );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume-profile-utilities';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function enqueue_scripts() {
        wp_enqueue_script( 'zume-profile-utilities', trailingslashit( plugin_dir_url( __DIR__ ) ) . 'profile/profile-utilities.js', array(), filemtime( trailingslashit( plugin_dir_path( __FILE__ ) ) . 'profile-utilities.js' ), true );
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
                'root' => esc_url_raw( rest_url() ),
                'rest_endpoint' => esc_url_raw( rest_url() ) . 'zume_system/v1',
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
                'translations' => [
                    'bad_wizard' => __( 'Bad Wizard', 'zume' ),
                    'found_bad_wizard' => __( 'You have fallen in with some very bad wizards!', 'zume' ),
                    'home' => __( 'Get back home', 'zume' ),
                    'back' => __( 'Back', 'zume' ),
                    'next' => __( 'Next', 'zume' ),
                    'skip' => __( 'Skip', 'zume' ),
                    'finish' => __( 'Finish', 'zume' ),
                    'no_locations_found' => __( 'No locations found', 'zume' ),
                    'complete_profile' => [
                        'title' => __( 'Complete your profile', 'zume' ),
                        'phone' => __( 'Phone', 'zume' ),
                        'city' => __( 'City', 'zume' ),
                        'name' => __( 'Name', 'zume' ),
                        'name_question' => __( 'What is your name?', 'zume' ),
                        'phone_question' => __( 'What is your phone number?', 'zume' ),
                        'phone_error' => __( 'Phone number can only contain numbers, brackets and hyphens', 'zume' ),
                        'location_question' => __( 'What city do you live in?', 'zume' ),
                        'approximate_location' => __( 'This is your approximate location.', 'zume' ),
                        'done' => __( 'Done', 'zume' ),
                    ],
                    'get_a_coach' => [
                        'contact_preference_question' => __( 'What is your contact preference?', 'zume' ),
                        'email' => __( 'Email', 'zume' ),
                        'text' => __( 'Text', 'zume' ),
                        'phone' => __( 'Phone', 'zume' ),
                        'whatsapp' => __( 'Whatsapp', 'zume' ),
                        'signal' => __( 'Signal', 'zume' ),
                        'telegram' => __( 'Telegram', 'zume' ),
                        'messenger' => __( 'Facebook Messenger', 'zume' ),
                        'language_preference_question' => __( 'What is your language preference?', 'zume' ),
                        'language_preference' => __( 'Language', 'zume' ),
                        'how_can_we_serve' => __( 'How can we serve you?', 'zume' ),
                        'coaching' => __( 'Coaching', 'zume' ),
                        'technical_assistance' => __( 'Technical Assistance', 'zume' ),
                        'question_implementation' => __( 'Question about implementing the training', 'zume' ),
                        'question_content' => __( 'Question about the content', 'zume' ),
                        'help_with_group' => __( 'Help with what to do after starting a group', 'zume' ),
                        'done' => __( 'Done', 'zume' ),
                        'missing_response' => __( 'Please give a response to this question', 'zume' ),
                        'connect_success' => __( 'Request Submitted, we will do our best to connect you with a coach near you.', 'zume' ),
                        'connect_fail' => __( 'Sorry. We were unable to submit your request. Please try again later.', 'zume' ),
                        'already_coached' => __( 'You have already requested a coach', 'zume' ),
                        'error_connecting' => __( 'Error connecting with a coach', 'zume' ),
                        'connecting_coach_title' => __( 'Connecting you to a Coach', 'zume' ),
                        'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                    ],
                    'join_training' => [
                        'title' => __( 'Joining Plan', 'zume' ),
                        'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                        'broken_link' => __( 'The training link is broken. Please try again.', 'zume' ),
                        'success' => __( 'Successfully joined training %s', 'zume' ),
                        'error' => __( 'Something went wrong while joining the plan', 'zume' ),
                    ],
                    'connect_friend' => [
                        'title' => __( 'Connecting with friend', 'zume' ),
                        'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                        'broken_link' => __( 'The friend link is broken. Please try again.', 'zume' ),
                        'success' => __( 'Successfully connected with friend %s', 'zume' ),
                        'error' => __( 'Something went wrong while connecting with friend', 'zume' ),
                    ],
                    'checkin' => [
                        'title' => __( 'Checking in', 'zume' ),
                        'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                        'broken_link' => __( 'The checkin link is broken. Please try again.', 'zume' ),
                        'success' => __( 'Successfully checked in', 'zume' ),
                        'error' => __( 'Something went wrong while checking in', 'zume' ),
                    ],
                    'share' => array_merge( [
                        'title' => __( 'Invite your friends to join your training', 'zume' ),
                        'share_with_friends' => __( 'Share the link below with your friends so that they can join your training.', 'zume' ),
                        'join_my_plan' => __( 'Join my zume plan', 'zume' ),
                    ], Zume_Training_Share::translations() ),
                ],
            ]) ?>][0]
            const zumeProfile = [<?php echo json_encode([
                'map_key' => DT_Mapbox_API::get_key(),
                'profile' => $zume_user_profile,
                'mapbox_selected_id' => 'current',
            ]) ?>][0]
        </script>
        <?php
    }

    public function body(){
        global $zume_user_profile;

        if ( !is_user_logged_in() ) {
            wp_redirect( zume_login_url( 'login', dt_get_url_path( false, true ) ) );
        }
        ?>

        <zume-wizard
            type="<?php echo esc_attr( $this->wizard_type ) ?>"
            finishUrl="<?php echo esc_url( zume_dashboard_url() ) ?>"
            user="<?php echo esc_attr( json_encode( $zume_user_profile ) ) ?>"
        ></zume-wizard>

        <?php
    }
}
Zume_Training_Wizard::instance();
