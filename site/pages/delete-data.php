<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Delete_Data extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Delete Data';
    public $root = 'app';
    public $type = 'delete-data';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_delete_data';

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

        $this->page_title = esc_html__( 'Data Request', 'zume' );
        $this->page_description = esc_html__( 'Request your personal data or request data deletion.', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;

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
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>
         <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ); ?>" />
        <?php
        zume_hreflang_fixed( $this->lang_code, $this->type );
    }

    public function body(){
        $dt_login = DT_Login_Fields::all_values();
        $form_submitted = false;
        $form_errors = new WP_Error();
        $http_post = ( 'POST' === $_SERVER['REQUEST_METHOD'] );

        // Handle form submission
        if ( $http_post && isset( $_POST['delete_data_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['delete_data_nonce'] ) ), 'delete_data_form' ) ) {

            // Verify reCAPTCHA
            if ( isset( $dt_login['google_captcha_secret_key'] ) && !empty( $dt_login['google_captcha_secret_key'] ) ) {
                if ( !isset( $_POST['g-recaptcha-response'] ) || empty( $_POST['g-recaptcha-response'] ) ) {
                    $form_errors->add( 'captcha_missing', __( 'Please complete the captcha verification.', 'zume' ) );
                } else {
                    $recaptcha_response = sanitize_text_field( wp_unslash( $_POST['g-recaptcha-response'] ) );
                    $recaptcha_secret = $dt_login['google_captcha_secret_key'];

                    $response = wp_remote_post( 'https://www.google.com/recaptcha/api/siteverify', [
                        'body' => [
                            'secret' => $recaptcha_secret,
                            'response' => $recaptcha_response,
                        ],
                    ] );

                    if ( is_wp_error( $response ) ) {
                        $form_errors->add( 'captcha_error', __( 'Captcha verification failed. Please try again.', 'zume' ) );
                    } else {
                        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
                        if ( empty( $response_body['success'] ) ) {
                            $form_errors->add( 'captcha_invalid', __( 'Captcha verification failed. Please try again.', 'zume' ) );
                        }
                    }
                }
            }

            // Validate form fields
            if ( empty( $_POST['name'] ) ) {
                $form_errors->add( 'name_required', __( 'Name is required.', 'zume' ) );
            }

            if ( empty( $_POST['email'] ) || !is_email( $_POST['email'] ) ) {
                $form_errors->add( 'email_invalid', __( 'Valid email address is required.', 'zume' ) );
            }

            if ( empty( $_POST['request_type'] ) ) {
                $form_errors->add( 'request_type_required', __( 'Please select a request type.', 'zume' ) );
            }

            // If no errors, send email
            if ( empty( $form_errors->errors ) ) {
                $name = sanitize_text_field( wp_unslash( $_POST['name'] ) );
                $email = sanitize_email( wp_unslash( $_POST['email'] ) );
                $request_type = sanitize_text_field( wp_unslash( $_POST['request_type'] ) );
                $additional_info = isset( $_POST['additional_info'] ) ? sanitize_textarea_field( wp_unslash( $_POST['additional_info'] ) ) : '';

                $request_type_label = '';
                if ( $request_type === 'request_data' ) {
                    $request_type_label = __( 'Request My Personal Data', 'zume' );
                } elseif ( $request_type === 'delete_data' ) {
                    $request_type_label = __( 'Delete My Personal Data', 'zume' );
                }

                //$to = 'awheeler@teamexpansion.org';
                $to = 'nathinabob@gmail.com';
                $subject = sprintf( __( 'Data Request from %s', 'zume' ), $name );
                $message = sprintf(
                    __( "Data Request Submission:\n\nName: %1\$s\nEmail: %2\$s\nRequest Type: %3\$s\n\nAdditional Information:\n%4\$s", 'zume' ),
                    $name,
                    $email,
                    $request_type_label,
                    $additional_info
                );

                $headers = array(
                    'Reply-To: ' . $name . ' <' . $email . '>',
                    'Content-Type: text/plain; charset=UTF-8',
                    'X-Zume-Email-System: 1.0',
                );

                $sent = wp_mail( $to, $subject, $message, $headers );

                if ( $sent ) {
                    $form_submitted = true;
                } else {
                    $form_errors->add( 'email_failed', __( 'Failed to send your request. Please try again later.', 'zume' ) );
                }
            }
        }

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container-md stack-2 | page">
            <div class="stack-1 center">
                <h1 class="text-center brand-light"><?php esc_html_e( 'Data Request', 'zume' ) ?></h1>

                <?php if ( $form_submitted ) : ?>

                    <div class="success banner text-center">
                        <p><?php esc_html_e( 'Your request has been submitted successfully. We will process your request and contact you at the email address provided.', 'zume' ) ?></p>
                    </div>

                    <div class="text-center">
                        <a href="<?php echo esc_url( site_url() ) ?>" class="btn fit-content"><?php esc_html_e( 'Return to Home', 'zume' ) ?></a>
                    </div>

                <?php else : ?>

                    <p class="text-center"><?php esc_html_e( 'Use this form to request a copy of your personal data or to request deletion of your data from our system.', 'zume' ) ?></p>

                    <?php if ( ! empty( $form_errors->errors ) ) : ?>
                        <div class="warning banner">
                            <ul class="bullets">
                                <?php foreach ( $form_errors->get_error_messages() as $error ) : ?>
                                    <li><?php echo esc_html( $error ) ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <form id="deleteDataForm" class="stack" method="post" data-abide novalidate>

                        <div>
                            <label for="name"><?php esc_html_e( 'Full Name', 'zume' ) ?> <strong>*</strong></label>
                            <input
                                class="input"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="<?php esc_attr_e( 'Your Name', 'zume' ) ?>"
                                value="<?php echo isset( $_POST['name'] ) ? esc_attr( sanitize_text_field( wp_unslash( $_POST['name'] ) ) ) : '' ?>"
                                required
                            >
                            <span class="form-error">
                                <?php esc_html_e( 'Name is required.', 'zume' ) ?>
                            </span>
                        </div>

                        <div>
                            <label for="email"><?php esc_html_e( 'Email Address', 'zume' ) ?> <strong>*</strong></label>
                            <input
                                class="input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="<?php esc_attr_e( 'your.email@example.com', 'zume' ) ?>"
                                value="<?php echo isset( $_POST['email'] ) ? esc_attr( sanitize_email( wp_unslash( $_POST['email'] ) ) ) : '' ?>"
                                required
                            >
                            <span class="form-error">
                                <?php esc_html_e( 'Valid email address is required.', 'zume' ) ?>
                            </span>
                        </div>

                        <div>
                            <label for="request_type"><?php esc_html_e( 'Request Type', 'zume' ) ?> <strong>*</strong></label>
                            <select class="input" name="request_type" id="request_type" required>
                                <option value=""><?php esc_html_e( 'Select a request type', 'zume' ) ?></option>
                                <option value="request_data" <?php selected( isset( $_POST['request_type'] ) && $_POST['request_type'] === 'request_data' ) ?>><?php esc_html_e( 'Request My Personal Data', 'zume' ) ?></option>
                                <option value="delete_data" <?php selected( isset( $_POST['request_type'] ) && $_POST['request_type'] === 'delete_data' ) ?>><?php esc_html_e( 'Delete My Personal Data', 'zume' ) ?></option>
                            </select>
                            <span class="form-error">
                                <?php esc_html_e( 'Please select a request type.', 'zume' ) ?>
                            </span>
                        </div>

                        <div>
                            <label for="additional_info"><?php esc_html_e( 'Additional Information (Optional)', 'zume' ) ?></label>
                            <textarea
                                class="input"
                                name="additional_info"
                                id="additional_info"
                                rows="5"
                                placeholder="<?php esc_attr_e( 'Please provide any additional details about your request...', 'zume' ) ?>"
                            ><?php echo isset( $_POST['additional_info'] ) ? esc_textarea( sanitize_textarea_field( wp_unslash( $_POST['additional_info'] ) ) ) : '' ?></textarea>
                        </div>

                        <div data-abide-error class="warning banner" style="display: none;">
                            <p><?php esc_html_e( 'There are some errors in your form.', 'zume' ) ?></p>
                        </div>

                        <?php wp_nonce_field( 'delete_data_form', 'delete_data_nonce' ) ?>

                        <div class="text-center">
                            <button
                                class="btn w-100 g-recaptcha"
                                id="form-submit"
                                data-sitekey="<?php echo esc_attr( isset( $dt_login['google_captcha_client_key'] ) ? $dt_login['google_captcha_client_key'] : '' ) ?>"
                                data-callback="onSubmitDataRequest"
                                data-action="submit"
                            >
                                <?php esc_html_e( 'Submit Request', 'zume' ) ?>
                                <span class="loading-spinner"></span>
                            </button>
                        </div>

                    </form>

                    <div class="stack-1 text-center">
                        <hr>
                        <p class="f--1"><?php esc_html_e( 'For more information about how we handle your data, please review our', 'zume' ) ?> <a href="<?php echo esc_url( site_url( '/' . $this->lang_code . '/privacy' ) ) ?>"><?php esc_html_e( 'Privacy Policy', 'zume' ) ?></a>.</p>
                    </div>

                    <script>
                        let isSubmitting = false;

                        function onSubmitDataRequest(token) {
                            const recaptchaResponseInput = document.querySelector('#g-recaptcha-response');

                            if (!recaptchaResponseInput) {
                                const input = document.createElement('input');
                                input.type = 'hidden';
                                input.name = 'g-recaptcha-response';
                                input.id = 'g-recaptcha-response';
                                input.value = token;
                                document.getElementById('deleteDataForm').appendChild(input);
                            } else {
                                recaptchaResponseInput.value = token;
                            }

                            if (document.getElementById('deleteDataForm').requestSubmit) {
                                document.getElementById('deleteDataForm').requestSubmit();
                            } else {
                                document.getElementById('deleteDataForm').submit();
                            }
                        }

                        const form = document.getElementById('deleteDataForm');

                        form.addEventListener('submit', function(event) {
                            if (isSubmitting) {
                                event.preventDefault();
                                return;
                            }

                            const submitButtonElement = document.querySelector('#form-submit');
                            submitButtonElement.classList.add('disabled');
                            submitButtonElement.setAttribute('disabled', '');
                            submitButtonElement.querySelector('.loading-spinner').classList.add('active');

                            isSubmitting = true;
                        });
                    </script>

                    <?php
                    if ( isset( $dt_login['google_captcha_client_key'] ) && !empty( $dt_login['google_captcha_client_key'] ) ) :
                        ?>
                        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                    <?php
                    endif;
                    ?>

                <?php endif; ?>

            </div>
        </div>
        <?php
    }
}
Zume_Training_Delete_Data::instance();

