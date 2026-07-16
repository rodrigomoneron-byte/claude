# Como rodar um livro novo — Casa R.B. Guidenelli

## O que já está pronto (não mexer)
As skills de escrita/validação/revisão/formatação já estão fixadas em
`.claude/skills/` na raiz deste repositório. Não precisam ser
reinstaladas nem copiadas para este projeto.

## Passo 1 — Preparar este projeto
1. Copie esta pasta inteira (`TEMPLATE_NOVO_LIVRO/`) para um nome novo
   na raiz do repo, ex.: `livro4/`.
2. Preencha os placeholders em:
   - `TASK.md`
   - `LOOP_INSTRUCTIONS.md` (só os nomes de arquivo, o resto é padrão)
   - `PROGRESS.json` (título, autor confirmado, alvo de capítulos/
     palavras, nomes dos POVs)
   - `references/project_dna.md` (marcas, régua, heat, formato)
   - `references/arco-trama-livroN.md` (a bíblia real deste livro —
     casal, antagonista, atos, decisões a travar)
   - `references/mundo-personagens.md` (elenco e regras fixas)

## Passo 2 — Onboarding
Cole este prompt no Claude Code, dentro da pasta do projeto novo:

---
Leia TASK.md, LOOP_INSTRUCTIONS.md, PROGRESS.json e a pasta references/
deste projeto (sobretudo arco-trama-livroN.md e project_dna.md). As
skills da casa (bia-ferreira-*) já estão disponíveis na raiz do
repositório.

PRIMEIRO: rode o ONBOARDING — me apresente as "DECISÕES A TRAVAR" da
bíblia, uma a uma, e grave minhas respostas em PROGRESS.json
("decisoes_travadas"). NÃO escreva nenhum capítulo antes disso.

DEPOIS: rode o loop conforme LOOP_INSTRUCTIONS.md — capítulo a
capítulo, sem me consultar entre capítulos, validando cada um com
scripts/regua_gate.py (+ grep manual) antes de registrar com
scripts/loop_state.py. Só me chame em bloqueio estrutural real ou nos
marcos definidos.
---

## Passo 3 — Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados (importam sempre)
1. **Régua**: "a gente" é o vazamento nº 1. O gate mecânico
   (`regua_gate.py`) tem bug conhecido de whitelist por substring —
   sempre complementar com `grep -n "a gente" <arquivo>` manual antes
   de considerar um capítulo limpo. O device (personagem se
   autocorrigindo, ou a narração comentando que "não corrigiu" a fala
   de alguém) é proibido e deve ser removido inteiro, não só reescrito
   com outra palavra.
2. **Heat**: monitorar a cada capítulo, não só nos marcos de ato. Se a
   meta não vai bater por causa da estrutura da trama (ex.: um ato
   inteiro de ruptura sem espaço para cena), reportar ao dono em vez de
   forçar cena gratuita.
3. **Isolamento de universo**: nunca puxar nome de personagem, símbolo
   ou fato de outro livro da casa. Tudo vem do project_dna.md e da
   bíblia DESTE projeto.
4. **Escopo**: deriva de escopo (clímax cedo demais, encurtar/esticar
   atos) = parar e reportar, nunca decidir sozinho.
5. **ISBN**: os metadados saem com placeholder `urn:uuid` — trocar pelo
   ISBN real antes de publicar.
