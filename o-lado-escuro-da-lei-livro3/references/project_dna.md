# DNA do Projeto — Justiça Sombria, Livro 3 — FECHAMENTO DA TRILOGIA (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-09. Terceiro e ÚLTIMO livro da
> série "Justiça Sombria" — usuário pediu explicitamente "seguir livro
> 3 e fechar essa [série]". Par novo (Beatriz Nogueira x Caio Andrade),
> caso novo, MAS com revelação estrutural conectando os antagonistas
> dos Livros 1-2 à mesma rede maior, cameo cruzado dos dois casais
> anteriores, e epílogo obrigatório.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**, mesma casa multi-série.
- Capa: nova, mesma linha "suspense policial/institucional noturno" da
  série, elemento visual DIFERENTE dos Livros 1 (giroflex/fórum) e 2
  (porto/contêineres) — sugestão: fachada do STF/CNJ ou tribunal
  superior à noite, balança da justiça em silhueta parcialmente
  quebrada/sombreada, luz fria de Brasília.

## 1. Estilo e Voz — marcas específicas deste livro (fechamento, adaptadas dos Livros 1-2)
1. **Competência institucional como flerte** — Beatriz decifrando
   padrões de conexão entre casos, Caio lendo estrutura de poder
   judiciário como ninguém mais — competência mútua como respeito,
   não rivalidade (diferente dos livros anteriores).
2. **Fé institucional real sendo testada** — a marca de Beatriz: ela
   genuinamente acredita que o sistema pode se corrigir; a fissura não
   é uma fachada rachando, é fé sendo posta à prova real, podendo
   sobreviver transformada, não destruída.
3. **Slow burn em aliança sob pressão, não hostilidade** — diferente
   do enemies-to-lovers dos Livros 1-2: aqui o par já se respeita
   desde o início, a intimidade cresce de trabalho conjunto genuíno,
   não de rancor superado.
4. **Isolamento como método de Caio cedendo a parceria real** — ele
   trabalhou sozinho por anos por desconfiar de instituições
   (inclusive a de Beatriz); a marca é quando ele escolhe, ativamente,
   confiar numa aliança formal de novo.
5. **O jogo tem preço de credibilidade institucional inteira** —
   diferente do preço individual dos livros anteriores: aqui o que
   está em jogo é se o próprio sistema de justiça pode ser reformado
   ou precisa ser exposto publicamente pra forçar mudança.
6. **Peso de trabalhar sozinho vs. força de aliança real** — tema
   recorrente na voz de ambos.
7. **Capítulo fecha no gancho de perigo ou tensão** — herdado, exceto
   no epílogo, que fecha em tom sereno (mesma lógica de fechamentos de
   trilogia anteriores da casa).

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — narração e diálogo, qualquer registro.
- `regua_gate.py` (word-boundary correto) + grep manual `\ba gente\b`
  em todo capítulo antes de registrar.
- VIGILÂNCIA MÁXIMA: apareceu em TODOS os livros já produzidos nesta
  casa, sem exceção — tratar como certeza estatística.

## 2b. LIMITE DE CONTEÚDO (mesma lógica adaptada dos Livros 1-2)
- Nenhuma cena de violência física gráfica e prolongada.
- Nem Beatriz nem Caio exercem controle coercitivo um sobre o outro.
- Consentimento explícito e claro em toda cena de intimidade.
- Plausibilidade jurídica/institucional básica: o funcionamento do
  CNJ, corregedorias, processo de afastamento de juiz, e a mecânica de
  uma rede de proteção mútua institucional devem fazer sentido mínimo
  dentro do sistema brasileiro fictício retratado.
- A revelação de que os antagonistas dos Livros 1-2 pertenciam à mesma
  rede PRECISA ser consistente com tudo que já foi estabelecido
  nesses dois livros — releia os logs de decisão antes de escrever
  qualquer capítulo que toque nisso.
