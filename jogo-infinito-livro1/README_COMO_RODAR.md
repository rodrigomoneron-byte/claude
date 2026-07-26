# Como rodar este livro — Casa R.B. Guidenelli

## O que já está pronto
As skills de escrita/validação/revisão/formatação já estão fixadas em
`.claude/skills/` na raiz deste repositório. `bia-ferreira-editor-
global` e `bia-ferreira-formatter` são genéricas (funcionam pra
qualquer livro da casa). `bia-ferreira-chapter-writer` e
`bia-ferreira-voice-validator` trazem exemplos hardcoded do primeiro
livro da casa (Sloane/Auden) — usar só a estrutura (7 marcas, mapa de
extensão, régua absoluta), nunca o elenco/mundo daquele livro. A voz e
o elenco reais deste projeto vêm de `references/project_dna.md` e
`references/arco-trama-livro1.md`.

## Onboarding (concluído em 2026-07-26)
Decisões travadas via conversa + AskUserQuestion, a partir do PDF
"Planejamento da Série de Livros: Romance/Thriller Corporativo"
enviado pelo dono do projeto:
- Núcleo romântico: triângulo (Cami dividida entre Alex e Dan),
  endgame Cami/Alex.
- POV dual: Cami (ímpar) + Alex (par); Dan nunca tem POV.
- Série de 5 livros, arco completo planejado desde já.
- Heat explícito-elegante, cadência 80/20 (~12 cenas).
- Elenco central: Camila "Cami" Miller, Alexander "Alex" Voss
  (sobrenome "Stone" evitado a pedido do dono), Daniel "Dan" Carter.

Ver `PROGRESS.json` → `"decisoes_travadas"` e
`references/arco-trama-livro1.md` para o detalhamento completo.

## Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo (`jogo1-capituloNN.md`)
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados (importam sempre)
1. **Régua**: "a gente" é o vazamento nº 1. O gate mecânico
   (`regua_gate.py`) tem bug conhecido de whitelist por substring —
   sempre complementar com `grep -n "a gente" <arquivo>` manual antes
   de considerar um capítulo limpo.
2. **Heat**: monitorar a cada capítulo, não só nos marcos de ato.
3. **Isolamento de universo**: nunca puxar nome de personagem, símbolo
   ou fato de Gelo e Sangue nem de "A Mão na Alavanca" (Sloane/Auden).
4. **Escopo**: este é o Livro 1 de 5 — o triângulo e a investigação
   NÃO se resolvem neste volume. Fecha em gancho pro Livro 2, sem
   epílogo (reservado ao Livro 5).
5. **ISBN**: os metadados saem com placeholder `urn:uuid` — trocar
   pelo ISBN real antes de publicar.
