# Instruções de Loop — Jogo Infinito, Livro 1 (Claude Code)

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
   projeto + bíblia references/arco-trama-livro1.md): capítulo N, POV
   correto, ~950-1100 palavras, abrindo forte e fechando virando o
   chão (marca 7). ANTES de salvar, varrer mentalmente cada diálogo
   procurando "a gente". Checar cadência de heat (se passou de 5-6
   capítulos sem cena e o beat permite, a cena acontece NESTE
   capítulo, nunca empurrada pra depois).
3. **Validar régua (trava dura)**:
   `python3 scripts/regua_gate.py outputs/conteudo/jogo1-capituloNN.md`
   - HIT → corrigir (reescrever a fala/trecho limpo; se for o device,
     remover o device INTEIRO) → revalidar até LIMPO.
   - **Sempre complementar com `grep -n "a gente" <arquivo>` manual** —
     o gate tem bug de whitelist por substring (documentado nos 3
     livros anteriores da casa).
4. **Validar marcas** (usando a lista de 7 marcas do project_dna.md
   deste projeto — NÃO usar bia-ferreira-voice-validator literalmente,
   pois ela traz o exemplo hardcoded de Sloane/Auden; aplicar a mesma
   lógica de scoring/desvio manualmente contra as marcas próprias
   deste livro). Abaixo do limiar (~78%) → revisar e revalidar.
5. **Registrar**:
   `python3 scripts/loop_state.py record . --n N --pov POV --words W --score S --status aprovado`
6. **Repetir** imediatamente (sem parar, sem perguntar) até o critério
   de parada ou bloqueio real.

## Marcos automáticos (sem consultar o dono)
- Fim de cada ato (cap. 20, cap. 40, cap. 60): mini-auditoria —
  alternância de POV, cadência de heat até aqui, símbolos costurados
  (relógio de bolso, caneta, skyline), aderência à bíblia. Corrigir
  desvios ANTES de seguir. Reportar ao dono como checkpoint
  informativo (não pedido de permissão).

## Fase final (após o capítulo 60)
1. **Revisão global** (skill bia-ferreira-editor-global — esta É
   genérica, usa o project_dna.md e a bíblia deste projeto como
   fonte): régua em todos os capítulos, POV, tempo, símbolos, arcos,
   extensão média, cadência de heat vs. meta travada.
2. **Formatação** (skill bia-ferreira-formatter — também genérica):
   organizar manuscrito (POV → subtítulo discreto), metadata.json
   (author="R.B. Guidenelli", series="Jogo Infinito", series_index=1,
   título "O Início do Jogo"), EPUB + PDF + prompt de capa (usar
   references/branding-rbg.md + imagem-conceito da seção 6 do
   project_dna.md).
3. Entregar tudo em outputs/final/ + relatório.

## Política de Falha
- Validação reprovada 2x no mesmo capítulo → reescrever do zero.
- Contradição com a bíblia detectada em capítulo já registrado →
  corrigir o capítulo, nunca a bíblia (a bíblia só muda com o dono).
- Deriva de escopo percebida (ex.: triângulo resolvendo cedo demais,
  meta de palavras ou de heat não vai bater) → PARAR e reportar ao
  dono ANTES de continuar.
- Erros conhecidos do motor (histórico dos livros anteriores da casa):
  (a) "a gente" vaza em diálogo informal (Marcus Boone é o personagem
  de maior risco aqui, papel de alívio cômico) — vigiar dobrado; (b)
  device de autocorreção — proibido, sempre; (c) heat abaixo da cota —
  monitorar a cada capítulo; (d) tentação de resolver o triângulo ou a
  investigação cedo demais — a bíblia manda 5 livros, este é só o
  Livro 1; (e) nomes/mundo de Gelo e Sangue ou de Sloane/Auden vazando
  por hábito — sempre confirmar contra o project_dna.md e a bíblia
  DESTE projeto antes de escrever um nome novo.
