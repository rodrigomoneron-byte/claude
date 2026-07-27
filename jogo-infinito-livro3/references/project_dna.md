# DNA do Projeto — Jogo Infinito, Livro 3: O Terceiro Player (R.B. Guidenelli)

> Preenchido no onboarding em 2026-07-27. Terceiro livro da série "Jogo
> Infinito" — herda as decisões de nível-série travadas nos Livros 1-2
> (ver jogo-infinito-livro2/references/arco-trama-livro2.md) e trava as
> decisões novas específicas deste volume. As três decisões de enredo
> (papel de Sebastian Kroll, ausência de traição interna, salto de tempo
> curto) foram propostas por Claude e seguidas como padrão — usuário não
> respondeu ao AskUserQuestion, ficam sinalizadas aqui como default
> assumido, ajustável a qualquer momento.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (branding "The Old English
  Gentleman's Club" — ver references/branding-rbg.md, idêntico aos
  Livros 1-2). Mesmo universo — elenco principal herdado, ISOLADO de
  Gelo e Sangue e de qualquer outro livro da casa.

## 1. Estilo e Voz (7 marcas — herdadas, sem mudança)
1. **Estratégia como linguagem corporal**
2. **A neutralidade que já é escolha** — desta vez sem candidato óbvio
   interno (ver seção 7, decisão 2); a "neutralidade" pode aparecer no
   próprio conselho reagindo à chegada de Kroll, dividido entre acolher
   o investidor novo ou reforçar a cautela pós-Alexandra.
3. **Slow burn medido em conflito de interesse** — reaplicado: a
   expansão já madura compete, de novo, pela atenção de Alex/Cami, com
   a diferença de que dessa vez o casal já sabe nomear o próprio padrão.
4. **Rivalidade que é intimidade antiga** — NÃO se aplica a Kroll (ele
   não é família, nem tem vínculo pessoal prévio); a rivalidade pura
   dessa vez é profissional/estratégica, sem verniz de parentesco.
5. **O jogo tem preço visível e concreto**
6. **Humor ácido como blindagem executiva**
7. **O capítulo fecha no gesto que reabre o jogo**

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem. Mesma régua da casa inteira.
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo, ou a
  narração comentando a própria régua — quebra de quarta parede.
- Falsos positivos permitidos (whitelist do gate): "essa/esta/toda/
  nossa/muita/tanta gente", "gente demais", "gente de/da/que/como" no
  sentido de "pessoas".
- TODO capítulo passa pelo gate + varredura manual `grep -n "a gente"`
  ANTES de ser registrado. Sem exceção. Rodar também
  `grep -n "pra gente\|da gente\|na gente\|com a gente"` (formas
  obliquas coladas — bug confirmado no Livro 2, o gate de fronteira de
  palavra não captura essas formas).
- Zero brasileirismo (Nova York/Europa continental como cenário).

## 3. CHECKPOINT DE CADÊNCIA — CORREÇÃO DE PROCESSO (motivo deste onboarding)
**Todo livro anterior do catálogo** (Gelo, Sangue, Raiz, O Início do
Jogo, Alianças e Traições) precisou de um passe de reforço PÓS-produção
pra bater a extensão-alvo e/ou a cadência de heat, porque esses dois
eixos só eram verificados no fim (bia-ferreira-editor-global), tarde
demais pra corrigir sem reforço artificial. A partir deste livro, o
`scripts/loop_state.py` do próprio projeto roda um checkpoint automático
a cada `record` (ver skill bia-ferreira-loop, passo 5b) comparando o
ritmo real de palavras e de cenas de heat contra a meta travada abaixo.
**Regra operacional**: se o checkpoint imprimir aviso, os PRÓXIMOS
capítulos precisam corrigir o ritmo imediatamente (extensão maior, cena
de heat planejada) — nunca adiar pra um reforço no final. Isso é trava
tão obrigatória quanto a régua.

## 4. HEAT (registro e cadência deste livro)
- Registro: **explícito-elegante** (mesmo padrão da casa).
- Cadência-alvo: **80/20**, **12 cenas** ao longo do livro (mesma meta
  do Livro 2 — o problema no L2 nunca foi a meta estar errada, foi não
  ter checkpoint durante a produção; a meta continua válida).
- Primeira cena até o **capítulo 6** (`--first-heat-by 6`).
- Gap máximo: **6 capítulos** sem oportunidade real (`--max-heat-gap 6`).
  Exceção legítima e documentada (`--ressalva` no record): capítulos de
  clímax/confronto direto onde forçar cena violaria "nunca gratuito".
