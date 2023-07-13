<header>
    <div class="container d-flex justify-content-between align-items-center">
        <a class="nav__link" data-open="language-menu-reveal"><?php esc_html_e( 'Language', 'zume' ) ?></a>

        <div class="absolute-center left-0 right-0">
            <a href="/" class="logo">
                <img src="<?php echo esc_url( plugin_dir_url( __DIR__ ) . '/assets/images/zume-training-logo.svg' ) ?>" alt="Zume Logo" />
            </a>
        </div>

        <nav class="nav" id="nav">
            <ul class="nav__list nav__list--secondary">

            <?php if ( is_user_logged_in() ) : ?>

                <li class="nav__item"><a href="<?php echo esc_url( wp_logout_url() ) ?>" class="nav__link"><?php esc_html_e( 'Logout', 'zume' ) ?></a></li>

            <?php else : ?>

                <li class="nav__item"><a href="/login" class="nav__link">Sign in</a></li>
                <li class="nav__item"><a href="/login" class="nav__link nav__link--button">Sign up</a></li>

            <?php endif; ?>

            </ul>
        </nav>
        <button class="nav-toggle" aria-label="open navigation">
            <span class="hamburger"></span>
        </button>
    </div>


</header>