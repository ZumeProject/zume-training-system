<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Activites_3monthplan extends Zume_Activites
{
    public $page_title = 'Zúme Activity';
    public $root = 'zume_activities';
    public $type = '3monthplan';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        parent::__construct();

        if ( $this->url_matches_this_activity() ) {
            $this->require_authentication();
        }
    }
    public function body(){
        $questions = Zume_Training_Dashboard::three_month_plan_questions();
        ?>
        <div class="activity-page">
            <header class="bg-brand">
                <div class="container-md | activity-header">
                    <div class="logo"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/zume-training-logo-white-short.svg' ) ?>" alt="logo"></div>
                </div>
            </header>
            <div class="container-md">
                <h1 class="activity-title"><?php echo esc_html__( '3-Month Plan', 'zume' ) ?></h1>
                <a class="f-0" href="<?php site_url() ?>/zume_activities/3monthplan_html"><?php echo esc_html__( 'Switch to Printable Version', 'zume' ) ?></a>
            </div>
            <hr>
            <div class="container-md activity-content">
                <div id="pieces-content" class="stack">
                    <?php
                    foreach ( $questions as $question ){
                        ?>
                        <div class="stack--3">
                            <label for="plan_name"><?php echo esc_html( $question ) ?></label>
                            <textarea class="input" rows="1"></textarea>
                        </div>
                        <?php
                    }
                    ?>
                    <div class="center">
                        <button class="btn light uppercase d-block"><?php echo esc_html__( 'Save', 'zume' ) ?></button>
                    </div>
                </div>
            </div>
        </div>
        </hr>
        <?php
    }

}
Zume_Activites_3monthplan::instance();

