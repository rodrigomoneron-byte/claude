# Instruções de Loop — Jogo Infinito, Livro 2 (Claude Code)

## Setup (uma vez)
1. As skills da casa já estão fixadas em `.claude/skills/` na raiz do
   repositório — nada a instalar.
2. `pip install ebooklib markdown reportlab --break-system-packages -q`
   (necessário só na fase de formatação).
3. Onboarding já concluído — ver TASK.md e PROGRESS.json.

## Ações Obrigatórias por Iteração (1 capítulo)
1. **Ler o estado**: `python3 scripts/loop_state.py next .` (ou ler
   PROGRESS.json) → próximo N e POV (Cami ímpar / Alex par).
2. **Escrever** (7 marcas + régua de references/project_dna.md deste
   projeto + bíblia references/arco-trama-livro2.md + fatos herdados
   de references/mundo-personagens-livro2.md): capítulo N, POV
   correto, ~950-1100 palavras JÁ na primeira versão (lição do Livro 1
   — não deixar para reforçar depois), abrindo forte e fechando
   virando o chão (marca 7). ANTES de salvar, varrer mentalmente cada
   diálogo procurando "a gente". Checar cadência de heat (gap máximo
   5-6 capítulos — vigiar ativamente, o Livro 1 excedeu esse máximo
   duas vezes).
3. **Validar régua (trava dura)**:
   `python3 scripts/regua_gate.py outputs/conteudo/jogo2-capituloNN.md`
   - HIT → corrigir (reescrever a fala/trecho limpo; se for o device,
     remover o device INTEIRO) → revalidar até LIMPO.
   - **Sempre complementar com `grep -n "a gente" <arquivo>` manual.**
4. **Validar marcas** (usando a lista de 7 marcas do project_dna.md
   deste projeto, aplicada manualmente — não usar
   bia-ferreira-voice-validator literalmente, ela traz exemplo
   hardcoded de outro livro). Abaixo do limiar (~78%) → revisar e
   revalidar.
5. **Validar extensão imediatamente**: `wc -w
   outputs/conteudo/jogo2-capituloNN.md` — se abaixo de ~950, expandir
   AGORA (não deixar para depois).
6. **Registrar**:
   `python3 scripts/loop_state.py record . --n N --pov POV --words W --score S --status aprovado`
7. **Repetir** imediatamente (sem parar, sem perguntar) até o critério
   de parada ou bloqueio real.

## Marcos automáticos (sem consultar o dono)
- Fim de cada ato (cap. 20, cap. 40, cap. 60): mini-auditoria —
  alternância de POV, cadência de heat até aqui, cadência de palavras
  (soma acumulada / meta proporcional), símbolos costurados (relógio,
  caneta, skyline, anel de sinete), aderência à bíblia. Corrigir
  desvios ANTES de seguir. Reportar ao dono como checkpoint
  informativo.

## Fase final (após o capítulo 60)
1. **Revisão global** (skill bia-ferreira-editor-global — genérica,
   usa o project_dna.md e a bíblia deste projeto): régua em todos os
   capítulos, POV, tempo, símbolos, arcos, extensão média, cadência de
   heat vs. meta travada.
2. **Formatação** (skill bia-ferreira-formatter — genérica):
   organizar manuscrito (POV → subtítulo discreto), metadata.json
   (author="R.B. Guidenelli", series="Jogo Infinito", series_index=2,
   título "Alianças e Traições"), EPUB + PDF + prompt de capa (usar
   references/branding-rbg.md + imagem-conceito da seção 6 do
   project_dna.md).
3. Entregar tudo em outputs/final/ + relatório.

## Política de Falha
- Validação reprovada 2x no mesmo capítulo → reescrever do zero.
- Contradição com a bíblia ou com o canon herdado do Livro 1 detectada
  em capítulo já registrado → corrigir o capítulo, nunca a bíblia.
- Deriva de escopo percebida → PARAR e reportar ao dono ANTES de
  continuar.
- Erros conhecidos do motor (histórico dos 4 livros anteriores da
  casa): (a) "a gente" vaza em diálogo informal (Marcus é o personagem
  de maior risco, papel de alívio cômico) — vigiar dobrado; (b) device
  de autocorreção — proibido, sempre; (c) heat abaixo da cota —
  monitorar a cada capítulo; (d) extensão abaixo do piso — medir e
  expandir NA HORA, não depois (lição central do Livro 1); (e) nomes/
  mundo de Gelo e Sangue ou de Sloane/Auden vazando por hábito —
  sempre confirmar contra o project_dna.md e a bíblia DESTE projeto.
