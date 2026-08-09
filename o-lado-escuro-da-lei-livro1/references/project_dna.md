# DNA do Projeto — O Lado Escuro da Lei (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-09. Sexta série do catálogo,
> baseado em briefing completo do usuário
> (`briefing_o_lado_escuro_da_lei.pdf`), confirmado explicitamente
> como "mesma casa e mesmas skill e configurações" — sem necessidade
> de repreguntar pseudônimo/pipeline.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa (do briefing): elementos urbanos escuros, silhuetas sob luzes
  de névoa ou sirenes, transmitindo urgência e perigo. Palavras-chave:
  "romantic suspense", "enemies to lovers", "suspense policial".
  DIFERENTE das capas de Sombras de Aluguel (serra/névoa vermelho-
  dourado L1, tech noir verde/azul L2, camuflagem urbana/imprensa L3)
  — aqui o registro é mais "suspense policial noturno" (sirenes, luz
  de rua, fórum/tribunal como elemento visual possível).

## 1. Estilo e Voz — marcas específicas desta série (adaptadas do gênero legal thriller/suspense)
1. **Competência jurídica/estratégica como flerte** — Diana
   argumentando ou decifrando um esquema em tempo real, Noah lendo uma
   situação de risco com precisão de sobrevivente — competência mútua
   como forma de admiração relutante.
2. **Rigidez moral rachando aos poucos** — a marca de Diana: cada vez
   que a regra que ela jurou seguir choca contra a sobrevivência real,
   e ela escolhe diferente.
3. **Slow burn em proximidade forçada literal** — esconderijo(s) no
   interior paulista, fuga constante, sem alternativa de distância.
4. **Rancor real virando confiança absoluta** — diferente do "protetor
   que nunca controla" clássico da casa: aqui o ponto de partida é
   ÓDIO justificado dos dois lados (ela o condenou; ele pagou por um
   crime que não cometeu) — a marca é quando um escolhe confiar no
   outro apesar do próprio histórico dizer pra não confiar.
5. **O jogo tem preço de liberdade E de verdade institucional
   visível** — diferente dos livros anteriores: aqui o preço não é só
   sobreviver, é also limpar o nome de Noah e expor a corrupção do
   próprio sistema que Diana jurou servir.
6. **Ironia amarga como blindagem de Noah** — ele usa sarcasmo seco
   (diferente do humor caloroso de Dante em Sombras de Aluguel) pra
   lidar com cinco anos perdidos; a marca aparece quando a ironia
   falha e a raiva/dor reais aparecem.
7. **Capítulo fecha no gancho de perigo ou tensão** — herdado sem
   mudança.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística, não risco
  hipotético.

## 2b. LIMITE DE CONTEÚDO (adaptado — tema é corrupção institucional/crime organizado, não abuso doméstico nem crime financeiro puro)
- Nenhuma cena de violência física gráfica e prolongada contra Diana
  ou Noah mostrada em tempo real — perigo real (atentados, emboscada,
  captura), mas corte editorial antes de agressão detalhada.
- Nem Diana nem Noah exercem controle coercitivo um sobre o outro —
  mesmo com o histórico de rancor mútuo (ela o condenou, ele "cobra a
  dívida moral"), a dinâmica romântica deve ser de escolha mútua e
  respeito crescente, nunca de um forçando decisão do outro. A "dívida
  moral" que Noah menciona no briefing é motivação inicial dele pra
  protegê-la, não licença pra controlá-la — evoluir isso pra parceria
  genuína ao longo do livro.
- Consentimento explícito e claro em toda cena de intimidade.
- Plausibilidade jurídica básica: o crime que incriminou Noah, o
  processo de revisão/prova de inocência, e a "transmissão ao vivo"
  de provas no clímax devem fazer sentido mínimo dentro do sistema de
  justiça brasileiro fictício retratado (não precisa ser hiper-
  técnico, mas coerente e não absurdo).
- "O Chefe" e a organização podem ser genuinamente perigosos e sem
  redenção, mas motivação sistêmica (poder, lucro, proteção da própria
  rede) deve ficar articulada quando revelados.
- Delegado Evandro (traidor) precisa de motivação humana real (coação,
  não maldade pura) — sua traição deve doer precisamente porque ele
  tem motivo compreensível, não porque é vilão de cartola.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 8 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. Os últimos
livros de Sombras de Aluguel fecharam dentro da meta por mirar o topo
da faixa DESDE O ATO 1 — repetir essa disciplina aqui desde o início.
Usar contagem via Python (`len(open(f).read().split())`) como padrão,
não `wc -w` (bug de locale documentado, divergência de até ~5%). Não
inventar nova técnica experimental além disso.

## 4. Cadência de heat
- ~8-10 cenas, explícito-elegante, mesmo registro geral da casa.
- Primeira cena até o cap. 12.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o cap. 1 (lição
  definitiva: os últimos livros da casa só bateram a meta quando
  planejaram isso desde cedo, não organicamente).
- Primeiro momento de intimidade real sugerido pra depois da
  "Revelação da Inocência" (ponto de virada do Ato II) — vulnerabilidade
  compartilhada real antecedendo a física.

## 5. Formato
- ~55-58 capítulos, POV dual — Diana (ímpar) / Noah (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- Sem epílogo neste Livro 1 (reservar decisão pra eventual série
  "Justiça Sombria").

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; plausibilidade jurídica básica;
   motivação real de Evandro e de "O Chefe"; RESPEITO ESTRITO ao
   limite de conteúdo.
9. bia-ferreira-formatter — capa nova, tom "suspense policial
   noturno" próprio.

## 7. Símbolos
A definir na escrita — sugestões: um objeto do tribunal (a toga, o
crachá de promotora), um objeto de Noah ligado aos 5 anos perdidos
(algo que ele guardou/fez na prisão), o esconderijo/refúgio de Tio
Chico como símbolo de santuário fora do sistema.

## 8. Decisões via AskUserQuestion — registro
Usuário enviou o briefing completo do livro E confirmou explicitamente
"mesma casa e mesmas skill e configurações" no mesmo turno — nenhuma
pergunta necessária sobre pseudônimo/pipeline (diferença do onboarding
de Sombras de Aluguel L1, onde essa pergunta ficou sem resposta).
Enredo/personagens vêm diretamente do briefing (arco-trama-livro1.md
reproduz o conteúdo). Decisões editoriais menores (motivação de
Evandro, identidade/timing de revelação de "O Chefe", plausibilidade
jurídica, símbolos) ficam para a escrita, documentadas no log de
mundo-personagens-livro1.md conforme decididas.
