# Jogo Infinito — Livro 5: O Jogo Final (encerramento da série)

## Objetivo
Produzir o romance final da série (58-60 capítulos + epílogo) no estilo
R.B. Guidenelli, resolvendo o gancho de Alexandra Voss Whitfield, o
casamento de Cami e Alex, e fechando todos os fios simbólicos
acumulados desde o Livro 1 — aplicando o orçamento de palavras por
estágio (correção de causa raiz da skill bia-ferreira-chapter-writer)
pra reduzir de vez a taxa de capítulos que precisam de expansão de
emergência.

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro5.md`
- Estado do mundo/canon: `references/mundo-personagens-livro5.md`
- DNA do projeto (régua, heat, formato, checkpoint): `references/project_dna.md`
- Marcas e voz: embutidas nas skills bia-ferreira-chapter-writer (com
  orçamento por estágio, atualizado) e bia-ferreira-voice-validator.

## Saída esperada
- Capítulos em `outputs/conteudo/jogo5-capituloNN.md`
- PROGRESS.json + PROGRESS.md (estado/placar, incluindo cadência de heat)
- No fim: EPUB + PDF 6x9" + prompt de capa (via bia-ferreira-formatter)

## Metas travadas
- 58-60 capítulos + epílogo, POV dual Cami (ímpar) / Alex (par), Dan
  nunca POV.
- Extensão: 950-1100 palavras/capítulo, total ~58.000-61.000 palavras.
- Heat: ~10-12 cenas, explícito-elegante, 1ª cena até cap. 6, gap máx.
  6 caps (relaxa no epílogo).
- Régua absoluta: só "nós", nunca "a gente" (narração ou diálogo).
- Piso de extensão por capítulo é TRAVA DURA no `loop_state.py record`.
- NOVO: orçamento de palavras por estágio ativo DURANTE a escrita
  (não só conferência no final) — ver project_dna.md seção 3.

## Critério de parada
O loop encerra quando todos os capítulos + epílogo forem escritos,
aprovados (régua limpa + score >= limiar ou "aprovado com ressalva") e
a formatação final for gerada. Antes de encerrar, `scripts/loop_state.py
check` deve reportar ritmo de extensão E de heat dentro da meta, E a
taxa de capítulos que precisaram de expansão de emergência deve ser
reportada explicitamente no relatório final — comparada com o L4
(7/20, 16/20, 17/20 por ato) como métrica de sucesso da correção de
processo.
