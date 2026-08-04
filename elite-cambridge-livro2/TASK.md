# Elite de Cambridge — Livro 2 (Harvard Law, Mariana/Nico)

## Objetivo
Segundo livro da série "Elite de Cambridge" — rivals-to-lovers entre
dois brasileiros mestrandos de Direito em Harvard, forçados a fazer
dupla na final do moot court. Par/departamento definido como DEFAULT
ASSUMIDO (usuário não respondeu à pergunta de escolha).

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro2.md`
- Estado do mundo/canon: `references/mundo-personagens-livro2.md`
- DNA do projeto: `references/project_dna.md`

## Saída esperada
- Capítulos em `outputs/conteudo/ecl2-capituloNN.md`
- PROGRESS.json + PROGRESS.md
- No fim: EPUB + PDF 6x9" + prompt de capa (tom "elite jurídica",
  diferente da capa "dark/light academia" do Livro 1)

## Metas travadas
- ~55-58 capítulos, POV dual — Mariana (ímpar) / Nico (par).
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  — mirar o TOPO da faixa nos últimos capítulos de cada ato (lição do
  Livro 1, que fechou abaixo do piso e precisou de reforço extra).
- Heat: ~10-12 cenas, explícito-elegante — contar manualmente o gap
  desde a última cena (não confiar só no loop_state.py check).
- Régua absoluta: só "nós", nunca "a gente" — vigilância redobrada
  (histórico do Livro 1: device proibido recorrente).
- Piso de extensão como TRAVA DURA no `loop_state.py record`.
- Sem epílogo neste Livro 2.

## Critério de parada
Todos os capítulos escritos, aprovados, formatação final gerada.
`loop_state.py check` reportando cadência dentro da meta.
