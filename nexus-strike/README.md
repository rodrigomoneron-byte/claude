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

`public/media/` já contém os ativos reais nos **caminhos exatos** que o
código espera — nenhuma mudança de código é necessária para trocar por
versões mais novas, basta sobrescrever o arquivo no mesmo caminho.

| Capítulo    | Caminho                                                                 | Papel |
|-------------|--------------------------------------------------------------------------|-------|
| Herói       | `public/media/hero/hero-base.jpeg`                                       | estado inicial (agente tático, sem brilho) |
| Herói       | `public/media/hero/hero-suit.jpeg`                                       | traje ativado (wipe, brilho vermelho + HUD) |
| Herói       | `public/media/hero/hero_transform.mp4`                                   | transformação completa (scrub) |
| Equipamento | `public/media/loadout/loadout-exploded.jpeg`                             | vista explodida do rifle |
| Equipamento | `public/media/loadout/Futuristic_rifle_exploded_techni.jpeg`             | vista explodida do rifle (mesma arte — só há 1 still de rifle real; ver nota) |
| Equipamento | `public/media/loadout/Futuristic_rifle_exploded_techni_2K_202608142226.jpeg` | vista explodida do rifle (idem) |
| Equipamento | `public/media/loadout/arma_explodida.mp4`                                | intacto → explodido (scrub) |
| Sistemas    | `public/media/sistemas/Armored_gauntlet_and_recon_device_202608141841.jpeg` | manopla + drone de recon, inativo |
| Sistemas    | `public/media/sistemas/sistemas.mp4`                                     | inativo → ativado (scrub) |
| Protocolo   | `public/media/final/Armed_character_standing_in_combat_202608141841.jpeg` | operador armado (mesma arte do hero-suit — ver nota) |
| Protocolo   | `public/media/final/final-protocol.mp4`                                  | operador levantando o rifle até o estado de pronto (scrub) |

**Notas sobre os stills reutilizados:** o briefing original pedia 3 stills
distintos de rifle explodido e uma foto dedicada para o protocolo final;
só chegou 1 still de rifle e nenhuma foto exclusiva do "operador pronto"
(a que existe é a mesma do traje ativado do herói, o que também funciona
como fechamento narrativo — o mesmo operador reaparece no protocolo
final). Substitua os arquivos correspondentes assim que houver stills
dedicados, sem tocar no código.

Todos os 4 vídeos são reais (H.264/AAC, 1280×720, 8s, mudos no player).
`ScrubVideo` ainda mantém o fallback automático para a imagem estática
(`poster`) em caso de erro de carregamento — o mesmo caminho de código
usado para `prefers-reduced-motion: reduce` — então trocar um vídeo por
um arquivo ausente ou corrompido nunca quebra a página.
