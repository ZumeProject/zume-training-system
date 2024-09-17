    <header class="header">
        <div class="d-flex justify-content-between px-1">
            <div class="d-flex gap-0">
                <button class="nav-toggle" aria-label="open navigation" data-toggle="siteOffCanvas">
                    <span class="hamburger"></span>
                </button>

                <h1 class="h5 f-medium mb0"><?php echo esc_html__( 'My Progress', 'zume' ) ?></h1>
            </div>

            <nav class="d-flex align-items-center gap-0">
                <div class="cluster | s--2 | nav nav__list" role="list">

                    <?php if ( is_user_logged_in() ) : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_dashboard_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Dashboard', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>

                    <?php else : ?>

                        <a role="listitem" href="<?php echo esc_url( zume_about_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'About', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_training_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Training', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_resources_url() ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Resources', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'register' ) ) ?>" class="btn outline dark nav__button"><?php echo esc_html__( 'Register', 'zume' ) ?></a>
                        <a role="listitem" href="<?php echo esc_url( zume_getting_started_url( 'login' ) ) ?>" class="btn dark nav__button"><?php echo esc_html__( 'Login', 'zume' ) ?></a>

                    <?php endif; ?>
                </div>
            </nav>
        </div>
    </header>

    <?php require __DIR__ . '/mobile-nav.php' ?>

    <?php require __DIR__ . '/language-selector.php' ?>
