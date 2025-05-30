<?php
if ( !defined( 'ABSPATH' ) ) {
    exit;
} // Exit if accessed directly.

// phpcs:disable

use Gettext\Loader\PoLoader; 

class Zume_Training_Translator extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Translator';
    public $root = 'app';
    public $type = 'translator';
    public $user;
    public static $token = 'app_translator';
    public $zume_languages;
    public $language_code;
    public $language;

    public $download_fields = [];
    public $script_fields = [];
    public $video_fields = [];

    public $pieces = [
        1 => 20730, // God uses ordinary people
        2 => 20731, // teach them to obey
        3 => 20732, // spiritual breathing
        4 => 20733, // soaps bible reading
        5 => 20735, // accountability groups
        6 => 20737, // consumers vs producers
        7 => 20738, // prayer cycle
        8 => 20739, // list of 100
        9 => 20740, // kingdom economy
        10 => 20741, // the gospel
        11 => 20742, // baptism
        12 => 20743, // 3-minute testimony
        13 => 20744, // greatest blessing
        14 => 20745, // duckling discipleship
        15 => 20746, // seeing where God's kingdom isn't
        16 => 20747, // the lord's supper
        17 => 20748, // prayer walking
        18 => 20750, // person of peace
        19 => 20749, // bless prayer
        20 => 20751, // faithfulness
        21 => 20752, // 3/3 group pattern
        22 => 20753, // training cycle
        23 => 20755, // leadership cells
        24 => 20756, // non-sequential
        25 => 20757, // pace
        26 => 20758, // part of two churches
        27 => 19848, // 3-month plan
        28 => 20759, // coaching checklist
        29 => 20760, // leadership in networks
        30 => 20761, // peer mentoring groups
        31 => 20762, // four fields tool
        32 => 20763, // generation mapping
    ];
    public $video_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28, 29, 30, 33];
    public $pieces_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33];
    public $script_list = [
    1 =>34,
    2 =>35,
    3 =>36,
    4 =>37,
    5 =>38,
    6 =>39,
    7 =>40,
    8 =>41,
    9 =>42,
                            10 =>43,
    11 =>44,
    12 =>45,
    13 =>46,
    14 =>47,
    15 =>48,
    16 =>49,
    17 =>50,
    18 =>51,
    19 =>52,
                            21 =>53,
    22 =>54,
    23 =>55,
    24 =>56,
    25 =>57,
    26 =>58,
    28 =>60,
    29 =>61,
    30 =>62,
    33 =>63,
                           ];
    public $images = [ 94, 95, 96, 97, 98, 99, 101, 104];
    public $mirror_url = 'https://storage.googleapis.com/zume-file-mirror/';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function __construct() {
        parent::__construct();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = $this->get_url_pieces_full();

        global $zume_languages_full_list;
        $this->zume_languages = $zume_languages_full_list;
        $this->language_code = $lang_code ?? $this->language_code;
        $this->language = $this->zume_languages[ $this->language_code ];


        if ( isset( $url_parts[1] ) && $this->type === $url_parts[1] && ! dt_is_rest() ) {

            $this->download_fields = Zume_Downloads_Post_Type::instance()->get_custom_fields_settings();
            $this->script_fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();
            $this->video_fields = Zume_Video_Post_Type::instance()->get_custom_fields_settings();

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );

            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );
        }
    }
    public function get_url_pieces_full( $url = null ) {
        global $zume_languages_full_list;
        if ( !$url ) {
            $url = dt_get_url_path();
        }

        $dt_url = new DT_URL( $url );

        $codes = array_keys( $zume_languages_full_list );

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
    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js( $allowed_js );
    }
    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }
    public function header_style(){
        if ( isset( $_GET['tab'] ) && $_GET['tab'] === 'slides' ) {
            ?>
            <style>
                #blank-template-body {
                    background-color: WhiteSmoke !important;
                }
                .hollow.hollow-focus {
                    background-color: lightgreen !important;
                }
            </style>
            <?php
        } else {
            ?>
            <?php //phpcs:ignore ?>
            <script src="https://cdn.tiny.cloud/1/q7cy7hksisjrvfcglos9jqi7xvy0orfu9w2ydbfig0x37ylw/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
            <style>
                table tr td {
                    vertical-align: top;
                }
                h3 {
                    font-size: var(--t1);
                    font-weight: 600;
                    padding: .5em 0;
                    color: var(--z-brand-light);
                }
                ul li {
                    margin-inline-start: var(--s3);
                    padding: 0 1em;
                    list-style-type: disc;
                    list-style-position: outside;
                    line-height: 1.5;
                }
                ol li {
                    margin-inline-start: var(--s3);
                    padding: 0 1em;
                    list-style-position: outside;
                    line-height: 1.5;
                }
                strong {
                    font-weight: 600;
                    color: var(--z-brand-light);
                }
                ol, ul {
                    margin-bottom: var(--s2);
                }
                img {
                    margin-bottom: var(--s2)
                }
                .checkmark {
                    display: inline-block;
                    transform: rotate(45deg);
                    height: 25px;
                    width: 12px;
                    border-bottom: 7px solid #78b13f;
                    border-right: 7px solid #78b13f;
                }
                #translator-tabs .button {
                    font-size: .8em;
                    padding: .8em .8em;
                }
                .hollow.hollow-focus {
                    background-color: yellow !important;
                }
                .grey-back {
                    background-color: grey;
                }
                .grey-back strong {
                    color: white;
                }
                #translator-table .button_column button.small {
                    margin: 0;
                    padding: .4em .8em;
                    width: 100%
                }
                #translator-table .button_column button.red {
                    background-color: #cc4b37;
                    color: #fefefe;
                }
                #translator-table .button_column button.green {
                    background-color: #3adb76;
                    color: #0a0a0a;
                }
                #translator-table .button_column span {
                    font-size: .7em;
                    line-height: 1;
                }
            </style>
            <?php
        }
        ?>
        <script>
            jQuery(document).ready(function($){
                jQuery('#lang-selector').on( 'change', (e) => {
                    console.log('change')
                    console.log(e.target.value)
                    let lang = e.target.value;
                    let base_url = window.location.origin;
                    let magic_url = 'app/translator/';
                    let new_url = base_url + '/' + lang + '/' + magic_url;
                    let params = window.location.search;
                    if ( params ) {
                        new_url += params;
                    }
                    console.log(new_url)
                    window.location.href = new_url;
                } )
            });
            const jsObject = [<?php echo json_encode([
                'images_url' => esc_url_raw( plugin_dir_url( __DIR__ ) . 'assets/images' ),
                'translations' => Zume_Training_Presenter::translations(),
            ]) ?>][0]
        </script>
        <?php
    }
    public function body(){
        if ( !is_user_logged_in() ) { // test if logged in
            if ( $this->language_code === 'en' ) {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->root . '/' . $this->type ) );
            } else {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->language_code . '/' . $this->root . '/' . $this->type ) );
            }
        }
        $this->user = wp_get_current_user();

        if ( ! in_array( 'custom_language_translator', (array) $this->user->roles ) ) {  // test if approved translator role
            echo 'User ' . $this->user->user_email . ' is not a translator.';
            return;
        }
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        if ( 'en' === $this->language_code && ! in_array( 'administrator', (array) $this->user->roles ) ) {
            wp_redirect( site_url() . '/'.$approved_languages[0].'/' . $this->root . '/' . $this->type );
        }

        global $zume_languages_full_list;
        $zume_languages =$zume_languages_full_list;
        $language = $zume_languages[$this->language_code];

        $tab = $_GET['tab'] ?? 'status';
        $tabs = [
            'status' => $tab === 'status' ? '' : 'hollow',
            'weblate' => $tab === 'weblate' ? '' : 'hollow hollow-focus',
            'home' => $tab === 'home' ? '' : 'hollow hollow-focus',
            'scripts' => $tab === 'scripts' ? '' : 'hollow hollow-focus',
            'activities' => $tab === 'activities' ? '' : 'hollow hollow-focus',
            'messages' => $tab === 'messages' ? '' : 'hollow hollow-focus',
            'pieces' => $tab === 'pieces' ? '' : 'hollow hollow-focus',
            'assets' => $tab === 'assets' ? '' : 'hollow',
            'qr_codes' => $tab === 'qr_codes' ? '' : 'hollow ',
        ]
        ?>
        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <div class="grid-x grid-padding-x" >
                <div class="cell medium-9" id="translator-tabs">
                    <?php
                    foreach ( $tabs as $tab_name => $class ) {
                        ?>
                        <a class="button <?php echo $class ?>" href="<?php echo site_url() . '/' . $this->language_code ?>/app/translator?tab=<?php echo $tab_name ?>"><span style="text-transform:uppercase;"><?php echo $tab_name ?></span></a>
                        <?php
                    }
                    ?>
                    <a class="button <?php echo $tab === 'translators' ? '' : 'hollow ' ?>" href="<?php echo site_url() . '/' . $this->language_code ?>/app/translator?tab=translators"><img src="<?php echo ZUME_TRAINING_ASSETS_URL ?>images/profile.svg" style="width:15px;height:15px;margin:0;" /></a>
                    <?php
                    if ( in_array( 'administrator', (array) $this->user->roles ) ) {
                        echo '<a class="button hollow clear" href="/app/translations">Scoreboard</a>';
                    }
                    ?>
                </div>
                <div class="cell medium-3">
                    <select id="lang-selector">
                        <option value="<?php echo $language['code'] ?>" selected><?php echo $language['name'] ?></option>
                        <option>----------</option>
                        <?php
                        foreach ( $zume_languages as $k => $l ) {
                            if ( 'en' === $k && ! in_array( 'administrator', $this->user->roles ) ) {
                                continue;
                            }
                            if ( empty( $approved_languages ) || ! in_array( $k, $approved_languages ) && ! in_array( 'administrator', $this->user->roles ) ) {
                                continue;
                            }
                            ?>
                            <option value="<?php echo $l['code'] ?>"><?php echo $l['name'] ?> (<?php echo $l['code'] ?>)</option>
                            <?php
                        }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x" style="margin-top: 100px;">
            <div class="cell" id="content">
                <?php $this->$tab() ?>
            </div>
        </div>
        <?php
    }

    /**
     * false means approved
     * true means not approved, and lists approved languages
     */
    public function access_failure_test() {
        if ( empty( $this->user ) ) {
            $this->user = wp_get_current_user();
        }
        if ( in_array( 'administrator', $this->user->roles ) ) {
            return false;
        }
        if ( $this->language_code === 'en' && ! in_array( 'administrator', (array) $this->user->roles ) ) {
            return true;
        }
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        if ( in_array( $this->language_code, $approved_languages ) ) {
            return false;
        }
        return true;
    }
    public function list_approved_languages() {
        global $zume_languages_full_list;
        if ( empty( $this->user ) ) {
            $this->user = wp_get_current_user();
        }
        $zume_languages = $zume_languages_full_list;
        echo 'You are nor approved to translate '.$zume_languages[$this->language_code]['name'].'. <br><br>Approved languages are:<br>';
        $approved_languages = get_user_meta( $this->user->ID, 'zume_user_languages', true );
        $list = [];
        foreach ( $approved_languages as $lang ) {
            if ( 'en' === $lang ) {
                continue;
            }
            echo '<a href="'. site_url() . '/' . $lang . '/' . $this->root . '/' . $this->type . '">'. $zume_languages[$lang]['name'] . '</a><br>';
        }
    }

    public function status() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        $language = $this->language;

        /**
        * Template for the status tab
        */
        ?>
        <style>
            span.green {
                background-color: green;
                width: 20px;
                height: 20px;
                padding: 0 .6em;
                color: white;
            }
            span.green::after {
                content: "\2713";
            }
            span.red {
                background-color: red;
                width: 20px;
                height: 20px;
                padding: 0 .7em;
            }
            span.red::after {
                content: "\2717";
            }

            <?php echo ( $language['rtl'] ) ? '.right_column { text-align:left; }' : '.right_column { text-align:right; }'; ?>
        </style>
        <div class="grid-x grid-padding-x grid-padding-y" style="max-width:1000px; margin: 0 auto;">


            <!-- WORD COUNT -->
            <div class="cell center grey-back">
                <strong>WORD COUNT</strong>
            </div>
            <div class="cell center">
                <?php
                $weblate = zume_get_weblate();
                $pieces_en = zume_word_count_pieces( 'en' );
                $scripts_en = zume_word_count_scripts( 'en' );
                $activities_en = zume_word_count_activities( 'en' );
                $messages_en = zume_word_count_messages( 'en' );
                ?>
                <div>
                    <p style="text-align:center;margin: 10px 0 0;"><strong style="text-decoration: underline;">ENGLISH WORDS</strong>:</p>
                    <strong>Weblate: </strong> <?php echo number_format( $weblate[$language['weblate']]['total_words'] ); ?> |
                    <strong>Scripts: </strong> <?php echo number_format( $scripts_en ); ?> |
                    <strong>Activities: </strong> <?php echo number_format( $activities_en ); ?> |
                    <strong>Messages: </strong> <?php echo number_format( $messages_en ); ?> |
                    <strong>Pieces: </strong> <?php echo number_format( $pieces_en ); ?> ||
                    <strong style="text-decoration: underline;">TOTAL: </strong> <?php echo number_format( $pieces_en + $scripts_en + $activities_en + $messages_en + $weblate[$language['weblate']]['total_words'] ); ?>
                </div>
                <?php
                $pieces = zume_word_count_pieces( $language['code'] );
                $scripts = zume_word_count_scripts( $language['code'] );
                $activities = zume_word_count_activities( $language['code'] );
                $messages = zume_word_count_messages( $language['code'] );
                ?>
                <div>
                    <p style="text-align:center;margin: 10px 0 0;"><strong style="text-decoration: underline; text-transform: uppercase;"><?php echo $language['name'] ?> WORDS</strong>:</p>
                    <strong>Weblate:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated_words'] ); ?> |
                    <strong>Scripts:</strong> <?php echo number_format( $scripts ); ?> |
                    <strong>Activities:</strong> <?php echo number_format( $activities ); ?> |
                    <strong>Messages:</strong> <?php echo number_format( $messages ); ?> |
                    <strong>Pieces:</strong> <?php echo number_format( $pieces ); ?> ||
                    <strong style="text-decoration: underline;">TOTAL:</strong> <?php echo number_format( $pieces + $scripts + $activities + $messages + $weblate[$language['weblate']]['translated_words'] ); ?>
                </div>
                <div>
                    <p style="text-align: center; margin: 10px 0 0;"><strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE STRINGS: </strong></p>
                    <strong>English:</strong> <?php echo number_format( $weblate[$language['weblate']]['total'] ); ?> |
                    <strong><?php echo $language['name'] ?>:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated'] ); ?> (<?php echo $weblate[$language['weblate']]['translated_percent']; ?>%)
                </div>
            </div>



            <!-- WEBLATE -->
            <div class="cell center grey-back">
                <strong>WEBLATE</strong>
            </div>
            <div class="cell center">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    <img src="https://translate.disciple.tools/widget/zume-training/zume-training-system/<?php echo $this->language['weblate'] ?>/svg-badge.svg?native=1" alt="Translation status" style="height:50px;margin:0;" />
                </a>
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>
                </a>
            </div>




             <!-- HOME -->
            <div class="cell center grey-back">
                <strong>HOME</strong>
            </div>
            <div class="cell center">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $home_key = 'home_'.$this->language_code.'19850';
                        $zume_pages = zume_last_activity( 'zume_page' );
                    ?>
                    <tr>
                        <td>
                           Home Page Title
                        </td>
                        <td class="right_column">
                             Content:
                             <span class="<?php echo $zume_pages[$home_key]['log']['color'] ?? 'red' ?>"> </span>
                             <span class="<?php echo $zume_pages[$home_key]['edit']['color'] ?? 'red' ?>"> </span>
                             <span class="<?php echo $zume_pages[$home_key]['proof']['color'] ?? 'red' ?>"> </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>



            <!-- SCRIPTS -->
            <div class="cell center grey-back">
                <strong>SCRIPTS</strong>
            </div>
             <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $scripts = list_zume_scripts( $language['code'] );
                        $fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();
                        $zume_scripts = zume_last_activity( 'zume_scripts' );
                    foreach ( $fields as $script_id => $item ) {
                        $key = $scripts[$script_id]['script_id'].$scripts[$script_id]['post_id'];
                        ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['name'] ?? '' ?> </strong>
                                </td>
                                <td class="right_column">
                                     Content:
                                     <span class="<?php echo $zume_scripts[$key]['log']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_scripts[$key]['edit']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_scripts[$key]['proof']['color'] ?? 'red' ?>"> </span>
                                </td>
                            </tr>
                            <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>



            <!-- ACTIVITIES -->
            <div class="cell center grey-back">
                <strong>ACTIVITIES</strong>
            </div>
            <div class="cell">
                 <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $activities = list_zume_activities( $language['code'] );
                        $zume_activities = zume_last_activity( 'zume_activities' );
                    foreach ( $activities as $item ) {
                        $title_key = 'title_'.$item['language_code'].$item['post_id'];
                        $content_key = 'content_'.$item['language_code'].$item['post_id'];
                        ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong>
                                </td>
                                <td class="right_column">
                                     Title:
                                     <span class="<?php echo $zume_activities[$title_key]['log']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_activities[$title_key]['edit']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_activities[$title_key]['proof']['color'] ?? 'red' ?>"> </span>
                                     <br>
                                    Content:
                                     <span class="<?php echo $zume_activities[$content_key]['log']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_activities[$content_key]['edit']['color'] ?? 'red' ?>"> </span>
                                     <span class="<?php echo $zume_activities[$content_key]['proof']['color'] ?? 'red' ?>"> </span>
                                </td>
                            </tr>
                            <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>




             <!-- MESSAGES -->
            <div class="cell center grey-back">
                <strong>MESSAGES</strong>
            </div>
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $messages_other_language = list_zume_messages( $this->language_code );
                        $zume_messages = zume_last_activity( 'zume_messages' );
                    foreach ( $messages_other_language as $item ) {
                        $subject_key = 'subject_'.$item['language_code'].$item['post_id'];
                        $body_key = 'body_'.$item['language_code'].$item['post_id'];
                        ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong>
                                </td>
                                <td class="right_column">
                                    Subject:
                                    <span class="<?php echo $zume_messages[$subject_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_messages[$subject_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_messages[$subject_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                    Body:
                                    <span class="<?php echo $zume_messages[$body_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_messages[$body_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_messages[$body_key]['proof']['color'] ?? 'red' ?>"> </span>
                                </td>
                            </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>


            <!-- PIECES -->
            <div class="cell center grey-back">
                <strong>PIECES</strong>
            </div>
            <div class="cell">
                <table style="vertical-align: text-top;">
                    <tbody>
                    <?php
                        $pieces_list = list_zume_pieces( $language['code'] );
                        $zume_pieces = zume_last_activity( 'zume_pieces' );
                    foreach ( $pieces_list as $item ) {
                        $h1_key = 'zume_piece_h1'.$item['post_id'];
                        $pre_key = 'zume_pre_video_content'.$item['post_id'];
                        $post_key = 'zume_post_video_content'.$item['post_id'];
                        $ask_key = 'zume_ask_content'.$item['post_id'];
                        $seo_key = 'zume_seo_meta_description'.$item['post_id'];
                        ?>
                            <tr>
                                <td>
                                    <strong><?php echo $item['post_title'] ?></strong> (<?php echo $item['ID'] ?>)
                                </td>
                                <td class="right_column">
                                    Title h1:
                                    <span class="<?php echo $zume_pieces[$h1_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$h1_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$h1_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                    Pre-Video:
                                    <span class="<?php echo $zume_pieces[$pre_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$pre_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$pre_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                    Post-Video:
                                    <span class="<?php echo $zume_pieces[$post_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$post_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$post_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                    Ask:
                                    <span class="<?php echo $zume_pieces[$ask_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$ask_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$ask_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                    SEO Meta Description:
                                    <span class="<?php echo $zume_pieces[$seo_key]['log']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$seo_key]['edit']['color'] ?? 'red' ?>"> </span>
                                    <span class="<?php echo $zume_pieces[$seo_key]['proof']['color'] ?? 'red' ?>"> </span>
                                    <br>
                                </td>
                            </tr>
                            <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>
            </div><!-- grid -->
        <?php
    }
    public function weblate() {
        $weblate = zume_get_weblate();
        $language = $this->language;
        ?>
        <div class="grid-x padding-x">
            <div class="cell center" style="padding-bottom: 1em;">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    <img src="https://translate.disciple.tools/widget/zume-training/zume-training-system/<?php echo $this->language['weblate'] ?>/svg-badge.svg?native=1" alt="Translation status" style="height:50px;margin:0;" />
                </a>
            </div>
            <div class="cell center">
                <p>
                    <strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE STRINGS: </strong>
                </p>
                <p>
                    <strong>English:</strong> <?php echo number_format( $weblate[$language['weblate']]['total'] ); ?>
                </p>
                <p>
                    <strong><?php echo $language['name'] ?>:</strong> <?php echo number_format( $weblate[$language['weblate']]['translated'] ); ?> (<?php echo $weblate[$language['weblate']]['translated_percent']; ?>%)
                </p>
                <p>
                    <strong style="text-decoration: underline; text-transform: uppercase;">WEBLATE WORDS: </strong>
                </p>
                <p>
                    <strong>English: </strong> <?php echo number_format( $weblate[$language['weblate']]['total_words'] ); ?>
                </p>
                <p>
                    <strong><?php echo $language['name'] ?>: </strong> <?php echo number_format( $weblate[$language['weblate']]['translated_words'] ); ?>
                </p>
                <p>Last Updated: <?php echo gmdate( 'Y-m-d H:i:s', strtotime( $weblate[$language['weblate']]['last_change'] ) ) ?></p>
                <p>Last Author: <?php echo $weblate[$language['weblate']]['last_author'] ?></p>
             </div>
             <div class="cell center">
                <a href="https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>/" target="_blank" >
                    https://translate.disciple.tools/engage/zume-training/-/<?php echo $this->language['weblate'] ?>
                </a>
            </div>
            <div class="cell center">

            </div>
        </div>
        <?php
    }
    public function home() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
         global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];

        // 19850 for post_id
        $pid = 19850; // dedicated home post
        $key = 'home_'.$this->language_code;
        $target = $key.$pid;

        $english = get_post_meta( $pid, 'home_en', true );
        $other_language = get_post_meta( $pid, $key, true );

        $post_type = 'zume_page';
        $last_activity = zume_last_activity( $post_type );
        ?>
        <style>
            #hero-text-section h1 { font-weight: 400; font-family: "Bebas Kai", sans-serif; font-size: 108px; line-height: 108px; color: #0a0a0a; margin:0; text-align: center; }
            #hero-text-section h2 { font-weight: 400; font-family: "Bebas Kai", sans-serif; font-size: 162px; line-height: 162px; color: #2CACE2; margin: 0; text-align: center; }
            #hero-text-section h3 { font-weight: 400; font-family: "Poppins", sans-serif; font-size: 30px; line-height: 30px; color: #0a0a0a; margin: 0; text-align: center; }
        </style>
        <div class="grid-x padding-x">
            <div class="cell" style="text-align:center;">
                <a href="https://www.loom.com/share/f73289f262e14585b453d49ef67f50bc?sid=a7ad0fd8-9ab8-462c-89ea-a2587f72d1a4">Instructions on installing home page text.</a>
            </div>
            <div class="cell">
                <table style="vertical-align: text-top;" id="translator-table">
                    <thead>
                        <tr>
                            <th style="width:40%;">
                                ENGLISH<br>
                                <a href="<?php echo zume_home_url( $this->language_code ); ?>"><?php echo zume_home_url( 'en' ); ?></a>
                            </th>
                            <th style="width:50%;">
                                <span style="text-transform:uppercase;"><?php echo $language['name'] ?></span><br>
                                <a href="<?php echo zume_home_url( $this->language_code ); ?>"><?php echo zume_home_url( $this->language_code ); ?></a>
                            </th>
                            <th style="width:10%;" class="button_column">
                                Save
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div id="hero-text-section">
                                    <?php echo $english; ?>
                                </div>
                            </td>
                            <td>
                                <textarea style="height:500px;" id="<?php echo $target ?>" ><?php echo $other_language; ?></textarea>
                            </td>
                            <td class="button_column">
                                <!-- Translation Button -->
                                <div>
                                    <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                    <span class="loading-spinner small <?php echo $target ?>log"></span>
                                </div>
                                <div>
                                    <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                </div>
                                <div>
                                    <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                </div>
                                <!-- Editorial Verification -->
                                <div>
                                    <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                    <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                </div>
                                <div>
                                    <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                </div>
                                <div>
                                    <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                </div>
                                <!-- Proof Read Verification -->
                                <div>
                                    <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                    <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                </div>
                                <div>
                                    <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                </div>
                                <div>
                                    <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                    let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';
                    let lang = '<?php echo $language['weblate'] ?>';

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code wordcount lists autoresize',
                        menubar: '',
                        toolbar: 'undo redo | h1 h2 h3 | code removeformat',
                        paste_as_text: true,
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3',
                        min_height: 800,
                        format_empty_lines: true,
                        directionality: direction,
                        content_style: 'h1 { font-weight: 400; font-family: "Bebas Kai", sans-serif; font-size: 50px; line-height: 50px; color: #0a0a0a; margin: 0; text-align: center;} h2 { font-weight: 400; font-family: "Bebas Kai", sans-serif; font-size: 75px; line-height: 75px; color: #2CACE2; margin:0; text-align: center; } h3 { font-weight: 400; font-family: "Poppins", sans-serif; font-size: 18px; line-height: 18px; color: #0a0a0a; margin: 0; text-align: center; }',
                        language: lang,
                    });
                    jQuery('.save_textarea').on( 'click', (e) => {
                        console.log('save_textarea')
                         let content = tinymce.get(e.target.dataset.target).getContent();
                        send_update( e, 'save_textarea', content )
                    } )
                    jQuery('.save_text').on( 'click', (e) => {
                        console.log('save_text')
                        let content = jQuery('.'+e.target.dataset.target).val();
                        send_update( e, 'save_text', content )
                    } )
                    function send_update( e, field_type, content ) {
                        let target = e.target.dataset.target;
                        let key = e.target.dataset.key;
                        let postid = e.target.dataset.post;
                        let type = e.target.dataset.type;
                        let post_type = '<?php echo $post_type ?>';

                        jQuery('.loading-spinner.' + target+type).addClass('active');
                        jQuery('.author.' + target+type).empty();
                        jQuery('.time.' + target+type).empty();

                        zumeRequest.post( 'translation/update', { key: key, postid: postid, type: type, post_type: post_type, content: content } )
                        .then( (response) => {
                            console.log(response)
                            jQuery('.loading-spinner.' + target+type).removeClass('active');

                            if ( ! response ) {
                                return
                            }

                            jQuery('.'+field_type+'.'+ target+'log').removeClass('red').removeClass('green').addClass(response['log'].color);
                            jQuery('.'+field_type+'.'+ target+'edit').removeClass('red').removeClass('green').addClass(response['edit'].color);
                            jQuery('.'+field_type+'.' + target+'proof').removeClass('red').removeClass('green').addClass(response['proof'].color);

                            jQuery('.author.' + target+type).html(response[type].author);
                            jQuery('.time.' + target+type).html(response[type].time);
                        } )
                    }
              });
           </script>
        <?php
    }
    public function scripts() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        $en_list = list_zume_scripts( 'en' );
        $language_list = list_zume_scripts( $language['code'] );
        $fields = Zume_Scripts_Post_Type::instance()->get_custom_fields_settings();
        $post_type = 'zume_scripts';
        $last_activity = zume_last_activity( $post_type );

        $list = [];

        foreach ( $en_list as $i => $v ) {
            $list[$v['script_id']] = [
                'en' => [],
                'lang' => [],
            ];
        }

        foreach ( $en_list as $i => $v ) {
            $list[$v['script_id']]['en'] = $v;
        }
        foreach ( $language_list as $i => $v ) {
            $list[$v['script_id']]['lang'] = $v;
        }
        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table style="vertical-align: text-top;"  id="translator-table">
                    <thead>
                        <tr>
                            <th>
                                ENGLISH
                            </th>
                            <th>
                                <span style="text-transform:uppercase;"><?php echo $language['name'] ?></span>
                            </th>
                            <th>
                                Save
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                    foreach ( $fields as $script_id => $item ) {
                        ?>
                            <tr>
                                <td style="background-color: grey; width: 40%; color: white;"><?php echo $item['name'] ?? '' ?></td>
                                <td style="background-color: grey; width: 40%;"></td>
                                <td style="background-color: grey; width: 10%;"></td>
                            </tr>
                            <tr>
                                <td><a href="<?php echo site_url() . '/en/app/script?s=' . $script_id  ?>" target="_blank"><?php echo site_url() . '/en/app/script?s=' . $script_id  ?></a></td>
                                <td><a href="<?php echo site_url() . '/'.$this->language_code.'/app/script?s=' . $script_id  ?>" target="_blank"><?php echo site_url() . '/'.$this->language_code.'/app/script?s=' . $script_id  ?></a></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                <?php echo $en_list[$script_id]['content'] ?? ''  ?>
                                </td>
                                <?php
                                $pid = $language_list[$script_id]['post_id'];
                                $key = $script_id;
                                $target = $script_id.$pid;
                                ?>
                                <td>
                                    <textarea style="height:500px;" id="<?php echo $target ?>" ><?php echo $language_list[$script_id]['content'] ?? '';  ?></textarea>
                                </td>
                                 <td class="button_column">
                                        <!-- Translation Button -->
                                        <div>
                                            <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                            <span class="loading-spinner small <?php echo $target ?>log"></span>
                                        </div>
                                        <div>
                                            <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                        </div>
                                        <div>
                                            <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                        </div>
                                        <!-- Editorial Verification -->
                                        <div>
                                            <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                            <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                        </div>
                                        <div>
                                            <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                        </div>
                                        <div>
                                            <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                        </div>
                                        <!-- Proof Read Verification -->
                                        <div>
                                            <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                            <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                        </div>
                                        <div>
                                            <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                        </div>
                                        <div>
                                            <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                        </div>
                                    </td>
                            </tr>
                            <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                    let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';
                    let lang = '<?php echo $language['weblate'] ?>';

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image autoresize',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        paste_as_text: true,
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 800,
                        format_empty_lines: true,
                        directionality: direction,
                        content_style: 'h3 { font-weight: 500; color: #2CACE2; font-size: 23px; } strong { font-weight: 500; color: #2CACE2;}',
                        language: lang,
                    });
                    jQuery('.save_textarea').on( 'click', (e) => {
                        console.log('save_textarea')
                         let content = tinymce.get(e.target.dataset.target).getContent();
                        send_update( e, 'save_textarea', content )
                    } )
                    jQuery('.save_text').on( 'click', (e) => {
                        console.log('save_text')
                        let content = jQuery('.'+e.target.dataset.target).val();
                        send_update( e, 'save_text', content )
                    } )
                    function send_update( e, field_type, content ) {
                        let target = e.target.dataset.target;
                        let key = e.target.dataset.key;
                        let postid = e.target.dataset.post;
                        let type = e.target.dataset.type;
                        let post_type = '<?php echo $post_type ?>';

                        jQuery('.loading-spinner.' + target+type).addClass('active');
                        jQuery('.author.' + target+type).empty();
                        jQuery('.time.' + target+type).empty();

                        zumeRequest.post( 'translation/update', { key: key, postid: postid, type: type, post_type: post_type, content: content } )
                        .then( (response) => {
                            console.log(response)
                            jQuery('.loading-spinner.' + target+type).removeClass('active');

                            if ( ! response ) {
                                return
                            }

                            jQuery('.'+field_type+'.'+ target+'log').removeClass('red').removeClass('green').addClass(response['log'].color);
                            jQuery('.'+field_type+'.'+ target+'edit').removeClass('red').removeClass('green').addClass(response['edit'].color);
                            jQuery('.'+field_type+'.' + target+'proof').removeClass('red').removeClass('green').addClass(response['proof'].color);

                            jQuery('.author.' + target+type).html(response[type].author);
                            jQuery('.time.' + target+type).html(response[type].time);
                        } )
                    }
              });
              </script>
        <?php
    }
    public function activities() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $languages = $zume_languages_full_list;
        $language = $languages[$this->language_code];
        $activities_english = list_zume_activities( 'en' );
        $activities_other_language = list_zume_activities( $this->language_code );
        $post_type = 'zume_activities';
        $last_activity = zume_last_activity( $post_type );

        ob_start();
        foreach ( $activities_english as $message ) {
            $pid = $message['post_id'];
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr>
                <td colspan="2">
                    <?php echo $activities_english[$pid]['post_title'] ?? '' ?><br />
                    <a href="<?php echo site_url() . '/en/activities/' . $activities_english[$pid]['post_title'] ?>" target="_blank"><?php echo site_url() . '/en/activities/' . $activities_english[$pid]['post_title'] ?></a>
                </td>
                <td colspan="2">
                    <br />
                    <a href="<?php echo site_url() . '/' . $this->language_code . '/activities/' . $activities_other_language[$pid]['post_title'] ?>" target="_blank">
                    <?php echo site_url() . '/' . $this->language_code . '/activities/' . $activities_other_language[$pid]['post_title'] ?>
                    </a>
                </td>
            </tr>

            <?php
                $key = 'title_'.$this->language_code;
                $target = 'title_'.$this->language_code.$pid;
            ?>
            <tr>
                <td><strong>Title:</strong></td>
                <td>
                    <?php echo $activities_english[$pid]['title'] ?? '' ?><br>
                </td>
                <td>
                    <input type="text" class="<?php echo $target ?>" value="<?php echo $activities_other_language[$pid]['title'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
                </td>
                <td class="button_column">
                    <!-- Translation Button -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                    </div>
                    <!-- Editorial Verification -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                    </div>
                    <!-- Proof Read Verification -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                    </div>
                </td>
            </tr>

            <?php
                $key = 'content_'.$this->language_code;
                $target = 'content_'.$this->language_code.$pid;
            ?>
            <tr>
                <td>
                    <strong>Content:</strong>
                </td>
                <td>
                    <?php echo $activities_english[$pid]['content'] ?? '' ?><br>
                </td>
                <td>
                    <textarea id="<?php echo $target ?>" placeholder="Body for <?php echo $language['name'] ?>"><?php echo $activities_other_language[$pid]['content'] ?? '' ?></textarea>
                </td>
                 <td class="button_column">
                    <!-- Translation Button -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                    </div>
                    <!-- Editorial Verification -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                    </div>
                    <!-- Proof Read Verification -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                    </div>
                </td>
            </tr>
            <?php
        }
        $table = ob_get_clean();
        ?>
        <table id="translator-table">
            <thead>
                <tr>
                    <th style="width:5%;"></th>
                    <th style="width:40%;">English</th>
                    <th style="width:40%;"><?php echo $language['name'] ?></th>
                    <th  style="width:5%;">Save</th>
                </tr>
            </thead>
            <tbody><?php echo $table ?></tbody>
        </table>
        <script>
            jQuery(document).ready(function($){
                jQuery(document).foundation();

                 let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';
                 let lang = '<?php echo $language['weblate'] ?>';

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image table autoresize',
                    menubar: 'insert table',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat ',
                    paste_as_text: true,
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 800,
                    format_empty_lines: true,
                    directionality: direction,
                    content_style: 'h3 { font-weight: 500; color: #2CACE2; font-size: 23px; } strong { font-weight: 500; color: #2CACE2;}',
                    language: lang,
                });
                jQuery('.save_textarea').on( 'click', (e) => {
                    console.log('save_textarea')
                     let content = tinymce.get(e.target.dataset.target).getContent();
                    send_update( e, 'save_textarea', content )
                } )
                jQuery('.save_text').on( 'click', (e) => {
                    console.log('save_text')
                    let content = jQuery('.'+e.target.dataset.target).val();
                    send_update( e, 'save_text', content )
                } )
                function send_update( e, field_type, content ) {
                    let target = e.target.dataset.target;
                    let key = e.target.dataset.key;
                    let postid = e.target.dataset.post;
                    let type = e.target.dataset.type;
                    let post_type = '<?php echo $post_type ?>';

                    jQuery('.loading-spinner.' + target+type).addClass('active');
                    jQuery('.author.' + target+type).empty();
                    jQuery('.time.' + target+type).empty();

                    zumeRequest.post( 'translation/update', { key: key, postid: postid, type: type, post_type: post_type, content: content } )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target+type).removeClass('active');

                        if ( ! response ) {
                            return
                        }

                        jQuery('.'+field_type+'.'+ target+'log').removeClass('red').removeClass('green').addClass(response['log'].color);
                        jQuery('.'+field_type+'.'+ target+'edit').removeClass('red').removeClass('green').addClass(response['edit'].color);
                        jQuery('.'+field_type+'.' + target+'proof').removeClass('red').removeClass('green').addClass(response['proof'].color);

                        jQuery('.author.' + target+type).html(response[type].author);
                        jQuery('.time.' + target+type).html(response[type].time);
                    } )
                }
              });
              </script>
        <?php
    }
    public function messages() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $languages = $zume_languages_full_list;
        $language = $languages[$this->language_code];
        $messages_english = list_zume_messages( 'en' );
        $messages_other_language = list_zume_messages( $this->language_code );
        $post_type = 'zume_messages';
        $last_activity = zume_last_activity( $post_type );

        ob_start();
        foreach ( $messages_english as $message ) {
            $pid = $message['post_id'];
            ?>
            <tr><td colspan="4" style="background:black;"></td></tr>
            <tr>
                <td colspan="2">
                    <?php echo $messages_english[$pid]['post_title'] ?? '' ?> <?php echo ( $messages_english[$pid]['post_parent'] ) ? '(follow up to ' . get_the_title( $messages_english[$pid]['post_parent'] ) . ')' : '' ?>
                    <br><a href="<?php echo site_url() . '/en/app/message/?m='.$pid ?>" target="_blank"><?php echo site_url() . '/en/app/message/?m='.$pid ?></a>
                    <br><span style="font-size:.7em;"><em>Marketing Logic: <?php echo $message['logic'] ?? '' ?></em></span>
                    <br><span style="font-size:.7em;"><em>Stage: <?php echo ucwords( $message['stage'] ?? '' ) ?></em></span>
                </td>
                <td colspan="2">
                    <?php echo $messages_other_language[$pid]['post_title'] ?? '' ?>
                    <br><a href="<?php echo site_url() .'/'. $this->language_code . '/app/message/?m='.$pid ?>" target="_blank"><?php echo site_url() .'/'. $this->language_code . '/app/message/?m='.$pid ?></a>
                </td>
            </tr>

            <?php
                $key = 'subject_'.$this->language_code;
                $target = 'subject_'.$this->language_code.$pid;
            ?>
            <tr>
                <td style="width:10%;"><strong>Subject:</strong></td>
                <td style="width:40%">
                    <?php echo $messages_english[$pid]['subject'] ?? '' ?><br>
                </td>
                <td style="width:40%;">
                    <input type="text" class="<?php echo $target ?>" value="<?php echo $messages_other_language[$pid]['subject'] ?? '' ?>" placeholder="Subject for <?php echo $language['name'] ?>" />
                </td>
                <td class="button_column">
                    <!-- Translation Button -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                    </div>
                    <!-- Editorial Verification -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                    </div>
                    <!-- Proof Read Verification -->
                    <div>
                        <button class="button small save_text <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                    </div>
                </td>
            </tr>

            <?php
            $key = 'body_'.$this->language_code;
            $target = 'body_'.$this->language_code.$pid;
            ?>
            <tr>
                <td>
                    <strong>Body:</strong>
                </td>
                <td>
                    <?php echo $messages_english[$pid]['body'] ?? '' ?><br>
                </td>
                <td>
                    <textarea id="<?php echo $target ?>" placeholder="Body for <?php echo $language['name'] ?>"><?php echo $messages_other_language[$pid]['body'] ?? '' ?></textarea>
                </td>
                <td class="button_column">
                    <!-- Translation Button -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                    </div>
                    <!-- Editorial Verification -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                    </div>
                    <!-- Proof Read Verification -->
                    <div>
                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                    </div>
                    <div>
                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                    </div>
                    <div>
                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                    </div>
                </td>
            </tr>
            <?php
        }
        $table = ob_get_clean();
        ?>
        <table id="translator-table">
            <thead>
                <tr>
                    <th></th>
                    <th>English</th>
                    <th><?php echo $language['name'] ?></th>
                    <th>Save</th>
                </tr>
            </thead>
            <tbody><?php echo $table ?></tbody>
        </table>
        <script>
            jQuery(document).ready(function($){
                jQuery(document).foundation();

                 let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';
                 let lang = '<?php echo $language['weblate'] ?>';

                tinymce.init({
                    selector: 'textarea',
                    plugins: 'code link wordcount lists image autoresize',
                    menubar: 'insert',
                    toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                    paste_as_text: true,
                    link_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                        {title: 'Primary Button', value: 'button primary-button-hollow'},
                    ],
                    block_formats: 'Paragraph=p; Header 3=h3',
                    min_height: 500,
                    format_empty_lines: true,
                    directionality: direction,
                    content_style: 'h3 { font-weight: 500; color: #2CACE2; font-size: 23px; } strong { font-weight: 500; color: #2CACE2;}',
                    language: lang,
                });
                jQuery('.save_textarea').on( 'click', (e) => {
                    console.log('save_textarea')
                     let content = tinymce.get(e.target.dataset.target).getContent();
                    send_update( e, 'save_textarea', content )
                } )
                jQuery('.save_text').on( 'click', (e) => {
                    console.log('save_text')
                    let content = jQuery('.'+e.target.dataset.target).val();
                    send_update( e, 'save_text', content )
                } )
                function send_update( e, field_type, content ) {
                    let target = e.target.dataset.target;
                    let key = e.target.dataset.key;
                    let postid = e.target.dataset.post;
                    let type = e.target.dataset.type;
                    let post_type = '<?php echo $post_type ?>';

                    jQuery('.loading-spinner.' + target+type).addClass('active');
                    jQuery('.author.' + target+type).empty();
                    jQuery('.time.' + target+type).empty();

                    zumeRequest.post( 'translation/update', { key: key, postid: postid, type: type, post_type: post_type, content: content } )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target+type).removeClass('active');

                        if ( ! response ) {
                            return
                        }

                        jQuery('.'+field_type+'.'+ target+'log').removeClass('red').removeClass('green').addClass(response['log'].color);
                        jQuery('.'+field_type+'.'+ target+'edit').removeClass('red').removeClass('green').addClass(response['edit'].color);
                        jQuery('.'+field_type+'.' + target+'proof').removeClass('red').removeClass('green').addClass(response['proof'].color);

                        jQuery('.author.' + target+type).html(response[type].author);
                        jQuery('.time.' + target+type).html(response[type].time);
                    } )
                }
              });
              </script>
        <?php
    }
    public function pieces() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        global $zume_languages_full_list;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        $en_list = list_zume_pieces( 'en' );
        $language_list = list_zume_pieces( $language['code'] );
        $post_type = 'zume_pieces';
        $last_activity = zume_last_activity( $post_type );

        $list = [];

        foreach ( $en_list as $i => $v ) {
            $list[$v['zume_piece']] = [
                'en' => [],
                'lang' => [],
            ];
        }

        foreach ( $en_list as $i => $v ) {
            $list[$v['zume_piece']]['en'] = $v;
        }
        foreach ( $language_list as $i => $v ) {
            $list[$v['zume_piece']]['lang'] = $v;
        }
        ?>
        <div class="grid-x grid-padding-x">
            <div class="cell">
                <table style="vertical-align: text-top;" id="translator-table">
                    <thead>
                        <tr>
                            <th colspan="2">
                                ENGLISH
                            </th>
                            <th >
                                <span style="text-transform:uppercase;"><?php echo $language['name'] ?></span>
                            </th>
                            <th>
                                Save
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                    foreach ( $list as $item ) {
                        $pid = $item['lang']['post_id']
                        ?>
                            <tr>
                                <td style="background-color: black; width: 10%; white-space: nowrap;"></td>
                                <td style="background-color: black; width: 40%;"></td>
                                <td style="background-color: black; width: 40%;"></td>
                                <td style="background-color: black; width: 10%;"></td>
                            </tr>
                            <tr>
                                <td>
                                     <strong>Page Title</strong>
                                </td>
                                <td>
                                    <strong><?php echo $item['en']['post_title'] ?? ''; ?></strong><br>
                                    <a href="<?php echo trailingslashit( site_url() ) . 'en/' . $item['en']['post_name'] ?>" target="_blank"><?php echo trailingslashit( site_url() ) . 'en/' . $item['en']['post_name'] ?></a>
                                </td>
                                <td>
                                    <strong><?php echo $item['lang']['post_title'] ?? ''; ?></strong><br>
                                    <a href="<?php echo trailingslashit( site_url() ) . $language['code'] . '/' . $item['lang']['post_name'] ?>" target="_blank"><?php echo trailingslashit( site_url() ) . $language['code'] . '/' . $item['lang']['post_name'] ?></a>
                                </td>
                                <td></td>
                            </tr>

                            <?php
                            $key = 'zume_piece_h1';
                            $target = $key.$pid;
                            ?>
                            <tr>
                                <td>
                                    <strong>Title Override</strong>
                                </td>
                                <td>
                                <?php echo $item['en']['zume_piece_h1'] ?? ''; ?>
                                </td>
                                <td>
                                    <input type="text" value="<?php echo $item['lang']['zume_piece_h1'] ?? '';  ?>" class="<?php echo $target ?>" />
                                </td>
                                <td class="button_column">
                                    <!-- Translation Button -->
                                    <div>
                                        <button class="button small save_text <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Editorial Verification -->
                                    <div>
                                        <button class="button small save_text <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Proof Read Verification -->
                                    <div>
                                        <button class="button small save_text <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                    </div>
                                </td>
                            </tr>

                         <?php
                            $key = 'zume_pre_video_content';
                            $target = $key.$pid;
                            ?>
                            <tr>
                                <td>
                                    <strong>Pre-Video</strong>
                                </td>
                                <td>
                                <?php echo $item['en']['zume_pre_video_content'] ?? ''; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo $target ?>" ><?php echo $item['lang']['zume_pre_video_content'] ?? '';  ?></textarea>
                                </td>
                                 <td class="button_column">
                                    <!-- Translation Button -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Editorial Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Proof Read Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                    </div>
                                </td>
                            </tr>

                            <?php
                            $key = 'zume_post_video_content';
                            $target = $key.$pid;
                            ?>
                            <tr>
                                <td>
                                    <strong>Post-Video</strong>
                                </td>
                                <td>
                                <?php echo $item['en']['zume_post_video_content'] ?? ''; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo $target ?>" class="<?php echo hash( 'sha256', serialize( $item['lang'] ) . 'zume_post_video_content' ) ?>"><?php echo $item['lang']['zume_post_video_content'] ?? '';  ?></textarea>
                                </td>

                                 <td class="button_column">
                                    <!-- Translation Button -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Editorial Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Proof Read Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                    </div>
                                </td>
                            </tr>

                            <?php
                            $key = 'zume_ask_content';
                            $target = $key.$pid;
                            ?>
                            <tr>
                                <td>
                                    <strong>Ask</strong>
                                </td>
                                <td>
                                <?php echo $item['en']['zume_ask_content'] ?? ''; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo $target ?>"><?php echo $item['lang']['zume_ask_content'] ?? '';  ?></textarea>
                                </td>

                                 <td class="button_column">
                                    <!-- Translation Button -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Editorial Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Proof Read Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                    </div>
                                </td>
                            </tr>

                            <?php
                            $key = 'zume_seo_meta_description';
                            $target = $key.$pid;
                            ?>
                            <tr>
                                <td>
                                    <strong>SEO Description</strong>
                                </td>
                                <td>
                                <?php echo $item['en']['zume_seo_meta_description'] ?? ''; ?>
                                </td>
                                <td>
                                    <textarea id="<?php echo $target ?>"><?php echo $item['lang']['zume_seo_meta_description'] ?? '';  ?></textarea>
                                </td>

                                 <td class="button_column">
                                    <!-- Translation Button -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>log <?php echo empty( $last_activity[$target]['log']['color'] ) ? 'red' : $last_activity[$target]['log']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="log" >Save Translation</button>
                                        <span class="loading-spinner small <?php echo $target ?>log"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>log"><?php echo $last_activity[$target]['log']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Editorial Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>edit <?php echo empty( $last_activity[$target]['edit']['color'] ) ? 'red' : $last_activity[$target]['edit']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="edit" >Save Editorial</button>
                                        <span class="loading-spinner small <?php echo $target ?>edit"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>edit"><?php echo $last_activity[$target]['edit']['time'] ?? '' ?></span>
                                    </div>
                                    <!-- Proof Read Verification -->
                                    <div>
                                        <button class="button small save_textarea <?php echo $target ?>proof <?php echo empty( $last_activity[$target]['proof']['color'] ) ? 'red' : $last_activity[$target]['proof']['color'] ?>" data-target="<?php echo $target ?>" data-post="<?php echo $pid ?>" data-key="<?php echo $key ?>" data-type="proof" >Save Proof</button>
                                        <span class="loading-spinner small <?php echo $target ?>proof"></span>
                                    </div>
                                    <div>
                                        <span class="author <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['author'] ?? '' ?></span>
                                    </div>
                                    <div>
                                        <span class="time <?php echo $target ?>proof"><?php echo $last_activity[$target]['proof']['time'] ?? '' ?></span>
                                    </div>
                                </td>
                            </tr>
                            <?php
                    } ?>
                    </tbody>
                </table>
            </div>
            <script>
                jQuery(document).ready(function($){
                    jQuery(document).foundation();

                     let direction = '<?php echo ( $language['rtl'] ) ? 'rtl' : 'ltr' ?>';
                     let lang = '<?php echo $language['weblate'] ?>';

                    tinymce.init({
                        selector: 'textarea',
                        plugins: 'code link wordcount lists image autoresize',
                        menubar: 'insert',
                        toolbar: 'undo redo | blocks | bold italic bullist numlist | alignleft aligncenter alignjustify | code removeformat',
                        paste_as_text: true,
                        link_class_list: [
                            {title: 'None', value: ''},
                            {title: 'Primary Button Large', value: 'button primary-button-hollow large'},
                            {title: 'Primary Button', value: 'button primary-button-hollow'},
                        ],
                        block_formats: 'Paragraph=p; Header 3=h3',
                        min_height: 500,
                        format_empty_lines: true,
                        directionality: direction,
                        content_style: 'h3 { font-weight: 500; color: #2CACE2; font-size: 23px; } strong { font-weight: 500; color: #2CACE2;}',
                        language: lang,
                    });
                jQuery('.save_textarea').on( 'click', (e) => {
                    console.log('save_textarea')
                     let content = tinymce.get(e.target.dataset.target).getContent();
                    send_update( e, 'save_textarea', content )
                } )
                jQuery('.save_text').on( 'click', (e) => {
                    console.log('save_text')
                    let content = jQuery('.'+e.target.dataset.target).val();
                    send_update( e, 'save_text', content )
                } )
                function send_update( e, field_type, content ) {
                    let target = e.target.dataset.target;
                    let key = e.target.dataset.key;
                    let postid = e.target.dataset.post;
                    let type = e.target.dataset.type;
                    let post_type = '<?php echo $post_type ?>';

                    jQuery('.loading-spinner.' + target+type).addClass('active');
                    jQuery('.author.' + target+type).empty();
                    jQuery('.time.' + target+type).empty();

                    zumeRequest.post( 'translation/update', { key: key, postid: postid, type: type, post_type: post_type, content: content } )
                    .then( (response) => {
                        console.log(response)
                        jQuery('.loading-spinner.' + target+type).removeClass('active');

                        if ( ! response ) {
                            return
                        }

                        jQuery('.'+field_type+'.'+ target+'log').removeClass('red').removeClass('green').addClass(response['log'].color);
                        jQuery('.'+field_type+'.'+ target+'edit').removeClass('red').removeClass('green').addClass(response['edit'].color);
                        jQuery('.'+field_type+'.' + target+'proof').removeClass('red').removeClass('green').addClass(response['proof'].color);

                        jQuery('.author.' + target+type).html(response[type].author);
                        jQuery('.time.' + target+type).html(response[type].time);
                    } )
                }
              });
              </script>
        <?php
    }
    public function assets() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }
        /* copied from replace-placeholder.php:Zume_Replace_Placeholder::replace_content() */
        $language = $this->language;
        ?>
        <div class="grid-x grid-padding-x" >

                <!-- VIDEO PREVIEW -->
                <div class="cell center grey-back">
                    <h2 style="color:white;">VIMEO PREVIEW</h2>
                </div>
                <div class="cell">
                    <?php
                        $video_fields = $this->video_fields;
                        $video_results = list_zume_videos( $this->language_code );

                    foreach ( $video_fields as $key => $row ) {
                        if ( empty( $video_results[$key] ) ) {
                            ?>
                                <div style="float:left; width: 420px; height: 350px; padding:1em; border: 1px solid lightgrey; margin: .5em; padding: .5em;">
                                <?php echo $key . ' - ' . $row['name'] ?> not installed
                                </div>
                                <?php
                        } else {
                            ?>
                                <div style="float:left; width: 420px; height: 350px; padding: 1em; border: 1px solid lightgrey; margin: .5em; padding: .5em;">
                                    <strong><?php echo $row['name'] ?></strong>
                                    <div style="width:400px;height:275px;">
                                    <iframe src="https://player.vimeo.com/video/<?php echo $video_results[$key]['vimeo_id'] ?>?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="width:400px;height:275px;" title="<?php echo $video_results[$key]['piece_id'] ?> "></iframe><script src="https://player.vimeo.com/api/player.js"></script>
                                    </div>
                                </div>
                                <?php
                        }
                    }
                    ?>
                </div>



                <!-- IMAGE ASSETS PREVIEW -->
                <style>
                    .img-wrapper {
                        display: inline-block;
                        width: 400px;
                        height: 600px;
                        margin: 10px;
                        padding: 10px;
                        border: 1px solid lightgrey;
                        border-radius: 5px;
                        float:left;
                    }
                    .img-wrapper img {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .img-wrapper h2 {
                        color: white;
                    }
                </style>
                <div class="cell center grey-back" style="margin-top:100px;">
                    <h2 style="color:white;">SHORTCODES FOR MESSAGES</h2>
                </div>
                <div class="cell">
                    <br>
                    <div class="grid-x grid-padding-x" >
                        <?php
                            $place_holders = Zume_Replace_Placeholder::place_holders();
                            foreach ( $place_holders as $place_holder ) {
                                ?>
                                <div class="cell"><?php echo zume_replace_placeholder( $place_holder, $this->language_code ) ?> <?php echo $place_holder ?></div>
                                <?php
                            }
                        ?>
                    </div>
                </div>

            </div> <!-- wrapping div -->

        <?php
    }
    public function qr_codes() {
        $site_url = 'https://zume.training/';
        ?>
        <style>
            .qr-card {
                display: inline-block;
                width: 300px;
                margin: 10px;
                padding: 10px;
                border: 1px solid lightgrey;
                border-radius: 5px;
                float:left;
            }
            .qr-card .overflow {
                overflow: scroll;
                white-space: nowrap;
            }
            .qr-section h2 {
                color: white;
            }
        </style>


        <!-- Activities -->
        <div id="activities" class="qr-section" style="width:100%;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
                <h2>Activities</h2>
            </div>
            <div>
                <?php
                     $activities = [
                        'soaps',
                        'accountability',
                        'prayercycle',
                        'listof100',
                        'listof100_printable',
                        'sharegospel',
                        'sharetestimony',
                        'lordssupper',
                        'blessprayer',
                        '33group',
                        'prayerwalking',
                        '3monthplan',
                        '3monthplan_printable',
                        'coachingchecklist',
                        'coachingchecklist_mawl',
                        'coachingchecklist_host',
                        'coachingchecklist_two',
                        'peermentoring',
                        '4fields',
                        'genmapping',
                     ];
                     foreach ( $activities as $item ) {
                         $url = $site_url . 'app/qr/?l='.$this->language_code.'&a='.$item;
                         $url_short = 'l='.$this->language_code.'&a='.$item;
                         $qr_url = create_qr_url( $url );
                            ?>
                        <div class="qr-card">
                            <div class="overflow"><h3><?php echo $item ?></h3></div>
                            <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                            </a>
                        </div>
                         <?php
                     }
                        ?>
            </div>
        </div>



        <!-- Videos -->
        <div id="videos" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
             <div class="cell center grey-back">
                <h2>Videos</h2>
            </div>
            <div>
                <?php
                    $training_items = zume_training_items();
                foreach ( $training_items as $item ) {
                    if ( empty( $item['video'] ) ) {
                        continue;
                    }
                    $id = intval( $item['key'] );
                    $url = $site_url . 'app/qr/?l='.$this->language_code. '&v='. $id;
                    $url_short = 'l='.$this->language_code.'&v='.$id;
                    $qr_url = create_qr_url( $url );
                    ?>
                            <div class="qr-card">
                                <div class="overflow"><h3><?php echo $item['video_title'] ?></h3></div>
                                <a href="<?php echo $url ?>" target="_blank">
                                    <img src="<?php echo $qr_url ?>"  />
                                    <div class="overflow"><?php echo $url_short ?></div>
                                </a>
                            </div>
                        <?php
                }
                ?>
            </div>
        </div>





       <!-- Checkins -->
       <div id="checkin" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
               <h2>Checkins</h2>
            </div>
            <div>
                <?php
                $list = [
                    // set a (10 Session)
                    5678 => '10 session 1', //'set_a_01', // 10 session 1
                    2468 => '10 session 2', // 'set_a_02', // 10 session 2
                    6543 => '10 session 3', // 'set_a_03', // 10 session 3
                    8764 => '10 session 4', // 'set_a_04', // 10 session 4
                    6542 => '10 session 5', // 'set_a_05', // 10 session 5
                    1235 => '10 session 6', // 'set_a_06', // 10 session 6
                    4322 => '10 session 7', // 'set_a_07', // 10 session 7
                    9870 => '10 session 8', // 'set_a_08', // 10 session 8
                    1355 => '10 session 9', // 'set_a_09', // 10 session 9
                    5430 => '10 session 10', // 'set_a_10', // 10 session 10
                    // set b (20 Session)
                    3354 => '20 session 1', // 'set_b_01', // 20 session 1
                    4568 => '20 session 2', // 'set_b_02', // 20 session 2
                    8767 => '20 session 3', // 'set_b_03', // 20 session 3
                    6787 => '20 session 4', // 'set_b_04', // 20 session 4
                    3450 => '20 session 5', // 'set_b_05', // 20 session 5
                    2344 => '20 session 6', // 'set_b_06', // 20 session 6
                    1116 => '20 session 7', // 'set_b_07', // 20 session 7
                    5431 => '20 session 8', // 'set_b_08', // 20 session 8
                    8768 => '20 session 9', // 'set_b_09', // 20 session 9
                    2347 => '20 session 10', // 'set_b_10', // 20 session 10
                    9434 => '20 session 11', // 'set_b_11', // 20 session 11
                    2348 => '20 session 12', // 'set_b_12', // 20 session 12
                    6785 => '20 session 13', // 'set_b_13', // 20 session 13
                    9872 => '20 session 14', // 'set_b_14', // 20 session 14
                    4327 => '20 session 15', // 'set_b_15', // 20 session 15
                    2871 => '20 session 16', // 'set_b_16', // 20 session 16
                    4328 => '20 session 17', // 'set_b_17', // 20 session 17
                    6548 => '20 session 18', // 'set_b_18', // 20 session 18
                    7657 => '20 session 19', // 'set_b_19', // 20 session 19
                    2767 => '20 session 20', // 'set_b_20', // 20 session 20
                    // set c (Intensive)
                    1397 => 'Intensive 1', // 'set_c_1', // Intensive 1
                    2341 => 'Intensive 2', // 'set_c_2', // Intensive 2
                    3455 => 'Intensive 3', // 'set_c_3', // Intensive 3
                    4329 => 'Intensive 4', // 'set_c_4', // Intensive 4
                    5451 => 'Intensive 5', // 'set_c_5', // Intensive 5
                ];
                foreach ( $list as $i => $v ) {
                    $url = $site_url . 'app/qr/?l='.$this->language_code. '&c='. $i;
                    $url_short = 'l='.$this->language_code. '&c='. $i;
                    $qr_url = create_qr_url( $url );
                    ?>
                    <div class="qr-card">
                        <h3><?php echo $v ?></h3>
                        <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                        </a>
                    </div>
                    <?php
                }
                ?>
            </div>
       </div>






       <!-- SCRIPTS -->
        <div id="scripts" class="qr-section" style="width:100%;margin-top:100px;float:left;">
            <div style="margin: 0 auto;width: fit-content;"><a href="#activities">Activities</a> | <a href="#videos">Videos</a> | <a href="#checkin">Checkins</a> | <a href="#scripts">Scripts</a><br></div>
            <div class="cell center grey-back">
                <h2>Scripts</h2>
            </div>
            <div>
            <?php
                $training_items = zume_training_items();
            foreach ( $training_items as $item ) {
                if ( empty( $item['script'] ) ) {
                    continue;
                }
                $id = intval( $item['key'] );
                $url = $site_url . 'app/qr/?l='.$this->language_code. '&s='. $item['script'];
                $url_short = 'l='.$this->language_code.'&s='.$item['script'];
                $qr_url = create_qr_url( $url );
                ?>
                    <div class="qr-card">
                        <div class="overflow"><h3><?php echo $item['video_title'] ?></h3></div>
                        <a href="<?php echo $url ?>" target="_blank">
                            <img src="<?php echo $qr_url ?>"  />
                            <div class="overflow"><?php echo $url_short ?></div>
                        </a>
                    </div>
                    <?php
            }
            ?>
            </div>
        </div>
        <?php
    }
    public function translators() {
        if ( $this->access_failure_test() ) {
            $this->list_approved_languages();
            return;
        }

        // query users with translation role
        $translators = get_users( [
            'role' => 'custom_language_translator',
            'meta_query' => [
                [
                    'key' => 'zume_user_languages',
                    'value' => $this->language_code,
                    'compare' => 'LIKE',
                ],
            ],
        ] );
        global $zume_languages_full_list, $wpdb;
        $zume_languages = $zume_languages_full_list;
        $language = $zume_languages[$this->language_code];
        echo '<h3>Translators for ' . $language['name'] . '</h3>';
        if ( ! empty( $translators ) ) {
            foreach ( $translators as $translator ) {
                echo '<strong>' . $translator->user_login . '</strong> (' . $translator->user_email . ') <br>';
            }
        }

//        $recent_logs = $wpdb->get_results("", ARRAY_A );
    }
}

