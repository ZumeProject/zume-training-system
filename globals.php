<?php
/**
 * These are global functions that are used throughout the system, and used in the coaching system. There is a copy of this file in the coaching system.
 * If changes are made here, they need copied to the coaching plugin.
 * All sql queries should not use variable table names, but should be fully qualified.
 */

if( ! function_exists( 'zume_get_user_profile' ) ) {
    function zume_get_user_profile( $user_id = NULL ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $contact_id = zume_get_user_contact_id( $user_id );

        global $wpdb;
        $name = $wpdb->get_var( $wpdb->prepare( "SELECT post_title FROM wp_posts WHERE ID = %d", $contact_id ) );

        $contact_meta_query = $wpdb->get_results( $wpdb->prepare( "SELECT * FROM wp_postmeta WHERE post_id = %d", $contact_id ), ARRAY_A );
        $contact_meta = [];
        foreach( $contact_meta_query as $value ) {
            $contact_meta[$value['meta_key']] = $value['meta_value'];
        }

        $email = $contact_meta['user_email'] ?? '';
        $phone = $contact_meta['user_phone'] ?? '';

        $language = zume_get_user_language( $user_id );
        $location = zume_get_user_location( $user_id );

        $coaching_contact_id = $wpdb->get_var( $wpdb->prepare(
            "SELECT post_id
                FROM wp_3_postmeta
                WHERE meta_key = 'trainee_user_id'
                  AND meta_value = %s"
            , $user_id ), );
        $coaches = $wpdb->get_results( $wpdb->prepare(
            "SELECT p.ID as contact_id, pm.meta_value as user_id, p.post_title as name
                FROM wp_3_p2p p2
                LEFT JOIN wp_3_posts p ON p2.p2p_to=p.ID
                LEFT JOIN wp_3_postmeta pm ON pm.post_id = p.ID AND pm.meta_key = 'corresponds_to_user'
                WHERE p2p_from = %d
                  AND p2p_type = 'contacts_to_contacts'"
            , $coaching_contact_id ), ARRAY_A );
        if( empty( $coaches ) ) {
            $coaches = [];
        }

        if( $user_id == get_current_user_id() ) {
            // user is current user, build global variable
            global $zume_user_profile; // sets a global variable for user_profile
            $zume_user_profile = [
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'coaching_contact_id' => $coaching_contact_id,
                'coaches' => $coaches,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'language' => $language,
                'location' => $location,
            ];
            return $zume_user_profile;
        } else {
            // if user is not current user, return array
            return [
                'user_id' => $user_id,
                'contact_id' => $contact_id,
                'coaching_contact_id' => $coaching_contact_id,
                'coaches' => $coaches,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'language' => $language,
                'location' => $location,
            ];
        }
    }
}
if ( ! function_exists( 'zume_get_user_stage' ) ) {
    function zume_get_user_stage( $user_id, $log = NULL, $number_only = false ) {

        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }

        $funnel = zume_funnel_stages();
        $stage = $funnel[0];

        if ( empty( $log ) ) {
            return $stage;
        }

        if ( count($log) > 0 ) {

            $funnel_steps = [
                1 => false,
                2 => false,
                3 => false,
                4 => false,
                5 => false,
                6 => false,
            ];

            foreach( $log as $value ) {
                if ( 'registered' == $value['subtype'] ) {
                    $funnel_steps[1] = true;
                }
                if ( 'plan_created' == $value['subtype'] ) {
                    $funnel_steps[2] = true;
                }
                if ( 'training_completed' == $value['subtype'] ) {
                    $funnel_steps[3] = true;
                }
                if ( 'first_practitioner_report' == $value['subtype'] ) {
                    $funnel_steps[4] = true;
                }
                if ( 'mawl_completed' == $value['subtype'] ) {
                    $funnel_steps[5] = true;
                }
                if ( 'seeing_generational_fruit' == $value['subtype'] ) {
                    $funnel_steps[6] = true;
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
            return $stage;
        }
    }
}
if( ! function_exists( 'zume_get_user_language' ) ) {
    function zume_get_user_language( $user_id = NULL )
    {
        global $zume_languages_by_locale;
        if ( empty( $zume_languages_by_locale ) ) {
            $zume_languages_by_locale = zume_languages( 'locale' );
        }

        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }

        $locale = get_user_meta( $user_id, 'locale', true );
        if ( $user_id == get_current_user_id() && empty( $locale ) ) {
            update_user_meta( $user_id, 'locale', zume_current_language() );
            $locale = zume_current_language();
        }

        if ( ! $locale ) {
            $locale = 'en';
        }

        return isset($zume_languages_by_locale[$locale]) ? $zume_languages_by_locale[$locale] : $zume_languages_by_locale['en'];
    }
}
if( ! function_exists( 'zume_get_user_location' ) ) {
    function zume_get_user_location( $user_id, $ip_lookup = false  ) {
        global $wpdb;
        $location = $wpdb->get_row( $wpdb->prepare(
            "SELECT lng, lat, level, label, grid_id
                    FROM wp_postmeta pm
                    JOIN wp_dt_location_grid_meta lgm ON pm.post_id=lgm.post_id
                    WHERE pm.meta_key = 'corresponds_to_user' AND pm.meta_value = %d
                    ORDER BY grid_meta_id desc
                    LIMIT 1"
            , $user_id ), ARRAY_A );

        if ( empty( $location ) && $ip_lookup ) {
            $result = DT_Ipstack_API::get_location_grid_meta_from_current_visitor();
            if ( ! empty( $result ) ) {
                $location = [
                    'lng' => $result['lng'],
                    'lat' => $result['lat'],
                    'level' => $result['level'],
                    'label' => $result['label'],
                    'grid_id' => $result['grid_id'],
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
        ];
    }
}
if( ! function_exists( 'zume_get_user_host' ) ) {
    function zume_get_user_host( $user_id = NULL, $log = NULL ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }
        $training_items = zume_training_items();
        $host = [];
        foreach( $training_items as $item ) {
            if ( isset( $item['host'] ) ) {
                foreach( $item['host'] as $elements ) {
                    $host[$elements['type'].'_'.$elements['subtype']] = false;
                }
            }
        }
        $keys = [];
        $h = 0;
        $o = 0;
        $s = 0;
        $t = 0;
        foreach( $log as $row ) {
            $keys[$row['log_key']] = $row['log_key'];
        }
        foreach( $host as $key => $value ) {
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
            'training_items' => $training_items,
        ];
    }
}
if( ! function_exists( 'zume_get_user_mawl' ) ) {
    function zume_get_user_mawl( $user_id = NULL, $log = NULL ) {
        if ( is_null( $user_id ) ) {
            $user_id = get_current_user_id();
        }
        if ( is_null( $log ) ) {
            $log = zume_get_user_log( $user_id );
        }
        $training_items = zume_training_items();
        $mawl = [];
        foreach( $training_items as $item ) {
            if ( isset( $item['mawl'] ) ) {
                foreach( $item['mawl'] as $elements ) {
                    $mawl[$elements['type'].'_'.$elements['subtype']] = false;
                }
            }
        }
        $keys = [];
        $m = 0;
        $a = 0;
        $w = 0;
        $l = 0;
        foreach( $log as $row ) {
            $keys[$row['log_key']] = $row['log_key'];
        }
        foreach( $mawl as $key => $value ) {
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
            'training_items' => $training_items,
        ];
    }
}
if( ! function_exists( 'zume_get_user_commitments' ) ) {
    // open, closed, all
    function zume_get_user_commitments($user_id, $status = 'open')
    {
        global $wpdb;
        $results = $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM wp_dt_post_user_meta
                    WHERE user_id = %d
                      AND category = 'custom'
                    ORDER BY date DESC"
            , $user_id), ARRAY_A);

        $list = [];
        foreach ($results as $result) {
            $meta = maybe_unserialize($result['meta_value']);

            if ('open' === $status && isset($meta['status'])) { // status is added when closed, so if present, then it is closed
                continue;
            }

            if ('closed' === $status && !isset($meta['status'])) {
                continue;
            }

            $list[] = [
                'id' => $result['id'],
                'note' => $meta['note'],
                'status' => isset($meta['status']) ? 'closed' : 'open',
                'due_date' => $result['date'],
            ];
        }

        return $list;
    }
}
if( ! function_exists( 'zume_get_user_contact_id' ) ) {
    function zume_get_user_contact_id( $user_id ) {
        global $wpdb;
        return $wpdb->get_var( $wpdb->prepare( "SELECT post_id FROM wp_postmeta WHERE meta_key = 'corresponds_to_user' AND meta_value = %s", $user_id ) );
    }
}
if ( ! function_exists( 'zume_get_user_log' ) ) {
    function zume_get_user_log( $user_id ) {
        global $wpdb;
        $results =  $wpdb->get_results( $wpdb->prepare(
            "SELECT CONCAT( r.type, '_', r.subtype ) as log_key, r.*
                FROM wp_dt_reports r
                WHERE r.user_id = %s
                AND r.post_type = 'zume'
                ", $user_id ), ARRAY_A );

        if ( is_array( $results ) ) {
            return $results;
        } else {
            return [];
        }
    }
}
if ( ! function_exists( 'zume_languages' ) ) {
    function zume_languages( $type = 'code' ) {
        global $zume_languages_by_code, $zume_languages_by_locale;
        $zume_languages_by_code = array(
            'en' => array(
                'name' => 'English',
                'enDisplayName' => 'English',
                'code' => 'en',
                'locale' => 'en',
                'nativeName' => 'English',
                'rtl' => false
            ),
            'ar' => array(
                'name' => 'Arabic',
                'enDisplayName' => 'Arabic',
                'code' => 'ar',
                'locale' => 'ar_LB',
                'nativeName' => 'العربية',
                'rtl' => true
            ),
            'ar_jo' => array(
                'name' => 'Arabic (JO)',
                'enDisplayName' => 'Arabic (JO)',
                'code' => 'ar_jo',
                'locale' => 'ar_JO',
                'nativeName' => 'العربية - الأردن',
                'rtl' => true
            ),
            'asl' => array(
                'name' => 'American Sign Language',
                'enDisplayName' => 'American Sign Language',
                'code' => 'asl',
                'locale' => 'asl',
                'nativeName' => 'Sign Language',
                'rtl' => false
            ),
            'bho' => array(
                'name' => 'Bhojpuri',
                'enDisplayName' => 'Bhojpuri',
                'code' => 'bho',
                'locale' => 'bho',
                'nativeName' => 'भोजपुरी',
                'rtl' => false
            ),
            'bn' => array(
                'name' => 'Bengali (India)',
                'enDisplayName' => 'Bengali (India)',
                'code' => 'bn',
                'locale' => 'bn_IN',
                'nativeName' => 'বাংলা',
                'rtl' => false
            ),
            'bs' => array(
                'name' => 'Bosnian',
                'enDisplayName' => 'Bosnian',
                'code' => 'bs',
                'locale' => 'bs_BA',
                'nativeName' => 'Bosanski',
                'rtl' => false
            ),
            'zhhk' => array(
                'name' => 'Cantonese (Traditional)',
                'enDisplayName' => 'Cantonese (Traditional)',
                'code' => 'zhhk',
                'locale' => 'zh_HK',
                'nativeName' => '粵語 (繁體)',
                'rtl' => false
            ),
            'zhcn' => array(
                'name' => 'Chinese (Simplified)',
                'enDisplayName' => 'Chinese (Simplified)',
                'code' => 'zhcn',
                'locale' => 'zh_CN',
                'nativeName' => '国语（简体)',
                'rtl' => false
            ),
            'zhtw' => array(
                'name' => 'Chinese (Traditional)',
                'enDisplayName' => 'Chinese (Traditional)',
                'code' => 'zhtw',
                'locale' => 'zh_TW',
                'nativeName' => '國語（繁體)',
                'rtl' => false
            ),
            'hr' => array(
                'name' => 'Croatian',
                'enDisplayName' => 'Croatian',
                'code' => 'hr',
                'locale' => 'hr',
                'nativeName' => 'Hrvatski',
                'rtl' => false
            ),
            'fa' => array(
                'name' => 'Farsi/Persian',
                'enDisplayName' => 'Farsi/Persian',
                'code' => 'fa',
                'locale' => 'fa_IR',
                'nativeName' => 'فارسی',
                'rtl' => true
            ),
            'fr' => array(
                'name' => 'French',
                'enDisplayName' => 'French',
                'code' => 'fr',
                'locale' => 'fr_FR',
                'nativeName' => 'Français',
                'rtl' => false
            ),
            'de' => array(
                'name' => 'German',
                'enDisplayName' => 'German',
                'code' => 'de',
                'locale' => 'de_DE',
                'nativeName' => 'Deutsch',
                'rtl' => false
            ),
            'gu' => array(
                'namne' => 'Gujarati',
                'enDisplayName' => 'Gujarati',
                'code' => 'gu',
                'locale' => 'gu',
                'nativeName' => 'ગુજરાતી',
                'rtl' => false
            ),
            'ha' => array(
                'name' => 'Hausa',
                'enDisplayName' => 'Hausa',
                'code' => 'ha',
                'locale' => 'ha_NG',
                'nativeName' => 'Hausa',
                'rtl' => false
            ),
            'hi' => array(
                'name' => 'Hindi',
                'enDisplayName' => 'Hindi',
                'code' => 'hi',
                'locale' => 'hi_IN',
                'nativeName' => 'हिन्दी',
                'rtl' => false
            ),
            'id' => array(
                'name' => 'Indonesian',
                'enDisplayName' => 'Indonesian',
                'code' => 'id',
                'locale' => 'id_ID',
                'nativeName' => 'Bahasa Indonesia',
                'rtl' => false
            ),
            'it' => array(
                'name' => 'Italian',
                'enDisplayName' => 'Italian',
                'code' => 'it',
                'locale' => 'it_IT',
                'nativeName' => 'Italiano',
                'rtl' => false
            ),
            'kn' => array(
                'name' => 'Kannada',
                'enDisplayName' => 'Kannada',
                'code' => 'kn',
                'locale' => 'kn',
                'nativeName' => 'ಕನ್ನಡ',
                'rtl' => false
            ),
            'ko' => array(
                'name' => 'Korean',
                'enDisplayName' => 'Korean',
                'code' => 'ko',
                'locale' => 'ko_KR',
                'nativeName' => '한국어',
                'rtl' => false
            ),
            'ku' => array(
                'name' => 'Kurdish',
                'enDisplayName' => 'Kurdish',
                'code' => 'ku',
                'locale' => 'ku',
                'nativeName' => 'کوردی',
                'rtl' => true
            ),
            'lo' => array(
                'name' => 'Lao',
                'enDisplayName' => 'Lao',
                'code' => 'lo',
                'locale' => 'lo',
                'nativeName' => 'ພາສາລາວ',
                'rtl' => false
            ),
            'mai' => array(
                'name' => 'Maithili',
                'enDisplayName' => 'Maithili',
                'code' => 'mai',
                'locale' => 'mai',
                'nativeName' => '𑒧𑒻𑒟𑒱𑒪𑒲',
                'rtl' => false
            ),
            'mr' => array(
                'name' => 'Marathi',
                'enDisplayName' => 'Marathi',
                'code' => 'mr',
                'locale' => 'mr',
                'nativeName' => 'मराठी',
                'rtl' => false
            ),
            'ml' => array(
                'name' => 'Malayalam',
                'enDisplayName' => 'Malayalam',
                'code' => 'ml',
                'locale' => 'ml',
                'nativeName' => 'മലയാളം',
                'rtl' => false
            ),
            'ne' => array(
                'name' => 'Nepali',
                'enDisplayName' => 'Nepali',
                'code' => 'ne',
                'locale' => 'ne_NP',
                'nativeName' => 'नेपाली',
                'rtl' => false
            ),
            'or' => array(
                'name' => 'Oriya',
                'enDisplayName' => 'Oriya',
                'code' => 'or',
                'locale' => 'or_IN',
                'nativeName' => 'ଓଡ଼ିଆ',
                'rtl' => false
            ),
            'pa' => array(
                'name' => 'Punjabi',
                'enDisplayName' => 'Punjabi',
                'code' => 'pa',
                'locale' => 'pa_IN',
                'nativeName' => 'ਪੰਜਾਬੀ',
                'rtl' => false
            ),
            'pt' => array(
                'name' => 'Portuguese',
                'enDisplayName' => 'Portuguese',
                'code' => 'pt',
                'locale' => 'pt_PT',
                'nativeName' => 'Português',
                'rtl' => false
            ),
            'ru' => array(
                'name' => 'Russian',
                'enDisplayName' => 'Russian',
                'code' => 'ru',
                'locale' => 'ru_RU',
                'nativeName' => 'Русский',
                'rtl' => false
            ),
            'ro' => array(
                'name' => 'Romanian',
                'enDisplayName' => 'Romanian',
                'code' => 'ro',
                'locale' => 'ro_RO',
                'nativeName' => 'Română',
                'rtl' => false
            ),
            'sl' => array(
                'name' => 'Slovenian',
                'enDisplayName' => 'Slovenian',
                'code' => 'sl',
                'locale' => 'sl_Sl',
                'nativeName' => 'Slovenščina',
                'rtl' => false
            ),
            'es' => array(
                'name' => 'Spanish',
                'enDisplayName' => 'Spanish',
                'code' => 'es',
                'locale' => 'es',
                'nativeName' => 'Español',
                'rtl' => false
            ),
            'so' => array(
                'name' => 'Somali',
                'enDisplayName' => 'Somali',
                'code' => 'so',
                'locale' => 'so',
                'nativeName' => 'Soomaali',
                'rtl' => false
            ),
            'swa' => array(
                'name' => 'Swahili',
                'enDisplayName' => 'Swahili',
                'code' => 'swa',
                'locale' => 'swa',
                'nativeName' => 'Kiswahili',
                'rtl' => false
            ),
            'ta' => array(
                'name' => 'Tamil',
                'enDisplayName' => 'Tamil',
                'code' => 'ta',
                'locale' => 'ta_IN',
                'nativeName' => 'தமிழ்',
                'rtl' => false
            ),
            'te' => array(
                'name' => 'Telugu',
                'enDisplayName' => 'Telugu',
                'code' => 'te',
                'locale' => 'te',
                'nativeName' => 'తెలుగు',
                'rtl' => false
            ),
            'th' => array(
                'name' => 'Thai',
                'enDisplayName' => 'Thai',
                'code' => 'th',
                'locale' => 'th',
                'nativeName' => 'ไทย',
                'rtl' => false
            ),
            'tr' => array(
                'name' => 'Turkish',
                'enDisplayName' => 'Turkish',
                'code' => 'tr',
                'locale' => 'tr_TR',
                'nativeName' => 'Türkçe',
                'rtl' => false
            ),
            'ur' => array(
                'name' => 'Urdu',
                'enDisplayName' => 'Urdu',
                'code' => 'ur',
                'locale' => 'ur',
                'nativeName' => 'اردو',
                'rtl' => true
            ),
            'vi' => array(
                'name' => 'Vietnamese',
                'enDisplayName' => 'Vietnamese',
                'code' => 'vi',
                'locale' => 'vi',
                'nativeName' => 'Tiếng Việt',
                'rtl' => false
            ),
            'yo' => array(
                'name' => 'Yoruba',
                'enDisplayName' => 'Yoruba',
                'code' => 'yo',
                'locale' => 'yo',
                'nativeName' => 'Yorùbá',
                'rtl' => false
            )
        );
        foreach( $zume_languages_by_code as $lang ) {
            $zume_languages_by_locale[$lang['locale']] = $lang;
        }

        if ( $type === 'code' ) {
            return $zume_languages_by_code;
        } else {
            return $zume_languages_by_locale;
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
if ( ! function_exists( 'get_zume_language_locale' ) ) {
    function get_zume_language_locale( $code ) {
        global $zume_languages_by_code;
        if ( isset( $zume_languages_by_code[$code]['locale'] ) ) {
            return $zume_languages_by_code[$code]['locale'];
        } else {
            return 'en';
        }
    }
}
if ( ! function_exists( 'zume_training_items' ) ) {
    function zume_training_items() : array {

        $training_items = [
            "1" => [
                "key" => "01",
                "title" => "God Uses Ordinary People",
                "description" => "You'll see how God uses ordinary people doing simple things to make a big impact.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "2" => [
                "key" => "02",
                "title" => "Simple Definition of Disciple and Church",
                "description" => "Discover the essence of being a disciple, making a disciple, and what is the church.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "3" => [
                "key" => "03",
                "title" => "Spiritual Breathing is Hearing and Obeying God",
                "description" => "Being a disciple means we hear from God and we obey God.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "4" => [
                "key" => "04",
                "title" => "SOAPS Bible Reading",
                "description" => "A tool for daily Bible study that helps you understand, obey, and share God’s Word.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "5" => [
                "key" => "05",
                "title" => "Accountability Groups",
                "description" => "A tool for two or three people of the same gender to meet weekly and encourage each other in areas that are going well and reveal areas that need correction.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "6" => [
                "key" => "06",
                "title" => "Consumer vs Producer Lifestyle",
                "description" => "You'll discover the four main ways God makes everyday followers more like Jesus.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "7" => [
                "key" => "07",
                "title" => "How to Spend an Hour in Prayer",
                "description" => "See how easy it is to spend an hour in prayer.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "8" => [
                "key" => "08",
                "title" => "Relational Stewardship – List of 100",
                "description" => "A tool designed to help you be a good steward of your relationships.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "9" => [
                "key" => "09",
                "title" => "The Kingdom Economy",
                "description" => "Learn how God's economy is different from the world's. God invests more in those who are faithful with what they've already been given.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "10" => [
                "key" => "10",
                "title" => "The Gospel and How to Share It",
                "description" => "Learn a way to share God’s Good News from the beginning of humanity all the way to the end of this age.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "11" => [
                "key" => "11",
                "title" => "Baptism and How To Do It",
                "description" => "Jesus said, “Go and make disciples of all nations, BAPTIZING them in the name of the Father and of the Son and of the Holy Spirit…” Learn how to put this into practice.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "12" => [
                "key" => "12",
                "title" => "Prepare Your 3-Minute Testimony",
                "description" => "Learn how to share your testimony in three minutes by sharing how Jesus has impacted your life.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "13" => [
                "key" => "13",
                "title" => "Vision Casting the Greatest Blessing",
                "description" => "Learn a simple pattern of making not just one follower of Jesus but entire spiritual families who multiply for generations to come.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "14" => [
                "key" => "14",
                "title" => "Duckling Discipleship – Leading Immediately",
                "description" => "Learn what ducklings have to do with disciple-making.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "15" => [
                "key" => "15",
                "title" => "Eyes to See Where the Kingdom Isn’t",
                "description" => "Begin to see where God’s Kingdom isn’t. These are usually the places where God wants to work the most.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "16" => [
                "key" => "16",
                "title" => "The Lord’s Supper and How To Lead It",
                "description" => "It’s a simple way to celebrate our intimate connection and ongoing relationship with Jesus. Learn a simple way to celebrate.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "17" => [
                "key" => "17",
                "title" => "Prayer Walking and How To Do It",
                "description" => "It’s a simple way to obey God’s command to pray for others. And it's just what it sounds like — praying to God while walking around!",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "18" => [
                "key" => "18",
                "title" => "A Person of Peace and How To Find One",
                "description" => "Learn who a person of peace might be and how to know when you've found one.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "19" => [
                "key" => "19",
                "title" => "The BLESS Prayer Pattern",
                "description" => "Practice a simple mnemonic to remind you of ways to pray for others.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "20" => [
                "key" => "20",
                "title" => "Faithfulness is Better Than Knowledge",
                "description" => "It's important what disciples know — but it's much more important what they DO with what they know.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "21" => [
                "key" => "21",
                "title" => "3/3 Group Meeting Pattern",
                "description" => "A 3/3 Group is a way for followers of Jesus to meet, pray, learn, grow, fellowship and practice obeying and sharing what they've learned. In this way, a 3/3 Group is not just a small group but a Simple Church.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "22" => [
                "key" => "22",
                "title" => "Training Cycle for Maturing Disciples",
                "description" => "Learn the training cycle and consider how it applies to disciple making.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "23" => [
                "key" => "23",
                "title" => "Leadership Cells",
                "description" => "A Leadership Cell is a way someone who feels called to lead can develop their leadership by practicing serving.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "24" => [
                "key" => "24",
                "title" => "Expect Non-Sequential Growth",
                "description" => "See how disciple making doesn't have to be linear. Multiple things can happen at the same time.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "25" => [
                "key" => "25",
                "title" => "Pace of Multiplication Matters",
                "description" => "Multiplying matters and multiplying quickly matters even more. See why pace matters.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "26" => [
                "key" => "26",
                "title" => "Always Part of Two Churches",
                "description" => "Learn how to obey Jesus' commands by going AND staying.",
                "type" => "concept",
                "host" => true,
                "mawl" => true,
            ],
            "27" => [
                "key" => "27",
                "title" => "Three-Month Plan",
                "description" => "Create and share your plan for how you will implement the Zúme tools over the next three months.",
                "type" => "tool",
                "host" => true,
                "mawl" => false,
            ],
            "28" => [
                "key" => "28",
                "title" => "Coaching Checklist",
                "description" => "A powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply.",
                "type" => "tool",
                "host" => true,
                "mawl" => false,
            ],
            "29" => [
                "key" => "29",
                "title" => "Leadership in Networks",
                "description" => "Learn how multiplying churches stay connected and live life together as an extended, spiritual family.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "30" => [
                "key" => "30",
                "title" => "Peer Mentoring Groups",
                "description" => "This is a group that consists of people who are leading and starting 3/3 Groups. It also follows a 3/3 format and is a powerful way to assess the spiritual health of God’s work in your area.",
                "type" => "concept",
                "host" => true,
                "mawl" => false,
            ],
            "31" => [
                "key" => "31",
                "title" => "Four Fields Tool",
                "description" => "The four fields diagnostic chart is a simple tool to be used by a leadership cell to reflect on the status of current efforts and the kingdom activity around them.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
            "32" => [
                "key" => "32",
                "title" => "Generational Mapping",
                "description" => "Generation mapping is another simple tool to help leaders in a movement understand the growth around them.",
                "type" => "tool",
                "host" => true,
                "mawl" => true,
            ],
        ];

        $list = [];
        foreach( $training_items as $training_item ) {
            $index = $training_item["key"];
            $list[] = [
                "key" => $index,
                "type" => $training_item["type"],
                "title" => $training_item["title"],
                "description" => $training_item["description"],
                "host" => $training_item["host"] ? [
                    [
                        "label" => "Heard",
                        "short_label" => "H",
                        "type" => "training",
                        "subtype" => $index."_heard",
                        "key" => "training_".$index."_heard",
                    ],
                    [
                        "label" => "Obeyed",
                        "short_label" => "O",
                        "type" => "training",
                        "subtype" => $index."_obeyed",
                        "key" => "training_".$index."_obeyed",
                    ],
                    [
                        "label" => "Shared",
                        "short_label" => "S",
                        "type" => "training",
                        "subtype" => $index."_shared",
                        "key" => "training_".$index."_shared",
                    ],
                    [
                        "label" => "Trained",
                        "short_label" => "T",
                        "type" => "training",
                        "subtype" => $index."_trained",
                        "key" => "training_".$index."_trained",
                    ],
                ] : [],
                "mawl" => $training_item["mawl"] ? [
                    [
                        "label" => "Modeling",
                        "short_label" => "M",
                        "type" => "coaching",
                        "subtype" => $index."_modeling",
                        "key" => "coaching_".$index."_modeling",
                    ],
                    [
                        "label" => "Assisting",
                        "short_label" => "A",
                        "type" => "coaching",
                        "subtype" => $index."_assisting",
                        "key" => "coaching_".$index."_assisting",
                    ],
                    [
                        "label" => "Watching",
                        "short_label" => "W",
                        "type" => "coaching",
                        "subtype" => $index."_watching",
                        "key" => "coaching_".$index."_watching",
                    ],
                    [
                        "label" => "Launching",
                        "short_label" => "L",
                        "type" => "coaching",
                        "subtype" => $index."_launching",
                        "key" => "coaching_".$index."_launching",
                    ],
                ] : [],
            ];
        }

        return $list;
    }
}
if ( ! function_exists( 'zume_funnel_stages' ) ) {
    function zume_funnel_stages() : array {
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
                    'Get a coach'
                ],
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
                    'Establish ongoing coaching relationship'
                ],
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
                    'Working on HOST/MAWL checklist, but not complete',
                    'Consistent effort, inconsistent fruit',
                    'Not multiplying',
                ],
                'priority_next_step' => '',
                'next_steps' => [
                    'Full skills competence',
                    'Continued reporting',
                    'Connect with S1 and S2 practitioners',
                ],
            ],
            5 => [
                'key' => 'full_practitioner',
                'value' => 5,
                'label' => 'Full Practitioner',
                'label_full' => '(S2) Full Practitioner',
                'description' => 'Practitioner who has completed the MAWL checklist, but is not multiplying.',
                'description_full' => 'Practitioner who has completed the MAWL checklist, but is not multiplying.',
                'characteristics' => [
                    'Has completed HOST/MAWL checklist',
                    'Consistent effort, inconsistent fruit',
                    'Inconsistent 1st generation fruit',
                    'Not multiplying',
                ],
                'priority_next_step' => 'Consistent 2,3,4 generation fruit',
                'next_steps' => [
                    'Consistent 2,3,4 disciple generation fruit',
                    'Consistent 2,3,4 group generation fruit',
                    'Peer coaching with S2 and S3 practitioners'
                ],
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
            ],
        ];
    }
}
if ( ! function_exists( 'zume_mirror_url' ) ) {
    function zume_mirror_url() {
        return 'https://storage.googleapis.com/zume-file-mirror/';
    }
}
if ( ! function_exists('zume_current_language') ) {
    function zume_current_language() {
        if ( function_exists( 'pll_the_languages' ) ) {
            $current_language = pll_current_language();
            return ( ! empty( $current_language ) ) ? $current_language : 'en';
        }

        $locale = get_locale();

        if ( empty( $local ) || 'en_US' === $locale ) {
            return 'en';
        }

        return $locale;
    }
}
if ( ! function_exists('zume_format_int') ) {
    function zume_format_int($int)
    {
        $int = (float)$int;
        return number_format($int, 0, '.', ',');
    }
}
if ( ! function_exists('zume_get_valence') ) {
    function zume_get_valence(float $value, float $compare, $negative_stat = false)
    {
        $percent = zume_get_percent($value, $compare);

        if ($negative_stat) {
            if ($percent > 20) {
                $valence = 'valence-darkred';
            } else if ($percent > 10) {
                $valence = 'valence-red';
            } else if ($percent < -10) {
                $valence = 'valence-green';
            } else if ($percent < -20) {
                $valence = 'valence-darkgreen';
            } else {
                $valence = 'valence-grey';
            }
        } else {
            if ($percent > 20) {
                $valence = 'valence-darkgreen';
            } else if ($percent > 10) {
                $valence = 'valence-green';
            } else if ($percent < -10) {
                $valence = 'valence-red';
            } else if ($percent < -20) {
                $valence = 'valence-darkred';
            } else {
                $valence = 'valence-grey';
            }
        }

        return $valence;
    }
}
if ( ! function_exists('zume_get_percent') ) {
    function zume_get_percent(float $value, float $compare)
    {
        $percent = ($value / $compare) * 100;
        if ($percent > 100) {
            $percent = round($percent - 100, 1);
        } else if ($percent < 100) {
            $percent = round((100 - $percent), 1) * -1;
        } else {
            $percent = 0;
        }
        return $percent;
    }
}



// must be last for initialization
zume_get_user_profile();

