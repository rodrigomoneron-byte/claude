# DNA do Projeto — Jogo Infinito, Livro 5: O Jogo Final (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-01. Quinto e ÚLTIMO livro da série
> "Jogo Infinito" — herda as decisões de nível-série travadas nos
> Livros 1-4 e trava as decisões novas específicas deste volume final
> (retorno de Alexandra, casamento, epílogo). Decisões seguidas como
> default assumido, documentadas aqui e em arco-trama-livro5.md seção
> "DECISÕES A TRAVAR".

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (branding "The Old English
  Gentleman's Club" — ver references/branding-rbg.md, idêntico aos
  Livros 1-4). Mesmo universo — elenco principal herdado, ISOLADO de
  Gelo e Sangue e de qualquer outro livro da casa.

## 1. Estilo e Voz (7 marcas — herdadas, sem mudança)
1. **Estratégia como linguagem corporal**
2. **A neutralidade que já é escolha** — reaplicada à reação do
   círculo próximo (Marcus, Elena, o conselho) à volta de Alexandra:
   dividido entre desconfiança protetora e vontade genuína de dar
   segunda chance.
3. **Slow burn medido em conflito de interesse** — reaplicado pela
   última vez a um conflito puramente pessoal: quanto confiar de novo
   em alguém que já traiu confiança uma vez, mesmo com remorso real.
4. **Rivalidade que é intimidade antiga** — finalmente aplicável a
   Alexandra de um jeito literal: ela É família, a intimidade é real e
   antiga, não metafórica como foi com Kroll/Halloway.
5. **O jogo tem preço visível e concreto** — o preço aqui é tempo e
   vulnerabilidade emocional, não mais dinheiro ou reputação
   corporativa.
6. **Humor ácido como blindagem executiva**
7. **O capítulo fecha no gesto que reabre o jogo** — no epílogo, o
   "jogo" final que se reabre é a vida cotidiana da família, não mais
   uma ameaça — cuidado para o gesto final não soar como conflito
   forçado só para manter a fórmula; um fechamento sereno é aceitável
   e apropriado no epílogo.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem. Mesma régua da casa inteira.
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo, ou a
  narração comentando a própria régua — quebra de quarta parede. (Isso
  vazou do rascunho pelo menos 5 vezes durante a escrita do L4, sempre
  pego antes do commit — continue vigilante, é um erro fácil de
  cometer sem perceber, não só um risco teórico.)
- Falsos positivos permitidos (whitelist do gate): "essa/esta/toda/
  nossa/muita/tanta gente", "gente demais", "gente de/da/que/como" no
  sentido de "pessoas".
- TODO capítulo passa pelo gate + varredura manual `grep -n "a gente"`
  ANTES de ser registrado. Sem exceção.
- Zero brasileirismo (Nova York/Europa continental como cenário).

## 3. CHECKPOINT DE CADÊNCIA — CORREÇÃO DE PROCESSO (v3, causa raiz)
**Histórico**: o L3 tinha checkpoint só de aviso (não bastou — livro
saiu 7 mil palavras curto). O L4 mudou o piso pra TRAVA DURA no
`loop_state.py record` (recusa registrar capítulo abaixo do piso) — o
livro fechou dentro da meta sem passe de reforço no final, mas a taxa
de capítulos que precisaram de expansão de emergência durante a
escrita SUBIU ao longo do L4 (7/20 → 16/20 → 17/20), mostrando que a
trava resolveu o SINTOMA (livro sai do tamanho certo) mas não a CAUSA
(rascunho sistematicamente curto).

**Mudança pra este livro**: a skill `bia-ferreira-chapter-writer` foi
atualizada com um orçamento de palavras POR ESTÁGIO do capítulo
(Abertura ~10-15%, Desenvolvimento ~45-55%, Virada ~15-20%, Saída
~10-15%, fechamento ~5-10%), com instrução de parar depois do
Desenvolvimento e checar se ele já passou de 40% do alvo ANTES de
seguir escrevendo — não só conferir a contagem no final. A causa raiz
identificada: capítulos com diálogo curto e denso completam a
progressão dramática dos 5 estágios muito antes da extensão-alvo,
porque cada troca de fala carrega poucas palavras mesmo quando a cena
"parece pronta".

**Regra operacional**: ao escrever cada capítulo deste livro, aplicar
o orçamento por estágio ativamente (não como conferência pós-hoc). A
trava dura do `loop_state.py record` continua ativa como rede de
segurança (85% da média-alvo, sys.exit 3 se abaixo), mas o objetivo
real é que ela pare de disparar com frequência — se continuar
disparando na maioria dos capítulos como no L4, é sinal de que o
orçamento por estágio não está sendo seguido na prática, não motivo
pra aceitar como normal.

## 4. Cadência de heat (herdada, ajuste de escala pro livro final)
- ~10-12 cenas ao longo do livro (ajustável pra baixo se o Ato 3 e o
  epílogo, por natureza mais celebratórios/reflexivos que
  eróticos, pedirem menos — não forçar cena onde não serve à cena),
  explícito-elegante (80/20).
- Primeira cena até o capítulo 6.
- Gap máximo de 6 capítulos entre cenas (pode relaxar no epílogo, que é
  mais curto e mais sobre reflexão que sobre heat).
- Registrar SEMPRE `--heat yes` no capítulo que tiver cena.

## 5. Formato
- ~58-60 capítulos + epílogo (2 capítulos finais ou 1 capítulo mais
  longo, ajustável), POV dual Cami (ímpar) / Alex (par), primeira
  pessoa do presente, Dan nunca POV.
- Extensão: 950-1100 palavras/capítulo, total ~58.000-61.000 palavras.
- ÚNICO epílogo de toda a série — reservado pra este volume desde o
  planejamento original.
- Marca 7 obrigatória: todo capítulo fecha num gesto que reabre o
  jogo — no epílogo, o gesto pode ser de serenidade, não precisa
  reabrir conflito novo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — orçamento por estágio
   ativo durante a escrita, já na extensão-alvo.
2. RÉGUA (regua_gate.py) — trava dura, corrigir até LIMPO.
3. VALIDAR (bia-ferreira-voice-validator) — score /7.
4. Falha de score não-estrutural → auto-revisar (máx. 2 rounds) →
   aprovar com ressalva se persistir.
5. REGISTRAR (loop_state.py record) — trava dura de extensão + régua.
   Se recusar (exit 3), expandir o ESTÁGIO curto (não um parágrafo
   genérico) e tentar de novo.
6. Repetir até completar todos os capítulos + epílogo.
7. bia-ferreira-editor-global (revisão de consistência — atenção
   especial à continuidade de 5 livros: todos os símbolos, todo o
   elenco, toda a timeline).
8. bia-ferreira-formatter (EPUB/PDF/capa).

## 7. Símbolos e continuidade
Ver references/mundo-personagens-livro5.md — sete símbolos/marcadores
já acumulados ao entrar neste livro (relógio, caneta, réplica,
sapatinhos, monitor, carta pra Rosalind, envelope de Alexandra). Este
é o livro que fecha o fio de todos eles — não introduzir símbolo novo
sem motivo forte; o movimento certo aqui é resolver, não acumular mais.

## 8. Decisões via AskUserQuestion sem resposta — defaults assumidos
Nenhum AskUserQuestion foi enviado para este onboarding especificamente
(o usuário já havia instruído "resolver [o processo] e depois ir para
o livro 5", delegando o restante). As decisões de enredo seguem o
mesmo padrão de default documentado dos onboardings anteriores —
ver arco-trama-livro5.md, seção "DECISÕES A TRAVAR", para a lista
completa com justificativa de cada uma.
