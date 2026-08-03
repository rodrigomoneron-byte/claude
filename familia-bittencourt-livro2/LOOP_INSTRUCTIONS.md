# Instruções de Loop — Família Bittencourt, Livro 2

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Pedro ímpar,
               novo interesse romântico par —, 950-1100 palavras,
               MIRANDO O TOPO da faixa desde o capítulo 1), em DUAS
               chamadas de ferramenta obrigatórias:
               (a) Write com só Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real.
               (c) Se < ~575-605 (55-55% de 1050-1100), Edit expandindo
                   com beat de cena real, `wc -w` de novo.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final.
               LIÇÃO DO LIVRO 1: a taxa de expansão de emergência ficou
               alta o livro inteiro (100%/91%/100% por ato) mesmo
               mirando mais alto ato a ato — a correção só chegou
               tarde. Neste livro, mirar o topo JÁ NO CAPÍTULO 1, não
               esperar acumular déficit pra reagir.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. Atenção redobrada (registro brasileiro real).
3. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               adaptadas deste livro em project_dna.md seção 1)
4. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
5a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
5b. CADÊNCIA → checkpoint automático a cada record — ajustar próximos
               capítulos se avisar.
6. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- Cadência de heat: trava dura.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Continuidade com o Livro 1: qualquer fato que contradiga o que foi
  estabelecido lá (segredo de Ricardo, demissão de Pedro, Fundo
  Travessia, elenco) — parar e verificar antes de continuar.
- Vazamento de outra série da casa: mesma regra, nunca presumir certo.

## Fim
7. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
8. Relatar taxa de expansão de emergência por ato, com honestidade,
   comparando com o histórico do Livro 1 (100%/91%/100%).
9. bia-ferreira-editor-global — atenção à continuidade com o Livro 1.
10. bia-ferreira-formatter — capa nova, não herdada do L1.
11. Relatório final + ressalvas.
