<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Training_Share extends Zume_Magic_Page
{

    public $magic = false;
    public $parts = false;
    public $page_title = 'Share';
    public $root = 'app';
    public $type = 'share';
    public $lang = 'en';
    public $lang_code = 'en';
    public static $token = 'app_share';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }


    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        $this->page_title = esc_html__( 'Share', 'zume' );
        $this->page_description = esc_html__( 'Links to share the concepts and tools of the zume training course', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( $page_slug === $this->type && ! dt_is_rest() ) {

            $this->lang_code = $lang_code;

            $this->register_url_and_access();
            $this->header_content();

            // page content
            add_action( 'dt_blank_head', [ $this, '_header' ] );
            add_action( 'dt_blank_head', [ $this, 'consistent_head' ], 5 );
            add_action( 'dt_blank_body', [ $this, 'body' ] );
            add_action( 'dt_blank_footer', [ $this, '_footer' ] );
            add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );

            add_filter( 'dt_magic_url_base_allowed_css', [ $this, 'dt_magic_url_base_allowed_css' ], 10, 1 );
            add_filter( 'dt_magic_url_base_allowed_js', [ $this, 'dt_magic_url_base_allowed_js' ], 10, 1 );
            add_filter( 'wp_enqueue_scripts', [ $this, 'enqueue_zume_training_scripts' ] );

        }
    }

    public function dt_magic_url_base_allowed_js( $allowed_js ) {
        return zume_training_magic_url_base_allowed_js();
    }

    public function dt_magic_url_base_allowed_css( $allowed_css ) {
        return zume_training_magic_url_base_allowed_css();
    }

    public function header_style(){
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery(document).foundation();
            });
        </script>

         <link rel="canonical" href="<?php echo esc_url( trailingslashit( site_url() ) . $this->lang_code . '/' . $this->type ); ?>" />

        <?php
    }

    public static function translations() {
        return [
            'share' => __( 'Share', 'zume' ),
            'copy_link' => __( 'Copy Link', 'zume' ),
            'copy_and_share_text' => __( 'Copy this link and send it to your friends.', 'zume' ),
            'share_feedback' => __( 'Thanks!', 'zume' ),
            'copy_feedback' => __( 'Copied', 'zume' ),
        ];
    }

    public function body(){
        global $zume_languages_by_code, $zume_user_profile, $wpdb;

        require __DIR__ . '/../parts/nav.php';

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $training_items = zume_training_items();
        $posts = pieces_by_lang_code( $lang_code );
        $share_items = [];

        foreach ( $posts as $post ) {
            $share_items[] = [
                'page_title' => empty( $post['zume_piece_h1'] ) ? $training_items[$post['zume_piece']]['title'] : $post['zume_piece_h1'],
                'page_url' => zume_pieces_pages_url( $post['post_name'] ),
                'type' => $training_items[$post['zume_piece']]['type'],
                'key' => $training_items[$post['zume_piece']]['key'],
                'description' => $training_items[$post['zume_piece']]['description'],
            ];
        }

        $share_translations = self::translations();
        ?>

        <script>
            const zumeShare = [<?php echo json_encode([
                'translations' => array_merge(
                    $share_translations,
                    [
                        'all' => __( 'All', 'zume' ),
                        'tools' => __( 'Tools', 'zume' ),
                        'concepts' => __( 'Concepts', 'zume' ),
                        'filter' => __( 'Filter', 'zume' ),
                        'sort' => __( 'Sort', 'zume' ),
                        'items' => __( 'Items', 'zume' ),
                    ],
                ),
            ]) ?>][0]
        </script>

        <div class="container-xsm | my-1 text-center">
            <div class="stack">
                <h1 class="text-center"><?php echo esc_html__( 'Sharing with Others', 'zume' ) ?></h1>

                <div class="center">
                    <img class="w-30" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                </div>

                <p>
                    <?php echo esc_html__( 'When we are faithful to obey and share what the Lord has shared with us, then he promises to share even more.', 'zume' ) ?>
                </p>
            </div>
        </div>

        <div class="share-list__wrapper | py-1">

            <share-list items="<?php echo esc_attr( json_encode( $share_items ) ) ?>"></share-list>
            <noscript>
                <ul class="stack container-xsm">
                    <?php foreach ( $share_items as $item ): ?>
                        <li class="share-cards">
                            <div class="stack | share card">
                                <a class="f-1 bold" href="<?php echo esc_url( $item['page_url'] ) ?>">
                                    <?php echo esc_html( $item['page_title'] ) ?>
                                </a>
                                <p class="f--1 show-for-large">
                                    <?php echo esc_html( $item['description'] ) ?>
                                </p>
                                <div class="fit-content ms-auto">
                                    <div class="stack--2">
                                        <p><?php echo esc_html( $share_translations['copy_and_share_text'] ) ?></p>
                                        <p><code style="overflow-wrap: anywhere"><?php echo esc_url( $item['page_url'] ) ?></code></p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </noscript>
        </div>
        <?php
    }
}
Zume_Training_Share::instance();

