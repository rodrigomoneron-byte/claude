# Instruções de Loop — Fora de Jogo (Estrelas do Gramado, Livro 2)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Bia ímpar,
               Marcos par —, 950-1100 palavras, MIRANDO O TOPO da
               faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`
                   (preferir a `wc -w`, bug de locale documentado).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho emocional, de imprensa ou de tensão
                   financeira).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py (word-boundary correto) + grep
               manual `\ba gente\b`. ATENÇÃO: bug de whitelist
               conhecido em formas "gente da"/"gente daqui" — releia
               manualmente com atenção redobrada, não confie só no
               script. VIGILÂNCIA MÁXIMA — apareceu em TODOS os livros
               anteriores da casa, sem exceção, incluindo o Livro 1
               desta série.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência física; nem Marcos nem Bia
               exercem controle coercitivo um sobre o outro (inclusive
               dentro do fake dating); consentimento SEMPRE explícito;
               plausibilidade de marketing esportivo e endividamento
               informal (sem ameaça física direta).
4. VOZ       → confirmar banter afiado no Ato I, aprofundando pro
               dramático nos Atos II-III; contraste entre cenas de
               vestiário (verdade) e cenas de evento/imprensa
               (performance).
5. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
6. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
7. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
7a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
7b. CADÊNCIA → heat meta 8-9 cenas, primeira ~cap. 15, gap máximo 6
               depois disso — CONTAR MANUALMENTE desde o cap. 1.
8. APRESENTAR + CONTINUAR

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
- Inconsistência com os ganchos do Livro 1 (cap. 33): tratar como
  quebra estrutural, corrigir antes de prosseguir.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: consistência com os
    ganchos do Livro 1; plausibilidade de marketing esportivo e
    endividamento informal; nenhum vazamento de nome/fato de outra
    série da casa; RESPEITO ESTRITO ao limite de conteúdo; rodar o
    gate consolidado em todos os capítulos de uma vez (não confiar só
    nos gates individuais, por causa do bug de whitelist documentado).
13. bia-ferreira-formatter — capa nova (registro de evento/imprensa).
    Relatório final deve sinalizar o gancho pro Livro 3 (Léo).
14. Relatório final + ressalvas.
