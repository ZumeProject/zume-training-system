<?php //phpcs:ignore ?>
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.8.0/webcomponents-bundle.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,700&display=swap');
</style>
<?php //phpcs:ignore ?>
<script defer src="https://umami.gospelambition.com/script.js" data-website-id="e503fecf-00f2-4556-a7e3-40dd2671bdac"></script>

<link rel="icon" type="image/x-icon" href="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/../../favicon.ico' ) ?>"></link>
<?php //phpcs:ignore ?>
<script src="https://browser.sentry-cdn.com/7.60.0/bundle.min.js" crossorigin="anonymous"></script>
<?php

$server_name = isset( $_SERVER['SERVER_NAME'] ) ? sanitize_text_field( wp_unslash( $_SERVER['SERVER_NAME'] ) ) : '';
$environment = 'development';

if ( $server_name === 'zume.training' ) {
    $environment = 'production';
}

?>

<script>
    Sentry.init({
        dsn: "https://fd1b2f60ca0b4e899eaa09266736d634@red-gopher.pikapod.net/4",
        tracesSampleRate: 0.01,
        environment: '<?php echo esc_js( $environment ) ?>'
    });
</script>

<!-- action zume_head -->
<?php do_action( 'zume_head' ) ?>
