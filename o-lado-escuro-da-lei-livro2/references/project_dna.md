# DNA do Projeto — Justiça Sombria, Livro 2 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-09. Segundo livro da série
> "Justiça Sombria", novo par (Vera Salles x Marcelo Vieira) e novo
> caso (contrabando/fraude de importação no Porto de Santos) — decisão
> editorial direta, usuário disse "livro 2" sem especificar.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, mesma linha "suspense policial noturno" da série, mas
  com elemento visual DIFERENTE do Livro 1 (que usava giroflex/viatura/
  fórum) — sugestão: contêineres empilhados, guindastes portuários
  contra o céu noturno, silhuetas entre containers, luz de holofote de
  segurança portuária.

## 1. Estilo e Voz — marcas específicas deste livro (adaptadas do Livro 1)
1. **Competência técnica/jurídica como flerte** — Vera decifrando
   nuance processual, Marcelo lendo o porto como ninguém mais consegue
   — competência mútua como forma de respeito relutante.
2. **Neutralidade técnica rachando** — a marca de Vera: cada vez que a
   "correção técnica" que ela usa como escudo moral esbarra na
   responsabilidade real pelo que sua palavra causou.
3. **Slow burn em proximidade forçada urbana** — diferente do
   isolamento rural do Livro 1: aqui a ameaça está por perto o tempo
   todo, a proteção acontece em meio à cidade/porto, não em fuga pro
   interior.
4. **Rancor real processado virando confiança negociada** — diferente
   do Livro 1 (rancor cru, recente): aqui Marcelo já processou boa
   parte da própria raiva ao longo de 3 anos — o que resta é
   desconfiança cansada, não fervor. A marca é quando ele escolhe
   arriscar essa desconfiança de novo.
5. **O jogo tem preço de integridade judicial visível** — diferente do
   preço de vida/liberdade mais literal do Livro 1: aqui é a sentença
   em si — Vera julgar com integridade sob ameaça é o próprio ato de
   resistência, não só sobreviver.
6. **Cansaço cínico como blindagem de Marcelo** — diferente da ironia
   amarga de Noah: Marcelo é mais seco, menos performático, cansaço
   real de quem já brigou com o sistema e perdeu.
7. **Capítulo fecha no gancho de perigo ou tensão** — herdado sem
   mudança.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística.

## 2b. LIMITE DE CONTEÚDO (mesma lógica adaptada do Livro 1)
- Nenhuma cena de violência física gráfica e prolongada — perigo real
  (ameaças, tentativas de ataque), mas corte editorial antes de
  agressão detalhada.
- Nem Vera nem Marcelo exercem controle coercitivo um sobre o outro —
  decisões de segurança são negociadas, nunca impostas à força.
- Consentimento explícito e claro em toda cena de intimidade.
- Plausibilidade jurídica/aduaneira básica: o processo de sentença
  federal, a sindicância que expulsou Marcelo, e o esquema de
  contrabando/fraude de importação devem fazer sentido mínimo dentro
  do sistema brasileiro fictício retratado.
- Antagonistas com motivação real articulada quando revelados.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 9 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. O Livro 1 desta
série fechou em 102% da meta (57.717 palavras) por mirar o topo da
faixa desde o Ato 1 — repetir essa disciplina aqui desde o início.
Usar contagem via Python (`len(open(f).read().split())`) como padrão,
não `wc -w` (bug de locale documentado). Não inventar nova técnica
experimental além disso.

## 4. Cadência de heat
- ~8-10 cenas, explícito-elegante, mesmo registro da série.
- Primeira cena até o cap. 12.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o cap. 1. ATENÇÃO:
  o Livro 1 só bateu o PISO da meta (8 de 8-10) por não ter planejado
  com folga suficiente desde cedo — tentar fechar mais perto de 9-10
  desta vez, distribuindo com folga real ao longo dos 3 atos.
- Primeiro momento de intimidade real sugerido pra depois da revelação
  sobre o real papel/uso do depoimento de Vera na sindicância —
  vulnerabilidade emocional real antecedendo a física.

## 5. Formato
- ~55-58 capítulos, POV dual — Vera (ímpar) / Marcelo (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- Sem epílogo (mesma lógica da série).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — atenção a diferenciar a voz de Marcelo da
   de Noah (Livro 1): mais seco/cansado, menos performático.
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa (incluindo o próprio Livro 1 desta
   série — universo independente, sem cameo); plausibilidade jurídica/
   aduaneira básica; motivação real dos antagonistas; RESPEITO
   ESTRITO ao limite de conteúdo.
9. bia-ferreira-formatter — capa nova, tom "porto noturno" próprio.

## 7. Símbolos
A definir na escrita — sugestões: um contêiner específico, um
documento/carimbo aduaneiro, o crachá/distintivo que Marcelo perdeu.

## 8. Decisões via AskUserQuestion — registro
Usuário disse "livro 2" sem especificar — não houve pergunta formal
via AskUserQuestion (mesmo padrão já estabelecido nesta sessão pra
continuações de série sem briefing novo). Par, caso, antagonista e
ambientação foram CHAMADAS EDITORIAIS DIRETAS, documentadas aqui e em
arco-trama-livro2.md, deliberadamente variando a mecânica central do
trope (testemunho tecnicamente correto usado politicamente, não
condenação injusta) e o cenário (porto/Santos, não interior paulista)
pra dar variedade real à série em vez de repetir a fórmula do Livro 1
com nomes trocados.
