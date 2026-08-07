# DNA do Projeto — Sombras de Aluguel, Livro 2 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-07. Segundo livro da série
> "Sombras de Aluguel", universo Vance Security & Recovery.
> Protagonista Dante — decisão editorial direta, justificada pelo
> próprio briefing original do usuário ("potencial de série focada em
> outros agentes ou aliados, como Dante").

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, mesma linha visual "dark romance" do Livro 1 (tons
  escuros, silhuetas, mistério/perigo), mas com paleta/elemento
  DIFERENTE do Livro 1 (que usou vermelho ou dourado sobre preto/
  cinza com névoa de serra) — sugestão: tom mais "tech noir" (verde
  ou azul elétrico sobre preto, telas/código como elemento visual,
  ambiente urbano/rural-tecnológico em vez de floresta/serra).

## 1. Estilo e Voz — marcas específicas deste livro (adaptadas do Livro 1)
1. **Competência técnica como flerte** — Dante decifrando ameaças
   digitais/financeiras em tempo real como forma de proteção que
   também é sedução intelectual (equivalente ao Livro 1, mas
   domínio técnico/financeiro em vez de físico/tático).
2. **Humor ácido como blindagem emocional REAL** (não silêncio, como
   Julian) — a marca aparece quando o humor falha e a vulnerabilidade
   real escapa sem disfarce.
3. **Slow burn em proximidade forçada literal**, adaptado ao refúgio
   tecnológico de Dante (não a mesma serra do Livro 1).
4. **Protetor que nunca controla** — herdado sem mudança do Livro 1,
   mesma distinção ativa entre proteção com consentimento e controle
   coercitivo do antagonista.
5. **O jogo tem preço financeiro/estrutural visível** — diferente do
   preço de vida/liberdade mais literal do Livro 1: aqui é reputação
   profissional, carreira, e risco real mas mediado por sistemas
   (rastreamento digital, não perseguição física direta na maior
   parte do livro).
6. **Ironia rápida como válvula de escape** — Dante conversa demais
   quando nervoso; a marca aparece quando ele se pega falando sério
   sem perceber.
7. **Capítulo fecha no gancho de perigo ou tensão** — herdado sem
   mudança.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` + grep manual (word-boundary `\b`) em todo capítulo
  antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, incluindo o Livro 1 desta mesma série — tratar como certeza
  estatística.

## 2b. LIMITE DE CONTEÚDO (adaptado do Livro 1)
Este livro NÃO trata de violência doméstica (diferente do Livro 1) —
o eixo temático é crime financeiro/corporativo e ameaça de morte
transacional/corporativa. Ainda assim, mantém os princípios gerais:
- Nenhuma cena de violência física gráfica e prolongada contra
  Fernanda mostrada em tempo real — ameaça e perigo reais, mas cortes
  editoriais antes de agressão detalhada, mesmo padrão do Livro 1.
- Dante nunca exerce controle coercitivo sobre Fernanda — toda regra
  de segurança é justificada taticamente e negociável; ela nunca é
  silenciada.
- Consentimento explícito e claro em toda cena de intimidade.
- Violência em cena (confrontos com capangas do antagonista, ação de
  resgate) é ação/suspense entre adultos em risco mútuo, não abuso
  reencenado.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 6 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. O Livro 1 desta
série fechou em 57.012 palavras (98% da meta de 58.000) só porque
mirou o topo da faixa nos atos finais — para ESTE livro, mirar o topo
da faixa de palavras DESDE O ATO 1 (não só nos atos finais), para
reduzir ainda mais o risco de precisar de reforço pós-fechamento. Usar
contagem via Python (`len(open(f).read().split())`) como padrão, não
`wc -w` (bug de locale documentado, divergência de até ~4,7%
confirmada no Livro 1). Não inventar nova técnica experimental além
disso.

## 4. Cadência de heat
- ~8-10 cenas, explícito-elegante, mesmo registro do Livro 1.
- Primeira cena até o cap. 12.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o cap. 1. ATENÇÃO
  CRÍTICA: o Livro 1 fechou com só 6 de 8-10 cenas, com um gap de 13
  capítulos durante o período de cativeiro da protagonista (estrutural
  e inevitável naquele contexto). Se este livro tiver um período
  equivalente de maior risco/isolamento extremo, PLANEJAR a cadência
  de heat ao redor dele desde o esboço do ato (cena antes e depois do
  período de risco), não deixar pra resolver organicamente sem
  planejamento — meta é fechar com pelo menos 8 cenas desta vez.
- Primeiro momento de intimidade real sugerido pra depois da revelação
  do passado de Dante (equivalente ao "Segredo de Julian" do Livro 1).

## 5. Formato
- ~55-58 capítulos, POV dual — Fernanda (ímpar) / Dante (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- Sem epílogo neste Livro 2 (mesma lógica do Livro 1 — reservar pra
  eventual fechamento de série).

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — atenção a diferenciar a voz de Dante da de
   Julian (não pode soar como o mesmo personagem).
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos.
8. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; consistência com o Livro 1 (cameo de
   Julian/Clara, fatos do universo Vance Security & Recovery já
   estabelecidos); RESPEITO ESTRITO ao limite de conteúdo (seção 2b);
   distinção proteção-vs-controle mantida; lógica básica do esquema
   financeiro/lavagem de dinheiro.
9. bia-ferreira-formatter — capa nova, tom "tech noir" próprio.

## 7. Símbolos
A definir na escrita — sugestão: algo ligado à tecnologia/dados (uma
linha de código, um dispositivo específico, o próprio refúgio
off-grid como símbolo de isolamento voluntário rompido).

## 8. Decisões via AskUserQuestion — registro
Usuário disse "vamos pro livro 2" sem especificar detalhes — não houve
pergunta formal via AskUserQuestion desta vez (diferença dos
onboardings anteriores), decisões de protagonista/antagonista/tema
foram tomadas como CHAMADAS EDITORIAIS DIRETAS, documentadas aqui e em
arco-trama-livro2.md, seguindo o padrão já estabelecido no catálogo de
que o usuário delega amplamente a construção de enredo quando não
fornece briefing específico. Protagonista Dante justificado pelo
próprio briefing original do Livro 1 (que já sinalizava esse caminho
de série). Antagonista e tema do crime deliberadamente DIFERENTES do
Livro 1 pra dar variedade real à série em vez de repetir a fórmula com
nomes trocados.
