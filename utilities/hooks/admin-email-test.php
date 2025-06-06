<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Ensure this script only runs in the admin area


class Zume_Email_Test_Admin {
    /**
     * @var string The test date for email testing
     */
    private $test_date;

    /**
     * Constructor
     */
    public function __construct() {
        if ( ! is_admin() ) {
            return;
        }
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
    }

    /**
     * Run a test of the encouragement cron job
     * 
     * @param string $test_date The date to test with
     */
    private function run_cron_test( $test_date ) {
        global $wpdb;
        $table_name = $wpdb->prefix . 'dt_zume_message_plan';

        // Convert date to timestamp for comparison
        $timestamp = strtotime($test_date);
        if (!$timestamp) {
            add_action( 'admin_notices', function() {
                echo '<div class="notice notice-error"><p>Invalid date format provided.</p></div>';
            });
            return;
        }

        // Debug information
        $debug_info = array(
            'test_date' => $test_date,
            'timestamp' => $timestamp,
            'formatted_date' => date('Y-m-d', $timestamp),
            'raw_messages' => $wpdb->get_results("SELECT * FROM {$table_name} WHERE sent = 0 LIMIT 5")
        );

        // Query to get messages for the test date, handling both null and 0 values
        $query = $wpdb->prepare(
            "SELECT m.* 
            FROM {$table_name} m
            INNER JOIN (
                SELECT user_id, 
                       MIN(CASE 
                           WHEN drop_date IS NULL OR drop_date = 0 THEN 0 
                           ELSE drop_date 
                       END) as oldest_date
                FROM {$table_name}
                WHERE sent = 0
                AND (
                    drop_date IS NULL 
                    OR drop_date = 0 
                    OR DATE(FROM_UNIXTIME(drop_date)) = DATE(FROM_UNIXTIME(%d))
                )
                GROUP BY user_id
            ) sub ON m.user_id = sub.user_id 
            AND (
                (m.drop_date IS NULL AND sub.oldest_date = 0) OR
                (m.drop_date = 0 AND sub.oldest_date = 0) OR
                (m.drop_date = sub.oldest_date)
            )
            WHERE m.sent = 0
            ORDER BY m.drop_date ASC",
            $timestamp
        );

        $messages = $wpdb->get_results($query);
        
        // Add debug information about the query
        $debug_info['query'] = $query;
        $debug_info['messages_found'] = count($messages);
        $debug_info['last_error'] = $wpdb->last_error;
        
        if ( empty( $messages ) ) {
            add_action( 'admin_notices', function() use ($debug_info) {
                echo '<div class="notice notice-warning">';
                echo '<p>No messages found for the selected date.</p>';
                echo '<p>Debug Information:</p>';
                echo '<pre>' . print_r($debug_info, true) . '</pre>';
                echo '</div>';
            });
            return;
        }

        // Process messages as if they were being sent by the cron
        $processed = 0;
        $errors = array();

        foreach ( $messages as $message ) {
            try {
                // Get user data
                $user = get_user_by( 'id', $message->user_id );
                if ( !$user ) {
                    $errors[] = "User not found for ID: {$message->user_id}";
                    continue;
                }

                // Get user's language code
                $language_code = get_user_meta( $message->user_id, 'zume_language', true );
                if ( empty( $language_code ) ) {
                    $language_code = 'en';
                }

                // Build the email content with proper wrapping
                $email_content = Zume_System_Encouragement_API::build_email(
                    $message->message,
                    $language_code,
                    $message->user_id
                );

                // Send test email
                $sent = wp_mail( $message->to, $message->subject, $email_content, $message->headers );
                
                if ( $sent ) {
                    $processed++;
                } else {
                    $errors[] = "Failed to send email to: {$message->to}";
                }
            } catch ( Exception $e ) {
                $errors[] = "Error processing message ID {$message->id}: " . $e->getMessage();
            }
        }

        // Display results
        add_action( 'admin_notices', function() use ( $processed, $errors, $debug_info ) {
            if ( $processed > 0 ) {
                echo '<div class="notice notice-success"><p>Successfully processed ' . $processed . ' messages.</p></div>';
            }
            if ( !empty( $errors ) ) {
                echo '<div class="notice notice-error"><p>Errors encountered:</p><ul>';
                foreach ( $errors as $error ) {
                    echo '<li>' . esc_html( $error ) . '</li>';
                }
                echo '</ul></div>';
            }
            echo '<div class="notice notice-info">';
            echo '<p>Debug Information:</p>';
            echo '<pre>' . print_r($debug_info, true) . '</pre>';
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
                        <div class="postbox">
                            <h2 class="hndle"><span>Cron Job Test</span></h2>
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
                                                <p class="description">This will simulate the cron job running for the selected date and attempt to send emails. It will also process any messages with null or 0 drop_date values.</p>
                                            </td>
                                        </tr>
                                    </table>
                                    <p class="submit">
                                        <input type="submit" 
                                               name="run_cron_test" 
                                               id="run_cron_test" 
                                               class="button button-primary" 
                                               value="Run Cron Test">
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
