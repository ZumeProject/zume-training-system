<?php

/**
 * Class Zume_Admin_Cron
 * Handles the scheduling and execution of admin message sending
 */
class Zume_Admin_Cron {
    /**
     * Hook name for the cron job
     */
    const CRON_HOOK = 'zume_admin_cron';

    /**
     * Constructor
     */
    public function __construct() {
        add_action( 'init', array( $this, 'schedule_events' ) );
        add_action( self::CRON_HOOK, array( $this, 'send_admin_messages' ) );
        add_action( 'deactivate_plugin', array( $this, 'deactivate' ) );
    }

    /**
     * Schedule the cron job if it's not already scheduled
     */
    public function schedule_events() {
        if ( ! wp_next_scheduled( self::CRON_HOOK ) ) {
            wp_schedule_event( time(), 'weekly', self::CRON_HOOK );
        }
    }

    /**
     * Send admin messages
     *
     * @param bool $return_result Whether to return the result of the message sending
     * @return array|bool Result array if $return_result is true, bool otherwise
     */
    public function send_admin_messages( $return_result = false ) {
        $users = get_users( array( 'role' => 'zume_admin' ) );
        $messages = $this->get_admin_messages();
        $results = [];
        foreach ( $users as $user ) {
            foreach ( $messages as $message ) {
                $result = $this->send_message( $message, $user, $return_result );
                $results[] = $result;
            }
        }
        return $results;
    }

    public function get_admin_messages() {
        $messages = [];

        // get a count of the dt user contacts who have the 'notify of future trainings' flag turned on
        $contacts = DT_Posts::list_posts( 'contacts', array(
            'notify_of_future_trainings' => [ '1' ],
        ) );
        if ( is_wp_error( $contacts ) ) {
            $message = 'Error getting contacts: ' . $contacts->get_error_message();
        } else {
            $contacts = count( $contacts );
            $message = 'There are ' . $contacts . ' contacts who have the \'notify of future trainings\' flag turned on.';
        }
        $messages[] = [
            'subject' => 'Zume Admin Message',
            'message' => $message,
        ];

        return $messages;
    }

    /**
     * Send a message to a user
     *
     * @param array $message The message object to send
     * @param object $user The user object to send the message to
     * @param bool $return_result Whether to return the result of the message sending
     * @return array|bool Result array if $return_result is true, bool otherwise
     */
    private function send_message( $message, $user, $return_result = false ) {
        try {
            $message['to'] = $user->user_email;
            // Use permanent headers instead of database headers
            $headers = array(
                'Content-Type: text/html; charset=UTF-8',
                'MIME-Version: 1.0',
                'X-Zume-Email-System: 1.0',
            );

            // Send email
            $sent = wp_mail( $message['to'], $message['subject'], $message['message'], $headers );

            if ( $return_result ) {
                return array(
                    'success' => $sent,
                    'error' => $sent ? null : "Failed to send email to: {$message['to']}",
                );
            }

            return $sent;
        } catch ( Exception $e ) {
            if ( $return_result ) {
                return array(
                    'success' => false,
                    'error' => "Error sending zume admin message to: {$message['to']}: " . $e->getMessage(),
                );
            }
            return false;
        }
    }

    /**
     * Public method for admin testing
     *
     * @return array Results of the test run
     */
    public function run_test() {
        return $this->send_admin_messages( true );
    }

    /**
     * Clean up the cron job on plugin deactivation
     */
    public static function deactivate() {
        wp_clear_scheduled_hook( self::CRON_HOOK );
    }
}

// Initialize the cron job
new Zume_Admin_Cron();
