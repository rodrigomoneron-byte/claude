# NEXUS // STRIKE

Site de jogos imersivo, em tela cheia, cinematográfico — React + Tailwind CSS + GSAP ScrollTrigger + Lenis.

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção
```

## Estrutura

```
src/
  App.jsx                  monta Nav, ProgressRail e os 4 capítulos
  lib/
    smoothScroll.js         Lenis <-> GSAP ScrollTrigger
    useSmoothScroll.js       liga/desliga o smooth scroll (desktop apenas)
    mapRange.js              helper de interpolação para o scrub
  components/
    Nav.jsx                  nav fixa, dim ao rolar, estado ativo em ciano
    ProgressRail.jsx         indicador vertical fixo de progresso
    SectionShell.jsx         pin de capítulo em tela cheia (desktop)
    MobileChapter.jsx        fallback empilhado estático (mobile/reduced-motion)
    ScrubVideo.jsx           vídeo mudo controlado por scroll, com fallback para poster
    TechLabel.jsx            callout técnico com linha conectora ciano
  sections/
    HeroSection.jsx           capítulo 01 — vestir o traje
    LoadoutSection.jsx        capítulo 02 — equipamento
    SystemsSection.jsx        capítulo 03 — sistemas
    FinalSection.jsx          capítulo 04 — protocolo final
public/media/               ativos (ver abaixo)
```

Cada capítulo desktop é pinado em tela cheia por N alturas de viewport
(`SectionShell`); o progresso normalizado (0→1) dessa rolagem dirige
crossfades por `clip-path`/opacidade e o scrub do vídeo via
`video.currentTime`. Em mobile (`max-width: 900px` ou ponteiro grosso) e
com `prefers-reduced-motion: reduce`, nada é pinado nem reproduzido — cada
capítulo vira uma seção estática empilhada com a mesma hierarquia de texto.

## Mídia

Este ambiente não tinha acesso aos arquivos de mídia gerados citados no
briefing (`hero-base.jpeg`, `hero_transform.mp4` etc.). Para o site ficar
completo e demonstrável, `public/media/` contém:

- **7 imagens placeholder** (gradientes escuros ciano/violeta gerados
  proceduralmente, sem texto embutido) nos **caminhos exatos** que o
  código espera.
- **4 vídeos NÃO estão presentes** (`hero_transform.mp4`,
  `arma_explodida.mp4`, `sistemas.mp4`, `final-protocol.mp4|arma_explodida.mp4`).
  `ScrubVideo` tenta carregá-los e, no erro 404, recua automaticamente para
  a imagem estática (`poster`) — o mesmo caminho de código usado para
  `prefers-reduced-motion: reduce`. Nada quebra; o capítulo só fica sem a
  camada de vídeo até o arquivo real ser adicionado.

Para publicar com os ativos reais, basta sobrescrever os arquivos nestes
caminhos (mesmo nome, mesma pasta) — nenhuma mudança de código é
necessária:

| Capítulo    | Caminho                                                                 | Papel |
|-------------|--------------------------------------------------------------------------|-------|
| Herói       | `public/media/hero/hero-base.jpeg`                                       | estado inicial |
| Herói       | `public/media/hero/hero-suit.jpeg`                                       | traje revelado (wipe) |
| Herói       | `public/media/hero/hero_transform.mp4`                                   | transformação final (scrub) |
| Equipamento | `public/media/loadout/loadout-exploded.jpeg`                             | vista explodida completa |
| Equipamento | `public/media/loadout/Futuristic_rifle_exploded_techni.jpeg`             | rifle explodido, revisão 1 |
| Equipamento | `public/media/loadout/Futuristic_rifle_exploded_techni_2K_202608142226.jpeg` | rifle explodido, 2K |
| Equipamento | `public/media/loadout/arma_explodida.mp4`                                | intacto → explodido (scrub) |
| Sistemas    | `public/media/sistemas/Armored_gauntlet_and_recon_device_202608141841.jpeg` | manopla + recon, inativo |
| Sistemas    | `public/media/sistemas/sistemas.mp4`                                     | inativo → ativado (scrub) |
| Protocolo   | `public/media/final/Armed_character_standing_in_combat_202608141841.jpeg` | operador armado |
| Protocolo   | `public/media/final/final-protocol.mp4`                                  | estado final de prontidão (scrub) |

Requisitos para os vídeos reais: mudos, H.264/mp4, sem áudio necessário
(o player nunca expõe controles de áudio), qualquer resolução — o layout
usa `object-fit: contain` sobre fundo sólido `#0A0A12`, então proporções
diferentes de 16:9 não cortam nada, apenas alteram a faixa de letterbox.
