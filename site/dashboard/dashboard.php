<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Dashboard extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'dashboard';
    public $lang = 'en';
    public static $token = 'zume_app_dashboard';

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

        $post = zume_get_post_by_slug( $page_slug );

        if ( $post && str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->require_authentication();

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

            add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 100 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        $allowed_js[] = 'zume_forms';
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function wp_enqueue_scripts() {
        wp_enqueue_script( 'zume_forms', plugin_dir_url( __FILE__ ) . 'forms.js', [ 'jquery' ], filemtime( plugin_dir_path( __FILE__ ) . 'forms.js' ), true );
        wp_localize_script(
            'zume_forms', 'zumeForms', array(
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'site_url' => get_site_url(),
                'template_dir' => get_template_directory_uri(),
                'user_profile' => zume_get_user_profile(),
                'training_items' => zume_training_items(),
                'friends' => zume_get_user_friends(),
                'translations' => [
                    'share' => __( 'Share', 'zume' ),
                    'copy_link' => __( 'Copy Link', 'zume' ),
                    'copy_and_share_text' => __( 'Copy this link and send it to your friends 🙂', 'zume' ),
                    'share_feedback' => __( 'Thanks!', 'zume' ),
                    'copy_feedback' => __( 'Link copied', 'zume' ),
                ],
            )
        );
    }

    public function header_style(){}

    public function body(){
        require __DIR__ . '/../parts/nav.php';
        ?>
        <div class="dashboard">

            <div class="dashboard__sidebar">
                <ul class="stack-2 | progress-menu accordion-menu" data-accordion-menu data-submenu-toggle="true">
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn">
                            <span class="icon zume-start brand-light"></span>
                            <?php echo esc_html__( 'Getting Started', 'zume' ) ?>
                        </a>
                        <progress-circle percent="66" radius="12"></progress-circle>

                        <ul class="nested is-active">
                            <li><a class="menu-btn" href="#" aria-disabled="true" data-completed="true"><span class="icon zume-profile brand-light"></span> <span><?php echo esc_html__( 'Set Profile', 'zume' ) ?></span></a><span class="icon zume-check-mark success"></span></li>
                            <li><a class="menu-btn" href="#" aria-disabled="true" data-completed="true"><span class="icon zume-start-group brand-light"></span><span><?php echo esc_html__( 'Create a Training', 'zume' ) ?></span></a><span class="icon zume-check-mark success"></span></li>
                            <li><a class="menu-btn" href="#" aria-disabled="true" data-completed="true"><span class="icon zume-invite brand-light"></span><span><?php echo esc_html__( 'Join a Training', 'zume' ) ?></span></a><span class="icon zume-check-mark success"></span></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-coach brand-light"></span><span><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></span></a><span class="icon zume-check-mark success"></span></li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn"><span class="icon zume-training brand-light"></span><?php echo esc_html__( 'Training', 'zume' ) ?></a>
                        <ul class="nested is-active">
                            <li><a class="menu-btn" href="#"><span class="icon zume-progress brand-light"></span><span><?php echo esc_html__( 'My Progress', 'zume' ) ?></span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-group brand-light"></span><span><?php echo esc_html__( 'My Training', 'zume' ) ?></span></a></li>
                        </ul>
                    </li>
                    <li class="menu-section">
                        <a href="#" class="menu-section__title menu-btn"><span class="icon zume-practicing brand-light"></span><?php echo esc_html__( 'Practicing', 'zume' ) ?></a>
                        <ul class="nested">
                            <li><a class="menu-btn" href="#"><span class="icon zume-tools brand-light"></span><span><?php echo esc_html__( 'My Tools', 'zume' ) ?></span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-plans brand-light"></span><span><?php echo esc_html__( 'My Plans', 'zume' ) ?></span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-churches brand-light"></span><span><?php echo esc_html__( 'My Churches', 'zume' ) ?></span></a></li>
                            <li><a class="menu-btn" href="#"><span class="icon zume-pin brand-light"></span><span><?php echo esc_html__( 'My Maps', 'zume' ) ?></span></a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="dashboard__titlebar">
                <h1 class="h3">Title here</h1>
                <button class="btn uppercase light" data-toggle="launch-course-panel">
                    <?php echo esc_html__( 'Launch Course', 'zume' ) ?>
                </button>
                <div class="dropdown-pane" id="launch-course-panel" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="right" data-close-on-click="true">
                    <ul>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_10_session_url() ) ?>"><span class="icon zume-course"></span><?php echo esc_html__( '10 Session Course', 'zume' ) ?></a></li>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_20_session_url() ) ?>"><span class="icon zume-course"></span><?php echo esc_html__( '20 Session Course', 'zume' ) ?></a></li>
                        <li><a class="menu-btn" href="<?php echo esc_url( zume_intensive_session_url() ) ?>"><span class="icon zume-course"></span><?php echo esc_html__( '3 Day Intensive Course', 'zume' ) ?></a></li>
                    </ul>
                </div>

            </div>

            <div class="dashboard__main">

                <?php
                /**
                 * DEV SECTION - REMOVE FOR PRODUCTION
                 */
                global $zume_user_profile;
                $plans = zume_get_user_plans();
                $stage = zume_get_user_stage();
                $host = zume_get_user_host();
                $commitments = zume_get_user_commitments();
                $mawl = zume_get_user_mawl();
                $friends = zume_get_user_friends();
                ?>

                <div class="grid-x grid-margin-x">
                    <div class="cell medium-8">
                        <p><strong><?php echo esc_html__( 'User Profile', 'zume' ) ?></strong><pre><?php print_r( $zume_user_profile ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User Stage', 'zume' ) ?></strong><pre><?php print_r( $stage ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User Friends', 'zume' ) ?></strong><pre><?php print_r( $friends ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User Plans', 'zume' ) ?></strong><pre><?php print_r( $plans ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User HOST', 'zume' ) ?></strong><pre><?php print_r( $host ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User Commitments', 'zume' ) ?></strong><pre><?php print_r( $commitments ); ?></pre></p><hr />
                        <p><strong><?php echo esc_html__( 'User MAWL', 'zume' ) ?></strong><pre><?php print_r( $mawl ); ?></pre></p><hr />
                    </div>
                    <div class="cell medium-4">
                        <p><button class="button cta_set_profile" />Set Profile</button></p>
                        <p><a class="button cta_get_a_coach" href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" />Get a Coach</a></p>
                        <p><button class="button cta_invite_friends" />Invite to Friendship</button></p>
                        <p><a class="button" href="<?php echo esc_url( zume_join_a_public_plan_wizard_url() ) ?>" />Join a public Plan</a></p>
                        <p><a class="button" href="<?php echo esc_url( zume_invite_friends_url() ) ?>" />Join a friend's Plan</a></p>
                        <p><button class="button cta_make_a_plan" />Make a Plan</button></p>
                        <p><button class="button cta_invite_plan" />Invite to Plan</button></p>
                        <p><button class="button cta_work_the_plan" />Work a Plan</button></p>
                        <p><button class="button" onclick="window.location.href = 'https://zume5.training/course_app/10session'" />10 Session Course</button></p>
                        <p><button class="button" onclick="window.location.href = 'https://zume5.training/course_app/20session'" />20 Session Course</button></p>
                        <p><button class="button cta_post_training_plan" />Create 3-Month Plan</button></p>
                        <hr>
                        <p><button class="button cta_join_vision" />Join Practioner Community</button></p>
                        <p><button class="button cta_practitioner_reports" />Report New Churches</button></p>
                        <p><button class="button cta_commitments" />3-Month Commitments</button></p>
                        <p><button class="button cta_host_progress" />HOST Progress</button></p>
                        <hr>
                        <p><button class="button cta_other_commitments" />Other Commitments</button></p>
                    </div>
                </div>
            </div>
            <!--END DEV SECTION -->

            <div class="dashboard__secondary">
                <div class="stack | card cta">
                    <h2 class="h5 text-center"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></h2>
                    <p>Don't forget about our free coaching</p>
                    <a href="#" class="btn light uppercase"><?php echo esc_html__( 'Get a Coach', 'zume' ) ?></a>
                </div>
            </div>

        </div>
        <?php
    }
}
Zume_Training_Dashboard::instance();
