<?php
/**
 * Zume_Training_Maintenance_Menu class for the admin page
 *
 * @class      Zume_Training_Maintenance_Menu
 * @version    0.1.0
 * @since      0.1.0
 * @package    Zume_Training
 * @author     Zume Training
 */

if ( !defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * Class Zume_Training_Maintenance_Menu
 */
class Zume_Training_Maintenance_Menu
{
    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'add_maintenance_menu' ] );
        add_action( 'admin_init', [ $this, 'handle_repair_join_keys' ] );
    }

    public function add_maintenance_menu() {
        $image_url = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDUwLjY0IDQzMS41NCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzhiYzM0YTsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiB1cmwoI2xpbmVhci1ncmFkaWVudCk7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjIyNS4zMyIgeTE9IjI0My44IiB4Mj0iNDUwLjY0IiB5Mj0iMjQzLjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMWQxZDFiIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjQ3IiBzdG9wLWNvbG9yPSIjOGJjMzRhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhiYzM0YSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj4KICAgIDxnPgogICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iNDUwLjY0IDQzMS41NCAzNzUuNTQgNDMxLjU0IDIyNS4zMyAxMTcuMjcgMjU0LjU5IDU2LjA1IDQ1MC42NCA0MzEuNTQiLz4KICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjI1NC41OSA1Ni4wNSAyMjUuMzMgMTE3LjI3IDIyNS4zMiAxMTcuMjcgNzUuMTEgNDMxLjU0IDAgNDMxLjU0IDI5LjM1IDM3NS4zMyAyMDUuMyAzOC4zNSAyMjUuMzIgMCAyNDQuMzQgMzYuNDMgMjU0LjU5IDU2LjA1Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=';
        add_menu_page( __( 'Maintenance', 'zume-training-system' ), __( 'Maintenance', 'zume-training-system' ), 'manage_dt', 'zume_maintenance', [ $this, 'content' ], $image_url, 53 );
    }

    public function content() {
        if ( !current_user_can( 'manage_dt' ) ) {
            wp_die( 'You do not have sufficient permissions to access this page.' );
        }

        // Check if repair was just run
        $repair_message = '';
        if ( isset( $_GET['repair_join_keys'] ) && $_GET['repair_join_keys'] === 'success' ) {
            $repair_message = '<div class="notice notice-success is-dismissible"><p>' . esc_html__( 'Join keys have been successfully repaired!', 'zume-training-system' ) . '</p></div>';
        } elseif ( isset( $_GET['repair_join_keys'] ) && $_GET['repair_join_keys'] === 'error' ) {
            $repair_message = '<div class="notice notice-error is-dismissible"><p>' . esc_html__( 'An error occurred while repairing join keys.', 'zume-training-system' ) . '</p></div>';
        }

        ?>
        <div class="wrap">
            <h2><?php esc_html_e( 'Zúme Training: Maintenance', 'zume-training-system' ); ?></h2>
            <?php echo $repair_message; ?>
            
            <div class="card" style="max-width: 800px; margin-top: 20px;">
                <h3><?php esc_html_e( 'Repair Join Keys', 'zume-training-system' ); ?></h3>
                <p><?php esc_html_e( 'This utility will check all plans and ensure they have a join_key. If a plan is missing a join_key or has an empty one, a new key will be generated and assigned.', 'zume-training-system' ); ?></p>
                <form method="post" action="">
                    <?php wp_nonce_field( 'zume_repair_join_keys', 'zume_repair_join_keys_nonce' ); ?>
                    <input type="hidden" name="action" value="repair_join_keys" />
                    <p>
                        <button type="submit" class="button button-primary" onclick="return confirm('<?php esc_attr_e( 'Are you sure you want to repair join keys for all plans?', 'zume-training-system' ); ?>');">
                            <?php esc_html_e( 'Repair Join Keys', 'zume-training-system' ); ?>
                        </button>
                    </p>
                </form>
            </div>
        </div>
        <?php
    }

    /**
     * Handle the repair join keys form submission
     */
    public function handle_repair_join_keys() {
        if ( !current_user_can( 'manage_dt' ) ) {
            return;
        }

        if ( !isset( $_POST['action'] ) || $_POST['action'] !== 'repair_join_keys' ) {
            return;
        }

        if ( !isset( $_POST['zume_repair_join_keys_nonce'] ) || !wp_verify_nonce( $_POST['zume_repair_join_keys_nonce'], 'zume_repair_join_keys' ) ) {
            wp_die( 'Security check failed' );
        }

        $result = $this->repair_all_join_keys();

        $redirect_url = add_query_arg(
            [
                'page' => 'zume_maintenance',
                'repair_join_keys' => $result ? 'success' : 'error',
            ],
            admin_url( 'admin.php' )
        );

        wp_safe_redirect( $redirect_url );
        exit;
    }

    /**
     * Repair join keys for all plans that are missing them
     *
     * @return bool True on success, false on failure
     */
    private function repair_all_join_keys() {
        global $wpdb;

        try {
            // Get all plans post type posts
            $plans = $wpdb->get_results( $wpdb->prepare( "
                SELECT p.ID 
                FROM {$wpdb->posts} p 
                WHERE p.post_type = %s 
                AND p.post_status = 'publish'
            ", 'zume_plans' ), ARRAY_A );

            if ( empty( $plans ) ) {
                return true; // No plans to process, consider it successful
            }

            $plans_instance = Zume_Plans_Post_Type::instance();
            $repaired_count = 0;

            foreach ( $plans as $plan ) {
                $post_id = (int) $plan['ID'];

                // Check if join_key exists and is not empty
                $join_key = $wpdb->get_var( $wpdb->prepare( "
                    SELECT meta_value 
                    FROM zume_postmeta 
                    WHERE post_id = %d 
                    AND meta_key = 'join_key'
                    LIMIT 1
                ", $post_id ) );

                // If join_key is missing or empty, generate and add one
                if ( empty( $join_key ) ) {
                    $new_join_key = $plans_instance->generate_join_key();
                    
                    // Check if meta_key already exists (even if empty)
                    $meta_exists = $wpdb->get_var( $wpdb->prepare( "
                        SELECT meta_id 
                        FROM zume_postmeta 
                        WHERE post_id = %d 
                        AND meta_key = 'join_key'
                        LIMIT 1
                    ", $post_id ) );

                    if ( $meta_exists ) {
                        // Update existing meta
                        $wpdb->update(
                            'zume_postmeta',
                            [ 'meta_value' => $new_join_key ],
                            [ 'post_id' => $post_id, 'meta_key' => 'join_key' ],
                            [ '%s' ],
                            [ '%d', '%s' ]
                        );
                    } else {
                        // Insert new meta
                        $wpdb->insert(
                            'zume_postmeta',
                            [
                                'post_id' => $post_id,
                                'meta_key' => 'join_key',
                                'meta_value' => $new_join_key,
                            ],
                            [ '%d', '%s', '%s' ]
                        );
                    }

                    $repaired_count++;
                }
            }

            // Log the repair operation
            dt_write_log( 'Zume Maintenance: Repaired ' . $repaired_count . ' join keys out of ' . count( $plans ) . ' total plans.' );

            return true;

        } catch ( Exception $e ) {
            dt_write_log( 'Zume Maintenance Error: ' . $e->getMessage() );
            return false;
        }
    }
}
Zume_Training_Maintenance_Menu::instance();

