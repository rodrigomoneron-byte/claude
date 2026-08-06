# Instruções de Loop — Elite de Cambridge, Livro 3

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Camila
               ímpar, Rafael par —, 950-1100 palavras, MIRANDO O TOPO
               da faixa DESDE O PRIMEIRO CAPÍTULO, não só no fim),
               processo de 2 chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real — se o resultado
                   parecer inconsistente com a extensão visual do
                   texto, usar
                   `python3 -c "print(len(open(f).read().split()))"`
                   como checagem alternativa (bug de locale
                   descoberto na formatação do Livro 2).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, `wc -w` de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. VIGILÂNCIA MÁXIMA no device de autocorreção
               ("a gente— nós") — apareceu recorrentemente em TODOS os
               livros anteriores da série, mesmo com aviso explícito
               repetido em cada ato. Tratar como certeza estatística
               de que vai aparecer no rascunho.
3. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
4. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
5a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
5b. CADÊNCIA → heat meta 10-12 cenas, primeira até cap. 10, gap máximo
               6 — CONTAR MANUALMENTE os capítulos desde a última cena
               de heat A CADA CAPÍTULO desde o início (o Livro 2
               fechou com só 8 cenas mesmo com o mesmo aviso — reforçar
               a disciplina desde o Ato 1, não deixar acumular déficit).
6. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa (incluindo os próprios
  Livros 1-2 de Elite de Cambridge, exceto cameo cruzado opcional):
  parar e verificar antes de continuar.
- Hospital real de Boston nomeado, ou quadro clínico implausível/
  fantasioso: parar e corrigir.

## Fim
7. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
8. Relatar taxa de expansão de emergência por ato, com honestidade.
9. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
   rodar um passe de reforço ANTES do editor-global, igual ao Livro 1.
10. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; plausibilidade médica básica do caso
    clínico central; consistência do código-switching; nem protocolo
    nem intuição "vencendo" de forma simplista.
11. bia-ferreira-formatter — capa nova, tom "elite médica" próprio.
12. Relatório final + ressalvas.
