<?php
/**
 * Template de Post Individual — Rodrigo Moneron
 * Dark mode, tipografia editorial, CTA Comunidade Secreta
 */

get_header();
?>

<main id="primary" class="site-main rm-post">

<?php while ( have_posts() ) : the_post(); ?>

    <!-- CABEÇALHO DO POST -->
    <header class="rm-post__header">

        <?php
        $categories = get_the_category();
        if ( $categories ) :
            $cat = $categories[0];
        ?>
        <span class="rm-post__category">
            <a href="<?php echo esc_url( get_category_link( $cat->term_id ) ); ?>">
                <?php echo esc_html( $cat->name ); ?>
            </a>
        </span>
        <?php endif; ?>

        <h1 class="rm-post__title entry-title">
            <?php the_title(); ?>
        </h1>

        <div class="rm-post__meta">
            <?php echo get_the_date( 'd M Y' ); ?>
            &nbsp;·&nbsp;
            <?php echo esc_html( rm_reading_time() ); ?>
        </div>

    </header>

    <?php if ( has_post_thumbnail() ) : ?>
    <!-- IMAGEM DESTAQUE -->
    <div class="rm-post__cover" style="max-width:860px;margin:0 auto 3rem;padding:0 1.5rem;">
        <?php the_post_thumbnail( 'rm-cover', [
            'style' => 'width:100%;height:auto;display:block;',
            'alt'   => get_the_title(),
        ] ); ?>
    </div>
    <?php endif; ?>

    <!-- CORPO DO POST -->
    <div class="rm-post__body entry-content">
        <?php the_content(); ?>

        <?php
        // Paginação de posts longos
        wp_link_pages( [
            'before'      => '<nav class="page-links" style="margin:2rem 0;font-family:var(--rm-font-title);font-size:0.8rem;letter-spacing:0.1em;text-transform:uppercase;">',
            'after'       => '</nav>',
            'link_before' => '',
            'link_after'  => '',
        ] );
        ?>
    </div>

    <!-- CTA — COMUNIDADE SECRETA DIGITAL -->
    <div class="rm-post__cta" style="max-width:740px;margin:4rem auto;padding:2.5rem 2rem;">
        <span class="rm-post__cta-eyebrow">Comunidade Secreta Digital</span>
        <h3 style="font-size:1.4rem;text-transform:none;letter-spacing:0;margin-bottom:0.75rem;">
            Você escreveu. Mas não vendeu.
        </h3>
        <p style="font-size:1rem;color:var(--rm-gray-5);margin-bottom:1.5rem;">
            A Comunidade Secreta Digital é onde autores independentes aprendem o que editoras não ensinam.
            Marketing. Audiência. Vendas. Sem achismo.
        </p>
        <a
            href="<?php echo esc_url( get_option( 'rm_comunidade_url', '#' ) ); ?>"
            class="rm-post__cta-btn"
            target="_blank"
            rel="noopener noreferrer"
        >
            Quero entrar na Comunidade &rarr;
        </a>
    </div>

    <!-- NAVEGAÇÃO ENTRE POSTS -->
    <nav class="rm-post__nav" style="max-width:740px;margin:0 auto 5rem;padding:2rem 1.5rem;display:flex;justify-content:space-between;gap:1rem;border-top:1px solid var(--rm-gray-2);">
        <div style="max-width:45%;">
            <?php
            $prev = get_previous_post();
            if ( $prev ) :
            ?>
            <span style="display:block;font-family:var(--rm-font-title);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--rm-gray-5);margin-bottom:0.4rem;">← Anterior</span>
            <a href="<?php echo esc_url( get_permalink( $prev ) ); ?>" style="font-family:var(--rm-font-title);font-size:0.9rem;font-weight:700;text-transform:uppercase;color:var(--rm-white);">
                <?php echo esc_html( get_the_title( $prev ) ); ?>
            </a>
            <?php endif; ?>
        </div>

        <div style="max-width:45%;text-align:right;">
            <?php
            $next = get_next_post();
            if ( $next ) :
            ?>
            <span style="display:block;font-family:var(--rm-font-title);font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--rm-gray-5);margin-bottom:0.4rem;">Próximo →</span>
            <a href="<?php echo esc_url( get_permalink( $next ) ); ?>" style="font-family:var(--rm-font-title);font-size:0.9rem;font-weight:700;text-transform:uppercase;color:var(--rm-white);">
                <?php echo esc_html( get_the_title( $next ) ); ?>
            </a>
            <?php endif; ?>
        </div>
    </nav>

<?php endwhile; ?>

</main>

<?php get_footer(); ?>
