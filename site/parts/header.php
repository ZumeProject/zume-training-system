<header>
    <div class="container d-flex justify-content-between align-items-center">
        <a class="nav__link" data-open="language-menu-reveal"><?php esc_html_e( 'Language', 'zume' ) ?></a>

        <div class="absolute-center left-0 right-0">
            <a href="/" class="logo">
                <img src="<?php echo plugin_dir_url( __DIR__ ) . '/assets/images/zume-training-logo.svg' ?>" alt="Zume Logo" />
            </a>
        </div>

        <nav class="nav" id="nav">
            <ul class="nav__list nav__list--secondary">
                <li class="nav__item"><a href="/login" class="nav__link">Sign in</a></li>
                <li class="nav__item"><a href="/login" class="nav__link nav__link--button">Sign up</a></li>
            </ul>
        </nav>
        <button class="nav-toggle" aria-label="open navigation">
            <span class="hamburger"></span>
        </button>
    </div>


</header>