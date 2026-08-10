# TASK — Pênalti de Ouro (Estrelas do Gramado, Livro 3 — FECHAMENTO DA TRILOGIA)

## Objetivo
Produzir o terceiro e ÚLTIMO livro da série "Estrelas do Gramado"
(pseudônimo R.B. Guidenelli), a partir da instrução do usuário "vamos
para o livro 2 e depois o 3 para fechar a trilogia" e do gancho
plantado no Livro 2 (Léo Andrade x Renata Duprat). Forbidden Romance
(rivalidade de clube + conflito de interesse profissional real) + Age
Gap leve, com cameo cruzado autorizado de Thiago/Júlia (L1) e
Marcos/Bia (L2) e epílogo obrigatório fechando a trilogia.

## Saída esperada
- Capítulos em `outputs/conteudo/ut3-capituloNN.md` (NN com dois
  dígitos), POV dual Renata (ímpar) / Léo (par).
- Epílogo em `outputs/conteudo/ut3-epilogo01.md` (e -02, -03 se
  dividido em mais capítulos), marcado "# Epílogo" (não
  "# Capítulo N").
- Ao final: revisão via bia-ferreira-editor-global, formatação via
  bia-ferreira-formatter (EPUB/PDF/capa), relatório final com resumo
  da TRILOGIA INTEIRA (3 livros, palavras de cada um, total combinado).

## Metas travadas (ver references/project_dna.md para detalhe completo)
- POV dual Renata/Léo, alternado.
- ~55-58 capítulos numerados + EPÍLOGO (2-3 capítulos adicionais).
- 950-1100 palavras/capítulo, total ~55.000-58.000 palavras (capítulos
  numerados) + epílogo à parte — MIRAR TOPO DA FAIXA DESDE O ATO 1.
- Heat: ~8-9 cenas, primeira cena ~cap. 18-20, gap máximo 6 depois
  disso, mirando o TOPO da meta (9).
- RÉGUA ABSOLUTA: só "nós", nunca "a gente" — vigilância máxima.
  ATENÇÃO: bug de whitelist conhecido no `regua_gate.py` (formas
  "gente da"/"gente daqui") — sempre rodar o gate consolidado em todos
  os capítulos juntos + grep manual direto como checagem final.
- Piso de extensão (`loop_state.py record`) como TRAVA DURA.
- LIMITE DE CONTEÚDO (seção 2b do project_dna.md): nenhuma violência
  física; nem Léo nem Renata exercem controle coercitivo um sobre o
  outro; consentimento explícito; plausibilidade de análise de
  desempenho esportivo e compliance de clube; age gap tratado com
  cuidado (ambos adultos plenos, sem dinâmica de poder profissional
  direta entre os dois); cameo fiel de Thiago/Júlia/Marcos/Bia sem
  reabrir arcos próprios; antagonistas (Marisa Aquino, Breno Falcão)
  tratados como pressão institucional/midiática, nunca física.
- Nenhum vazamento de nome/fato de OUTRA série da casa.
- Cameo CONFIRMADO e não-opcional de Thiago/Júlia e Marcos/Bia na
  segunda metade do livro + epílogo.

## Referências obrigatórias
- `references/arco-trama.md`
- `references/mundo-personagens.md`
- `references/project_dna.md`
- `references/branding-rbg.md`
- Releitura cruzada dos "Log de decisões de escrita" de
  `ultimo-tempo-livro1/references/mundo-personagens.md` e
  `ultimo-tempo-livro2/references/mundo-personagens.md` antes de
  qualquer capítulo que traga os casais em cameo, pra caracterização
  fiel.
