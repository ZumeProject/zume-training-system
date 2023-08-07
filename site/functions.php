<?php

function zume_get_url_pieces() {
    $url = dt_get_url_path();
    $codes = zume_language_codes();

    $url_parts = explode( '/', $url );

    $lang_code = 'en';
    if ( in_array( $url_parts[0], $codes ) ) {
        $lang_code = array_shift( $url_parts );
    }
    $path = implode( '/', $url_parts );

    return [
        'lang_code' => $lang_code,
        'path' => $path,
        'url_parts' => $url_parts,
    ];
}

function zume_home_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    if ( 'en' === $current_language ) {
        $home_url = site_url();
    } else {
        $home_url = site_url() . '/' . $current_language;
    }
    return $home_url;
}

function zume_dashboard_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Dashboard', $current_language );
    return $url;
}

function zume_training_url( $current_language = null ) {
    if ( is_null( $current_language ) ) {
        $current_language = zume_current_language();
    }
    $url = zume_get_posts_translation_url( 'Training', $current_language );
    return $url;
}

function zume_course_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Course', $current_lang );
}

function zume_three_month_plan_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Three-Month Plan', $current_lang );
}

function zume_overview_url() {
    $current_lang = zume_current_language();
    return zume_get_posts_translation_url( 'Overview', $current_lang );
}

function zume_guidebook_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'Guidebook', $current_lang );
    return $url;
}

function zume_profile_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'Profile', $current_lang );
    return $url;
}

function zume_about_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'About', $current_lang );
    return $url;
}

function zume_faq_url() {
    $current_lang = zume_current_language();
    $url = zume_get_posts_translation_url( 'FAQ', $current_lang );
    return $url;
}