Zume_Training_Translator::instance();


if ( !function_exists( 'list_zume_downloads' ) ) {
    function list_zume_downloads( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.meta_key, pm.meta_value
                                        FROM zume_posts p
                                        JOIN zume_postmeta pm ON pm.post_id=p.ID
                                        WHERE p.post_title = %s
                                            AND p.post_type = 'zume_download'
                                            AND pm.meta_key > 30
                                            AND pm.meta_key < 75
                                        ORDER BY CAST(pm.meta_key AS unsigned);",
        $language_code);
        $results = $wpdb->get_results( $sql, ARRAY_A );

        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $downloads = [];
        foreach ( $results as $result ) {
            $downloads[$result['meta_key']] = $result['meta_value'];
        }
        return $downloads;
    }
}
if ( !function_exists( 'list_zume_scripts' ) ) {
    function list_zume_scripts( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, SUBSTRING( pm.meta_key, 1, 2) as script_id, pm.meta_value as content
                                FROM zume_posts p
                                JOIN zume_postmeta pm ON pm.post_id=p.ID
                                WHERE p.post_type = 'zume_scripts'
                                AND p.post_title = %s
                                AND SUBSTRING( pm.meta_key, 1, 2) > 30
                                AND SUBSTRING( pm.meta_key, 1, 2) < 75
                                ORDER BY CAST(pm.meta_key AS unsigned);",
        $language_code);

        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $scripts = [];
        foreach ( $results as $result ) {
            $scripts[$result['script_id']] = $result;
        }
        return $scripts;
    }
}
if ( !function_exists( 'list_zume_activities' ) ) {
    function list_zume_activities( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, %s as language_code, pm.meta_id as title_meta_id, pm.meta_value as title, pm1.meta_id as content_meta_id, pm1.meta_value as content
                                        FROM zume_posts p
                                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key LIKE CONCAT( 'title_', %s )
                                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'content_', %s )
                                        WHERE p.post_type = 'zume_activities';",
        $language_code, $language_code, $language_code );

        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $activities = [];
        foreach ( $results as $activity ) {
            $activities[$activity['post_id']] = $activity;
        }
        return $activities;
    }
}
function zume_last_activity( $post_type = null ) {
    global $wpdb;
    $post_type_list = "'zume_activities','zume_pieces','zume_messages','zume_scripts'";
    if ( ! empty( $post_type ) ) {
        $post_type_list = "'". $post_type . "'";
    }

    $list = $wpdb->get_results(
        "SELECT tl.id, tl.post_id, tl.meta_key, tl.timestamp, tl.type, tl.author, u.display_name
                FROM zume_postmeta_translator_log tl
                LEFT JOIN zume_users u ON u.ID=tl.author
                WHERE tl.id IN (
                    SELECT MAX(tl1.id)
                    FROM zume_postmeta_translator_log tl1
                    JOIN zume_posts p ON p.ID=tl1.post_id AND p.post_type IN ($post_type_list)
                    GROUP BY tl1.meta_key, tl1.post_id, tl1.type
                )",
    ARRAY_A);
    $data = [];
    foreach ( $list as $item ) {
        if ( !isset( $data[$item['meta_key'].$item['post_id']] ) ){
            $data[$item['meta_key'].$item['post_id']] = [
                'log' => [
                    'time' => '',
                    'author' => '',
                    'color' => 'red',
                    'timestamp' => '',
                ], // save
                'edit' => [
                    'time' => '',
                    'author' => '',
                    'color' => 'red',
                    'timestamp' => '',
                ], // editorial verification
                'proof' => [
                    'time' => '',
                    'author' => '',
                    'color' => 'red',
                    'timestamp' => '',
                ], // proof read
            ];
        }

        $data[$item['meta_key'].$item['post_id']][$item['type']] = [
            'time' => gmdate( 'n-j (g:i a)', strtotime( $item['timestamp'] ) ),
            'author' => $item['display_name'],
            'color' => 'green',
            'timestamp' => strtotime( $item['timestamp'] ),
        ];
    }

    foreach ( $data as $index => $value ) {
        $log = $value['log']['timestamp'];
        $edit = $value['edit']['timestamp'];
        $proof = $value['proof']['timestamp'];

        // log is empty, all red
        if ( empty( $log ) ) {
            $data[$index]['log']['color'] = 'red';
            $data[$index]['edit']['color'] = 'red';
            $data[$index]['proof']['color'] = 'red';
        }
        // log is newer than edit, then red for edit and proof
        else if ( $log > $edit ) {
            $data[$index]['log']['color'] = 'green';
            $data[$index]['edit']['color'] = 'red';
            $data[$index]['proof']['color'] = 'red';
        }
        // edit is newer than proof, then red
        else if ( $edit > $proof ) {
            $data[$index]['log']['color'] = 'green';
            $data[$index]['edit']['color'] = 'green';
            $data[$index]['proof']['color'] = 'red';
        }
    }

//    dt_write_log(__METHOD__);
//    dt_write_log($data);
    return $data;
}

