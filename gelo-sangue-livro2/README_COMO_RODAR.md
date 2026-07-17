# Como rodar este livro — Casa R.B. Guidenelli

## O que já está pronto (não mexer)
As skills de escrita/validação/revisão/formatação já estão fixadas em
`.claude/skills/` na raiz deste repositório. Não precisam ser
reinstaladas nem copiadas para este projeto.

## Onboarding — status
Já concluído nesta sessão. Ver references/arco-trama-livro2.md, seção
"DECISÕES TRAVADAS NO ONBOARDING DO LIVRO 2", e a seção "PENDÊNCIA PARA
O DONO" no fim do mesmo arquivo (3 decisões propostas como default,
sinalizar se a escrita pedir ajuste).

## Rodar o loop
Cole este prompt no Claude Code, dentro da pasta deste projeto:

---
Leia TASK.md, LOOP_INSTRUCTIONS.md, PROGRESS.json e a pasta references/
deste projeto (sobretudo arco-trama-livro2.md e project_dna.md). As
skills da casa (bia-ferreira-*) já estão disponíveis na raiz do
repositório.

Rode o loop conforme LOOP_INSTRUCTIONS.md — capítulo a capítulo, sem me
consultar entre capítulos, validando cada um com scripts/regua_gate.py
(+ grep manual) antes de registrar com scripts/loop_state.py. Só me
chame em bloqueio estrutural real ou nos marcos definidos.
---

## Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados (importam sempre)
1. **Régua**: "a gente" é o vazamento nº 1. O gate mecânico
   (`regua_gate.py`) tem bug conhecido de whitelist por substring —
   sempre complementar com `grep -n "a gente" <arquivo>` manual antes
   de considerar um capítulo limpo. O device (personagem se
   autocorrigindo, ou a narração comentando que "não corrigiu" a fala
   de alguém) é proibido e deve ser removido inteiro.
2. **Heat**: monitorar a cada capítulo. Ato 1 não tem cena por desenho
   (separação real) — não forçar. A partir do reencontro (~cap 21-26),
   se a meta não vai bater por causa da estrutura da trama, reportar ao
   dono em vez de forçar cena gratuita.
3. **Continuidade com o L1**: checar references/canon-livro2.md antes
   de escrever qualquer cena que mencione fatos/personagens do Livro 1
   — nunca contradizer o que já está registrado em
   `../gelo-sangue-livro1/references/canon-gelo-livro1.md` ou nos
   capítulos publicados do L1.
4. **Isolamento de universo**: nunca puxar nome de personagem, símbolo
   ou fato de outro livro da casa (ex.: L3 "A Rede"). Tudo vem do
   project_dna.md e da bíblia DESTE projeto (mais o L1 para
   continuidade factual).
5. **Escopo**: deriva de escopo (clímax cedo demais, resultado do jogo
   de acesso, encurtar/esticar atos) = parar e reportar, nunca decidir
   sozinho.
6. **ISBN**: os metadados saem com placeholder `urn:uuid` — trocar pelo
   ISBN real antes de publicar.
