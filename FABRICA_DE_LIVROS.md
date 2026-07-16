# Fábrica de Livros — Casa R.B. Guidenelli (ex-"Bia Ferreira")

Este repositório guarda tanto as ferramentas de análise de KDP quanto o
motor de escrita autônoma da casa autoral. As skills que definem a voz,
a régua e o fluxo de produção estão fixadas em `.claude/skills/` na
**raiz deste repositório** — por isso qualquer sessão nova do Claude
Code aberta neste mesmo repositório, em qualquer pasta, já tem acesso a
elas automaticamente. Não é preciso reinstalar nada por livro.

## Skills disponíveis (repo-wide)

- `bia-ferreira-chapter-writer` — escreve capítulos na voz da casa
- `bia-ferreira-voice-validator` — valida um capítulo contra as 7 marcas
- `bia-ferreira-editor-global` — revisão global de manuscrito completo
- `bia-ferreira-formatter` — gera EPUB/PDF/capa/metadados para KDP
- `bia-ferreira-loop` — orquestra a produção autônoma capítulo a capítulo

Os nomes internos ("bia-ferreira-*") são legado do primeiro livro da
casa; o pseudônimo público atual é **R.B. Guidenelli**. A voz é a
mesma — só o nome público mudou.

## Como as skills funcionam entre projetos diferentes

As skills contêm a **técnica reutilizável** (as 7 marcas como padrão
estrutural, a régua absoluta "nós"/nunca "a gente", a estrutura de
capítulo, o fluxo de validação e formatação). Elas NÃO contêm o elenco,
o mundo ou os símbolos de nenhum livro específico — esses vêm sempre do
`project_dna.md` e da bíblia (`arco-trama-livroN.md` ou equivalente) do
livro que está sendo escrito no momento.

Os arquivos de referência dentro de cada skill (`references/*.md`) que
citam personagens como Sloane, Auden, Efua, Cole ou Eleanor são
**exemplos históricos do primeiro livro da casa** — servem só para
ilustrar como aplicar a técnica a um mundo concreto. Todos têm um aviso
no topo lembrando disso. **Nunca reaproveitar esses nomes num livro
novo.**

## Como começar uma trilogia/livro novo

1. Crie uma pasta nova na raiz do repo (ex.: `livro4/`, ou o nome da
   nova série).
2. Suba nela o pacote inicial daquele projeto: `TASK.md`,
   `LOOP_INSTRUCTIONS.md`, `PROGRESS.json`/`.md`, `references/`
   (project_dna.md, a bíblia daquele livro, branding se for diferente)
   e `scripts/` (`regua_gate.py`, `loop_state.py` — pode copiar de
   `livro3/scripts/` como ponto de partida).
3. As skills da raiz do repo já cobrem a escrita/validação/formatação —
   não é preciso reinstalar. Rode o onboarding daquele projeto (as
   "decisões a travar" da bíblia dele) antes de escrever qualquer
   capítulo.
4. Se abrir uma sessão nova do Claude Code neste mesmo repositório, as
   skills já aparecem disponíveis automaticamente. Se abrir num
   repositório diferente, é preciso copiar a pasta `.claude/skills/`
   para lá também (ou adicionar este repo como fonte).

## Avisos herdados (importam em qualquer livro novo)

1. **Régua "a gente":** o `scripts/regua_gate.py` tem bugs conhecidos
   de whitelist por substring (uma frase permitida perto de um "a
   gente" real mascara o hit). Sempre complementar o gate automático
   com `grep -n "a gente" <arquivo>` manual antes de aprovar um
   capítulo. Documentado em detalhe em `livro3/references/canon-livro3.md`.
2. **Device proibido:** nunca deixar um personagem se autocorrigir
   sobre "a gente", nem a narração comentar que "não corrigiu" a fala
   de alguém — isso É a quebra de quarta parede proibida, mesmo
   disfarçada de comentário neutro.
3. **Contaminação entre projetos:** ao escrever um livro novo, nunca
   puxar nomes/fatos de outro livro da casa de memória — sempre
   confirmar contra o project_dna.md/bíblia do projeto atual.
4. **Heat 80/20:** a cadência-alvo e o registro (fade-to-black vs.
   explícito-elegante) são travados por projeto no onboarding — não
   presumir um padrão herdado de outro livro.
5. **Extensão:** cada projeto trava se a meta é por capítulo (número
   fixo) ou pelo total do livro (capítulos de tamanho variável) — não
   presumir.
