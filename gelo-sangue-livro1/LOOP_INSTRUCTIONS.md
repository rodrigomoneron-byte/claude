# Instruções de Loop — Gelo e Sangue, Livro 1: Gelo (Claude Code)

## Setup (uma vez)
1. As skills da casa já estão fixadas em `.claude/skills/` na raiz do
   repositório — nada a instalar.
2. `pip install ebooklib markdown reportlab --break-system-packages -q`
   (necessário só na fase de formatação).
3. Rodar o ONBOARDING (TASK.md) e gravar decisões em PROGRESS.json.

## Ações Obrigatórias por Iteração (1 capítulo)
1. **Ler o estado**: `python3 scripts/loop_state.py next .` (ou ler
   PROGRESS.json) → próximo N e POV.
2. **Escrever** (skill bia-ferreira-chapter-writer + project_dna + bíblia
   DESTE projeto): capítulo N, POV correto, extensão travada no
   project_dna.md, abrindo forte e fechando virando o chão. ANTES de
   salvar, varrer mentalmente cada diálogo procurando "a gente". Checar
   cadência de heat (se passou do limite definido sem cena e o beat
   permite, a cena acontece NESTE capítulo).
3. **Validar régua (trava dura)**:
   `python3 scripts/regua_gate.py outputs/conteudo/gelo-capituloNN.md`
   - HIT → corrigir (reescrever a fala/trecho limpo; se for o device,
     remover o device INTEIRO, não só trocar palavras) → revalidar até
     LIMPO.
   - **Sempre complementar com `grep -n "a gente" <arquivo>` manual** —
     o gate tem bug de whitelist por substring (documentado em
     `livro3/references/canon-livro3.md` como referência histórica).
4. **Validar marcas** (skill bia-ferreira-voice-validator, usando a
   lista de marcas DESTE project_dna.md): score sobre o total de marcas
   do projeto. Abaixo do limiar (~78%) → revisar e revalidar.
5. **Registrar**:
   `python3 scripts/loop_state.py record . --n N --pov POV --words W --score S --status aprovado`
6. **Repetir** imediatamente (sem parar, sem perguntar) até o critério de
   parada ou bloqueio real.

## Marcos automáticos (sem consultar o dono)
- Fim de Ato 1 (capítulo 20) e fim de Ato 2 (capítulo 40): mini-
  auditoria — alternância de POV (Dante ímpar/Isa par, Baz nunca em
  POV), cadência de heat até aqui (meta: 1ª cena entre cap 24-28, então
  não se aplica na auditoria do cap 20; verificar gap máximo de 5-6
  caps na auditoria do cap 40), símbolos costurados (gelo, bússola
  quebrada, paleta de cores de Isa, troféu), aderência à bíblia
  (arco-trama-livro1.md) e aos nomes fictícios de time. Corrigir
  desvios ANTES de seguir.

## Fase final (após o último capítulo)
1. **Revisão global** (skill bia-ferreira-editor-global): régua em todos
   os capítulos, POV, tempo, símbolos, arcos, extensão média, cadência
   de heat vs. meta travada. Corrigir o que apontar.
2. **Formatação** (skill bia-ferreira-formatter): organizar manuscrito
   (POV → subtítulo discreto), metadata.json (author="R.B. Guidenelli",
   title="Gelo", series="Gelo e Sangue", series_index=1), EPUB + PDF +
   prompt de capa (usar references/branding-rbg.md + conceito visual de
   gelo/rinque da seção 6 do project_dna.md).
3. Entregar tudo em outputs/final/ + relatório.

## Política de Falha
- Validação reprovada 2x no mesmo capítulo → reescrever do zero (não
  remendar remendos).
- Contradição com a bíblia detectada em capítulo já registrado → corrigir
  o capítulo, nunca a bíblia (a bíblia só muda com o dono).
- Deriva de escopo percebida (ex.: clímax chegando cedo, meta de
  palavras ou de heat não vai bater) → PARAR e reportar ao dono ANTES de
  continuar. Não comprimir, não esticar por conta própria — apresentar
  opções e deixar o dono decidir.
- Erros conhecidos do motor (histórico dos livros anteriores da casa):
  (a) "a gente" vaza em diálogo de personagem popular — vigiar dobrado,
  inclusive com o device de autocorreção disfarçado de comentário
  neutro da narração; (b) impulso de escrever o device da autocorreção
  — proibido, sempre; (c) heat abaixo da cota — monitorar a cada
  capítulo, não só nos marcos de ato; (d) tentação de encerrar cedo/
  comprimir atos — a bíblia manda; (e) nomes/mundo de outro livro da
  casa vazando por hábito — sempre confirmar contra o project_dna.md
  deste projeto antes de escrever um nome novo.
