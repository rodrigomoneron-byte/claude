# Família Bittencourt — Livro 1: Acordo de Vidro

## Objetivo
Produzir o primeiro romance de uma nova série (trilogia planejada) sob
o pseudônimo R.B. Guidenelli, baseado no briefing completo do usuário
— fake dating/marriage of convenience ambientado na alta sociedade
paulistana, mantendo a régua absoluta de voz da casa mas com
ambientação e registro 100% brasileiros pela primeira vez no catálogo.

## project_dna (o DNA)
- Bíblia de arco/trama: `references/arco-trama-livro1.md` (baseada no
  briefing_acordo_de_vidro.pdf fornecido pelo usuário)
- Estado do mundo/canon: `references/mundo-personagens-livro1.md`
- DNA do projeto (régua, heat, formato, checkpoint): `references/project_dna.md`
- Marcas e voz: 7 marcas ADAPTADAS pra esta série em project_dna.md
  seção 1 (mais leveza/humor que Jogo Infinito) + skills
  bia-ferreira-chapter-writer e bia-ferreira-voice-validator.

## Saída esperada
- Capítulos em `outputs/conteudo/adv-capituloNN.md`
- PROGRESS.json + PROGRESS.md (estado/placar, incluindo cadência de heat)
- No fim: EPUB + PDF 6x9" + prompt de capa (via bia-ferreira-formatter,
  capa adaptada ao tom deste livro específico)

## Metas travadas
- 55 capítulos, POV dual Isabela (ímpar) / Leo (par), primeira pessoa
  do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras.
- Heat: ~10 cenas, explícito-elegante, 1ª cena até cap. 10, gap máx. 6.
- Régua absoluta: só "nós", nunca "a gente" — MANTIDA mesmo com
  ambientação brasileira (atenção redobrada, ver project_dna.md seção 2).
- Brasileirismo GERAL permitido e esperado (diferente das séries
  anteriores da casa) — só a forma "a gente" continua banida.
- Piso de extensão por capítulo é TRAVA DURA no `loop_state.py record`.
- Processo de escrita em 2 chamadas com `wc -w` real no meio — resultado
  histórico misto (funciona parcialmente, não presumir 100% resolvido).

## Critério de parada
O loop encerra quando 55 capítulos forem escritos, aprovados (régua
limpa + score >= limiar ou "aprovado com ressalva") e a formatação
final for gerada. Antes de encerrar, `scripts/loop_state.py check`
deve reportar ritmo de extensão E de heat dentro da meta.
