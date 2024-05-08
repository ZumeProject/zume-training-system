<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Wizard extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'app';
    public $type = 'wizard';
    public $wizard_type = '';
    public $lang = 'en_US';
    public static $token = 'app_wizard';

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
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';
        $this->wizard_type = $url_parts[1] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

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

    public function enqueue_scripts() {}

    public function header_style(){
        global $zume_user_profile, $zume_languages_by_code;
        ?>
        <?php //phpcs:ignore ?>
        <script src="<?php echo trailingslashit( plugin_dir_url( __DIR__ ) ) . 'profile/profile-utilities.js?version=' . filemtime( trailingslashit( plugin_dir_path( __DIR__ ) ) . 'profile/profile-utilities.js' ) ?>"></script>
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
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . '/assets/images' ),
                'language_cookie' => ZUME_LANGUAGE_COOKIE,
                'languages' => $zume_languages_by_code,
                'translations' => $this->translations(),
                'map_key' => DT_Mapbox_API::get_key(),
                'profile' => $zume_user_profile,
                'mapbox_selected_id' => 'current',
                'checkin_dashboard_url' => zume_checkin_dashboard_url(),
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

        <noscript>

            <?php require plugin_dir_path( __DIR__ ) . 'parts/noscript.php' ?>

        </noscript>
        <?php
    }

    public static function translations() {
        return [
            'bad_wizard' => __( 'Bad Wizard', 'zume' ),
            'found_bad_wizard' => __( 'You have fallen in with some very bad wizards!', 'zume' ),
            'completed_wizard_title' => __( 'Wizard is already completed', 'zume' ),
            'home' => __( 'Get back home', 'zume' ),
            'back' => __( 'Back', 'zume' ),
            'next' => __( 'Next', 'zume' ),
            'skip' => __( 'Skip', 'zume' ),
            'finish' => __( 'Finish', 'zume' ),
            'no_locations_found' => __( 'No locations found', 'zume' ),
            'join_community' => __( 'Join the Community', 'zume' ),
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
                'next' => __( 'Next', 'zume' ),
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
                'next' => __( 'Next', 'zume' ),
                'missing_response' => __( 'Please give a response to this question', 'zume' ),
                'connect_success' => __( 'Request Submitted, we will do our best to connect you with a coach near you.', 'zume' ),
                'connect_fail' => __( 'Sorry. We were unable to submit your request. Please try again later.', 'zume' ),
                'already_coached' => __( 'You have already requested a coach', 'zume' ),
                'error_connecting' => __( 'Error connecting with a coach', 'zume' ),
                'connecting_coach_title' => __( 'Connecting you to a Coach', 'zume' ),
                'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                'title' => __( 'Get a Coach', 'zume' ),
            ],
            'join_training' => [
                'title' => __( 'Joining Plan', 'zume' ),
                'please_wait' => __( 'Please wait while we connect you', 'zume' ),
                'broken_link' => __( 'The training link is broken. Please try again.', 'zume' ),
                'success' => __( 'Successfully joined training %s', 'zume' ),
                'error' => __( 'Something went wrong while joining the plan', 'zume' ),
                'name' => __( 'Name', 'zume' ),
                'next_date' => __( 'Next Session Date', 'zume' ),
                'start_time' => __( 'Start Time', 'zume' ),
                'timezone' => __( 'Timezone', 'zume' ),
                'language' => __( 'Language', 'zume' ),
                'join' => __( 'Join', 'zume' ),
                'no_plans' => __( 'There are currently no public trainings available.', 'zume' ),
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
            'make_training' => [
                'join_or_start_a_training' => __( 'Join or create a training group', 'zume' ),
                'start_a_training' => __( 'Create a training group', 'zume' ),
                'join_a_public_training' => __( 'Join a public training group', 'zume' ),
                'skip_for_now' => __( 'Skip for now', 'zume' ),
                'question_which_session' => __( 'Choose your course format', 'zume' ),
                'hour_1_session_20' => __( '1 hour (20 sessions)', 'zume' ),
                'hour_2_session_10' => __( '2 hour (10 sessions)', 'zume' ),
                'hour_4_session_5' => __( '4 hour (5 sessions)', 'zume' ),
                'question_which_time' => __( 'What time of day?', 'zume' ),
                'morning' => __( 'Morning', 'zume' ),
                'afternoon' => __( 'Afternoon', 'zume' ),
                'evening' => __( 'Evening', 'zume' ),
                'question_how_often' => __( 'How often will you meet?', 'zume' ),
                'daily' => __( 'Every day', 'zume' ),
                'weekly' => __( 'Once a week', 'zume' ),
                'biweekly' => __( 'Twice a month', 'zume' ),
                'monthly' => __( 'Once a month', 'zume' ),
                'other' => __( 'Other', 'zume' ),
                'question_when_will_you_start' => __( 'When do you plan to start?', 'zume' ),
                'question_where_will_you_meet' => __( 'Where do you plan to meet?', 'zume' ),
                'question_where_will_you_meet_help_text' => __( 'This could be online or in person', 'zume' ),
                'review_training' => __( 'Create your new training group', 'zume' ),
                'you_can_change_your_choices' => __( 'You can change your choices here', 'zume' ),
                'done' => __( 'Done', 'zume' ),
                'skip' => __( 'Skip', 'zume' ),
                'create' => __( 'Create', 'zume' ),
                'time' => __( 'Time', 'zume' ),
                'date' => __( 'Date', 'zume' ),
                'summary' => __( 'Summary', 'zume' ),
                'change' => __( 'Change', 'zume' ),
            ],
            'share' => array_merge( [
                'title' => __( 'Invite your friends to join your training', 'zume' ),
                'share_with_friends' => __( 'Share the link below with your friends so that they can join your training.', 'zume' ),
                'join_my_plan' => __( 'Join my zume plan', 'zume' ),
            ], Zume_Training_Share::translations() ),
        ];
    }
}
Zume_Training_Wizard::instance();
