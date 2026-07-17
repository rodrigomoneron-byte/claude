# Como rodar este livro — Casa R.B. Guidenelli

## O que já está pronto (não mexer)
As skills de escrita/validação/revisão/formatação já estão fixadas em
`.claude/skills/` na raiz deste repositório. Não precisam ser
reinstaladas nem copiadas para este projeto.

## Onboarding — status
Já concluído nesta sessão. Ver references/arco-trama-livro3.md, seção
"DECISÕES TRAVADAS NO ONBOARDING DO LIVRO 3", e a seção "PENDÊNCIA PARA
O DONO" logo abaixo dela (3 decisões propostas como default, sinalizar
se a escrita pedir ajuste).

## Rodar o loop
Cole este prompt no Claude Code, dentro da pasta deste projeto:

---
Leia TASK.md, LOOP_INSTRUCTIONS.md, PROGRESS.json e a pasta references/
deste projeto (sobretudo arco-trama-livro3.md e project_dna.md). As
skills da casa (bia-ferreira-*) já estão disponíveis na raiz do
repositório.

Rode o loop conforme LOOP_INSTRUCTIONS.md — capítulo a capítulo, sem me
consultar entre capítulos, validando cada um com scripts/regua_gate.py
(+ grep manual + regex normalizado) e conferindo a extensão (wc -w,
mínimo ~900 palavras) antes de registrar com scripts/loop_state.py. Só
me chame em bloqueio estrutural real ou nos marcos definidos.
---

## Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados (importam sempre)
1. **Régua**: "a gente" é o vazamento nº 1 — inclusive em fala de
   personagem secundário "coloquial" (pai, treinador, amigo), que foi
   o erro mais recorrente no L2. O gate mecânico (`regua_gate.py`) tem
   bug conhecido de whitelist por substring — sempre complementar com
   `grep -n "a gente" <arquivo>` manual E com a varredura regex de
   texto normalizado antes de considerar um capítulo limpo. O device
   (personagem se autocorrigindo, ou a narração comentando que "não
   corrigiu" a fala de alguém) é proibido e deve ser removido inteiro.
2. **Extensão — lição crítica do L2**: o manuscrito anterior foi
   entregue com 43.621 palavras (meta 57-66k) e precisou de uma
   passada inteira de reforço depois de o dono rejeitar a entrega.
   Neste projeto, nenhum capítulo deve ser registrado abaixo de ~900
   palavras — expandir antes de seguir, nunca "deixar pra depois".
3. **Heat**: monitorar a cada capítulo contra o heat_log em
   PROGRESS.json. Meta ~12 cenas, gap máximo 5-6 capítulos depois da
   primeira (que pode acontecer já no cap. 1-5, casal já mora junto).
4. **Continuidade com L1/L2**: checar references/canon-livro3.md antes
   de escrever qualquer cena que mencione fatos/personagens dos Livros
   1 e 2 — nunca contradizer o que já está publicado.
5. **Isolamento de universo**: nunca puxar nome de personagem, símbolo
   ou fato de outro livro da casa (ex.: pasta `livro3/` na raiz do
   repo é "A Mão na Alavanca" — projeto totalmente diferente, sem
   relação nenhuma com esta trilogia, apesar do nome de pasta parecido).
6. **Escopo**: deriva de escopo (clímax cedo demais, resultado da
   final de acesso, encurtar/esticar atos) = parar e reportar, nunca
   decidir sozinho.
7. **ISBN**: os metadados saem com placeholder `urn:uuid` — trocar pelo
   ISBN real antes de publicar.
