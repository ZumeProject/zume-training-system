<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly.

/**
 * Zume_Downloads_Post_Type Post Type Class
 * All functionality pertaining to project update post types in Zume_Downloads_Post_Type.
 *
 * @package  Disciple_Tools
 * @since    0.1.0
 */
class Zume_Downloads_Post_Type
{
    /**
     * The post type token.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $post_type;

    /**
     * The post type singular label.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $singular;

    /**
     * The post type plural label.
     *
     * @access public
     * @since  0.1.0
     * @var    string
     */
    public $plural;

    /**
     * The post type args.
     *
     * @access public
     * @since  0.1.0
     * @var    array
     */
    public $args;

    /**
     * The taxonomies for this post type.
     *
     * @access public
     * @since  0.1.0
     * @var    array
     */
    public $taxonomies;

    /**
     * Zume_Downloads_Post_Type The single instance of Zume_Downloads_Post_Type.
     * @var     object
     * @access  private
     * @since   0.1
     */
    private static $_instance = null;

    /**
     * Main Zume_Downloads_Post_Type Instance
     *
     * Ensures only one instance of Zume_Downloads_Post_Type is loaded or can be loaded.
     *
     * @since 0.1
     * @static
     * @return Zume_Downloads_Post_Type instance
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    /**
     * Disciple_Tools_Prayer_Post_Type constructor.
     *
     * @param string $post_type
     * @param string $singular
     * @param string $plural
     * @param array  $args
     * @param array  $taxonomies
     */
    public function __construct( $post_type = 'zume_download', $singular = 'Zume Download', $plural = 'Zume Downloads', $args = array(), $taxonomies = array() ) {
        $this->post_type = $post_type;
        $this->singular = $singular;
        $this->plural = $plural;
        $this->args = $args;
        $this->taxonomies = $taxonomies;

        add_action( 'init', array( $this, 'register_post_type' ) );

        if ( is_admin() ) {
            global $pagenow;

            add_action( 'admin_menu', array( $this, 'meta_box_setup' ), 20 );
            add_action( 'save_post', array( $this, 'meta_box_save' ) );
            add_filter( 'enter_title_here', array( $this, 'enter_title_here' ) );
            add_filter( 'post_updated_messages', array( $this, 'updated_messages' ) );

            if ( $pagenow == 'edit.php' && isset( $_GET['post_type'] ) ) {
                $pt = sanitize_text_field( wp_unslash( $_GET['post_type'] ) );
                if ( $pt === $this->post_type ) {
                    add_filter( 'manage_edit-' . $this->post_type . '_columns', array( $this, 'register_custom_column_headings' ), 10, 1 );
                    add_action( 'manage_posts_custom_column', array( $this, 'register_custom_columns' ), 10, 2 );
                }
            }
        }
    } // End __construct()

