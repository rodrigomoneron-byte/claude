# Elite de Cambridge — Livro 3 (Harvard Medical School, Camila/Rafael)

## Objetivo
Terceiro livro da série "Elite de Cambridge" — rivals-to-lovers entre
dois residentes brasileiros de Medicina Interna em Harvard, forçados a
dividir o acompanhamento do caso clínico mais delicado do ano. Par/
departamento definido como DEFAULT ASSUMIDO (usuário não respondeu à
pergunta de escolha, segunda vez consecutiva).

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro3.md`
- Estado do mundo/canon: `references/mundo-personagens-livro3.md`
- DNA do projeto: `references/project_dna.md`

## Saída esperada
- Capítulos em `outputs/conteudo/ecl3-capituloNN.md`
- PROGRESS.json + PROGRESS.md
- No fim: EPUB + PDF 6x9" + prompt de capa (tom "elite médica",
  diferente das capas dos Livros 1-2)

## Metas travadas
- ~55-58 capítulos, POV dual — Camila (ímpar) / Rafael (par).
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — MIRAR O TOPO da faixa DESDE O ATO 1 (lição acumulada dos Livros
  1-2: os dois precisaram de atenção extra pra não fechar abaixo do
  piso; o Livro 2 só evitou reforço extra por mirar o topo nos
  capítulos finais — fazer isso desde o início aqui).
- Heat: ~10-12 cenas, explícito-elegante — contar manualmente o gap
  desde o cap. 1 (o Livro 2 fechou com só 8 cenas, abaixo da meta,
  apesar do aviso).
- Régua absoluta: só "nós", nunca "a gente" — vigilância MÁXIMA
  (histórico da série inteira: device proibido recorrente em todos os
  livros anteriores, mesmo com aviso repetido em cada ato).
- Piso de extensão como TRAVA DURA no `loop_state.py record`.
- Quadro clínico do paciente central deve ser medicamente plausível.
- Sem epílogo neste Livro 3.

## Critério de parada
Todos os capítulos escritos, aprovados, formatação final gerada.
`loop_state.py check` reportando cadência dentro da meta.
