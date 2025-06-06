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
     */
    public function process_unsent_messages() {
        global $wpdb;

        // Get the table name for messages
        $table_name = $wpdb->prefix . 'dt_zume_message_plan';

        // Query to get one message per user with the oldest drop_date
        // This query handles both null and 0 values for drop_date
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
                GROUP BY user_id
            ) sub ON m.user_id = sub.user_id 
            AND (
                (m.drop_date IS NULL AND sub.oldest_date = 0) OR
                (m.drop_date = 0 AND sub.oldest_date = 0) OR
                (m.drop_date = sub.oldest_date)
            )
            WHERE m.sent = 0
            ORDER BY m.drop_date ASC"
        );

        $messages = $wpdb->get_results( $query );

        if ( !empty( $messages ) ) {
            foreach ( $messages as $message ) {
                // Send the message
                $this->send_message( $message );

                // Mark the message as sent
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

    /**
     * Send a message to a user
     * 
     * @param object $message The message object to send
     */
    private function send_message( $message ) {
        // Get user data
        $user = get_user_by( 'id', $message->user_id );
        if ( !$user ) {
            return;
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

        // Send email
        wp_mail( $message->to, $message->subject, $email_content, $message->headers );
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
