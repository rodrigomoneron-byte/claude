# Elite de Cambridge — Livro 1: O Código da Revanche

## Objetivo
Primeiro livro de uma nova série sob o mesmo pseudônimo da casa
(R.B. Guidenelli) — academic enemies-to-lovers entre dois doutorandos
brasileiros de IA em Harvard, baseado em briefing completo fornecido
pelo usuário.

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro1.md`
- Estado do mundo/canon: `references/mundo-personagens-livro1.md`
- DNA do projeto: `references/project_dna.md`

## Saída esperada
- Capítulos em `outputs/conteudo/ocr-capituloNN.md`
- PROGRESS.json + PROGRESS.md
- No fim: EPUB + PDF 6x9" + prompt de capa (capa nova, tom "dark/light
  academia")

## Metas travadas
- ~55-58 capítulos, POV dual — Helena (ímpar) / Arthur (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- Heat: ~10-12 cenas, explícito-elegante — registro próximo de Jogo
  Infinito/Família Bittencourt L1-L2 (ver project_dna.md seção 4).
- Régua absoluta: só "nós", nunca "a gente" — inclusive nas cenas de
  código-switching em português entre Helena e Arthur.
- Piso de extensão como TRAVA DURA no `loop_state.py record` — processo
  padrão de 2 chamadas, sem nova técnica experimental (conclusão
  acumulada de 3 livros anteriores: só a trava dura funciona de forma
  confiável).
- Sem epílogo neste Livro 1.

## Critério de parada
Todos os capítulos escritos, aprovados, formatação final gerada.
`loop_state.py check` reportando cadência dentro da meta.
