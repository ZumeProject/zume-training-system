<?php

class Zume_Email_Job extends WP_Queue\Job {
    public string $email;
    public array $message;

    public function __construct( $email, $message ) {
        $this->email = $email;
        $this->message = $message;
    }

    public function handle() {
        $email_result = wp_mail( $this->email, $this->message['subject'], $this->message['body'] );

        if ( ! $email_result ) {
            throw new Exception( 'Email failed to send to ' . esc_html( $this->email ) . ' with message: ' . esc_html( $this->message['subject'] )  );
        }
    }
}
