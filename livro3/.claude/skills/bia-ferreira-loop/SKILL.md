---
name: bia-ferreira-loop
description: Orquestra a produção autônoma, capítulo a capítulo, de um livro da Bia Ferreira (série A Mão na Alavanca), encadeando as skills reais do projeto — bia-ferreira-chapter-writer (escrever), bia-ferreira-voice-validator + trava mecânica de régua (validar), auto-revisão (corrigir) e, no fim, bia-ferreira-editor-global (revisão global) e bia-ferreira-formatter (EPUB/PDF/capa). Mantém estado em JSON (PROGRESS.json) + placar legível. USE SEMPRE que o usuário pedir para "rodar o loop", "escrever os capítulos X a Y", "produzir o livro em sequência", "tocar a fábrica" ou similar. Roda em sequência, SEM checkpoint humano entre capítulos; para só no critério de parada ou num bloqueio que não consegue resolver sozinho.
---

# Bia Ferreira — Loop de Produção Autônomo

Orquestrador enxuto do framework de 4 arquivos (TASK / LOOP_INSTRUCTIONS /
PROGRESS / project_dna), ligado às skills REAIS da Bia Ferreira. Substitui as
skills genéricas: em vez de operárias-placeholder, cada passo chama a skill
específica testada do projeto, e a régua "a gente" é uma **trava dura
mecânica**, não uma esperança.

## Princípio de autonomia

Roda **capítulo a capítulo, em sequência, sem intervenção humana** entre
capítulos. Os filtros (régua + validator + auto-revisão) corrigem a maioria
dos problemas na hora; o refinamento fino fica para o final. NÃO pare para
pedir aprovação a cada capítulo — apresente o capítulo e **continue
automaticamente** para o próximo. Só pare no critério de parada
(TASK.md) ou num bloqueio estrutural que a auto-revisão não resolve.

## Arquivos de controle (o "DNA")

- **TASK.md** — objetivo, nº de capítulos-alvo, critério de parada, saídas.
- **LOOP_INSTRUCTIONS.md** — passos por iteração, limiar de aprovação,
  política de falha, tamanho do lote.
- **PROGRESS.json** — estado da máquina (fonte de verdade; robusto, sem
  regex-em-Markdown). `scripts/loop_state.py` lê/atualiza. Um PROGRESS.md
  legível é gerado a partir dele.
- **project_dna** — para a Bia Ferreira, é a **bíblia do livro**
  (`bia-ferreira-arco-trama-livroN.md`) + as marcas embutidas nas skills
  chapter-writer/voice-validator. Não duplicar aqui; referenciar.

Templates prontos em `references/control-files.md`.

## Fluxo por iteração (1 capítulo)

Para cada capítulo N (POV vindo de PROGRESS.json, alternando):

1. **ESCREVER** — invoque **bia-ferreira-chapter-writer**: capítulo N, POV
   correto, seguindo a bíblia + contexto do(s) capítulo(s) anterior(es),
   ~1.100–1.300 palavras, fechando em gesto (marca 7).
2. **TRAVA DE RÉGUA (dura, mecânica)** — rode
   `scripts/regua_gate.py <arquivo>`. Se houver qualquer "a gente" (fora dos
   falsos positivos) OU o device proibido (personagem corrigindo "a gente" /
   citando "a régua"), **corrija na hora** (reescreva as linhas) e rode de
   novo até dar LIMPO. NUNCA avance com hit. Esta trava é inegociável.
3. **VALIDAR (subjetivo)** — invoque **bia-ferreira-voice-validator**: score
   das 7 marcas + relatório de desvios.
4. **POLÍTICA DE FALHA** — se score < limiar (padrão 5,5/7): auto-revise os
   pontos apontados (reescreva no lugar via chapter-writer), volte ao passo 2
   (régua) e 3 (validar). Até `max_revisoes` tentativas (padrão 2). Se ainda
   abaixo depois disso E não for quebra estrutural: marque
   "aprovado com ressalva", registre para o refinamento final e **CONTINUE**
   (não trave o livro por um desvio fino). Quebra estrutural real (POV
   errado, tempo verbal, contradição de trama) → registre BLOQUEIO e pare.
5. **ATUALIZAR ESTADO** — `scripts/loop_state.py record ...`: registra
   capítulo (n, pov, palavras, score, status), atualiza placar (total de
   palavras, ~págs KDP = palavras/300, média de score, capítulos feitos) e
   define próximo capítulo + POV.
6. **APRESENTAR + CONTINUAR** — `present_files` do capítulo + 1 linha de
   placar, e **siga imediatamente para o próximo capítulo**, sem pedir
   aprovação. Respeite `tamanho_do_lote` do LOOP_INSTRUCTIONS (ex.: quantos
   capítulos por turno antes de continuar no turno seguinte — também sem pedir
   aprovação; o usuário pode interromper quando quiser).

## Ao atingir o critério de parada (todos os N capítulos)

7. **REVISÃO GLOBAL** — invoque **bia-ferreira-editor-global** no manuscrito
   completo. Registre ajustes recomendados para o refinamento final do
   usuário (não bloqueiam).
8. **FORMATAÇÃO** — invoque **bia-ferreira-formatter**: EPUB + PDF 6×9" +
   prompt de capa + metadados.
9. **RELATÓRIO FINAL** — placar final + lista de capítulos "com ressalva" e
   ajustes recomendados para o usuário refinar.

## Melhorias sobre o framework genérico (já embutidas)

- Operárias REAIS (skills da Bia Ferreira), não placeholders.
- Régua "a gente" como trava mecânica dura (o defeito recorrente do projeto),
  antes da validação subjetiva.
- Estado em **JSON** (corrige o bug do orquestrador genérico, que lia num
  formato e escrevia noutro; e não quebra com edição manual).
- Sem caminhos hardcoded — o project_path é argumento.
- Autonomia real: continua sozinho, corrige sozinho, só para no fim ou em
  bloqueio duro.

## Regras que o loop nunca viola

- NUNCA avançar com "a gente" na página ou com o device da régua.
- NUNCA usar o generic-validator (ele não conhece as marcas/POV/heat).
- NUNCA deixar Sloane/Auden resolverem o clímax de um livro que não é o deles
  (coerência de série).
- NUNCA pedir aprovação capítulo a capítulo (o usuário pediu autonomia); o
  refinamento é no final.
