---
name: bia-ferreira-loop
description: Orquestra a produção autônoma, capítulo a capítulo, de um livro da casa R.B. Guidenelli (ex-"Bia Ferreira") — qualquer série do catálogo —, encadeando as skills reais do projeto — bia-ferreira-chapter-writer (escrever), bia-ferreira-voice-validator + trava mecânica de régua (validar), auto-revisão (corrigir) e, no fim, bia-ferreira-editor-global (revisão global) e bia-ferreira-formatter (EPUB/PDF/capa). Mantém estado em JSON (PROGRESS.json) + placar legível. USE SEMPRE que o usuário pedir para "rodar o loop", "escrever os capítulos X a Y", "produzir o livro em sequência", "tocar a fábrica" ou similar. Roda em sequência, SEM checkpoint humano entre capítulos; para só no critério de parada ou num bloqueio que não consegue resolver sozinho.
---

# R.B. Guidenelli (ex-"Bia Ferreira") — Loop de Produção Autônomo

Orquestrador enxuto do framework de 4 arquivos (TASK / LOOP_INSTRUCTIONS /
PROGRESS / project_dna), ligado às skills REAIS da casa. Substitui as
skills genéricas: em vez de operárias-placeholder, cada passo chama a skill
específica testada do projeto, e a régua "a gente" é uma **trava dura
mecânica**, não uma esperança. Funciona para QUALQUER livro/série da casa —
os detalhes concretos (elenco, extensão-alvo, cadência de heat) vêm sempre
do project_dna.md/bíblia do projeto ATUAL sendo executado, nunca de um
projeto anterior.

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
   correto, seguindo a bíblia + contexto do(s) capítulo(s) anterior(es), na
   extensão travada no project_dna.md DESTE projeto (varia por livro — não
   presuma um número fixo herdado de outro projeto), fechando em gesto
   (marca 7).
2. **TRAVA DE RÉGUA (dura, mecânica)** — rode
   `scripts/regua_gate.py <arquivo>`. Se houver qualquer "a gente" (fora dos
   falsos positivos) OU o device proibido (personagem corrigindo "a gente" /
   citando "a régua"), **corrija na hora** (reescreva as linhas) e rode de
   novo até dar LIMPO. NUNCA avance com hit. Esta trava é inegociável.
   **Atenção:** o gate pode ter bug de whitelist por substring (uma frase
   whitelisted perto de um "a gente" real mascara o hit) — complemente
   sempre com `grep -n "a gente" <arquivo>` manual antes de considerar
   limpo de verdade.
3. **VALIDAR (subjetivo)** — invoque **bia-ferreira-voice-validator**: score
   das 7 marcas + relatório de desvios.
4. **POLÍTICA DE FALHA** — se score < limiar (padrão 5,5/7): auto-revise os
   pontos apontados (reescreva no lugar via chapter-writer), volte ao passo 2
   (régua) e 3 (validar). Até `max_revisoes` tentativas (padrão 2). Se ainda
   abaixo depois disso E não for quebra estrutural: marque
   "aprovado com ressalva", registre para o refinamento final e **CONTINUE**
   (não trave o livro por um desvio fino). Quebra estrutural real (POV
   errado, tempo verbal, contradição de trama) → registre BLOQUEIO e pare.
5. **ATUALIZAR ESTADO** — `scripts/loop_state.py record ... [--heat yes|no]`:
   registra capítulo (n, pov, palavras, score, status, **se o capítulo
   contém cena de heat**), atualiza placar (total de palavras, ~págs KDP =
   palavras/300, média de score, capítulos feitos, cenas de heat feitas) e
   define próximo capítulo + POV. **Sempre passe `--heat yes` quando o
   capítulo tiver cena** — sem isso o checkpoint do passo 5b fica cego.
5b. **CHECKPOINT DE CADÊNCIA (trava dura, mecânica) — NÃO pular.**
   `record` já roda esse checkpoint automaticamente e imprime avisos. Leia
   a saída. Se aparecer `⚠️ CHECKPOINT DE CADÊNCIA`, isso é bloqueante pro
   PRÓXIMO capítulo, do mesmo jeito que a régua é bloqueante pro capítulo
   atual:
   - **Atraso de extensão** → o(s) próximo(s) capítulo(s) precisam sair
     MAIORES que o normal (o próprio aviso já calcula a média necessária).
     NÃO adie isso pra um "passe de reforço" no final — esse é exatamente
     o padrão que já se repetiu em todo livro anterior do catálogo e que
     esse checkpoint existe pra quebrar.
   - **Atraso de cadência de heat / gap excedido / primeira cena atrasada**
     → avalie ativamente, capítulo a capítulo a partir daqui, se o próximo
     beat da trama comporta uma cena. Se comportar, planeje ela nos
     próximos 1-3 capítulos. Se genuinamente não comportar (ex.: capítulo
     de clímax, ruptura ativa — respeitando "nunca gratuito"), registre
     isso como decisão consciente (ex.: `--ressalva "heat adiado: cap. em
     confronto direto, sem espaço pra cena"` no record), não como omissão
     silenciosa. O aviso reaparece a cada capítulo até ser resolvido —
     ele não some sozinho.
   Rode `scripts/loop_state.py check <proj>` a qualquer momento pra
   reconferir sem registrar capítulo novo (ex.: no meio de uma sessão longa).
6. **APRESENTAR + CONTINUAR** — `present_files` do capítulo + 1 linha de
   placar (incluindo o resultado do checkpoint de cadência), e **siga
   imediatamente para o próximo capítulo**, sem pedir aprovação. Respeite
   `tamanho_do_lote` do LOOP_INSTRUCTIONS (ex.: quantos capítulos por turno
   antes de continuar no turno seguinte — também sem pedir aprovação; o
   usuário pode interromper quando quiser).

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
- NUNCA deixar o checkpoint de cadência (passo 5b) acumular aviso sobre
  aviso sem agir — extensão e heat são travas tão obrigatórias quanto a
  régua, só que verificadas a cada capítulo em vez de dentro de um único
  capítulo. Descobrir no editor-global, no fim do livro, que faltam 40%
  das cenas de heat ou 8.000 palavras é o próprio bug que este checkpoint
  existe pra eliminar — se isso ainda acontecer, o checkpoint não foi
  rodado ou foi ignorado.
- NUNCA usar o generic-validator (ele não conhece as marcas/POV/heat).
- NUNCA usar nomes de personagens, símbolos ou fatos de mundo de outro
  livro/série da casa no projeto atual — cada série tem seu próprio
  elenco e sua própria bíblia.
- NUNCA deixar o elenco de UM livro resolver o clímax de OUTRO livro que
  não é o dele (coerência de série — vale mesmo entre livros da mesma
  série, e com mais razão entre séries diferentes).
- NUNCA pedir aprovação capítulo a capítulo (o usuário pediu autonomia); o
  refinamento é no final.
- NUNCA presumir a extensão-alvo, a cadência de heat ou a lista de 7
  marcas de outro projeto — sempre confirmar contra o project_dna.md do
  projeto atual antes de escrever o primeiro capítulo.
