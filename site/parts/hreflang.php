<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

function zume_hreflang_fixed( $lang_code, $slug = '') {
    global $zume_languages_v5_ready;

    foreach( $zume_languages_v5_ready as $code => $lang ) {
        if ( $code === $lang_code ) {
            continue;
        }
        if ( $code === 'en' ) {
            echo '<link rel="alternate" href="' . esc_url( 'https://zume.training/' . $slug ) . '" hreflang="' . esc_attr( $code ) . '" />' . "\n";
        }
        else {
            echo '<link rel="alternate" href="' . esc_url( 'https://zume.training/' . $code . '/' . $slug ) . '" hreflang="' . esc_attr( $code ) . '" />' . "\n";
        }

    }
}

function zume_hreflang_with_slug( $lang_code, $postid ) {
    global $zume_languages_v5_ready, $wpdb;

    $meta = get_post_meta( $postid );

    $tool = $meta['zume_piece'][0];
    $plang = $meta['zume_lang'][0];

    $list = $wpdb->get_results( $wpdb->prepare( "
        SELECT post_name, pm1.meta_value as lang
        FROM zume_posts p
        JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_piece' AND pm.meta_value = '1'
        JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_lang' AND pm1.meta_value != %s
        WHERE p.post_type = 'zume_pieces'
    ", $plang ), ARRAY_A );
    $post_names = [];
    foreach( $list as $slug ) {
        $post_names[$slug['lang']] = $slug['post_name'];
    }

    foreach( $zume_languages_v5_ready as $code => $lang ) {
        if ( ! isset( $post_names[$code] ) ) {
            continue;
        }
        if ( $code === 'en' ) {
            echo '<link rel="alternate" href="' . esc_url( 'https://zume.training/' . $post_names[$code] ) . '" hreflang="' . esc_attr( $code ) . '" />' . "\n";
        }
        else {
            echo '<link rel="alternate" href="' . esc_url( 'https://zume.training/' . $code . '/' . $post_names[$code] ) . '" hreflang="' . esc_attr( $code ) . '" />' . "\n";
        }
    }
}
