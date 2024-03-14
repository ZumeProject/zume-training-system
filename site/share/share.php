<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.


class Zume_Training_Share extends Zume_Magic_Page
{
    use Translateable;

    public $magic = false;
    public $parts = false;
    public $page_title = 'Zúme Training';
    public $root = 'zume_app';
    public $type = 'share';
    public $lang = 'en';
    public static $token = 'zume_app_share';

    private static $_instance = null;
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public static function translations() {
        return [
            'share' => __( 'Share', 'zume' ),
            'copy_link' => __( 'Copy Link', 'zume' ),
            'copy_and_share_text' => __( 'Copy this link and send it to your friends.', 'zume' ),
            'share_feedback' => __( 'Thanks!', 'zume' ),
            'copy_feedback' => __( 'Link copied', 'zume' ),
        ];
    }

    public function __construct() {
        parent::__construct();
        $this->lang = get_locale();

        [
            'lang_code' => $lang_code,
            'url_parts' => $url_parts,
        ] = zume_get_url_pieces();

        $page_slug = $url_parts[0] ?? '';

        if ( str_contains( $page_slug, $this->type ) && ! dt_is_rest() ) {

            $this->set_locale( $lang_code );

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
        <?php
    }

    public function body(){
        global $zume_languages_by_code, $zume_user_profile;

        require __DIR__ . '/../parts/nav.php';


        $current_language = zume_current_language();

        $args = [
            'post_type' => 'zume_pieces',
            'lang' => $current_language,
            'posts_per_page' => -1,
            'order' => 'ASC',
        ];

        $posts = get_posts( $args );
        $pieces_info = zume_training_items();

        $share_translations = self::translations();

        ?>

        <div class="container-xsm | my-1">
            <div class="stack">
                <h1 class="text-center"><?php echo esc_html__( 'Sharing with Others', 'zume' ) ?></h1>

                <div class="center">
                    <img class="w-30" src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/guys-reading.svg' ) ?>" alt="guys reading">
                </div>

                <p>
                    <?php echo esc_html__( 'When we are faithful to obey and share what the Lord has shared with us, then he promises to share even more.' , 'zume' ) ?>
                </p>

                <?php if ( empty( $posts ) ): ?>

                    <p>No pieces pages for the language code <?php echo esc_html( $current_language ) ?></p>

                <?php endif; ?>
            </div>

            <script>
                jQuery(document).ready(function(){
                    const filterArea = document.querySelector('.filter-area')
                    const filterButtons = document.querySelectorAll('.filter-button')
                    const shareCards = document.querySelectorAll('.share-cards')

                    const filterCallback = (event) => {
                        const filterType = event.target.dataset.filter

                        filterButtons.forEach(button => {
                            button.classList.remove('selected')
                        })
                        event.target.classList.add('selected')

                        shareCards.forEach(card => {
                            const cardType = card.dataset.type

                            if ( filterType === 'all' ) {
                                card.classList.remove('d-none')
                                return
                            }


                            if (cardType === filterType) {
                                console.log('removing d-none from card', card)
                                card.classList.remove('d-none')
                            } else {
                                console.log('adding d-none to card', card, cardType, filterType, cardType === filterType)
                                card.classList.add('d-none')
                            }

                        })
                    }

                    filterArea.classList.toggle('d-none')
                    filterButtons.forEach(button => {
                        button.addEventListener('click', filterCallback)
                    });
                })
            </script>

            <div class="d-none filter-area">
                <button class="icon-btn f-2 ms-auto" data-toggle="filter-menu">
                    <span class="visually-hidden"><?php echo esc_html__( 'Filter', 'zume' ) ?></span>
                    <span class="icon zume-filter brand-light" aria-hidden="true"></span>
                </button>
                <div class="dropdown-pane" id="filter-menu" data-dropdown data-auto-focus="true" data-position="bottom" data-alignment="center" data-close-on-click="true" data-close-on-click-inside="true">
                    <ul>
                        <li>
                            <button class="menu-btn w-100 filter-button selected" data-filter="all">
                                <?php echo esc_html__( 'All', 'zume' ) ?>
                            </button>
                            <button class="menu-btn w-100 filter-button" data-filter="tool">
                                <?php echo esc_html__( 'Tools', 'zume' ) ?>
                            </button>
                            <button class="menu-btn w-100 filter-button" data-filter="concept">
                                <?php echo esc_html__( 'Concepts', 'zume' ) ?>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="stack container-xsm">
                <?php foreach ( $posts as $post ): ?>

                    <?php

                        $meta = get_post_meta( $post->ID );
                        $page_title = empty( $meta['zume_piece_h1'][0] ) ? get_the_title( $post->ID ) : $meta['zume_piece_h1'][0];
                        $page_url = site_url( $current_language . '/' . $post->post_name );
                        $page_info = $pieces_info[ (int) $meta['zume_piece'][0] - 1 ];

                    ?>

                    <li class="share-cards" data-type="<?php echo esc_attr( $page_info['type'] ) ?>">
                        <div class="stack | share card">
                            <a class="f-1 bold brand my-0" href="<?php echo esc_url( $page_url ) ?>">
                                <?php echo esc_html( $page_title ) ?>
                            </a>
                            <div class="center">
                                <share-links
                                    url="<?php echo esc_attr( $page_url ) ?>"
                                    title="<?php echo esc_attr( $page_title ) ?>"
                                    t="<?php echo esc_attr( json_encode( $share_translations ) ) ?>">
                                </share-links>
                                <noscript>
                                    <div class="stack--2">
                                        <p><?php echo esc_html( $share_translations['copy_and_share_text'] ) ?></p>
                                        <p><code style="overflow-wrap: anywhere"><?php echo esc_url( $page_url ) ?></code></p>
                                    </div>
                                </noscript>
                            </div>
                        </div>
                    </li>

                <?php endforeach; ?>
            </ul>
        </div>
        <?php
    }
}
Zume_Training_Share::instance();

