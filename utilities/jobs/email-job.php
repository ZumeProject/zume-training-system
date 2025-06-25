<?php

class Zume_Email_Job extends WP_Queue\Job {
    public string $email;
    public string $subject;
    public array $message;

    public function __construct( $email, $subject, $message ) {
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
    }

    public function handle() {
        $email_result = wp_mail( $this->email, $this->subject, $this->message );

        if ( ! $email_result ) {
            throw new Exception( 'Email failed to send to ' . esc_html( $this->email ) . ' with message: ' . esc_html( $this->subject ) );
        }
    }
}
