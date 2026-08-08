# DNA do Projeto — Sombras de Aluguel, Livro 3 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-08. Terceiro livro da série
> "Sombras de Aluguel", universo Vance Security & Recovery.
> Protagonista Aline Moura (nova agente) — decisão editorial direta,
> com inversão de gênero deliberada (protetora mulher, protegido
> homem) pra variar a fórmula estabelecida nos Livros 1-2.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, mesma linha "dark romance" da série, paleta DIFERENTE
  dos Livros 1 (vermelho/dourado sobre névoa de serra) e 2 (verde/azul
  elétrico "tech noir") — sugestão: tom "camuflagem urbana/imprensa"
  (cinza-jornal + um acento frio, elementos de câmera/microfone/
  disfarce, silhueta dupla se sobrepondo como "duas identidades").

## 1. Estilo e Voz — marcas específicas deste livro
1. **Competência de infiltração como flerte** — Aline lendo e se
   adaptando a qualquer ambiente social em tempo real como forma de
   proteção que também é sedução (equivalente aos livros anteriores,
   domínio social/psicológico em vez de físico/tecnológico).
2. **Precisão calculada como blindagem** — cada palavra de Aline é
   escolhida, nunca espontânea em serviço; a marca aparece quando ela
   fala sem calcular e se assusta com a própria sinceridade.
3. **Proximidade forçada por COBERTURA PÚBLICA, não isolamento físico**
   — os dois precisam manter uma fachada de intimidade em público que
   vai ficando real por baixo — dinâmica estruturalmente nova na série.
4. **Protetora que nunca controla** — herdado sem mudança: Aline nunca
   impõe silêncio ou reclusão a Thiago, negocia segurança dentro da
   escolha dele de continuar investigando.
5. **O jogo tem preço público/profissional visível** — diferente do
   preço de vida/liberdade (L1) e financeiro (L2): aqui é a carreira e
   a integridade jornalística de Thiago, e a própria identidade real
   de Aline, arriscadas ao mesmo tempo.
6. **Verdade escapando pela fresta do personagem** — a marca central
   de Aline: ela é treinada pra nunca quebrar o papel, então cada
   momento em que quebra tem peso dramático real.
7. **Capítulo fecha no gancho de perigo ou tensão** — herdado sem
   mudança.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` + grep manual (word-boundary `\b`) em todo capítulo
  antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, incluindo os dois livros anteriores desta série — tratar como
  certeza estatística.

## 2b. LIMITE DE CONTEÚDO (adaptado dos Livros 1-2)
Este livro trata de tráfico de armas internacional e jornalismo sob
risco — não violência doméstica (L1) nem crime financeiro puro (L2).
Princípios mantidos:
- Nenhuma cena de violência física gráfica e prolongada contra Thiago
  ou Aline mostrada em tempo real — perigo real, mas corte editorial
  antes de agressão detalhada.
- Aline nunca exerce controle coercitivo sobre Thiago — ele decide
  continuar investigando mesmo sob risco; ela negocia segurança, não
  impõe silêncio. Isso é ainda mais central neste livro, já que o
  cliente é ativo e resistente à proteção por natureza da própria
  profissão (jornalista que se recusa a recuar).
- Consentimento explícito e claro em toda cena de intimidade — atenção
  especial aqui porque a "cobertura" (fingir intimidade em público)
  cria zona cinzenta narrativa entre atuação e realidade; a prosa
  precisa deixar claro quando algo é real vs. encenado, especialmente
  antes/durante cenas de heat (nunca ambíguo se é consensual de
  verdade ou só "parte do personagem").
- Violência em cena (confrontos com operadores da rede) é ação/
  suspense entre adultos em risco mútuo.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 7 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. O Livro 2 desta
série fechou dentro da meta (56.985 palavras) e bateu a meta de heat
(9/8-10) por mirar o topo da faixa e planejar heat desde cedo — REPETIR
essa disciplina aqui desde o Ato 1. Usar contagem via Python
(`len(open(f).read().split())`) como padrão, não `wc -w` (bug de
locale documentado). Não inventar nova técnica experimental além disso.

## 4. Cadência de heat
- ~8-10 cenas, explícito-elegante, mesmo registro da série.
- Primeira cena até o cap. 12.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o cap. 1.
- ATENÇÃO ESPECIAL (única deste livro): pela dinâmica de "cobertura
  pública" (fingir intimidade em cena), há risco de cenas ficarem
  ambíguas sobre consentimento real vs. atuação — cada cena de heat
  precisa deixar textualmente claro que é real/consensual, não parte
  do personagem que Aline está interpretando.
- Primeiro momento de intimidade real sugerido pra depois da revelação
  do motivo pessoal de Aline (equivalente ao "Segredo de Julian"/
  "erro de campo de Dante" dos livros anteriores).

## 5. Formato
- ~55-58 capítulos, POV dual — Aline (ímpar) / Thiago (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- Sem epílogo (mesma lógica da série).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória, atenção
   especial à clareza de consentimento em cenas de "cobertura".
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — atenção a diferenciar a voz de Aline de
   Julian e Dante (não pode soar como nenhum dos dois).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; consistência com os Livros 1-2 (cameo,
   fatos do universo já estabelecidos); RESPEITO ESTRITO ao limite de
   conteúdo; clareza de consentimento nas cenas de cobertura/heat;
   lógica básica da rede de tráfico e sua desarticulação.
9. bia-ferreira-formatter — capa nova, tom "camuflagem urbana/
   imprensa" próprio.

## 7. Símbolos
A definir na escrita — sugestão: algo ligado a identidade/disfarce (um
objeto que Aline usa em toda operação, um gravador/caderno de Thiago,
um espelho ou processo de transformação física que vira metáfora de
"tirar a máscara").

## 8. Decisões via AskUserQuestion — registro
Usuário disse "livro 3" sem especificar — não houve pergunta formal
via AskUserQuestion desta vez (mesmo padrão do Livro 2), decisões de
protagonista/antagonista/tema/estrutura foram tomadas como CHAMADAS
EDITORIAIS DIRETAS, documentadas aqui e em arco-trama-livro3.md.
Protagonista nova (Aline) escolhida porque nenhum personagem
secundário já estabelecido tinha protagonismo claramente sinalizado
(diferente de Dante, que já vinha telegrafado desde o briefing
original do Livro 1) — decisão consistente com o conceito de agência
("outros agentes ou aliados") do próprio briefing. Inversão de gênero,
antagonista organizacional, e estrutura de cobertura pública (em vez
de refúgio isolado) são decisões editoriais deliberadas pra dar
variedade real à série em vez de repetir a fórmula com nomes trocados
pela terceira vez.
