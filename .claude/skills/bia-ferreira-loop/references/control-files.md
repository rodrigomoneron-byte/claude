# Arquivos de Controle — templates Bia Ferreira

Como o framework de 4 arquivos se mapeia neste projeto. Copie para o diretório
do projeto e ajuste.

---

## TASK.md (constituição do livro)

```markdown
# A Mão na Alavanca — Livro N: [Título]

## Objetivo
Produzir um romance completo de [N] capítulos no estilo Bia Ferreira,
mantendo fidelidade à bíblia e à régua de voz.

## project_dna (o DNA)
- Bíblia de arco/trama: `bia-ferreira-arco-trama-livroN.md`
- Marcas e voz: embutidas nas skills bia-ferreira-chapter-writer e
  bia-ferreira-voice-validator.

## Saída esperada
- Capítulos em `outputs/` (bia-ferreira-livroN-capituloNN.md)
- PROGRESS.json + PROGRESS.md (estado/placar)
- No fim: EPUB + PDF 6x9" + prompt de capa (via bia-ferreira-formatter)

## Critério de parada
O loop encerra quando [N] capítulos forem escritos, aprovados (régua limpa +
score >= limiar ou "aprovado com ressalva") e a formatação final for gerada.
```

---

## LOOP_INSTRUCTIONS.md (manual de operações)

```markdown
# Instruções de Loop — Bia Ferreira

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano. Apresentar
cada capítulo e continuar automaticamente. Refinamento fino fica para o final.

## Tamanho do lote
- capitulos_por_turno: [ex. 3-5] (continua no turno seguinte sem pedir
  aprovação; o usuário pode interromper quando quiser)

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto, ~1.100-1.300 palavras)
2. RÉGUA     → scripts/regua_gate.py (trava dura; corrigir até LIMPO)
3. VALIDAR   → bia-ferreira-voice-validator (score /7 + relatório)
4. FALHA     → auto-revisar pontos apontados; máx. 2 revisões; se persistir e
               não for quebra estrutural → "aprovado com ressalva" e CONTINUA
5. ESTADO    → scripts/loop_state.py record ... --heat yes|no (SEMPRE marcar
               se o capítulo tem cena de heat — o checkpoint do passo 5b
               depende disso)
5b. CADÊNCIA → o `record` já roda o checkpoint automaticamente (extensão +
               heat vs. meta travada). Se aparecer aviso, os PRÓXIMOS
               capítulos precisam corrigir o ritmo (extensão maior, cena de
               heat planejada) — trava tão dura quanto a régua, só que
               verificada capítulo a capítulo em vez de dentro de um único
               capítulo. NUNCA adiar isso pra um "reforço" no final.
6. APRESENTAR + CONTINUAR (sem pedir aprovação)

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua (a gente / device): trava dura, sempre corrigir, nunca avançar com hit.
- Score baixo persistente (não estrutural): aprovar com ressalva, registrar
  para refinamento final, continuar.
- Quebra estrutural (POV errado, tempo verbal, contradição de trama, arco
  incoerente): registrar BLOQUEIO em PROGRESS e PARAR para o usuário.

## Fim (critério de parada atingido)
7. bia-ferreira-editor-global (revisão global; ajustes recomendados)
8. bia-ferreira-formatter (EPUB/PDF/capa)
9. Relatório final + lista de ressalvas para refinamento
```

---

## Inicialização do estado (JSON)

```bash
python scripts/loop_state.py init <proj> \
  --book "A Mão na Alavanca — Livro 2" --target 67 --word-target 90000 \
  --heat-target 12 --max-heat-gap 6 --first-heat-by 6 \
  --povs "Cassius,Wren" --first-pov Wren
```

`--heat-target`, `--max-heat-gap` e `--first-heat-by` vêm do project_dna.md
do livro atual (seção de cadência de heat) — nunca de um valor genérico.
Sem eles o checkpoint de cadência de heat simplesmente não roda (word
target sozinho ainda funciona).

Consultar próxima ação:
```bash
python scripts/loop_state.py next <proj>
```

Registrar capítulo concluído:
```bash
python scripts/loop_state.py record <proj> --n 1 --pov Wren --words 1180 \
  --score 7 --status aprovado --heat no
# capítulo com cena de heat:
python scripts/loop_state.py record <proj> --n 6 --pov Cassius --words 1320 \
  --score 7 --status aprovado --heat yes
# com ressalva:
python scripts/loop_state.py record <proj> --n 3 --pov Cassius --words 1240 \
  --score 5 --status "aprovado com ressalva" --ressalva "pacing do meio arrasta"
```

O `record` atualiza o placar (palavras, ~págs, média de score, % da meta,
cenas de heat feitas) e define o próximo capítulo + POV (alternância
automática) sozinho — e roda o checkpoint de cadência automaticamente,
imprimindo avisos acionáveis quando o ritmo real (extensão ou heat) fica
abaixo do esperado pra aquele ponto do livro. Pra reconferir sem registrar
capítulo novo:
```bash
python scripts/loop_state.py check <proj>
```

---

## Nota sobre o gatilho (adaptação do framework)

O framework genérico dispara por presença de `ARCO_NARRATIVO.md` +
`FICHA_PERSONAGENS.md`. Aqui, o "gatilho" é a **bíblia do livro**
(`bia-ferreira-arco-trama-livroN.md`) estar pronta e aprovada, com as vozes
dos POVs perfiladas nas skills. Sem bíblia aprovada, o loop não começa a
escrever — ele pede a bíblia primeiro.
```
