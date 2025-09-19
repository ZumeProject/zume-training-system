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
    public $lang_slug = '';
    public $post_type = 'zume_plans';
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
        if ( $this->lang_code === 'en' || empty( $this->lang_code ) ) {
            $canon_url = trailingslashit( site_url() ) . $this->type;
        } else {
            $canon_url = trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type;
        }

        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
           
        </script>
        <script>
            const jsObject = [<?php echo json_encode([
                'locale' => $this->lang_code
            ]) ?>][0]
        </script>

        <link rel="canonical" href="<?php echo esc_url( $canon_url ); ?>" />

        <?php
        zume_hreflang_fixed( $this->lang_code, $this->type );
    }

    public function body(){
        global $zume_user_profile;
        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();
        $this->lang_slug = empty( $lang_code ) ? '' : '/' . $lang_code ;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-2 | page">
            <div class="container-md stack-2 center | py-2">
                <h1 class="text-center"><?php echo esc_html__( 'Join a training group', 'zume' ) ?></h1>
                <p><?php echo esc_html__( 'If you can‘t gather a group right now, consider joining one of our online training groups lead by an experienced Zúme coach.', 'zume' ) ?></p>
                <div class="">
                    <table>
                        <thead>
                            <tr>
                                <td><?php echo esc_html__( 'Name', 'zume' ) ?></td>
                                <td><?php echo esc_html__( 'Session', 'zume' ) ?></td>
                                <td><?php echo esc_html__( 'Next Session Date', 'zume' ) ?></td>
                                <td><?php echo esc_html__( 'Start Time', 'zume' ) ?></td>
                                <td><?php echo esc_html__( 'Timezone', 'zume' ) ?></td>
                                <td><?php echo esc_html__( 'Language', 'zume' ) ?></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                            $trainings = DT_Posts::list_posts( $this->post_type, [
                                'fields' => [
                                    [ 'visibility' => [ 'public' ] ],
                                    [ 'status' => [ 'active' ] ],
                                ],
                            ], false );

                            // Initialize variables for calendar component
                            $session_dates = [];
                            $next_session_formatted = '';

                            if ( !empty( $trainings['posts'] ) ) {
                                foreach ( $trainings['posts'] as $training ) {
                                    $session_info = Zume_Plans_Model::get_current_session( $training['ID'] );
                                    $next_session = Zume_Plans_Model::get_next_session_date( $training['ID'] );
                                    
                                    // Collect session dates for calendar component
                                    if ( !empty( $session_info ) && isset( $session_info['dates'] ) ) {
                                        foreach ( $session_info['dates'] as $date ) {
                                            $session_dates[] = [
                                                'date' => $date,
                                                'title' => $training['post_title'] ?? ''
                                            ];
                                        }
                                    }
                                    
                                    // Set the next session formatted date (use first training's next session)
                                    if ( empty( $next_session_formatted ) && !empty( $next_session ) ) {
                                        $next_session_formatted = $next_session;
                                    }
                                    ?>
                                    <tr>
                                        <td data-label="<?php echo esc_html__( 'Name', 'zume' ); ?>"><?php echo esc_html( $training['post_title'] ?? '' ); ?></td>
                                        <td data-label="<?php echo esc_html__( 'Session', 'zume' ); ?>"><?php echo esc_html( $session_info['total'] ?? '' ); ?></td>
                                        <td data-label="<?php echo esc_html__( 'Next Session Date', 'zume' ); ?>"><?php echo esc_html( $next_session ); ?></td>
                                        <td data-label="<?php echo esc_html__( 'Start Time', 'zume' ); ?>"><?php echo esc_html( $training['time_of_day_note'] ?? '' ); ?></td>
                                        <td data-label="<?php echo esc_html__( 'Timezone', 'zume' ); ?>"><?php echo esc_html( $training['timezone_note'] ?? '' ); ?></td>
                                        <td data-label="<?php echo esc_html__( 'Language', 'zume' ); ?>"><?php echo esc_html( $training['language_note'] ?? '' ); ?></td>
                                        <td>
                                            <a href="<?php echo $this->lang_slug ?>/training-group/<?php echo esc_html( $training['join_key'] ?? '' ); ?>" class="btn" data-code="<?php echo esc_attr( $training['join_key'] ?? '' ); ?>">
                                                <?php echo esc_html__( 'Join', 'zume' ); ?>
                                            </a>
                                        </td>
                                    </tr>
                                    <?php
                                }
                            } else {
                                ?>
                                <tr>
                                    <td colspan="7" class="text-center">
                                        <?php echo esc_html__( 'No active trainings available at this time.', 'zume' ); ?>
                                    </td>
                                </tr>
                                <?php
                            }
                            ?>
                        </tbody>
                    </table>
                    <calendar-select
                        style='--primary-color: var(--z-brand-light); --hover-color: var(--z-brand-fade)'
                        selectedDays="<?php echo esc_attr( json_encode( $session_dates ) ); ?>"
                        view="all"
                        startDate="<?php echo esc_attr( $next_session_formatted ); ?>"
                        endDate="<?php echo esc_attr( !empty( $session_dates ) ? $session_dates[ count( $session_dates ) - 1 ]['date'] : '' ); ?>"
                        viewOnly
                    ></calendar-select>
                </div>
                <button class="btn" id="toggle-future-trainings" data-toggle="future-trainings-collapse">
                    <?php echo esc_html__( 'Want to know about future trainings?', 'zume' ); ?>
                </button>
                <div class="reveal" id="future-trainings-collapse" data-reveal>
                    <div class="stack text-center">
                        <h3><?php echo esc_html__( 'Would you like to be notified about future trainings?', 'zume' ); ?></h3>
                        <p><?php echo esc_html__( 'We will send you an email when a new training is available.', 'zume' ); ?></p>
                        <p><?php echo esc_html__( 'You can always unsubscribe from these emails at any time.', 'zume' ); ?></p>
                        <a href="<?php echo esc_url( zume_notify_of_future_trainings_url() ) ?>" class="btn large uppercase fit-content mx-auto">
                            <?php echo esc_html__( 'Notify me', 'zume' ) ?>
                        </a>
                    </div>
                </div>
            </div>

            <!-- <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn large uppercase fit-content mx-auto">
                <?php echo esc_html__( 'Notify me about future trainings', 'zume' ) ?>
            </a> -->
        </div>
        <?php
    }
}
Zume_Join_A_Training_Public::instance();
