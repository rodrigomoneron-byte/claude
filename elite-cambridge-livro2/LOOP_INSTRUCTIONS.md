# Instruções de Loop — Elite de Cambridge, Livro 2

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Mariana
               ímpar, Nico par —, 950-1100 palavras, mirando o topo da
               faixa nos últimos capítulos de cada ato), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real.
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, `wc -w` de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final.
2. RÉGUA     → scripts/regua_gate.py + grep manual `a gente` e formas
               oblíquas. Vigilância REDOBRADA no device de
               autocorreção ("a gente— nós") — recorrente no Livro 1
               mesmo com aviso explícito.
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
               de heat a cada capítulo (o loop_state.py check só
               valida o gap corrente, não retrospectivamente — essa
               lacuna causou 2 violações de gap no Livro 1).
6. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa (incluindo o próprio
  Livro 1 de Elite de Cambridge, exceto o cameo opcional autorizado de
  Helena/Arthur): parar e verificar antes de continuar.
- Empresa de tecnologia real nomeada no caso fictício do moot court:
  parar e corrigir (deve ser sempre fictícia, nomes NOVOS — não
  reaproveitar Solvix/Meridian do Livro 1).

## Fim
7. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
8. Relatar taxa de expansão de emergência por ato, com honestidade.
9. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
   rodar um passe de reforço ANTES do editor-global, igual ao Livro 1.
10. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; consistência jurídica básica do caso
    fictício; consistência do código-switching; motivação humana de
    Henrique Ferraz articulada em cena.
11. bia-ferreira-formatter — capa nova, tom "elite jurídica" próprio.
12. Relatório final + ressalvas.
