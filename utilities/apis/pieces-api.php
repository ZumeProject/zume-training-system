<?php
if ( !defined( 'ABSPATH' ) ) { exit; }
/**
 * Custom endpoints file
 */

class Zume_Pieces_Endpoints
{
    private $namespace;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        if ( dt_is_rest() ) {
            $this->namespace = 'zume_system/v1';
            add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
        }
    }

    public function add_api_routes() {
        register_rest_route(
            $this->namespace, '/piece', [
                'methods' => 'GET',
                'callback' => [ $this, 'get_piece_page_content' ],
                'permission_callback' => '__return_true',
            ]
        );
    }
    public function get_piece_page_content( WP_REST_Request $request ){
        $params = $request->get_params();
        if ( ! isset( $params['id'], $params['lang'], $params['strings'] ) ) {
            return new WP_Error( 'log_param_error', 'Missing parameters', array( 'status' => 400 ) );
        }
        $lang = 'en';
        if ( ! empty( $params['lang'] ) ) {
            $lang = sanitize_text_field( wp_unslash( $params['lang'] ) );
        }

        $postid = sanitize_text_field( wp_unslash( $params['id'] ) );
        $strings = dt_recursive_sanitize_array( json_decode( $params['strings'], true ) );
        $limited = $params['limited'] ?? false;

        ob_start();

        pieces_content( $postid, $lang, $strings, $limited );

        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }
}
Zume_Pieces_Endpoints::instance();


function pieces_content( $postid, $lang, $strings, $limited = false ) {
    global $zume_languages_by_code;

    if ( ! isset( $zume_languages_by_code[$lang] ) ) {
        return;
    }

    if ( ! isset( $strings['wtv'], $strings['vt'], $strings['ay'], $strings['lra'] ) ) {
        return;
    }

    $meta = get_post_meta( (int) $postid );
    if ( ! empty( $meta['zume_pre_video_content'][0] ) && ! empty( $meta['zume_post_video_content'][0] ) && ! empty( $meta['zume_ask_content'][0] ) ) {
        pieces_content_has_pieces( $postid, $lang, $strings, $limited );
    } else {
        pieces_content_has_no_pieces( $postid, $lang, $strings );
    }
}

