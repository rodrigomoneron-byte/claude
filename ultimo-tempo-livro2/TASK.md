# TASK — Fora de Jogo (Estrelas do Gramado, Livro 2)

## Objetivo
Produzir o segundo livro da trilogia "Estrelas do Gramado" (pseudônimo
R.B. Guidenelli), a partir dos ganchos plantados no Livro 1 e da
tabela de expansão do briefing original. Par: Marcos "Marcão" Silveira
(capitão do São Paulo Metropolitano) x Beatriz "Bia" Lima (atacante da
seleção feminina). Fake dating + Grumpy x Sunshine.

## Saída esperada
- Capítulos em `outputs/conteudo/ut2-capituloNN.md` (NN com dois
  dígitos), POV dual Bia (ímpar) / Marcos (par).
- SEM epílogo formal — livro do meio de trilogia em andamento, fecha
  com gancho claro pro Livro 3 (Léo).
- Ao final: revisão via bia-ferreira-editor-global, formatação via
  bia-ferreira-formatter (EPUB/PDF/capa).

## Metas travadas (ver references/project_dna.md para detalhe completo)
- POV dual Bia/Marcos, alternado.
- ~55-58 capítulos numerados, SEM epílogo.
- 950-1100 palavras/capítulo, total ~55.000-58.000 palavras — MIRAR
  TOPO DA FAIXA DESDE O ATO 1.
- Heat: ~8-9 cenas, primeira cena ~cap. 15 (mais cedo que o Livro 1,
  coerente com o trope de fake dating), gap máximo 6 depois disso.
- RÉGUA ABSOLUTA: só "nós", nunca "a gente" — vigilância máxima.
  ATENÇÃO: bug de whitelist conhecido no `regua_gate.py` individual
  (formas "gente da"/"gente daqui") — rodar sempre o gate consolidado
  em todos os capítulos juntos como checagem final, não confiar só no
  gate por capítulo.
- Piso de extensão (`loop_state.py record`) como TRAVA DURA.
- LIMITE DE CONTEÚDO (seção 2b do project_dna.md): nenhuma violência
  física; nem Marcos nem Bia exercem controle coercitivo um sobre o
  outro (inclusive dentro do próprio fake dating); consentimento
  explícito em toda cena de intimidade; plausibilidade de marketing
  esportivo e endividamento informal (agiotagem como pressão
  psicológica/social, não ameaça física direta).
- Nenhum vazamento de nome/fato de OUTRA série da casa.
- Consistência obrigatória com os ganchos do Livro 1 (cap. 33):
  interesse de Marcão por Bia já plantado, pressão da comissão técnica
  sobre Bia já plantada.
- Thiago e Júlia (Livro 1) aparecem como apoio orgânico, sem ofuscar
  o casal principal.
- Gancho pro Livro 3 (Léo) deve fechar o livro organicamente.

## Referências obrigatórias
- `references/arco-trama.md`
- `references/mundo-personagens.md`
- `references/project_dna.md`
- `references/branding-rbg.md`
- `/home/user/claude/ultimo-tempo-livro1/outputs/conteudo/ut1-capitulo33.md`
  e capítulos finais do Livro 1 (56-57) para continuidade exata dos
  ganchos e do universo compartilhado.
