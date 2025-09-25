<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * Adds a non-object (neither post or user) magic link page.
 *
 * @example https://yoursite.com/starter_app/page/
 *
 * @use-case You could use a page like this as a registration page, a landing page for a campaign, a map page.
 * Basically you can create a publically accessible page that can display data from inside Disciple Tools to a public
 * audience. I.E public maps or statistics on the DT system.
 * @see https://zume.vision/maps for a public map link example
 */
class Zume_Add_New_Trainee extends DT_Magic_Url_Base
{
    public $magic = false;
    public $parts = false;
    public $page_title = 'Add New Trainee';
    public $root = 'add';
    public $type = 'trainee';
    public $type_name = 'Add New Trainee';
    public static $token = 'add_new_trainee';
    public $post_type = 'contacts'; // This can be supplied or not supplied. It does not influence the url verification.

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();

        $url = dt_get_url_path();
        if ( ( $this->root . '/' . $this->type ) === $url ) {
            // Permission check: Only allow users who are coaches in the coaching system
            
            $current_user_id = get_current_user_id();
            if ( ! $current_user_id || ! $this->zume_is_user_coach( $current_user_id ) ) {
                wp_die( esc_html__( 'You do not have permission to access this page.', 'zume' ), 403 );
            }

            $this->magic = new DT_Magic_URL( $this->root );
            $this->parts = $this->magic->parse_url_parts();


            // register url and access
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

            // page content
            add_action( 'dt_blank_body', [ $this, 'body' ] ); // body for no post key

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ], 100 );
        }

        if ( dt_is_rest() ) {
            add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );
        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return $allowed_js;
    }

    public function zume_is_user_coach( $user_id ) {
        // Check for the meta key 'zume_3_capabilities'

        $meta_key = 'zume_3_capabilities'; // this insures that they are a coach in the coaching system
        $caps = get_user_meta( $user_id, $meta_key, true );
        if ( empty( $caps ) || ! is_array( $caps ) ) {
            return false;
        }
       
        $allowed_roles = array( 'administrator', 'multiplier', 'user_manager' );
        foreach ( $allowed_roles as $role ) {
            if ( isset( $caps[ $role ] ) && $caps[ $role ] ) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get all coaches from the coaching system
     *
     * @return array Array of coaches with contact_id and name
     */
    public function get_all_coaches() {
        global $wpdb;
        
        // Get all users who have coaching capabilities
        $coaches = $wpdb->get_results(
            "SELECT DISTINCT u.ID as user_id, u.display_name, u.user_email
             FROM {$wpdb->users} u
             INNER JOIN {$wpdb->usermeta} um ON u.ID = um.user_id
             WHERE um.meta_key = 'zume_3_capabilities'
             AND um.meta_value LIKE '%multiplier%'
             ORDER BY u.display_name ASC",
            ARRAY_A
        );
        
        $coach_list = [];
        foreach ( $coaches as $coach ) {
            // Get the coaching contact ID for this user
            $coaching_contact_id = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT post_id FROM zume_3_postmeta WHERE meta_key = 'corresponds_to_user' AND meta_value = %s",
                    $coach['user_id']
                )
            );
            
            if ( $coaching_contact_id ) {
                $coach_list[] = [
                    'contact_id' => $coaching_contact_id,
                    'name' => $coach['display_name'] ?: $coach['user_email'],
                    'user_id' => $coach['user_id']
                ];
            }
        }
        
        return $coach_list;
    }

    /**
     * Get current user's coaching contact ID
     *
     * @return int|false Coaching contact ID or false if not found
     */
    public function get_current_user_coaching_contact_id() {
        $current_user_id = get_current_user_id();
        if ( ! $current_user_id ) {
            return false;
        }
        
        global $wpdb;
        return $wpdb->get_var(
            $wpdb->prepare(
                "SELECT post_id FROM zume_3_postmeta WHERE meta_key = 'corresponds_to_user' AND meta_value = %s",
                $current_user_id
            )
        );
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return $allowed_css;
    }

    public function header_style(){
        ?>
        <style>
            body {
                background-color:white;
            }
            #content {
                margin-left: auto;
                margin-right: auto;
                max-width: 1440px;
                text-align: center;
            }
            /* Fix spacing for select elements to match other form fields */
            .form-field select {
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                padding: 8px 12px !important;
                line-height: normal !important;
                vertical-align: top !important;
            }
            
            /* Fix excessive spacing above coach field */
            .form-field:has(#coach) {
                margin-top: 0 !important;
            }
        </style>
        <?php
    }

    public function body(){
        $selected_type = 'trainee'; // Default type for this form
        $dt_post_type = $this->post_type;
        
        // Get coaches for the dropdown
        $coaches = $this->get_all_coaches();
        $current_user_coaching_contact_id = $this->get_current_user_coaching_contact_id();
        
        $post_settings = [
            'fields' => [
                'name' => [
                    'label' => __( 'Name', 'disciple_tools' ),
                    'type'  => 'text',
                    'required' => true,
                    'placeholder' => __( 'Enter full name', 'disciple_tools' ),
                    'tile' => 'basic_info',
                    'in_create_form' => true,
                ],
                'email' => [
                    'label' => __( 'Email', 'disciple_tools' ),
                    'type'  => 'email',
                    'required' => true,
                    'placeholder' => __( 'Enter email address', 'disciple_tools' ),
                    'tile' => 'contact_info',
                    'in_create_form' => true,
                ],
                'phone' => [
                    'label' => __( 'Phone', 'disciple_tools' ),
                    'type'  => 'text',
                    'required' => true,
                    'placeholder' => __( 'Enter phone number', 'disciple_tools' ),
                    'tile' => 'contact_info',
                    'in_create_form' => true,
                ],
                'location' => [
                    'label' => __( 'Location', 'disciple_tools' ),
                    'type'  => 'text',
                    'required' => true,
                    'placeholder' => __( 'Enter location', 'disciple_tools' ),
                    'tile' => 'location_info',
                    'in_create_form' => true,
                ],
                'preferred_language' => [
                    'label' => __( 'Preferred Language', 'disciple_tools' ),
                    'type'  => 'select',
                    'required' => true,
                    'options' => zume_languages(),
                    'tile' => 'basic_info',
                    'in_create_form' => true,
                ],
                'coach' => [
                    'label' => __( 'Coach', 'disciple_tools' ),
                    'type'  => 'select',
                    'required' => true,
                    'options' => $coaches,
                    'default' => $current_user_coaching_contact_id,
                    'tile' => 'basic_info',
                    'in_create_form' => true,
                ],
            ],
        ]
        ?>
    
        <div id="content" class="template-new-post">
            <div id="inner-content" class="grid-x grid-margin-x" style="justify-content: center;">
                <div class="large-8 medium-12 small-12 cell">
                    <form class="js-create-post bordered-box display-fields">

                        <table>
                            <tbody style="border: none;">
                                <tr>
                                    <td>
                                        <h3 class="section-header">
                                            New Trainee
                                        </h3>
                                    </td>
                                    <td>
                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <div class="form-fields">
                            <?php $this->render_form_fields( $post_settings, $selected_type ); ?>
                            


                            <div style="text-align: center">
                                <a href="<?php echo esc_html( get_site_url() . '/' . $dt_post_type )?>" class="button small clear"><?php echo esc_html__( 'Cancel', 'disciple_tools' )?></a>
                                <button class="button loader js-create-post-button dt-green" type="submit" disabled><?php esc_html_e( 'Save', 'disciple_tools' ); ?></button>
                            </div>
                            <div class="error-text"></div>
                        </div>
                    </form>

                </div>

            </div>
        </div>
        <?php
    }

    /**
     * Render form fields based on post settings
     *
     * @param array $post_settings The post settings array containing field definitions
     * @param string $selected_type The selected type for field filtering
     */
    private function render_form_fields( $post_settings, $selected_type = 'trainee' ) {
        if ( empty( $post_settings['fields'] ) ) {
            return;
        }

        foreach ( $post_settings['fields'] as $field_key => $field_settings ) {
            if ( !$this->should_display_field( $field_settings ) ) {
                continue;
            }

            $field_config = $this->get_field_display_config( $field_settings, $selected_type );
            $this->render_single_field( $field_key, $field_settings, $field_config, $post_settings );
        }
    }

    /**
     * Determine if a field should be displayed
     *
     * @param array $field_settings The field settings
     * @return bool Whether the field should be displayed
     */
    private function should_display_field( $field_settings ) {
        // Skip hidden fields unless they have custom display
        if ( !empty( $field_settings['hidden'] ) && empty( $field_settings['custom_display'] ) ) {
            return false;
        }

        // Skip fields explicitly excluded from create form
        if ( isset( $field_settings['in_create_form'] ) && $field_settings['in_create_form'] === false ) {
            return false;
        }

        // Skip fields without proper tile configuration
        if ( !isset( $field_settings['tile'] ) || empty( $field_settings['tile'] ) || $field_settings['tile'] === 'no_tile' ) {
            return false;
        }

        return true;
    }

    /**
     * Get field display configuration
     *
     * @param array $field_settings The field settings
     * @param string $selected_type The selected type for field filtering
     * @return array Field display configuration
     */
    private function get_field_display_config( $field_settings, $selected_type = 'trainee' ) {
        $classes = '';
        $show_field = false;

        if ( !empty( $field_settings['in_create_form'] ) ) {
            if ( is_array( $field_settings['in_create_form'] ) ) {
                foreach ( $field_settings['in_create_form'] as $type_key ) {
                    $classes .= $type_key . ' ';
                    if ( $type_key === $selected_type ) {
                        $show_field = true;
                    }
                }
            } elseif ( $field_settings['in_create_form'] === true ) {
                $classes = 'all';
                $show_field = true;
            }
        } else {
            $classes = 'other-fields';
        }

        return [
            'classes' => $classes,
            'show_field' => $show_field
        ];
    }

    /**
     * Render a single form field
     *
     * @param string $field_key The field key
     * @param array $field_settings The field settings
     * @param array $field_config The field display configuration
     * @param array $post_settings The post settings
     */
    private function render_single_field( $field_key, $field_settings, $field_config, $post_settings ) {
        $style_attr = !$field_config['show_field'] ? 'style="display:none"' : '';
        $classes = 'form-field ' . esc_attr( $field_config['classes'] );
        ?>
        <div <?php echo $style_attr; ?> class="<?php echo esc_attr( $classes ); ?>">
            <?php
            // Note: render_field_for_display function call needs to be updated with proper parameters
            // render_field_for_display( $field_key, $post_settings['fields'], [ 'post_type' => $dt_post_type ], null, null, null, $field_options );
            $this->render_field_input( $field_key, $field_settings );
            
            if ( isset( $field_settings['required'] ) && $field_settings['required'] === true ) {
                $this->render_required_field_help();
            }
            ?>
        </div>
        <?php
    }

    /**
     * Render field input based on field type
     *
     * @param string $field_key The field key
     * @param array $field_settings The field settings
     */
    private function render_field_input( $field_key, $field_settings ) {
        $field_type = $field_settings['type'] ?? 'text';
        $field_label = $field_settings['label'] ?? ucfirst( $field_key );
        $field_placeholder = $field_settings['placeholder'] ?? '';
        $is_required = isset( $field_settings['required'] ) && $field_settings['required'] === true;
        
        ?>
        <label for="<?php echo esc_attr( $field_key ); ?>" style="text-align: left; font-weight: bold; display: block; margin-bottom: 5px;">
            <?php echo esc_html( $field_label ); ?>
            <?php if ( $is_required ) : ?>
                <span class="required">*</span>
            <?php endif; ?>
        </label>
        
        <?php if ( $field_type === 'email' ) : ?>
            <input type="email" 
                   id="<?php echo esc_attr( $field_key ); ?>" 
                   name="<?php echo esc_attr( $field_key ); ?>" 
                   placeholder="<?php echo esc_attr( $field_placeholder ); ?>"
                   <?php echo $is_required ? 'required' : ''; ?>>
        <?php elseif ( $field_type === 'text' ) : ?>
            <input type="text" 
                   id="<?php echo esc_attr( $field_key ); ?>" 
                   name="<?php echo esc_attr( $field_key ); ?>" 
                   placeholder="<?php echo esc_attr( $field_placeholder ); ?>"
                   <?php echo $is_required ? 'required' : ''; ?>>
        <?php elseif ( $field_type === 'select' ) : ?>
            <select id="<?php echo esc_attr( $field_key ); ?>" 
                    name="<?php echo esc_attr( $field_key ); ?>"
                    <?php echo $is_required ? 'required' : ''; ?>>
                <?php if ( $field_key === 'coach' ) : ?>
                    <option value=""><?php esc_html_e( 'Select a coach', 'disciple_tools' ); ?></option>
                    <?php 
                    $options = $field_settings['options'] ?? [];
                    $default_value = $field_settings['default'] ?? '';
                    foreach ( $options as $coach ) : 
                        $selected = ( $coach['contact_id'] == $default_value ) ? 'selected' : '';
                    ?>
                        <option value="<?php echo esc_attr( $coach['contact_id'] ); ?>" <?php echo $selected; ?>>
                            <?php echo esc_html( $coach['name'] ); ?>
                        </option>
                    <?php endforeach; ?>
                <?php else : ?>
                    <option value=""><?php esc_html_e( 'Select a language', 'disciple_tools' ); ?></option>
                    <?php 
                    $options = $field_settings['options'] ?? [];
                    foreach ( $options as $code => $language_data ) : 
                        $display_name = $language_data['enDisplayName'] ?? $language_data['name'] ?? $code;
                        $selected = ( $code === 'en' ) ? 'selected' : '';
                    ?>
                        <option value="<?php echo esc_attr( $code ); ?>" <?php echo $selected; ?>>
                            <?php echo esc_html( $display_name ); ?>
                        </option>
                    <?php endforeach; ?>
                <?php endif; ?>
            </select>
        <?php else : ?>
            <input type="<?php echo esc_attr( $field_type ); ?>" 
                   id="<?php echo esc_attr( $field_key ); ?>" 
                   name="<?php echo esc_attr( $field_key ); ?>" 
                   placeholder="<?php echo esc_attr( $field_placeholder ); ?>"
                   <?php echo $is_required ? 'required' : ''; ?>>
        <?php endif; ?>
        <?php
    }

    /**
     * Render required field help text
     */
    private function render_required_field_help() {
        ?>
        <p class="help-text"><?php esc_html_e( 'This field is required', 'disciple_tools' ); ?></p>
        <?php
    }

    public function footer_javascript(){
        ?>
        <script>
            console.log('Trainee form JavaScript loaded')

            let jsObject = [<?php echo json_encode([
                'root' => esc_url_raw( rest_url() ),
                'nonce' => wp_create_nonce( 'wp_rest' ),
                'parts' => $this->parts,
                'translations' => [
                    'submit_success' => __( 'Trainee information submitted successfully!', 'disciple_tools' ),
                    'submit_error' => __( 'Error submitting trainee information. Please try again.', 'disciple_tools' ),
                    'required_field' => __( 'This field is required', 'disciple_tools' ),
                ],
            ]) ?>][0]

            // Handle form submission
            jQuery(document).ready(function($) {
                // Email validation function
                function isValidEmail(email) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(email);
                }

                // Phone validation function
                function isValidPhone(phone) {
                    // Remove all non-digit characters for validation
                    const cleanPhone = phone.replace(/\D/g, '');
                    // Check if it's a valid phone number (7-15 digits)
                    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
                }

                // Function to check if form is valid and enable/disable submit button
                function checkFormValidity() {
                    const name = $('#name').val().trim();
                    const email = $('#email').val().trim();
                    const phone = $('#phone').val().trim();
                    const location = $('#location').val().trim();
                    const preferred_language = $('#preferred_language').val();
                    const coach = $('#coach').val();
                    const submitButton = $('.js-create-post-button');
                    
                    let isValid = name.length > 0 && email.length > 0 && phone.length > 0 && location.length > 0 && preferred_language.length > 0 && coach.length > 0;
                    
                    // Check email format if email is provided
                    if (email.length > 0 && !isValidEmail(email)) {
                        isValid = false;
                    }
                    
                    // Check phone format if phone is provided
                    if (phone.length > 0 && !isValidPhone(phone)) {
                        isValid = false;
                    }
                    
                    if (isValid) {
                        submitButton.prop('disabled', false);
                    } else {
                        submitButton.prop('disabled', true);
                    }
                }

                // Check form validity on input change
                $('#name, #email, #phone, #location, #preferred_language, #coach').on('input change', function() {
                    checkFormValidity();
                });

                // Initial form check
                checkFormValidity();

                // Handle form submission
                $('.js-create-post').on('submit', function(e) {
                    e.preventDefault();
                    
                    // Collect form data
                    const formData = {
                        action: 'create_trainee',
                        parts: jsObject.parts,
                        name: $('#name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        location: $('#location').val(),
                        preferred_language: $('#preferred_language').val(),
                        coach: $('#coach').val()
                    };

                    // Validate required fields
                    if (!formData.name.trim()) {
                        alert('Name is required');
                        return;
                    }
                    if (!formData.email.trim()) {
                        alert('Email is required');
                        return;
                    }
                    if (!formData.phone.trim()) {
                        alert('Phone is required');
                        return;
                    }
                    if (!formData.location.trim()) {
                        alert('Location is required');
                        return;
                    }
                    if (!formData.preferred_language.trim()) {
                        alert('Preferred Language is required');
                        return;
                    }
                    if (!formData.coach.trim()) {
                        alert('Coach is required');
                        return;
                    }
                    
                    // Validate email format
                    if (formData.email.trim() && !isValidEmail(formData.email.trim())) {
                        alert('Please enter a valid email address');
                        return;
                    }
                    
                    // Validate phone format
                    if (formData.phone.trim() && !isValidPhone(formData.phone.trim())) {
                        alert('Please enter a valid phone number');
                        return;
                    }

                    // Show loading state
                    const submitButton = $('.js-create-post-button');
                    const originalText = submitButton.text();
                    submitButton.prop('disabled', true).text('Submitting...');

                    // Submit form data
                    $.ajax({
                        type: "POST",
                        data: JSON.stringify(formData),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: jsObject.root + jsObject.parts.root + '/v1/' + jsObject.parts.type,
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('X-WP-Nonce', jsObject.nonce)
                        }
                    })
                    .done(function(response) {
                        console.log('Trainee submission successful:', response);
                        console.log('User data:', {
                            user_id: response.data?.user_id,
                            user_contact_id: response.data?.user_contact_id,
                            user_coaching_contact_id: response.data?.user_coaching_contact_id
                        });
                        
                        // Show success message
                        $('.error-text').removeClass('error-text').addClass('success-text')
                            .html('<div style="color: green; padding: 10px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px;">' + 
                                  jsObject.translations.submit_success + '</div>');
                        
                        // Redirect to coaching contact page if user_coaching_contact_id is available
                        if (response.data && response.data.user_coaching_contact_id) {
                            const coachingUrl = 'https://zume.training/coaching/contacts/' + response.data.user_coaching_contact_id;
                            console.log('Redirecting to coaching contact:', coachingUrl);
                            
                            // Add a small delay to show the success message before redirecting
                            setTimeout(function() {
                                window.location.href = coachingUrl;
                            }, 1500);
                        } else {
                            // Reset form if no redirect is needed
                            $('.js-create-post')[0].reset();
                        }
                    })
                    .fail(function(xhr) {
                        console.error('Trainee submission failed:', xhr);
                        
                        let errorMessage = jsObject.translations.submit_error;
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            errorMessage = xhr.responseJSON.message;
                        }
                        
                        $('.error-text').html('<div style="color: red; padding: 10px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">' + 
                                             errorMessage + '</div>');
                    })
                    .always(function() {
                        // Reset button state
                        submitButton.prop('disabled', false).text(originalText);
                    });
                });

                // Handle show/hide fields functionality
                $('#show-hidden-fields').on('click', function() {
                    $('.form-field[style*="display:none"]').show();
                    $(this).hide();
                    $('#hide-hidden-fields').show();
                });

                $('#hide-hidden-fields').on('click', function() {
                    $('.form-field.other-fields').hide();
                    $(this).hide();
                    $('#show-hidden-fields').show();
                });
            });

        </script>
        <?php
        return true;
    }

    public function _wp_enqueue_scripts(){
    }

    /**
     * Register REST Endpoints
     * @link https://github.com/DiscipleTools/disciple-tools-theme/wiki/Site-to-Site-Link for outside of wordpress authentication
     */
    public function add_endpoints() {
        $namespace = $this->root . '/v1';
        register_rest_route(
            $namespace,
            '/'.$this->type,
            [
                [
                    'methods'  => WP_REST_Server::CREATABLE,
                    'callback' => [ $this, 'endpoint' ],
                    'permission_callback' => '__return_true',
                ],
            ]
        );
    }

    public function endpoint( WP_REST_Request $request ) {
        $params = $request->get_params();

        if ( ! isset( $params['parts'], $params['action'] ) ) {
            return new WP_Error( __METHOD__, 'Missing parameters', [ 'status' => 400 ] );
        }

        $params = dt_recursive_sanitize_array( $params );

        switch ( $params['action'] ) {
            case 'create_trainee':
                return $this->handle_trainee_creation( $params );
            default:
                return new WP_Error( __METHOD__, 'Invalid action', [ 'status' => 400 ] );
        }
    }

    /**
     * Handle trainee creation form submission
     *
     * @param array $params The sanitized request parameters
     * @return array|WP_Error Response data or error
     */
    private function handle_trainee_creation( $params ) {
        // Validate required fields
        $required_fields = [ 'name', 'email', 'phone', 'location', 'preferred_language', 'coach' ];
        $missing_fields = [];
        
        foreach ( $required_fields as $field ) {
            if ( empty( $params[ $field ] ) ) {
                $missing_fields[] = $field;
            }
        }
        
        if ( !empty( $missing_fields ) ) {
            return new WP_Error( 
                __METHOD__, 
                'Missing required fields: ' . implode( ', ', $missing_fields ), 
                [ 'status' => 400 ] 
            );
        }

        // Extract and sanitize form data
        $trainee_data = [
            'name' => sanitize_text_field( $params['name'] ?? '' ),
            'email' => sanitize_email( $params['email'] ?? '' ),
            'phone' => sanitize_text_field( $params['phone'] ?? '' ),
            'location' => sanitize_text_field( $params['location'] ?? '' ),
            'preferred_language' => sanitize_text_field( $params['preferred_language'] ?? '' ),
            'coach' => sanitize_text_field( $params['coach'] ?? '' ),
        ];

        


        // check if a user with this email already exists
        // Check if a user with this email already exists
        $existing_user = get_user_by( 'email', $trainee_data['email'] );
        if ( $existing_user ) {
            // User already exists, check if the trainee is already in the coaching system (site 3)
            global $wpdb;
            // In the coaching system, contacts are linked to users via 'trainee_user_id' in zume_3_postmeta
            $coaching_contact_id = $wpdb->get_var(
                $wpdb->prepare(
                    "SELECT post_id FROM zume_3_postmeta WHERE meta_key = 'trainee_user_id' AND meta_value = %s",
                    $existing_user->ID
                )
            );
            if ( $coaching_contact_id ) {
                // Trainee is already in the coaching system, return user id and message
                return [
                    'success' => false,
                    'message' => __( 'This trainee is already in the coaching system.', 'disciple_tools' ),
                    'data' => [
                        'user_id' => $existing_user->ID,
                        'contact_id' => $coaching_contact_id,
                        'email' => $trainee_data['email'],
                    ]
                ];
            }
        }
        
        // Create a new user if one does not exist
        if ( ! $existing_user ) {
            // Generate a username from the email
            $username = sanitize_user( current( explode( '@', $trainee_data['email'] ) ), true );
            // Ensure username is unique
            $original_username = $username;
            $i = 1;
            while ( username_exists( $username ) ) {
                $username = $original_username . $i;
                $i++;
            }

            // Generate a random password
            $password = wp_generate_password( 12, true );

            // Create the user
            $user_id = wp_create_user( $username, $password, $trainee_data['email'] );
            if ( is_wp_error( $user_id ) ) {
                return new WP_Error(
                    __METHOD__,
                    __( 'Failed to create new user: ', 'disciple_tools' ) . $user_id->get_error_message(),
                    [ 'status' => 500 ]
                );
            }
            $contact_id = zume_get_user_contact_id( $user_id );
            if ( ! $contact_id ) {
                return new WP_Error(
                    __METHOD__,
                    __( 'Failed to create contact: ', 'disciple_tools' ),
                    [ 'status' => 500 ]
                );
            }

            // Set the display name and name fields
            wp_update_user( [
                'ID' => $user_id,
                'display_name' => $trainee_data['name'],
                'first_name' => $trainee_data['name'], // Optionally split for first/last
            ] );

            // Assign the 'multiplier' role in the current site's capabilities (Zume_capabilities)
            $zume_capabilities = get_user_meta( $user_id, 'zume_capabilities', true );
            if ( ! is_array( $zume_capabilities ) ) {
                $zume_capabilities = [];
            }
            $zume_capabilities['multiplier'] = true;
            update_user_meta( $user_id, 'zume_capabilities', $zume_capabilities );


            // update the user's location according to the location supplied in the form
            $location = DT_Mapbox_API::forward_lookup( $trainee_data['location'] );
            $lng = DT_Mapbox_API::parse_raw_result( $location, 'lng' );
            $lat = DT_Mapbox_API::parse_raw_result( $location, 'lat' );
            $level = 'place'; // Default level since it's not available in the API response
            $label = $trainee_data['location'];
            $fields = [
                'location_grid_meta' => [
                    'values' => [
                        [
                            'label' => $label,
                            'level' => $level,
                            'lng' => $lng,
                            'lat' => $lat,
                            'source' => 'user',
                        ],
                    ],
                    'force_values' => true,
                ],
            ];
            $contact_location = DT_Posts::update_post( 'contacts', $contact_id, $fields, true, false );

            // update the user's phone according to the phone supplied in the form
            update_post_meta( $contact_id, 'user_phone', $trainee_data['phone'] );

            // update the user's preferred language according to the preferred language supplied in the form
            if ( !empty( $trainee_data['preferred_language'] ) ) {
                update_post_meta( $contact_id, 'user_preferred_language', $trainee_data['preferred_language'] );
            }

            // connect the user to the coaching system
            
            $coaching_data = $trainee_data;
            // Convert preferred_language to preferred-language for API compatibility
            if ( !empty( $trainee_data['preferred_language'] ) ) {
                $coaching_data['preferred-language'] = [
                    'value' => $trainee_data['preferred_language']
                ];
                unset( $coaching_data['preferred_language'] );
            }
            
        
            // Initialize coaching_contact_id variable
            $coach_contact_id = $trainee_data['coach'];
            
            // connect the user to the coach
            $coaching_result = Zume_Get_A_Coach_Endpoints::register_request_to_coaching( $user_id, $coach_contact_id );
            if ( is_wp_error( $coaching_result ) ) {
                return new WP_Error(
                    __METHOD__,
                    __( 'Failed to connect to coaching system: ', 'disciple_tools' ) . $coaching_result->get_error_message(),
                    [ 'status' => 500 ]
                );
            }
            
            


            // Return the new user and contact info
            return [
                'success' => true,
                'message' => __( 'New trainee created successfully.', 'disciple_tools' ),
                'data' => [
                    'user_id' => $user_id,
                    'user_contact_id' => $contact_id,    
                    'user_coaching_contact_id' => $coaching_result['ID'],
                    
                ]
            ];
        }
       
        

       
    }

}
Zume_Add_New_Trainee::instance();