function pieces_content_has_pieces( $postid, $lang, $strings, $limited = false ) {

    $meta = get_post_meta( (int) $postid );

    if ( $meta['zume_lang'][0] !== $lang ) {
        // $translated_postid = get_piece_translation_id( $postid, $lang );
        global $wpdb;
        $translated_postid = $wpdb->get_var( $wpdb->prepare(
            "SELECT p.ID
            FROM zume_posts p
            JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
            JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece' AND pm1.meta_value = %s
            WHERE post_type = 'zume_pieces'
            LIMIT 1",
            $lang, $meta['zume_piece'][0]
        ) );

        if ( $translated_postid !== $postid ) {
            $meta = get_post_meta( $translated_postid );
        }
    }

    $training_items = zume_training_items();
    $tool_number = $meta['zume_piece'][0] ?? 0;
    $pre_video_content = zume_replace_placeholder( $meta['zume_pre_video_content'][0] ?? '', $lang );
    $post_video_content = zume_replace_placeholder( $meta['zume_post_video_content'][0] ?? '', $lang );
    $ask_content = zume_replace_placeholder( $meta['zume_ask_content'][0] ?? '', $lang );
    $h1_title = empty( $meta['zume_piece_h1'][0] ) ? $training_items[$tool_number]['title'] ?? get_the_title( $postid ) : $meta['zume_piece_h1'][0];
    $args = Zume_V5_Pieces::vars( $tool_number );

    if ( empty( $args ) ) {
        return '';
    }

    $alt_video = $args['alt_video'];
    $image_url = $args['image_url'];
    $audio = $args['audio'];
    $has_video = $args['has_video'];
    $video_id = $args['video_id'];
    $script_id = Zume_Course::get_transcript_by_key( $video_id );
    $script_url = site_url( $lang . '/app/script?s=' . $script_id );

    ?>

    <div class="container-xsm stack-2 | py-2 f-1 | pieces-page activity content">

        <?php if ( ! empty( $image_url ) ) : ?>
            <!-- <img src="<?php echo esc_url( $image_url ) ?>" alt="<?php echo esc_html( $h1_title ) ?>"/> -->
        <?php endif; ?>

        <div class="stack-1">
            <h1 class="center brand"><?php echo esc_html( $h1_title ) ?></h1>

            <div class="stack"><?php echo wp_kses_post( wpautop( $pre_video_content ) ) ?></div>
        </div>


        <!-- video block -->
        <?php if ( $has_video ) : ?>
            <div class="stack-1">
                <?php if ( $audio ) :  ?>
                    <h3 class="center"><?php echo esc_html( $strings['lra'] ) ?? '' ?></h3>
                <?php else : ?>
                    <h3 class="center"><?php echo esc_html( $strings['wtv'] ) ?? '' ?></h3>
                <?php endif; ?>

                <?php if ( $alt_video ) : ?>
                    <video width="960" style="border: 1px solid lightgrey;max-width: 960px;width:100%;" controls>
                        <source src="<?php echo esc_url( zume_mirror_url() . zume_current_language() . '/'.$video_id.'.mp4' ) ?>" type="video/mp4" >
                        Your browser does not support the video tag.
                    </video>
                <?php else : ?>
                    <div class="responsive-embed widescreen">
                        <iframe style="border: 1px solid lightgrey;"  src="<?php echo esc_url( Zume_Course::get_video_by_key( $video_id ) ) ?>" width="560" height="315"
                                frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        </iframe>
                    </div>
                <?php endif; ?>

                <?php if ( ! $limited ) : ?>
                    <button class="btn large fit-content mx-auto" data-toggle="transcript-offcanvas">
                        <?php echo esc_html( $strings['vt'] ) ?? 'View Transcript' ?>
                    </button>
                <?php endif; ?>

            </div>
        <?php endif; ?>

        <!-- post-video block -->
        <div class="stack-1"><?php echo wp_kses_post( wpautop( $post_video_content ) ) ?></div>

        <!-- question block -->
        <div class="stack-1">
            <h3 class="center"><?php echo esc_html( $strings['ay'] ) ?? '' ?></h3>
            <?php echo wp_kses_post( wpautop( $ask_content ) ) ?>
        </div>

        <?php if ( ! is_user_logged_in() ): ?>
            <div class="grid-container margin-top-2 margin-bottom-2">
                <div class="grid-x grid-padding-x">
                    <div class="cell">
                        <div class="callout secondary">
                            <h3><?php echo esc_html__( 'Get started with Zúme Training', 'zume' ) ?></h3>
                            <p><?php echo esc_html__( 'Gather a few friends or go through the course with an existing small group. Create your own training group and track your progress.', 'zume' ) ?></p>
                            <div class="button-group center">
                                <a href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="btn large w-80 px-0"><?php echo esc_html__( 'Register Free', 'zume' ) ?></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>

    </div>

    <?php if ( ! $limited ) : ?>
        <div
            class="bg-white | information-flyout bypass-nav-click off-canvas position-right z-20"
            id="transcript-offcanvas"
            data-off-canvas
            data-transition="overlap"
        >
            <div class="ms-auto absolute right top">
                <button class="close-btn | my--2 mx-1 f-0" aria-label="<?php esc_attr( __( 'Close', 'zume' ) ) ?>" type="button" data-close>
                    <span class="icon z-icon-close"></span>
                </button>
            </div>
            <div class="cover-page" id="transcript-loading-spinner">
                <div class="center"><span class="loading-spinner active"></span></div>
            </div>
            <iframe
                id='iframe'
                src="<?php echo esc_url( $script_url ) ?>"
                frameborder="0"
                width="100%"
                onload="document.querySelector('#transcript-loading-spinner').remove()"
            >
            </iframe>
        </div>
    <?php endif; ?>

    <?php
}

