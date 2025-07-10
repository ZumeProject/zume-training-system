<?php

class Zume_Plans_Model {
    private static $post_type = 'zume_plans';
    public static function get_plan( $post_id ) {
        $training_group = DT_Posts::get_post( self::$post_type, (int) $post_id, true, false );

        $completed_sessions = self::get_completed_sessions( $post_id, $training_group );

        $training_group['completed_sessions'] = $completed_sessions;

        $logs = zume_get_user_log( get_current_user_id(), 'system', 'email_notification' );
        $has_emailed_notification = array_search( $post_id, array_column( $logs, 'post_id' ) );
        $log = $logs[$has_emailed_notification];
        $training_group['last_emailed_notification'] = $log['timestamp'];
        $training_group['has_emailed_notification'] = $has_emailed_notification !== false ? true : false;

        /* Include Invite QR url in the training */
        $invite_url = dt_create_site_url() . '/training-group/' . $training_group['join_key'];
        $training_group['qr_url'] = create_qr_url( $invite_url );

        $is_private_group = $training_group['visibility']['key'] === 'private';

        $current_user_id = get_current_user_id();

        foreach ( $training_group['participants'] as $i => $participant ) {
            $participant_user_id = zume_get_user_id_by_contact_id( $participant['ID'] );
            $training_group['participants'][$i]['user_id'] = (int) $participant_user_id;

            $post_id = self::can_user_edit_plan( $training_group['join_key'], $user_id );
            $hide_public_progress = get_post_meta( $participant['ID'], 'hide_public_progress', true );
            $training_group['participants'][$i]['hide_public_progress'] = $hide_public_progress;
            if ( !is_wp_error( $post_id )
                || ( $hide_public_progress !== '1' && $is_private_group )
                || $current_user_id == $participant_user_id
            ) {
                $user_id = zume_get_user_id_by_contact_id( $participant['ID'] );
                $training_group['participants'][$i]['progress'] = zume_get_user_host( $user_id );
            }

            $hide_public_contact = get_post_meta( $participant['ID'], 'hide_public_contact', true );
            $training_group['participants'][$i]['hide_public_contact'] = $hide_public_contact;
            if ( !is_wp_error( $post_id )
                || ( $hide_public_contact !== '1' && $is_private_group )
                || $current_user_id == $participant_user_id
            ) {
                $contact_meta = zume_get_contact_meta( $participant['ID'] );
                $training_group['participants'][$i]['email'] = $contact_meta['user_communications_email'] ?? $contact_meta['user_email'] ?? '';
                $training_group['participants'][$i]['phone'] = $contact_meta['user_phone'] ?? '';
            }
        }

        return $training_group;
    }

    public static function get_public_plans() {
        $result = DT_Posts::list_posts( self::$post_type, [ 'fields' => [ [ 'visibility' => [ 'public' ] ], [ 'status' => [ 'active' ] ] ] ], false );
        if ( is_wp_error( $result ) ) {
            error_log( 'Error in get_public_plans: ' . $result->get_error_message() );
            return [ 'posts' => [] ];
        }

        $posts = [];

        $fields_to_include = [
            'join_key',
            'language_note',
            'location_note',
            'post_title',
            'time_of_day_note',
            'timezone_note',
            'zoom_link_note',
            'set_type',
        ];
        foreach ( $result['posts'] as $plan ) {
            $post = [];
            foreach ( array_keys( $plan ) as $key ) {
                if ( in_array( $key, $fields_to_include ) || str_contains( $key, 'set_a' ) || str_contains( $key, 'set_b' ) || str_contains( $key, 'set_c' ) ) {
                    $post[$key] = $plan[$key];
                }
            }

            $posts[] = $post;
        }

        return $posts;
    }

    public static function create_plan( $title, $user_id, $contact_id, $set_type, $set ) {
        if ( !isset( $title ) || empty( $title ) ) {
            $current_user = get_user_by( 'id', $user_id );
            $plans = zume_get_user_plans( $user_id );

            if ( empty( $plans ) ) {
                $title = sprintf( _x( 'My first training - %s', 'My first training - username', 'zume' ), $current_user->display_name );
            } else {
                $title = sprintf( _x( 'Training %1$d - %2$s', 'Training 2 - username', 'zume' ), count( $plans ) + 1, $current_user->display_name );
            }
        }

        $fields = [
            'title' => $title,
            'assigned_to' => $user_id,
            'set_type' => $set_type,
            'visibility' => 'private',
            'participants' => [
                'values' => [
                    [
                        'value' => $contact_id,
                    ],
                ],
            ],
        ];

        if ( isset( $set ) && is_array( $set ) ) {
            foreach ( $set as $key => $value ) {
                $fields[ $key ] = $value;
            }
        }

        $new_post = DT_Posts::create_post( self::$post_type, $fields, true, false );

        return $new_post;
    }

