# DNA do Projeto — Jogo Infinito, Livro 4: Legado e Reinvenção (R.B. Guidenelli)

> Preenchido no onboarding em 2026-07-30. Quarto livro da série "Jogo
> Infinito" — herda as decisões de nível-série travadas nos Livros 1-3
> e trava as decisões novas específicas deste volume. As decisões de
> enredo (gancho de legado/sucessão + gravidez, antagonista externo
> novo, sem traição interna, Kroll não retorna, sem casamento formal)
> foram propostas por Claude e seguidas como padrão — usuário não
> respondeu ao AskUserQuestion, ficam sinalizadas aqui como default
> assumido, ajustável a qualquer momento.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (branding "The Old English
  Gentleman's Club" — ver references/branding-rbg.md, idêntico aos
  Livros 1-3). Mesmo universo — elenco principal herdado, ISOLADO de
  Gelo e Sangue e de qualquer outro livro da casa.

## 1. Estilo e Voz (7 marcas — herdadas, sem mudança)
1. **Estratégia como linguagem corporal**
2. **A neutralidade que já é escolha** — reaplicada ao conselho
   reagindo à ideia de sucessão formal, dividido entre acolher Devon
   como sucessora natural ou preferir processo mais lento/tradicional.
3. **Slow burn medido em conflito de interesse** — reaplicado a um
   novo tipo de conflito: tempo profissional vs. tempo de gravidez/
   parentalidade iminente, não mais só "trabalho vs. domingo".
4. **Rivalidade que é intimidade antiga** — NÃO se aplica ao
   antagonista novo (sem vínculo pessoal prévio, puramente
   profissional, em contraste deliberado com o arco Kroll do L3).
5. **O jogo tem preço visível e concreto** — desta vez o preço mais
   alto é tempo com a família que está se formando, não só dinheiro ou
   reputação.
6. **Humor ácido como blindagem executiva**
7. **O capítulo fecha no gesto que reabre o jogo**

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem. Mesma régua da casa inteira.
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo, ou a
  narração comentando a própria régua — quebra de quarta parede. (Bug
  real do L3: um bloco de reforço escreveu exatamente esse device por
  engano — "a gente reavalia... corrigindo — nós reavaliamos, quero
  dizer" — e foi pego pelo próprio regua_gate.py. Fica documentado
  aqui como lembrete de que o device é fácil de escrever sem querer
  quando se está "consertando" uma frase no meio da escrita.)
- Falsos positivos permitidos (whitelist do gate): "essa/esta/toda/
  nossa/muita/tanta gente", "gente demais", "gente de/da/que/como" no
  sentido de "pessoas".
- TODO capítulo passa pelo gate + varredura manual `grep -n "a gente"`
  ANTES de ser registrado. Sem exceção. Rodar também
  `grep -n "pra gente\|da gente\|na gente\|com a gente"`.
- Zero brasileirismo (Nova York/Europa continental como cenário).

## 3. CHECKPOINT DE CADÊNCIA — CORREÇÃO DE PROCESSO (v2, mais dura)
**Histórico**: todo livro do catálogo até aqui precisou de um passe de
reforço PÓS-produção pra bater a extensão-alvo. O L3 já tinha um
checkpoint automático a cada `record`, mas ele era só um AVISO — e
mesmo assim o primeiro rascunho do L3 fechou em 51.057 palavras, ~7 mil
abaixo do piso de 58.000, exigindo um passe de reforço de ~7.000
palavras em ~40 capítulos antes de fechar o livro. O aviso não bastou.

**Mudança pra este livro**: `scripts/loop_state.py record` agora
RECUSA registrar um capítulo (sys.exit 3, sem salvar estado) se ele
vier abaixo de 85% da média-alvo por capítulo (~850 palavras, dado o
alvo de ~1000/capítulo · 60 capítulos · 60.000 palavras totais), a
menos que seja registrado explicitamente com `--ressalva` explicando
um motivo estrutural legítimo (ex: capítulo de transição rápida,
clímax deliberadamente curto). Isso é TRAVA DURA, não sugestão: o
capítulo abaixo do piso precisa ser expandido NO MESMO TURNO em que foi
escrito, antes de seguir pro próximo. Nenhum capítulo avança pro
próximo POV sem primeiro passar nessa trava.

**Regra operacional**: escrever cada capítulo já na faixa 950-1100
palavras DESDE O PRIMEIRO RASCUNHO — não escrever curto "pra completar
depois". O objetivo do piso duro é eliminar completamente a
necessidade de um passe de reforço no final; se ele ainda for
necessário neste livro, é sinal de que a trava não está sendo respeitada
e precisa de ajuste, não de mais um reforço aceito como normal.

## 4. Cadência de heat (herdada, sem mudança)
- 12 cenas ao longo do livro, explícito-elegante (80/20 — mais
  sugestão/tensão que anatomia crua).
- Primeira cena até o capítulo 6.
- Gap máximo de 6 capítulos entre cenas.
- Registrar SEMPRE `--heat yes` no capítulo que tiver cena — o
  checkpoint de heat (também automático a cada `record`) depende disso
  pra calcular o ritmo real.

## 5. Formato
- 60 capítulos, POV dual Cami (ímpar) / Alex (par), primeira pessoa do
  presente, Dan nunca POV.
- Extensão: 950-1100 palavras/capítulo, total ~58.000-60.000 palavras.
- Sem epílogo (reservado ao Livro 5).
- Marca 7 obrigatória: todo capítulo fecha num gesto que reabre o jogo.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — já na extensão-alvo.
2. RÉGUA (regua_gate.py) — trava dura, corrigir até LIMPO.
3. VALIDAR (bia-ferreira-voice-validator) — score /7.
4. Falha de score não-estrutural → auto-revisar (máx. 2 rounds) →
   aprovar com ressalva se persistir.
5. REGISTRAR (loop_state.py record) — trava dura de extensão (seção 3
   acima) + trava de régua. Se `record` recusar (exit 3), EXPANDIR o
   capítulo agora e tentar de novo antes de avançar.
6. Repetir até 60 capítulos completos.
7. bia-ferreira-editor-global (revisão de consistência).
8. bia-ferreira-formatter (EPUB/PDF/capa).

## 7. Símbolos e continuidade
Ver references/mundo-personagens-livro4.md — relógio de bolso, caneta,
réplica do cemitério já na estante; espaço simbólico aberto pra um
quarto objeto ligado ao bebê, a revelar organicamente na escrita, não
forçado cedo demais.

## 8. Decisões via AskUserQuestion sem resposta — defaults assumidos
Enviado no onboarding deste livro, sem resposta do usuário:
1. Gancho central = legado/sucessão + gravidez da Cami (não
   Alexandra Voss Whitfield retornando — esse gancho fica pro L5).
2. Antagonista = novo concorrente externo, escala equivalente ao L3
   (não escalando artificialmente livro a livro), sem vínculo com
   Kroll/Meridian.
Ver arco-trama-livro4.md, seção "DECISÕES A TRAVAR", para a lista
completa incluindo as herdadas sem necessidade de retravar.
