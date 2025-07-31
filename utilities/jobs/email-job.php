<?php

class Zume_Email_Job extends WP_Queue\Job {
    public string $email;
    public string $subject;
    public string $message;

    public function __construct( $email, $subject, $message ) {
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
    }

    public function handle() {
        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'MIME-Version: 1.0',
            'X-Zume-Email-System: 1.0'
        );
        $email_result = wp_mail( $this->email, $this->subject, $this->message, $headers );

        if ( ! $email_result ) {
            throw new Exception( 'Email failed to send to ' . esc_html( $this->email ) . ' with message: ' . esc_html( $this->subject ) );
        }
    }
}
