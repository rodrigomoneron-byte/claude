# Instruções de Loop — Livro 3 (Claude Code)

## Setup (uma vez)
1. Instalar as skills da casa no projeto (ver README_COMO_RODAR.md).
2. `pip install ebooklib markdown reportlab --break-system-packages -q`
   (necessário só na fase de formatação).
3. Rodar o ONBOARDING (TASK.md) e gravar decisões em PROGRESS.json.

## Ações Obrigatórias por Iteração (1 capítulo)
1. **Ler o estado**: `python3 scripts/loop_state.py status .` (ou ler
   PROGRESS.json) → próximo N e POV.
2. **Escrever** (skill chapter-writer + project_dna + bíblia): capítulo N,
   POV correto, 950–1100 palavras, abrindo forte e fechando virando o chão.
   ANTES de salvar, varrer mentalmente cada diálogo procurando "a gente".
   Checar cadência de heat (se >5 caps desde a última cena e o beat
   permite, a cena acontece NESTE capítulo).
3. **Validar régua (trava dura)**:
   `python3 scripts/regua_gate.py outputs/conteudo/livro3-capituloNN.md`
   - HIT → corrigir (reescrever a fala/trecho limpo; se for o device,
     remover o device INTEIRO, não só trocar palavras) → revalidar até LIMPO.
4. **Validar marcas** (skill voice-validator adaptada ao L3): score /7.
   <7 → revisar (skill reviser/auto-revisão) e revalidar.
5. **Registrar**:
   `python3 scripts/loop_state.py record . --n N --pov POV --words W --score S --status aprovado`
6. **Repetir** imediatamente (sem parar, sem perguntar) até o critério de
   parada ou bloqueio real.

## Marcos automáticos (sem consultar o dono)
- A cada fim de ato (caps 14, 32, 48): mini-auditoria — alternância de
  POV, cadência de heat até aqui, símbolos costurados, aderência à bíblia.
  Corrigir desvios ANTES de seguir.

## Fase final (após cap 67)
1. **Revisão global** (skill editor-global): régua nos 67, POV, tempo,
   símbolos, arcos, extensão média, heat 13-14. Corrigir o que apontar.
2. **Formatação** (skill formatter): organizar manuscrito (POV → subtítulo
   discreto), metadata.json (author="R.B. Guidenelli", series_index=3,
   título travado no onboarding), EPUB + PDF + prompt de capa (usar
   references/branding-rgb.md e o padrão de série: mesmo estúdio de
   carvalho; imagem-conceito do L3 = **a alavanca enterrada como estaca
   de tomate** OU a rede/raízes conectadas — decidir pelo travado).
3. Entregar tudo em outputs/final/ + relatório.

## Política de Falha
- Validação reprovada 2x no mesmo capítulo → reescrever do zero (não
  remendar remendos).
- Contradição com a bíblia detectada em capítulo já registrado → corrigir
  o capítulo, nunca a bíblia (a bíblia só muda com o dono).
- Deriva de escopo percebida (ex.: clímax chegando cedo) → PARAR e
  reportar ao dono ANTES de continuar. Não comprimir, não esticar por
  conta própria.
- Erros conhecidos do modelo (histórico dos L1/L2): (a) "a gente" vaza em
  diálogo de personagem popular — vigiar dobrado; (b) impulso de escrever
  o device da autocorreção — proibido; (c) heat abaixo da cota — monitorar
  a cada capítulo; (d) tentação de encerrar cedo/comprimir atos — a bíblia
  manda.