if ( !function_exists( 'list_zume_videos' ) ) {
    function list_zume_videos( $language_code )
    {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, pm.post_id, pm.meta_key as piece_id, pm.meta_value as vimeo_id
                                    FROM zume_posts p
                                    JOIN zume_postmeta pm ON pm.post_id=p.ID
                                    WHERE p.post_title = %s
                                    AND p.post_type = 'zume_video'
                                    AND SUBSTRING( pm.meta_key, 1, 2) > 0
                                    AND SUBSTRING( pm.meta_key, 1, 2) < 75
                                    ORDER BY CAST(pm.meta_key AS unsigned);",
        $language_code);
        $videos_raw = $wpdb->get_results( $sql, ARRAY_A );

        if ( empty( $videos_raw ) || is_wp_error( $videos_raw ) ) {
            return [];
        }

        $videos = [];
        foreach ( $videos_raw as $video ) {
            $videos[$video['piece_id']] = $video;
        }

        return $videos;
    }
}
if ( ! function_exists( 'list_zume_messages' ) ) {
    function list_zume_messages( $language_code ) {
        global $wpdb;

        $sql = $wpdb->prepare("SELECT p.post_title, p.post_parent, pm.post_id, %s as language_code, pm.meta_value as subject, pm1.meta_value as body, pm2.meta_value as logic, pm3.meta_value as stage
                                        FROM zume_posts p
                                        LEFT JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key LIKE CONCAT( 'subject_', %s )
                                        LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key LIKE CONCAT( 'body_', %s )
                                        LEFT JOIN zume_postmeta pm2 ON pm2.post_id=p.ID AND pm2.meta_key = 'logic'
										LEFT JOIN zume_postmeta pm3 ON pm3.post_id=p.ID AND pm3.meta_key = 'stage'
                                        WHERE p.post_type = 'zume_messages'", $language_code, $language_code, $language_code );
        $results = $wpdb->get_results( $sql, ARRAY_A );
        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }
        $messages = [];
        foreach ( $results as $message ) {
            $messages[$message['post_id']] = $message;
        }
        return $messages;
    }
}
if ( !function_exists( 'list_zume_pieces' ) ) {
    function list_zume_pieces( $language_code )
    {
        global $wpdb, $table_prefix;

        $sql = $wpdb->prepare("SELECT p.*,
                                    pm.post_id,
                                    pm.meta_value as zume_lang,
                                    pm1.meta_value as zume_piece,
                                    pm2.meta_value as zume_piece_h1,
                                    pm3.meta_value as zume_pre_video_content,
                                    pm4.meta_value as zume_post_video_content,
                                    pm5.meta_value as zume_ask_content,
                                    pm6.meta_value as zume_seo_meta_description
                                FROM zume_posts p
                                JOIN zume_postmeta pm ON pm.post_id=p.ID AND pm.meta_key = 'zume_lang' AND pm.meta_value = %s
                                LEFT JOIN zume_postmeta pm1 ON pm1.post_id=p.ID AND pm1.meta_key = 'zume_piece'
                                LEFT JOIN zume_postmeta pm2 ON pm2.post_id = p.ID AND pm2.meta_key = 'zume_piece_h1'
                                LEFT JOIN zume_postmeta pm3 ON pm3.post_id = p.ID AND pm3.meta_key = 'zume_pre_video_content'
                                LEFT JOIN zume_postmeta pm4 ON pm4.post_id = p.ID AND pm4.meta_key = 'zume_post_video_content'
                                LEFT JOIN zume_postmeta pm5 ON pm5.post_id = p.ID AND pm5.meta_key = 'zume_ask_content'
                                LEFT JOIN zume_postmeta pm6 ON pm6.post_id = p.ID AND pm6.meta_key = 'zume_seo_meta_description'
                                WHERE p.post_type = 'zume_pieces'
                                ORDER BY CAST(pm1.meta_value AS unsigned );",
        $language_code );
        $results = $wpdb->get_results( $sql, ARRAY_A );

        if ( empty( $results ) || is_wp_error( $results ) ) {
            return [];
        }

        $pieces = [];
        foreach ( $results as $result ) {
            $pieces[$result['post_id']] = $result;
        }

        return $pieces;
    }
}


