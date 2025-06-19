<?php

/**
 * Class Zume_Encouragement_Cron
 * Handles the scheduling and execution of encouragement message sending
 */
class Zume_Encouragement_Cron {
    /**
     * Hook name for the cron job
     */
    const CRON_HOOK = 'zume_encouragement_cron';

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'init', array( $this, 'schedule_events' ) );
        add_action( self::CRON_HOOK, array( $this, 'process_unsent_messages' ) );
        add_action( 'deactivate_plugin', array( $this, 'deactivate' ) );
    }

    /**
     * Schedule the cron job if it's not already scheduled
     */
    public function schedule_events() {
        if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
            wp_schedule_event( time(), 'twicedaily', self::CRON_HOOK );
        }
    }

    /**
     * Process unsent messages
     * Selects one message per user based on the oldest drop_date
     *
     * @param string $test_date Optional test date for admin testing (Y-m-d format)
     * @param bool $return_results Whether to return results for admin interface
     * @return array|null Results array if $return_results is true, null otherwise
     */
    public function process_unsent_messages( $test_date = null, $return_results = false ) {
        global $wpdb;

        // Initialize results array for admin interface
        $results = array(
            'processed' => 0,
            'errors' => array(),
            'debug_info' => array(),
            'messages_found' => 0
        );

        // Get the table name for messages
        $table_name = $wpdb->prefix . 'dt_zume_message_plan';

        // Build the query based on whether we have a test date
        if ( $test_date ) {
            // Convert date to timestamp for comparison
            $timestamp = strtotime( $test_date );
            if ( !$timestamp ) {
                if ( $return_results ) {
                    $results['errors'][] = 'Invalid date format provided.';
                    return $results;
                }
                return null;
            }

            $results['debug_info']['test_date'] = $test_date;
            $results['debug_info']['timestamp'] = $timestamp;
            $results['debug_info']['formatted_date'] = date('Y-m-d', $timestamp);

            // Query for test date - get oldest unsent message per user for the specific date plus immediate messages
            $query = $wpdb->prepare(
                "SELECT m.*
                FROM {$table_name} m
                WHERE (m.sent = 0 OR m.sent IS NULL)
                AND (
                    m.drop_date = 0
                    OR DATE(FROM_UNIXTIME(m.drop_date)) = DATE(FROM_UNIXTIME(%d))
                )
                AND m.drop_date = (
                    SELECT MIN(CASE
                        WHEN inner_m.drop_date = 0 THEN 0
                        ELSE inner_m.drop_date
                    END)
                    FROM {$table_name} inner_m
                    WHERE inner_m.user_id = m.user_id
                    AND (inner_m.sent = 0 OR inner_m.sent IS NULL)
                    AND (
                        inner_m.drop_date = 0
                        OR DATE(FROM_UNIXTIME(inner_m.drop_date)) = DATE(FROM_UNIXTIME(%d))
                    )
                )
                ORDER BY m.drop_date ASC, m.id ASC",
                $timestamp,
                $timestamp
            );
        } else {
            // Regular cron query - get oldest unsent message per user
            $query = "SELECT m.*
                FROM {$table_name} m
                WHERE (m.sent = 0 OR m.sent IS NULL)
                AND m.drop_date = (
                    SELECT MIN(CASE
                        WHEN inner_m.drop_date = 0 THEN 0
                        ELSE inner_m.drop_date
                    END)
                    FROM {$table_name} inner_m
                    WHERE inner_m.user_id = m.user_id
                    AND (inner_m.sent = 0 OR inner_m.sent IS NULL)
                )
                ORDER BY m.drop_date ASC, m.id ASC";
        }

        $messages = $wpdb->get_results( $query );

        if ( $return_results ) {
            $results['debug_info']['query'] = $query;
            $results['debug_info']['last_error'] = $wpdb->last_error;
            $results['messages_found'] = count( $messages );

            // Add some debug queries to help diagnose issues
            $results['debug_info']['total_unsent_messages'] = $wpdb->get_var(
                "SELECT COUNT(*) FROM {$table_name} WHERE (sent = 0 OR sent IS NULL)"
            );

            if ( $test_date ) {
                $results['debug_info']['messages_for_test_date'] = $wpdb->get_var( $wpdb->prepare(
                    "SELECT COUNT(*) FROM {$table_name}
                    WHERE (sent = 0 OR sent IS NULL)
                    AND DATE(FROM_UNIXTIME(drop_date)) = DATE(FROM_UNIXTIME(%d))",
                    $timestamp
                ));

                $results['debug_info']['messages_with_zero_drop_date'] = $wpdb->get_var(
                    "SELECT COUNT(*) FROM {$table_name} WHERE (sent = 0 OR sent IS NULL) AND drop_date = 0"
                );
            }
        }

        if ( !empty( $messages ) ) {
            foreach ( $messages as $message ) {
                // Send the message
                $send_result = $this->send_message( $message, $return_results );

                if ( $return_results ) {
                    if ( $send_result['success'] ) {
                        $results['processed']++;
                    } else {
                        $results['errors'][] = $send_result['error'];
                    }
                }

                // Mark the message as sent (only if not in test mode or if test mode and actually sent)
                if ( !$test_date || ( $return_results && $send_result['success'] ) ) {
                    $wpdb->update(
                        $table_name,
                        array( 'sent' => 1 ),
                        array( 'id' => $message->id ),
                        array( '%d' ),
                        array( '%d' )
                    );
                }
            }
        }

        return $return_results ? $results : null;
    }

    /**
     * Send a message to a user
     *
     * @param object $message The message object to send
     * @param bool $return_result Whether to return detailed result information
     * @return array|bool Result array if $return_result is true, bool otherwise
     */
    private function send_message( $message, $return_result = false ) {
        try {
            // Get user data
            $user = get_user_by( 'id', $message->user_id );
            if ( !$user ) {
                if ( $return_result ) {
                    return array(
                        'success' => false,
                        'error' => "User not found for ID: {$message->user_id}"
                    );
                }
                return false;
            }

            // Use permanent headers instead of database headers
            $headers = array(
                'Content-Type: text/html; charset=UTF-8',
                'MIME-Version: 1.0',
                'X-Zume-Email-System: 1.0'
            );

            // Send email
            $sent = wp_mail( $message->to, $message->subject, $message->message, $headers );

            if ( $return_result ) {
                return array(
                    'success' => $sent,
                    'error' => $sent ? null : "Failed to send email to: {$message->to}"
                );
            }

            return $sent;
        } catch ( Exception $e ) {
            if ( $return_result ) {
                return array(
                    'success' => false,
                    'error' => "Error processing message ID {$message->id}: " . $e->getMessage()
                );
            }
            return false;
        }
    }

    /**
     * Public method for admin testing
     *
     * @param string $test_date The date to test with (Y-m-d format)
     * @return array Results of the test run
     */
    public function run_test( $test_date ) {
        return $this->process_unsent_messages( $test_date, true );
    }

    /**
     * Clean up the cron job on plugin deactivation
     */
    public static function deactivate() {
        wp_clear_scheduled_hook( self::CRON_HOOK );
    }
}

// Initialize the cron job
new Zume_Encouragement_Cron();
