# Jogo Infinito — Livro 3: O Terceiro Player

## Objetivo
Produzir um romance completo de 60 capítulos no estilo R.B. Guidenelli
(ex-"Bia Ferreira"), mantendo fidelidade à bíblia e à régua de voz, e
corrigindo o padrão de reforço pós-produção dos livros anteriores via
checkpoint de cadência ativo desde o capítulo 1.

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro3.md`
- Estado do mundo/canon: `references/mundo-personagens-livro3.md`
- DNA do projeto (régua, heat, formato, checkpoint): `references/project_dna.md`
- Marcas e voz: embutidas nas skills bia-ferreira-chapter-writer e
  bia-ferreira-voice-validator.

## Saída esperada
- Capítulos em `outputs/conteudo/jogo3-capituloNN.md`
- PROGRESS.json + PROGRESS.md (estado/placar, incluindo cadência de heat)
- No fim: EPUB + PDF 6x9" + prompt de capa (via bia-ferreira-formatter)

## Metas travadas
- 60 capítulos, POV dual Cami (ímpar) / Alex (par), Dan nunca POV.
- Extensão: ~950-1100 palavras/capítulo, total ~60.000 palavras.
- Heat: 12 cenas, explícito-elegante, 1ª cena até cap. 6, gap máx. 6 caps.
- Régua absoluta: só "nós", nunca "a gente" (narração ou diálogo).

## Critério de parada
O loop encerra quando 60 capítulos forem escritos, aprovados (régua
limpa + score >= limiar ou "aprovado com ressalva") e a formatação final
for gerada. Antes de encerrar, `scripts/loop_state.py check` deve
reportar ritmo de extensão E de heat dentro da meta (sem avisos
pendentes não documentados como exceção legítima).
