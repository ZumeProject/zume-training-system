<?php
/**
 * These are global functions that are used throughout the system, and used in the coaching system. There is a copy of this file in the coaching system.
 * If changes are made here, they need copied to the coaching plugin.
 * All sql queries should not use variable table names, but should be fully qualified.
 */


if ( ! function_exists( 'zume_get_user_profile' ) ) {
    function zume_get_user_profile( $user_id = null ) {
        global $wpdb;

        // return global object if already set and request is for current user
        if ( isset( $zume_user_profile ) && $zume_user_profile['user_id'] == $user_id ) {
            return $zume_user_profile;
        }

        // establish user_id
        $current_user_id = get_current_user_id();
        if ( is_null( $user_id ) ) {
            $user_id = $current_user_id;
        }

        // validate user_id exists
        if ( $user_id !== $current_user_id ) {
            $user_row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM zume_users WHERE ID = %d', $user_id ) );
            if ( empty( $user_row ) ) {
                return false;
            }
        }

        // get contact_id and validate exists
        $contact_id = zume_get_user_contact_id( $user_id );
        if ( empty( $contact_id ) ) {
            return false;
        }

        // build contact meta array
        $contact_meta_query = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM zume_postmeta WHERE post_id = %d', $contact_id ), ARRAY_A );
        $contact_meta = [];
        foreach ( $contact_meta_query as $value ) {
            $contact_meta[$value['meta_key']] = $value['meta_value'];
        }

        // build user profile elements
        $name = $wpdb->get_var( $wpdb->prepare( 'SELECT post_title FROM zume_posts WHERE ID = %d', $contact_id ) );
        $has_set_name = !empty( zume_get_user_log( $user_id, 'system', 'set_profile_name' ) );
        $email = $contact_meta['user_email'] ?? '';
        $communications_email = $contact_meta['user_communications_email'] ?? '';
        $phone = $contact_meta['user_phone'] ?? '';
        $timezone = $contact_meta['user_timezone'] ?? '';
        $user_friend_key = $contact_meta['user_friend_key'] ?? '';
        $user_preferred_language = $contact_meta['user_preferred_language'] ?? '';
        $language = zume_get_user_language( $user_id );
        $location = zume_get_user_location( $user_id );
        $contact_preference = get_post_meta( $contact_id, 'user_contact_preference' );

        // add SSO identities
        $identities = get_user_meta( $user_id, 'firebase_identities', true );
        $sign_in_providers = get_user_meta( $user_id, 'sign_in_providers', true );

        // get coaching connections
        $coaches = [];
        $coaching_contact_id = $wpdb->get_var(
            $wpdb->prepare(
                "SELECT post_id
                    FROM zume_3_postmeta
                    WHERE meta_key = 'trainee_user_id'
                        AND meta_value = %s",
            $user_id )
        );

        $coach_list = [];
        if ( $coaching_contact_id ) {
            $coach_list = $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT p.ID as contact_id, pm.meta_value as user_id, p.post_title as name
                    FROM zume_3_p2p p2
                    LEFT JOIN zume_3_posts p ON p2.p2p_to=p.ID
                    LEFT JOIN zume_3_postmeta pm ON pm.post_id = p.ID AND pm.meta_key = 'corresponds_to_user'
                    WHERE p2p_from = %d
                        AND p2p_type = 'contacts_to_contacts'",
                $coaching_contact_id ), ARRAY_A
            );
        }

        if ( ! empty( $coach_list ) ) {
            foreach ( $coach_list as $key => $value ) {
                $communication_apps = $wpdb->get_results( $wpdb->prepare(
                    "SELECT pm.meta_value
                    FROM zume_3_postmeta pm
                    WHERE pm.meta_key = 'communication_preferences'
                        AND pm.post_id = %d", $value['contact_id']
                ), ARRAY_N );
                $communication_apps = array_map( function ( $app ) {
                    return $app[0];
                }, $communication_apps );
                $phone_number = get_user_meta( $value['user_id'], 'dt_user_work_phone', true );
                $email_address = get_user_meta( $value['user_id'], 'dt_user_work_email', true );
                $facebook = get_user_meta( $value['user_id'], 'dt_user_work_facebook', true );
                $whatsapp = get_user_meta( $value['user_id'], 'dt_user_work_whatsapp', true );
                $whatsapp = !empty( $whatsapp ) ? $whatsapp : $phone_number;
                $signal = $phone_number;
                $telegram = $phone_number;

                $coaches[$value['user_id']] = [];
                $coaches[$value['user_id']]['contact_id'] = $value['contact_id'];
                $coaches[$value['user_id']]['user_id'] = $value['user_id'];
                $coaches[$value['user_id']]['name'] = $value['name'];
                $coaches[$value['user_id']]['phone'] = in_array( 'phone', $communication_apps ) ? $phone_number : '';
                $coaches[$value['user_id']]['email'] = in_array( 'email', $communication_apps ) ? $email_address : '';
                $coaches[$value['user_id']]['messenger'] = in_array( 'messenger', $communication_apps ) ? $facebook : '';
                $coaches[$value['user_id']]['whatsapp'] = in_array( 'whatsapp', $communication_apps ) ? $whatsapp : '';
                $coaches[$value['user_id']]['signal'] = in_array( 'signal', $communication_apps ) ? $signal : '';
                $coaches[$value['user_id']]['telegram'] = in_array( 'telegram', $communication_apps ) ? $telegram : '';
                $coaches[$value['user_id']]['communication_apps'] = $communication_apps;
            }
        }

        if ( $user_id == $current_user_id ) {
            // user is current user, build global variable
            global $zume_user_profile; // sets a global variable for user_profile
            $zume_user_profile = [
                'name' => $name,
                'has_set_name' => $has_set_name,
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'coaching_contact_id' => $coaching_contact_id,
                'email' => $email,
                'communications_email' => $communications_email,
                'phone' => $phone,
                'location' => $location,
                'language' => $language,
                'timezone' => $timezone,
                'coaches' => $coaches,
                'friend_key' => $user_friend_key,
                'preferred_language' => $user_preferred_language,
                'contact_preference' => empty( $contact_preference ) ? [] : $contact_preference,
                'sso_identities' => $identities,
                'sign_in_providers' => $sign_in_providers,
            ];
            return $zume_user_profile;
        } else {
            // if user is not current user, return array
            return [
                'name' => $name,
                'has_set_name' => $has_set_name,
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'coaching_contact_id' => $coaching_contact_id,
                'email' => $email,
                'communications_email' => $communications_email,
                'phone' => $phone,
                'location' => $location,
                'language' => $language,
                'timezone' => $timezone,
                'coaches' => $coaches,
                'friend_key' => $user_friend_key,
                'preferred_language' => $user_preferred_language,
                'contact_preference' => empty( $contact_preference ) ? [] : $contact_preference,
                'sso_identities' => $identities,
                'sign_in_providers' => $sign_in_providers,
            ];
        }
    }
}
if ( ! function_exists( 'zume_get_user_stage' ) ) {
    function zume_get_user_stage( $user_id = null, $log = null, $number_only = false ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }

        $funnel = zume_funnel_stages();
        $stage = $funnel[0];

        if ( empty( $log ) ) {
            return $stage;
        }

        if ( count( $log ) > 0 ) {

            $funnel_steps = [
                1 => false,
                2 => false,
                3 => false,
                4 => false,
                5 => false,
                6 => false,
            ];

            $user_state = [];
            $progress = [];

            foreach ( $log as $value ) {

                // funnel
                if ( 'registered' == $value['subtype'] ) {
                    $funnel_steps[1] = true;
                }
                if ( 'plan_created' == $value['subtype'] ) {
                    $funnel_steps[2] = true;
                }
                if ( 'training_completed' == $value['subtype'] ) {
                    $funnel_steps[3] = true;
                }
                if ( ! ( strpos( 'heard', $value['subtype'] ) === false ) ) {
                    $progress[$value['subtype']] = true;
                    if ( count( $progress ) > 25 ) {
                        $funnel_steps[3] = true;
                    }
                }
                if ( 'first_practitioner_report' == $value['subtype'] || 'join_community' == $value['subtype'] ) {
                    $funnel_steps[4] = true;
                }
                if ( 'mawl_completed' == $value['subtype'] || 'host_completed' == $value['subtype'] ) {
                    $funnel_steps[5] = true;
                }
                if ( 'seeing_generational_fruit' == $value['subtype'] ) {
                    $funnel_steps[6] = true;
                }
                if ( 'new_church' == $value['subtype'] ) {
                    $funnel_steps[6] = true;
                }

                // manual stage
                if ( 'manual_upgrade_to_2' == $value['subtype'] ) {
                    $funnel_steps[2] = true;
                }
                if ( 'manual_upgrade_to_3' == $value['subtype'] ) {
                    $funnel_steps[3] = true;
                }
                if ( 'manual_upgrade_to_4' == $value['subtype'] ) {
                    $funnel_steps[4] = true;
                }
                if ( 'manual_upgrade_to_5' == $value['subtype'] ) {
                    $funnel_steps[5] = true;
                }
                if ( 'manual_upgrade_to_6' == $value['subtype'] ) {
                    $funnel_steps[6] = true;
                }

                // user state
                if ( 'plan_created' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'joined_online_training' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'set_profile' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'invited_friends' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'requested_a_coach' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'set_profile_location' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'set_profile_phone' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'set_profile_name' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'training_26_heard' == $value['subtype'] ) {
                    $user_state['can_create_3_month_plan'] = true;
                }
                if ( 'made_post_training_plan' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'completed_3_month_plan' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'join_community' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
                if ( 'first_practitioner_report' == $value['subtype'] ) {
                    $user_state[$value['subtype']] = true;
                }
            }

            if ( $funnel_steps[6] ) {
                $stage = $funnel[6];
            } else if ( $funnel_steps[5] ) {
                $stage = $funnel[5];
            } else if ( $funnel_steps[4] ) {
                $stage = $funnel[4];
            } else if ( $funnel_steps[3] ) {
                $stage = $funnel[3];
            } else if ( $funnel_steps[2] ) {
                $stage = $funnel[2];
            } else if ( $funnel_steps[1] ) {
                $stage = $funnel[1];
            } else {
                $stage = $funnel[0];
            }
        }

        if ( $number_only ) {
            return $stage['value'];
        } else {
            $stage['state'] = $user_state;
            return $stage;
        }
    }
}
if ( ! function_exists( 'zume_get_user_language' ) ) {
    function zume_get_user_language( $user_id = null )
    {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        global $zume_languages_by_code;
        if ( empty( $zume_languages_by_code ) ) {
            $zume_languages_by_code = zume_languages( 'code' );
        }

        $contact_id = zume_get_user_contact_id($user_id);
        $language_code = get_post_meta( $contact_id, 'user_preferred_language', true );

        if ( ! $language_code ) {
            $language_code = 'en';
            update_post_meta( $contact_id, 'user_preferred_language', $language_code );
        }


        $language_code = zume_get_language_cookie();
        if ( $user_id == get_current_user_id() && ! empty( $language_code ) ) {
            zume_set_language_cookie( $language_code );
        }

        return isset( $zume_languages_by_code[$language_code] ) ? $zume_languages_by_code[$language_code] : $zume_languages_by_code['en'];
    }
}
if ( ! function_exists( 'zume_get_user_location' ) ) {
    function zume_get_user_location( $user_id = null, $ip_lookup = false ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        global $wpdb;
        $location = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT lng, lat, level, label, grid_id, source
                        FROM zume_postmeta pm
                        JOIN zume_dt_location_grid_meta lgm ON pm.post_id=lgm.post_id
                        WHERE pm.meta_key = 'corresponds_to_user' AND pm.meta_value = %d
                        ORDER BY grid_meta_id desc
                        LIMIT 1",
            $user_id ), ARRAY_A
        );

        if ( empty( $location ) && $ip_lookup ) {
            $result = DT_Ipstack_API::get_location_grid_meta_from_current_visitor();
            if ( ! empty( $result ) ) {
                $location = [
                    'lng' => $result['lng'],
                    'lat' => $result['lat'],
                    'level' => $result['level'],
                    'label' => $result['label'],
                    'grid_id' => $result['grid_id'],
                    'source' => $result['source'],
                ];
            }
        }

        if ( empty( $location ) ) {
            return false;
        }

        return [
            'lng' => $location['lng'],
            'lat' => $location['lat'],
            'level' => $location['level'],
            'label' => $location['label'],
            'grid_id' => $location['grid_id'],
            'source' => $location['source'],
        ];
    }
}
if ( ! function_exists( 'zume_get_user_timezone' ) ) {
    function zume_get_user_timezone( $user_id = null, $location = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        $contact_id = zume_get_user_contact_id( $user_id );
        $timezone = get_user_meta( $contact_id, 'user_timezone', true );

        if ( empty( $timezone ) ) {
            // query ipstack ??
            $timezone = 'UTC';
        }

        // lookup timezone details

        $timezone_details = [
            'timezone' => $timezone,
            'offset' => 0,
            'offset_string' => 'UTC',
            'offset_hours' => 0,
            'offset_minutes' => 0,
            'offset_seconds' => 0,
            // phpcs:ignore
            'current_time' => date( 'Y-m-d H:i:s' ),
        ];

        return $timezone_details;
    }
}
if ( ! function_exists( 'zume_get_user_host' ) ) {
    function zume_get_user_host( $user_id = null, $log = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }
        $training_items = zume_training_items();
        $host = [];
        foreach ( $training_items as $item ) {
            if ( isset( $item['host'] ) ) {
                foreach ( $item['host'] as $elements ) {
                    $host[$elements['type'].'_'.$elements['subtype']] = false;
                }
            }
        }
        $keys = [];
        $h = 0;
        $o = 0;
        $s = 0;
        $t = 0;
        foreach ( $log as $row ) {
            $keys[$row['log_key']] = $row['log_key'];
        }
        foreach ( $host as $key => $value ) {
            if ( in_array( $key, $keys ) ) {
                $host[$key] = true;
                if ( str_ends_with( $key, 'heard' ) ) {
                    $h++;
                }
                else if ( str_ends_with( $key, 'obeyed' ) ) {
                    $o++;
                }
                else if ( str_ends_with( $key, 'shared' ) ) {
                    $s++;
                }
                else if ( str_ends_with( $key, 'trained' ) ) {
                    $t++;
                }
            }
        }
        return [
            'list' => $host,
            'totals' => [
                'h' => $h,
                'o' => $o,
                's' => $s,
                't' => $t,
            ],
            'percent' => [
                'h' => $h / count( $training_items ) * 100,
                'o' => $o / count( $training_items ) * 100,
                's' => $s / count( $training_items ) * 100,
                't' => $t / count( $training_items ) * 100,
            ],
        ];
    }
}
if ( ! function_exists( 'zume_get_user_mawl' ) ) {
    function zume_get_user_mawl( $user_id = null, $log = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }
        $training_items = zume_training_items();
        $mawl = [];
        foreach ( $training_items as $item ) {
            if ( isset( $item['mawl'] ) ) {
                foreach ( $item['mawl'] as $elements ) {
                    $mawl[$elements['type'].'_'.$elements['subtype']] = false;
                }
            }
        }
        $keys = [];
        $m = 0;
        $a = 0;
        $w = 0;
        $l = 0;
        foreach ( $log as $row ) {
            $keys[$row['log_key']] = $row['log_key'];
        }
        foreach ( $mawl as $key => $value ) {
            if ( in_array( $key, $keys ) ) {
                $mawl[$key] = true;
                if ( str_ends_with( $key, 'modeling' ) ) {
                    $m++;
                }
                else if ( str_ends_with( $key, 'assisting' ) ) {
                    $a++;
                }
                else if ( str_ends_with( $key, 'watching' ) ) {
                    $w++;
                }
                else if ( str_ends_with( $key, 'launching' ) ) {
                    $l++;
                }
            }
        }
        return [
            'list' => $mawl,
            'totals' => [
                'm' => $m,
                'a' => $a,
                'w' => $w,
                'l' => $l,
            ],
            'percent' => [
                'm' => $m / count( $training_items ) * 100,
                'a' => $a / count( $training_items ) * 100,
                'w' => $w / count( $training_items ) * 100,
                'l' => $l / count( $training_items ) * 100,
            ],
        ];
    }
}
if ( ! function_exists( 'zume_get_user_friends' ) ) {
    function zume_get_user_friends( $user_id = null ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        $contact_id = zume_get_user_contact_id( $user_id );

        // query user friends
        global $wpdb, $table_prefix;
        $from = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT p.post_title as name, p.ID as contact_id, um.user_id
                    FROM zume_p2p p2
                    LEFT JOIN zume_posts p ON p.ID=p2.p2p_to
                    LEFT JOIN zume_usermeta um ON um.meta_value=p.ID AND um.meta_key = 'zume_corresponds_to_contact'
                    WHERE p2.p2p_type = 'contacts_to_relation'
                    AND p2.p2p_from = %d",
            $contact_id ), ARRAY_A
        );

        $to = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT p.post_title as name, p.ID as contact_id, um.user_id
                    FROM zume_p2p p2
                    LEFT JOIN zume_posts p ON p.ID=p2.p2p_from
                    LEFT JOIN zume_usermeta um ON um.meta_value=p.ID AND um.meta_key = 'zume_corresponds_to_contact'
                    WHERE p2.p2p_type = 'contacts_to_relation'
                    AND p2.p2p_to = %d",
            $contact_id ), ARRAY_A
        );

        if ( empty( $from ) && empty( $to ) ) {
            return [];
        }

        $friends = [];
        foreach ( $from as $row ) {
            $friends[$row['contact_id']] = $row;
        }
        foreach ( $to as $row ) {
            $friends[$row['contact_id']] = $row;
        }

        return $friends;
    }
}
if ( ! function_exists( 'zume_get_user_commitments' ) ) {
    // open, closed, all
    function zume_get_user_commitments( $user_id = null, $status = 'open', $category = 'custom' )
    {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        global $wpdb, $table_prefix;
        ;
        $results = $wpdb->get_results(
            $wpdb->prepare(
                'SELECT * FROM zume_dt_post_user_meta
                        WHERE user_id = %d
                        ORDER BY date DESC',
            $user_id), ARRAY_A
        );

        $list = [];
        foreach ( $results as $result ) {
            $meta = maybe_unserialize( $result['meta_value'] );

            if ( 'all' !== $status ) {
                if ( 'open' === $status && isset( $meta['status'] ) ) { // status is added when closed, so if present, then it is closed
                    continue;
                }

                if ( 'closed' === $status && !isset( $meta['status'] ) ) {
                    continue;
                }
            }

            if ( 'custom' !== $category && $category !== $result['category'] ) {
                continue;
            }

            $list[] = [
                'id' => $result['id'],
                'note' => $meta['note'] ?? '',
                'question' => $meta['question'] ?? '',
                'answer' => $meta['answer'] ?? '',
                'status' => isset( $meta['status'] ) ? 'closed' : 'open',
                'due_date' => $result['date'],
                'category' => $result['category'],
            ];
        }

        return $list;
    }
}
if ( ! function_exists( 'zume_get_user_plans' ) ) {
    function zume_get_user_plans( $user_id = null )
    {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        global $wpdb;
        $contact_id = zume_get_user_contact_id( $user_id );
        $connected_plans = $wpdb->get_results( $wpdb->prepare(
            "SELECT p.ID as post_id, UNIX_TIMESTAMP(p.post_date) as post_date, p.post_title as title, pm.meta_key, pm.meta_value
                    FROM zume_p2p p2
                    LEFT JOIN zume_posts p ON p.ID=p2.p2p_to
                    LEFT JOIN zume_postmeta pm ON pm.post_id=p2.p2p_to
                    WHERE p2.p2p_type = 'zume_plans_to_contacts'
                    AND p2.p2p_from = %d ",
            $contact_id
        ), ARRAY_A );

        $plans = [];
        if ( ! empty( $connected_plans ) ) {
            $plan_post_ids = [];
            // initialize loop
            foreach ( $connected_plans as $row ) {
                if ( ! isset( $plans[$row['post_id']] ) ) {
                    $plans[$row['post_id']] = [];
                    $plans[$row['post_id']]['title'] = $row['title'];
                    $plans[$row['post_id']]['timestamp'] = (int) $row['post_date'];
                    $plans[$row['post_id']]['participants'] = [];
                    $plans[$row['post_id']]['sessions'] = [];
                    $plans[$row['post_id']]['completed_sessions'] = [];
                    $plan_post_ids[] = $row['post_id'];
                }

                if ( str_ends_with( $row['meta_key'], '_completed' ) ) {
                    continue;
                }

                if ( str_starts_with( $row['meta_key'], 'set_' )
                    && ! str_ends_with( $row['meta_key'], '_type' )
                ) {
                    $key_array = explode( '_', $row['meta_key'] );
                    $plans[$row['post_id']]['sessions'][$row['meta_key']] = [
                        'key' => $row['meta_key'],
                        'title' => 'Session ' . $key_array[2] ?? '?',
                        'timestamp' => (int) $row['meta_value'],
                        'date' => gmdate( 'Y-m-d', (int) $row['meta_value'] ),
                        'date_formatted' => gmdate( 'M j, Y', (int) $row['meta_value'] ),
                        'completed' => 0,
                        'completed_timestamp' => 0,
                        'completed_date' => '',
                        'completed_date_formatted' => '',
                    ];
                }
                else {
                    // build the normal key value list
                    $plans[$row['post_id']][$row['meta_key']] = $row['meta_value'];
                }
            }
            // completions loop
            foreach ( $connected_plans as $row ) {
                if ( str_ends_with( $row['meta_key'], '_completed' ) ) {
                    if ( empty( $row['meta_value'] ) ) {
                        continue;
                    }

                    $session_key = substr( $row['meta_key'], 0, -10 );

                    if ( ! isset( $plans[$row['post_id']]['sessions'][$session_key] ) ) {
                        continue;
                    }
                    $plans[$row['post_id']]['completed_sessions'][] = $session_key;
                    $plans[$row['post_id']]['sessions'][$session_key]['completed'] = 1;
                    $plans[$row['post_id']]['sessions'][$session_key]['completed_timestamp'] = (int) $row['meta_value'];
                    $plans[$row['post_id']]['sessions'][$session_key]['completed_date'] = gmdate( 'Y-m-d', (int) $row['meta_value'] );
                    $plans[$row['post_id']]['sessions'][$session_key]['completed_formatted'] = gmdate( 'M j, Y', (int) $row['meta_value'] );
                }
            }
            $plans_query_string = implode( ',', $plan_post_ids );
            // phpcs:disable
            $participants_result = $wpdb->get_results(
                "SELECT  p2.p2p_to as plan_id, p2.p2p_from as contact_id, pm.meta_value as user_id, p.post_title as user_name
                    FROM zume_p2p p2
            	    LEFT JOIN zume_posts p ON p.ID=p2.p2p_from
					LEFT JOIN zume_postmeta pm ON p2.p2p_from=pm.post_id AND pm.meta_key = 'corresponds_to_user'
                    WHERE p2.p2p_type = 'zume_plans_to_contacts'
                    AND p2.p2p_to IN ( $plans_query_string ) ", ARRAY_A );
            // phpcs:enable
//            $user_ids = [];
            foreach ( $participants_result as $participant ) {
                $plans[$participant['plan_id']]['participants'][$participant['user_id']] = [
                    'contact_id' => $participant['contact_id'],
                    'user_id' => $participant['user_id'],
                    'name' => $participant['user_name'],
//                    'coaching_contact_id' => false,
                ];
//                $user_ids[] = $participant['user_id'];
            }
        }

//        dt_write_log( __METHOD__);
//        dt_write_log( $plans );
        return $plans;
    }
}
if ( ! function_exists( 'zume_get_user_churches' ) ) {
    function zume_get_user_churches( $user_id = null, $by_key = false ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        /* Get the groups of type church from the DT posts */
        $result = DT_Posts::list_posts(
            'groups',
            [
                'group_type' => [ 'church' ],
                'assigned_to' => [ $user_id ],
            ]
        );

        $churches = [];
        foreach ( $result['posts'] as $church ) {
            $new_church = [];
            $new_church['id'] = (int) $church['ID'];
            $new_church['name'] = $church['name'];
            $new_church['member_count'] = $church['member_count'] ?? 0;
            $new_church['start_date'] = $church['start_date'] ?? [];
            $new_church['status'] = $church['group_status']['key'] ?? '';
            $new_church['location'] = $church['location_grid_meta'][0]['label'] ?? '';
            $new_church['location_meta'] = $church['location_grid_meta'][0] ?? [];
            $new_church['parent'] = !empty( $church['parent_groups'] ) ? $church['parent_groups'][0]['ID'] : null;
            $new_church['children'] = !empty( $church['child_groups'] ) ? array_map( function ( $church ) {
                return $church['ID'];
            }, $church['child_groups'] ) : [];

            if ( $by_key ) {
                $churches[$new_church['id']] = $new_church;
            } else {
                $churches[] = $new_church;
            }
        }

        return $churches;
    }
}
if ( ! function_exists( 'zume_get_user_contact_id' ) ) {
    function zume_get_user_contact_id( $user_id ) {
        global $wpdb;
        return $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM zume_postmeta WHERE meta_key = 'corresponds_to_user' AND meta_value = %s", $user_id ) );
    }
}
if ( ! function_exists( 'zume_get_user_coaching_contact_id' ) ) {
    function zume_get_user_coaching_contact_id( $user_id ) {
        global $wpdb;
        return $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM zume_3_postmeta WHERE meta_key = 'trainee_user_id' AND meta_value = %s", $user_id ) );
    }
}
if ( ! function_exists( 'zume_get_user_id_by_contact_id' ) ) {
    function zume_get_user_id_by_contact_id( $contact_id ) {
        global $wpdb;
        return $wpdb->get_var( $wpdb->prepare( "SELECT user_id FROM zume_usermeta WHERE meta_key = 'zume_corresponds_to_contact' AND meta_value = %s", $contact_id ) );
    }
}
if ( ! function_exists( 'zume_get_user_log' ) ) {
    /**
     * Get the user's log. $type and $subtype optionally filter the logs
     * down to the that type and subtype of log
     *
     * @param int $user_id
     * @param string $type
     * @param string $subtype
     */
    function zume_get_user_log( $user_id, $type = null, $subtype = null ) {
        global $wpdb, $table_prefix;

        $sql = $wpdb->prepare( "SELECT CONCAT( r.type, '_', r.subtype ) as log_key, r.*
            FROM zume_dt_reports r
            WHERE r.user_id = %s
            AND r.post_type = 'zume'
        ", $user_id );

        if ( !empty( $type ) ) {
            $sql .= $wpdb->prepare( "AND r.type = %s\n", $type );
        }

        if ( !empty( $subtype ) ) {
            $sql .= $wpdb->prepare( 'AND r.subtype = %s', $subtype );
        }

        // phpcs:ignore
        $results = $wpdb->get_results( $sql, ARRAY_A );

        if ( is_array( $results ) ) {
            return $results;
        } else {
            return [];
        }
    }
}
if ( ! function_exists( 'zume_languages' ) ) {
    /**
     * @param string $type 'code' or 'locale' or 'full'
     * @return array
     */
    function zume_languages( $type = 'code' ) {
        global $zume_languages_by_code, $zume_languages_by_locale, $zume_languages_full_list, $zume_languages_v5_ready;
        $list = array(
            'en' => array(
                'name' => 'English',
                'enDisplayName' => 'English',
                'code' => 'en',
                'displayCode' => 'en',
                'locale' => 'en',
                'weblate' => 'en',
                'nativeName' => 'English',
                'rtl' => false,
                'flag' => '🇺🇸',
                'population' => 500000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    // has a published version in zume 4.0
                    // if version 5 not ready, then language will be listed and redirect to legacy.zume.training
                    'translator_enabled' => true,
                    // enables the translator app to begin translation
                    'version_5_ready' => true,
                    // publishes publicly the version 5.0 system with minimum support
                    // has translated (weblate, scripts, activities, videos, files)
                    // allows the language to show up in the selection  list, and disables redirect to 4.0
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'am' => array(
                'name' => 'Amharic',
                'enDisplayName' => 'Amharic',
                'code' => 'am',
                'displayCode' => 'am',
                'locale' => 'amh',
                'weblate' => 'am',
                'nativeName' => 'አማርኛ',
                'rtl' => false,
                'flag' => '🇪🇹',
                'population' => 22000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ar' => array(
                'name' => 'Arabic',
                'enDisplayName' => 'Arabic',
                'code' => 'ar',
                'displayCode' => 'ar',
                'locale' => 'ar',
                'weblate' => 'ar',
                'nativeName' => 'العربية',
                'rtl' => true,
                'flag' => '🇸🇦',
                'population' => 230000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'ar_jo' => array(
                'name' => 'Arabic (Jordanian)',
                'enDisplayName' => 'Arabic (Jordanian)',
                'code' => 'ar_jo',
                'displayCode' => 'ar_jo',
                'locale' => 'ar_JO',
                'weblate' => 'ar_JO',
                'nativeName' => 'العربية - الأردن',
                'rtl' => true,
                'flag' => '🇯🇴',
                'population' => 0,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'ar_tn' => array(
                'name' => 'Arabic (Tunisian)',
                'enDisplayName' => 'Arabic (Tunisian)',
                'code' => 'ar_tn',
                'displayCode' => 'ar_tn',
                'locale' => 'ar_TN',
                'weblate' => 'ar_TN',
                'nativeName' => ' العربية التونسية',
                'rtl' => true,
                'flag' => '🇹🇳',
                'population' => 0,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'ar_ma' => array(
                'name' => 'Arabic (Moroccan)',
                'enDisplayName' => 'Arabic (Moroccan)',
                'code' => 'ar_ma',
                'displayCode' => 'ar_ma',
                'locale' => 'ar_MA',
                'weblate' => 'ar_MA',
                'nativeName' => 'العربية - الأردن',
                'rtl' => true,
                'flag' => '🇲🇦',
                'population' => 0,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'hy' => array(
                'name' => 'Armenian',
                'enDisplayName' => 'Armenian',
                'code' => 'hy',
                'displayCode' => 'hy',
                'locale' => 'hy',
                'weblate' => 'hy',
                'nativeName' => 'Armenian',
                'rtl' => false,
                'flag' => '🇦🇲',
                'population' => 5300000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'az' => array(
                'name' => 'Azerbaijani',
                'enDisplayName' => 'Azerbaijani',
                'code' => 'az',
                'displayCode' => 'az',
                'locale' => 'az',
                'weblate' => 'az',
                'nativeName' => 'Azerbaijani',
                'rtl' => false,
                'flag' => '🇦🇿',
                'population' => 24000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'asl' => array(
                'name' => 'American Sign Language',
                'enDisplayName' => 'American Sign Language',
                'code' => 'asl',
                'displayCode' => 'asl',
                'locale' => 'asl',
                'weblate' => 'asl',
                'nativeName' => 'Sign Language',
                'rtl' => false,
                'flag' => '🤟',
                'population' => 15360000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'bn' => array(
                'name' => 'Bengali (India)',
                'enDisplayName' => 'Bengali (India)',
                'code' => 'bn',
                'displayCode' => 'bn',
                'locale' => 'bn_IN',
                'weblate' => 'bn_IN',
                'nativeName' => 'বাংলা',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 215000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'bho' => array(
                'name' => 'Bhojpuri',
                'enDisplayName' => 'Bhojpuri',
                'code' => 'bho',
                'displayCode' => 'bho',
                'locale' => 'bho',
                'weblate' => 'bho',
                'nativeName' => 'भोजपुरी',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 40000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'bs' => array(
                'name' => 'Bosnian',
                'enDisplayName' => 'Bosnian',
                'code' => 'bs',
                'displayCode' => 'bs',
                'locale' => 'bs_BA',
                'weblate' => 'bs_BA',
                'nativeName' => 'Bosanski',
                'rtl' => false,
                'flag' => '🇧🇦',
                'population' => 2600000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'bg' => array(
                'name' => 'Bulgarian',
                'enDisplayName' => 'Bulgarian',
                'code' => 'bg',
                'displayCode' => 'bg',
                'locale' => 'bg_BG',
                'weblate' => 'bg_BG',
                'nativeName' => 'български език',
                'rtl' => false,
                'flag' => '🇧🇬',
                'population' => 15000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'my' => array(
                'name' => 'Burmese',
                'enDisplayName' => 'Burmese',
                'code' => 'my',
                'displayCode' => 'my',
                'locale' => 'my',
                'weblate' => 'my',
                'nativeName' => 'မြန်မာဘာသာ',
                'rtl' => false,
                'flag' => '🇲🇲',
                'population' => 42000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'zhhk' => array(
                'name' => 'Cantonese (Traditional)',
                'enDisplayName' => 'Cantonese (Traditional)',
                'code' => 'zhhk',
                'displayCode' => 'zhhk',
                'locale' => 'zh_HK',
                'weblate' => 'zh_Hant_HK',
                'nativeName' => '中文（繁體,香港）',
                'rtl' => false,
                'flag' => '🇭🇰',
                'population' => 72000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'zhcn' => array(
                'name' => 'Chinese (Simplified)',
                'enDisplayName' => 'Chinese (Simplified)',
                'code' => 'zhcn',
                'displayCode' => 'zhcn',
                'locale' => 'zh_CN',
                'weblate' => 'zh_Hans',
                'nativeName' => '中文（简体）',
                'rtl' => false,
                'flag' => '🇨🇳',
                'population' => 1300000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'zhtw' => array(
                'name' => 'Chinese (Traditional)',
                'enDisplayName' => 'Chinese (Traditional)',
                'code' => 'zhtw',
                'displayCode' => 'zhtw',
                'locale' => 'zh_TW',
                'weblate' => 'zh_Hant',
                'nativeName' => '中文（繁體）',
                'rtl' => false,
                'flag' => '🇹🇼',
                'population' => 0,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'hr' => array(
                'name' => 'Croatian',
                'enDisplayName' => 'Croatian',
                'code' => 'hr',
                'displayCode' => 'hr',
                'locale' => 'hr',
                'weblate' => 'hr',
                'nativeName' => 'Hrvatski',
                'rtl' => false,
                'flag' => '🇭🇷',
                'population' => 6000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'fo' => array(
                'name' => 'Faroese',
                'enDisplayName' => 'Faroese',
                'code' => 'fo',
                'displayCode' => 'fo',
                'locale' => 'fo',
                'weblate' => 'fo',
                'nativeName' => 'Faroese',
                'rtl' => false,
                'flag' => '🇫🇴',
                'population' => 69000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'fr' => array(
                'name' => 'French',
                'enDisplayName' => 'French',
                'code' => 'fr',
                'displayCode' => 'fr',
                'locale' => 'fr_FR',
                'weblate' => 'fr_FR',
                'nativeName' => 'Français',
                'rtl' => false,
                'flag' => '🇫🇷',
                'population' => 321000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'de' => array(
                'name' => 'German',
                'enDisplayName' => 'German',
                'code' => 'de',
                'displayCode' => 'de',
                'locale' => 'de_DE',
                'weblate' => 'de_DE',
                'nativeName' => 'Deutsch',
                'rtl' => false,
                'flag' => '🇩🇪',
                'population' => 229000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'gu' => array(
                'name' => 'Gujarati',
                'enDisplayName' => 'Gujarati',
                'code' => 'gu',
                'displayCode' => 'gu',
                'locale' => 'gu',
                'weblate' => 'gu',
                'nativeName' => 'ગુજરાતી',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 210000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ha' => array(
                'name' => 'Hausa',
                'enDisplayName' => 'Hausa',
                'code' => 'ha',
                'displayCode' => 'ha',
                'locale' => 'ha_NG',
                'weblate' => 'ha_NG',
                'nativeName' => 'Hausa',
                'rtl' => false,
                'flag' => '🇳🇬',
                'population' => 88000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'hi' => array(
                'name' => 'Hindi',
                'enDisplayName' => 'Hindi',
                'code' => 'hi',
                'displayCode' => 'hi',
                'locale' => 'hi_IN',
                'weblate' => 'hi_IN',
                'nativeName' => 'हिन्दी',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 615000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'id' => array(
                'name' => 'Indonesian',
                'enDisplayName' => 'Indonesian',
                'code' => 'id',
                'displayCode' => 'id',
                'locale' => 'id_ID',
                'weblate' => 'id_ID',
                'nativeName' => 'Bahasa Indonesia',
                'rtl' => false,
                'flag' => '🇮🇩',
                'population' => 200000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'it' => array(
                'name' => 'Italian',
                'enDisplayName' => 'Italian',
                'code' => 'it',
                'displayCode' => 'it',
                'locale' => 'it_IT',
                'weblate' => 'it_IT',
                'nativeName' => 'Italiano',
                'rtl' => false,
                'flag' => '🇮🇹',
                'population' => 64600000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'ja' => array(
                'name' => 'Japanese',
                'enDisplayName' => 'Japanese',
                'code' => 'ja',
                'displayCode' => 'ja',
                'locale' => 'ja',
                'weblate' => 'ja',
                'nativeName' => '日本語',
                'rtl' => false,
                'flag' => '🇯🇵',
                'population' => 126000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'kn' => array(
                'name' => 'Kannada',
                'enDisplayName' => 'Kannada',
                'code' => 'kn',
                'displayCode' => 'kn',
                'locale' => 'kn',
                'weblate' => 'kn',
                'nativeName' => 'ಕನ್ನಡ',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 47000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'ko' => array(
                'name' => 'Korean',
                'enDisplayName' => 'Korean',
                'code' => 'ko',
                'displayCode' => 'ko',
                'locale' => 'ko_KR',
                'weblate' => 'ko_KR',
                'nativeName' => '한국어',
                'rtl' => false,
                'flag' => '🇰🇷',
                'population' => 75000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ku' => array(
                'name' => 'Kurdish',
                'enDisplayName' => 'Kurdish',
                'code' => 'ku',
                'displayCode' => 'ku',
                'locale' => 'ku',
                'weblate' => 'ku',
                'nativeName' => 'کوردی',
                'rtl' => true,
                'flag' => '🇮🇶',
                'population' => 26000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'lo' => array(
                'name' => 'Lao',
                'enDisplayName' => 'Lao',
                'code' => 'lo',
                'displayCode' => 'lo',
                'locale' => 'lo',
                'weblate' => 'lo',
                'nativeName' => 'ພາສາລາວ',
                'rtl' => false,
                'flag' => '🇱🇦',
                'population' => 3000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'lv' => array(
                'name' => 'Latvian',
                'enDisplayName' => 'Latvian',
                'code' => 'lv',
                'displayCode' => 'lv',
                'locale' => 'lv',
                'weblate' => 'lv',
                'nativeName' => 'Latviešu',
                'rtl' => false,
                'flag' => '🇱🇻',
                'population' => 1200000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'mai' => array(
                'name' => 'Maithili',
                'enDisplayName' => 'Maithili',
                'code' => 'mai',
                'displayCode' => 'mai',
                'locale' => 'mai',
                'weblate' => 'mai',
                'nativeName' => '𑒧𑒻𑒟𑒱𑒪𑒲',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 50000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ml' => array(
                'name' => 'Malayalam',
                'enDisplayName' => 'Malayalam',
                'code' => 'ml',
                'displayCode' => 'ml',
                'locale' => 'ml_IN',
                'weblate' => 'ml',
                'nativeName' => 'മലയാളം',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 35000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'mr' => array(
                'name' => 'Marathi',
                'enDisplayName' => 'Marathi',
                'code' => 'mr',
                'displayCode' => 'mr',
                'locale' => 'mr',
                'weblate' => 'mr',
                'nativeName' => 'मराठी',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 83000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'mn' => array(
                'name' => 'Mongolian',
                'enDisplayName' => 'Mongolian',
                'code' => 'mn',
                'displayCode' => 'mn',
                'locale' => 'mn',
                'weblate' => 'mn',
                'nativeName' => 'Монгол',
                'rtl' => false,
                'flag' => '🇲🇳',
                'population' => 9000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ne' => array(
                'name' => 'Nepali',
                'enDisplayName' => 'Nepali',
                'code' => 'ne',
                'displayCode' => 'ne',
                'locale' => 'ne_NP',
                'weblate' => 'ne_NP',
                'nativeName' => 'नेपाली',
                'rtl' => false,
                'flag' => '🇳🇵',
                'population' => 32000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'or' => array(
                'name' => 'Oriya',
                'enDisplayName' => 'Oriya',
                'code' => 'or',
                'displayCode' => 'or',
                'locale' => 'or_IN',
                'weblate' => 'or_IN',
                'nativeName' => 'ଓଡ଼ିଆ',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 50000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'fa' => array(
                'name' => 'Persian/Farsi',
                'enDisplayName' => 'Persian/Farsi',
                'code' => 'fa',
                'displayCode' => 'fa',
                'locale' => 'fa_IR',
                'weblate' => 'fa_IR',
                'nativeName' => 'فارسی',
                'rtl' => true,
                'flag' => '🇮🇷',
                'population' => 62000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'pl ' => array(
                'name' => 'Polish',
                'enDisplayName' => 'Polish',
                'code' => 'pl',
                'displayCode' => 'pl',
                'locale' => 'pl_PL',
                'weblate' => 'pl_PL',
                'nativeName' => 'Polski',
                'rtl' => false,
                'flag' => '🇵🇱',
                'population' => 43000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'pt' => array(
                'name' => 'Portuguese',
                'enDisplayName' => 'Portuguese',
                'code' => 'pt',
                'displayCode' => 'pt',
                'locale' => 'pt_PT',
                'weblate' => 'pt_PT',
                'nativeName' => 'Português',
                'rtl' => false,
                'flag' => '🇵🇹',
                'population' => 300000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'pa' => array(
                'name' => 'Punjabi',
                'enDisplayName' => 'Punjabi',
                'code' => 'pa',
                'displayCode' => 'pa',
                'locale' => 'pa_IN',
                'weblate' => 'pa_IN',
                'nativeName' => 'ਪੰਜਾਬੀ',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 210000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'pa_pk' => array(
                'name' => 'Punjabi (Western)',
                'enDisplayName' => 'Punjabi (Western)',
                'code' => 'pa_pk',
                'displayCode' => 'pa_pk',
                'locale' => 'pa_PK',
                'weblate' => 'pa_PK',
                'nativeName' => 'ਪੰਜਾਬੀ (ਪੱਛਮੀ)',
                'rtl' => false,
                'flag' => '🇵🇰',
                'population' => 80000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ru' => array(
                'name' => 'Russian',
                'enDisplayName' => 'Russian',
                'code' => 'ru',
                'displayCode' => 'ru',
                'locale' => 'ru_RU',
                'weblate' => 'ru_RU',
                'nativeName' => 'Русский',
                'rtl' => false,
                'flag' => '🇷🇺',
                'population' => 258000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'ro' => array(
                'name' => 'Romanian',
                'enDisplayName' => 'Romanian',
                'code' => 'ro',
                'displayCode' => 'ro',
                'locale' => 'ro_RO',
                'weblate' => 'ro_RO',
                'nativeName' => 'Română',
                'rtl' => false,
                'flag' => '🇷🇴',
                'population' => 25000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'sl' => array(
                'name' => 'Slovenian',
                'enDisplayName' => 'Slovenian',
                'code' => 'sl',
                'displayCode' => 'sl',
                'locale' => 'sl_SI',
                'weblate' => 'sl_SI',
                'nativeName' => 'Slovenščina',
                'rtl' => false,
                'flag' => '🇸🇮',
                'population' => 2500000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'so' => array(
                'name' => 'Somali',
                'enDisplayName' => 'Somali',
                'code' => 'so',
                'displayCode' => 'so',
                'locale' => 'so',
                'weblate' => 'so',
                'nativeName' => 'Soomaali',
                'rtl' => false,
                'flag' => '🇸🇴',
                'population' => 24000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'es' => array(
                'name' => 'Spanish',
                'enDisplayName' => 'Spanish',
                'code' => 'es',
                'displayCode' => 'es',
                'locale' => 'es',
                'weblate' => 'es',
                'nativeName' => 'Español',
                'rtl' => false,
                'flag' => '🇪🇸',
                'population' => 500000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => true,
                ],
            ),
            'es_es' => array(
                'name' => 'Spanish (Spain)',
                'enDisplayName' => 'Spanish (Spain)',
                'code' => 'es_es',
                'displayCode' => 'es_es',
                'locale' => 'es_ES',
                'weblate' => 'es_ES',
                'nativeName' => 'Español (España)',
                'rtl' => false,
                'flag' => '🇪🇸',
                'population' => 0,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'swa' => array(
                'name' => 'Swahili',
                'enDisplayName' => 'Swahili',
                'code' => 'swa',
                'displayCode' => 'swa',
                'locale' => 'swa',
                'weblate' => 'sw',
                'nativeName' => 'Kiswahili',
                'rtl' => false,
                'flag' => '🇹🇿',
                'population' => 200000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ta' => array(
                'name' => 'Tamil',
                'enDisplayName' => 'Tamil',
                'code' => 'ta',
                'displayCode' => 'ta',
                'locale' => 'ta_IN',
                'weblate' => 'ta_IN',
                'nativeName' => 'தமிழ்',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 89000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'te' => array(
                'name' => 'Telugu',
                'enDisplayName' => 'Telugu',
                'code' => 'te',
                'displayCode' => 'te',
                'locale' => 'te',
                'weblate' => 'te',
                'nativeName' => 'తెలుగు',
                'rtl' => false,
                'flag' => '🇮🇳',
                'population' => 96000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'th' => array(
                'name' => 'Thai',
                'enDisplayName' => 'Thai',
                'code' => 'th',
                'displayCode' => 'th',
                'locale' => 'th',
                'weblate' => 'th',
                'nativeName' => 'ไทย',
                'rtl' => false,
                'flag' => '🇹🇭',
                'population' => 69000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'tr' => array(
                'name' => 'Turkish',
                'enDisplayName' => 'Turkish',
                'code' => 'tr',
                'displayCode' => 'tr',
                'locale' => 'tr_TR',
                'weblate' => 'tr_TR',
                'nativeName' => 'Türkçe',
                'rtl' => false,
                'flag' => '🇹🇷',
                'population' => 80000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'uk' => array(
                'name' => 'Ukrainian',
                'enDisplayName' => 'Ukrainian',
                'code' => 'uk',
                'displayCode' => 'uk',
                'locale' => 'uk',
                'weblate' => 'uk',
                'nativeName' => 'Україна',
                'rtl' => true,
                'flag' => '🇺🇦',
                'population' => 45000000,
                'enable_flags' => [
                    'version_4_available' => false,
                    'translator_enabled' => false,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'ur' => array(
                'name' => 'Urdu',
                'enDisplayName' => 'Urdu',
                'code' => 'ur',
                'displayCode' => 'ur',
                'locale' => 'ur',
                'weblate' => 'ur',
                'nativeName' => 'اردو',
                'rtl' => true,
                'flag' => '🇵🇰',
                'population' => 230000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => false,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
            'vi' => array(
                'name' => 'Vietnamese',
                'enDisplayName' => 'Vietnamese',
                'code' => 'vi',
                'displayCode' => 'vi',
                'locale' => 'vi',
                'weblate' => 'vi',
                'nativeName' => 'Tiếng Việt',
                'rtl' => false,
                'flag' => '🇻🇳',
                'population' => 85000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => true,
                    'course_slides_download' => false,
                ],
            ),
            'yo' => array(
                'name' => 'Yoruba',
                'enDisplayName' => 'Yoruba',
                'code' => 'yo',
                'displayCode' => 'yo',
                'locale' => 'yo',
                'weblate' => 'yo',
                'nativeName' => 'Yorùbá',
                'rtl' => false,
                'flag' => '🇳🇬',
                'population' => 47000000,
                'enable_flags' => [
                    'version_4_available' => true,
                    'translator_enabled' => true,
                    'version_5_ready' => true,
                    'pieces_pages' => false,
                    'course_slides_download' => false,
                ],
            ),
        );
        foreach ( $list as $lang ) {
            if ( $lang['enable_flags']['version_5_ready'] || $lang['enable_flags']['version_4_available'] ) {
                $zume_languages_by_code[$lang['code']] = $lang;
                $zume_languages_by_locale[$lang['locale']] = $lang;
            }
            if ( $lang['enable_flags']['version_5_ready'] ) {
                $zume_languages_v5_ready[$lang['code']] = $lang;
            }
            if ( $lang['enable_flags']['translator_enabled'] ) {
                $zume_languages_full_list[$lang['code']] = $lang;
            }
        }

        if ( $type === 'full' ) {
            return $zume_languages_full_list;
        }
        else if ( $type === 'v5_only' ) {
            return $zume_languages_v5_ready;
        }
        else if ( $type === 'locale' ) {
            return $zume_languages_by_locale;
        } else {
            return $zume_languages_by_code;
        }
    }
    zume_languages();
}
if ( ! function_exists( 'zume_language_codes' ) ) {
    function zume_language_codes() {
        global $zume_languages_by_code;
        return array_keys( $zume_languages_by_code );
    }
}
if ( ! function_exists( 'zume_get_language_cookie' ) ) {
    function zume_get_language_cookie() {
        if ( defined( 'ZUME_LANGUAGE_COOKIE' ) ) {
            return isset( $_COOKIE[ZUME_LANGUAGE_COOKIE] ) ? sanitize_key( $_COOKIE[ZUME_LANGUAGE_COOKIE] ) : '';
        }
        else {
            return 'en';
        }
    }
}
if ( ! function_exists( 'zume_get_language_locale' ) ) {
    function zume_get_language_locale( $code ) {
        global $zume_languages_by_code;
        if ( isset( $zume_languages_by_code[$code]['locale'] ) ) {
            return $zume_languages_by_code[$code]['locale'];
        } else {
            return 'en';
        }
    }
}
if ( ! function_exists( 'zume_get_language_display_code' ) ) {
    function zume_get_language_display_code( $code ) {
        global $zume_languages_by_code;
        if ( isset( $zume_languages_by_code[$code]['displayCode'] ) ) {
            return $zume_languages_by_code[$code]['displayCode'];
        } else {
            return 'en';
        }
    }
}
if ( ! function_exists( 'zume_google_locales' ) ) {
    function zume_google_locales() {
        $google_locales = [
            'af',
            'sq',
            'am',
            'ar',
            'hy',
            'az',
            'eu',
            'be',
            'bs',
            'bn',
            'bg',
            'my',
            'ca',
            'zh-hk',
            'zh-cn',
            'zh-tw',
            'hr',
            'cs',
            'da',
            'nl',
            'en',
            'et',
            'fa',
            'fil',
            'fi',
            'fr',
            'fr-ca',
            'gl',
            'ka',
            'de',
            'el',
            'gu',
            'iw',
            'hi',
            'hu',
            'is',
            'id',
            'it',
            'ja',
            'kn',
            'kk',
            'km',
            'ko',
            'ky',
            'lo',
            'lv',
            'lt',
            'mk',
            'ms',
            'ml',
            'mr',
            'mn',
            'ne',
            'no',
            'pl',
            'pt',
            'pt-br',
            'pa',
            'ro',
            'ru',
            'sr',
            'si',
            'sk',
            'sl',
            'es',
            'es-419',
            'sw',
            'sv',
            'ta',
            'te',
            'th',
            'tr',
            'ua',
            'ur',
            'uz',
            'vi',
            'zu',
        ];

        return $google_locales;
    }
}
if ( ! function_exists( 'zume_apple_locales' ) ) {
    function zume_apple_locales( $type = 'locale' ) {
        $apple_locales = [
            'ar-ar',
            'az-tr',
            'bg-bg',
            'cs-cz',
            'da-dk',
            'en-us',
            'et-ee',
            'de-de',
            'el-gr',
            'hu-hu',
            'mt-mt',
            'pl-pl',
            'ro-ro',
            'fi-fi',
            'fr-ca',
            'fr-fr',
            'hb-hb',
            'id-id',
            'it-it',
            'ja-jp',
            'lv-lv',
            'lt-lt',
            'ko-kr',
            'ms-my',
            'nl-nl',
            'no-no',
            'pt-br',
            'pt-pt',
            'ru-ru',
            'sk-sk',
            'sl-si',
            'es-es',
            'es-mx',
            'sv-se',
            'th-th',
            'tl-ph',
            'tr-tr',
            'vi-vn',
            'zh-cn',
            'zh-hk',
        ];

        if ( $type === 'codes' ) {
            $apple_codes = [];
            foreach ( $apple_locales as $locale ) {
                $code = explode( '-', $locale )[0];
                $apple_codes[$code] = $locale;
            }

            return $apple_codes;
        }

        return $apple_locales;
    }
}
/**
 * Get the status of any feature for any language
 *
 * If no params given returns array of all enable_flags for all languages
 * If one param given returns array of booleans for that language or flag
 * If both params given returns boolean for that flag in that language
 * Returns null if the language code or flag is not found.
 *
 * @param string|null $flag_name
 * @param string|null $lang_code
 *
 * @return null|bool|array
 */
if ( ! function_exists( 'zume_feature_flag' ) ) {
    function zume_feature_flag( $flag_name = null, $lang_code = null ) {
        global $zume_languages_by_code;

        $results = [];

        /* If no args given return all the enable_flags for all languages */
        if ( empty( $flag_name ) && empty( $lang_code ) ) {
            foreach ( $zume_languages_by_code as $code => $details ) {
                $results[$code] = $details['enable_flags'];
            }

            return $results;
        }

        /* If only the language is given return all the enable_flags for that language */
        if ( empty( $flag_name ) && isset( $zume_languages_by_code[$lang_code] ) ) {
            return $zume_languages_by_code[$lang_code]['enable_flags'];
        }

        /* If only the flag name is given, return that flag status for all languages */
        if ( empty( $lang_code ) ) {
            foreach ( $zume_languages_by_code as $code => $details ) {
                $results[$code] = isset( $details['enable_flags'][$flag_name] ) ? $details['enable_flags'][$flag_name] : null;
            }
            return $results;
        }

        /* If both are given return the flag status for that language */
        if ( isset( $zume_languages_by_code[$lang_code] ) && isset( $zume_languages_by_code[$lang_code]['enable_flags'][$flag_name] ) ) {
            return $zume_languages_by_code[$lang_code]['enable_flags'][$flag_name];
        }

        return null;
    }
}

if ( ! function_exists( 'zume_training_items' ) ) {
    function zume_training_items(): array {

        $training_items = [
            '1' => [
                'key' => 1,
                'title' => __( 'God Uses Ordinary People', 'zume' ), // pieces title & SEO title
                'description' => __( "You'll see how God uses ordinary people doing simple things to make a big impact.", 'zume' ),
                'video_title' => __( 'God Uses Ordinary People', 'zume' ), // video title & training title. simple
                'slug' => 'god-uses-ordinary-people',
                'video' => 1,
                'script' => 34,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '2' => [
                'key'  => 2,
                'title' => __( 'Simple Definition of Disciple and Church', 'zume' ),
                'description' => __( 'Discover the essence of being a disciple, making a disciple, and what is the church.', 'zume' ),
                'video_title' => __( 'Disciples and the Church', 'zume' ),
                'slug' => 'definition-of-disciple-and-church',
                'video' => 2,
                'script' => 35,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '3' => [
                'key' => 3,
                'title' => __( 'Spiritual Breathing is Hearing and Obeying God', 'zume' ),
                'description' => __( 'Being a disciple means we hear from God and we obey God.', 'zume' ),
                'video_title' => __( 'Hearing and Obeying God', 'zume' ),
                'slug' => 'spiritual-breathing-is-hearing-and-obeying-god',
                'video' => 3,
                'script' => 36,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '4' => [
                'key' => 4,
                'title' => __( 'S.O.A.P.S. Bible Study', 'zume' ),
                'description' => __( 'A tool for daily Bible study that helps you understand, obey, and share God’s Word.', 'zume' ),
                'video_title' => __( 'S.O.A.P.S. Bible Study', 'zume' ),
                'slug' => 'soaps-bible-reading',
                'video' => 4,
                'script' => 37,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '5' => [
                'key' => 5,
                'title' => __( 'Accountability Groups', 'zume' ),
                'description' => __( 'A tool for two or three people of the same gender to meet weekly and encourage each other in areas that are going well and reveal areas that need correction.', 'zume' ),
                'video_title' => __( 'Accountability Groups', 'zume' ),
                'slug' => 'accountability-groups',
                'video' => 5,
                'script' => 38,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '6' => [
                'key' => 6,
                'title' => __( 'Consumer vs Producer Lifestyle', 'zume' ),
                'description' => __( "You'll discover the four main ways God makes everyday followers more like Jesus.", 'zume' ),
                'video_title' => __( 'Producer not Consumer', 'zume' ),
                'slug' => 'consumer-vs-producer-lifestyle',
                'video' => 6,
                'script' => 39,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '7' => [
                'key' => 7,
                'title' => __( 'How to Spend an Hour in Prayer', 'zume' ),
                'description' => __( 'See how easy it is to spend an hour in prayer.', 'zume' ),
                'video_title' => __( 'How to Spend an Hour in Prayer', 'zume' ),
                'slug' => 'how-to-spend-an-hour-in-prayer',
                'video' => 7,
                'script' => 40,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '8' => [
                'key' => 8,
                'title' => __( 'Relational Stewardship – List of 100', 'zume' ),
                'description' => __( 'A tool designed to help you be a good steward of your relationships.', 'zume' ),
                'video_title' => __( 'List of 100', 'zume' ),
                'slug' => 'relational-stewardship-list-of-100',
                'video' => 8,
                'script' => 41,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '9' => [
                'key' => 9,
                'title' => __( 'Spiritual Economy', 'zume' ),
                'description' => __( "Learn how God's economy is different from the world's. God invests more in those who are faithful with what they've already been given.", 'zume' ),
                'video_title' => __( 'Spiritual Economy', 'zume' ),
                'slug' => 'the-kingdom-economy',
                'video' => 9,
                'script' => 42,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '10' => [
                'key' => 10,
                'title' => __( 'The Gospel and How to Share It', 'zume' ),
                'description' => __( 'Learn a way to share God’s Good News from the beginning of humanity all the way to the end of this age.', 'zume' ),
                'video_title' => __( 'Sharing God‘s Story', 'zume' ),
                'slug' => 'the-gospel-and-how-to-share-it',
                'video' => 10,
                'script' => 43,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '11' => [
                'key' => 11,
                'title' => __( 'Baptism and How To Do It', 'zume' ),
                'description' => __( 'Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…” Learn how to put this into practice.', 'zume' ),
                'video_title' => __( 'Baptism', 'zume' ),
                'slug' => 'baptism-and-how-to-do-it',
                'video' => 11,
                'script' => 44,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '12' => [
                'key' => 12,
                'title' => __( 'Prepare Your 3-Minute Testimony', 'zume' ),
                'description' => __( 'Learn how to share your testimony in three minutes by sharing how Jesus has impacted your life.', 'zume' ),
                'video_title' => __( '3-Minute Testimony', 'zume' ),
                'slug' => 'prepare-your-3-minute-testimony',
                'video' => 12,
                'script' => 45,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '13' => [
                'key' => 13,
                'title' => __( 'Vision Casting the Greatest Blessing', 'zume' ),
                'description' => __( 'Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.', 'zume' ),
                'video_title' => __( 'Great, Greater, and Greatest Blessing', 'zume' ),
                'slug' => 'vision-casting-the-greatest-blessing',
                'video' => 13,
                'script' => 46,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '14' => [
                'key' => 14,
                'title' => __( 'Duckling Discipleship – Leading Immediately', 'zume' ),
                'description' => __( 'Learn what ducklings have to do with disciple-making.', 'zume' ),
                'video_title' => __( 'Duckling Discipleship', 'zume' ),
                'slug' => 'duckling-discipleship-leading-sooner',
                'video' => 14,
                'script' => 47,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '15' => [
                'key' => 15,
                'title' => __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                'description' => __( 'Begin to see where God’s Kingdom isn’t. These are usually the places where God wants to work the most.', 'zume' ),
                'video_title' => __( 'Eyes to See Where the Kingdom Isn’t', 'zume' ),
                'slug' => 'eyes-to-see-where-the-kingdom-isnt',
                'video' => 15,
                'script' => 48,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '16' => [
                'key' => 16,
                'title' => __( 'The Lord’s Supper and How To Lead It', 'zume' ),
                'description' => __( 'It’s a simple way to celebrate our intimate connection and ongoing relationship with Jesus. Learn a simple way to celebrate.', 'zume' ),
                'video_title' => __( 'The Lord’s Supper', 'zume' ),
                'slug' => 'the-lords-supper-and-how-to-lead-it',
                'video' => 16,
                'script' => 49,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '17' => [
                'key' => 17,
                'title' => __( 'Prayer Walking and How To Do It', 'zume' ),
                'description' => __( 'It‘s a simple way to obey God’s command to pray for others. And it‘s just what it sounds like — praying to God while walking around!', 'zume' ),
                'video_title' => __( 'Prayer Walking', 'zume' ),
                'slug' => 'prayer-walking',
                'video' => 17,
                'script' => 50,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '18' => [
                'key' => 18,
                'title' => __( 'A Person of Peace and How To Find One', 'zume' ),
                'description' => __( 'Learn who a person of peace might be and how to know when you‘ve found one.', 'zume' ),
                'video_title' => __( 'Person of Peace', 'zume' ),
                'slug' => 'a-person-of-peace-and-how-to-find-one',
                'video' => 18,
                'script' => 51,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '19' => [
                'key' => 19,
                'title' => __( 'Faithfulness is Better Than Knowledge', 'zume' ),
                'description' => __( 'It‘s important what disciples know — but it‘s much more important what they DO with what they know.', 'zume' ),
                'video_title' => __( 'Faithfulness', 'zume' ),
                'slug' => 'faithfulness-is-better-than-knowledge',
                'video' => 19,
                'script' => 52,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '20' => [
                'key' => 20,
                'title' => __( 'The BLESS Prayer Pattern', 'zume' ),
                'description' => __( 'Practice a simple mnemonic to remind you of ways to pray for others.', 'zume' ),
                'video_title' => __( 'The B.L.E.S.S. Prayer', 'zume' ),
                'slug' => 'the-bless-prayer-pattern',
                'video' => false,
                'script' => false,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '21' => [
                'key' => 21,
                'title' => __( '3/3 Group Meeting Pattern', 'zume' ),
                'description' => __( 'A 3/3 Group is a way for followers of Jesus to meet, pray, learn, grow, fellowship and practice obeying and sharing what they‘ve learned. In this way, a 3/3 Group is not just a small group but a Simple Church.', 'zume' ),
                'video_title' => __( '3/3 Group', 'zume' ),
                'slug' => '3-3-group-meeting-pattern',
                'video' => 21,
                'script' => 53,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '22' => [
                'key' => 22,
                'title' => __( 'Training Cycle for Maturing Disciples', 'zume' ),
                'description' => __( 'Learn the training cycle and consider how it applies to disciple making.', 'zume' ),
                'video_title' => __( 'Training Cycle', 'zume' ),
                'slug' => 'training-cycle-for-maturing-disciples',
                'video' => 22,
                'script' => 54,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '23' => [
                'key' => 23,
                'title' => __( 'Leadership Cells', 'zume' ),
                'description' => __( 'A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.', 'zume' ),
                'video_title' => __( 'Leadership Cells', 'zume' ),
                'slug' => 'leadership-cells',
                'video' => 23,
                'script' => 55,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '24' => [
                'key' => 24,
                'title' => __( 'Expect Non-Sequential Growth', 'zume' ),
                'description' => __( 'See how disciple making doesn‘t have to be linear. Multiple things can happen at the same time.', 'zume' ),
                'video_title' => __( 'Expect Non-Sequential Growth', 'zume' ),
                'slug' => 'expect-non-sequential-growth',
                'video' => 24,
                'script' => 56,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '25' => [
                'key' => 25,
                'title' => __( 'Pace of Multiplication Matters', 'zume' ),
                'description' => __( 'Multiplying matters and multiplying quickly matters even more. See why pace matters.', 'zume' ),
                'video_title' => __( 'Pace', 'zume' ),
                'slug' => 'pace-of-multiplication-matters',
                'video' => 25,
                'script' => 57,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '26' => [
                'key' => 26,
                'title' => __( 'Always Part of Two Churches', 'zume' ),
                'description' => __( 'Learn how to obey Jesus‘ commands by going AND staying.', 'zume' ),
                'video_title' => __( 'Always Part of Two Churches', 'zume' ),
                'slug' => 'always-part-of-two-churches',
                'video' => 26,
                'script' => 58,
                'type' => 'concept',
                'host' => true,
                'mawl' => true,
            ],
            '27' => [
                'key' => 27,
                'slug' => 'three-month-plan',
                'title' => __( 'Three-Month Plan', 'zume' ),
                'description' => __( 'Create and share your plan for how you will implement the Zúme tools over the next three months.', 'zume' ),
                'video_title' => __( 'Three-Month Plan', 'zume' ),
                'video' => false,
                'script' => false,
                'type' => 'tool',
                'host' => true,
                'mawl' => false,
            ],
            '28' => [
                'key' => 28,
                'title' => __( 'Coaching Checklist', 'zume' ),
                'description' => __( 'A powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.', 'zume' ),
                'video_title' => __( 'Coaching Checklist', 'zume' ),
                'slug' => 'coaching-checklist',
                'video' => 28,
                'script' => 60,
                'type' => 'tool',
                'host' => true,
                'mawl' => false,
            ],
            '29' => [
                'key' => 29,
                'title' => __( 'Leadership in Networks', 'zume' ),
                'description' => __( 'Learn how multiplying churches stay connected and live life together as an extended, spiritual family.', 'zume' ),
                'video_title' => __( 'Leadership in Networks', 'zume' ),
                'slug' => 'leadership-in-networks',
                'video' => 29,
                'script' => 61,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '30' => [
                'key' => 30,
                'title' => __( 'Peer Mentoring Groups', 'zume' ),
                'description' => __( 'This is a group that consists of people who are leading and starting 3/3 Groups. It also follows a 3/3 format and is a powerful way to assess the spiritual health of God’s work in your area.', 'zume' ),
                'video_title' => __( 'Peer Mentoring', 'zume' ),
                'slug' => 'peer-mentoring-groups',
                'video' => 30,
                'script' => 62,
                'type' => 'concept',
                'host' => true,
                'mawl' => false,
            ],
            '31' => [
                'key' => 31,
                'title' => __( 'Four Fields Tool', 'zume' ),
                'description' => __( 'The four fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the kingdom activity around them.', 'zume' ),
                'video_title' => __( 'Four Fields Tool', 'zume' ),
                'slug' => 'four-fields-tool',
                'video' => false,
                'script' => false,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '32' => [
                'key' => 32,
                'title' => __( 'Generational Mapping', 'zume' ),
                'description' => __( 'Generation mapping is another simple tool to help leaders in a movement understand the growth around them.', 'zume' ),
                'video_title' => __( 'Generational Mapping', 'zume' ),
                'slug' => 'generational-mapping',
                'video' => false,
                'script' => false,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
            '33' => [
                'key' => 33,
                'title' => __( '3-Circles Gospel Presentation', 'zume' ),
                'description' => __( 'The 3-Circles gospel presentation is a way to tell the gospel using a simple illustration that can be drawn on a piece of paper.', 'zume' ),
                'video_title' => __( '3-Circles', 'zume' ),
                'slug' => '3-circles-gospel-presentation',
                'video' => 33,
                'script' => 63,
                'type' => 'tool',
                'host' => true,
                'mawl' => true,
            ],
        ];

        $list = [];
        foreach ( $training_items as $training_item ) {
            $index = $training_item['key'];
            $list[$training_item['key']] = [
                'key' => $training_item['key'],
                'type' => $training_item['type'],
                'title' => $training_item['title'],
                'video_title' => $training_item['video_title'],
                'video' => $training_item['video'],
                'slug' => $training_item['slug'],
                'script' => $training_item['script'],
                'description' => $training_item['description'],
                'host' => $training_item['host'] ? [
                    [
                        'label' => 'Heard',
                        'short_label' => 'H',
                        'type' => 'training',
                        'subtype' => $index.'_heard',
                        'key' => 'training_'.$index.'_heard',
                    ],
                    [
                        'label' => 'Obeyed',
                        'short_label' => 'O',
                        'type' => 'training',
                        'subtype' => $index.'_obeyed',
                        'key' => 'training_'.$index.'_obeyed',
                    ],
                    [
                        'label' => 'Shared',
                        'short_label' => 'S',
                        'type' => 'training',
                        'subtype' => $index.'_shared',
                        'key' => 'training_'.$index.'_shared',
                    ],
                    [
                        'label' => 'Trained',
                        'short_label' => 'T',
                        'type' => 'training',
                        'subtype' => $index.'_trained',
                        'key' => 'training_'.$index.'_trained',
                    ],
                ] : [],
                'mawl' => $training_item['mawl'] ? [
                    [
                        'label' => 'Modeling',
                        'short_label' => 'M',
                        'type' => 'coaching',
                        'subtype' => $index.'_modeling',
                        'key' => 'coaching_'.$index.'_modeling',
                    ],
                    [
                        'label' => 'Assisting',
                        'short_label' => 'A',
                        'type' => 'coaching',
                        'subtype' => $index.'_assisting',
                        'key' => 'coaching_'.$index.'_assisting',
                    ],
                    [
                        'label' => 'Watching',
                        'short_label' => 'W',
                        'type' => 'coaching',
                        'subtype' => $index.'_watching',
                        'key' => 'coaching_'.$index.'_watching',
                    ],
                    [
                        'label' => 'Launching',
                        'short_label' => 'L',
                        'type' => 'coaching',
                        'subtype' => $index.'_launching',
                        'key' => 'coaching_'.$index.'_launching',
                    ],
                ] : [],
            ];
        }

        return $list;
    }
}
if ( ! function_exists( 'zume_training_items_by_script' ) ) {
    function zume_training_items_by_script(): array {
        $training_items = zume_training_items();
        $list = [];
        foreach ( $training_items as $training_item ) {
            $list[$training_item['script']] = $training_item;
        }
        return $list;
    }
}
if ( ! function_exists( 'zume_training_items_for_session' ) ) {
    function zume_training_items_for_session( string $session_type, int $session_number = null ): array {
        $session_numbers_by_type = [
            'a' => [
                1 => [ 1, 2, 3, 4, 5 ],
                2 => [ 6, 7, 8 ],
                3 => [ 9, 10, 11 ],
                4 => [ 12, 13, 14, 15, 16 ],
                5 => [ 17, 18, 19 ],
                6 => [ 20, 21 ],
                7 => [ 22 ],
                8 => [ 23 ],
                9 => [ 24, 25, 26, 27 ],
                10 => [ 28, 29, 30, 31, 32 ],
            ],
            'b' => [
                1 => [ 1, 2, 3 ],
                2 => [ 4 ],
                3 => [ 5 ],
                4 => [ 6, 8 ],
                5 => [ 7 ],
                6 => [ 9, 10, 13 ],
                7 => [ 10 ],
                8 => [ 11, 12 ],
                9 => [ 10 ],
                10 => [ 14, 15, 16 ],
                11 => [ 17 ],
                12 => [ 18, 19 ],
                13 => [ 20, 21 ],
                14 => [ 21 ],
                15 => [ 22, 23 ],
                16 => [ 24, 25, 26 ],
                17 => [ 27 ],
                18 => [ 28, 29 ],
                19 => [ 30 ],
                20 => [ 31, 32 ],
            ],
        ];
        $session_numbers_by_type['c'][1] = [
            ...$session_numbers_by_type['a'][1],
            ...$session_numbers_by_type['a'][2],
        ];
        $session_numbers_by_type['c'][2] = [
            ...$session_numbers_by_type['a'][3],
            ...$session_numbers_by_type['a'][4],
        ];
        $session_numbers_by_type['c'][3] = [
            ...$session_numbers_by_type['a'][5],
            ...$session_numbers_by_type['a'][6],
        ];
        $session_numbers_by_type['c'][4] = [
            ...$session_numbers_by_type['a'][7],
            ...$session_numbers_by_type['a'][8],
        ];
        $session_numbers_by_type['c'][5] = [
            ...$session_numbers_by_type['a'][9],
            ...$session_numbers_by_type['a'][10],
        ];

        if ( !isset( $session_numbers_by_type[$session_type] ) ) {
            return [];
        }

        if ( is_null( $session_number ) ) {
            return $session_numbers_by_type[$session_type];
        }

        if ( !isset( $session_numbers_by_type[$session_type][$session_number] ) ) {
            return [];
        }

        $training_items = $session_numbers_by_type[$session_type][$session_number];

        return $training_items;
    }
}
if ( ! function_exists( 'zume_funnel_stages' ) ) {
    function zume_funnel_stages(): array {
        return [
            0 => [
                'key' => 'anonymous',
                'value' => 0,
                'label' => 'Anonymous',
                'label_full' => 'Anonymous',
                'description' => 'Anonymous visitors to the website.',
                'description_full' => 'Anonymous visitors to the website.',
                'characteristics' => [
                    'Anonymous website visitor',
                ],
                'priority_next_step' => 'Register',
                'next_steps' => [
                    'Register for a user account',
                    'Join an online training',
                    'Get a coach',
                ],
                'pace' => [],
            ],
            1 => [
                'key' => 'registrant',
                'value' => 1,
                'label' => 'Registrant',
                'label_full' => 'Registrant',
                'description' => 'Trainee who has registered for the training.',
                'description_full' => 'Trainee who has registered for the training.',
                'characteristics' => [
                    'Has registered for a user account',
                ],
                'priority_next_step' => 'Make a training plan',
                'next_steps' => [
                    'Make a training plan',
                    'Invite friends',
                ],
                'pace' => [],
            ],
            2 => [
                'key' => 'active_training_trainee',
                'value' => 2,
                'label' => 'Active Training',
                'label_full' => 'Active Training Trainee',
                'description' => 'Trainee who is in active training.',
                'description_full' => 'An active trainee is someone who has made a training plan. They are actively working through the training.',
                'characteristics' => [
                    'Has made a training plan',
                ],
                'priority_next_step' => 'Complete training',
                'next_steps' => [
                    'Complete training',
                    'Create post training plan',
                ],
                'pace' => [],
            ],
            3 => [
                'key' => 'post_training_trainee',
                'value' => 3,
                'label' => 'Post-Training',
                'label_full' => 'Post-Training Trainee',
                'description' => 'Trainee who has completed training.',
                'description_full' => 'Trainee who has completed training.',
                'characteristics' => [
                    'Has completed training',
                ],
                'priority_next_step' => 'Make first practitioner report',
                'next_steps' => [
                    'Make first practitioner report',
                    'Complete post training plan',
                    'Establish ongoing coaching relationship',
                ],
                'pace' => [],
            ],
            4 => [
                'key' => 'partial_practitioner',
                'value' => 4,
                'label' => 'Partial Practitioner',
                'label_full' => '(S1) Partial Practitioner',
                'description' => 'Practitioner still coaching through MAWL checklist.',
                'description_full' => 'Practitioner still coaching through MAWL checklist.',
                'characteristics' => [
                    'Has made first practitioner report',
                    'Working on HOST/MAWL checklist',
                    'Consistent effort, inconsistent fruit',
                ],
                'priority_next_step' => '',
                'next_steps' => [
                    'Full skills competence',
                    'Continued reporting',
                    'Connect with S1 and S2 practitioners',
                ],
                'pace' => [],
            ],
            5 => [
                'key' => 'full_practitioner',
                'value' => 5,
                'label' => 'Practitioner',
                'label_full' => '(S2) Practitioner',
                'description' => 'Practitioner who has completed the MAWL checklist, but is not multiplying.',
                'description_full' => 'Practitioner who has completed the MAWL checklist, but is not multiplying.',
                'characteristics' => [
                    'Has completed HOST/MAWL',
                    'Consistent effort, inconsistent fruit',
                    'Inconsistent 1st generation fruit',
                ],
                'priority_next_step' => 'Consistent 2,3,4 generation fruit',
                'next_steps' => [
                    'Consistent 2,3,4 gen disciples',
                    'Consistent 2,3,4 gen groups',
                    'Peer coaching/mentoring',
                ],
                'pace' => [],
            ],
            6 => [
                'key' => 'multiplying_practitioner',
                'value' => 6,
                'label' => 'Multiplying Practitioner',
                'label_full' => '(S3) Multiplying Practitioner',
                'description' => 'Practitioner who is seeing generational fruit.',
                'description_full' => 'Practitioner who is seeing generational fruit.',
                'characteristics' => [
                    '2,3,4 generations of disciples',
                    '2,3,4 generations of churches',
                ],
                'priority_next_step' => 'Downstream coaching for consistent generations',
                'next_steps' => [
                    'Downstream coaching for consistent generations',
                ],
                'pace' => [],
            ],
        ];
    }
}
if ( ! function_exists( 'zume_mirror_url' ) ) {
    function zume_mirror_url() {
        return 'https://storage.googleapis.com/zume-file-mirror/';
    }
}
if ( ! function_exists( 'zume_alt_video' ) ) {

    function zume_alt_video( $current_language = null ) {
        $alt_video = false;

        if ( ! $current_language ) {
            $current_language = zume_current_language();
        }

        if ( ! $alt_video ) {
            $alt_video = ( 'id' === $current_language ); // @todo expand this if more than indonesian is a problem
        }

        return $alt_video;
    }

}
if ( ! function_exists( 'zume_current_language' ) ) {
    function zume_current_language() {
        $url = zume_get_url_pieces();
        return $url['lang_code'] ?? '';
    }
}
if ( ! function_exists( 'zume_get_url_pieces' ) ) {
    function zume_get_url_pieces( $url = null ) {

        if ( !$url ) {
            $url = dt_get_url_path();
        }

        $dt_url = new DT_URL( $url );

        $codes = zume_language_codes();

        $path = isset( $dt_url->parsed_url['path'] ) ? $dt_url->parsed_url['path'] : '';

        $url_parts = explode( '/', $path );

        $lang_code = 'en';
        if ( in_array( $url_parts[0], $codes ) ) {
            $lang_code = array_shift( $url_parts );
        }
        $path = implode( '/', $url_parts );

        return [
            'lang_code' => (string) $lang_code ?? 'en',
            'path' => $path,
            'url_parts' => ( $url_parts ) ? $url_parts : [],
        ];
    }
}
if ( ! function_exists( 'zume_set_language_cookie' ) ) {
    function zume_set_language_cookie( string $lang, array $args = [] ) {
        if ( zume_get_language_cookie() !== $lang ) {
            setcookie( ZUME_LANGUAGE_COOKIE, $lang, 0, '/' );
        }
    }
}
if ( ! function_exists( 'zume_format_int' ) ) {
    function zume_format_int( $int )
    {
        $int = (float) $int;
        return number_format( $int, 0, '.', ',' );
    }
}
if ( ! function_exists( 'zume_get_valence' ) ) {
    function zume_get_valence( $value, $compare, $negative_stat = false )
    {
        $value = (float) $value;
        $compare = (float) $compare;
        $percent = zume_get_percent( $value, $compare );

        if ( $negative_stat ) {
            if ( $percent > 20 ) {
                $valence = 'valence-darkred';
            } else if ( $percent > 10 ) {
                $valence = 'valence-red';
            } else if ( $percent < -10 ) {
                $valence = 'valence-green';
            } else if ( $percent < -20 ) {
                $valence = 'valence-darkgreen';
            } else {
                $valence = 'valence-grey';
            }
        } elseif ( $percent > 20 ) {
            $valence = 'valence-darkgreen';
        } else if ( $percent > 10 ) {
            $valence = 'valence-green';
        } else if ( $percent < -10 ) {
            $valence = 'valence-red';
        } else if ( $percent < -20 ) {
            $valence = 'valence-darkred';
        } else {
            $valence = 'valence-grey';
        }

        return $valence;
    }
}
if ( ! function_exists( 'zume_get_percent' ) ) {
    function zume_get_percent( $value, $compare )
    {
        $value = (float) $value;
        $compare = (float) $compare;

        // handle zeros
        if ( $compare == 0 && $value > 0 ) {
            return '+' . $value * 100;
        }
        if ( $value == 0 && $compare > 0 ) {
            return '-' . $compare * 100;
        }

        // process non-zero comparisons
        if ( $value > 0 && $compare > 0 ) {

            // handle larger than 100% comparisons
            if ( $value < $compare && $compare > $value * 2 ) {
                $percent = ( $compare / $value ) * -1;
            } else {
                $percent = ( $value / $compare );
            }

            if ( $percent > 1 && intval( $percent ) <= 10 ) {
                $percent = $percent * 100;
                $percent = '+' . round( $percent - 100, 1 );
            }
            else if ( $percent > 10 ) {
                $percent = $percent * 100;
                $percent = '+' . round( $percent, 1 );
            }
            else if ( $percent < 1 && intval( $percent ) <= 10 ) {
                $percent = $percent * 100;
                $percent = round( ( 100 - $percent ), 1 ) * -1;
            }
            else if ( $percent < 1 && intval( $percent ) >= 10  ) {
                $percent = $percent * 100;
                $percent = round( ( $percent ), 1 ) * -1;
            }
            else {
                $percent = 0;
            }

            return $percent;
        }
        else {
            return 0;
        }
    }
}
if ( ! function_exists( 'zume_get_timezones' ) ) {
    function zume_get_timezones( string $key = null ): array {
        $timezones = [
            'Africa/Abidjan' => [
                'timezone' => 'Africa/Abidjan',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Accra' => [
                'timezone' => 'Africa/Accra',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Addis_Ababa' => [
                'timezone' => 'Africa/Addis_Ababa',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Algiers' => [
                'timezone' => 'Africa/Algiers',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Asmara' => [
                'timezone' => 'Africa/Asmara',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Asmera' => [
                'timezone' => 'Africa/Asmera',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Bamako' => [
                'timezone' => 'Africa/Bamako',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Bangui' => [
                'timezone' => 'Africa/Bangui',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Banjul' => [
                'timezone' => 'Africa/Banjul',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Bissau' => [
                'timezone' => 'Africa/Bissau',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Blantyre' => [
                'timezone' => 'Africa/Blantyre',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Brazzaville' => [
                'timezone' => 'Africa/Brazzaville',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Bujumbura' => [
                'timezone' => 'Africa/Bujumbura',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Cairo' => [
                'timezone' => 'Africa/Cairo',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Casablanca' => [
                'timezone' => 'Africa/Casablanca',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Africa/Ceuta' => [
                'timezone' => 'Africa/Ceuta',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Africa/Conakry' => [
                'timezone' => 'Africa/Conakry',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Dakar' => [
                'timezone' => 'Africa/Dakar',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Dar_es_Salaam' => [
                'timezone' => 'Africa/Dar_es_Salaam',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Djibouti' => [
                'timezone' => 'Africa/Djibouti',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Douala' => [
                'timezone' => 'Africa/Douala',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/El_Aaiun' => [
                'timezone' => 'Africa/El_Aaiun',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Africa/Freetown' => [
                'timezone' => 'Africa/Freetown',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Gaborone' => [
                'timezone' => 'Africa/Gaborone',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Harare' => [
                'timezone' => 'Africa/Harare',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Johannesburg' => [
                'timezone' => 'Africa/Johannesburg',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Juba' => [
                'timezone' => 'Africa/Juba',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Kampala' => [
                'timezone' => 'Africa/Kampala',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Khartoum' => [
                'timezone' => 'Africa/Khartoum',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Kigali' => [
                'timezone' => 'Africa/Kigali',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Kinshasa' => [
                'timezone' => 'Africa/Kinshasa',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Lagos' => [
                'timezone' => 'Africa/Lagos',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Libreville' => [
                'timezone' => 'Africa/Libreville',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Lome' => [
                'timezone' => 'Africa/Lome',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Luanda' => [
                'timezone' => 'Africa/Luanda',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Lubumbashi' => [
                'timezone' => 'Africa/Lubumbashi',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Lusaka' => [
                'timezone' => 'Africa/Lusaka',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Malabo' => [
                'timezone' => 'Africa/Malabo',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Maputo' => [
                'timezone' => 'Africa/Maputo',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Maseru' => [
                'timezone' => 'Africa/Maseru',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Mbabane' => [
                'timezone' => 'Africa/Mbabane',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Mogadishu' => [
                'timezone' => 'Africa/Mogadishu',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Monrovia' => [
                'timezone' => 'Africa/Monrovia',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Nairobi' => [
                'timezone' => 'Africa/Nairobi',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Africa/Ndjamena' => [
                'timezone' => 'Africa/Ndjamena',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Niamey' => [
                'timezone' => 'Africa/Niamey',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Nouakchott' => [
                'timezone' => 'Africa/Nouakchott',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Ouagadougou' => [
                'timezone' => 'Africa/Ouagadougou',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Porto-Novo' => [
                'timezone' => 'Africa/Porto-Novo',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Sao_Tome' => [
                'timezone' => 'Africa/Sao_Tome',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Timbuktu' => [
                'timezone' => 'Africa/Timbuktu',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Africa/Tripoli' => [
                'timezone' => 'Africa/Tripoli',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Africa/Tunis' => [
                'timezone' => 'Africa/Tunis',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Africa/Windhoek' => [
                'timezone' => 'Africa/Windhoek',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'America/Adak' => [
                'timezone' => 'America/Adak',
                'gmt_offset' => '-36000',
                'dst_offset' => '-32400',
            ],
            'America/Anchorage' => [
                'timezone' => 'America/Anchorage',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'America/Anguilla' => [
                'timezone' => 'America/Anguilla',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Antigua' => [
                'timezone' => 'America/Antigua',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Araguaina' => [
                'timezone' => 'America/Araguaina',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Buenos_Aires' => [
                'timezone' => 'America/Argentina/Buenos_Aires',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Catamarca' => [
                'timezone' => 'America/Argentina/Catamarca',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/ComodRivadavia' => [
                'timezone' => 'America/Argentina/ComodRivadavia',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Cordoba' => [
                'timezone' => 'America/Argentina/Cordoba',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Jujuy' => [
                'timezone' => 'America/Argentina/Jujuy',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/La_Rioja' => [
                'timezone' => 'America/Argentina/La_Rioja',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Mendoza' => [
                'timezone' => 'America/Argentina/Mendoza',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Rio_Gallegos' => [
                'timezone' => 'America/Argentina/Rio_Gallegos',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Salta' => [
                'timezone' => 'America/Argentina/Salta',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/San_Juan' => [
                'timezone' => 'America/Argentina/San_Juan',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/San_Luis' => [
                'timezone' => 'America/Argentina/San_Luis',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Tucuman' => [
                'timezone' => 'America/Argentina/Tucuman',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Argentina/Ushuaia' => [
                'timezone' => 'America/Argentina/Ushuaia',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Aruba' => [
                'timezone' => 'America/Aruba',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Asuncion' => [
                'timezone' => 'America/Asuncion',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Atikokan' => [
                'timezone' => 'America/Atikokan',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Atka' => [
                'timezone' => 'America/Atka',
                'gmt_offset' => '-36000',
                'dst_offset' => '-32400',
            ],
            'America/Bahia' => [
                'timezone' => 'America/Bahia',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Bahia_Banderas' => [
                'timezone' => 'America/Bahia_Banderas',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Barbados' => [
                'timezone' => 'America/Barbados',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Belem' => [
                'timezone' => 'America/Belem',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Belize' => [
                'timezone' => 'America/Belize',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Blanc-Sablon' => [
                'timezone' => 'America/Blanc-Sablon',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Boa_Vista' => [
                'timezone' => 'America/Boa_Vista',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Bogota' => [
                'timezone' => 'America/Bogota',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Boise' => [
                'timezone' => 'America/Boise',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Buenos_Aires' => [
                'timezone' => 'America/Buenos_Aires',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Cambridge_Bay' => [
                'timezone' => 'America/Cambridge_Bay',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Campo_Grande' => [
                'timezone' => 'America/Campo_Grande',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Cancun' => [
                'timezone' => 'America/Cancun',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Caracas' => [
                'timezone' => 'America/Caracas',
                'gmt_offset' => '-16200',
                'dst_offset' => '-16200',
            ],
            'America/Catamarca' => [
                'timezone' => 'America/Catamarca',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Cayenne' => [
                'timezone' => 'America/Cayenne',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Cayman' => [
                'timezone' => 'America/Cayman',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Chicago' => [
                'timezone' => 'America/Chicago',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Chihuahua' => [
                'timezone' => 'America/Chihuahua',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Coral_Harbour' => [
                'timezone' => 'America/Coral_Harbour',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Cordoba' => [
                'timezone' => 'America/Cordoba',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Costa_Rica' => [
                'timezone' => 'America/Costa_Rica',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Creston' => [
                'timezone' => 'America/Creston',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'America/Cuiaba' => [
                'timezone' => 'America/Cuiaba',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Curacao' => [
                'timezone' => 'America/Curacao',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Danmarkshavn' => [
                'timezone' => 'America/Danmarkshavn',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'America/Dawson' => [
                'timezone' => 'America/Dawson',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Dawson_Creek' => [
                'timezone' => 'America/Dawson_Creek',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'America/Denver' => [
                'timezone' => 'America/Denver',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Detroit' => [
                'timezone' => 'America/Detroit',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Dominica' => [
                'timezone' => 'America/Dominica',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Edmonton' => [
                'timezone' => 'America/Edmonton',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Eirunepe' => [
                'timezone' => 'America/Eirunepe',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/El_Salvador' => [
                'timezone' => 'America/El_Salvador',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Ensenada' => [
                'timezone' => 'America/Ensenada',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Fort_Nelson' => [
                'timezone' => 'America/Fort_Nelson',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'America/Fort_Wayne' => [
                'timezone' => 'America/Fort_Wayne',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Fortaleza' => [
                'timezone' => 'America/Fortaleza',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Glace_Bay' => [
                'timezone' => 'America/Glace_Bay',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Godthab' => [
                'timezone' => 'America/Godthab',
                'gmt_offset' => '-10800',
                'dst_offset' => '-7200',
            ],
            'America/Goose_Bay' => [
                'timezone' => 'America/Goose_Bay',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Grand_Turk' => [
                'timezone' => 'America/Grand_Turk',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Grenada' => [
                'timezone' => 'America/Grenada',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Guadeloupe' => [
                'timezone' => 'America/Guadeloupe',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Guatemala' => [
                'timezone' => 'America/Guatemala',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Guayaquil' => [
                'timezone' => 'America/Guayaquil',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Guyana' => [
                'timezone' => 'America/Guyana',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Halifax' => [
                'timezone' => 'America/Halifax',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Havana' => [
                'timezone' => 'America/Havana',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Hermosillo' => [
                'timezone' => 'America/Hermosillo',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'America/Indiana/Indianapolis' => [
                'timezone' => 'America/Indiana/Indianapolis',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indiana/Knox' => [
                'timezone' => 'America/Indiana/Knox',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Indiana/Marengo' => [
                'timezone' => 'America/Indiana/Marengo',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indiana/Petersburg' => [
                'timezone' => 'America/Indiana/Petersburg',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indiana/Tell_City' => [
                'timezone' => 'America/Indiana/Tell_City',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Indiana/Vevay' => [
                'timezone' => 'America/Indiana/Vevay',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indiana/Vincennes' => [
                'timezone' => 'America/Indiana/Vincennes',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indiana/Winamac' => [
                'timezone' => 'America/Indiana/Winamac',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Indianapolis' => [
                'timezone' => 'America/Indianapolis',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Inuvik' => [
                'timezone' => 'America/Inuvik',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Iqaluit' => [
                'timezone' => 'America/Iqaluit',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Jamaica' => [
                'timezone' => 'America/Jamaica',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Jujuy' => [
                'timezone' => 'America/Jujuy',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Juneau' => [
                'timezone' => 'America/Juneau',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'America/Kentucky/Louisville' => [
                'timezone' => 'America/Kentucky/Louisville',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Kentucky/Monticello' => [
                'timezone' => 'America/Kentucky/Monticello',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Knox_IN' => [
                'timezone' => 'America/Knox_IN',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Kralendijk' => [
                'timezone' => 'America/Kralendijk',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/La_Paz' => [
                'timezone' => 'America/La_Paz',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Lima' => [
                'timezone' => 'America/Lima',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Los_Angeles' => [
                'timezone' => 'America/Los_Angeles',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Louisville' => [
                'timezone' => 'America/Louisville',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Lower_Princes' => [
                'timezone' => 'America/Lower_Princes',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Maceio' => [
                'timezone' => 'America/Maceio',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Managua' => [
                'timezone' => 'America/Managua',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Manaus' => [
                'timezone' => 'America/Manaus',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Marigot' => [
                'timezone' => 'America/Marigot',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Martinique' => [
                'timezone' => 'America/Martinique',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Matamoros' => [
                'timezone' => 'America/Matamoros',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Mazatlan' => [
                'timezone' => 'America/Mazatlan',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Mendoza' => [
                'timezone' => 'America/Mendoza',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Menominee' => [
                'timezone' => 'America/Menominee',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Merida' => [
                'timezone' => 'America/Merida',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Metlakatla' => [
                'timezone' => 'America/Metlakatla',
                'gmt_offset' => '-28800',
                'dst_offset' => '-28800',
            ],
            'America/Mexico_City' => [
                'timezone' => 'America/Mexico_City',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Miquelon' => [
                'timezone' => 'America/Miquelon',
                'gmt_offset' => '-10800',
                'dst_offset' => '-7200',
            ],
            'America/Moncton' => [
                'timezone' => 'America/Moncton',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Monterrey' => [
                'timezone' => 'America/Monterrey',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Montevideo' => [
                'timezone' => 'America/Montevideo',
                'gmt_offset' => '-10800',
                'dst_offset' => '-7200',
            ],
            'America/Montreal' => [
                'timezone' => 'America/Montreal',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Montserrat' => [
                'timezone' => 'America/Montserrat',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Nassau' => [
                'timezone' => 'America/Nassau',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/New_York' => [
                'timezone' => 'America/New_York',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Nipigon' => [
                'timezone' => 'America/Nipigon',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Nome' => [
                'timezone' => 'America/Nome',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'America/Noronha' => [
                'timezone' => 'America/Noronha',
                'gmt_offset' => '-7200',
                'dst_offset' => '-7200',
            ],
            'America/North_Dakota/Beulah' => [
                'timezone' => 'America/North_Dakota/Beulah',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/North_Dakota/Center' => [
                'timezone' => 'America/North_Dakota/Center',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/North_Dakota/New_Salem' => [
                'timezone' => 'America/North_Dakota/New_Salem',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Ojinaga' => [
                'timezone' => 'America/Ojinaga',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Panama' => [
                'timezone' => 'America/Panama',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Pangnirtung' => [
                'timezone' => 'America/Pangnirtung',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Paramaribo' => [
                'timezone' => 'America/Paramaribo',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Phoenix' => [
                'timezone' => 'America/Phoenix',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'America/Port-au-Prince' => [
                'timezone' => 'America/Port-au-Prince',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Port_of_Spain' => [
                'timezone' => 'America/Port_of_Spain',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Porto_Acre' => [
                'timezone' => 'America/Porto_Acre',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Porto_Velho' => [
                'timezone' => 'America/Porto_Velho',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Puerto_Rico' => [
                'timezone' => 'America/Puerto_Rico',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Rainy_River' => [
                'timezone' => 'America/Rainy_River',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Rankin_Inlet' => [
                'timezone' => 'America/Rankin_Inlet',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Recife' => [
                'timezone' => 'America/Recife',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Regina' => [
                'timezone' => 'America/Regina',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Resolute' => [
                'timezone' => 'America/Resolute',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Rio_Branco' => [
                'timezone' => 'America/Rio_Branco',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'America/Rosario' => [
                'timezone' => 'America/Rosario',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Santa_Isabel' => [
                'timezone' => 'America/Santa_Isabel',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Santarem' => [
                'timezone' => 'America/Santarem',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Santiago' => [
                'timezone' => 'America/Santiago',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'America/Santo_Domingo' => [
                'timezone' => 'America/Santo_Domingo',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Sao_Paulo' => [
                'timezone' => 'America/Sao_Paulo',
                'gmt_offset' => '-10800',
                'dst_offset' => '-7200',
            ],
            'America/Scoresbysund' => [
                'timezone' => 'America/Scoresbysund',
                'gmt_offset' => '-3600',
                'dst_offset' => '0',
            ],
            'America/Shiprock' => [
                'timezone' => 'America/Shiprock',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'America/Sitka' => [
                'timezone' => 'America/Sitka',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'America/St_Barthelemy' => [
                'timezone' => 'America/St_Barthelemy',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/St_Johns' => [
                'timezone' => 'America/St_Johns',
                'gmt_offset' => '-12600',
                'dst_offset' => '-9000',
            ],
            'America/St_Kitts' => [
                'timezone' => 'America/St_Kitts',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/St_Lucia' => [
                'timezone' => 'America/St_Lucia',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/St_Thomas' => [
                'timezone' => 'America/St_Thomas',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/St_Vincent' => [
                'timezone' => 'America/St_Vincent',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Swift_Current' => [
                'timezone' => 'America/Swift_Current',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Tegucigalpa' => [
                'timezone' => 'America/Tegucigalpa',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'America/Thule' => [
                'timezone' => 'America/Thule',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'America/Thunder_Bay' => [
                'timezone' => 'America/Thunder_Bay',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Tijuana' => [
                'timezone' => 'America/Tijuana',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Toronto' => [
                'timezone' => 'America/Toronto',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'America/Tortola' => [
                'timezone' => 'America/Tortola',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Vancouver' => [
                'timezone' => 'America/Vancouver',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Virgin' => [
                'timezone' => 'America/Virgin',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'America/Whitehorse' => [
                'timezone' => 'America/Whitehorse',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'America/Winnipeg' => [
                'timezone' => 'America/Winnipeg',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'America/Yakutat' => [
                'timezone' => 'America/Yakutat',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'America/Yellowknife' => [
                'timezone' => 'America/Yellowknife',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'Antarctica/Casey' => [
                'timezone' => 'Antarctica/Casey',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Antarctica/Davis' => [
                'timezone' => 'Antarctica/Davis',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Antarctica/DumontDUrville' => [
                'timezone' => 'Antarctica/DumontDUrville',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Antarctica/Macquarie' => [
                'timezone' => 'Antarctica/Macquarie',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Antarctica/Mawson' => [
                'timezone' => 'Antarctica/Mawson',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Antarctica/McMurdo' => [
                'timezone' => 'Antarctica/McMurdo',
                'gmt_offset' => '43200',
                'dst_offset' => '46800',
            ],
            'Antarctica/Palmer' => [
                'timezone' => 'Antarctica/Palmer',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'Antarctica/Rothera' => [
                'timezone' => 'Antarctica/Rothera',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'Antarctica/South_Pole' => [
                'timezone' => 'Antarctica/South_Pole',
                'gmt_offset' => '43200',
                'dst_offset' => '46800',
            ],
            'Antarctica/Syowa' => [
                'timezone' => 'Antarctica/Syowa',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Antarctica/Troll' => [
                'timezone' => 'Antarctica/Troll',
                'gmt_offset' => '0',
                'dst_offset' => '7200',
            ],
            'Antarctica/Vostok' => [
                'timezone' => 'Antarctica/Vostok',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Arctic/Longyearbyen' => [
                'timezone' => 'Arctic/Longyearbyen',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Asia/Aden' => [
                'timezone' => 'Asia/Aden',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Almaty' => [
                'timezone' => 'Asia/Almaty',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Amman' => [
                'timezone' => 'Asia/Amman',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Anadyr' => [
                'timezone' => 'Asia/Anadyr',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Asia/Aqtau' => [
                'timezone' => 'Asia/Aqtau',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Aqtobe' => [
                'timezone' => 'Asia/Aqtobe',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Ashgabat' => [
                'timezone' => 'Asia/Ashgabat',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Ashkhabad' => [
                'timezone' => 'Asia/Ashkhabad',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Baghdad' => [
                'timezone' => 'Asia/Baghdad',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Bahrain' => [
                'timezone' => 'Asia/Bahrain',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Baku' => [
                'timezone' => 'Asia/Baku',
                'gmt_offset' => '14400',
                'dst_offset' => '18000',
            ],
            'Asia/Bangkok' => [
                'timezone' => 'Asia/Bangkok',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Beirut' => [
                'timezone' => 'Asia/Beirut',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Bishkek' => [
                'timezone' => 'Asia/Bishkek',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Brunei' => [
                'timezone' => 'Asia/Brunei',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Calcutta' => [
                'timezone' => 'Asia/Calcutta',
                'gmt_offset' => '19800',
                'dst_offset' => '19800',
            ],
            'Asia/Chita' => [
                'timezone' => 'Asia/Chita',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Choibalsan' => [
                'timezone' => 'Asia/Choibalsan',
                'gmt_offset' => '28800',
                'dst_offset' => '32400',
            ],
            'Asia/Chongqing' => [
                'timezone' => 'Asia/Chongqing',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Chungking' => [
                'timezone' => 'Asia/Chungking',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Colombo' => [
                'timezone' => 'Asia/Colombo',
                'gmt_offset' => '19800',
                'dst_offset' => '19800',
            ],
            'Asia/Dacca' => [
                'timezone' => 'Asia/Dacca',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Damascus' => [
                'timezone' => 'Asia/Damascus',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Dhaka' => [
                'timezone' => 'Asia/Dhaka',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Dili' => [
                'timezone' => 'Asia/Dili',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Dubai' => [
                'timezone' => 'Asia/Dubai',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Asia/Dushanbe' => [
                'timezone' => 'Asia/Dushanbe',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Gaza' => [
                'timezone' => 'Asia/Gaza',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Harbin' => [
                'timezone' => 'Asia/Harbin',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Hebron' => [
                'timezone' => 'Asia/Hebron',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Ho_Chi_Minh' => [
                'timezone' => 'Asia/Ho_Chi_Minh',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Hong_Kong' => [
                'timezone' => 'Asia/Hong_Kong',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Hovd' => [
                'timezone' => 'Asia/Hovd',
                'gmt_offset' => '25200',
                'dst_offset' => '28800',
            ],
            'Asia/Irkutsk' => [
                'timezone' => 'Asia/Irkutsk',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Istanbul' => [
                'timezone' => 'Asia/Istanbul',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Jakarta' => [
                'timezone' => 'Asia/Jakarta',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Jayapura' => [
                'timezone' => 'Asia/Jayapura',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Jerusalem' => [
                'timezone' => 'Asia/Jerusalem',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Kabul' => [
                'timezone' => 'Asia/Kabul',
                'gmt_offset' => '16200',
                'dst_offset' => '16200',
            ],
            'Asia/Kamchatka' => [
                'timezone' => 'Asia/Kamchatka',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Asia/Karachi' => [
                'timezone' => 'Asia/Karachi',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Kashgar' => [
                'timezone' => 'Asia/Kashgar',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Kathmandu' => [
                'timezone' => 'Asia/Kathmandu',
                'gmt_offset' => '20700',
                'dst_offset' => '20700',
            ],
            'Asia/Katmandu' => [
                'timezone' => 'Asia/Katmandu',
                'gmt_offset' => '20700',
                'dst_offset' => '20700',
            ],
            'Asia/Khandyga' => [
                'timezone' => 'Asia/Khandyga',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Kolkata' => [
                'timezone' => 'Asia/Kolkata',
                'gmt_offset' => '19800',
                'dst_offset' => '19800',
            ],
            'Asia/Krasnoyarsk' => [
                'timezone' => 'Asia/Krasnoyarsk',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Kuala_Lumpur' => [
                'timezone' => 'Asia/Kuala_Lumpur',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Kuching' => [
                'timezone' => 'Asia/Kuching',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Kuwait' => [
                'timezone' => 'Asia/Kuwait',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Macao' => [
                'timezone' => 'Asia/Macao',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Macau' => [
                'timezone' => 'Asia/Macau',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Magadan' => [
                'timezone' => 'Asia/Magadan',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Asia/Makassar' => [
                'timezone' => 'Asia/Makassar',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Manila' => [
                'timezone' => 'Asia/Manila',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Muscat' => [
                'timezone' => 'Asia/Muscat',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Asia/Nicosia' => [
                'timezone' => 'Asia/Nicosia',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Novokuznetsk' => [
                'timezone' => 'Asia/Novokuznetsk',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Novosibirsk' => [
                'timezone' => 'Asia/Novosibirsk',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Omsk' => [
                'timezone' => 'Asia/Omsk',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Oral' => [
                'timezone' => 'Asia/Oral',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Phnom_Penh' => [
                'timezone' => 'Asia/Phnom_Penh',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Pontianak' => [
                'timezone' => 'Asia/Pontianak',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Pyongyang' => [
                'timezone' => 'Asia/Pyongyang',
                'gmt_offset' => '30600',
                'dst_offset' => '30600',
            ],
            'Asia/Qatar' => [
                'timezone' => 'Asia/Qatar',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Qyzylorda' => [
                'timezone' => 'Asia/Qyzylorda',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Rangoon' => [
                'timezone' => 'Asia/Rangoon',
                'gmt_offset' => '23400',
                'dst_offset' => '23400',
            ],
            'Asia/Riyadh' => [
                'timezone' => 'Asia/Riyadh',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Riyadh87' => [
                'timezone' => 'Asia/Riyadh87',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Riyadh88' => [
                'timezone' => 'Asia/Riyadh88',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Riyadh89' => [
                'timezone' => 'Asia/Riyadh89',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Asia/Saigon' => [
                'timezone' => 'Asia/Saigon',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Sakhalin' => [
                'timezone' => 'Asia/Sakhalin',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Asia/Samarkand' => [
                'timezone' => 'Asia/Samarkand',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Seoul' => [
                'timezone' => 'Asia/Seoul',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Shanghai' => [
                'timezone' => 'Asia/Shanghai',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Singapore' => [
                'timezone' => 'Asia/Singapore',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Srednekolymsk' => [
                'timezone' => 'Asia/Srednekolymsk',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Asia/Taipei' => [
                'timezone' => 'Asia/Taipei',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Tashkent' => [
                'timezone' => 'Asia/Tashkent',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Tbilisi' => [
                'timezone' => 'Asia/Tbilisi',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Asia/Tehran' => [
                'timezone' => 'Asia/Tehran',
                'gmt_offset' => '12600',
                'dst_offset' => '16200',
            ],
            'Asia/Tel_Aviv' => [
                'timezone' => 'Asia/Tel_Aviv',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Asia/Thimbu' => [
                'timezone' => 'Asia/Thimbu',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Thimphu' => [
                'timezone' => 'Asia/Thimphu',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Tokyo' => [
                'timezone' => 'Asia/Tokyo',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Ujung_Pandang' => [
                'timezone' => 'Asia/Ujung_Pandang',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Asia/Ulaanbaatar' => [
                'timezone' => 'Asia/Ulaanbaatar',
                'gmt_offset' => '28800',
                'dst_offset' => '32400',
            ],
            'Asia/Ulan_Bator' => [
                'timezone' => 'Asia/Ulan_Bator',
                'gmt_offset' => '28800',
                'dst_offset' => '32400',
            ],
            'Asia/Urumqi' => [
                'timezone' => 'Asia/Urumqi',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Asia/Vientiane' => [
                'timezone' => 'Asia/Vientiane',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Asia/Vladivostok' => [
                'timezone' => 'Asia/Vladivostok',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Asia/Yakutsk' => [
                'timezone' => 'Asia/Yakutsk',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Asia/Yekaterinburg' => [
                'timezone' => 'Asia/Yekaterinburg',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Asia/Yerevan' => [
                'timezone' => 'Asia/Yerevan',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Atlantic/Azores' => [
                'timezone' => 'Atlantic/Azores',
                'gmt_offset' => '-3600',
                'dst_offset' => '0',
            ],
            'Atlantic/Bermuda' => [
                'timezone' => 'Atlantic/Bermuda',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'Atlantic/Canary' => [
                'timezone' => 'Atlantic/Canary',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Atlantic/Cape_Verde' => [
                'timezone' => 'Atlantic/Cape_Verde',
                'gmt_offset' => '-3600',
                'dst_offset' => '-3600',
            ],
            'Atlantic/Faeroe' => [
                'timezone' => 'Atlantic/Faeroe',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Atlantic/Faroe' => [
                'timezone' => 'Atlantic/Faroe',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Atlantic/Jan_Mayen' => [
                'timezone' => 'Atlantic/Jan_Mayen',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Atlantic/Madeira' => [
                'timezone' => 'Atlantic/Madeira',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Atlantic/Reykjavik' => [
                'timezone' => 'Atlantic/Reykjavik',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Atlantic/South_Georgia' => [
                'timezone' => 'Atlantic/South_Georgia',
                'gmt_offset' => '-7200',
                'dst_offset' => '-7200',
            ],
            'Atlantic/St_Helena' => [
                'timezone' => 'Atlantic/St_Helena',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Atlantic/Stanley' => [
                'timezone' => 'Atlantic/Stanley',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'Australia/ACT' => [
                'timezone' => 'Australia/ACT',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/Adelaide' => [
                'timezone' => 'Australia/Adelaide',
                'gmt_offset' => '34200',
                'dst_offset' => '37800',
            ],
            'Australia/Brisbane' => [
                'timezone' => 'Australia/Brisbane',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Australia/Broken_Hill' => [
                'timezone' => 'Australia/Broken_Hill',
                'gmt_offset' => '34200',
                'dst_offset' => '37800',
            ],
            'Australia/Canberra' => [
                'timezone' => 'Australia/Canberra',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/Currie' => [
                'timezone' => 'Australia/Currie',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/Darwin' => [
                'timezone' => 'Australia/Darwin',
                'gmt_offset' => '34200',
                'dst_offset' => '34200',
            ],
            'Australia/Eucla' => [
                'timezone' => 'Australia/Eucla',
                'gmt_offset' => '31500',
                'dst_offset' => '31500',
            ],
            'Australia/Hobart' => [
                'timezone' => 'Australia/Hobart',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/LHI' => [
                'timezone' => 'Australia/LHI',
                'gmt_offset' => '37800',
                'dst_offset' => '39600',
            ],
            'Australia/Lindeman' => [
                'timezone' => 'Australia/Lindeman',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Australia/Lord_Howe' => [
                'timezone' => 'Australia/Lord_Howe',
                'gmt_offset' => '37800',
                'dst_offset' => '39600',
            ],
            'Australia/Melbourne' => [
                'timezone' => 'Australia/Melbourne',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/NSW' => [
                'timezone' => 'Australia/NSW',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/North' => [
                'timezone' => 'Australia/North',
                'gmt_offset' => '34200',
                'dst_offset' => '34200',
            ],
            'Australia/Perth' => [
                'timezone' => 'Australia/Perth',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Australia/Queensland' => [
                'timezone' => 'Australia/Queensland',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Australia/South' => [
                'timezone' => 'Australia/South',
                'gmt_offset' => '34200',
                'dst_offset' => '37800',
            ],
            'Australia/Sydney' => [
                'timezone' => 'Australia/Sydney',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/Tasmania' => [
                'timezone' => 'Australia/Tasmania',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/Victoria' => [
                'timezone' => 'Australia/Victoria',
                'gmt_offset' => '36000',
                'dst_offset' => '39600',
            ],
            'Australia/West' => [
                'timezone' => 'Australia/West',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Australia/Yancowinna' => [
                'timezone' => 'Australia/Yancowinna',
                'gmt_offset' => '34200',
                'dst_offset' => '37800',
            ],
            'Brazil/Acre' => [
                'timezone' => 'Brazil/Acre',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'Brazil/DeNoronha' => [
                'timezone' => 'Brazil/DeNoronha',
                'gmt_offset' => '-7200',
                'dst_offset' => '-7200',
            ],
            'Brazil/East' => [
                'timezone' => 'Brazil/East',
                'gmt_offset' => '-10800',
                'dst_offset' => '-7200',
            ],
            'Brazil/West' => [
                'timezone' => 'Brazil/West',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'CET' => [
                'timezone' => 'CET',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'CST6CDT' => [
                'timezone' => 'CST6CDT',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'Canada/Atlantic' => [
                'timezone' => 'Canada/Atlantic',
                'gmt_offset' => '-14400',
                'dst_offset' => '-10800',
            ],
            'Canada/Central' => [
                'timezone' => 'Canada/Central',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'Canada/East-Saskatchewan' => [
                'timezone' => 'Canada/East-Saskatchewan',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'Canada/Eastern' => [
                'timezone' => 'Canada/Eastern',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'Canada/Mountain' => [
                'timezone' => 'Canada/Mountain',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'Canada/Newfoundland' => [
                'timezone' => 'Canada/Newfoundland',
                'gmt_offset' => '-12600',
                'dst_offset' => '-9000',
            ],
            'Canada/Pacific' => [
                'timezone' => 'Canada/Pacific',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'Canada/Saskatchewan' => [
                'timezone' => 'Canada/Saskatchewan',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'Canada/Yukon' => [
                'timezone' => 'Canada/Yukon',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'Chile/Continental' => [
                'timezone' => 'Chile/Continental',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'Chile/EasterIsland' => [
                'timezone' => 'Chile/EasterIsland',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'Cuba' => [
                'timezone' => 'Cuba',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'EET' => [
                'timezone' => 'EET',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'EST' => [
                'timezone' => 'EST',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'EST5EDT' => [
                'timezone' => 'EST5EDT',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'Egypt' => [
                'timezone' => 'Egypt',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Eire' => [
                'timezone' => 'Eire',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Etc/GMT' => [
                'timezone' => 'Etc/GMT',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/GMT+0' => [
                'timezone' => 'Etc/GMT+0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/GMT+1' => [
                'timezone' => 'Etc/GMT+1',
                'gmt_offset' => '-3600',
                'dst_offset' => '-3600',
            ],
            'Etc/GMT+10' => [
                'timezone' => 'Etc/GMT+10',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Etc/GMT+11' => [
                'timezone' => 'Etc/GMT+11',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'Etc/GMT+12' => [
                'timezone' => 'Etc/GMT+12',
                'gmt_offset' => '-43200',
                'dst_offset' => '-43200',
            ],
            'Etc/GMT+2' => [
                'timezone' => 'Etc/GMT+2',
                'gmt_offset' => '-7200',
                'dst_offset' => '-7200',
            ],
            'Etc/GMT+3' => [
                'timezone' => 'Etc/GMT+3',
                'gmt_offset' => '-10800',
                'dst_offset' => '-10800',
            ],
            'Etc/GMT+4' => [
                'timezone' => 'Etc/GMT+4',
                'gmt_offset' => '-14400',
                'dst_offset' => '-14400',
            ],
            'Etc/GMT+5' => [
                'timezone' => 'Etc/GMT+5',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'Etc/GMT+6' => [
                'timezone' => 'Etc/GMT+6',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'Etc/GMT+7' => [
                'timezone' => 'Etc/GMT+7',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'Etc/GMT+8' => [
                'timezone' => 'Etc/GMT+8',
                'gmt_offset' => '-28800',
                'dst_offset' => '-28800',
            ],
            'Etc/GMT+9' => [
                'timezone' => 'Etc/GMT+9',
                'gmt_offset' => '-32400',
                'dst_offset' => '-32400',
            ],
            'Etc/GMT-0' => [
                'timezone' => 'Etc/GMT-0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/GMT-1' => [
                'timezone' => 'Etc/GMT-1',
                'gmt_offset' => '3600',
                'dst_offset' => '3600',
            ],
            'Etc/GMT-10' => [
                'timezone' => 'Etc/GMT-10',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Etc/GMT-11' => [
                'timezone' => 'Etc/GMT-11',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Etc/GMT-12' => [
                'timezone' => 'Etc/GMT-12',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Etc/GMT-13' => [
                'timezone' => 'Etc/GMT-13',
                'gmt_offset' => '46800',
                'dst_offset' => '46800',
            ],
            'Etc/GMT-14' => [
                'timezone' => 'Etc/GMT-14',
                'gmt_offset' => '50400',
                'dst_offset' => '50400',
            ],
            'Etc/GMT-2' => [
                'timezone' => 'Etc/GMT-2',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'Etc/GMT-3' => [
                'timezone' => 'Etc/GMT-3',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Etc/GMT-4' => [
                'timezone' => 'Etc/GMT-4',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Etc/GMT-5' => [
                'timezone' => 'Etc/GMT-5',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Etc/GMT-6' => [
                'timezone' => 'Etc/GMT-6',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Etc/GMT-7' => [
                'timezone' => 'Etc/GMT-7',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Etc/GMT-8' => [
                'timezone' => 'Etc/GMT-8',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Etc/GMT-9' => [
                'timezone' => 'Etc/GMT-9',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Etc/GMT0' => [
                'timezone' => 'Etc/GMT0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/Greenwich' => [
                'timezone' => 'Etc/Greenwich',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/UCT' => [
                'timezone' => 'Etc/UCT',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/UTC' => [
                'timezone' => 'Etc/UTC',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/Universal' => [
                'timezone' => 'Etc/Universal',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Etc/Zulu' => [
                'timezone' => 'Etc/Zulu',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Europe/Amsterdam' => [
                'timezone' => 'Europe/Amsterdam',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Andorra' => [
                'timezone' => 'Europe/Andorra',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Athens' => [
                'timezone' => 'Europe/Athens',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Belfast' => [
                'timezone' => 'Europe/Belfast',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Belgrade' => [
                'timezone' => 'Europe/Belgrade',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Berlin' => [
                'timezone' => 'Europe/Berlin',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Bratislava' => [
                'timezone' => 'Europe/Bratislava',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Brussels' => [
                'timezone' => 'Europe/Brussels',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Bucharest' => [
                'timezone' => 'Europe/Bucharest',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Budapest' => [
                'timezone' => 'Europe/Budapest',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Busingen' => [
                'timezone' => 'Europe/Busingen',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Chisinau' => [
                'timezone' => 'Europe/Chisinau',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Copenhagen' => [
                'timezone' => 'Europe/Copenhagen',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Dublin' => [
                'timezone' => 'Europe/Dublin',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Gibraltar' => [
                'timezone' => 'Europe/Gibraltar',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Guernsey' => [
                'timezone' => 'Europe/Guernsey',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Helsinki' => [
                'timezone' => 'Europe/Helsinki',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Isle_of_Man' => [
                'timezone' => 'Europe/Isle_of_Man',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Istanbul' => [
                'timezone' => 'Europe/Istanbul',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Jersey' => [
                'timezone' => 'Europe/Jersey',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Kaliningrad' => [
                'timezone' => 'Europe/Kaliningrad',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Kiev' => [
                'timezone' => 'Europe/Kiev',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Lisbon' => [
                'timezone' => 'Europe/Lisbon',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Ljubljana' => [
                'timezone' => 'Europe/Ljubljana',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/London' => [
                'timezone' => 'Europe/London',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Europe/Luxembourg' => [
                'timezone' => 'Europe/Luxembourg',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Madrid' => [
                'timezone' => 'Europe/Madrid',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Malta' => [
                'timezone' => 'Europe/Malta',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Mariehamn' => [
                'timezone' => 'Europe/Mariehamn',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Minsk' => [
                'timezone' => 'Europe/Minsk',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Europe/Monaco' => [
                'timezone' => 'Europe/Monaco',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Moscow' => [
                'timezone' => 'Europe/Moscow',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Europe/Nicosia' => [
                'timezone' => 'Europe/Nicosia',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Oslo' => [
                'timezone' => 'Europe/Oslo',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Paris' => [
                'timezone' => 'Europe/Paris',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Podgorica' => [
                'timezone' => 'Europe/Podgorica',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Prague' => [
                'timezone' => 'Europe/Prague',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Riga' => [
                'timezone' => 'Europe/Riga',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Rome' => [
                'timezone' => 'Europe/Rome',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Samara' => [
                'timezone' => 'Europe/Samara',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Europe/San_Marino' => [
                'timezone' => 'Europe/San_Marino',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Sarajevo' => [
                'timezone' => 'Europe/Sarajevo',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Simferopol' => [
                'timezone' => 'Europe/Simferopol',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Skopje' => [
                'timezone' => 'Europe/Skopje',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Sofia' => [
                'timezone' => 'Europe/Sofia',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Stockholm' => [
                'timezone' => 'Europe/Stockholm',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Tallinn' => [
                'timezone' => 'Europe/Tallinn',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Tirane' => [
                'timezone' => 'Europe/Tirane',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Tiraspol' => [
                'timezone' => 'Europe/Tiraspol',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Uzhgorod' => [
                'timezone' => 'Europe/Uzhgorod',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Vaduz' => [
                'timezone' => 'Europe/Vaduz',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Vatican' => [
                'timezone' => 'Europe/Vatican',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Vienna' => [
                'timezone' => 'Europe/Vienna',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Vilnius' => [
                'timezone' => 'Europe/Vilnius',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Volgograd' => [
                'timezone' => 'Europe/Volgograd',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Europe/Warsaw' => [
                'timezone' => 'Europe/Warsaw',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Zagreb' => [
                'timezone' => 'Europe/Zagreb',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Europe/Zaporozhye' => [
                'timezone' => 'Europe/Zaporozhye',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Europe/Zurich' => [
                'timezone' => 'Europe/Zurich',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Factory' => [
                'timezone' => 'Factory',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'GB' => [
                'timezone' => 'GB',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'GB-Eire' => [
                'timezone' => 'GB-Eire',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'GMT' => [
                'timezone' => 'GMT',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'GMT+0' => [
                'timezone' => 'GMT+0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'GMT-0' => [
                'timezone' => 'GMT-0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'GMT0' => [
                'timezone' => 'GMT0',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Greenwich' => [
                'timezone' => 'Greenwich',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'HST' => [
                'timezone' => 'HST',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Hongkong' => [
                'timezone' => 'Hongkong',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Iceland' => [
                'timezone' => 'Iceland',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Indian/Antananarivo' => [
                'timezone' => 'Indian/Antananarivo',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Indian/Chagos' => [
                'timezone' => 'Indian/Chagos',
                'gmt_offset' => '21600',
                'dst_offset' => '21600',
            ],
            'Indian/Christmas' => [
                'timezone' => 'Indian/Christmas',
                'gmt_offset' => '25200',
                'dst_offset' => '25200',
            ],
            'Indian/Cocos' => [
                'timezone' => 'Indian/Cocos',
                'gmt_offset' => '23400',
                'dst_offset' => '23400',
            ],
            'Indian/Comoro' => [
                'timezone' => 'Indian/Comoro',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Indian/Kerguelen' => [
                'timezone' => 'Indian/Kerguelen',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Indian/Mahe' => [
                'timezone' => 'Indian/Mahe',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Indian/Maldives' => [
                'timezone' => 'Indian/Maldives',
                'gmt_offset' => '18000',
                'dst_offset' => '18000',
            ],
            'Indian/Mauritius' => [
                'timezone' => 'Indian/Mauritius',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Indian/Mayotte' => [
                'timezone' => 'Indian/Mayotte',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'Indian/Reunion' => [
                'timezone' => 'Indian/Reunion',
                'gmt_offset' => '14400',
                'dst_offset' => '14400',
            ],
            'Iran' => [
                'timezone' => 'Iran',
                'gmt_offset' => '12600',
                'dst_offset' => '16200',
            ],
            'Israel' => [
                'timezone' => 'Israel',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'Jamaica' => [
                'timezone' => 'Jamaica',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'Japan' => [
                'timezone' => 'Japan',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Kwajalein' => [
                'timezone' => 'Kwajalein',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Libya' => [
                'timezone' => 'Libya',
                'gmt_offset' => '7200',
                'dst_offset' => '7200',
            ],
            'MET' => [
                'timezone' => 'MET',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'MST' => [
                'timezone' => 'MST',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'MST7MDT' => [
                'timezone' => 'MST7MDT',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'Mexico/BajaNorte' => [
                'timezone' => 'Mexico/BajaNorte',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'Mexico/BajaSur' => [
                'timezone' => 'Mexico/BajaSur',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'Mexico/General' => [
                'timezone' => 'Mexico/General',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'Mideast/Riyadh87' => [
                'timezone' => 'Mideast/Riyadh87',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Mideast/Riyadh88' => [
                'timezone' => 'Mideast/Riyadh88',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Mideast/Riyadh89' => [
                'timezone' => 'Mideast/Riyadh89',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'NZ' => [
                'timezone' => 'NZ',
                'gmt_offset' => '43200',
                'dst_offset' => '46800',
            ],
            'NZ-CHAT' => [
                'timezone' => 'NZ-CHAT',
                'gmt_offset' => '45900',
                'dst_offset' => '49500',
            ],
            'Navajo' => [
                'timezone' => 'Navajo',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'PRC' => [
                'timezone' => 'PRC',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'PST8PDT' => [
                'timezone' => 'PST8PDT',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Pacific/Apia' => [
                'timezone' => 'Pacific/Apia',
                'gmt_offset' => '46800',
                'dst_offset' => '50400',
            ],
            'Pacific/Auckland' => [
                'timezone' => 'Pacific/Auckland',
                'gmt_offset' => '43200',
                'dst_offset' => '46800',
            ],
            'Pacific/Bougainville' => [
                'timezone' => 'Pacific/Bougainville',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Chatham' => [
                'timezone' => 'Pacific/Chatham',
                'gmt_offset' => '45900',
                'dst_offset' => '49500',
            ],
            'Pacific/Chuuk' => [
                'timezone' => 'Pacific/Chuuk',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Pacific/Easter' => [
                'timezone' => 'Pacific/Easter',
                'gmt_offset' => '-18000',
                'dst_offset' => '-18000',
            ],
            'Pacific/Efate' => [
                'timezone' => 'Pacific/Efate',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Enderbury' => [
                'timezone' => 'Pacific/Enderbury',
                'gmt_offset' => '46800',
                'dst_offset' => '46800',
            ],
            'Pacific/Fakaofo' => [
                'timezone' => 'Pacific/Fakaofo',
                'gmt_offset' => '46800',
                'dst_offset' => '46800',
            ],
            'Pacific/Fiji' => [
                'timezone' => 'Pacific/Fiji',
                'gmt_offset' => '43200',
                'dst_offset' => '46800',
            ],
            'Pacific/Funafuti' => [
                'timezone' => 'Pacific/Funafuti',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Galapagos' => [
                'timezone' => 'Pacific/Galapagos',
                'gmt_offset' => '-21600',
                'dst_offset' => '-21600',
            ],
            'Pacific/Gambier' => [
                'timezone' => 'Pacific/Gambier',
                'gmt_offset' => '-32400',
                'dst_offset' => '-32400',
            ],
            'Pacific/Guadalcanal' => [
                'timezone' => 'Pacific/Guadalcanal',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Guam' => [
                'timezone' => 'Pacific/Guam',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Pacific/Honolulu' => [
                'timezone' => 'Pacific/Honolulu',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Pacific/Johnston' => [
                'timezone' => 'Pacific/Johnston',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Pacific/Kiritimati' => [
                'timezone' => 'Pacific/Kiritimati',
                'gmt_offset' => '50400',
                'dst_offset' => '50400',
            ],
            'Pacific/Kosrae' => [
                'timezone' => 'Pacific/Kosrae',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Kwajalein' => [
                'timezone' => 'Pacific/Kwajalein',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Majuro' => [
                'timezone' => 'Pacific/Majuro',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Marquesas' => [
                'timezone' => 'Pacific/Marquesas',
                'gmt_offset' => '-34200',
                'dst_offset' => '-34200',
            ],
            'Pacific/Midway' => [
                'timezone' => 'Pacific/Midway',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'Pacific/Nauru' => [
                'timezone' => 'Pacific/Nauru',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Niue' => [
                'timezone' => 'Pacific/Niue',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'Pacific/Norfolk' => [
                'timezone' => 'Pacific/Norfolk',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Noumea' => [
                'timezone' => 'Pacific/Noumea',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Pago_Pago' => [
                'timezone' => 'Pacific/Pago_Pago',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'Pacific/Palau' => [
                'timezone' => 'Pacific/Palau',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Pacific/Pitcairn' => [
                'timezone' => 'Pacific/Pitcairn',
                'gmt_offset' => '-28800',
                'dst_offset' => '-28800',
            ],
            'Pacific/Ponape' => [
                'timezone' => 'Pacific/Ponape',
                'gmt_offset' => '39600',
                'dst_offset' => '39600',
            ],
            'Pacific/Port_Moresby' => [
                'timezone' => 'Pacific/Port_Moresby',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Pacific/Rarotonga' => [
                'timezone' => 'Pacific/Rarotonga',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Pacific/Saipan' => [
                'timezone' => 'Pacific/Saipan',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Pacific/Samoa' => [
                'timezone' => 'Pacific/Samoa',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'Pacific/Tahiti' => [
                'timezone' => 'Pacific/Tahiti',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'Pacific/Tarawa' => [
                'timezone' => 'Pacific/Tarawa',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Tongatapu' => [
                'timezone' => 'Pacific/Tongatapu',
                'gmt_offset' => '46800',
                'dst_offset' => '46800',
            ],
            'Pacific/Truk' => [
                'timezone' => 'Pacific/Truk',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Pacific/Wake' => [
                'timezone' => 'Pacific/Wake',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Wallis' => [
                'timezone' => 'Pacific/Wallis',
                'gmt_offset' => '43200',
                'dst_offset' => '43200',
            ],
            'Pacific/Yap' => [
                'timezone' => 'Pacific/Yap',
                'gmt_offset' => '36000',
                'dst_offset' => '36000',
            ],
            'Poland' => [
                'timezone' => 'Poland',
                'gmt_offset' => '3600',
                'dst_offset' => '7200',
            ],
            'Portugal' => [
                'timezone' => 'Portugal',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'ROC' => [
                'timezone' => 'ROC',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'ROK' => [
                'timezone' => 'ROK',
                'gmt_offset' => '32400',
                'dst_offset' => '32400',
            ],
            'Singapore' => [
                'timezone' => 'Singapore',
                'gmt_offset' => '28800',
                'dst_offset' => '28800',
            ],
            'Turkey' => [
                'timezone' => 'Turkey',
                'gmt_offset' => '7200',
                'dst_offset' => '10800',
            ],
            'UCT' => [
                'timezone' => 'UCT',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'US/Alaska' => [
                'timezone' => 'US/Alaska',
                'gmt_offset' => '-32400',
                'dst_offset' => '-28800',
            ],
            'US/Aleutian' => [
                'timezone' => 'US/Aleutian',
                'gmt_offset' => '-36000',
                'dst_offset' => '-32400',
            ],
            'US/Arizona' => [
                'timezone' => 'US/Arizona',
                'gmt_offset' => '-25200',
                'dst_offset' => '-25200',
            ],
            'US/Central' => [
                'timezone' => 'US/Central',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'US/East-Indiana' => [
                'timezone' => 'US/East-Indiana',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'US/Eastern' => [
                'timezone' => 'US/Eastern',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'US/Hawaii' => [
                'timezone' => 'US/Hawaii',
                'gmt_offset' => '-36000',
                'dst_offset' => '-36000',
            ],
            'US/Indiana-Starke' => [
                'timezone' => 'US/Indiana-Starke',
                'gmt_offset' => '-21600',
                'dst_offset' => '-18000',
            ],
            'US/Michigan' => [
                'timezone' => 'US/Michigan',
                'gmt_offset' => '-18000',
                'dst_offset' => '-14400',
            ],
            'US/Mountain' => [
                'timezone' => 'US/Mountain',
                'gmt_offset' => '-25200',
                'dst_offset' => '-21600',
            ],
            'US/Pacific' => [
                'timezone' => 'US/Pacific',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'US/Pacific-New' => [
                'timezone' => 'US/Pacific-New',
                'gmt_offset' => '-28800',
                'dst_offset' => '-25200',
            ],
            'US/Samoa' => [
                'timezone' => 'US/Samoa',
                'gmt_offset' => '-39600',
                'dst_offset' => '-39600',
            ],
            'UTC' => [
                'timezone' => 'UTC',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'Universal' => [
                'timezone' => 'Universal',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
            'W-SU' => [
                'timezone' => 'W-SU',
                'gmt_offset' => '10800',
                'dst_offset' => '10800',
            ],
            'WET' => [
                'timezone' => 'WET',
                'gmt_offset' => '0',
                'dst_offset' => '3600',
            ],
            'Zulu' => [
                'timezone' => 'Zulu',
                'gmt_offset' => '0',
                'dst_offset' => '0',
            ],
        ];

        if ( ! is_null( $key ) && isset( $timezones[$key] ) ) {
            $date = new DateTime( 'now', new DateTimeZone( $key ) );
            $timezones[$key]['current_time'] = $date->format( 'Y-m-d H:i:s' );
            return $timezones[$key];
        }

        return $timezones;
    }
}

if ( ! class_exists( 'Zume_Global_Endpoints' ) ) {
    class Zume_Global_Endpoints {
        public $namespace = 'zume_system/v1';
        private static $_instance = null;
        public static function instance()
        {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __construct()
        {
            if ( dt_is_rest() ) {
                add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
                add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
            }
        }

        public function authorize_url( $authorized )
        {
            if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
                $authorized = true;
            }
            return $authorized;
        }
        public function add_api_routes()
        {
            $namespace = $this->namespace;
            /**
             * User Data
             */
            register_rest_route(
                $namespace, '/user_data/profile', [
                    'methods' => [ 'GET', 'POST' ],
                    'callback' => [ $this, 'user_data_profile' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/user_data/stage', [
                    'methods' => [ 'GET', 'POST' ],
                    'callback' => [ $this, 'user_data_stage' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );

            /**
             * Commitments API
             */
            register_rest_route(
                $namespace, '/commitment', [
                    'methods' => 'POST',
                    'callback' => [ $this, 'create_commitment' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/commitments', [
                    'methods' => 'GET',
                    'callback' => [ $this, 'list_commitments' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/commitment', [
                    'methods' => 'UPDATE',
                    'callback' => [ $this, 'update_commitment' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/commitment', [
                    'methods' => 'PUT',
                    'callback' => [ $this, 'complete_commitment' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/commitment', [
                    'methods' => 'DELETE',
                    'callback' => [ $this, 'delete_commitment' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            /**
             * HOST API
             */
            register_rest_route(
                $namespace, '/host', [
                    'methods' => 'GET',
                    'callback' => [ $this, 'list_host' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/host', [
                    'methods' => 'POST',
                    'callback' => [ $this, 'create_host' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/host', [
                    'methods' => 'DELETE',
                    'callback' => [ $this, 'delete_host' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
        }

        public function user_data_profile( WP_REST_Request $request ) {
            $user_id = get_current_user_id();
            return zume_get_user_profile( $user_id );
        }
        public function user_data_stage( WP_REST_Request $request )
        {
            $user_id = get_current_user_id();
            return zume_get_user_stage( $user_id );
        }

        public function create_commitment( WP_REST_Request $request )
        {
            global $wpdb, $table_prefix;
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( isset( $params['user_id'] ) ) {
                $user_id = zume_validate_user_id_request( $params['user_id'] );
                if ( is_wp_error( $user_id ) ) {
                    return $user_id;
                }
            } else {
                $user_id = get_current_user_id();
            }
            $contact_id = zume_get_user_contact_id( $user_id );

            $meta_value = [];

            if ( isset( $params['category'] ) && $params['category'] === 'custom' ) {
                $meta_value['note'] = $params['note'] ?? '';
            } else {
                $meta_value['question'] = $params['question'] ?? '';
                $meta_value['answer'] = $params['answer'] ?? '';
            }

            $fields = [
                'user_id' => $user_id,
                'post_id' => $contact_id,
                'meta_key' => 'tasks',
                'meta_value' => maybe_serialize( $meta_value ),
                'date' => $params['date'] ?? gmdate( 'Y-m-d H:i:s' ),
                'category' => $params['category'] ?? 'custom',
            ];

            $create = $wpdb->insert( 'zume_dt_post_user_meta', $fields );

            // check if 3 month plan is made
            if ( 'post_training_plan' === $fields['category'] ) {
                $log = zume_get_user_log( $user_id );
                $subtypes = array_column( $log, 'subtype' );
                if ( ! in_array( 'made_post_training_plan', $subtypes ) ) {
                    zume_log_insert( 'training', 'made_post_training_plan', [ 'user_id' => $user_id ], true );
                }
            }

            return $create;
        }
        public function list_commitments( WP_REST_Request $request )
        {
            $params = dt_recursive_sanitize_array( $request->get_params() );

            if ( isset( $params['user_id'] ) ) {
                $user_id = zume_validate_user_id_request( $params['user_id'] );
                if ( is_wp_error( $user_id ) ) {
                    return $user_id;
                }
            } else {
                $user_id = get_current_user_id();
            }

            $status = 'open';
            if ( isset( $params['status'] ) && !empty( $params['status'] ) ) {
                $status = $params['status'];
            }

            if ( isset( $params['category'] ) ) {
                $category = $params['category'];
            } else {
                $category = 'custom';
            }

            return zume_get_user_commitments( $user_id, $status, $category );
        }
        public function update_commitment( WP_REST_Request $request )
        {
            global $wpdb, $table_prefix;
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['id'], $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'Id, user_id required', array( 'status' => 401 ) );
            }

            $user_id = zume_validate_user_id_request( $params['user_id'] );
            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            $row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM zume_dt_post_user_meta WHERE id = %d AND user_id = %d', $params['id'], $user_id ), ARRAY_A );
            $data = maybe_unserialize( $row['meta_value'] );
            if ( isset( $params['question'] ) && !empty( $params['question'] ) ) {
                $data['question'] = $params['question'];
            }
            if ( isset( $params['answer'] ) ) {
                $data['answer'] = $params['answer'];
            }
            if ( isset( $params['note'] ) ) {
                $data['note'] = $params['note'];
            }
            $data = maybe_serialize( $data );
            $where = [
                'id' => $params['id'],
                'user_id' => $user_id,
            ];

            $update = $wpdb->update( 'zume_dt_post_user_meta', [ 'meta_value' => $data ], $where );
            return $update;
        }
        public function complete_commitment( WP_REST_Request $request )
        {
            global $wpdb, $table_prefix;
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['id'], $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'Id and user_id required', array( 'status' => 401 ) );
            }

            $user_id = zume_validate_user_id_request( $params['user_id'] );
            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            $row = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM zume_dt_post_user_meta WHERE id = %d AND user_id = %d', $params['id'], $user_id ), ARRAY_A );
            $data = maybe_unserialize( $row['meta_value'] );
            $data['status'] = 'closed';
            $data = maybe_serialize( $data );
            $where = [
                'id' => $params['id'],
                'user_id' => $user_id,
            ];

            $update = $wpdb->update( 'zume_dt_post_user_meta', [ 'meta_value' => $data ], $where );

            if ( $this->check_post_training_plan_completed() ) {
                zume_log_insert( 'training', 'completed_3_month_plan', log_once: true );
            }

            return $update;
        }
        public function delete_commitment( WP_REST_Request $request )
        {
            global $wpdb, $table_prefix;
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['id'], $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'Id and user_id required', array( 'status' => 401 ) );
            }

            $user_id = zume_validate_user_id_request( $params['user_id'] );

            $fields = [
                'id' => $params['id'],
                'user_id' => $user_id,
            ];

            $delete = $wpdb->delete( 'zume_dt_post_user_meta', $fields );

            if ( $this->check_post_training_plan_completed() ) {
                zume_log_insert( 'training', 'completed_3_month_plan', log_once: true );
            }

            return $delete;
        }

        public function check_post_training_plan_completed(): bool {
            $commitments = zume_get_user_commitments( category: 'post_training_plan' );

            if ( empty( $commitments ) ) {
                return true;
            }

            return false;
        }

        /** Host */
        public function list_host( WP_REST_Request $request ) {
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'User_id required.', array( 'status' => 401 ) );
            }
            $user_id = zume_validate_user_id_request( $params['user_id'] );
            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            return zume_get_user_host( $user_id );
        }
        public function create_host( WP_REST_Request $request ) {
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['type'], $params['subtype'], $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'Type, subtype, and user_id required.', array( 'status' => 401 ) );
            }
            if ( 'training' !== $params['type'] ) {
                return new WP_Error( __METHOD__, 'Type must be training.', array( 'status' => 401 ) );
            }
            $user_id = zume_validate_user_id_request( $params['user_id'] );
            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            return zume_log_insert( $params['type'], $params['subtype'], [ 'user_id' => $user_id ] );
        }
        public function delete_host( WP_REST_Request $request ) {
            global $wpdb, $table_prefix;
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( ! isset( $params['type'], $params['subtype'], $params['user_id'] ) ) {
                return new WP_Error( __METHOD__, 'Type, subtype, and user_id required.', array( 'status' => 401 ) );
            }
            if ( 'training' !== $params['type'] ) {
                return new WP_Error( __METHOD__, 'Type must be training.', array( 'status' => 401 ) );
            }
            $user_id = zume_validate_user_id_request( $params['user_id'] );
            if ( is_wp_error( $user_id ) ) {
                return $user_id;
            }

            $fields = [
                'type' => $params['type'],
                'subtype' => $params['subtype'],
                'user_id' => $user_id,
            ];

            $delete = $wpdb->delete( $table_prefix.'dt_reports', $fields );

            return $delete;
        }
    }
    Zume_Global_Endpoints::instance();
}

/**
 * Checks if current user has the right to view the user id
 * - valid if user id matches current user id
 * - valid if user id does not match current user id and current user can list or edit users
 * - valid if user id does not match current user id and current user is a user coach
 * - valid if user id does not match current user id and current user has been shared the user id
 * - invalid if user id does not match current user id and current user does not have permissions
 *
 * @param $user_id
 * @return int|WP_Error
 */
if ( ! function_exists( 'zume_validate_user_id_request' ) ) {
    function zume_validate_user_id_request( $user_id ) {
        if ( !is_user_logged_in() ) {
            return new WP_Error( __METHOD__, 'User not logged in', array( 'status' => 401 ) );
        }
        $profile = zume_get_user_profile( $user_id );
        if ( $profile ) {
            $current_user_id = get_current_user_id();
            if ( (int) $profile['user_id'] === $current_user_id ) {
                // if user id matches current user id
                return (int) $user_id;
            } else if ( (int) $profile['user_id'] !== $current_user_id && ( current_user_can( 'dt_list_users' ) || current_user_can( 'dt_edit_users' ) ) ) {
                // if user id does not match current user id and current user can list or edit users
                return (int) $user_id;
            } else if ( (int) $profile['user_id'] !== $current_user_id && in_array( $current_user_id, array_keys( $profile['coaches'] ) ) ) {
                // if user id does not match current user id and current user is a user coach
                return (int) $user_id;
            } else if ( $profile['coaching_contact_id '] ) {
                global $wpdb;
                $is_shared = $wpdb->get_var( $wpdb->prepare( 'SELECT count(*) FROM zume_dt_share WHERE user_id = %d AND post_id = %d', $current_user_id, $profile['coaching_contact_id'] ) );
                if ( $is_shared ) {
                    return (int) $user_id;
                }
            }
            return new WP_Error( __METHOD__, 'Permissions not found for this user_id', array( 'status' => 401 ) );
        } else {
            return new WP_Error( __METHOD__, 'User not found', array( 'status' => 401 ) );
        }
    }
}
if ( ! function_exists( 'zume_log_insert' ) ) {
    function zume_log_insert( string $type, string $subtype, array $data = [], $log_once = false )
    {
        return Zume_System_Log_API::log( $type, $subtype, $data, $log_once );
    }
}
if ( ! function_exists( 'zume_log_delete' ) ) {
    function zume_log_delete( string $type, string $subtype, array $data = [] )
    {
        return Zume_System_Log_API::delete( $type, $subtype, $data );
    }
}
if ( ! function_exists( 'zume_log_update' ) ) {
    function zume_log_update( array $where, array $data = [] )
    {
        return Zume_System_Log_API::update( $where, $data );
    }
}

if ( ! class_exists( 'Zume_System_Log_API' ) ) {
    // phpcs:ignore
    class Zume_System_Log_API
    {
        public $namespace = 'zume_system/v1';
        private static $_instance = null;

        public static function instance()
        {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function __construct()
        {
            if ( dt_is_rest() ) {
                add_action( 'rest_api_init', [ $this, 'add_api_routes' ] );
                add_filter( 'dt_allow_rest_access', [ $this, 'authorize_url' ], 10, 1 );
            }
        }

        public function add_api_routes()
        {
            $namespace = $this->namespace;

            register_rest_route(
                $namespace, '/log', [
                    'methods' => [ 'POST' ],
                    'callback' => [ $this, 'rest_log' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
            register_rest_route(
                $namespace, '/log_anonymous', [
                    'methods' => [ 'POST' ],
                    'callback' => [ $this, 'rest_log_anonymous' ],
                    'permission_callback' => '__return_true',
                ]
            );
            register_rest_route(
                $namespace, '/log', [
                    'methods' => [ 'GET' ],
                    'callback' => [ $this, 'get_log' ],
                    'permission_callback' => 'is_user_logged_in',
                ]
            );
        }

        public function rest_log( WP_REST_Request $request )
        {
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( !isset( $params['type'], $params['subtype'] ) ) {
                return new WP_Error( __METHOD__, 'Missing required parameters: type, subtype.', [ 'status' => 400 ] );
            }
            $log_once = false;
            if ( isset( $params['log_once'] ) ) {
                $log_once = true;
            }
            return self::log( $params['type'], $params['subtype'], $params, $log_once );
        }

        public function rest_log_anonymous( WP_REST_Request $request )
        {
            $params = dt_recursive_sanitize_array( $request->get_params() );
            if ( !isset( $params['type'], $params['subtype'] ) ) {
                return new WP_Error( __METHOD__, 'Missing required parameters: type, subtype.', [ 'status' => 400 ] );
            }
            return self::log_anonymous( $params['type'], $params['subtype'], $params, true );
        }

        public function get_log( WP_REST_Request $request )
        {
            return zume_get_user_log( get_current_user_id() );
        }

        /**
         * @param string $type
         * @param string $subtype
         * @param array $data
         * @return array|WP_Error
         */
        public static function log( string $type, string $subtype, array $data = [], bool $log_once = false )
        {
            $added_log = [];
            if ( !isset( $type, $subtype ) ) {
                return new WP_Error( __METHOD__, 'Missing required parameters: type, subtype.', [ 'status' => 400 ] );
            }
            $data = dt_recursive_sanitize_array( $data );

            $report = [
                'user_id' => null,
                'post_id' => null,
                'parent_id' => null,
                'post_type' => 'zume',
                'type' => $type,
                'subtype' => $subtype,
                'value' => 0,
                'payload' => null,
                'lng' => null,
                'lat' => null,
                'level' => null,
                'label' => null,
                'grid_id' => null,
                'time_end' => time(),
                'hash' => null,
                'language_code' => null,
            ];


            self::_prepare_user_id( $report, $data );
            self::_prepare_language( $report, $data );
            self::_prepare_location( $report, $data );

            // if no user_id found, just insert anonymous log
            if ( empty( $report['user_id'] ) ) {
                $report['hash'] = hash( 'sha256', maybe_serialize( $report ) . time() );
                $added_log[] = self::insert( $report, true, false );
                return $added_log;
            }

            $log = zume_get_user_log( $report['user_id'] );

            if ( $log_once ) {
                $already_logged = array_filter($log, function ( $item ) use ( $type, $subtype, $report ) {
                    return $item['type'] === $type && $item['subtype'] === $subtype;
                });
                if ( !empty( $already_logged ) ) {
                    return [ 'already_logged' => true ];
                }
            }

            self::_prepare_post_id( $report, $data );
            self::_prepare_time_end( $report, $data );
            self::_prepare_value( $report, $data, $log );
            self::_prepare_payload( $report, $data, $log );

            $report['hash'] = hash( 'sha256', maybe_serialize( $report ) . time() );
            $added_log[] = self::insert( $report, true, $log_once );

            if ( $log_once && self::_needs_to_be_logged( $log, $type, $subtype ) ) {
                $log[] = $report;
            }

            // run additional actions
            $additional_logs = [];
            self::_add_additional_log_actions( $added_log, $additional_logs, $report, $log );

            $log = [
                ...$log,
                ...$additional_logs,
            ];
            self::_check_for_stage_change( $added_log, $report['user_id'], $report, $log );

            do_action( 'zume_verify_encouragement_plan', $report['user_id'], $report['type'], $report['subtype'] );

            return $added_log;
        }

        private static function _prepare_user_id( &$report, $data )
        {
            if ( isset( $data['user_id'] ) && !empty( $data['user_id'] ) ) {
                $report['user_id'] = absint( $data['user_id'] );
            } else if ( is_user_logged_in() ) {
                $report['user_id'] = get_current_user_id();
            } else {
                $report['user_id'] = 0;
            }
            return $report;
        }

        private static function _prepare_location( &$report, $data )
        {

            if ( isset( $data['lng'], $data['lat'], $data['level'], $data['label'], $data['grid_id'] ) ) {
                $report['lng'] = $data['lng'];
                $report['lat'] = $data['lat'];
                $report['level'] = $data['level'];
                $report['label'] = $data['label'];
                $report['grid_id'] = $data['grid_id'];

                return $report;
            } else {
                $location = zume_get_user_location( $report['user_id'], true );
                if ( !empty( $location ) ) {
                    $report['lng'] = $location['lng'];
                    $report['lat'] = $location['lat'];
                    $report['level'] = $location['level'];
                    $report['label'] = $location['label'];
                    $report['grid_id'] = $location['grid_id'];

                    return $report;
                }
            }

            error_log( __METHOD__ );
            error_log( 'Silent log warning: Failing to generate a viable location lookup.' );
            $report['lng'] = null;
            $report['lat'] = null;
            $report['level'] = null;
            $report['label'] = null;
            $report['grid_id'] = null;

            return $report;
        }

        private static function _prepare_post_id( &$report, $data )
        {

            if ( isset( $data['post_id'] ) && !empty( $data['post_id'] ) ) {
                $report['post_id'] = absint( $data['post_id'] );
            } else if ( isset( $report['user_id'] ) && !empty( $report['user_id'] ) ) {
                $contact = zume_get_user_contact_id( $report['user_id'] );
                if ( !is_wp_error( $contact ) && !empty( $contact ) ) {
                    $report['post_id'] = $contact;
                } else {
                    $report['post_id'] = 0;
                }
            } else {
                $report['post_id'] = 0;
            }

            return $report;
        }

        private static function _prepare_language( &$report, $data )
        {
            if ( isset( $data['language_code'] ) && !empty( $data['language_code'] ) ) {
                $report['language_code'] = $data['language_code'];
            } else if ( isset( $report['user_id'] ) && !empty( $report['user_id'] ) ) {
                $language = zume_get_user_language( $report['user_id'] );
                if ( empty( $language ) ) {
                    $report['language_code'] = zume_current_language();
                }
                else {
                    $report['language_code'] = $language['code'];
                }
            } else {
                $report['language_code'] = zume_current_language();
            }

            return $report;
        }

        private static function _prepare_time_end( &$report, $data )
        {
            $report['time_end'] = time();

            if ( isset( $data['time_end'] ) && !empty( $data['time_end'] && is_numeric( $data['time_end'] ) ) ) {
                $report['time_end'] = $data['time_end'];
            }

            return $report;
        }

        private static function _prepare_value( &$report, $data, $log )
        {

            if ( isset( $data['value'] ) && !empty( $data['value'] ) ) {
                $report['value'] = $data['value'];
            } else {
                $stage = zume_get_user_stage( $report['user_id'], $log );
                $report['value'] = $stage['value'];
            }

            return $report;
        }

        private static function _prepare_payload( &$report, $data, $log ) {
            if ( isset( $data['payload'] ) && !empty( $data['payload'] ) ) {
                $report['payload'] = $data['payload'];
            }

            return $report;
        }

        public static function _add_additional_log_actions( &$added_log, &$additional_logs, $data, $log )
        {

            $type = $data['type'];
            $subtype = $data['subtype'];

            $_pos = strpos( $subtype, '_' );
            $pre = substr( $subtype, 0, $_pos + 1 );

            /**
             * business logic:
             * - if a user joins an online training, create a plan_created log entry
             */
            if ( 'training' === $type && ( 'joined_online_training' === $subtype || 'joined_friends_training' === $subtype ) ) {
                $data_item = $data;
                $data_item['type'] = 'training';
                $data_item['subtype'] = 'plan_created';
                $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                $added_log[] = self::insert( $data_item, true, false );
                $additional_logs[] = $data_item;

                /* Mute the celebration for creating a plan, as we have only joined not created a training */
                if ( self::_needs_to_be_logged( $log, 'system', 'celebrate_plan_created' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'system';
                    $data_item['subtype'] = 'celebrate_plan_created';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, false );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user completes a plan, create a made_post_training_plan log entry
             */
            if ( 'training' === $type && 'made_post_training_plan' === $subtype ) { // @todo if think this logic is not working
                if ( self::_needs_to_be_logged( $log, 'training', 'made_post_training_plan' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'made_post_training_plan';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user completes name and location parts of their profile, create a set_partial_profile log
             */
            if ( 'system' === $type & str_contains( $subtype, 'set_profile_' ) ) {
                if (
                    self::_already_logged( $log, 'system', 'set_profile_name' ) &&
                    self::_already_logged( $log, 'system', 'set_profile_location' ) &&
                    self::_needs_to_be_logged( $log, 'system', 'set_partial_profile' )
                ) {
                    $data_item = $data;
                    $data_item['type'] = 'system';
                    $data_item['subtype'] = 'set_partial_profile';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user completes all parts of their profile, create a set_profile log
             */
            if ( 'system' === $type & str_contains( $subtype, 'set_profile_' ) ) {
                if (
                    self::_already_logged( $log, 'system', 'set_profile_name' ) &&
                    self::_already_logged( $log, 'system', 'set_profile_phone' ) &&
                    self::_already_logged( $log, 'system', 'set_profile_location' ) &&
                    self::_needs_to_be_logged( $log, 'system', 'set_profile' )
                ) {
                    $data_item = $data;
                    $data_item['type'] = 'system';
                    $data_item['subtype'] = 'set_profile';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user submits a practitioner report, create a first_practitioner_report log entry if needed
             */
            if ( 'practicing' === $type && 'practitioner_report' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'practicing', 'first_practitioner_report' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'practicing';
                    $data_item['subtype'] = 'first_practitioner_report';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user submits a training HOST log, create low level training log entries if needed
             */
            else if ( 'training' === $type && str_contains( $subtype, 'trained' ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'shared' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'shared';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'obeyed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'obeyed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'heard' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && str_contains( $subtype, 'shared' ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'obeyed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'obeyed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'heard' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && str_contains( $subtype, 'obeyed' ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', $pre . 'heard' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = $pre . 'heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'coaching' === $type && str_contains( $subtype, 'launching' ) ) {
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'watching' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'watching';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'assisting' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'assisting';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'modeling' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'modeling';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'coaching' === $type && str_contains( $subtype, 'watching' ) ) {
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'assisting' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'assisting';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'modeling' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'modeling';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'coaching' === $type && str_contains( $subtype, 'assisting' ) ) {
                if ( self::_needs_to_be_logged( $log, 'coaching', $pre . 'modeling' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'coaching';
                    $data_item['subtype'] = $pre . 'modeling';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user checks in to a training session, then add all the training items covered in that session
             */
            if ( 'training' === $type && ( 'set_a_01' === $subtype || 'set_c_1' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '1_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '1_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '2_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '2_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '3_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '3_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '4_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '4_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '5_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '5_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_02' === $subtype || 'set_c_1' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '6_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '6_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '7_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '7_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '8_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '8_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_03' === $subtype || 'set_c_2' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '9_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '9_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '10_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '10_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '11_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '11_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_04' === $subtype || 'set_c_2' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '12_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '12_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '13_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '13_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '14_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '14_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '15_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '15_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '16_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '16_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_05' === $subtype || 'set_c_3' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '17_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '17_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '18_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '18_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '19_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '19_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_06' === $subtype || 'set_c_3' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '20_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '20_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '21_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '21_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_07' === $subtype || 'set_c_4' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '22_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '22_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_08' === $subtype || 'set_c_4' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '23_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '23_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_09' === $subtype || 'set_c_5' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '24_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '24_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '25_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '25_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '26_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '26_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '27_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '27_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }
            if ( 'training' === $type && ( 'set_a_10' === $subtype || 'set_c_5' === $subtype ) ) {
                if ( self::_needs_to_be_logged( $log, 'training', '28_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '28_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '29_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '29_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '30_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '30_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '31_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '31_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '32_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '32_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if a user checks in to a training session, then add all the training items covered in that session
             */
            if ( 'training' === $type && 'set_b_01' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '1_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '1_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '2_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '2_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '3_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '3_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_02' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '4_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '4_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_03' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '5_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '5_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_04' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '6_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '6_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '8_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '8_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_05' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '7_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '7_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_06' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '9_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '9_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '13_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '13_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '10_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '10_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_07' === $subtype ) { // this session is basically practice for the previous session
                if ( self::_needs_to_be_logged( $log, 'training', '10_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '10_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_08' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '11_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '11_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '12_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '12_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_09' === $subtype ) { // this session is basically practice for the previous session
                if ( self::_needs_to_be_logged( $log, 'training', '10_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '10_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_10' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '14_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '14_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '15_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '15_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '16_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '16_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_11' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '17_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '17_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_12' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '18_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '18_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '19_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '19_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_13' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '20_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '20_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '21_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '21_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_14' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '21_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '21_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_15' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '22_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '22_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '23_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '23_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_16' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '24_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '24_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '25_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '25_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '26_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '26_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_17' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '27_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '27_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_18' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '28_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '28_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '29_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '29_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_19' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '30_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '30_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            } else if ( 'training' === $type && 'set_b_20' === $subtype ) {
                if ( self::_needs_to_be_logged( $log, 'training', '31_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '31_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', '32_heard' ) ) {
                    $data_item = $data;
                    $data_item['subtype'] = '32_heard';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
                if ( self::_needs_to_be_logged( $log, 'training', 'training_completed' ) ) {
                    $data_item = $data;
                    $data_item['type'] = 'training';
                    $data_item['subtype'] = 'training_completed';
                    $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                    $added_log[] = self::insert( $data_item, true, true );
                    $additional_logs[] = $data_item;
                }
            }

            /**
             * business logic:
             * - if user has shared most lessons and trained others on a few concepts, then they can be considered a practitioner
             * - if coach has moved to watching status all key concepts, then they can be considered a practitioner
             */
            if ( 'training' === $type ) {
                $host = zume_get_user_host( $data['user_id'] );
                if ( $host['totals']['s'] >= 25 && $host['totals']['t'] >= 5 ) {
                    if ( self::_needs_to_be_logged( $log, 'training', 'host_completed' ) ) {
                        $data_item = $data;
                        $data_item['type'] = 'training';
                        $data_item['subtype'] = 'host_completed';
                        $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                        $added_log[] = self::insert( $data_item, true, true );
                        $additional_logs[] = $data_item;
                    }
                }
            }
            if ( 'coaching' === $type ) {
                $mawl = zume_get_user_mawl( $data['user_id'] );
                if ( $mawl['totals']['m'] >= 16 && $mawl['totals']['a'] >= 16 && $mawl['totals']['w'] >= 16 ) {
                    if ( self::_needs_to_be_logged( $log, 'coaching', 'mawl_completed' ) ) {
                        $data_item = $data;
                        $data_item['type'] = 'coaching';
                        $data_item['subtype'] = 'mawl_completed';
                        $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                        $added_log[] = self::insert( $data_item, true, true );
                        $additional_logs[] = $data_item;
                    }
                }
            }

            /**
             * business logic:
             * - if a user is logged in, and the system has not yet logged that the user has registered, then log it
             */
            if ( is_user_logged_in() && self::_needs_to_be_logged( $log, 'training', 'registered' ) ) {
                $data_item = $data;
                $data_item['type'] = 'training';
                $data_item['subtype'] = 'registered';
                $data_item['hash'] = hash( 'sha256', maybe_serialize( $data_item ) . time() );
                $added_log[] = self::insert( $data_item, true, true );
                $additional_logs[] = $data_item;
            }

            return $added_log;
        }

        public static function insert( array $args, bool $save_hash = true, bool $duplicate_check = true )
        {
            global $wpdb;
            if ( !isset( $args['type'] ) ) {
                return false;
            }

            $args = wp_parse_args(
                $args,
                [
                    'user_id' => null,
                    'parent_id' => null,
                    'post_id' => null,
                    'post_type' => null,
                    'type' => null, // required
                    'subtype' => null,
                    'payload' => null,
                    'value' => 1,
                    'lng' => null,
                    'lat' => null,
                    'level' => null,
                    'label' => null,
                    'grid_id' => null,
                    'time_begin' => null,
                    'time_end' => null,
                    'hash' => null,
                    'language_code' => null,
                ]
            );

            if ( $save_hash ) {
                if ( empty( $args['hash'] ) ) {
                    $args['hash'] = hash( 'sha256', maybe_serialize( $args ) );
                }

                if ( $duplicate_check ) {
                    // Make sure no duplicate is found.
                    $duplicate_found = $wpdb->get_row(
                        $wpdb->prepare(
                            'SELECT
                                        `id`
                                    FROM
                                        zume_dt_reports
                                    WHERE hash = %s AND hash IS NOT NULL;',
                            $args['hash']
                        )
                    );
                    if ( $duplicate_found ) {
                        return false;
                    }
                }
            }

            $args['timestamp'] = time();

            if ( is_array( $args['payload'] ) || is_object( $args['payload'] ) ) {
                $args['payload'] = serialize( $args['payload'] );
            }

            $wpdb->insert(
                'zume_dt_reports',
                [
                    'user_id' => $args['user_id'],
                    'parent_id' => $args['parent_id'],
                    'post_id' => $args['post_id'],
                    'post_type' => $args['post_type'],
                    'type' => $args['type'],
                    'subtype' => $args['subtype'],
                    'payload' => $args['payload'],
                    'value' => $args['value'],
                    'lng' => $args['lng'],
                    'lat' => $args['lat'],
                    'level' => $args['level'],
                    'label' => $args['label'],
                    'grid_id' => $args['grid_id'],
                    'time_begin' => $args['time_begin'],
                    'time_end' => $args['time_end'],
                    'timestamp' => time(),
                    'hash' => $args['hash'],
                    'language_code' => $args['language_code'],
                ],
                [
                    '%d', // user_id
                    '%d', // parent_id
                    '%d', // post_id
                    '%s', // post_type
                    '%s', // type
                    '%s', // subtype
                    '%s', // payload
                    '%d', // value
                    '%f', // lng
                    '%f', // lat
                    '%s', // level
                    '%s', // label
                    '%d', // grid_id
                    '%d', // time_begin
                    '%d', // time_end
                    '%d', // timestamp
                    '%s', // hash
                    '%s', // language code
                ]
            );

            $report_id = $wpdb->insert_id;
            if ( !$report_id ) {
                return $report_id;
            } else {
                $args['id'] = $report_id;
            }


            return $report_id;
        }

        /**
         * Update a log
         * @param array $where
         * @param array $data
         * @return bool|int
         */
        public static function update( array $where, array $data ) {
            global $wpdb;

            $where_format = self::make_format( $where );
            $format = self::make_format( $data );

            $updates = $wpdb->update( 'zume_dt_reports', $data, $where, $format, $where_format );

            return $updates;
        }

        /**
         * Delete a log from the reports
         * @param string $type
         * @param string $subtype
         * @param array $data
         * @return int|bool
         */
        public static function delete( string $type, string $subtype, array $data = [] ) {
            global $wpdb;

            $where = [
                'type' => $type,
                'subtype' => $subtype,
                'user_id' => $data['user_id'] ?? get_current_user_id(),
            ];

            unset( $data['user_id'] );

            $where = [
                ...$where,
                ...$data,
            ];

            $where_format = self::make_format( $where );

            $deleted = $wpdb->delete( 'zume_dt_reports', $where, $where_format );

            return $deleted;
        }

        public static function make_format( $args ) {
            $format = [];

            foreach ( $args as $key => $value ) {
                if ( in_array( $key, [ 'user_id', 'parent_id', 'post_id', 'value', 'grid_id', 'time_begin', 'time_end', 'timestamp' ] ) ) {
                    $format[] = '%d';
                }
                if ( in_array( $key, [ 'post_type', 'type', 'subtype', 'payload', 'level', 'label', 'hash', 'language_code' ] ) ) {
                    $format[] = '%s';
                }
                if ( in_array( $key, [ 'lng', 'lat' ] ) ) {
                    $format[] = '%f';
                }
            }

            return $format;
        }

        /**
         * @param string $type
         * @param string $subtype
         * @param array $data
         * @return array|WP_Error
         */
        public static function log_anonymous( string $type, string $subtype, array $data = [], bool $log_once = false )
        {
            $added_log = [];
            if ( !isset( $type, $subtype ) ) {
                return new WP_Error( __METHOD__, 'Missing required parameters: type, subtype.', [ 'status' => 400 ] );
            }
            $data = dt_recursive_sanitize_array( $data );

            $report = [
                'user_id' => null,
                'post_id' => null,
                'parent_id' => null,
                'post_type' => 'zume',
                'type' => $type,
                'subtype' => $subtype,
                'value' => 0,
                'payload' => null,
                'lng' => null,
                'lat' => null,
                'level' => null,
                'label' => null,
                'grid_id' => null,
                'time_end' => null,
                'hash' => null,
                'language_code' => null,
            ];

            $report['payload'] = DT_Ipstack_API::get_real_ip_address();

            if ( isset( $data['language_code'] ) ) {
                $report['language_code'] = $data['language_code'];
            } else {
                $url = zume_get_url_pieces();
                $report['language_code'] = $url['lang_code'];
            }


            $result = DT_Ipstack_API::get_location_grid_meta_from_current_visitor();
            if ( ! empty( $result ) ) {
                $report['lng'] = $result['lng'];
                $report['lat'] = $result['lat'];
                $report['level'] = $result['level'];
                $report['label'] = $result['label'];
                $report['grid_id'] = $result['grid_id'];
            }

            $report['hash'] = hash( 'sha256', maybe_serialize( $report ) );

            $report['time_end'] = time();

            $report['payload'] = null; // clear payload ip address

            $added_log[] = self::insert_anonymous( $report );

            return $added_log;
        }

        public static function insert_anonymous( array $args, bool $save_hash = true, bool $duplicate_check = true )
        {
            global $wpdb;
            if ( !isset( $args['type'] ) ) {
                return false;
            }

            $args = wp_parse_args(
                $args,
                [
                    'user_id' => null,
                    'parent_id' => null,
                    'post_id' => null,
                    'post_type' => null,
                    'type' => null, // required
                    'subtype' => null,
                    'payload' => null,
                    'value' => 1,
                    'lng' => null,
                    'lat' => null,
                    'level' => null,
                    'label' => null,
                    'grid_id' => null,
                    'time_begin' => null,
                    'time_end' => null,
                    'hash' => null,
                    'language_code' => null,
                ]
            );

            if ( $save_hash ) {
                if ( empty( $args['hash'] ) ) {
                    $args['hash'] = hash( 'sha256', maybe_serialize( $args ) );
                }

                if ( $duplicate_check ) {
                    // Make sure no duplicate is found.
                    $duplicate_found = $wpdb->get_row(
                        $wpdb->prepare(
                            'SELECT
                                        `id`
                                    FROM
                                        zume_dt_reports_anonymous
                                    WHERE hash = %s AND hash IS NOT NULL;',
                            $args['hash']
                        )
                    );
                    if ( $duplicate_found ) {
                        return false;
                    }
                }
            }

            $args['timestamp'] = time();

            if ( is_array( $args['payload'] ) || is_object( $args['payload'] ) ) {
                $args['payload'] = serialize( $args['payload'] );
            }

            $wpdb->insert(
                'zume_dt_reports_anonymous',
                [
                    'user_id' => $args['user_id'],
                    'parent_id' => $args['parent_id'],
                    'post_id' => $args['post_id'],
                    'post_type' => $args['post_type'],
                    'type' => $args['type'],
                    'subtype' => $args['subtype'],
                    'payload' => $args['payload'],
                    'value' => $args['value'],
                    'lng' => $args['lng'],
                    'lat' => $args['lat'],
                    'level' => $args['level'],
                    'label' => $args['label'],
                    'grid_id' => $args['grid_id'],
                    'time_begin' => $args['time_begin'],
                    'time_end' => $args['time_end'],
                    'timestamp' => time(),
                    'hash' => $args['hash'],
                    'language_code' => $args['language_code'],
                ],
                [
                    '%d', // user_id
                    '%d', // parent_id
                    '%d', // post_id
                    '%s', // post_type
                    '%s', // type
                    '%s', // subtype
                    '%s', // payload
                    '%d', // value
                    '%f', // lng
                    '%f', // lat
                    '%s', // level
                    '%s', // label
                    '%d', // grid_id
                    '%d', // time_begin
                    '%d', // time_end
                    '%d', // timestamp
                    '%s', // hash
                    '%s', // language code
                ]
            );

            $report_id = $wpdb->insert_id;

            return $report_id;
        }

        private static function _needs_to_be_logged( $log, $type, $subtype ): bool
        {
            $already_logged = true;
            foreach ( $log as $log_item ) {
                if ( $log_item['type'] === $type && $log_item['subtype'] === $subtype ) {
                    $already_logged = false;
                    break;
                }
            }
            return $already_logged;
        }

        private static function _already_logged( $log, $type, $subtype ): bool
        {
            return !self::_needs_to_be_logged( $log, $type, $subtype );
        }

        public static function _check_for_stage_change( &$added_log, $user_id, $report, $log = null )
        {
            if ( empty( $log ) ) {
                $log = zume_get_user_log( $user_id );
            }
            $current_stage = zume_get_user_stage( $user_id, $log, true );

            $highest_logged_stage = 0;
            foreach ( $log as $row ) {
                if ( $row['type'] === 'system' && $row['subtype'] === 'current_level' ) {
                    $highest_logged_stage = max( $highest_logged_stage, $row['value'] );
                }
            }

            if ( $highest_logged_stage < $current_stage ) {
                for ( $i = $highest_logged_stage + 1; $i <= $current_stage; $i++ ) {
                    $report['type'] = 'system';
                    $report['subtype'] = 'current_level';
                    $report['post_id'] = zume_get_user_contact_id( $user_id );
                    $location = zume_get_user_location( $user_id );
                    $report['lng'] = $location['lng'];
                    $report['lat'] = $location['lat'];
                    $report['label'] = $location['label'];
                    $report['grid_id'] = $location['grid_id'];
                    $report['level'] = $location['level'];
                    $report['value'] = $i;
                    $report['hash'] = hash( 'sha256', maybe_serialize( $report ) . time() . $i );
                    $added_log[] = self::insert( $report, true, false );
                }
            }

            return $added_log;
        }

        public function authorize_url( $authorized )
        {
            if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ), $this->namespace ) !== false ) {
                $authorized = true;
            }
            return $authorized;
        }
    }
    Zume_System_Log_API::instance();
}

if ( ! class_exists( 'Zume_User_Genmap' ) ) {
    // phpcs:ignore
    class Zume_User_Genmap
    {
        private static $_instance = null;
        public static function instance(){
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        public function modal( $profile, $user_id ) {
            $results = $this->tree( $user_id );
            ?>
            <div class="reveal full" id="modal_genmap" data-v-offset="0" data-reveal>
                <h1>Current Genmap for <?php echo esc_html( $profile['name'] ) ?></h1>
                <hr>
                <div class="grid-x grid-padding-x">
                    <div class="cell medium-9">
                        <div id="genmap" style="width: 100%; border: 1px solid lightgrey; overflow:scroll;"><span style="padding: 1em;">No Reported Groups</span></div>
                    </div>
                    <div class="cell medium-3">
                        <div id="genmap-details"></div>
                    </div>
                </div>
                <button class="ms-auto m--1 close-btn" data-close aria-label="<?php esc_html_e( 'Close', 'zume' ); ?>" type="button">
                    <span class="icon z-icon-close"></span>
                </button>
            </div>

            <?php if ( $results ) {  ?>
                <script>
                    jQuery(document).ready(function(){

                        window.group_tree = [<?php echo json_encode( $this->tree( $user_id ) ) ?>][0]
                        console.log(window.group_tree)

                        let container = jQuery('#genmap')
                        container.empty()

                        var nodeTemplate = function(data) {
                            return `
                        <div class="title" data-item-id="${data.id}">${data.name}</div>
                        <div class="content">${data.content}</div>
                      `;
                        };

                        container.orgchart({
                            'data': window.group_tree,
                            'nodeContent': 'content',
                            'direction': 'l2r',
                            'nodeTemplate': nodeTemplate,
                        });

                        let container_height = window.innerHeight - 200 // because it is rotated
                        container.height(container_height)

                        container.off('click', '.node' )
                        container.on('click', '.node', function () {

                            let node = jQuery(this)
                            let node_id = node.attr('id')
                            console.log(node_id)
                            open_modal_details(node_id, 'groups')
                        })


                        function open_modal_details( id, post_type ) {

                            let spinner = ' <span class="loading-spinner active"></span> '
                            jQuery('#genmap-details').html(spinner)

                            zumeRequest.get( post_type + '/' + id, null )
                                .then(data => {
                                    console.log(data)
                                    let container = jQuery('#genmap-details')
                                    container.empty()
                                    if (data) {
                                        container.html(window.detail_template(post_type, data))
                                    }
                                })
                        }

                        window.detail_template = ( post_type, data ) => {
                            if ( post_type === 'contacts' ) {

                                return `
                            <div class="grid-x grid-padding-x">
                              <div class="cell">
                                <h2>${data.post_title}</h2><hr>
                              </div>
                              <div class="cell">
                                Status: ${status}
                              </div>
                              <div class="cell">
                                Groups:
                                ${group_list}
                              </div>
                              <div class="cell">
                                Assigned To:
                                ${assign_to}
                              </div>
                              <div class="cell">
                                Coaches: <br>
                                ${coach_list}
                              </div>
                              <div class="cell"><hr>
                                <a href="${dtMetricsProject.site_url}/${post_type}/${data.ID}" target="_blank" class="button">View Contact</a>
                              </div>
                            </div>
                          `
                            } else if ( post_type === 'groups' ) {
                                const origin = (new URL(location.href)).origin

                                return `
                                    <div class="grid-x grid-padding-x">
                                      <div class="cell">
                                        <h2>${data.post_title}</h2><hr>
                                      </div>
                                      <div class="cell">
                                        Type: ${data.group_status}
                                      </div>
                                      <div class="cell">
                                        Type: ${data.group_type}
                                      </div>
                                      <div class="cell">
                                        Member Count: ${data.member_count}
                                      </div>
                                      <div class="cell"><hr>
                                        <a href="${origin}/${post_type}/${data.ID}" target="_blank" class="button">View Group</a>
                                        <a href="${origin}/${post_type}/${data.ID}" target="_blank" class="button">Create Child</a>
                                      </div>
                                    </div>
                                  `
                            }
                        }

                    })
                </script>
            <?php }
        }
        public function tree( $user_id ) {
            $query = $this->get_query( $user_id );
            return $this->get_genmap( $query );
        }
        public function get_query( $user_id ) {
            global $wpdb, $table_prefix;
            $key = 'user-'.$user_id;
            $query = $wpdb->get_results( $wpdb->prepare( "
                        SELECT
                          a.ID         as id,
                          0            as parent_id,
                          a.post_title as name
                        FROM zume_posts as a
                        LEFT JOIN zume_postmeta pm ON pm.post_id=a.ID AND pm.meta_key = 'assigned_to' AND pm.meta_value = %s
                        WHERE a.post_type = 'groups'
                        AND a.ID NOT IN (
                          SELECT DISTINCT (p2p_from)
                          FROM zume_p2p
                          WHERE p2p_type = 'groups_to_groups'
                          GROUP BY p2p_from
                        )
                        AND a.ID IN (
                          SELECT DISTINCT (p2p_to)
                          FROM zume_p2p
                          WHERE p2p_type = 'groups_to_groups'
                          GROUP BY p2p_to
                        )
                        AND pm.meta_value IS NOT NULL
                        UNION
                        SELECT
                          p.p2p_from  as id,
                          p.p2p_to    as parent_id,
                          (SELECT sub.post_title FROM zume_posts as sub WHERE sub.ID = p.p2p_from ) as name
                        FROM zume_p2p as p
                        LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.p2p_from AND pm2.meta_key = 'assigned_to' AND pm2.meta_value = %s
                        WHERE p.p2p_type = 'groups_to_groups'
                        AND pm2.meta_value IS NOT NULL;
                    ", $key, $key ), ARRAY_A );

            return $query;
        }

        public function get_genmap( $query ) {

            if ( is_wp_error( $query ) ){
                return $this->_circular_structure_error( $query );
            }
            if ( empty( $query ) ) {
                return false;
            }
            $menu_data = $this->prepare_menu_array( $query );
            return $this->build_array( 0, $menu_data, 0 );
        }
        public function prepare_menu_array( $query ) {
            // prepare special array with parent-child relations
            $menu_data = array(
                'items' => array(),
                'parents' => array(),
            );

            foreach ( $query as $menu_item )
            {
                $menu_data['items'][$menu_item['id']] = $menu_item;
                $menu_data['parents'][$menu_item['parent_id']][] = $menu_item['id'];
            }
            return $menu_data;
        }
        public function build_array( $parent_id, $menu_data, $gen ) {
            $children = [];
            if ( isset( $menu_data['parents'][$parent_id] ) )
            {
                $next_gen = $gen + 1;
                foreach ( $menu_data['parents'][$parent_id] as $item_id )
                {
                    $children[] = $this->build_array( $item_id, $menu_data, $next_gen );
                }
            }
            $array = [
                'id' => $parent_id,
                'name' => $menu_data['items'][ $parent_id ]['name'] ?? 'SYSTEM',
                'content' => 'Gen ' . $gen,
                'children' => $children,
            ];
            return $array;
        }
        public function _no_results() {
            return '<p>'. esc_attr__( 'No Results', 'disciple_tools' ) .'</p>';
        }
        public function _circular_structure_error( $wp_error ) {
            $link = false;
            $data = $wp_error->get_error_data();

            if ( isset( $data['record'] ) ){
                $link = "<a target='_blank' href=" . get_permalink( $data['record'] ) . '>Open record</a>';
            }
            return '<p>' . esc_html( $wp_error->get_error_message() ) . ' ' . $link . '</p>';
        }
    }
    Zume_User_Genmap::instance();
}

// must be last for initialization
zume_get_user_profile();
