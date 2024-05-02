<?php
if (!defined('ABSPATH')) {
    exit;
} // Exit if accessed directly.

use Gettext\Loader\PoLoader;


class Zume_Training_Translations extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training - Translations';
    public $root = 'app';
    public $type = 'translations';
    public $user;
    public static $token = 'app_translations';
    public $zume_languages;
    public $language_code;
    public $language;

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

            // register url and access
            add_action( 'template_redirect', [ $this, 'theme_redirect' ] );
            add_filter( 'dt_blank_access', '__return_true', 100, 1 );
            add_filter( 'dt_allow_non_login_access', '__return_true', 100, 1 );
            add_filter( 'dt_override_header_meta', '__return_true', 100, 1 );

            // header content
            add_filter( 'dt_blank_title', [ $this, 'page_tab_title' ] );
            add_action( 'wp_print_scripts', [ $this, 'print_scripts' ], 1500 );
            add_action( 'wp_print_styles', [ $this, 'print_styles' ], 1500 );

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_body', [ $this, 'body_checker' ] );
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
                    margin-block-end: var(--s2);
                }
                img {
                    margin-block-end: var(--s2)
                }
                .checkmark {
                    display: inline-block;
                    transform: rotate(45deg);
                    height: 25px;
                    width: 12px;
                    border-bottom: 7px solid #78b13f;
                    border-right: 7px solid #78b13f;
                }
                #translations-tabs .button {
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
                    let magic_url = 'app/translations/';
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
    public function body_checker() {
        if(!is_user_logged_in()) { // test if logged in
            if ( $this->language_code === 'en' ) {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->root . '/' . $this->type  ) );
            } else {
                wp_redirect( zume_login_url( 'login', site_url() . '/' . $this->language_code . '/' . $this->root . '/' . $this->type  ) );
            }
        }
        $this->user = wp_get_current_user();

        if ( ! in_array( 'administrator', (array) $this->user->roles ) ) {  // test if approved translator role
            echo "User " . $this->user->user_email . " is not an administrator.";
            return;
        }

        $this->body();
    }
    public function body(){

        global $zume_languages_full_list;
        ksort( $zume_languages_full_list );

        $pieces = $this->word_count_pieces( 'en' );
        $scripts = $this->word_count_scripts( 'en' );
        $activities = $this->word_count_activities( 'en' );
        $messages = $this->word_count_messages( 'en' );
        $strings = $this->word_count_strings( 'en' );

        ?>
        <div style="top:0; left:0; position: fixed; background-color: white; padding: .5em; z-index:100; width: 100%; border-bottom: 1px solid lightgrey;">
            <div class="grid-x grid-padding-x" >
                <div class="cell medium-9" id="translator-tabs">
                    <h2>Zúme Translations Scoreboard</h2>
                </div>
                <div class="cell medium-3">
                    <?php
                    if ( in_array( 'administrator', (array) $this->user->roles ) ) {
                        echo '<a class="button hollow clear" style="float:right;" href="/app/translator">Go To Translator Portal</a>';
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="grid-x grid-padding-x" style="margin-top: 100px;">
            <div class="cell medium-12" style="border-bottom: 1px solid lightgrey; padding-bottom: 1.5em;margin-bottom:1.5em;">
                <strong style="text-decoration: underline;">ENGLISH CONTENT</strong>:
                <strong>Weblate:</strong> <?php echo number_format( $strings ); ?> words |
                <strong>Scripts:</strong> <?php echo number_format( $scripts ); ?> words |
                <strong>Activities:</strong> <?php echo number_format( $activities ); ?> words |
                <strong>Messages:</strong> <?php echo number_format( $messages ); ?> words |
                <strong>Pieces:</strong> <?php echo number_format( $pieces ); ?> words ||
                <strong style="text-decoration: underline;">TOTAL:</strong> <?php echo number_format( $pieces + $scripts + $activities + $messages + $strings ); ?> words
            </div>

            <div class="cell medium-6">
                <h3>Weblate Content</h3><hr></hr>
                <a href="https://translate.disciple.tools/engage/zume-training/">
                    <img src="https://translate.disciple.tools/widget/zume-training/zume-training-system/multi-auto.svg" alt="Translation status" style="width:100%;" />
                </a>
            </div>
            <div class="cell medium-6">
                <h3>Portal Content</h3><hr></hr>
                <table>
                    <thead>
                    <tr>
                        <th>Language Word Count</th>
                        <th>Scripts</th>
                        <th>Activities</th>
                        <th>Messages</th>
                        <th>Pieces</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    $column = array_column( $zume_languages_full_list, 'code' , 'name' );
                    ksort( $column );
                    foreach( $column as $name => $code ) {
                        ?>
                        <tr>
                            <td><a href="/<?php echo $code ?>/app/translator/?tab=status"><?php echo $name ?></a></td>
                            <td><?php echo number_format( $this->word_count_scripts( $code) ) ?></td>
                            <td><?php echo number_format( $this->word_count_activities( $code ) ) ?></td>
                            <td><?php echo number_format( $this->word_count_messages( $code ) ) ?></td>
                            <td><?php echo number_format( $this->word_count_pieces( $code ) ) ?></td>
                        </tr>
                        <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>

            <div class="cell medium-6">
                <h3>Global List</h3><hr></hr>
                <table>
                    <thead>
                    <tr>
                        <th>Language</th>
                        <th>Code</th>
                        <th>Locale</th>
                        <th style="width:5%">Active</th>
                        <th style="width:5%">Selector</th>
                        <th style="width:5%">Pieces</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php

                    foreach( $zume_languages_full_list as $language ) {
                        ?>
                        <tr>
                            <td><?php echo $language['name'] ?></td>
                            <td><?php echo $language['code'] ?></td>
                            <td><?php echo $language['locale'] ?></td>
                            <td><span style="font-weight:bold;"><?php echo ( $language['enabled'] ) ? 'Yes' : 'No' ?></span></td>
                            <td><?php echo ( $language['feature_flags']['language_selector'] ) ? 'Yes' : 'No' ?></td>
                            <td><?php echo ( $language['feature_flags']['pieces_pages'] ) ? 'Yes' : 'No' ?></td>
                        </tr>
                        <?php
                    }
                    ?>
                    </tbody>
                </table>
            </div>
            <div class="cell medium-6">

            </div>
        </div>
        <?php
    }

    public function word_count_pieces( $language ) {
        $count = 0;
        $pieces = list_zume_pieces( $language );
        foreach( $pieces as $piece ) {
            $count += str_word_count( $piece['zume_piece_h1'] ?? '' );
            $count += str_word_count( $piece['zume_pre_video_content'] ?? '' );
            $count += str_word_count( $piece['zume_post_video_content'] ?? '' );
            $count += str_word_count( $piece['zume_ask_content'] ?? '' );
            $count += str_word_count( $piece['zume_seo_meta_description'] ?? '' );
        }

        return $count;
    }
    public function word_count_scripts( $language ) {
        $count = 0;
        $scripts = list_zume_scripts( $language );
        foreach( $scripts as $script ) {
            $count += str_word_count( $script['content'] ?? '' );
        }

        return $count;
    }
    public function word_count_activities( $language ) {
        $count = 0;
        $activities = list_zume_activities( $language );
        foreach( $activities as $activity ) {
            $count += str_word_count( $activity['title'] ?? '' );
            $count += str_word_count( $activity['content'] ?? '' );
        }

        return $count;
    }
    public function word_count_messages( $language ) {
        $count = 0;
        $messages = list_zume_messages( $language );
        foreach( $messages as $message ) {
            $count += str_word_count( $message['subject'] );
            $count += str_word_count( $message['body'] );
        }

        return $count;
    }
    public function word_count_strings( $language ) {
        $count = 0;
        $loader = new PoLoader();
        $translations = $loader->loadFile(plugin_dir_path(__DIR__) . 'zume.pot' );

        $strings = array_keys( $translations->getTranslations() );
        foreach( $strings as $string ) {
            $count += str_word_count( $string );
        }

        return $count;
    }
}
Zume_Training_Translations::instance();
