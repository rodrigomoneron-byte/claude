# TASK — A Casa de Vidro

## Objetivo
Produzir o romance "A Casa de Vidro" (pseudônimo R.B. Guidenelli), a
partir do briefing completo enviado pelo usuário
(`Briefing_Completo_A_Casa_de_Vidro.pdf`) — primeira incursão da casa
em Suspense Doméstico / Single Dad / Nanny Romance. Par: Clara Lopes
(babá) x Bernardo Siqueira (magnata recluso, pai solteiro). Livro
standalone (potencial de futura antologia "Segredos à Beira-Mar",
não trilogia fechada desde já).

## Saída esperada
- Capítulos em `outputs/conteudo/acv1-capituloNN.md` (NN com dois
  dígitos), POV dual Clara (ímpar) / Bernardo (par).
- SEM epílogo formal obrigatório (livro standalone).
- Ao final: revisão via bia-ferreira-editor-global, formatação via
  bia-ferreira-formatter (EPUB/PDF/capa).

## Metas travadas (ver references/project_dna.md para detalhe completo)
- POV dual Clara/Bernardo, alternado.
- ~55-58 capítulos, SEM epílogo obrigatório.
- 950-1100 palavras/capítulo, total ~55.000-58.000 palavras — MIRAR
  TOPO DA FAIXA DESDE O ATO 1 (não parar no primeiro número acima do
  piso técnico, mirar 1000-1050 depois de cada expansão).
- Heat: ~8-9 cenas, primeira cena ~cap. 20 (adiada por causa da
  barreira empregador/empregada + presença de uma criança na casa),
  gap máximo 6 depois disso.
- RÉGUA ABSOLUTA: só "nós", nunca "a gente" — vigilância máxima.
  ATENÇÃO: bug de whitelist conhecido no `regua_gate.py` (formas
  "gente da"/"gente daqui") — sempre rodar o gate consolidado em todos
  os capítulos juntos + grep manual direto como checagem final.
- Piso de extensão (`loop_state.py record`) como TRAVA DURA.
- LIMITE DE CONTEÚDO REFORÇADO (seção 2b do project_dna.md):
  - Mel (6 anos) NUNCA mostrada como alvo de violência física real —
    ameaça sempre risco evitado ou tensão psicológica, nunca gráfica.
  - Bernardo NUNCA usa a posição de empregador pra pressionar Clara
    romanticamente — avanço físico só depois de reformulação EXPLÍCITA
    da relação profissional.
  - Nenhum controle coercitivo entre Clara e Bernardo.
  - Consentimento explícito em toda cena de intimidade.
  - Mateus (stalker): sério, sem violência gráfica, resolvido via
    intervenção legal.
  - Vitória Andrade (antagonista): extorsão/manipulação, NUNCA
    violência física direta.
  - Trauma/mutismo de Mel: sensibilidade clínica real, recuperação
    gradual da fala, nunca virada mágica instantânea.
- Nenhum vazamento de nome/fato de OUTRA série da casa.

## Referências obrigatórias
- `references/arco-trama.md`
- `references/mundo-personagens.md`
- `references/project_dna.md`
- `references/branding-rbg.md`
