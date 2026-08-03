# Família Bittencourt — Livro 2 (protagonizado por Pedro Bittencourt)

## Objetivo
Segundo livro da trilogia "Família Bittencourt" — arco de redenção de
Pedro Bittencourt (antagonista do Livro 1), reconstruindo a própria
vida em Lisboa e depois em São Paulo, conquistando confiança real (não
assumida) de um novo interesse romântico e da própria família.

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro2.md`
- Estado do mundo/canon: `references/mundo-personagens-livro2.md`
- DNA do projeto: `references/project_dna.md`

## Saída esperada
- Capítulos em `outputs/conteudo/fb2-capituloNN.md`
- PROGRESS.json + PROGRESS.md
- No fim: EPUB + PDF 6x9" + prompt de capa (capa NOVA, não herdada do L1)

## Metas travadas
- ~55 capítulos, POV dual Pedro (ímpar) / novo interesse romântico (par).
- Extensão: 950-1100 palavras/capítulo, MIRANDO O TOPO desde o cap. 1
  (lição direta do Livro 1, que só corrigiu isso parcialmente e tarde).
- Heat: ~10 cenas, explícito-elegante, gap máx. 6.
- Régua absoluta: só "nós", nunca "a gente".
- Piso de extensão como TRAVA DURA no `loop_state.py record`.

## Critério de parada
55 capítulos escritos, aprovados (régua limpa + score >= limiar ou
"aprovado com ressalva"), formatação final gerada. `loop_state.py
check` reportando cadência de extensão E heat dentro da meta antes de
encerrar.