function zume_word_count_scripts( $language ) {
    $count = 0;
    $scripts = list_zume_scripts( $language );
    foreach ( $scripts as $script ) {
        $count += str_word_count( $script['content'] ?? '' );
    }

    return $count;
}
function zume_word_count_activities( $language ) {
    $count = 0;
    $activities = list_zume_activities( $language );
    foreach ( $activities as $activity ) {
        $count += str_word_count( $activity['title'] ?? '' );
        $count += str_word_count( $activity['content'] ?? '' );
    }

    return $count;
}
function zume_word_count_messages( $language ) {
    $count = 0;
    $messages = list_zume_messages( $language );
    foreach ( $messages as $message ) {
        $count += str_word_count( $message['subject'] );
        $count += str_word_count( $message['body'] );
    }

    return $count;
}
function zume_word_count_pieces( $language ) {
    $count = 0;
    $pieces = list_zume_pieces( $language );
    foreach ( $pieces as $piece ) {
        $count += str_word_count( $piece['zume_piece_h1'] ?? '' );
        $count += str_word_count( $piece['zume_pre_video_content'] ?? '' );
        $count += str_word_count( $piece['zume_post_video_content'] ?? '' );
        $count += str_word_count( $piece['zume_ask_content'] ?? '' );
        $count += str_word_count( $piece['zume_seo_meta_description'] ?? '' );
    }

    return $count;
}
function zume_word_count_english() {
    $count = 0;
    $loader = new PoLoader();
    $translations = $loader->loadFile( plugin_dir_path( __DIR__ ) . 'zume.pot' );

    $strings = array_keys( $translations->getTranslations() );
    foreach ( $strings as $string ) {
        $count += str_word_count( $string );
    }

    return $count;
}
function zume_po_strings_count( $locale ) {

    $count = 0;
    $loader = new PoLoader();

    if ( $locale == 'en' ) {
        $translations = $loader->loadFile( plugin_dir_path( __DIR__ ) . 'zume.pot' );
        $strings = array_keys( $translations->getTranslations() );
    } else {
        $translations = $loader->loadFile( plugin_dir_path( __DIR__ ) . 'zume-'.$locale.'.po' );
        $strings = array_keys( $translations->getTranslations() );
    }

    foreach ( $strings as $string ) {
        if ( !empty( $string ) ) {
            $count++;
        }
    }

    return $count;
}
function zume_get_weblate() {

    if ( get_transient( __METHOD__ ) ) {
        return get_transient( __METHOD__ );
    }

    $results = [];

    $page_1 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json';
    $body_1 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_1 ) ), true );
    if ( ! isset( $body_1['results'] ) ) {
        return $results;
    }
    if ( ! empty( $body_1['next'] ) ) {
        $page_2 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json&page=2';
        $body_2 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_2 ) ), true );
        if ( isset( $body_2['results'] ) ) {
            $results = array_merge( $body_1['results'], $body_2['results'] );
        }
    }
    if ( ! empty( $body_2['next'] ) ) {
        $page_3 = 'https://translate.disciple.tools/api/components/zume-training/zume-training-system/translations/?format=json&page=3';
        $body_3 = json_decode( wp_remote_retrieve_body( wp_remote_get( $page_3 ) ), true );
        if ( isset( $body_3['results'] ) ) {
            $results = array_merge( $results, $body_3['results'] );
        }
    }

    $languages = [];
    foreach ( $results as $result ) {
        $languages[ $result['language']['code'] ] = $result;
    }

    set_transient( __METHOD__, $languages, 60 * 60 ); // 60 minutes

    return $languages;
}

// phpcs:enable
