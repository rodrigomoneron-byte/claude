<?php
/**
 * Kadence Child — Rodrigo Moneron
 * functions.php
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/* ============================================================
   1. ENQUEUE: FONTES + ESTILOS
   ============================================================ */
add_action( 'wp_enqueue_scripts', 'rm_child_enqueue_assets' );

function rm_child_enqueue_assets() {
    // Estilo do tema pai (Kadence)
    wp_enqueue_style(
        'kadence-parent-style',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( 'kadence' )->get( 'Version' )
    );

    // Estilo do tema filho
    wp_enqueue_style(
        'kadence-child-style',
        get_stylesheet_uri(),
        [ 'kadence-parent-style' ],
        wp_get_theme()->get( 'Version' )
    );

    // Google Fonts: Poppins + Lora
    wp_enqueue_style(
        'rm-google-fonts',
        'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@700;800&display=swap',
        [],
        null
    );

    // JS customizado
    wp_enqueue_script(
        'rm-custom-js',
        get_stylesheet_directory_uri() . '/assets/custom.js',
        [],
        '1.0.0',
        true
    );
}

/* ============================================================
   2. PRECONNECT GOOGLE FONTS (PERFORMANCE)
   ============================================================ */
add_action( 'wp_head', 'rm_preconnect_fonts', 1 );

function rm_preconnect_fonts() {
    echo '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
    echo '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
}

/* ============================================================
   3. SUPORTE A RECURSOS DO TEMA
   ============================================================ */
add_action( 'after_setup_theme', 'rm_child_setup' );

function rm_child_setup() {
    // Tamanho de thumbnail padrão
    add_image_size( 'rm-cover', 1200, 630, true );
    add_image_size( 'rm-thumb', 600, 315, true );
}

/* ============================================================
   4. SHORTCODE: LOGO RM TIPOGRÁFICO
   ============================================================ */
add_shortcode( 'rm_logo', 'rm_logo_shortcode' );

function rm_logo_shortcode( $atts ) {
    $atts = shortcode_atts( [ 'size' => '1.5rem' ], $atts );
    return '<span class="rm-logo" style="font-size:' . esc_attr( $atts['size'] ) . '">R<span class="accent">M</span></span>';
}

/* ============================================================
   5. SHORTCODE: CTA COMUNIDADE SECRETA
   ============================================================ */
add_shortcode( 'rm_cta_comunidade', 'rm_cta_comunidade_shortcode' );

function rm_cta_comunidade_shortcode( $atts ) {
    $atts = shortcode_atts( [
        'url'   => '#',
        'titulo' => 'Você escreveu. Mas não vendeu.',
        'sub'   => 'Na Comunidade Secreta Digital você aprende o que sua editora nunca te ensinou.',
        'btn'   => 'Quero entrar na Comunidade',
    ], $atts );

    ob_start();
    ?>
    <div class="rm-post__cta">
        <span class="rm-post__cta-eyebrow">Comunidade Secreta Digital</span>
        <h3><?php echo esc_html( $atts['titulo'] ); ?></h3>
        <p><?php echo esc_html( $atts['sub'] ); ?></p>
        <a href="<?php echo esc_url( $atts['url'] ); ?>" class="rm-post__cta-btn" target="_blank" rel="noopener noreferrer">
            <?php echo esc_html( $atts['btn'] ); ?>
        </a>
    </div>
    <?php
    return ob_get_clean();
}

/* ============================================================
   6. SHORTCODE: MÉODO L.I.V.R.O (5 PILARES)
   ============================================================ */
add_shortcode( 'rm_metodo_livro', 'rm_metodo_livro_shortcode' );