- Nenhuma cena de heat nos capítulos de clímax (confronto com Kroll,
  virada final do Ato 3).
- Nunca gratuito: cada cena avança a relação (agora testada por rotina
  MUITO mais estável que nos livros 1-2 — o casal já superou duas
  crises grandes juntos) ou o conflito de interesse novo (a ameaça
  competitiva de Kroll/Meridian exigindo tempo e atenção de novo).

## 5. Formato
- **60 capítulos**, sem epílogo (reservado ao Livro 5). Mesmo modelo
  dos Livros 1-2.
- Extensão: ~950-1100 palavras/capítulo, total **~60.000 palavras**
  (`--word-target 60000`, meio do intervalo 58-67k travado pra série).
  **Escrever cada capítulo já na extensão-alvo** — o checkpoint da
  seção 3 existe exatamente pra impedir que isso derive sem ser notado.
- Cabeçalho do arquivo: `# Jogo Infinito — Livro 3 — Capítulo N` +
  `### POV: Nome`.
- Arquivos: `outputs/conteudo/jogo3-capituloNN.md` (NN = 01..60).

## 6. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado, incluindo
      formas obliquas)
- [ ] POV correto (Cami ímpar / Alex par) e tempo verbal correto (1ª
      pessoa do presente)
- [ ] Extensão dentro de ~950-1100 palavras JÁ na primeira versão
- [ ] Checkpoint de cadência rodado (`loop_state.py record --heat
      yes|no`) e qualquer aviso resolvido no MESMO lote de capítulos,
      não adiado
- [ ] Abertura forte + fechamento que vira o chão (marca 7)
- [ ] Continuidade com a bíblia (arco-trama-livro3.md) e com o canon
      herdado dos Livros 1-2 (mundo-personagens-livro3.md) — NUNCA
      contradizer fatos já estabelecidos
- [ ] Score mínimo de aprovação: ~78% das marcas aplicáveis → registrar

## 7. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter, prompt de capa
  no branding da casa. Imagem-conceito deste livro: terceira evolução
  da capa — o relógio de bolso, a caneta e o passaporte/cartão de
  embarque do Livro 2, agora com um QUARTO objeto novo representando o
  "terceiro jogador" (ex.: um segundo par de abotoaduras de grafia
  diferente, ou um segundo relógio/cronômetro moderno em contraste com
  o relógio de bolso antigo — a decidir na fase de formatação), mesma
  paleta fria dominante com acento de ouro envelhecido, chiaroscuro,
  sem casal, sem rosto. Metadados: série "Jogo Infinito", series_index 3.

## 8. DECISÕES NOVAS TRAVADAS NESTE ONBOARDING (2026-07-27)
> AskUserQuestion foi enviado mas não respondido pelo usuário; as três
> decisões abaixo seguem as opções recomendadas por Claude, sinalizadas
> como default assumido — o usuário pode redirecionar a qualquer momento.
1. **Sebastian Kroll / Meridian Holdings: ameaça ABERTA desde o
   início**, não mais um "aliado disfarçado" como Alexandra no L2. O
   leitor sabe cedo que Meridian representa risco competitivo real —
   thriller corporativo mais direto, variando a estrutura de
   slow-reveal que já apareceu duas vezes seguidas (L1: pai de Dan; L2:
   Alexandra). A due diligence do L2 encontrou Kroll "genuinamente
   limpo" pessoalmente — a ameaça não é fraude pessoal dele, é a
   própria Meridian Holdings como entidade: um consórcio disposto a
   usar tática agressiva de mercado (aquisição hostil de parceiros-
   satélite da Voss Capital, guerra de oferta pela mesma expansão
   europeia) pra ganhar posição, sem precisar mentir sobre quem é.
2. **Sem traição interna neste livro** — depois de dois livros seguidos
   com alguém próximo traindo a confiança (pai de Dan no L1, Patricia
   no L2), o L3 varia a fórmula: a ameaça é inteiramente externa. O
   elenco de apoio (Marcus, Devon, Elena, Denise, Thomas Reyes, Sandra
   Whitmore) permanece leal — o atrito interno do livro, se houver, vem
   de desacordo estratégico genuíno (como responder a Kroll), não de
   traição.
3. **Salto de tempo curto**: dias a poucas semanas depois do fim do
   Livro 2, honrando a reunião "semana que vem" já prometida no
   gancho final — mantém a tensão da revelação de Meridian Holdings
   quente, sem deixar o leitor sentir hiato.
