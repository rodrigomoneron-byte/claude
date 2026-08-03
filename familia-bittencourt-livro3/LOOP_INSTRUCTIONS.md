# Instruções de Loop — Família Bittencourt, Livro 3 (fechamento)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Dona Sofia
               ímpar, novo interesse romântico par —, 950-1100
               palavras), processo de 2 chamadas PADRÃO (sem técnica
               experimental nova — conclusão acumulada dos Livros 1-2:
               nenhuma variação testada mudou a taxa de expansão, só a
               trava dura no registro importa de verdade):
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real.
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, `wc -w` de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. Mesma vigilância dos livros anteriores.
3. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               adaptadas deste livro em project_dna.md seção 1)
4. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
5a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
5b. CADÊNCIA → checkpoint automático — heat tem meta MENOR e mais
               solta neste livro (3-5 cenas, sem gap rígido) — não
               tratar aviso de heat como urgente do mesmo jeito que
               nos livros anteriores, avaliar organicamente.
6. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Heat — registro "fade-to-warm"
Diferente dos Livros 1-2: cenas deste livro podem começar explícitas
em tensão/desejo mas fechar ANTES do detalhe anatômico completo, mais
peso em intimidade emocional que em descrição física. Ajustar o
julgamento de "o que conta como cena de heat" pra esse registro mais
contido — não forçar nível de explicitação dos livros anteriores.

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Continuidade com os Livros 1-2: qualquer fato que contradiga o que
  foi estabelecido lá (recuperação de Dona Sofia, arcos dos netos,
  elenco) — parar e verificar antes de continuar.
- Vazamento de outra série da casa: mesma regra.

## Épilogo
Capítulos finais marcados "# Epílogo" (não "# Capítulo N"), reunindo
o elenco da trilogia inteira, tom sereno — fechamento definitivo da
série, não precisa reabrir conflito novo.

## Fim
7. `scripts/loop_state.py check` — confirmar cadência dentro da meta
   (heat com critério mais solto, ver acima).
8. Relatar taxa de expansão de emergência por ato, com honestidade —
   não é esperado que melhore sobre os livros anteriores, mas
   registrar mesmo assim pra manter o histórico completo do catálogo.
9. bia-ferreira-editor-global — atenção à continuidade com os Livros
   1-2 E à coerência do fechamento da trilogia inteira.
10. bia-ferreira-formatter — capa nova, tom próprio deste livro.
11. Relatório final + ressalvas.
