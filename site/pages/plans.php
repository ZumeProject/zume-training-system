<?php
if ( !defined( 'ABSPATH' ) ) { exit; }

class Zume_Training_Plans_URL extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Training Group';
    public $root = 'training-group';
    public $type = 'home';
    public $lang_code = 'en';
    public $page_description = '';
    public $canonical_url = 'https://zume.training/';
    public $post_id = false;
    public $code = false;
    public static $token = 'starter_app_home';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $this->lang_code = $lang_code;

        if ( isset( $url_parts[0] ) && $url_parts[0] === $this->root && !empty( $url_parts[1] ) ) {
            $code = $url_parts[1];

            $this->code = $code;

            $this->post_id = Zume_Connect_Endpoints::test_join_key( $this->code );

            // no post id found
            if ( ! $this->post_id ) {
                return;
            }

            $training_group = get_post( $this->post_id );

            // set page title
            $this->page_title = $training_group->post_title;

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
        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();
        $language = zume_languages($lang_code);
        ?>
       
        <script>
            jQuery(document).ready(() => {
                jQuery(document).foundation()

            })
        </script>
         <script>
            const jsObject = [<?php echo json_encode([
                'locale' => $this->lang_code
            ]) ?>][0]
        </script>

        <?php if ( $this->lang_code == 'en' || empty( $this->lang_code ) ) { ?>
            <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->root . '/' . $this->code ); ?>" />
        <?php } else { ?>
            <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->root . '/' . $this->code ); ?>" />
            <?php
        }
    }

    public function header_script() {
    }

    public function body(){
        require __DIR__ . '/../parts/nav.php';
        $training_group = Zume_Plans_Model::get_plan( $this->post_id );
        $training_group_facilitator = get_user_by( 'id', $training_group['post_author'] );
        $training_group['facilitator'] = $training_group_facilitator;

        $time_of_day_note = $training_group['time_of_day_note'];
        $time_of_day_formatted = $training_group['time_of_day_formatted'];
        $time_of_day = $training_group['time_of_day'];
        $location_note = $training_group['location_note'];
        $timezone_note = $training_group['timezone_note'];
        $timezone = $training_group['timezone'];
        $is_public = $training_group['visibility']['key'] === 'public';
        $visibility = $is_public ? esc_html__( 'Public', 'zume' ) : esc_html__( 'Private', 'zume' );
        $status = $training_group['status']['key'] === 'active' ? esc_html__( 'Active', 'zume' ) : esc_html__( 'Inactive', 'zume' );
        $session_info = Zume_Plans_Model::get_current_session( $this->post_id );
        $next_session_formatted = $training_group['next_session_date_formatted'];
        $next_session = $training_group['next_session_date'];
        $session_dates = Zume_Plans_Model::get_session_dates( $this->post_id );
        $join_url = $is_public ? zume_join_a_public_plan_wizard_url( $this->code ) : zume_join_friends_training_wizard_url( $this->code );

        if ( is_user_logged_in() ) {
            $profile = zume_get_user_profile();
            $user_timezone = $profile['timezone'];
        } else {
            $user_timezone = '';
        }

        // we want to find the time of the course in the user's timezone.
        // so e.g. if the training group is 10am in GMT+0, and the user is in GMT+1, we want to show 11am.
        // we can do this by converting the training group time to the user's timezone.
        if ( !empty( $time_of_day_formatted ) && !empty( $next_session_formatted ) && !empty( $user_timezone ) ) {
            $next_session_datetime_in_user_timezone = Zume_Plans_Model::get_next_session_date_in_user_timezone( $this->post_id, $user_timezone );
        } else {
            $next_session_datetime_in_user_timezone = '';
        }

        ?>

        <div class="page container-md stack">
            <h1 class="text-center brand-light"><?php echo esc_html( $training_group['title'] ); ?></h1>
            <div class="text-center"><strong><?php echo esc_html__( 'Training Group Details', 'zume' ); ?></strong></div>
            <table class="center" no-labels>
                <tbody>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Facilitator', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $training_group['facilitator']->display_name ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Location', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $location_note ); ?></td>
                    </tr>
                    
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Session', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $session_info['total'] ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Next Session Date', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $next_session_formatted ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Time of Day', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $time_of_day_formatted ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Timezone', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $timezone_note ); ?></td>
                    </tr>
                </tbody>
            </table>

           
            <calendar-select
                style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                selectedDays="<?php echo esc_attr( json_encode( $session_dates ) ); ?>"
                view="all"
                startDate="<?php echo esc_attr( $next_session ); ?>"
                endDate="<?php echo esc_attr( !empty( $session_dates ) ? $session_dates[ count( $session_dates ) - 1 ]['date'] : '' ); ?>"
                viewOnly
            ></calendar-select>

            <div class="stack-2 fit-content mx-auto">
                <a href="<?php echo esc_url( $join_url ); ?>" class="btn large">
                    <?php echo esc_html__( 'Join Training Group', 'zume' ); ?>
                </a>

                <?php if ( $is_public ) : ?>
                    <br><br><br><br>
                    <a href="<?php echo esc_url( zume_join_a_public_plan_url( $this->lang_code ) ); ?>" class="btn outline">
                        <?php echo esc_html__( 'Back to Public Training Groups', 'zume' ); ?>
                    </a>

                <?php endif; ?>
            </div>
        </div>

        <?php
    }
}
Zume_Training_Plans_URL::instance();