    public static function update_plan( $post_id, $params ) {

        $fields = [];
        if ( isset( $params['title'] ) ) {
            $fields['title'] = $params['title'];
        }
        if ( isset( $params['visibility'] ) ) {
            $fields['visibility'] = $params['visibility'];
        }
        if ( isset( $params['location_note'] ) ) {
            $fields['location_note'] = $params['location_note'];
        }
        if ( isset( $params['time_of_day_note'] ) ) {
            $fields['time_of_day_note'] = $params['time_of_day_note'];
        }
        if ( isset( $params['language_note'] ) ) {
            $fields['language_note'] = $params['language_note'];
        }
        if ( isset( $params['timezone_note'] ) ) {
            $fields['timezone_note'] = $params['timezone_note'];
        }
        if ( isset( $params['zoom_link_note'] ) ) {
            $fields['zoom_link_note'] = $params['zoom_link_note'];
        }
        if ( isset( $params['visibility'] ) ) {
            $fields['visibility'] = $params['visibility'];
        }
        if ( isset( $params['status'] ) ) {
            $fields['status'] = $params['status'];
        }

        $result = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );

        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return 1;
    }

    public static function delete_plan( $type, $subtype, $user_id ) {
        global $wpdb, $table_prefix;

        $fields = [
            'type' => $type,
            'subtype' => $subtype,
            'user_id' => $user_id,
        ];

        $delete = $wpdb->delete( $table_prefix . 'dt_reports', $fields );

        return $delete;
    }

    public static function can_user_access_plan( $join_key, $user_id ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $post_id = Zume_Connect_Endpoints::test_join_key( $join_key );

        if ( !$post_id ) {
            return new WP_Error( 'bad-plan-code', 'invalid key', array( 'status' => 400 ) );
        }

        $training_group = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to get post.', array( 'status' => 401 ) );
        }

        return $post_id;
    }

    public static function can_user_edit_plan( $join_key, $user_id = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $post_id = Zume_Connect_Endpoints::test_join_key( $join_key );

        if ( !$post_id ) {
            return new WP_Error( 'bad-plan-code', 'invalid key', array( 'status' => 400 ) );
        }

        $training_group = DT_Posts::get_post( 'zume_plans', $post_id );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to access post.', array( 'status' => 401 ) );
        }

        if ( $training_group['assigned_to']['id'] !== "$user_id" && !dt_current_user_has_role( 'dt_admin' ) ) {
            return new WP_Error( 'not-authorized', 'you are not authorised', array( 'status' => 400 ) );
        }

        return $post_id;
    }

    public static function get_completed_sessions( $post_id, $training_group = false ) {
        $completed_sessions = [];

        if ( empty( $training_group ) ) {
            $training_group = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        }
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to get training group.', array( 'status' => 401 ) );
        }

        foreach ( $training_group as $key => $value ) {
            if ( 'set_' === substr( $key, 0, 4 ) && '_completed' === substr( $key, -10, 10 ) ) {
                $completed_sessions[] = str_replace( '_completed', '', $key );
            }
        }
        return $completed_sessions;
    }

    public static function edit_session( $post_id, $key, $value ) {

        /* Check that meta_key is of type set_X_YY, where X = {a,b,c} and YY is numeric and 20 or less */
        $key_parts = explode( '_', $key );
        if ( count( $key_parts ) !== 3 || !in_array( $key_parts[1], [ 'a', 'b', 'c' ] ) || intval( $key_parts[2] ) > 20 ) {
            return new WP_Error( __METHOD__, 'wrong session id format', array( 'status' => 401 ) );
        }

        update_post_meta( $post_id, $key, $value );

        return 1;
    }

    public static function mark_session_complete( $post_id, $session_id ) {
        $completed_sessions = self::get_completed_sessions( $post_id );
        if ( in_array( $session_id, $completed_sessions ) ) {
            return $completed_sessions;
        }

        // build fields
        $completed_key = $session_id . '_completed';
        $fields = [];
        $fields[$completed_key] = time();

        // update plan
        $training_group = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );
        if ( is_wp_error( $training_group ) ) {
            return new WP_Error( __METHOD__, 'Failed to update post.', array( 'status' => 401 ) );
        }

        // return new list
        return self::get_completed_sessions( $post_id );
    }

    public static function get_current_session( $training_id ) {
        $training = DT_Posts::get_post( self::$post_type, $training_id, false, false );
        $set_type = $training['set_type']['key'] ?? '';
        $total = intval( $training['set_type']['label'] ?? 0 );
        $current = 1;

        $completed_sessions = self::get_completed_sessions( $training_id );
        if ( $set_type ) {
            for ( $i = 1; $i <= $total; $i++ ) {
                $session_key = sprintf( '%s_%02d', $set_type, $i );
                if ( !in_array( $session_key, $completed_sessions ) ) {
                    break;
                }
                $current = $i;
            }
        }

        return array(
            'current' => $current,
            'total' => $total,
        );
    }

    // Add this function to get the next session date
    public static function get_next_session_date( $training_id ) {
        $training = DT_Posts::get_post( self::$post_type, $training_id, false, false );
        $set_type = $training['set_type']['key'] ?? '';
        $total = intval( $training['set_type']['label'] ?? 0 );

        $today = time();
        for ( $i = 1; $i <= $total; $i++ ) {
            $session_key = sprintf( '%s_%02d', $set_type, $i );
            if ( isset( $training[$session_key]['timestamp'] ) && $training[$session_key]['timestamp'] > $today ) {
                return gmdate( 'Y-m-d', $training[$session_key]['timestamp'] );
            }
        }
        return '';
    }
}
