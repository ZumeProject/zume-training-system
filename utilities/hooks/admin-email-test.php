<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Ensure this script only runs in the admin area

class Zume_Email_Test_Admin {
    /**
     * @var Zume_Encouragement_Cron The cron instance for testing
     */
    private $cron_instance;

    /**
     * Constructor
     */
    public function __construct() {
        if ( ! is_admin() ) {
            return;
        }

        // Make sure the cron class is available
        if ( ! class_exists( 'Zume_Encouragement_Cron' ) ) {
            add_action( 'admin_notices', function () {
                echo '<div class="notice notice-error"><p>Zume_Encouragement_Cron class not found. Please ensure the encouragement-cron.php file is loaded.</p></div>';
            });
            return;
        }

        // Get the global cron instance
        $this->cron_instance = new Zume_Encouragement_Cron();

        add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
        add_action( 'admin_init', array( $this, 'handle_form_submission' ) );
    }

    /**
     * Handle form submission
     */
    public function handle_form_submission() {
        if ( ! isset( $_POST['zume_email_test_nonce'] ) || ! wp_verify_nonce( $_POST['zume_email_test_nonce'], 'zume_email_test_action' ) ) {
            return;
        }

        // Handle cron test submission
        if ( isset( $_POST['run_cron_test'] ) && isset( $_POST['cron_test_date'] ) ) {
            $this->run_cron_test( sanitize_text_field( $_POST['cron_test_date'] ) );
        }

        // Handle regular cron test (no date - processes oldest messages)
        if ( isset( $_POST['run_regular_cron_test'] ) ) {
            $this->run_regular_cron_test();
        }
    }

    /**
     * Run a test of the encouragement cron job with a specific date
     *
     * @param string $test_date The date to test with
     */
    private function run_cron_test( $test_date ) {
        if ( empty( $test_date ) ) {
            add_action( 'admin_notices', function () {
                echo '<div class="notice notice-error"><p>Please provide a test date.</p></div>';
            });
            return;
        }

        // Use the encouragement cron to run the test
        $results = $this->cron_instance->run_test( $test_date );

        // Display results
        $this->display_test_results( $results, "Date-specific Test ($test_date)" );
    }

    /**
     * Run a test of the regular encouragement cron job (processes oldest messages)
     */
    private function run_regular_cron_test() {
        // Use the encouragement cron to process unsent messages with results
        $results = $this->cron_instance->process_unsent_messages( null, true );

        // Display results
        $this->display_test_results( $results, 'Regular Cron Test (Oldest Messages)' );
    }

    /**
     * Display test results in admin notices
     *
     * @param array $results The results from the cron test
     * @param string $test_type The type of test that was run
     */
    private function display_test_results( $results, $test_type ) {
        add_action( 'admin_notices', function () use ( $results, $test_type ) {
            echo '<h3>' . esc_html( $test_type ) . ' Results</h3>';

            // Success messages
            if ( $results['processed'] > 0 ) {
                echo '<div class="notice notice-success"><p>Successfully processed ' . $results['processed'] . ' messages.</p></div>';
            } else {
                echo '<div class="notice notice-warning"><p>No messages were processed.</p></div>';
            }

            // Error messages
            if ( !empty( $results['errors'] ) ) {
                echo '<div class="notice notice-error">';
                echo '<p><strong>Errors encountered:</strong></p>';
                echo '<ul>';
                foreach ( $results['errors'] as $error ) {
                    echo '<li>' . esc_html( $error ) . '</li>';
                }
                echo '</ul>';
                echo '</div>';
            }

            // Debug information
            if ( !empty( $results['debug_info'] ) ) {
                echo '<div class="notice notice-info">';
                echo '<p><strong>Debug Information:</strong></p>';
                echo '<details>';
                echo '<summary>Click to view debug details</summary>';
                echo '<pre style="background: #f1f1f1; padding: 10px; margin: 10px 0; overflow-x: auto;">';
                echo esc_html( print_r( $results['debug_info'], true ) );
                echo '</pre>';
                echo '</details>';
                echo '</div>';
            }

            // Summary
            echo '<div class="notice notice-info">';
            echo '<p><strong>Summary:</strong> Found ' . $results['messages_found'] . ' eligible messages, processed ' . $results['processed'] . ' successfully.</p>';
            echo '</div>';
        });
    }

    /**
     * Add menu item to WordPress admin
     */
    public function add_admin_menu() {
        add_menu_page(
            'Zume Email Test', // Page title
            'Zume Email Test', // Menu title
            'manage_options', // Capability required
            'zume-email-test', // Menu slug
            array( $this, 'render_admin_page' ), // Callback function
            'dashicons-email', // Icon
            30 // Position
        );
    }

    /**
     * Enqueue admin scripts and styles
     */
    public function enqueue_admin_scripts( $hook ) {
        if ( 'toplevel_page_zume-email-test' !== $hook ) {
            return;
        }

        wp_enqueue_style( 'zume-email-test-admin', plugins_url( 'css/admin.css', __FILE__ ) );
    }

    /**
     * Render the admin page
     */
    public function render_admin_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
        }
        ?>
        <div class="wrap">
            <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
            
            <div class="metabox-holder">
                <div class="postbox-container" style="width: 100%;">
                    <div class="meta-box-sortables">
                        
                        <!-- Date-specific Cron Test -->
                        <div class="postbox">
                            <h2 class="hndle"><span>Date-Specific Cron Job Test</span></h2>
                            <div class="inside">
                                <form method="post" action="">
                                    <?php wp_nonce_field( 'zume_email_test_action', 'zume_email_test_nonce' ); ?>
                                    <table class="form-table">
                                        <tr>
                                            <th scope="row">
                                                <label for="cron_test_date">Test Date for Cron</label>
                                            </th>
                                            <td>
                                                <input type="date" 
                                                       id="cron_test_date" 
                                                       name="cron_test_date" 
                                                       value="<?php echo isset( $_POST['cron_test_date'] ) ? esc_attr( $_POST['cron_test_date'] ) : ''; ?>" 
                                                       class="regular-text">
                                                <p class="description">
                                                    This will simulate the cron job running for the selected date and attempt to send emails. 
                                                    It will process messages scheduled for this date, plus any messages with null or 0 drop_date values.
                                                    <br><strong>Note:</strong> This actually sends emails and marks messages as sent!
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                    <p class="submit">
                                        <input type="submit" 
                                               name="run_cron_test" 
                                               id="run_cron_test" 
                                               class="button button-primary" 
                                               value="Run Date-Specific Test">
                                    </p>
                                </form>
                            </div>
                        </div>

                        <!-- Regular Cron Test -->
                        <div class="postbox">
                            <h2 class="hndle"><span>Regular Cron Job Test</span></h2>
                            <div class="inside">
                                <form method="post" action="">
                                    <?php wp_nonce_field( 'zume_email_test_action', 'zume_email_test_nonce' ); ?>
                                    <p class="description">
                                        This will run the regular cron job logic, processing the oldest unsent message for each user.
                                        This is the same logic that runs automatically twice daily.
                                        <br><strong>Note:</strong> This actually sends emails and marks messages as sent!
                                    </p>
                                    <p class="submit">
                                        <input type="submit" 
                                               name="run_regular_cron_test" 
                                               id="run_regular_cron_test" 
                                               class="button button-secondary" 
                                               value="Run Regular Cron Test">
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <?php
    }
}

// Initialize the admin page
new Zume_Email_Test_Admin();