function pieces_content_has_no_pieces( $post_id, $lang, $strings ) {
    global $wpdb;

    $video_id = get_post_meta( $post_id, 'zume_piece', true );
    $training_items = zume_training_items();

    // video by language
    $sql = $wpdb->prepare(
        "SELECT pm.meta_value
            FROM zume_posts p
            JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
            WHERE p.post_type = 'zume_videos'
            AND p.post_title = %s
        ", $video_id, $lang );
    $vimeo_id = $wpdb->get_var( $sql );

    // scripts by language
    $script_id = $training_items[$video_id]['script'];
    $sql = $wpdb->prepare(
        "SELECT pm.meta_value
            FROM zume_posts p
            JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = %s
            WHERE p.post_type = 'zume_scripts'
            AND p.post_title = %s
        ", $script_id, $lang );
    $body = $wpdb->get_var( $sql );

    // titles
    $training_items = zume_training_items_by_script();
    $args = Zume_V5_Pieces::vars( $video_id );
    $alt_video = $args['alt_video'];
    $image_url = $args['image_url'];
    $audio = $args['audio'];
    $has_video = $args['has_video'];
    $video_id = $args['video_id'];


    if ( empty( $body ) ) {
        ?>
            <div class="activity__wrapper">
                <div class="text-center">
                    <h1>Script not yet translated</h1><hr>
                </div>
                <div class="activity__content">
                </div>
            </div>
        <?php
    } else {
        ?>
        <div class="container-xsm stack-2 | py-2 f-1 | pieces-page activity content">
            <div class="stack-1">
                <div class="text-center">
                    <h1><?php echo esc_html( $training_items[$script_id]['title'] ) ?? '' ?></h1>
                    <hr>
                </div>

                <?php if ( $alt_video ) : ?>
                    <video width="960" style="border: 1px solid lightgrey;max-width: 960px;width:100%;" controls>
                        <source src="<?php echo esc_url( zume_mirror_url() . zume_current_language() . '/'.$video_id.'.mp4' ) ?>" type="video/mp4" >
                        Your browser does not support the video tag.
                    </video>
                <?php else : ?>
                    <div class="responsive-embed widescreen">
                        <iframe style="border: 1px solid lightgrey;"  src="<?php echo esc_url( Zume_Course::get_video_by_key( $video_id ) ) ?>" width="560" height="315"
                                frameborder="1" webkitallowfullscreen mozallowfullscreen allowfullscreen>
                        </iframe>
                    </div>
                <?php endif; ?>
            </div>

            <div class="activity__wrapper activity content">
                <div class="activity__content">
                    <?php echo wp_kses( zume_replace_placeholder( $body, $lang ), 'post' ) ?>
                </div>
            </div>
        </div>
        <?php
    }
}

function get_piece_translation_id( $postid, $lang_code ) {
    global $zume_languages_by_code;
    $post = get_post( $postid );
    $slug = $post->post_name;

    $slug_parts = explode( '-', $slug );
    $lang_part = $slug_parts[ count( $slug_parts ) - 1 ];

    if ( $lang_part === $lang_code ) {
        return $postid;
    }

    if ( !isset( $zume_languages_by_code[$lang_code] ) ) {
        return $postid;
    }

    if ( !isset( $zume_languages_by_code[$lang_part] ) ) {
        $slug_parts[] = $lang_code;
    } else {
        $slug_parts[ count( $slug_parts ) - 1 ] = $lang_code;
    }


    $translation_slug = implode( '-', $slug_parts );

    $post = zume_get_post_by_slug( $translation_slug, 'zume_pieces' );

    return $post->ID;
}

function pieces_by_lang_code( $lang_code ) {
    global $wpdb;

    $posts = $wpdb->get_results( $wpdb->prepare(
        "SELECT
            p.ID,
            p.post_title,
            p.post_name,
            pm1.meta_value as zume_piece,
            pm2.meta_value as zume_piece_h1,
            pm3.meta_value as zume_pre_video_content,
            pm4.meta_value as zume_post_video_content,
            pm5.meta_value as zume_ask_content,
            pm6.meta_value as zume_seo_meta_description
        FROM zume_posts p
        JOIN zume_postmeta pm ON p.ID = pm.post_id AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
        LEFT JOIN zume_postmeta pm1 ON p.ID = pm1.post_id AND pm1.meta_key = 'zume_piece'
        LEFT JOIN zume_postmeta pm2 ON p.ID = pm2.post_id AND pm2.meta_key = 'zume_piece_h1'
        LEFT JOIN zume_postmeta pm3 ON p.ID = pm3.post_id AND pm3.meta_key = 'zume_pre_video_content'
        LEFT JOIN zume_postmeta pm4 ON p.ID = pm4.post_id AND pm4.meta_key = 'zume_post_video_content'
        LEFT JOIN zume_postmeta pm5 ON p.ID = pm5.post_id AND pm5.meta_key = 'zume_ask_content'
        LEFT JOIN zume_postmeta pm6 ON p.ID = pm6.post_id AND pm6.meta_key = 'zume_seo_meta_description'
        WHERE
            p.post_type = 'zume_pieces'
            AND p.post_status = 'publish'
            AND pm1.meta_value IS NOT NULL
        ORDER BY cast(pm1.meta_value as unsigned)
          ", $lang_code ), ARRAY_A );

    // dt_write_log( $posts );

    return $posts;
}

