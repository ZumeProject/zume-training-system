<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Contact_Us extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Contact Us';
    public $root = 'app';
    public $type = 'contact-us';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_contact_us';

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

        $this->page_title = esc_html__( 'Contact Us', 'zume' );

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
        $http_post = ( isset( $_SERVER['REQUEST_METHOD'] ) && 'POST' === $_SERVER['REQUEST_METHOD'] );

        // Handle form submission
        if ( $http_post && isset( $_POST['delete_data_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['delete_data_nonce'] ) ), 'delete_data_form' ) ) {

            // Verify reCAPTCHA
            if ( isset( $dt_login['google_captcha_secret_key'] ) && !empty( $dt_login['google_captcha_secret_key'] ) ) {
                if ( !isset( $_POST['g-recaptcha-response'] ) || empty( $_POST['g-recaptcha-response'] ) ) {
                    $form_errors->add( 'captcha_missing', __( 'Missing captcha response. How did you do that?', 'disciple_tools' ) );
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
                        $form_errors->add( 'captcha_error', __( 'Captcha failure. Try again, if you are human.', 'disciple_tools' ) );
                    } else {
                        $response_body = json_decode( wp_remote_retrieve_body( $response ), true );
                        if ( empty( $response_body['success'] ) ) {
                            $form_errors->add( 'captcha_invalid', __( 'Captcha failure. Try again, if you are human.', 'disciple_tools' ) );
                        }
                    }
                }
            }

            // If no errors, send email
            if ( empty( $form_errors->errors ) ) {
                $name = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
                $email = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
                $request_type = isset( $_POST['request_type'] ) ? sanitize_text_field( wp_unslash( $_POST['request_type'] ) ) : '';
                $additional_info = isset( $_POST['additional_info'] ) ? sanitize_textarea_field( wp_unslash( $_POST['additional_info'] ) ) : '';

                $request_type_label = '';
                if ( $request_type === 'request_data' ) {
                    $request_type_label = 'Request My Personal Data';
                } elseif ( $request_type === 'delete_data' ) {
                    $request_type_label = 'Delete My Personal Data';
                } elseif ( $request_type === 'other' ) {
                    $request_type_label = 'Other Request';
                }

                $to = get_option( 'zume_training_delete_data_email' );
                $subject = "Data Request from $name";
                $message = "Data Request Submission:\n\nName: $name\nEmail: $email\nRequest Type: $request_type_label\n\nAdditional Information:\n$additional_info";

                $headers = array(
                    'Reply-To: ' . $name . ' <' . $email . '>',
                    'Content-Type: text/plain; charset=UTF-8',
                    'X-Zume-Email-System: 1.0',
                );

                $sent = wp_mail( $to, $subject, $message, $headers );

                if ( $sent ) {
                    $form_submitted = true;
                } else {
                    $form_errors->add( 'email_failed', __( 'Something went wrong', 'zume' ) );
                }
            }
        }

        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container-md stack-2 | page">
            <div class="stack-1 center">
                <h1 class="text-center brand-light"><?php echo esc_html__( 'Contact Us', 'zume' ) ?></h1>

                <?php if ( $form_submitted ) : ?>

                    <div class="success banner text-center">
                        <?php echo esc_html__( 'Your request has been submitted successfully. We will process your request and contact you at the email address provided.', 'zume' ) ?>
                    </div>

                    <div class="text-center">
                        <a href="<?php echo esc_url( site_url() ) ?>" class="btn fit-content"><?php echo esc_html__( 'Home', 'zume' ) ?></a>
                    </div>

                <?php else : ?>

                    <?php if ( ! empty( $form_errors->errors ) ) : ?>
                        <div class="warning banner">
                                <?php foreach ( $form_errors->get_error_messages() as $error ) : ?>
                                    <?php echo esc_html( $error ) ?>
                                <?php endforeach; ?>
                        </div>
                    <?php endif; ?>

                    <form id="deleteDataForm" class="stack" method="post">

                        <div>
                            <label for="name"><?php echo esc_html__( 'Name', 'zume' ) ?> <strong>*</strong></label>
                            <input
                                class="input"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="<?php echo esc_attr__( 'Name', 'zume' ) ?>"
                                value="<?php echo isset( $_POST['name'] ) ? esc_attr( sanitize_text_field( wp_unslash( $_POST['name'] ) ) ) : '' ?>"
                                required
                            >
                        </div>

                        <div>
                            <label for="email"><?php echo esc_html__( 'Email Address', 'zume' ) ?> <strong>*</strong></label>
                            <input
                                class="input"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="<?php esc_attr_e( 'your.email@example.com', 'zume' ) ?>"
                                value="<?php echo isset( $_POST['email'] ) ? esc_attr( sanitize_email( wp_unslash( $_POST['email'] ) ) ) : '' ?>"
                                required
                            >
                        </div>

                        <div>
                            <label for="request_type"><?php echo esc_html__( 'Request Type', 'zume' ) ?> <strong>*</strong></label>
                            <select class="input" name="request_type" id="request_type" required>
                                <option value=""><?php echo esc_html__( 'Select a request type', 'zume' ) ?></option>
                                <option value="request_data" <?php selected( isset( $_POST['request_type'] ) && $_POST['request_type'] === 'request_data' ) ?>><?php echo esc_html__( 'Request My Personal Data', 'zume' ) ?></option>
                                <option value="delete_data" <?php selected( isset( $_POST['request_type'] ) && $_POST['request_type'] === 'delete_data' ) ?>><?php echo esc_html__( 'Delete My Personal Data', 'zume' ) ?></option>
                                <option value="other" <?php selected( isset( $_POST['request_type'] ) && $_POST['request_type'] === 'other' ) ?>><?php echo esc_html__( 'Other', 'zume' ) ?></option>
                            </select>
                        </div>

                        <div>
                            <label for="additional_info"><?php echo esc_html__( 'Additional Information (Optional)', 'zume' ) ?></label>
                            <textarea
                                class="input"
                                name="additional_info"
                                id="additional_info"
                                rows="5"
                                maxlength="500"
                            ><?php echo isset( $_POST['additional_info'] ) ? esc_textarea( sanitize_textarea_field( wp_unslash( $_POST['additional_info'] ) ) ) : '' ?></textarea>
                            <div class="f--1" style="text-align: right; margin-top: 0.25rem;">
                                <span id="char-count">0</span>/500
                            </div>
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
                                <?php echo esc_html__( 'Send Message', 'zume' ) ?>
                                <span class="loading-spinner"></span>
                            </button>
                        </div>

                    </form>

                    <hr>
                        <div class="text-center">
                            <a href="<?php echo esc_url( site_url( '/' . $this->lang_code . '/privacy' ) ) ?>"><?php echo esc_html__( 'Privacy Policy', 'zume' ) ?></a>
                        </div>

                <script>
                let isSubmitting = false;

                function onSubmitDataRequest(token) {
                    const recaptchaResponseInput = document.querySelector('#g-recaptcha-response');

                    recaptchaResponseInput.value = token;

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

                // Character counter for additional_info textarea
                const additionalInfoTextarea = document.getElementById('additional_info');
                const charCount = document.getElementById('char-count');

                function updateCharCount() {
                    const currentLength = additionalInfoTextarea.value.length;
                    charCount.textContent = currentLength;
                }

                // Initialize character count
                updateCharCount();

                // Update on input
                additionalInfoTextarea.addEventListener('input', updateCharCount);
                </script>

                        <?php // @codingStandardsIgnoreStart
                        if ( isset( $dt_login['google_captcha_client_key'] ) && !empty( $dt_login['google_captcha_client_key'] ) ) :
                        ?>
                            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                        <?php // @codingStandardsIgnoreEnd
                        endif;
                        ?>

                    <?php endif; ?>

                </hr>
            </div>
        </div>
        <?php
    }
}
Zume_Training_Contact_Us::instance();

