# Instruções de Loop — Justiça Sombria, Livro 2

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Vera
               ímpar, Marcelo par —, 950-1100 palavras, MIRANDO O TOPO
               da faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`
                   (preferir a `wc -w`, bug de locale documentado).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de perigo/tensão).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py (word-boundary correto) + grep
               manual `\ba gente\b`. VIGILÂNCIA MÁXIMA — apareceu em
               TODOS os livros anteriores da casa, sem exceção.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência gráfica prolongada; nem
               Vera nem Marcelo exercem controle coercitivo;
               consentimento SEMPRE explícito; plausibilidade
               jurídica/aduaneira básica.
4. VOZ       → confirmar que a voz de Marcelo soa distinta da de Noah
               (mais seco/cansado, menos performático) e a de Vera
               distinta da de Diana (neutralidade técnica rachando,
               não rigidez moral).
5. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
6. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
7. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
7a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
7b. CADÊNCIA → heat meta 8-10 cenas, primeira até cap. 12, gap máximo
               6 — CONTAR MANUALMENTE desde o cap. 1, mirando o TOPO
               da meta (9-10), não só o piso (lição do Livro 1).
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
- Vazamento de nome/fato de outra série da casa (incluindo o próprio
  Livro 1 desta série — universo independente): parar e verificar.
- Voz de Marcelo ou Vera indistinguível de Noah/Diana: tratar como
  falha de voz, revisar.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; plausibilidade jurídica/aduaneira
    básica; motivação real dos antagonistas; RESPEITO ESTRITO ao
    limite de conteúdo.
13. bia-ferreira-formatter — capa nova, tom "porto noturno" próprio.
14. Relatório final + ressalvas.