- Cameo de Diana/Noah/Vera/Marcelo: caracterização fiel aos livros
  originais, papel de apoio ativo (testemunhas/fontes), sem reabrir
  arcos românticos próprios.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA
Conclusão acumulada de 10 livros anteriores da casa: taxa de expansão
de emergência entre 89-100% em quase todos os atos — só a trava dura
no `loop_state.py record` funciona de forma confiável. O Livro 2 desta
série fechou em 56.364 palavras (dentro da meta) e bateu a meta cheia
de heat (9/9) mirando o topo da faixa desde o Ato 1 — repetir essa
disciplina aqui. Usar contagem via Python (`len(open(f).read().split())`)
como padrão, não `wc -w` (bug de locale documentado). Não inventar nova
técnica experimental além disso.

## 4. Cadência de heat
- ~8-10 cenas, explícito-elegante, mesmo registro da série.
- Primeira cena até o cap. 12.
- Gap máximo 6 capítulos — CONTAR MANUALMENTE desde o cap. 1, mirando
  o TOPO da meta (9-10, como o Livro 2 conseguiu).
- Primeiro momento de intimidade real sugerido pra depois de um marco
  de confiança real entre os dois (equivalente estrutural às
  revelações emocionais dos livros anteriores, mas aqui nascendo de
  aliança, não de superação de rancor).

## 5. Formato
- ~55-58 capítulos + EPÍLOGO (2-3 capítulos adicionais, marcados
  "# Epílogo" não "# Capítulo N"), POV dual — Beatriz (ímpar) / Caio
  (par), primeira pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  (capítulos numerados) + epílogo à parte — MIRAR TOPO DA FAIXA DESDE
  O ATO 1.
- EPÍLOGO OBRIGATÓRIO — reunião dos três casais (Beatriz/Caio,
  Diana/Noah, Vera/Marcelo), tom sereno, fechamento definitivo da
  trilogia, não precisa reabrir conflito novo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, mirando topo da faixa desde o início.
2. RÉGUA (regua_gate.py) — trava dura.
3. LIMITE DE CONTEÚDO (seção 2b) — releitura obrigatória por capítulo,
   atenção especial à consistência da revelação estrutural com L1/L2.
4. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   desta série (seção 1) — atenção a diferenciar as vozes de Beatriz/
   Caio das de Diana/Noah e Vera/Marcelo.
5. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
6. REGISTRAR (loop_state.py record) — trava dura.
7. Repetir até completar os capítulos + epílogo.
8. bia-ferreira-editor-global — atenção a: consistência da revelação
   estrutural com os Livros 1-2 (releitura cruzada obrigatória);
   caracterização fiel dos 4 personagens em cameo; plausibilidade
   jurídica/institucional; RESPEITO ESTRITO ao limite de conteúdo.
9. bia-ferreira-formatter — capa nova, tom "Brasília/tribunal
   superior noturno" próprio. Relatório final com resumo da TRILOGIA
   INTEIRA (3 livros, palavras de cada um, total combinado).

## 7. Símbolos
A definir na escrita — sugestões: a balança da justiça (literal ou
metafórica), um mapa/quadro de conexões que Caio construiu sozinho ao
longo dos anos, algo que simbolize a transição de "sozinho" pra
"aliança".

## 8. Decisões via AskUserQuestion — registro
Usuário disse "seguir livro 3 e fechar essa [série]" — instrução clara
de fechamento de trilogia, sem especificar par/caso/mecanismo de
fechamento. Par, caso, mecânica do trope (allies-to-lovers em vez de
enemies-to-lovers, variação deliberada), revelação estrutural
conectando os antagonistas anteriores, cameo cruzado, e epílogo foram
CHAMADAS EDITORIAIS DIRETAS, documentadas aqui e em arco-trama-livro3.md,
desenhadas especificamente pra dar um fechamento satisfatório à
trilogia (não só mais um livro independente).
