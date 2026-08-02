# DNA do Projeto — Família Bittencourt, Livro 1: Acordo de Vidro (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-02. Primeiro livro de uma NOVA
> série sob o mesmo pseudônimo da casa, baseado em briefing completo
> fornecido pelo usuário. Decisões de enredo vêm diretamente do
> briefing (não são default assumido); decisões técnicas/de processo
> seguem o padrão consolidado do catálogo (régua, piso duro, formato).

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** — mesmo pseudônimo já usado em
  Jogo Infinito (NY/Europa) e na série do "clube de carvalho" (ver
  references/branding-rbg.md). Esta é uma TERCEIRA série sob o mesmo
  nome, deliberadamente diferente em ambientação e tom — o pseudônimo
  já é uma casa multi-série, não uma voz única e fixa.
- Visual/capa: o branding-rbg.md existente (whiskey club, chiaroscuro,
  sem rostos) foi desenhado pra Jogo Infinito/clube de carvalho — pode
  NÃO ser o visual certo pra um romance de fake-dating mais leve e
  paulistano. Decidir o prompt de capa na etapa de formatação,
  adaptando a paleta/atmosfera ao tom deste livro específico (mais
  luz, mais glamour contemporâneo, menos clube de fumaça), mantendo só
  o monograma/identidade de autor se fizer sentido.

## 1. Estilo e Voz — marcas específicas desta série (adaptadas do
template das 7 marcas da casa pro tom deste livro)
1. **Fachada que racha em público** — a farsa do casamento de
   conveniência exige performance constante; a marca aparece quando a
   performance vacila num momento real (mão que treme, olhar que
   demora demais) diante de outros.
2. **Status como armadura, não so linguagem corporal** — luxo e
   sobrenome como proteção que ambos usam por motivos opostos (Isabela
   pra não cair, Leo pra nunca mais ser o garoto sem nada).
3. **Slow burn medido em "isso não é real" repetido até parar de ser
   verdade** — a tensão mora na régua que os dois desenham ("sem
   sentimentos") e no quanto ela se move sem que percebam.
4. **Rivalidade corporativa que é atração disfarçada** — competência em
   reunião de negócios como flerte, igual ao template da casa.
5. **O acordo tem preço visível** — cada mentira contada em público
   custa algo real depois, em privado.
6. **Humor ácido/leve como alívio, não só blindagem** — MAIS leveza que
   as séries anteriores da casa (Gustavo e Mariana carregam boa parte
   do alívio cômico) — tom explicitamente mais próximo de comédia
   romântica com stakes reais, não só drama cerebral.
7. **O capítulo fecha no gesto que reabre o jogo** — herdado sem
   mudança, marca estrutural da casa.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem. Mantida mesmo com a ambientação brasileira real
  (era a única série que evitava brasileirismo geral; a régua "a
  gente" é uma marca separada, da casa inteira, que não muda).
  **ATENÇÃO REDOBRADA**: como esta série finalmente permite registro
  brasileiro natural em tudo mais (gírias, expressões, cultura
  paulistana), o risco de escrever "a gente" por reflexo é MAIOR que
  nas séries anteriores — o cérebro vai "querer" usar a forma natural
  com mais frequência porque o resto do texto já soa brasileiro.
- PROIBIDO o device de personagem se autocorrigindo sobre isso.
- TODO capítulo passa pelo gate + varredura manual `grep -n "a gente"`
  ANTES de ser registrado. Sem exceção. Rodar também
  `grep -n "pra gente\|da gente\|na gente\|com a gente"`.
- Diferente das séries anteriores: brasileirismo GERAL (gírias,
  expressões idiomáticas, referências culturais) é PERMITIDO e
  esperado — só a forma específica "a gente" continua banida.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA (herdado do
catálogo, com status honesto do que funciona)
- Piso de extensão por capítulo é TRAVA DURA no `loop_state.py record`
  (recusa registrar capítulo abaixo de 85% da média-alvo, sys.exit 3).
  Confirmado funcionando de forma confiável desde o Livro 4 de Jogo
  Infinito — nenhum livro desde então saiu fora da meta de palavras.
- Processo de escrita em 2 chamadas de ferramenta (Write só com
  Abertura+Desenvolvimento → `wc -w` real → expandir se abaixo de
  ~50-55% do alvo → Edit do resto → `wc -w` final) — resultado MISTO
  no teste mais recente (Jogo Infinito L5): reduziu a taxa de
  capítulos precisando de expansão de emergência de 90% pra 60% num
  ato, mas voltou a 90% no ato seguinte (cenas mais dialogadas/
  negociação tendem a reverter o ganho). Aplicar o processo mesmo
  assim (é a melhor ferramenta disponível), mas não presumir que está
  resolvido — reportar a taxa real no relatório final de cada ato,
  com honestidade, sem maquiar.

## 4. Cadência de heat
- ~10 cenas ao longo do livro, explícito-elegante (80/20 sugestão/
  anatomia — mais perto do registro de Jogo Infinito que de fade-to-
  black, mas com tom mais brincalhão/menos cerebral, coerente com o
  briefing).
- Primeira cena até o capítulo 10 (mais tarde que o padrão usual da
  casa — casamento de conveniência pede mais tempo de tensão contida
  antes da primeira cena real).
- Gap máximo de 6 capítulos entre cenas.
- Registrar SEMPRE `--heat yes` no capítulo que tiver cena.

## 5. Formato
- 55 capítulos, POV dual Isabela (ímpar) / Leo (par), primeira pessoa
  do presente, alternância estrita.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- SEM epílogo neste Livro 1 (reservar decisão sobre epílogo de série
  pro fechamento do Livro 3, se a trilogia for até lá).
- Marca 7 obrigatória: todo capítulo fecha num gesto que reabre o jogo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   ativo (seção 3).
2. RÉGUA (regua_gate.py) — trava dura, corrigir até LIMPO, atenção
   redobrada (seção 2).
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as 7
   marcas ADAPTADAS desta série (seção 1), não o template genérico.
4. Falha de score não-estrutural → auto-revisar (máx. 2 rounds) →
   aprovar com ressalva se persistir.
5. REGISTRAR (loop_state.py record) — trava dura de extensão + régua.
6. Repetir até 55 capítulos completos.
7. bia-ferreira-editor-global (revisão de consistência — primeiro
   livro de uma série nova, sem continuidade herdada de volumes
   anteriores pra checar, mas com atenção a não vazar nomes/fatos de
   Jogo Infinito ou outras séries da casa).
8. bia-ferreira-formatter (EPUB/PDF/capa — capa adaptada ao tom deste
   livro, não herdando automaticamente o branding do clube de
   carvalho).

## 7. Símbolos e continuidade
Ver references/mundo-personagens-livro1.md — símbolo do título
("vidro") a definir no cap. 1-2 e documentar assim que decidido.

## 8. Decisões via AskUserQuestion — registro
O usuário respondeu diretamente (não é default assumido):
1. Pseudônimo: manter R.B. Guidenelli, mesmo com ambientação brasileira
   nova.
2. Escopo: já travar como trilogia "Família Bittencourt" desde o
   onboarding do Livro 1.
Decisões de enredo vêm do briefing PDF fornecido pelo usuário
(`briefing_acordo_de_vidro.pdf`), reproduzido em arco-trama-livro1.md —
não são interpretação livre, são a fonte primária.
Decisões técnicas sem pergunta explícita (POV dual, 55 capítulos,
extensão, cadência de heat, símbolo do vidro a definir na escrita)
seguem o padrão default do catálogo, documentadas na seção 8 de
arco-trama-livro1.md.
