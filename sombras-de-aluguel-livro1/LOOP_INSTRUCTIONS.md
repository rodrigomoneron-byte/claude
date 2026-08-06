# Instruções de Loop — Sombras de Aluguel, Livro 1

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Clara
               ímpar, Julian par —, 950-1100 palavras, MIRANDO O TOPO
               da faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real (ou
                   `python3 -c "print(len(open(f).read().split()))"`
                   se parecer inconsistente — bug de locale
                   documentado).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, `wc -w` de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de perigo/tensão, marca #7 adaptada).
               (e) `wc -w` final.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. VIGILÂNCIA MÁXIMA no device de autocorreção —
               apareceu em TODOS os livros anteriores da casa.
3. LIMITE DE CONTEÚDO → releitura obrigatória de cada capítulo contra
               project_dna.md seção 2b: nenhuma cena de violência
               doméstica gráfica no presente; Julian nunca exerce
               controle coercitivo (só proteção justificada,
               negociável); consentimento explícito em intimidade.
               Qualquer capítulo que viole isso deve ser reescrito
               ANTES do registro — trava editorial tão dura quanto a
               régua.
4. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
5. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (NUNCA aplicar
               "ressalva" ao limite de conteúdo da seção 2b — isso é
               bloqueio, não ressalva)
6. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
6a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
6b. CADÊNCIA → heat meta 8-10 cenas, primeira até cap. 12, gap máximo
               6 — CONTAR MANUALMENTE os capítulos desde a última cena
               de heat a cada capítulo desde o início.
7. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b do project_dna.md): trava dura,
  BLOQUEIO se violado, nunca "aprovado com ressalva".
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa: parar e verificar.

## Fim
8. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
9. Relatar taxa de expansão de emergência por ato, com honestidade.
10. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
11. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; consistência do plano de perseguição
    de Rodrigo; RESPEITO ESTRITO ao limite de conteúdo (seção 2b);
    distinção proteção-vs-controle mantida em toda cena de Julian.
12. bia-ferreira-formatter — capa nova, tom "dark romance" próprio.
13. Relatório final + ressalvas.
