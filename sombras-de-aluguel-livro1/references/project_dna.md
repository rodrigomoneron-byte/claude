# DNA do Projeto — Sombras de Aluguel (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-06. PRIMEIRO livro de dark
> romance/suspense romântico da casa, baseado em briefing completo do
> usuário (`briefing_sombras_de_aluguel.pdf`). Reaproveita as skills
> genéricas bia-ferreira-* (não as skills juju-*, específicas do
> elenco fixo de Gelo e Sangue) — decisão DEFAULT ASSUMIDA, pergunta
> sobre pseudônimo/pipeline ficou sem resposta do usuário.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série —
  quinta série do catálogo (após A Mão na Alavanca/clube de carvalho,
  Jogo Infinito, Família Bittencourt, Elite de Cambridge), primeira em
  registro Dark Romance/Suspense.
- Capa (do briefing): tons escuros — preto e cinza com detalhes em
  vermelho ou dourado, silhuetas na névoa, transmitindo mistério e
  perigo. Palavras-chave de metadados: "dark romance", "suspense
  romântico", "protetor", "fuga". DIFERENTE de todas as capas
  anteriores da casa (nenhuma usa esse registro visual sombrio).

## 1. Estilo e Voz — marcas específicas desta série (adaptadas do gênero dark romance)
1. **Competência letal como flerte** — Julian demonstrando controle
   absoluto de uma situação de perigo real como forma de proteção que
   também é sedução (equivalente à "competência como flerte" do resto
   do catálogo, mas com risco físico real, não só intelectual/
   profissional).
2. **Silêncio/frieza como escudo** — Julian usa o mínimo de palavras
   como defesa emocional; a marca aparece quando ele quebra esse
   padrão e diz mais do que pretendia.
3. **Slow burn em proximidade forçada literal** — convivência no
   refúgio isolado, regras rígidas de contato físico/distância que vão
   sendo testadas.
4. **Protetor que nunca controla** — distinção ativa e recorrente
   entre a proteção de Julian (com consentimento, reversível, para o
   bem de Clara) e o controle de Rodrigo (posse, unilateral, para o
   próprio benefício dele) — marca temática central deste livro, sem
   equivalente direto nas séries anteriores.
5. **O jogo tem preço de sangue/liberdade visível** — diferente do
   preço acadêmico/imigratório (Elite de Cambridge) ou financeiro
   (Jogo Infinito): aqui o preço é literal risco de vida e liberdade.
6. **Humor ácido de Dante como válvula de escape** — alívio cômico
   pontual em meio à tensão, nunca banalizando o perigo real.
7. **Capítulo fecha no gancho de perigo ou tensão** — adaptação da
   marca #7 da casa ("capítulo fecha no gesto que reabre o jogo") pro
   registro de suspense: cada capítulo termina em ameaça, revelação
   parcial, ou tensão não resolvida.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro,
  mesmo no tom mais frio/cortante de Julian.
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: em TODOS os livros já produzidos nesta casa, o
  device proibido de autocorreção ("a gente— nós") apareceu
  recorrentemente, mesmo com aviso explícito repetido — tratar como
  certeza estatística, não risco hipotético.

## 2b. LIMITE DE CONTEÚDO — violência doméstica (NÃO NEGOCIÁVEL)
Este livro trata de sobrevivência a abuso doméstico como motor
emocional real, mas:
- NENHUMA cena de violência física contra Clara mostrada em tempo real
  na narrativa (presente da história). O abuso é estabelecido como
  PASSADO, via menção, memória curta/flashback controlado (não cena
  completa e prolongada), e efeito psicológico presente (hipervigilância,
  sobressalto, dificuldade de confiar) — nunca reencenado em detalhe
  gráfico.
- Violência física que ACONTECE em cena (a invasão do Ato II, o
  confronto final do Ato III) é entre Julian/aliados e os capangas de
  Rodrigo — ação/suspense, não abuso doméstico.
- Julian nunca exerce controle coercitivo sobre Clara — toda regra de
  segurança que ele impõe deve ser justificada racionalmente
  (proteção tática) e Clara sempre pode questionar/negociar, nunca é
  silenciada. Distinção com Rodrigo deve ficar explícita na prosa em
  pelo menos uma cena por ato.
- Consentimento explícito e claro em toda cena de intimidade — sem
  ambiguidade, sem "não que quer dizer sim".

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 5 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em praticamente todos os atos — só a
trava dura no `loop_state.py record` funciona de forma confiável.
Lições incorporadas: MIRAR TOPO DA FAIXA de palavras desde o Ato 1
(não só no fim), contar manualmente o gap de heat desde o início (o
Livro 2 de Elite de Cambridge fechou com déficit mesmo com aviso), usar
contagem de palavras via Python como checagem alternativa ao `wc -w`
(bug de locale/UTF-8 documentado, divergência de até ~3%). Não
inventar nova técnica experimental além disso.

## 4. Cadência de heat
- ~8-10 cenas (levemente menor que o padrão de 10-12 do resto do
  catálogo — justificado pelo ritmo mais orientado a suspense/ação
  deste gênero específico, onde tensão física de perigo compete por
  espaço com tensão romântica).
- Registro: explícito-elegante, com tom "grumpy/protetor possessivo"
  mas sempre com consentimento claro (ver seção 2b).
- Primeira cena até o cap. 12 (ligeiramente mais tarde que o padrão —
  a confiança de Clara precisa ser construída de forma crível antes de
  qualquer intimidade, dado o contexto de trauma recente).
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o início.
- Primeiro momento de intimidade real sugerido para depois da cena
  "O Segredo de Julian" (Ato II) — a vulnerabilidade emocional
  compartilhada antecedendo a física.

## 5. Formato
- ~55-58 capítulos, POV dual — Clara (ímpar) / Julian (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA desde o início.
- Sem epílogo neste Livro 1 (mesma lógica do resto do catálogo —
  reservar decisão pra eventual continuação da série "Vance Security &
  Recovery").

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — adaptar critério pro tom mais sombrio.
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até completar os capítulos.
7. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; consistência do plano de perseguição
   de Rodrigo (linha do tempo, como ele encontra pistas); RESPEITO
   ESTRITO ao limite de conteúdo da seção 2b (nenhuma cena de
   violência doméstica gráfica deve ter passado despercebida);
   distinção proteção-vs-controle mantida em toda cena de Julian.
8. bia-ferreira-formatter — capa nova, tom "dark romance" (preto/
   cinza/vermelho ou dourado, silhuetas na névoa) — primeira vez que a
   casa usa esse registro visual.

## 7. Símbolos
A definir na escrita — sugestões do gênero: um objeto de segurança
(a arma que Julian ensina Clara a usar), uma cicatriz específica, o
próprio refúgio/casa na serra como símbolo de santuário conquistado.
Documentar assim que decidido.

## 8. Decisões via AskUserQuestion — registro
Usuário enviou o briefing completo do livro sem esperar resposta a
perguntas anteriores sobre "próximo projeto" — enredo/personagens
vêm diretamente do arquivo (arco-trama-livro1.md reproduz o
briefing). Pergunta subsequente sobre qual pseudônimo/pipeline usar
(R.B. Guidenelli vs. Jussara Leal) ficou SEM RESPOSTA — prossegui com
R.B. Guidenelli como DEFAULT ASSUMIDO, documentado aqui, justificado
pela reutilização direta das skills genéricas já validadas em 4 séries
anteriores (as skills "juju-*" são hardcoded pro elenco fixo de Gelo e
Sangue e exigiriam adaptação antes de usar). Ajustável se o usuário
discordar ao ver o resultado.
