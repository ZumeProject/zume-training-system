<?php
if ( !defined( 'ABSPATH' ) ) { exit; } // Exit if accessed directly.

class Zume_Training_Coaches extends Zume_Magic_Page
{
    public $magic = false;
    public $parts = false;
    public $page_title = 'Coach Profile';
    public $root = 'app';
    public $type = 'coaches';
    public $lang = 'en';
    public $lang_code = 'en';
    public $lang_slug = '';
    public static $token = 'app_coaches';
    
    private $coach_slug = '';
    private $coach_profile = null;

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

        $this->page_title = esc_html__( 'Coach Profile', 'zume' );
        $this->page_description = esc_html__( 'Meet our Zúme coaches and learn about their experience in disciple making.', 'zume' );

        [
            'url_parts' => $url_parts,
            'lang_code' => $lang_code,
        ] = zume_get_url_pieces();

        // Check if this is a coaches page request
        if ( isset( $url_parts[0] ) && $url_parts[0] === $this->root && isset( $url_parts[1] ) && $url_parts[1] === $this->type && ! dt_is_rest() ) {
            
            $this->lang_code = $lang_code;
            
            // Get coach name from query parameter
            $this->coach_slug = sanitize_text_field( $_GET['name'] ?? '' );
            
            if ( empty( $this->coach_slug ) ) {
                // No coach name provided, show 404
                global $wp_query;
                $wp_query->set_404();
                status_header( 404 );
                return;
            }
            
            // Get coach by slug
            $coach_user = zume_get_coach_by_slug( $this->coach_slug );
            
            if ( !$coach_user ) {
                // Coach not found, show 404
                global $wp_query;
                $wp_query->set_404();
                status_header( 404 );
                return;
            }
            
            // Get coach profile data
            $this->coach_profile = zume_get_coach_public_profile( $coach_user->ID );
            
            if ( !$this->coach_profile || !zume_coach_has_public_profile( $coach_user->ID ) ) {
                // Coach profile not enabled, show 404
                global $wp_query;
                $wp_query->set_404();
                status_header( 404 );
                return;
            }
            
            // Update page title with coach name
            $this->page_title = sprintf( esc_html__( '%s - Coach Profile', 'zume' ), $this->coach_profile['name'] );
            $this->page_description = sprintf( esc_html__( 'Meet %s, a Zúme coach with experience in disciple making.', 'zume' ), $this->coach_profile['name'] );

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

        <link rel="canonical" href="<?php echo esc_url( zume_coach_profile_url( $this->coach_slug, $this->lang_code ) ); ?>" />

        <?php
        zume_hreflang_fixed( $this->lang_code, $this->type . '/?name=' . $this->coach_slug );
    }

