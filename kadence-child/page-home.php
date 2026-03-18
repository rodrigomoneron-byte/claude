<?php
/**
 * Template Name: Homepage — Rodrigo Moneron
 * Página inicial com Hero, Método L.I.V.R.O, Prova Social e Captura
 */

get_header();
?>

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="rm-hero">
    <div class="rm-hero__inner">

        <span class="rm-hero__eyebrow">Para autores independentes que escrevem o que importa</span>

        <h1 class="rm-hero__headline">
            Seu livro não vende<br>porque você nunca aprendeu<br><em>a vendê-lo.</em>
        </h1>

        <p class="rm-hero__subtitle">
            Nenhuma editora te ensinou marketing. Nenhuma plataforma te explicou audiência.
            Aqui você aprende o que ficou de fora.
        </p>

        <a href="#captura" class="rm-post__cta-btn" style="display:inline-block;">
            Quero aprender a vender meu livro &darr;
        </a>

    </div>
</section>

<!-- ============================================================
     MÉTODO L.I.V.R.O
     ============================================================ -->
<?php echo do_shortcode( '[rm_metodo_livro]' ); ?>

<!-- ============================================================
     PROVA SOCIAL — JUSSARA LEAL
     ============================================================ -->
<?php echo do_shortcode( '[rm_prova_jussara]' ); ?>

<!-- ============================================================
     CAPTURA BEEHIIV
     ============================================================ -->
<section class="rm-capture" id="captura">
    <div class="rm-capture__inner">

        <span class="rm-section-tag">A Newsletter</span>

        <h2>Uma lei invisível<br>por semana.</h2>

        <p class="rm-capture__sub">
            Toda semana um princípio que poucos autores conhecem. Sem enrolação. Sem motivação vazia.
            Só o que funciona.
        </p>

        <div class="rm-capture__form">
            <?php
            /*
             * INSTRUÇÃO: substitua os valores abaixo com seus IDs do Beehiiv.
             * publication_id: encontre em Settings > Publication Details no Beehiiv
             * embed_id: encontre em Grow > Forms > Embed no Beehiiv
             */
            echo do_shortcode( '[rm_beehiiv publication_id="pub_COLE_AQUI" embed_id="COLE_O_EMBED_ID_AQUI"]' );
            ?>
        </div>

        <p style="font-size:0.75rem;color:var(--rm-gray-4);margin-top:1rem;font-family:var(--rm-font-title);letter-spacing:0.05em;">
            Sem spam. Cancele quando quiser.
        </p>

    </div>
</section>

<!-- ============================================================
     ÚLTIMOS ARTIGOS
     ============================================================ -->
<?php
$args = [
    'post_type'      => 'post',
    'posts_per_page' => 3,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
];
$latest = new WP_Query( $args );

if ( $latest->have_posts() ) :
?>
<section style="padding:6rem 1.5rem;background-color:var(--rm-gray-1);">
    <div style="max-width:1100px;margin:0 auto;">

        <div style="text-align:center;margin-bottom:3rem;">
            <span class="rm-section-tag">Artigos</span>
            <h2>O que poucos autores sabem</h2>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2px;">
        <?php while ( $latest->have_posts() ) : $latest->the_post(); ?>

            <article style="background:var(--rm-gray-2);padding:2rem;">

                <?php
                $cats = get_the_category();
                if ( $cats ) :
                ?>
                <span style="display:block;font-family:var(--rm-font-title);font-size:0.65rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--rm-red);margin-bottom:0.75rem;">
                    <?php echo esc_html( $cats[0]->name ); ?>
                </span>
                <?php endif; ?>

                <h3 style="font-size:1.2rem;margin-bottom:0.75rem;">
                    <a href="<?php the_permalink(); ?>" style="color:var(--rm-white);text-decoration:none;">
                        <?php the_title(); ?>
                    </a>
                </h3>

                <p style="font-size:0.95rem;color:var(--rm-gray-5);margin-bottom:1.25rem;">
                    <?php echo wp_trim_words( get_the_excerpt(), 18, '...' ); ?>
                </p>

                <a href="<?php the_permalink(); ?>" style="font-family:var(--rm-font-title);font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--rm-red);">
                    Ler artigo &rarr;
                </a>

            </article>

        <?php endwhile; wp_reset_postdata(); ?>
        </div>

    </div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
