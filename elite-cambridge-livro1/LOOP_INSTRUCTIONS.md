# Instruções de Loop — Elite de Cambridge, Livro 1

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Helena
               ímpar, Arthur par —, 950-1100 palavras), processo de 2
               chamadas PADRÃO (sem técnica experimental nova —
               conclusão acumulada dos Livros anteriores: nenhuma
               variação testada mudou a taxa de expansão, só a trava
               dura no registro importa de verdade):
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real.
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, `wc -w` de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. Atenção redobrada nas cenas de código-
               switching em português — a régua vale igual lá.
3. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               adaptadas deste livro em project_dna.md seção 1)
4. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
5a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
5b. CADÊNCIA → checkpoint automático — heat meta 10-12 cenas, primeira
               até o cap. 10, gap máximo 6. Primeiro momento de
               intimidade emocional real sugerido pra viagem ao Vale
               do Silício (Ato 2) — não forçar antes da tensão render.
6. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa (Jogo Infinito, Gelo e
  Sangue, Família Bittencourt): parar e verificar antes de continuar.
- Empresa de tecnologia real nomeada como vilã na conspiração: parar e
  corrigir (deve ser sempre fictícia).

## Fim
7. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
8. Relatar taxa de expansão de emergência por ato, com honestidade —
   não é esperado que melhore sobre os livros anteriores, mas
   registrar mesmo assim pra manter o histórico completo do catálogo.
9. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
   fato de outra série da casa; consistência técnica do thriller de
   IA/dados; consistência do código-switching de registro; motivação
   articulada do Dr. Harrison (não vilão caricato vazio).
10. bia-ferreira-formatter — capa nova, tom "dark/light academia"
    próprio desta série.
11. Relatório final + ressalvas.
