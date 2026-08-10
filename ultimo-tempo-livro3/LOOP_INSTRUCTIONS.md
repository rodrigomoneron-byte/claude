# Instruções de Loop — Pênalti de Ouro (Estrelas do Gramado, Livro 3)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Renata
               ímpar, Léo par —, 950-1100 palavras, MIRANDO O TOPO da
               faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`.
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de tensão — exceto no epílogo, tom sereno).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py + grep manual `\ba gente\b` +
               `grep -ilE '\ba gente\b' outputs/conteudo/*.md` no lote
               completo ao final (bug de whitelist conhecido em formas
               "gente da"/"gente daqui"). VIGILÂNCIA MÁXIMA.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência física; nem Léo nem Renata
               exercem controle coercitivo; consentimento SEMPRE
               explícito; plausibilidade de análise de desempenho
               esportivo e compliance de clube; age gap tratado com
               cuidado; cameo fiel de Thiago/Júlia/Marcos/Bia.
4. VOZ       → confirmar que a voz de Léo é distinta da de Marcos/
               Thiago (carisma como escudo, não competência escondida
               nem decadência) e a de Renata distinta da de Bia/Júlia
               (precisão profissional sob pressão de sobrenome, não
               ironia nem intensidade direta).
5. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
6. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
7. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
7a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
7b. CADÊNCIA → heat meta 8-9 cenas, primeira ~cap. 18-20, gap máximo 6
               depois disso — CONTAR MANUALMENTE desde o cap. 1.
8. APRESENTAR + CONTINUAR

## Epílogo (obrigatório, fecha a trilogia)
- 2-3 capítulos marcados "# Epílogo" (não "# Capítulo N"), arquivo
  `ut3-epilogo01.md` (e -02, -03 se necessário).
- Reunião dos três casais (Léo/Renata, Thiago/Júlia, Marcos/Bia), tom
  sereno, fechamento definitivo da série — não precisa reabrir
  conflito novo. Caracterização fiel dos 4 personagens em cameo.
- Mesmo processo de 2 chamadas + régua + registro, SEM exigência de
  gancho de perigo no final.

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b): trava dura, BLOQUEIO se violado.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa: parar e verificar.
- Caracterização infiel do cameo (Thiago/Júlia/Marcos/Bia
  inconsistentes com os livros originais): tratar como falha
  estrutural, revisar contra os logs de decisão de L1/L2.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: caracterização fiel dos 4
    personagens em cameo (reler logs de decisão de L1/L2); nenhum
    vazamento de nome/fato de outra série da casa; plausibilidade de
    análise de desempenho esportivo e compliance; RESPEITO ESTRITO ao
    limite de conteúdo; gate consolidado de régua em todos os
    capítulos.
13. bia-ferreira-formatter — capa nova, tom "clássico decisivo/dados
    de desempenho" próprio. Relatório final DEVE incluir resumo da
    TRILOGIA INTEIRA (3 livros, palavras de cada um, total combinado).
14. Relatório final + ressalvas.
