# Instruções de Loop — Jogo Infinito, Livro 5 (final da série)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.
Apresentar cada capítulo e continuar automaticamente.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto, 950-1100 palavras),
               em DUAS chamadas de ferramenta obrigatórias, com medição
               real no meio (não estimativa mental — isso já foi tentado
               e falhou, ver histórico abaixo):
               (a) Write do arquivo com só Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` — chamada separada de verdade.
               (c) Se < ~50-55% do alvo do capítulo, Edit acrescentando
                   mais um beat de cena real ao Desenvolvimento, `wc -w`
                   de novo até bater.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final no capítulo completo.
               HISTÓRICO: no L4 (só instrução, sem gate mecânico), a taxa
               de expansão de emergência SUBIU ao longo do livro (7/20 →
               16/20 → 17/20). No teste do Ato 1 do L5 com a instrução
               "pause e estime mentalmente", piorou ainda mais (18/20) —
               o próprio escritor relatou que a pausa instrucional não
               criou uma pausa real. Só a medição via ferramenta, como
               chamada separada, é o que já demonstrou funcionar (mesmo
               princípio do piso duro do loop_state.py: exit code real,
               não aviso em texto).
2. RÉGUA     → scripts/regua_gate.py (trava dura; corrigir até LIMPO) +
               grep manual padrão E de formas obliquas
               (`pra gente|da gente|na gente|com a gente`)
3. VALIDAR   → bia-ferreira-voice-validator (score /7 + relatório)
4. FALHA     → auto-revisar pontos apontados; máx. 2 revisões; se persistir e
               não for quebra estrutural → "aprovado com ressalva" e CONTINUA
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV --words W
               --score S --status aprovado --heat yes|no
5a. PISO DURO → se o `record` recusar (sys.exit 3), o capítulo NÃO foi salvo.
               Identifique QUAL estágio ficou curto (normalmente o
               Desenvolvimento) e expanda ELE especificamente — não
               acrescente um parágrafo genérico só pra bater o número.
               Rode `record` de novo antes de seguir pro próximo capítulo.
5b. CADÊNCIA → checkpoint automático a cada `record` aceito. Se aparecer
               aviso, ajuste os PRÓXIMOS capítulos (extensão maior, ou
               cena de heat planejada) — nunca adiar pro final.
6. APRESENTAR + CONTINUAR (sem pedir aprovação)

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua (a gente / device): trava dura, sempre corrigir, nunca avançar com hit.
- Piso de extensão: trava dura por capítulo — ver passo 5a.
- Cadência de heat: trava dura de ritmo — ver passo 5b.
- Score baixo persistente (não estrutural): aprovar com ressalva, continuar.
- Quebra estrutural: registrar BLOQUEIO em PROGRESS e PARAR para o usuário.
- Continuidade de 5 livros: qualquer nome/fato que pareça repetir algo
  já usado em livro anterior da série (ou de outra série da casa) —
  parar e verificar antes de continuar, não presumir que está certo.

## Épilogo
Ao chegar nos últimos 1-2 capítulos planejados como epílogo, sinalizar
claramente no cabeçalho do arquivo ("# Epílogo" em vez de "# Capítulo
N") e permitir tom mais sereno/reflexivo no fechamento (marca 7 pode
resolver-se em serenidade, não precisa reabrir conflito novo).

## Fim (critério de parada atingido)
7. `scripts/loop_state.py check` — confirmar cadência de extensão E heat
   dentro da meta.
8. Relatar a taxa de capítulos que precisaram de expansão de emergência
   por ato, comparando explicitamente com o histórico do L4 (7/20,
   16/20, 17/20) — essa é a métrica que confirma se a correção de causa
   raiz funcionou.
9. bia-ferreira-editor-global (revisão global — atenção especial à
   continuidade de TODA a série de 5 livros, não só deste volume)
10. bia-ferreira-formatter (EPUB/PDF/capa)
11. Relatório final + lista de ressalvas
