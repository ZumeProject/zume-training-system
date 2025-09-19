<?php

class Zume_Plans_Model {
    private static $post_type = 'zume_plans';

    public static function get_plan_by_code( $training_code, $locale = null ) {
        // get the post id from the post meta that has the 'join_key' as $training_code
        global $wpdb;
        $post_id = $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE meta_key = 'join_key' AND meta_value = %s", $training_code ) );
        if ( !$post_id ) {
            return null;
        }
        return self::get_plan( $post_id, $locale );
    }
    public static function get_plan( $training_id, $locale = null ) {
        $training_group = DT_Posts::get_post( self::$post_type, (int) $training_id, true, false );

        if ( empty( $locale ) ) {
            $users_language = zume_get_user_language();
            $users_locale = $users_language['locale'];
        } else {
            $users_locale = $locale;
        }

        $time_formatter = new IntlDateFormatter( $users_locale, IntlDateFormatter::NONE, IntlDateFormatter::SHORT );
        $date_formatter = new IntlDateFormatter( $users_locale, IntlDateFormatter::LONG, IntlDateFormatter::NONE );
        $day_formatter = new IntlDateFormatter(
            $users_locale,
            IntlDateFormatter::NONE,
            IntlDateFormatter::NONE,
            null,
            null,
            'EEEE',
        );

        $completed_sessions = self::get_completed_sessions( $training_id, $training_group );
        $training_group['completed_sessions'] = $completed_sessions;

        $next_session_date = self::get_next_session_date( $training_id );
        $training_group['next_session_date'] = $next_session_date;

        $time_of_day = $training_group['time_of_day'];

        if ( empty( $time_of_day ) ) {
            $next_session_datetime = DateTime::createFromFormat( 'Y-m-d', $next_session_date, new DateTimeZone( 'UTC' ) );
        } else {
            $next_session_datetime = DateTime::createFromFormat( 'Y-m-d H:i', "$next_session_date $time_of_day", new DateTimeZone( 'UTC' ) );
        }
        $training_group['time_of_day_formatted'] = $time_formatter->format( $next_session_datetime );
        $training_group['next_session_date_formatted'] = $date_formatter->format( $next_session_datetime );
        $training_group['day_of_week'] = $day_formatter->format( $next_session_datetime );
        $current_session = self::get_current_session( $training_id );
        $training_group['current_session'] = $current_session['current'];
        $training_group['total_sessions'] = $current_session['total'];

        $session_dates = self::get_session_dates( $training_id );
        $training_group['session_dates'] = $session_dates;

        if ( is_user_logged_in() ) {
            $user_timezone = zume_get_user_profile()['timezone'];
            $training_group['next_session_date_in_user_timezone'] = self::get_next_session_date_in_user_timezone( $training_id, $user_timezone );
        } else {
            $training_group['next_session_date_in_user_timezone'] = '';
        }

        $logs = zume_get_user_log( get_current_user_id(), 'system', 'email_notification' );
        $has_emailed_notification = array_search( $training_id, array_column( $logs, 'post_id' ) );
        
        if ( $has_emailed_notification !== false && isset( $logs[$has_emailed_notification] ) ) {
            $log = $logs[$has_emailed_notification];
            $training_group['last_emailed_notification'] = $log['timestamp'];
            $training_group['has_emailed_notification'] = true;
        } else {
            $training_group['last_emailed_notification'] = '';
            $training_group['has_emailed_notification'] = false;
        }

        /* Include Invite QR url in the training */
        $invite_url = dt_create_site_url() . '/training-group/' . $training_group['join_key'];
        $training_group['qr_url'] = create_qr_url( $invite_url );

        $is_private_group = $training_group['visibility']['key'] === 'private';

        $current_user_id = get_current_user_id();

        foreach ( $training_group['participants'] as $i => $participant ) {
            $participant_user_id = zume_get_user_id_by_contact_id( $participant['ID'] );
            $training_group['participants'][$i]['user_id'] = (int) $participant_user_id;

            $training_id = self::can_user_edit_plan( $training_group['join_key'], $current_user_id );
            $hide_public_progress = get_post_meta( $participant['ID'], 'hide_public_progress', true );
            $training_group['participants'][$i]['hide_public_progress'] = $hide_public_progress;
            if ( $training_id !== false
                || ( $hide_public_progress !== '1' && $is_private_group )
                || $current_user_id == $participant_user_id
            ) {
                $user_id = zume_get_user_id_by_contact_id( $participant['ID'] );
                $training_group['participants'][$i]['progress'] = zume_get_user_host( $user_id );
            }

            $hide_public_contact = get_post_meta( $participant['ID'], 'hide_public_contact', true );
            $training_group['participants'][$i]['hide_public_contact'] = $hide_public_contact;
            if ( $training_id !== false
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

    public static function get_public_plans( $locale = null ) {
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
            'time_of_day',
            'timezone',
            'timezone_note',
            'zoom_link_note',
            'set_type',
        ];

        if ( empty( $locale ) ) {
            $users_language = zume_get_user_language();
            $users_locale = $users_language['locale'];
        } else {
            $users_locale = $locale;
        }
        $time_formatter = new IntlDateFormatter( $users_locale, IntlDateFormatter::NONE, IntlDateFormatter::SHORT );
        $date_formatter = new IntlDateFormatter(
            $users_locale,
            IntlDateFormatter::SHORT,
            IntlDateFormatter::NONE,
            null,
            null,
            "EEE, MMM d, ''yy"
        );
        $day_formatter = new IntlDateFormatter(
            $users_locale,
            IntlDateFormatter::NONE,
            IntlDateFormatter::NONE,
            null,
            null,
            'EEEE',
        );

        foreach ( $result['posts'] as $plan ) {
            $post = [];
            foreach ( array_keys( $plan ) as $key ) {
                if ( in_array( $key, $fields_to_include ) || str_contains( $key, 'set_a' ) || str_contains( $key, 'set_b' ) || str_contains( $key, 'set_c' ) ) {
                    $post[$key] = $plan[$key];
                }
            }
            $next_session_date = self::get_next_session_date( $plan['ID'] );
            $time_of_day = isset( $plan['time_of_day'] ) ? $plan['time_of_day'] : '';
            if ( !empty( $time_of_day ) ) {
                $next_session_datetime = DateTime::createFromFormat( 'Y-m-d H:i', "$next_session_date $time_of_day", new DateTimeZone( 'UTC' ) );
            } else {
                $next_session_datetime = null;
            }
            $post['post_author_display_name'] = get_user_by( 'id', $plan['assigned_to']['id'] )->display_name;
            $post['next_session_date'] = self::get_next_session_date( $plan['ID'] );
            $post['current_session'] = self::get_current_session( $plan['ID'] )['current'];
            $post['total_sessions'] = self::get_current_session( $plan['ID'] )['total'];
            $post['session_dates'] = self::get_session_dates( $plan['ID'] );
            $post['time_of_day_formatted'] = $time_formatter->format( $next_session_datetime );
            $post['next_session_date_formatted'] = $date_formatter->format( $next_session_datetime );
            $post['day_of_week'] = $day_formatter->format( $next_session_datetime );
            if ( is_user_logged_in() ) {
                $user_timezone = zume_get_user_profile()['timezone'];
                $next_session_date_in_user_timezone = self::get_next_session_date_in_user_timezone( $plan['ID'], $user_timezone );
                $post['next_session_date_in_user_timezone'] = $next_session_date_in_user_timezone;
            } else {
                $post['next_session_date_in_user_timezone'] = '';
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
        if ( isset( $params['time_of_day'] ) ) {
            $fields['time_of_day'] = $params['time_of_day'];
        }
        if ( isset( $params['language_note'] ) ) {
            $fields['language_note'] = $params['language_note'];
        }
        if ( isset( $params['timezone_note'] ) ) {
            $fields['timezone_note'] = $params['timezone_note'];
        }
        if ( isset( $params['timezone'] ) ) {
            $fields['timezone'] = $params['timezone'];
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
    public static function leave_plan( $code, $user_id ) {
        $post_id = Zume_Connect_Endpoints::test_join_key( $code );
        if ( !$post_id ) {
            return new WP_Error( 'bad-plan-code', 'invalid key', array( 'status' => 400 ) );
        }

        $contact_id = zume_get_user_contact_id( $user_id );

        $updates = [
            'participants' => [
                'values' => [
                    [
                        'value' => $contact_id,
                        'delete' => true,
                    ],
                ],
            ],
        ];
        $result = DT_Posts::update_post( self::$post_type, $post_id, $updates, true, false );
        if ( is_wp_error( $result ) ) {
            return $result;
        }

        return $post_id;
    }

    public static function delete_plan( $user_id, $post_id ) {
        global $wpdb, $table_prefix;

        $update = self::update_plan( $post_id, [ 'status' => 'inactive' ] );
        if ( is_wp_error( $update ) ) {
            return $update;
        }

        $fields = [
            'type' => 'system',
            'subtype' => 'plan_created',
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
            return false;
        }

        $training_group = DT_Posts::get_post( self::$post_type, $post_id, true, false );
        if ( is_wp_error( $training_group ) ) {
            return false;
        }

        return $post_id;
    }

    public static function can_user_edit_plan( $join_key, $user_id = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $post_id = Zume_Connect_Endpoints::test_join_key( $join_key );

        if ( !$post_id ) {
            return false;
        }

        $training_group = DT_Posts::get_post( 'zume_plans', $post_id, true, false );
        if ( is_wp_error( $training_group ) ) {
            return false;
        }

        if ( $training_group['assigned_to']['id'] !== "$user_id" && !dt_current_user_has_role( 'dt_admin' ) ) {
            return false;
        }

        return $post_id;
    }

    public static function get_completed_sessions( $post_id, $training_group = false ) {
        $completed_sessions = [];

        if ( empty( $training_group ) ) {
            $training_group = DT_Posts::get_post( self::$post_type, $post_id, false, false );
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

    public static function mark_session_complete( $post_id, $session_id, $completed = true ) {
        $completed_sessions = self::get_completed_sessions( $post_id );
        if ( in_array( $session_id, $completed_sessions ) && $completed === true ) {
            return $completed_sessions;
        }

        // build fields
        $completed_key = $session_id . '_completed';
        $fields = [];
        $fields[$completed_key] = $completed ? time() : null;

        if ( $completed === false ) {
            delete_post_meta( $post_id, $completed_key );
        } else {
            // update plan
            $training_group = DT_Posts::update_post( self::$post_type, (int) $post_id, $fields, true, false );
            if ( is_wp_error( $training_group ) ) {
                return new WP_Error( __METHOD__, 'Failed to update post.', array( 'status' => 401 ) );
            }
        }

        // return new list
        return self::get_completed_sessions( $post_id );
    }

    public static function get_current_session( $training_id ) {
        $training = DT_Posts::get_post( self::$post_type, $training_id, false, false );
        $set_type = $training['set_type']['key'] ?? '';
        $total = self::get_total_sessions( $set_type );
        $current = 1;

        $completed_sessions = self::get_completed_sessions( $training_id );
        if ( $set_type ) {
            for ( $i = 1; $i <= $total; $i++ ) {
                // if the session is not completed or the session time exists and is in the future then this is the current session
                $session_key = sprintf( '%s_%02d', $set_type, $i );
                $session_timestamp = $training[$session_key]['timestamp'] ?? '';
                $is_session_completed = in_array( $session_key, $completed_sessions );
                if ( $is_session_completed || ( !empty( $session_timestamp ) && $session_timestamp < time() ) ) {
                    $current = $i;
                    continue;
                }
                if ( !empty( $session_timestamp ) && $session_timestamp > time() ) {
                    $current = $i;
                    break;
                }
                if ( empty( $session_timestamp ) && !$is_session_completed ) {
                    $current = $i;
                    break;
                }
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
        $total = self::get_total_sessions( $set_type );

        $today = time();
        for ( $i = 1; $i <= $total; $i++ ) {
            $session_key = sprintf( '%s_%02d', $set_type, $i );
            if ( isset( $training[$session_key]['timestamp'] ) && $training[$session_key]['timestamp'] > $today ) {
                return gmdate( 'Y-m-d', $training[$session_key]['timestamp'] );
            }
        }
        return '';
    }

    public static function get_next_session_date_in_user_timezone( $training_id, $user_timezone ) {
        $next_session_date = self::get_next_session_date( $training_id );
        $training = DT_Posts::get_post( self::$post_type, $training_id, false, false );
        $time_of_day = isset( $training['time_of_day'] ) ? $training['time_of_day'] : '';
        $timezone = isset( $training['timezone'] ) ? $training['timezone'] : '';
        if ( empty( $time_of_day ) || empty( $timezone ) || empty( $next_session_date ) ) {
            return '';
        }

        $users_language = zume_get_user_language();
        $users_locale = $users_language['locale'];
        $formatter = new IntlDateFormatter( $users_locale, IntlDateFormatter::LONG, IntlDateFormatter::SHORT );

        $next_session_datetime = DateTime::createFromFormat( 'Y-m-d H:i', "$next_session_date $time_of_day", new DateTimeZone( $timezone ) );
        $formatter->setTimeZone( new DateTimeZone( $user_timezone ) );
        $next_session_datetime_in_user_timezone = $formatter->format( $next_session_datetime );
        return $next_session_datetime_in_user_timezone;
    }

    // Get a list of dates of the sessions in the training
    public static function get_session_dates( $training_id ) {
        $training = DT_Posts::get_post( self::$post_type, $training_id, false, false );
        $set_type = $training['set_type']['key'] ?? '';

        $total = self::get_total_sessions( $set_type );

        $dates = [];
        for ( $i = 1; $i <= $total; $i++ ) {
            $session_key = sprintf( '%s_%02d', $set_type, $i );
            $dates[] = [
                'date' => gmdate( 'Y-m-d', $training[$session_key]['timestamp'] ),
                'session' => $i,
            ];
        }
        return $dates;
    }

    public static function get_total_sessions( $set_type ) {
        if ( $set_type === 'set_c' ) {
            return 5;
        } elseif ( $set_type === 'set_b' ) {
            return 20;
        } else {
            return 10;
        }
    }
}
