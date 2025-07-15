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

        ?>
        <script>
            jQuery(document).ready(() => {
                jQuery(document).foundation()
            })
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
        $training_group = get_post( $this->post_id );
        $training_group_facilitator = get_user_by( 'id', $training_group->post_author );
        $training_group_meta = get_post_meta( $this->post_id );
        $training_group = [
            ...$training_group->to_array(),
            ...$training_group_meta,
            'facilitator' => $training_group_facilitator,
        ];
        $time_of_day_note = $training_group['time_of_day_note'][0];
        $location_note = $training_group['location_note'][0];
        $timezone_note = $training_group['timezone_note'][0];
        $visibility = $training_group['visibility'][0] === 'public' ? esc_html__( 'Public', 'zume' ) : esc_html__( 'Private', 'zume' );
        $status = $training_group['status'][0] === 'active' ? esc_html__( 'Active', 'zume' ) : esc_html__( 'Inactive', 'zume' );
        $session_info = Zume_Plans_Model::get_current_session( $this->post_id );
        $next_session = Zume_Plans_Model::get_next_session_date( $this->post_id );
        $session_dates = Zume_Plans_Model::get_session_dates( $this->post_id );
        $is_public = $training_group['visibility'][0] === 'public';
        $join_url = $is_public ? zume_join_a_public_plan_wizard_url( $this->code ) : zume_join_friends_training_wizard_url( $this->code );
        ?>

        <div class="page container-md stack">
            <h1 class="text-center brand-light"><?php echo esc_html( $training_group['post_title'] ); ?></h1>
            <h2 class="h3 text-center"><?php echo esc_html__( 'Training Group Details', 'zume' ); ?></h2>
            <table class="table center">
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
                        <td class="f-medium"><?php echo esc_html__( 'Time of Day', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $time_of_day_note ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Timezone', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $timezone_note ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Session', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $session_info['current'] ); ?> / <?php echo esc_html( $session_info['total'] ); ?></td>
                    </tr>
                    <tr>
                        <td class="f-medium"><?php echo esc_html__( 'Next Session Date', 'zume' ); ?>:</td>
                        <td><?php echo esc_html( $next_session ); ?></td>
                    </tr>
                </tbody>
            </table>
            <calendar-select
                style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                selectedDays="<?php echo esc_attr( json_encode( $session_dates ) ); ?>"
                view="all"
                startDate="<?php echo esc_attr( $next_session ); ?>"
                endDate="<?php echo esc_attr( $session_dates[ count( $session_dates ) - 1 ]['date'] ); ?>"
                viewOnly
            ></calendar-select>
            <div class="stack-2 fit-content mx-auto">
                <a href="<?php echo esc_url( $join_url ); ?>" class="btn large">
                    <?php echo esc_html__( 'Join Training Group', 'zume' ); ?>
                </a>

                <?php if ( $is_public ) : ?>

                    <a href="<?php echo esc_url( zume_join_a_public_plan_url() ); ?>" class="btn outline">
                        <?php echo esc_html__( 'Back to Public Training Groups', 'zume' ); ?>
                    </a>

                <?php endif; ?>
            </div>
        </div>

        <?php
    }
}
Zume_Training_Plans_URL::instance();