function rm_metodo_livro_shortcode() {
    $pilares = [
        [
            'letra' => 'L',
            'palavra' => 'Leitor Primeiro',
            'desc'  => 'O livro não começa na primeira palavra. Começa na cabeça de quem vai ler. Você precisa saber quem é essa pessoa antes de escrever a primeira linha.',
        ],
        [
            'letra' => 'I',
            'palavra' => 'Ideia Central',
            'desc'  => 'Um livro. Uma ideia. Não duas. Todo o resto serve a essa ideia ou é cortado. Clareza não é simplificação — é respeito.',
        ],
        [
            'letra' => 'V',
            'palavra' => 'Visibilidade',
            'desc'  => 'Um livro invisível não existe. Não basta escrever bem. Você precisa aparecer nos lugares onde seu leitor procura respostas.',
        ],
        [
            'letra' => 'R',
            'palavra' => 'Relacionamento',
            'desc'  => 'Vendas são consequência de confiança. Confiança se constrói com consistência. Você vende para quem já te conhece, te lê e te acompanha.',
        ],
        [
            'letra' => 'O',
            'palavra' => 'Oferta Certa',
            'desc'  => 'O preço errado, o canal errado ou a mensagem errada matam uma boa oferta. A oferta certa converte. A errada frustra.',
        ],
    ];

    ob_start();
    ?>
    <div class="rm-method">
        <div class="rm-method__header">
            <span class="rm-method__tag">O Método</span>
            <h2>O que separa o autor que vende<br>do autor que desiste</h2>
            <p style="color:var(--rm-gray-5);max-width:560px;margin:0 auto;">
                Cinco pilares. Cinco verdades que ninguém te contou. Um sistema para transformar seu livro em negócio.
            </p>
        </div>

        <div class="rm-method__pillars">
            <?php foreach ( $pilares as $p ) : ?>
            <div class="rm-pillar">
                <span class="rm-pillar__letter"><?php echo esc_html( $p['letra'] ); ?></span>
                <span class="rm-pillar__word"><?php echo esc_html( $p['palavra'] ); ?></span>
                <p class="rm-pillar__desc"><?php echo esc_html( $p['desc'] ); ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/* ============================================================
   7. SHORTCODE: PROVA SOCIAL JUSSARA LEAL
   ============================================================ */
add_shortcode( 'rm_prova_jussara', 'rm_prova_jussara_shortcode' );

function rm_prova_jussara_shortcode() {
    ob_start();
    ?>
    <div class="rm-proof">
        <div class="rm-proof__inner">
            <div class="rm-proof__number">200<span>M</span></div>
            <div class="rm-proof__label">Páginas lidas na plataforma</div>

            <blockquote class="rm-proof__quote">
                "Rodrigo me mostrou que escrever bem nunca foi o problema. O problema era não saber como fazer o livro chegar nas mãos certas."
            </blockquote>

            <div class="rm-proof__author">— Jussara Leal, autora com 200 milhões de páginas lidas</div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/* ============================================================
   8. SHORTCODE: FORMULÁRIO BEEHIIV
   ============================================================ */
add_shortcode( 'rm_beehiiv', 'rm_beehiiv_shortcode' );

function rm_beehiiv_shortcode( $atts ) {
    $atts = shortcode_atts( [
        'publication_id' => '',  // Ex: pub_xxxxxxxx
        'embed_id'       => '',  // ID do embed do Beehiiv
    ], $atts );

    if ( empty( $atts['publication_id'] ) || empty( $atts['embed_id'] ) ) {
        return '<p style="color:#F64B3D;font-family:monospace;font-size:0.8rem;">[rm_beehiiv] Configure os parâmetros publication_id e embed_id</p>';
    }

    $pub = esc_attr( $atts['publication_id'] );
    $emb = esc_attr( $atts['embed_id'] );

    return '<iframe src="https://embeds.beehiiv.com/'. $emb .'" data-test-id="beehiiv-embed" width="100%" height="320" frameborder="0" scrolling="no" style="border-radius:0;border:1px solid #2A2A2A;background:transparent;"></iframe>';
}

/* ============================================================
   9. FILTRO: REMOVER EMOJIS DESNECESSÁRIOS DO WP
   ============================================================ */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

/* ============================================================
   10. BODY CLASS: ADICIONAR CLASSE DE DARK MODE
   ============================================================ */
add_filter( 'body_class', 'rm_body_classes' );

function rm_body_classes( $classes ) {
    $classes[] = 'rm-dark-mode';
    return $classes;
}

/* ============================================================
   11. LEITURA ESTIMADA NO POST (minutos)
   ============================================================ */
function rm_reading_time( $content = '' ) {
    if ( ! $content ) {
        $content = get_the_content();
    }
    $word_count = str_word_count( strip_tags( $content ) );
    $minutes    = (int) ceil( $word_count / 200 );
    return $minutes . ' min de leitura';
}

/* ============================================================
   12. METATAGS OPEN GRAPH BÁSICAS
   ============================================================ */
add_action( 'wp_head', 'rm_og_meta_tags' );

function rm_og_meta_tags() {
    if ( is_singular() ) {
        global $post;
        setup_postdata( $post );
        $title   = get_the_title();
        $excerpt = get_the_excerpt();
        $url     = get_permalink();
        $image   = get_the_post_thumbnail_url( get_the_ID(), 'rm-cover' );
        if ( ! $image ) {
            $image = get_stylesheet_directory_uri() . '/assets/og-default.jpg';
        }
        echo '<meta property="og:type" content="article">' . "\n";
        echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
        echo '<meta property="og:description" content="' . esc_attr( $excerpt ) . '">' . "\n";
        echo '<meta property="og:url" content="' . esc_url( $url ) . '">' . "\n";
        echo '<meta property="og:image" content="' . esc_url( $image ) . '">' . "\n";
        echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
        wp_reset_postdata();
    }
}
