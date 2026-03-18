<?php
/**
 * Template Name: Homepage — Rodrigo Moneron
 * Hero, Método L.I.V.R.O, Prova Social Jussara Leal, Formulário de Captura
 */

get_header();
?>

<!-- ============================================================
     HERO
     ============================================================ -->
<section class="rm-hero">
    <div class="rm-hero__inner">

        <span class="rm-hero__eyebrow">Para autores independentes</span>

        <h1 class="rm-hero__headline">
            Você publicou. As vendas<br>
            não vieram. O problema<br>
            <em>não é seu livro.</em>
        </h1>

        <p class="rm-hero__subtitle">
            Nenhuma editora te ensinou a vender. Nenhuma plataforma te explicou audiência.
            O problema é o que ficou de fora — e tem solução.
        </p>

        <a href="#captura" class="rm-post__cta-btn" style="display:inline-block;">
            Quero entender o que está errado &darr;
        </a>

    </div>
</section>

<!-- ============================================================
     MÉTODO L.I.V.R.O — 5 PILARES
     ============================================================ -->
<section class="rm-method">
    <div class="rm-method__header">
        <span class="rm-method__tag">O Método</span>
        <h2>O que separa o autor que vende<br>do autor que desiste</h2>
        <p style="color:var(--rm-gray-5);max-width:560px;margin:0 auto;">
            Cinco pilares. Cinco verdades que ninguém te contou.
            Um sistema para transformar seu livro em negócio.
        </p>
    </div>

    <div class="rm-method__pillars">

        <div class="rm-pillar">
            <span class="rm-pillar__letter">L</span>
            <span class="rm-pillar__word">Leitor Primeiro</span>
            <p class="rm-pillar__desc">
                O livro não começa na primeira palavra. Começa na cabeça de quem vai ler.
                Você precisa saber quem é essa pessoa antes de escrever a primeira linha.
            </p>
        </div>

        <div class="rm-pillar">
            <span class="rm-pillar__letter">I</span>
            <span class="rm-pillar__word">Ideia Central</span>
            <p class="rm-pillar__desc">
                Um livro. Uma ideia. Não duas. Todo o resto serve a essa ideia ou é cortado.
                Clareza não é simplificação — é respeito.
            </p>
        </div>

        <div class="rm-pillar">
            <span class="rm-pillar__letter">V</span>
            <span class="rm-pillar__word">Visibilidade</span>
            <p class="rm-pillar__desc">
                Um livro invisível não existe. Não basta escrever bem.
                Você precisa aparecer nos lugares onde seu leitor procura respostas.
            </p>
        </div>

        <div class="rm-pillar">
            <span class="rm-pillar__letter">R</span>
            <span class="rm-pillar__word">Relacionamento</span>
            <p class="rm-pillar__desc">
                Vendas são consequência de confiança. Confiança se constrói com consistência.
                Você vende para quem já te conhece, te lê e te acompanha.
            </p>
        </div>

        <div class="rm-pillar">
            <span class="rm-pillar__letter">O</span>
            <span class="rm-pillar__word">Oferta Certa</span>
            <p class="rm-pillar__desc">
                O preço errado, o canal errado ou a mensagem errada matam uma boa oferta.
                A oferta certa converte. A errada frustra.
            </p>
        </div>

    </div>
</section>

<!-- ============================================================
     PROVA SOCIAL — JUSSARA LEAL
     ============================================================ -->
<section class="rm-proof">
    <div class="rm-proof__inner">

        <div class="rm-proof__number">200<span>M</span></div>
        <div class="rm-proof__label">Páginas lidas na plataforma</div>

        <blockquote class="rm-proof__quote">
            "Rodrigo me mostrou que escrever bem nunca foi o problema.
            O problema era não saber como fazer o livro chegar nas mãos certas."
        </blockquote>

        <div class="rm-proof__author">— Jussara Leal, autora com 200 milhões de páginas lidas</div>

    </div>
</section>

<!-- ============================================================
     FORMULÁRIO DE CAPTURA
     ============================================================ -->
<section class="rm-capture" id="captura">
    <div class="rm-capture__inner">

        <span class="rm-section-tag">Acesso Gratuito</span>

        <h2>Receba o que<br>sua editora nunca te contou.</h2>

        <p class="rm-capture__sub">
            Uma vez por semana. Um princípio que muda como você vê seu livro.
            Sem spam. Direto ao ponto.
        </p>

        <form
            class="rm-capture__form"
            method="post"
            action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>"
            style="display:flex;flex-direction:column;gap:1rem;max-width:420px;margin:0 auto;"
        >
            <?php wp_nonce_field( 'rm_captura_nonce', 'rm_captura_nonce_field' ); ?>
            <input type="hidden" name="action" value="rm_captura_submit">

            <input
                type="text"
                name="rm_nome"
                placeholder="Seu primeiro nome"
                required
                autocomplete="given-name"
            >

            <input
                type="email"
                name="rm_email"
                placeholder="Seu melhor e-mail"
                required
                autocomplete="email"
            >

            <button type="submit">
                Quero receber &rarr;
            </button>
        </form>

        <p style="font-size:0.75rem;color:var(--rm-gray-4);margin-top:1.25rem;font-family:var(--rm-font-title);letter-spacing:0.05em;">
            Sem spam. Cancele quando quiser.
        </p>

    </div>
</section>

<!-- ============================================================
     ÚLTIMOS ARTIGOS
     ============================================================ -->
<?php
$latest = new WP_Query( [
    'post_type'      => 'post',
    'posts_per_page' => 3,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
] );

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

                <?php $cats = get_the_category(); if ( $cats ) : ?>
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
