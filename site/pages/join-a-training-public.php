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
            $lang_slug = empty( $code ) ? '' : $code . '/';

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
            $canon_url =  trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ;
        }

        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>

        <link rel="canonical" href="<?php echo esc_url( $canon_url ); ?>" />

        <?php
        zume_hreflang_fixed( $this->lang_code, $this->type );
    }

    public function body(){
        global $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-2 | page">
            <div class="container-md stack-2 center | py-2">
                <h1 class="text-center"><?php echo esc_html__( 'Join a training group', 'zume' ) ?></h1>
                <p><?php echo esc_html__( 'If you can‘t gather a group right now, consider joining one of our online training groups lead by an experienced Zúme coach.', 'zume' ) ?></p>
                <div class="switcher ">
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
                                    [ 'status' => [ 'active' ] ]
                                ]
                            ], false );

                            if ( !empty( $trainings['posts'] ) ) {
                                foreach ( $trainings['posts'] as $training ) {
                                    $session_info = $this->get_current_session($training);
                                    $next_session = $this->get_next_session_date($training);
                                    ?>
                                    <tr>
                                        <td data-label="Name"><?php echo esc_html( $training['post_title'] ?? '' ); ?></td>
                                        <td data-label="Session"><?php echo esc_html( $session_info['current'] ); ?> / <?php echo esc_html( $session_info['total'] ); ?></td>
                                        <td data-label="Next Session Date"><?php echo esc_html( $next_session ); ?></td>
                                        <td data-label="Start Time"><?php echo esc_html( $training['time_of_day_note'] ?? '' ); ?></td>
                                        <td data-label="Timezone"><?php echo esc_html( $training['timezone_note'] ?? '' ); ?></td>
                                        <td data-label="Language"><?php echo esc_html( $training['language_note'] ?? '' ); ?></td>
                                        <td>
                                            <a href="/app/plan-invite?code=<?php echo esc_html( $training['join_key'] ?? '' ); ?>" class="btn" data-code="<?php echo esc_attr( $training['join_key'] ?? '' ); ?>">
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
                </div>
            </div>

            <!-- <a href="<?php echo esc_url( zume_get_a_coach_wizard_url() ) ?>" class="btn large uppercase fit-content mx-auto">
                <?php echo esc_html__( 'Notify me about future trainings', 'zume' ) ?>
            </a> -->
        </div>
        <?php
    }

    private function get_current_session($training) {
        $set_type = $training['set_type']['key'] ?? '';
        $total = intval($training['set_type']['label'] ?? 0);
        $current = 1;

        if ($set_type) {
            $today = time();
            for ($i = 1; $i <= $total; $i++) {
                $session_key = sprintf('%s_%02d', $set_type, $i);
                if (isset($training[$session_key]['timestamp']) && $training[$session_key]['timestamp'] > $today) {
                    break;
                }
                $current = $i;
            }
        }

        return array(
            'current' => $current,
            'total' => $total
        );
    }

    // Add this function to get the next session date
    private function get_next_session_date($training) {
        $set_type = $training['set_type']['key'] ?? '';
        $total = intval($training['set_type']['label'] ?? 0);

        $today = time();
        for ($i = 1; $i <= $total; $i++) {
            $session_key = sprintf('%s_%02d', $set_type, $i);
            if (isset($training[$session_key]['timestamp']) && $training[$session_key]['timestamp'] > $today) {
                return date('Y-m-d', $training[$session_key]['timestamp']);
            }
        }
        return '';
    }
}
Zume_Join_A_Training_Public::instance();
