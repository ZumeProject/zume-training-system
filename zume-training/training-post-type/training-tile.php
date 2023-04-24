<?php

if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

add_filter( 'dt_post_type_modules', function( $modules ){
    $modules["trainings_zume"] = [
        "name" => "Trainings - Zume Tile",
        "enabled" => true,
        "locked" => true,
        "prerequisites" => [ "trainings_base", "contacts_base" ],
        "post_type" => "trainings",
        "description" => "Zume Tile Extension for Trainings"
    ];
    return $modules;
}, 40, 1 );

if ( ! function_exists( 'zume_get_user_meta' ) ) {
    function zume_get_user_meta( $user_id = null ) {
        if ( ! is_user_logged_in() ) {
            return [];
        }
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        return array_map( function ( $a ) { return maybe_unserialize( $a[0] );
        }, get_user_meta( $user_id ) );
    }
}

if ( ! function_exists( 'get_meta' ) ) {
    function get_meta( $post_id ) : array {
        return array_map( function ( $a ) { return maybe_unserialize( $a[0] );
        }, get_post_meta( $post_id ) );
    }
}

class Zume_Training_Extension_Hook extends DT_Module_Base {
    private static $_instance = null;
    public $post_type = "trainings";
    public $module = "trainings_zume";

    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    } // End instance()

    public function __construct() {
        parent::__construct();
        if ( !self::check_enabled_and_prerequisites() ){
            return;
        }

        add_filter( 'dt_custom_fields_settings', [ $this, 'dt_custom_fields_settings' ], 999, 2 );
        add_filter( 'dt_details_additional_tiles', [ $this, 'dt_details_additional_tiles' ], 10, 2 );
        add_action( 'dt_details_additional_section', [ $this, 'dt_details_additional_section' ], 20, 2 );
        add_filter( "dt_user_list_filters", [ $this, "dt_user_list_filters" ], 10, 2 );
    }

    public function dt_custom_fields_settings( $fields, $post_type ) {
        if ( 'trainings' === $post_type ) {
            $fields['zume_public_key'] = [
                'name' => "Zúme Public Key",
                'type' => 'text',
                'default' => '',
                'tile' => 'zume_training_details',
                'show_in_table' => false,
            ];
            $fields['zume_group_id'] = [
                'name' => "Group ID",
                'type' => 'text',
                'default' => '',
                'show_in_table' => false,
                'hidden' => true
            ];

            $fields["zume_sessions"] = [
                'name' => __( 'Completed', 'disciple-tools' ),
                'description' => __( "The Zúme Sessions completed.", 'disciple_tools' ),
                'type' => 'multi_select',
                'default' => [
                    'session_1' => [
                        'label' => __( 'Session 1', 'disciple_tools' ),
                        'description' => _x( 'Session 1.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/coach.svg?v=2'
                    ],
                    'session_2' => [
                        'label' => __( 'Session 2', 'disciple_tools' ),
                        'description' => _x( 'Session 2.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_3' => [
                        'label' => __( 'Session 3', 'disciple_tools' ),
                        'description' => _x( 'Session 3.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_4' => [
                        'label' => __( 'Session 4', 'disciple_tools' ),
                        'description' => _x( 'Session 4.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_5' => [
                        'label' => __( 'Session 5', 'disciple_tools' ),
                        'description' => _x( 'Session 5.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_6' => [
                        'label' => __( 'Session 6', 'disciple_tools' ),
                        'description' => _x( 'Session 6.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_7' => [
                        'label' => __( 'Session 7', 'disciple_tools' ),
                        'description' => _x( 'Session 7.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_8' => [
                        'label' => __( 'Session 8', 'disciple_tools' ),
                        'description' => _x( 'Session 8.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_9' => [
                        'label' => __( 'Session 9', 'disciple_tools' ),
                        'description' => _x( 'Session 9.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                    'session_10' => [
                        'label' => __( 'Session 10', 'disciple_tools' ),
                        'description' => _x( 'Session 10.', 'field description', 'disciple_tools' ),
                        "icon" => get_template_directory_uri() . '/dt-assets/images/group-peer.svg?v=2'
                    ],
                ],
                "tile" => "zume_sessions",
                "in_create_form" => true,
                'icon' => get_template_directory_uri() . "/dt-assets/images/sign-post.svg?v=2",
            ];
        }
        return $fields;
    }

    public function dt_details_additional_tiles( $tiles, $post_type = "" ){
        if ( $post_type === "trainings" ){
            $tiles["zume_training_details"] = [ "label" => __( "Zume.Training Course", 'disciple_tools' ) ];
            $tiles["zume_sessions"] = [ "label" => __( "Sessions", 'disciple_tools' ) ];
        }
        return $tiles;
    }

    public function dt_details_additional_section( $section, $post_type ) {

        if ( 'trainings' === $post_type && 'zume_training_details' === $section ) :

            global $post;
            $post_meta = get_meta( $post->ID );

            // if no public key or group id
            if ( empty( $post_meta['zume_public_key'] ) && empty( $post_meta['zume_group_id'] ) ) {
                $this->display_public_key_for_linking();
            }
            // if public key but no group id
            else if ( ! empty( $post_meta['zume_public_key'] ) && empty( $post_meta['zume_group_id'] ) ) {
                // get group id and add it
                $zume_group_id = $this->get_group_id_by_public_key( $post_meta['zume_public_key'] );
                if ( $zume_group_id ) {
                    update_post_meta( $post->ID, 'zume_group_id', $zume_group_id );
                    $this->display_zume_group( $zume_group_id );
                } else {
                    $this->display_public_key_for_linking();
                }
            }
            // if group id
            else if ( empty( $post_meta['zume_public_key'] ) && ! empty( $post_meta['zume_group_id'] ) ) {
                // then query by group id
                $post_type = get_post_type();
                $dt_post = DT_Posts::get_post( $post_type, get_the_ID() );
                $record = $this->get_zume_group( $post_meta['zume_group_id'], $dt_post );

                update_post_meta( $post->ID, 'zume_public_key', $record['public_key'] );

                $this->display_zume_group( $post_meta['zume_group_id'] );
            }
            else if ( ! empty( $post_meta['zume_public_key'] ) && ! empty( $post_meta['zume_group_id'] ) ) {
                $this->display_zume_group( $post_meta['zume_group_id'] );
            }

        endif; // End test if section zume_training

    }

    public function dt_user_list_filters( $filters, $post_type ){
        if ( $post_type === $this->post_type ){

            $fields = DT_Posts::get_post_field_settings( $post_type );
            if ( isset( $fields["zume_sessions"] ) ) {
                if ( current_user_can( 'dt_all_admin_' . $this->post_type ) ){
                    $counts = self::get_all_status_types();
                    $status_counts = [];
                    $total_all = 0;
                    foreach ( $counts as $count ){
                        $total_all += $count["count"];
                        dt_increment( $status_counts[$count["status"]], $count["count"] );
                    }
                    $filters["tabs"][] = [
                        "key" => "zume_sessions",
                        "label" => __( "Zúme Sessions", 'disciple-tools' ),
                        "order" => 20
                    ];
                    foreach ( $fields["zume_sessions"]["default"] as $status_key => $status_value ) {
                        if ( isset( $status_counts[$status_key] ) ){
                            $filters["filters"][] = [
                                "ID" => 'all_' . $status_key,
                                "tab" => 'zume_sessions',
                                "name" => $status_value["label"],
                                "query" => [
                                    'zume_sessions' => [ $status_key ],
                                    'sort' => '-post_date'
                                ],
                                "count" => $status_counts[$status_key]
                            ];
                        }
                    }
                }
                else {
                    $counts = self::get_my_status();
                    /**
                     * Setup my filters
                     */
                    $active_counts = [];
                    $status_counts = [];
                    $total_my = 0;
                    foreach ( $counts as $count ){
                        $total_my += $count["count"];
                        dt_increment( $status_counts[$count["status"]], $count["count"] );
                        if ( $count["status"] === "active" ){
                            dt_increment( $active_counts[$count["status"]], $count["count"] );
                        }
                    }

                    $filters["tabs"][] = [
                        "key" => "assigned_to_me",
                        "label" => __( "Zúme Sessions", 'disciple-tools' ),
                        "order" => 20
                    ];
                    foreach ( $fields["zume_sessions"]["default"] as $status_key => $status_value ) {
                        if ( isset( $status_counts[$status_key] ) ){
                            $filters["filters"][] = [
                                "ID" => 'my_' . $status_key,
                                "tab" => 'assigned_to_me',
                                "name" => $status_value["label"],
                                "query" => [
                                    'assigned_to' => [ 'me' ],
                                    'zume_sessions' => [ $status_key ],
                                    'sort' => '-post_date'
                                ],
                                "count" => $status_counts[$status_key]
                            ];
                        }
                    }
                } // if has permissions
            } // if leadership_milestones exists
        }
        return $filters;
    }


    public function get_my_status(){
        /**
         * @todo adjust query to return count for update needed
         */
        global $wpdb;
        $post_type = $this->post_type;
        $current_user = get_current_user_id();

        $results = $wpdb->get_results( $wpdb->prepare( "
            SELECT pm.meta_value as status, count(pm.post_id) as count
             FROM $wpdb->postmeta pm
            INNER JOIN $wpdb->posts a ON ( a.ID = pm.post_id AND a.post_type = %s and a.post_status = 'publish' )
            INNER JOIN $wpdb->postmeta as assigned_to ON pm.post_id=assigned_to.post_id
                          AND assigned_to.meta_key = 'assigned_to'
                          AND assigned_to.meta_value = CONCAT( 'user-', %s )
            WHERE pm.meta_key = 'zume_sessions'
            GROUP BY pm.meta_value
        ", $post_type, $current_user ), ARRAY_A);

//        dt_write_log(__METHOD__);
//        dt_write_log($results);

        return $results;
    }

    //list page filters function
    public function get_all_status_types(){
        /**
         * @todo adjust query to return count for update needed
         */
        global $wpdb;
        if ( current_user_can( 'dt_all_admin_'.$this->post_type ) ){
            $results = $wpdb->get_results($wpdb->prepare( "
                SELECT pm.meta_value as status, count(pm.post_id) as count
                 FROM $wpdb->postmeta pm
                INNER JOIN $wpdb->posts a ON ( a.ID = pm.post_id AND a.post_type = %s and a.post_status = 'publish' )
                WHERE pm.meta_key = 'zume_sessions'
                GROUP BY pm.meta_value
            ", $this->post_type  ), ARRAY_A );
        } else {
            $results = $wpdb->get_results($wpdb->prepare("
                SELECT status.meta_value as status, count(pm.post_id) as count
                FROM $wpdb->postmeta pm
                INNER JOIN $wpdb->postmeta status ON( status.post_id = pm.post_id AND status.meta_key = 'zume_sessions' )
                INNER JOIN $wpdb->posts a ON( a.ID = pm.post_id AND a.post_type = %s and a.post_status = 'publish' )
                LEFT JOIN $wpdb->dt_share AS shares ON ( shares.post_id = a.ID AND shares.user_id = %s )
                LEFT JOIN $wpdb->postmeta assigned_to ON ( assigned_to.post_id = pm.post_id AND assigned_to.meta_key = 'assigned_to' && assigned_to.meta_value = %s )
                WHERE ( shares.user_id IS NOT NULL OR assigned_to.meta_value IS NOT NULL )
                GROUP BY status.meta_value, pm.meta_value
            ", $this->post_type, get_current_user_id(), 'user-' . get_current_user_id() ), ARRAY_A);
        }
//        dt_write_log(__METHOD__);
//        dt_write_log($results);

        return $results;
    }

    public function display_zume_group( $zume_group_id ) {
            $post_type = get_post_type();
            $dt_post = DT_Posts::get_post( $post_type, get_the_ID() );
            $record = $this->get_zume_group( $zume_group_id, $dt_post );
            if ( ! $record ) :
                $this->display_public_key_for_linking();
            else: // if zume key matches
                ?>
                <style>
                    #zume-tabs li a { padding: 1rem 1rem; }
                    .date-text {
                        font-size:.8em;
                    }
                </style>

                <ul class="tabs" data-tabs id="zume-tabs">
                    <li class="tabs-title is-active"><a href="#sessions" aria-selected="true"><i class="fi-results"></i></a></li>
                    <li class="tabs-title"><a href="#info" data-tabs-target="info"><i class="fi-info"></i></a></li>
                    <li class="tabs-title"><a href="#owner" data-tabs-target="owner"><i class="fi-torso"></i></a></li>
                    <li class="tabs-title"><a href="#members" data-tabs-target="members"><i class="fi-torsos-all"></i></a></li>
                    <?php if ( user_can( get_current_user_id(), 'manage_dt' ) ) : ?>
                        <li class="tabs-title"><a data-tabs-target="raw" href="#raw"><i class="fi-database"></i></a></li>
                    <?php endif; ?>
                </ul>

                <div class="tabs-content" data-tabs-content="zume-tabs">
                    <!-- Sessions Tab -->
                    <div class="tabs-panel is-active" id="sessions">
                        <?php
                        if ( $record ) { ?>

                            <!-- sessions -->
                            <button class="button <?php echo esc_html( $record['session_1'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 1' ) ?></strong>
                                <?php echo $record['session_1_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_1_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_2'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 2' ) ?></strong>
                                <?php echo $record['session_2_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_2_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_3'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 3' ) ?></strong>
                                <?php echo $record['session_3_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_3_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_4'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 4' ) ?></strong>
                                <?php echo $record['session_4_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_4_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_5'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 5' ) ?></strong>
                                <?php echo $record['session_5_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_5_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_6'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 6' ) ?></strong>
                                <?php echo $record['session_6_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_6_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_7'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 7' ) ?></strong>
                                <?php echo $record['session_7_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_7_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_8'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 8' ) ?></strong>
                                <?php echo $record['session_8_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_8_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_9'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 9' ) ?></strong>
                                <?php echo $record['session_9_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_9_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>
                            <button class="button <?php echo esc_html( $record['session_10'] ? 'success' : 'hollow' ) ?> expanded" type="button">
                                <strong><?php echo esc_html( 'Session 10' ) ?></strong>
                                <?php echo $record['session_10_complete'] ? '<br><span class="date-text">' . esc_html( date( 'M j, Y', strtotime( $record['session_10_complete'] ) ) ) . '</span>' : ''  ?>
                            </button>

                        <?php } // endif ?>
                    </div>

                    <!-- Info box -->
                    <div class="tabs-panel" id="info" style="min-height: 500px; vertical-align: top;">

                        <dl>
                            <dt>
                                TRAINING DETAILS<hr>
                            </dt>

                            <?php if ( isset( $record['members'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Claimed Participants' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo empty( $record['members'] ) ? '0' : esc_attr( $record['members'] ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['coleaders'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Participants with Emails in Group' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo empty( $record['coleaders'] ) ? '0' : count( $record['coleaders'] ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['coleaders_accepted'] ) && ! empty( $record['coleaders_accepted'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Participants Invitations Accepted' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo esc_attr( is_array( $record['coleaders_accepted'] ) ? count( $record['coleaders_accepted'] ) : '' ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['meeting_time'] ) && ! empty( $record['meeting_time'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Meeting Time' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo esc_attr( $record['meeting_time'] ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['created_date'] ) && ! empty( $record['created_date'] ) ) :
                                if ( is_numeric( $record['created_date'] ) ) {
                                    $mdy = date('m/d/Y', $record['created_date'] );
                                } else {
                                    $mdy = date('m/d/Y', strtotime( $record['created_date'] ) );
                                }
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Group Start Date' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo esc_attr( $mdy ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['last_modified_date'] ) && ! empty( $record['last_modified_date'] ) ) :
                                if ( is_numeric( $record['last_modified_date'] ) ) {
                                     $mdy = date('m/d/Y', $record['last_modified_date'] );
                                } else {
                                    $mdy = date('m/d/Y', strtotime( $record['last_modified_date'] ) );
                                }
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Last Active' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo esc_attr( $mdy ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['closed'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'Status' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo esc_attr( empty( $record['closed'] ) ? __( 'Open' ) : __( 'Closed' ) ) ?>
                                </dd>
                            <?php endif; ?>

                            <?php if ( isset( $record['ip_location_grid_meta']['label'] ) ) :
                                ?>
                                <dt>
                                    <?php esc_html_e( 'IP Address Location' ) ?>:
                                </dt>
                                <dd>
                                    <?php echo empty( $record['ip_location_grid_meta']['label'] ) ? '' : esc_html( $record['ip_location_grid_meta']['label'] ) ?>
                                </dd>
                            <?php endif; ?>

                        </dl>

                    </div>

                    <!-- Owner Tab-->
                    <div class="tabs-panel" id="owner" style="min-height: 500px;vertical-align: top;">

                        <dl>
                            <dt>OWNER DETAILS<hr></dt>

                            <?php
                            if ( ! empty( $record['owner'] ) ) :
                            $user = get_user_by( 'ID', $record['owner'] );
                            $usermeta = zume_get_user_meta( $record['owner'] );
                            ?>

                            <dt>Owner</dt>
                            <dd>
                                <?php echo esc_html( $user->data->display_name ) ?><br>
                                <?php echo esc_html( $user->data->user_email ) ?>
                                <br>
                            </dd>

                            <dt>Owner's Other Groups</dt>
                            <?php
                            foreach( $usermeta as $key => $value ) {
                                if ( substr( $key, 0, 10 ) === 'zume_group' && $key !== $record['key'] ) {
                                    ?>
                                    <dd>
                                        <?php echo esc_html( $value['group_name'] ) ?>
                                    </dd>
                                    <?php
                                }
                            }
                            ?>

                            <?php if ( isset( $usermeta['zume_foreign_key'] ) && user_can( get_current_user_id(), 'manage_dt' ) ) : ?>
                                <dt class="cell"><strong>Owner Key</strong></dt>
                                <dd><input type="text" value="<?php echo esc_attr( $usermeta['zume_foreign_key'] ) ?>" /></dd>
                            <?php endif; ?>

                            <?php endif; // end if owner record ?>
                        </dl>

                    </div> <!-- end tab -->


                    <!-- Members Tab-->
                    <div class="tabs-panel" id="members" style="min-height: 500px;vertical-align: top;">
                        <dl style="width:100%;height: 500px;overflow-y: scroll;overflow-x:hidden;">
                            <dt><strong>MEMBERS DETAILS<hr></strong></dt>
                            <?php if ( ! empty( $record['coleaders'] ) ) { ?>
                                <?php foreach ( $record['coleaders'] as $coleader ) : ?>
                                    <dd><?php echo esc_html( $coleader ) ?></dd>
                                <?php endforeach; ?>
                           <?php } ?>
                        </dl>
                    </div>


                    <!-- Raw Tab-->
                    <?php if ( user_can( get_current_user_id(), 'manage_dt' ) ) : ?>
                        <div class="tabs-panel" id="raw" >
                            <div style="width:100%;height: 500px;overflow-y: scroll;overflow-x:hidden;">
                                <?php
                                if ( $record ) {
                                    foreach ( $record as $key => $value ) {
                                        echo '<strong>' . esc_attr( $key ) . ': </strong>' . esc_attr( maybe_serialize( $value ) ) . '<br>';
                                    }
                                }
                                ?>
                            </div>
                        </div>
                    <?php endif;  // end Raw Tab ?>
                </div>
            <div class="center"><button class="button clear small" id="unlink-zume-group">unlink</button></div>

            <?php endif; // end has group id
    }

    public function get_zume_group( $zume_group_id, $dt_post ) {
        global $wpdb;
        $raw_results = $wpdb->get_var( $wpdb->prepare( "SELECT meta_value FROM $wpdb->usermeta WHERE meta_key = %s LIMIT 1", $zume_group_id ) );
        if ( $raw_results ) {
            $results = maybe_unserialize( $raw_results );

            if ( $dt_post['title'] === '' /* test if it has a title */) {
                $my_post = array(
                    'ID'           => $dt_post['ID'],
                    'post_title'   => $results['group_name'],
                );
                wp_update_post( $my_post );
            }
//            if ( ! ( isset( $dt_post['start_date']['timestamp'] ) && ( date( "Y-m-d", strtotime( $dt_post['start_date']['timestamp'] ) ) === date( "Y-m-d", strtotime( $results['created_date'] ) ) ) ) /* test if title start date is same */) {
//                update_post_meta( $dt_post['ID'], 'start_date', strtotime( $results['created_date'] ) );
//            }
            if ( ! ( isset( $dt_post['member_count'] ) && $dt_post['member_count'] === $results['members'] )  /* test if number of members same */) {
                update_post_meta( $dt_post['ID'], 'member_count', $results['members'] );
            }
            if ( ! ( isset( $dt_post['leader_count'] ) && $dt_post['leader_count'] < 1 ) /* test if leader has at least the count of one */) {
                update_post_meta( $dt_post['ID'], 'leader_count', 1 );
            }
            if ( get_current_user_id() === $results['owner'] && ( ! isset( $dt_post['assigned_to'] ) || empty( $dt_post['assigned_to'] ) ) ) {
                update_post_meta( $dt_post['ID'], 'assigned_to', 'user-'.$results['owner'] );
            }


            if ( isset( $results['location_grid_meta'] ) && ! empty( $results['location_grid_meta'] ) ) { // does the ztraining have a location set

                // hash z lgm
                $new_hash = hash( 'sha256', maybe_serialize( $results['location_grid_meta'] ) );

                // check for 'zume_location_meta_grid' hash
                $zume_location_grid_meta = null;
                if ( isset( $dt_post['zume_location_grid_meta'] ) && isset( $dt_post['location_grid_meta'] ) ) {
                    $zume_location_grid_meta = $dt_post['zume_location_grid_meta'];
                }

                // compare hashes
                if ( $new_hash !== $zume_location_grid_meta && ! empty( $results['location_grid_meta']['lng'] ) ) {

                    if ( $zume_location_grid_meta !== null && isset( $dt_post['location_grid_meta'] ) ) { // remove previous address and replace with current address
                        Location_Grid_Meta::add_location_grid_meta( $dt_post['ID'], $dt_post['location_grid_meta'] );
                        delete_post_meta( $dt_post['ID'], 'zume_location_grid_meta' );
                    }

                    $fields = [
                        'location_grid_meta' => [
                            'values' => [
                                [
                                    'lng' => $results['location_grid_meta']['lng'],
                                    'lat' => $results['location_grid_meta']['lat'],
                                    'level' => $results['location_grid_meta']['level'] ?? 'place',
                                    'source' => $results['location_grid_meta']['source'] ?? 'user',
                                    'label' => $results['location_grid_meta']['label'] ?? ''
                                ]
                            ]
                        ]
                    ];

                    DT_Posts::update_post( 'trainings', $dt_post['ID'], $fields, false, false );

                    add_post_meta( $dt_post['ID'], 'zume_location_grid_meta', $new_hash );
                }

            }
            return $results;
        } else {
            return false;
        }
    }

    public function get_group_id_by_public_key( $zume_public_key ) {
        global $wpdb;
        return $wpdb->get_var( $wpdb->prepare( "SELECT meta_key FROM $wpdb->usermeta WHERE meta_value LIKE %s AND meta_key LIKE %s LIMIT 1", '%' . $wpdb->esc_like( $zume_public_key ) . '%', $wpdb->esc_like('zume_group' ) . '%' ) );
    }

    public function display_public_key_for_linking() {
        global $post;
        $post_type = get_post_type();
        $post_settings = DT_Posts::get_post_field_settings( $post_type );
        $dt_post = DT_Posts::get_post( $post_type, get_the_ID() );
        ?>

        <?php if ( get_post_meta( $post->ID, 'zume_public_key', true ) ) : ?>
            <p>This current key was not found in connection to a Zúme Training group. Check again.</p>
        <?php endif; ?>

<!--        --><?php //render_field_for_display( "zume_public_key", $post_settings, $dt_post ); ?>

        <script>
            jQuery(document).ready(function(){
                jQuery( document ).on( 'text-input-updated', function (e, newObject, id, val){
                    console.log(id)
                    if ( id === 'zume_public_key' ) {
                        location.reload()
                    }
                })
            })
        </script>
        <?php
    }

}
Zume_Training_Extension_Hook::instance();
