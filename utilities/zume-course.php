<?php


class Zume_Course {

    /**
     * Zume_Admin_Menus The single instance of Zume_Admin_Menus.
     * @var    object
     * @access  private
     * @since    0.1
     */
    private static $_instance = null;

    /**
     * Main Zume_Course Instance
     *
     * Ensures only one instance of Zume_Admin_Menus is loaded or can be loaded.
     *
     * @since 0.1
     * @static
     * @return Zume_Course instance
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }

        return self::$_instance;
    } // End instance()

    /**
     * Constructor function.
     * @access  public
     * @since   0.1
     */
    public function __construct() {
    } // End __construct()

    public static function get_video_by_key( $meta_key, $player = true, $lang = null, $autoplay = false ) {
        // get language
        if ( empty( $lang ) ) {
            $current_lang = zume_current_language();
        } else {
            $current_lang = $lang;
        }

        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_video' );
        if ( ! $page ) {
            return '';
        }
        $video_id = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_id ) {
            return '';
        }
        if ( ! $player ) { // if not the player, then return just the vimeo url.
            return $video_id;
        }

        $query_params = '?transcript=false&pip=false';
        if ( $autoplay ) {
            $query_params .= '&autoplay=true';
        }
        return 'https://player.vimeo.com/video/' . $video_id . $query_params;
    }

    public static function get_alt_video_by_key( $meta_key ) {
        // get language
        $current_lang = zume_current_language();
        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_video' );
        if ( ! $page ) {
            return '';
        }
        $video_url = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_url ) {
            return '';
        }
        return $video_url;
    }

    public static function get_download_by_key( $meta_key, $lang = null ) {
        // get language
        if ( empty( $lang ) ) {
            $current_lang = zume_current_language();
        } else {
            $current_lang = $lang;
        }
        $current_mirror = zume_mirror_url();
        // get custom post type by language title
        $page = self::get_page_by_title( $current_lang, OBJECT, 'zume_download' );
        if ( ! $page ) {
            return '';
        }
        $video_id = get_post_meta( $page->ID, $meta_key, true );
        if ( ! $video_id ) {
            return '';
        }
        if ( 'video_overview' == $meta_key ) {
            return $video_id;
        }
//        return trailingslashit( get_stylesheet_directory_uri() ) . 'downloads/' . $current_lang . '/' . $video_id;
        return $current_mirror . $current_lang . '/' . $video_id;
    }

    public static function get_page_by_title( $page_title, $output = OBJECT, $post_type = 'page' ) {
        global $wpdb, $table_prefix;

        if ( is_array( $post_type ) ) {
            $post_type           = esc_sql( $post_type );
            $post_type_in_string = "'" . implode( "','", $post_type ) . "'";
            //phpcs:disable
            $sql                 = $wpdb->prepare(
                "SELECT ID
                FROM zume_posts
                WHERE post_title = %s
                AND post_type IN ($post_type_in_string)",
                $page_title
            );
            //phpcs:enable
        } else {
            $sql = $wpdb->prepare(
                'SELECT ID
                FROM zume_posts
                WHERE post_title = %s
                AND post_type = %s',
                $page_title,
                $post_type
            );
        }

        //phpcs:ignore
        $page = $wpdb->get_var( $sql );

        if ( $page ) {
            return get_post( $page, $output );
        }

        return null;
    }
}
