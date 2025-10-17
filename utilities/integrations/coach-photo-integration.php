<?php
/**
 * Coach Photo Integration
 * 
 * This integration provides a simple way to get custom coach photos
 * without modifying the globals.php file.
 */

if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * REST API endpoint to get custom coach photo URL
 * This allows the frontend to fetch custom coach photos dynamically
 */
add_action( 'rest_api_init', 'zume_register_coach_photo_rest_endpoint' );

function zume_register_coach_photo_rest_endpoint() {
    register_rest_route( 'zume_system/v1', '/coach-photo/(?P<user_id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'zume_get_coach_photo_rest_callback',
        'permission_callback' => '__return_true', // Public endpoint for coach photos
        'args' => array(
            'user_id' => array(
                'required' => true,
                'type' => 'integer',
                'sanitize_callback' => 'absint',
            ),
        ),
    ) );
}

/**
 * REST API callback for coach photo endpoint
 */
function zume_get_coach_photo_rest_callback( $request ) {
    $user_id = $request->get_param( 'user_id' );
    
    if ( empty( $user_id ) ) {
        return new WP_Error( 'invalid_user_id', 'Invalid user ID', array( 'status' => 400 ) );
    }
    
    $photo_url = zume_get_coach_profile_photo_url( $user_id );
    
    return array(
        'user_id' => $user_id,
        'photo_url' => $photo_url,
    );
}

/**
 * Add JavaScript to the dashboard to dynamically update coach photos
 * This runs on dashboard pages and updates coach photos after the page loads
 */
add_action( 'wp_head', 'zume_add_coach_photo_update_script' );

function zume_add_coach_photo_update_script() {
    // Only run on dashboard pages
    if ( !is_page() || !is_user_logged_in() ) {
        return;
    }
    
    // Check if we're on a dashboard page by looking for the dashboard class
    global $post;
    if ( !$post || strpos( $post->post_content, 'dashboard' ) === false ) {
        return;
    }
    
    // Add JavaScript to modify coach photos after jsObject is created
    ?>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Wait for jsObject to be available
        if (typeof jsObject !== 'undefined' && jsObject.profile && jsObject.profile.coaches) {
            // Modify each coach's picture URL
            Object.keys(jsObject.profile.coaches).forEach(function(coachId) {
                var coach = jsObject.profile.coaches[coachId];
                if (coach.user_id) {
                    // Make AJAX request to get custom photo URL
                    fetch('<?php echo esc_url( rest_url( 'zume_system/v1/coach-photo/' ) ); ?>' + coach.user_id)
                        .then(response => response.json())
                        .then(data => {
                            if (data.photo_url && data.photo_url !== coach.picture) {
                                coach.picture = data.photo_url;
                                // Trigger a custom event to notify components of the update
                                document.dispatchEvent(new CustomEvent('coach-photos-updated', {
                                    detail: { coachId: coachId, newPhotoUrl: data.photo_url }
                                }));
                            }
                        })
                        .catch(error => {
                            console.log('Could not fetch custom coach photo for user ' + coach.user_id + ':', error);
                        });
                }
            });
        }
    });
    </script>
    <?php
}
