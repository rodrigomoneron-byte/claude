# Como rodar este livro — Casa R.B. Guidenelli

## O que já está pronto
As skills de escrita/validação/revisão/formatação já estão fixadas em
`.claude/skills/` na raiz deste repositório. `bia-ferreira-editor-
global` e `bia-ferreira-formatter` são genéricas. `bia-ferreira-
chapter-writer` e `bia-ferreira-voice-validator` trazem exemplos
hardcoded do primeiro livro da casa (Sloane/Auden) — usar só a
estrutura (7 marcas, mapa de extensão, régua absoluta), nunca o
elenco/mundo daquele livro. A voz e o elenco reais deste projeto vêm
de `references/project_dna.md` e `references/arco-trama-livro2.md`.

## Onboarding (concluído em 2026-07-27)
Decisões de nível-série herdadas do Livro 1 sem retravamento (POV
dual, heat, régua, extensão, elenco central). Decisões novas deste
volume, travadas via AskUserQuestion:
- Alexandra Voss Whitfield: antagonista disfarçada de aliada.
- Traição interna: sim (Patricia, por convicção, não ganância).
- Salto de tempo: poucas semanas desde o fim do Livro 1.

Ver `PROGRESS.json` → `"decisoes_travadas"` e
`references/arco-trama-livro2.md` para o detalhamento completo.

## Acompanhar
- `cat PROGRESS.md` → placar legível a qualquer momento
- `outputs/conteudo/` → capítulos saindo (`jogo2-capituloNN.md`)
- `outputs/final/` → EPUB + PDF + capa + metadados no fim

## Avisos herdados (importam sempre)
1. **Régua**: "a gente" é o vazamento nº 1. Sempre complementar o gate
   mecânico com `grep -n "a gente" <arquivo>` manual.
2. **Extensão**: LIÇÃO DO LIVRO 1 — escrever cada capítulo já em
   ~950-1100 palavras na primeira versão. O Livro 1 fechou 50.813
   palavras nos 60 capítulos originais e precisou de um passe de
   reforço pós-produção pra chegar a 58.013. Medir `wc -w` a cada
   capítulo e expandir NA HORA se estiver abaixo do piso.
3. **Heat**: cadência 80/20 (~12 cenas), gap máximo 5-6 capítulos —
   monitorar a cada capítulo, não só nos marcos de ato. O Livro 1
   excedeu o gap máximo duas vezes por não vigiar de perto o
   suficiente.
4. **Isolamento de universo**: nunca puxar nome de personagem, símbolo
   ou fato de Gelo e Sangue nem de "A Mão na Alavanca" (Sloane/Auden).
5. **Continuidade com o Livro 1**: nunca contradizer fatos canônicos
   herdados (ver references/mundo-personagens-livro2.md, seção "Fatos
   herdados do Livro 1").
6. **Escopo**: este é o Livro 2 de 5 — fecha em gancho pro Livro 3
   ("O Terceiro Player"), sem epílogo (reservado ao Livro 5).
7. **ISBN**: os metadados saem com placeholder `urn:uuid` — trocar
   pelo ISBN real antes de publicar.
