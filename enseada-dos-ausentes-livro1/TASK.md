# TASK — Enseada dos Ausentes (Segredos à Beira-Mar, Livro 2)

## Objetivo
Produzir o segundo livro standalone do selo "Segredos à Beira-Mar"
(pseudônimo R.B. Guidenelli), a partir da instrução do usuário
"seguir" após a entrega de "A Casa de Vidro". Par novo: Marina Castelo
(arquiteta, herda uma pousada) x Theo Aguiar (delegado local). Mistério
de décadas envolvendo mortes forjadas como acidentes, ligado a
especulação imobiliária numa vila de pescadores catarinense.

## Saída esperada
- Capítulos em `outputs/conteudo/eda1-capituloNN.md` (NN com dois
  dígitos), POV dual Marina (ímpar) / Theo (par).
- SEM epílogo formal (livro standalone).
- Ao final: revisão via bia-ferreira-editor-global, formatação via
  bia-ferreira-formatter (EPUB/PDF/capa).

## Metas travadas (ver references/project_dna.md para detalhe completo)
- POV dual Marina/Theo, alternado.
- ~55-58 capítulos, SEM epílogo.
- 950-1100 palavras/capítulo, total ~55.000-58.000 palavras — MIRAR
  TOPO DA FAIXA DESDE O ATO 1 (não parar no primeiro número acima do
  piso técnico, mirar 1000-1050 depois de cada expansão).
- Heat: ~8-9 cenas, primeira cena ~cap. 18-20, gap máximo 6 depois
  disso.
- RÉGUA ABSOLUTA: só "nós", nunca "a gente" — vigilância máxima.
  ATENÇÃO: bug de whitelist conhecido no `regua_gate.py` — sempre
  rodar o gate consolidado + grep manual direto como checagem final.
- Piso de extensão (`loop_state.py record`) como TRAVA DURA.
- LIMITE DE CONTEÚDO (seção 2b do project_dna.md): nenhuma violência
  física gráfica/direta consumada contra Marina ou Theo; nenhum
  controle coercitivo entre os dois; consentimento explícito; luto/
  trauma tratado com sensibilidade real; resolução final via sistema
  legal, não vingança unilateral.
- Nenhum vazamento de nome/fato de OUTRA série/livro da casa,
  incluindo A Casa de Vidro (Livro 1 do mesmo selo — elenco
  totalmente novo, sem crossover obrigatório).

## Referências obrigatórias
- `references/arco-trama.md`
- `references/mundo-personagens.md`
- `references/project_dna.md`
- `references/branding-rbg.md`