    /**
     * Register the post type.
     *
     * @access public
     * @return void
     */
    public function register_post_type() {
        register_post_type( $this->post_type, /* (http://codex.wordpress.org/Function_Reference/register_post_type) */
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
                'description' => '', /* Custom Type Description */
                'public' => false,
                'publicly_queryable' => false,
                'exclude_from_search' => true,
                'show_ui' => true,
                'query_var' => true,
                'menu_position' => 10, /* this is what order you want it to appear in on the left hand side menu */
                'menu_icon' => 'dashicons-editor-customchar', /* the icon for the custom post type menu. uses built-in dashicons (CSS class name) */
                'rewrite' => array(
                    'slug' => 'zume_video',
                    'with_front' => false,
                ), /* you can specify its url slug */
                'has_archive' => 'zume_video', /* you can rename the slug here */
                'capability_type' => 'post',
                'hierarchical' => false,
                /* the next one is important, it tells what's enabled in the post editor */
                'supports' => array( 'title' ),
            ) /* end of options */
        ); /* end of register post type */
    } // End register_post_type()


    /**
     * Add custom columns for the "manage" screen of this post type.
     *
     * @access public
     *
     * @param  string $column_name
     *
     * @since  0.1.0
     * @return void
     */
    public function register_custom_columns( $column_name ) {
        global $post;

        switch ( $column_name ) {
            case 'slides':
                echo ( get_post_meta( $post->ID, 'ppt_10_session', true ) ) ? 'Installed' : '';
                break;
            case 'guidebook_10':
                echo ( get_post_meta( $post->ID, 'guidebook_10_session', true ) ) ? 'Installed' : '';
                break;
            case 'store_url':
                echo ( get_post_meta( $post->ID, 'purchase_url', true ) ) ? 'Installed' : '';
                break;
            default:
                break;
        }
    }

    /**
     * Add custom column headings for the "manage" screen of this post type.
     *
     * @access public
     *
     * @param  array $defaults
     *
     * @since  0.1.0
     * @return mixed/void
     */
    public function register_custom_column_headings( $defaults ) {

        $new_columns = array( 'slides' => 'Slides', 'guidebook_10' => 'Book 10', 'store_url' => 'Store URL' );

        $last_item = array();

        if ( count( $defaults ) > 2 ) {
            $last_item = array_slice( $defaults, -1 );

            array_pop( $defaults );
        }
        $defaults = array_merge( $defaults, $new_columns );

        if ( is_array( $last_item ) && 0 < count( $last_item ) ) {
            foreach ( $last_item as $k => $v ) {
                $defaults[ $k ] = $v;
                break;
            }
        }

        return $defaults;
    } // End register_custom_column_headings()

    /**
     * Update messages for the post type admin.
     *
     * @since  0.1.0
     *
     * @param  array $messages Array of messages for all post types.
     *
     * @return array           Modified array.
     */
    public function updated_messages( $messages ) {
        global $post;

        $messages[ $this->post_type ] = array(
            0  => '', // Unused. Messages start at index 1.
            1  => sprintf(
                '%3$s updated. %1$sView %4$s%2$s',
                '<a href="' . esc_url( get_permalink( $post->ID ) ) . '">',
                '</a>',
                $this->singular,
                strtolower( $this->singular )
            ),
            2  => $this->singular .' updated.',
            3  => $this->singular.' deleted.',
            4  => sprintf( '%s updated.', $this->singular ),
            /* translators: %s: date and time of the revision */
            5  => isset( $_GET['revision'] ) ? sprintf( '%1$s restored to revision from %2$s', $this->singular, wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
            6  => sprintf( '%1$s published. %3$sView %2$s%4$s', $this->singular, strtolower( $this->singular ), '<a href="' . esc_url( get_permalink( $post->ID ) ) . '">', '</a>' ),
            7  => sprintf( '%s saved.', $this->singular ),
            8  => sprintf( '%1$s submitted. %2$sPreview %3$s%4$s', $this->singular, strtolower( $this->singular ), '<a target="_blank" href="' . esc_url( add_query_arg( 'preview', 'true', get_permalink( $post->ID ) ) ) . '">', '</a>' ),
            9  => sprintf(
                '%1$s scheduled for: %2$s. %3$sPreview %4$s',
                strtolower( $this->singular ),
                // translators: Publish box date format, see http://php.net/date
                '<strong>' . date_i18n( 'M j, Y @ G:i',
                strtotime( $post->post_date ) ) . '</strong>',
                '<a target="_blank" href="' . esc_url( get_permalink( $post->ID ) ) . '">',
                '</a>'
            ),
            10 => sprintf( '%1$s draft updated. %2$sPreview %3$s%4$s', $this->singular, strtolower( $this->singular ), '<a target="_blank" href="' . esc_url( add_query_arg( 'preview', 'true', get_permalink( $post->ID ) ) ) . '">', '</a>' ),
        );

        return $messages;
    } // End updated_messages()

    /**
     * Setup the meta box.
     *
     * @access public
     * @since  0.1.0
     * @return void
     */
    public function meta_box_setup() {
        add_meta_box( $this->post_type . '_slides', 'Slide Decks', array( $this, 'load_slides_meta_box' ), $this->post_type, 'normal', 'high' );
        add_meta_box( $this->post_type . '_guidebook', 'Guidebooks', array( $this, 'load_guidebooks_meta_box' ), $this->post_type, 'normal', 'high' );
        add_meta_box( $this->post_type . '_store', 'Store', array( $this, 'load_store_meta_box' ), $this->post_type, 'normal', 'high' );
        add_meta_box( $this->post_type . '_scribes', 'Scripts', array( $this, 'load_downloads_meta_box' ), $this->post_type, 'normal', 'high' );
    } // End meta_box_setup()

    public function load_slides_meta_box() {
        $this->meta_box_content( 'slides' ); // prints
    }

    public function load_guidebooks_meta_box() {
        $this->meta_box_content( 'guidebook' ); // prints
    }

    public function load_store_meta_box() {
        $this->meta_box_content( 'store' ); // prints
    }

    /**
     * Meta box for Status Information
     *
     * @access public
     * @since  0.1.0
     */
    public function load_downloads_meta_box() {
        global $post_id;

        echo 'Scripts content must be edited in <a href="'. esc_html( site_url() ) .'/app/translator">app/translator</a><br><hr>';
        $this->meta_box_content( 'downloads' ); // prints

        // make sure fields exist
        $fields = get_post_custom( $post_id );
        $field_data = $this->get_custom_fields_settings();
        foreach ( $field_data as $k => $v ){
            if ( !isset( $fields[$k] ) ) {
                update_post_meta( $post_id, $k, '' );
            }
        }
    }


    /**
     * The contents of our meta box.
     *
     * @param string $section
     */
    public function meta_box_content( $section = 'downloads' ) {
        global $post_id;
        $fields = get_post_custom( $post_id );
        $field_data = $this->get_custom_fields_settings();

        echo '<input type="hidden" name="' . esc_attr( $this->post_type ) . '_noonce" id="' . esc_attr( $this->post_type ) . '_noonce" value="' . esc_attr( wp_create_nonce( 'video_noonce_action' ) ) . '" />';

        if ( 0 < count( $field_data ) ) {
            echo '<table class="form-table">' . "\n";
            echo '<tbody>' . "\n";

            foreach ( $field_data as $k => $v ) {

                if ( $v['section'] == $section ) {

                    $data = $v['default'];
                    if ( isset( $fields[ $k ] ) && isset( $fields[ $k ][0] ) ) {
                        $data = $fields[ $k ][0];
                    }

                    $type = $v['type'];

                    switch ( $type ) {

                        case 'url':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th><td><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" value="' . esc_attr( $data ) . '" />' . "\n";
                            echo '<p class="description">' . esc_html( $v['description'] ) . '</p>' . "\n";
                            echo '</td><tr/>' . "\n";
                            break;
                        case 'text':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th>
                                <td><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" value="' . esc_attr( $data ) . '" />' . "\n";
                            echo '<p class="description">' . esc_html( $v['description'] ) . '</p>' . "\n";
                            echo '</td><tr/>' . "\n";
                            break;
                        case 'link':
                            echo '<tr valign="top"><th scope="row"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th>
                                <td><input name="' . esc_attr( $k ) . '" type="text" id="' . esc_attr( $k ) . '" class="regular-text" value="' . esc_attr( $data ) . '" />' . "\n";
                            echo '<a href="'. esc_url( zume_mirror_url() ) .esc_attr( get_the_title( $post_id ) ).'/'.esc_attr( $data ).'" target="_blank">Check Link</a>';
                            echo '</td><tr/>' . "\n";
                            break;
                        case 'textarea_x':
                            echo '<tr valign="top"><td style="padding:2px;vertical-align: top;font-weight:bold;"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></td>
                                <td style="padding:2px;">';
                            wp_editor( $data, $k, array( 'media_buttons' => false ) );
                            echo '</td></tr>' . "\n";
                            break;
                        case 'textarea':
                            echo '<tr valign="top"><td style="padding:2px;vertical-align: top;font-weight:bold;"><label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></td>
                                <td style="padding:2px;">';
                            echo esc_html( $data );
                            echo '</td></tr>' . "\n";
                            break;
                        case 'select':
                            echo '<tr valign="top"><th scope="row">
                                <label for="' . esc_attr( $k ) . '">' . esc_html( $v['name'] ) . '</label></th>
                                <td>
                                <select name="' . esc_attr( $k ) . '" id="' . esc_attr( $k ) . '" class="regular-text">';
                            // Iterate the options
                            foreach ( $v['default'] as $vv ) {
                                echo '<option value="' . esc_attr( $vv ) . '" ';
                                if ( $vv == $data ) {
                                    echo 'selected';
                                }
                                echo '>' . esc_html( $vv ) . '</option>';
                            }
                            echo '</select>' . "\n";
                            echo '<p class="description">' . esc_html( $v['description'] ) . '</p>' . "\n";
                            echo '</td><tr/>' . "\n";
                            break;

                        default:
                            break;
                    }
                }
            }
            echo '</tbody>' . "\n";
            echo '</table>' . "\n";
        }
    } // End meta_box_content()

    /**
     * Save meta box fields.
     *
     * @access public
     * @since  0.1.0
     *
     * @param  int $post_id
     *
     * @return int $post_id
     */
    public function meta_box_save( $post_id ) {

        // Verify
        if ( get_post_type() != $this->post_type ) {
            return $post_id;
        }

        $key = $this->post_type . '_noonce';
        if ( isset( $_POST[ $key ] ) && !wp_verify_nonce( sanitize_key( $_POST[ $key ] ), 'video_noonce_action' ) ) {
            return $post_id;
        }

        if ( isset( $_POST['post_type'] ) && 'page' == sanitize_text_field( wp_unslash( $_POST['post_type'] ) ) ) {
            if ( !current_user_can( 'edit_page', $post_id ) ) {
                return $post_id;
            }
        } elseif ( !current_user_can( 'edit_post', $post_id ) ) {
                return $post_id;
        }

        if ( isset( $_GET['action'] ) ) {
            if ( $_GET['action'] == 'trash' || $_GET['action'] == 'untrash' || $_GET['action'] == 'delete' ) {
                return $post_id;
            }
        }

        $field_data = $this->get_custom_fields_settings();
        $fields = array_keys( $field_data );

        foreach ( $fields as $f ) {
            if ( !isset( $_POST[ $f ] ) ) {
                continue;
            }

            ${$f} = strip_tags( trim( sanitize_text_field( wp_unslash( $_POST[ $f ] ) ) ) );

            // Escape the URLs.
            if ( 'url' == $field_data[ $f ]['type'] ) {
                ${$f} = esc_url( ${$f} );
            }

            if ( 'textarea' == $field_data[ $f ]['type'] ) {
                update_post_meta( $post_id, $f, trim( sanitize_textarea_field( wp_unslash( $_POST[ $f ] ) ) ) );
            } elseif ( get_post_meta( $post_id, $f ) == '' ) {
                add_post_meta( $post_id, $f, ${$f}, true );
            } elseif ( ${$f} != get_post_meta( $post_id, $f, true ) ) {
                update_post_meta( $post_id, $f, ${$f} );
            } elseif ( ${$f} == '' ) {
                update_post_meta( $post_id, $f, '' );
            }
        }
        return $post_id;
    } // End meta_box_save()

    /**
     * Customise the "Enter title here" text.
     *
     * @access public
     * @since  0.1.0
     *
     * @param  string $title
     *
     * @return string
     */
    public function enter_title_here( $title ) {
        if ( get_post_type() == $this->post_type ) {
            $title = 'Enter the title here';
        }

        return $title;
    } // End enter_title_here()

    /**
     * Get the settings for the custom fields.
     *
     * @access public
     * @since  0.1.0
     * @return array
     */
    public function get_custom_fields_settings() {
        $fields = array();

        // Project Update Information Section

        $fields['34'] = array(
            'name'        => '(34) God Uses Ordinary People',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['35'] = array(
            'name'        => '(35) Disciples and the Church',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['36'] = array(
            'name'        => '(36) Spiritual Breathing Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['37'] = array(
            'name'        => '(37) S.O.A.P.S. Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['38'] = array(
            'name'        => '(38) Accountability Groups Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['39'] = array(
            'name'        => '(39) Producers vs Consumers Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['40'] = array(
            'name'        => '(40) Prayer Cycle Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['41'] = array(
            'name'        => '(41) List of 100 Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['42'] = array(
            'name'        => '(42) Spiritual Economy Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['43'] = array(
            'name'        => '(43) The Gospel Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['44'] = array(
            'name'        => '(44) Baptism Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['45'] = array(
            'name'        => '(45) 3 Minute Testimony Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['46'] = array(
            'name'        => '(46) Greatest Blessing Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['47'] = array(
            'name'        => '(47) Duckling Discipleship Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['48'] = array(
            'name'        => '(48) Eyes to See Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['49'] = array(
            'name'        => '(49) Lord’s Supper Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['50'] = array(
            'name'        => '(50) Prayer Walking Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['51'] = array(
            'name'        => '(51) Person of Peace Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['52'] = array(
            'name'        => '(52) Faithfulness Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['53'] = array(
            'name'        => '(53) 3/3 Groups Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['54'] = array(
            'name'        => '(54) Training Cycle Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['55'] = array(
            'name'        => '(55) Leadership Cells Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['56'] = array(
            'name'        => '(56) Non-Sequential Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['57'] = array(
            'name'        => '(57) Pace Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['58'] = array(
            'name'        => '(58) Part of Two Churches Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['60'] = array(
            'name'        => '(60) Coaching Checklist Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['61'] = array(
            'name'        => '(61) Leadership in Networks Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['62'] = array(
            'name'        => '(62) Peer Mentoring Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['63'] = array(
            'name'        => '(63) 3-Circles Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );
        $fields['68'] = array(
            'name'        => '(68) 4-Relationships Script',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'downloads',
        );


        // slides
        $fields['ppt_10_session'] = array(
            'name'        => 'Powerpoint 10 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );
        $fields['key_10_session'] = array(
            'name'        => 'Keynote 10 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );

        $fields['ppt_20_session'] = array(
            'name'        => 'Powerpoint 20 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );
        $fields['key_20_session'] = array(
            'name'        => 'Keynote 20 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );

        $fields['ppt_intensive'] = array(
            'name'        => 'Powerpoint Intensive',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );
        $fields['key_intensive'] = array(
            'name'        => 'Keynote Intensive',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'slides',
        );

        // guidebook
        $fields['guidebook_10_session'] = array(
            'name'        => 'Guidebook 10 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'guidebook',
        );
        $fields['guidebook_20_session'] = array(
            'name'        => 'Guidebook 20 Session',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'guidebook',
        );
        $fields['guidebook_intensive'] = array(
            'name'        => 'Guidebook Intensive',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'guidebook',
        );
        $fields['33'] = array(
            'name'        => '(33) v4 Zúme Guidebook ',
            'description' => '',
            'type'        => 'link',
            'default'     => '',
            'section'     => 'guidebook',
        );

        $fields['store_url'] = array(
            'name'        => 'Online Store URL',
            'description' => '',
            'type'        => 'url',
            'default'     => '',
            'section'     => 'store',
        );


        return apply_filters( 'zume_pdf_download_fields_settings', $fields );
    }

    /**
     * Run on activation.
     *
     * @access public
     * @since  0.1.0
     */
    public function activation() {
        $this->flush_rewrite_rules();
    } // End activation()

    /**
     * Flush the rewrite rules
     *
     * @access public
     * @since  0.1.0
     */
    private function flush_rewrite_rules() {
        $this->register_post_type();
        flush_rewrite_rules();
    } // End flush_rewrite_rules()
} // End Class
Zume_Downloads_Post_Type::instance();