    public function body(){
        if ( !$this->coach_profile ) {
            return;
        }
        
        $coach = $this->coach_profile;
        $public_location = get_user_meta( $coach['user_id'], 'coach_location', true );
        $focus_of_ministry = get_user_meta( $coach['user_id'], 'coach_focus_of_ministry', true );
        
        require __DIR__ . '/../parts/nav.php';
        ?>

        <div class="container stack-1 | page" style="padding-top: 2rem;">
            
            <!-- Page Title -->
            <div class="container-md stack-1 center | py-0">
                <h1 class="text-center"><?php echo esc_html__( 'Zúme Coach', 'zume' ); ?></h1>
            </div>
            
            <!-- Hero Section -->
            <div class="container-md stack-1 center | py-0">
                <div class="switcher | align-items-center gap-2">
                    <div class="center">
                        <img src="<?php echo esc_url( $coach['avatar'] ); ?>" alt="<?php echo esc_attr( $coach['name'] ); ?>" class="rounded-circle" style="width: 360px; height: 360px; object-fit: cover;">
                    </div>
                    <div class="stack | grow-2">
                        <h1 class="text-center"><?php echo esc_html( $coach['name'] ); ?></h1>
                    </div>
                </div>
            </div>

            <!-- About Section -->
            <?php if ( !empty( $coach['bio'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <div class="card | px-2 py-1">
                        <p><?php echo wp_kses_post( nl2br( $coach['bio'] ) ); ?></p>
                    </div>
                </div>
            <?php endif; ?>


            <!-- Greeting Video Section -->
            <?php if ( !empty( $coach['greeting_video_url'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <h2 class="text-center"><?php echo esc_html__( 'Meet Your Coach', 'zume' ); ?></h2>
                    <div class="container-md video-frame mx-auto position-relative bg-white rounded hard-shadow">
                        <div class="video-player mx-auto position-relative" data-video-src="<?php echo esc_url( $this->convert_to_embed_url( $coach['greeting_video_url'] ) ); ?>">
                            <div class="responsive-embed widescreen m0">
                                <iframe width="640" height="360" src="" frameborder="0"></iframe>
                            </div>
                            <div class="video-trigger absolute inset">
                                <div class="w-60 mx-auto"><img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . 'assets/images/VideoGraphic-2.svg' ) ?>" alt="coach video"></div>
                                <button class="icon-btn absolute inset" data-no-border>
                                    <play-button style="--play-button-color: var(--z-brand-light); --play-button-hover-color: var(--z-brand);"></play-button>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Experience Section -->
            <?php if ( !empty( $coach['experience'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <h2 class="text-center"><?php echo esc_html__( 'Experience', 'zume' ); ?></h2>
                    <div class="card | px-2 py-1">
                        <p><?php echo wp_kses_post( nl2br( $coach['experience'] ) ); ?></p>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Location & Focus Section -->
            <?php if ( !empty( $coach['location'] ) || !empty( $coach['focus_of_ministry'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <h2 class="text-center"><?php echo esc_html__( 'Location & Focus', 'zume' ); ?></h2>
                    
                    
                    <div class="switcher | gap-2">
                        <?php if ( !empty( $public_location  ) ) : ?>
                            <div class="stack | card | px-2 py-1">
                                <h3><?php echo esc_html__( 'Location', 'zume' ); ?></h3>
                                <p><?php echo esc_html( $public_location ?? '' ); ?></p>
                            </div>
                        <?php endif; ?>
                        <?php if ( !empty( $focus_of_ministry ) ) : ?>
                            <div class="stack | card | px-2 py-1">
                                <h3><?php echo esc_html__( 'Focus of Ministry', 'zume' ); ?></h3>
                                <p><?php echo wp_kses_post( nl2br( $focus_of_ministry ) ); ?></p>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>


            <!-- Testimonials Section -->
            <?php if ( !empty( $coach['testimonials'] ) && is_array( $coach['testimonials'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <h2 class="text-center"><?php echo esc_html__( 'What Trainees Say', 'zume' ); ?></h2>
                    <div class="switcher | gap-2">
                        <?php foreach ( $coach['testimonials'] as $testimonial ) : ?>
                            <?php if ( !empty( $testimonial['quote'] ) ) : ?>
                                <div class="stack | card | px-2 py-1">
                                    <blockquote>
                                        <p><?php echo esc_html( $testimonial['quote'] ); ?></p>
                                    </blockquote>
                                    <?php if ( !empty( $testimonial['name'] ) ) : ?>
                                        <cite class="text-right">— <?php echo esc_html( $testimonial['name'] ); ?></cite>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endif; ?>

            <!-- Contact Section -->
            <?php if ( !$coach['hide_public_contact'] && !empty( $coach['contact_preferences'] ) ) : ?>
                <div class="container-md stack-1 center | py-0">
                    <h2 class="text-center"><?php echo esc_html__( 'Get in Touch', 'zume' ); ?></h2>
                    <div class="switcher | gap-2">
                        <?php if ( !empty( $coach['phone'] ) ) : ?>
                            <a href="tel:<?php echo esc_attr( $coach['phone'] ); ?>" class="btn outline">
                                <span class="icon z-icon-phone"></span>
                                <?php echo esc_html__( 'Call', 'zume' ); ?>
                            </a>
                        <?php endif; ?>
                        <?php if ( !empty( $coach['email'] ) ) : ?>
                            <a href="mailto:<?php echo esc_attr( $coach['email'] ); ?>" class="btn outline">
                                <span class="icon z-icon-email"></span>
                                <?php echo esc_html__( 'Email', 'zume' ); ?>
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>

        </div>
        <?php
    }
    
    /**
     * Convert YouTube URL to embed format
     * 
     * @param string $url The video URL
     * @return string The embed URL
     */
    private function convert_to_embed_url( $url ) {
        if ( strpos( $url, 'youtube.com/watch' ) !== false ) {
            $url = str_replace( 'watch?v=', 'embed/', $url );
        } elseif ( strpos( $url, 'youtu.be/' ) !== false ) {
            $url = str_replace( 'youtu.be/', 'youtube.com/embed/', $url );
        }
        
        return $url;
    }
}
Zume_Training_Coaches::instance();


