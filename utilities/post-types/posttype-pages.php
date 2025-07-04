<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
}


/**
 * Zume_Training_Menu_Post_Type
 *
 * This post type has the place holders for core Zume pages. The pages are active and support the core urls
 * but the admin editor is disabled.
 *
 * These core pages are:
 *  Mobile App
 * Get a Coach
 * How to Follow Jesus
 * Cookie Policy
 * Training
 * Privacy Policy
 * Home
 * Resources
 */

 Zume_Training_Menu_Post_Type::instance();

class Zume_Training_Menu_Post_Type
{

    public $post_type;
    public $singular;
    public $plural;
    public $root;
    public $type;
    public $meta_key;
    public $args;
    public $taxonomies;
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Disciple_Tools_Prayer_Post_Type constructor.
     *
     * @param array $args
     * @param array $taxonomies
     */
    public function __construct( $args = [], $taxonomies = [] ) {

        $this->post_type = 'zume_page';
        $this->singular = 'Zume Base Slug';
        $this->plural = 'Zume Base Slugs';
        $this->root = 'app';
        $this->type = 'page';
        $this->meta_key = 'app_page_magic_key';
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', [ $this, 'register_post_type' ] );
        add_action( 'transition_post_status', [ $this, 'transition_post' ], 10, 3 );
        add_action( 'add_meta_boxes', [ $this, 'add_metabox_qr' ] );

        if ( is_admin() && isset( $_GET['post_type'] ) && 'zume_pages' === $_GET['post_type'] ){

            add_filter( 'manage_'.$this->post_type.'_posts_columns', [ $this, 'set_custom_edit_columns' ] );
            add_action( 'manage_'.$this->post_type.'_posts_custom_column', [ $this, 'custom_column' ], 10, 2 );
        }
    }

    public function add_metabox_qr( $post_type ) {
        //if ( $this->post_type === $post_type ) {
        //}
    }


    /**
     * Register the post type.
     *
     * @access public
     * @return void
     */
    public function register_post_type() {
        register_post_type($this->post_type, /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
            // let's now add all the options for this post type
            array(
                'labels' => array(
                    'name' => $this->plural, /* This is the Title of the Group */
                    'singular_name' => $this->singular, /* This is the individual type */
                    'all_items' => 'All '.$this->plural, /* the all items menu item */
                    'add_new' => 'Add New', /* The add new menu item */
                    'add_new_item' => 'Add New '.$this->singular, /* Add New Display Title */
                    'edit' => 'Edit', /* Edit Dialog */
                    'edit_item' => 'Edit '.$this->singular, /* Edit Display Title */
                    'new_item' => 'New '.$this->singular, /* New Display Title */
                    'view_item' => 'View '.$this->singular, /* View Display Title */
                    'search_items' => 'Search '.$this->plural, /* Search Custom Type Title */
                    'not_found' => 'Nothing found in the Database.', /* This displays if there are no entries yet */
                    'not_found_in_trash' => 'Nothing found in Trash', /* This displays if there is nothing in the trash */
                    'parent_item_colon' => '',
                ), /* end of arrays */
                'description' => $this->singular, /* Custom Type Description */
                'public' => true,
                'publicly_queryable' => false,
                'exclude_from_search' => true,
                'show_ui' => true,
                'query_var' => false,
                'show_in_nav_menus' => true,
                'menu_position' => 10, /* this is what order you want it to appear in on the left hand side menu */
                'menu_icon' => 'dashicons-editor-customchar', /* the icon for the custom post type menu. uses built-in dashicons (CSS class name) */
                'rewrite' => false, /* you can specify its url slug */
                'has_archive' => false, /* you can rename the slug here */
                'capabilities' => [
                    'create_posts'        => 'create_'.$this->post_type,
                    'edit_post'           => 'edit_'.$this->post_type, // needed for bulk edit
                    'read_post'           => 'read_'.$this->post_type,
                    'delete_post'         => 'delete_'.$this->post_type, // delete individual post
                    'delete_others_posts' => 'delete_others_'.$this->post_type.'s',
                    'delete_posts'        => 'delete_'.$this->post_type.'s', // bulk delete posts
                    'edit_posts'          => 'edit'.$this->post_type.'s', //menu link in WP Admin
                    'edit_others_posts'   => 'edit_others_'.$this->post_type.'s',
                    'publish_posts'       => 'publish_'.$this->post_type.'s',
                    'read_private_posts'  => 'read_private_'.$this->post_type.'s',
                ],
                'capability_type' => 'page',
                'hierarchical' => false,
                'show_in_rest' => true,
                'supports' => array( 'title', 'wp-block-styles', 'align-wide' ),
            )
        );
    }


    public function transition_post( $new_status, $old_status, $post ) {
        if ( 'publish' == $new_status && $post->post_type == 'zume_pages' ) {

            $post_id = $post->ID;
            $slug = trim( strtolower( $post->post_title ) );
            $slug = str_replace( ' ', '-', $slug );
            $slug = str_replace( '"', '', $slug );
            $slug = str_replace( '&', '', $slug );
            $slug = str_replace( "'", '', $slug );
            $slug = str_replace( ',', '', $slug );
            $slug = str_replace( ':', '', $slug );
            $slug = str_replace( ';', '', $slug );
            $slug = str_replace( '.', '', $slug );
            $slug = str_replace( '/', '', $slug );
            $slug = urlencode( $slug );

            $current_public_key = get_post_meta( $post_id, $this->meta_key, true );
            if ( $slug !== $current_public_key ) {
                update_post_meta( $post_id, $this->meta_key, $slug );
                global $wpdb, $table_prefix;
                $wpdb->query( $wpdb->prepare( 'UPDATE zume_posts SET guid = %s WHERE ID = %s;', trailingslashit( site_url() ) . $this->root . '/' . $this->type . '/' . $slug, $post_id ) );
            }
        }
    }

    // Add the custom columns to the book post type:
    public function set_custom_edit_columns( $columns ) {
        unset( $columns['author'] );
        $columns['url'] = 'URL';

        return $columns;
    }

    // Add the data to the custom columns for the book post type:
    public function custom_column( $column, $post_id ) {
        switch ( $column ) {
            case 'url' :
                $public_key = get_post_meta( $post_id, $this->meta_key, true );
                echo '<a href="' . esc_url( trailingslashit( site_url() ) ) . esc_attr( $this->root ) . '/' . esc_attr( $this->type ) . '/' . esc_attr( $public_key ) . '">'. esc_url( trailingslashit( site_url() ) ) . esc_attr( $this->root ) . '/' . esc_attr( $this->type ) . '/' . esc_attr( $public_key ) .'</a>';
                break;
        }
    }
} // End Class
