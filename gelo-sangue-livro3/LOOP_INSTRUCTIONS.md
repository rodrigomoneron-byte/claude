# Instruções de Loop — Gelo e Sangue, Livro 3: Raiz (Claude Code)

## Setup (uma vez)
1. As skills da casa já estão fixadas em `.claude/skills/` na raiz do
   repositório — nada a instalar.
2. `pip install ebooklib markdown reportlab --break-system-packages -q`
   (necessário só na fase de formatação).
3. Onboarding já concluído — decisões em
   references/arco-trama-livro3.md ("DECISÕES TRAVADAS NO ONBOARDING DO
   LIVRO 3").

## Ações Obrigatórias por Iteração (1 capítulo)
1. **Ler o estado**: `python3 scripts/loop_state.py next .` (ou ler
   PROGRESS.json) → próximo N e POV.
2. **Escrever** (skill bia-ferreira-chapter-writer + project_dna + bíblia
   DESTE projeto): capítulo N, POV correto, **extensão-alvo ~950-1100
   palavras desde a primeira versão** (não aceitar capítulo abaixo de
   ~900 palavras — expandir a cena, não fechar curto), abrindo forte e
   fechando virando o chão. ANTES de salvar, varrer mentalmente cada
   diálogo procurando "a gente" — inclusive falas de personagens
   secundários "coloquiais" (erro mais comum do L2). Checar cadência de
   heat contra o heat_log em PROGRESS.json: se passou do gap máximo
   (5-6 caps) e o beat permite, a cena acontece NESTE capítulo — não
   adiar. Checar canon-livro3.md antes de escrever qualquer cena que
   mencione fatos dos Livros 1-2.
3. **Validar régua (trava dura)**:
   `python3 scripts/regua_gate.py outputs/conteudo/raiz-capituloNN.md`
   - HIT → corrigir (reescrever a fala/trecho limpo; se for o device,
     remover o device INTEIRO, não só trocar palavras) → revalidar até
     LIMPO.
   - **Sempre complementar com `grep -n "a gente" <arquivo>` manual E**
     com a varredura regex de texto normalizado:
     `python3 -c "import re; t=open('ARQUIVO').read(); j=re.sub(r'\s+',' ',t); print([m.start() for m in re.finditer('a gente', j)])"`
     — o gate tem bug de whitelist por substring e a quebra de linha do
     markdown pode esconder um hit real.
4. **Validar extensão**: `wc -w outputs/conteudo/raiz-capituloNN.md` —
   se abaixo de ~900 palavras, expandir ANTES de registrar (nunca
   registrar capítulo curto "para reforçar depois").
5. **Validar marcas** (skill bia-ferreira-voice-validator, usando a
   lista de marcas DESTE project_dna.md): score sobre o total de marcas
   do projeto. Abaixo do limiar (~78%) → revisar e revalidar.
6. **Registrar**:
   `python3 scripts/loop_state.py record . --n N --pov POV --words W --score S --status aprovado`
   Se o capítulo teve cena de heat, adicionar entrada em
   `heat_log` no PROGRESS.json manualmente (n, descrição curta).
7. **Repetir** imediatamente (sem parar, sem perguntar) até o critério de
   parada ou bloqueio real.

## Marcos automáticos (sem consultar o dono, exceto nas 3 decisões
## propostas listadas em TASK.md)
- Fim de Ato 1 (capítulo 20): mini-auditoria — alternância de POV,
  régua limpa em todos, extensão média ≥950 palavras, cadência de heat
  no rumo certo (0 cenas é esperado só se a trama justificar; senão
  reportar).
- Fim de Ato 2 (capítulo 40): mesma auditoria + checar se o dark
  moment do Ato 2 (escalada de Grant/Baz) está com peso emocional
  suficiente.
- Fim de Ato 3 / capítulo 60: manuscrito do corpo completo — não
  escrever o Epílogo ainda sem confirmar que os 60 capítulos batem a
  extensão total mínima (~57.000 palavras); se não bater, expandir
  capítulos existentes antes de seguir pro Epílogo.
- Epílogo: escrever por último, ~1200-1500 palavras, gravidez revelada
  aqui pela primeira vez (nunca antes), símbolo da muda de árvore
  madura, tom solar, cena de heat final permitida.
- Manuscrito completo (61 arquivos): rodar bia-ferreira-editor-global
  antes de formatar.

## Bloqueios reais (parar e consultar o dono)
- Qualquer necessidade de mudar as 3 decisões propostas (resultado da
  final, causa/tratamento da morte de Grant, mecânica da queda de Baz).
- Contradição irreconciliável com fato já publicado no L1 ou L2.
- Estrutura do julgamento ou da final exigindo mais/menos capítulos que
  o Ato 1 comporta.
