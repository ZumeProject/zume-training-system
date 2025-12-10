<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

/**
 * Coach Profile Helper Functions
 * 
 * Functions for managing coach public profiles, including slug lookup,
 * profile data retrieval, and validation.
 */

/**
 * Get coach user by custom slug or fallback to user_nicename
 * 
 * @param string $slug The coach slug to search for
 * @return WP_User|false Coach user object or false if not found
 */
function zume_get_coach_by_slug( $slug ) {
    global $wpdb;
    
    if ( empty( $slug ) ) {
        return false;
    }
    
    // First, try to find by custom coach_public_slug
    $user_id = $wpdb->get_var( $wpdb->prepare(
        "SELECT user_id FROM zume_usermeta 
         WHERE meta_key = 'coach_public_slug' 
         AND meta_value = %s",
        $slug
    ) );
    
    if ( $user_id ) {
        return get_user_by( 'ID', $user_id );
    }
    
    // Fallback to user_nicename from users table
    return get_user_by( 'slug', $slug );
}

/**
 * Get full coach public profile data
 * 
 * @param int $user_id The coach's user ID
 * @return array|false Coach profile data or false if not found
 */
function zume_get_coach_public_profile( $user_id ) {
    if ( empty( $user_id ) ) {
        return false;
    }
    
    $user = get_user_by( 'ID', $user_id );
    if ( !$user ) {
        return false;
    }
    
    // Get basic user data
    $profile = [
        'user_id' => $user_id,
        'name' => $user->display_name,
        'email' => $user->user_email,
        'avatar' => get_avatar_url( $user_id, [ 'scheme' => 'https', 'size' => 512 ] ),
    ];
    
    // Check for coach profile photo first, fallback to gravatar
    $coach_photo_url = get_user_meta( $user_id, 'coach_profile_photo', true );
    if ( !empty( $coach_photo_url ) ) {
        $profile['avatar'] = $coach_photo_url;
    }
    
    // Get custom coach profile fields
    $profile['public_profile_enabled'] = get_user_meta( $user_id, 'coach_public_profile_enabled', true );
    $profile['public_slug'] = get_user_meta( $user_id, 'coach_public_slug', true );
    $profile['bio'] = get_user_meta( $user_id, 'coach_bio', true );
    $profile['experience'] = get_user_meta( $user_id, 'coach_experience', true );
    $profile['testimonials'] = get_user_meta( $user_id, 'coach_testimonials', true );
    $profile['greeting_video_url'] = get_user_meta( $user_id, 'coach_greeting_video_url', true );
    
    // If no custom slug set, use user_nicename as fallback
    if ( empty( $profile['public_slug'] ) ) {
        $profile['public_slug'] = $user->user_nicename;
    }
    
    // Get contact information (respect privacy settings)
    $contact_id = zume_get_user_contact_id( $user_id );
    if ( $contact_id ) {
        $contact_meta = zume_get_contact_meta( $contact_id );
        $profile['phone'] = $contact_meta['user_phone'] ?? '';
        $profile['location'] = zume_get_user_location( $user_id );
        $profile['language'] = zume_get_user_language( $user_id );
        $profile['contact_preferences'] = get_post_meta( $contact_id, 'user_contact_preference' );
        $profile['hide_public_contact'] = get_post_meta( $contact_id, 'hide_public_contact', true );
    }
    
    return $profile;
}

/**
 * Check if coach has public profile enabled
 * 
 * @param int $user_id The coach's user ID
 * @return bool True if public profile is enabled
 */
function zume_coach_has_public_profile( $user_id ) {
    if ( empty( $user_id ) ) {
        return false;
    }
    
    $enabled = get_user_meta( $user_id, 'coach_public_profile_enabled', true );
    return !empty( $enabled );
}

/**
 * Get coach training/coaching statistics
 * 
 * @param int $user_id The coach's user ID
 * @return array Coach statistics
 */
function zume_get_coach_stats( $user_id ) {
    global $wpdb;
    
    if ( empty( $user_id ) ) {
        return [];
    }
    
    $stats = [];
    
    // Get number of trainees coached
    $trainees_count = $wpdb->get_var( $wpdb->prepare(
        "SELECT COUNT(*) FROM zume_3_p2p p2
         LEFT JOIN zume_3_posts p ON p2.p2p_from = p.ID
         LEFT JOIN zume_3_postmeta pm ON pm.post_id = p.ID AND pm.meta_key = 'corresponds_to_user'
         WHERE p2p_to = (
             SELECT post_id FROM zume_3_postmeta 
             WHERE meta_key = 'corresponds_to_user' AND meta_value = %s
         )
         AND p2p_type = 'contacts_to_contacts'",
        $user_id
    ) );
    
    $stats['trainees_count'] = (int) $trainees_count;
    
    // Get number of training groups led
    $groups_count = $wpdb->get_var( $wpdb->prepare(
        "SELECT COUNT(*) FROM zume_3_posts 
         WHERE post_author = %d 
         AND post_type = 'zume_plans' 
         AND post_status = 'publish'",
        $user_id
    ) );
    
    $stats['groups_count'] = (int) $groups_count;
    
    return $stats;
}

/**
 * Validate coach slug is URL-safe and unique
 * 
 * @param string $slug The slug to validate
 * @param int $exclude_user_id User ID to exclude from uniqueness check (for updates)
 * @return array Validation result with 'valid' boolean and 'message' string
 */
function zume_validate_coach_slug( $slug, $exclude_user_id = 0 ) {
    if ( empty( $slug ) ) {
        return [ 'valid' => false, 'message' => 'Slug cannot be empty' ];
    }
    
    // Check if slug is URL-safe (lowercase, alphanumeric, hyphens only)
    if ( !preg_match( '/^[a-z0-9-]+$/', $slug ) ) {
        return [ 'valid' => false, 'message' => 'Slug must contain only lowercase letters, numbers, and hyphens' ];
    }
    
    // Check if slug starts or ends with hyphen
    if ( substr( $slug, 0, 1 ) === '-' || substr( $slug, -1 ) === '-' ) {
        return [ 'valid' => false, 'message' => 'Slug cannot start or end with a hyphen' ];
    }
    
    // Check for uniqueness
    global $wpdb;
    $existing_user_id = $wpdb->get_var( $wpdb->prepare(
        "SELECT user_id FROM zume_usermeta 
         WHERE meta_key = 'coach_public_slug' 
         AND meta_value = %s 
         AND user_id != %d",
        $slug,
        $exclude_user_id
    ) );
    
    if ( $existing_user_id ) {
        return [ 'valid' => false, 'message' => 'This slug is already taken by another coach' ];
    }
    
    return [ 'valid' => true, 'message' => 'Slug is valid' ];
}

