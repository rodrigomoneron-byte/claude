# Instruções de Loop — O Lado Escuro da Lei, Livro 1

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Diana
               ímpar, Noah par —, 950-1100 palavras, MIRANDO O TOPO
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
               Diana nem Noah exercem controle coercitivo; consentimento
               SEMPRE explícito; plausibilidade jurídica básica.
4. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
5. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
6. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
6a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
6b. CADÊNCIA → heat meta 8-10 cenas, primeira até cap. 12, gap máximo
               6 — CONTAR MANUALMENTE desde o cap. 1.
7. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b): trava dura, BLOQUEIO se violado.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa: parar e verificar
  (universo novo, sem cameo cruzado autorizado desta vez).

## Fim
8. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
9. Relatar taxa de expansão de emergência por ato, com honestidade.
10. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
11. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; plausibilidade jurídica básica;
    motivação real de Evandro e "O Chefe"; RESPEITO ESTRITO ao limite
    de conteúdo.
12. bia-ferreira-formatter — capa nova, tom "suspense policial
    noturno" próprio.
13. Relatório final + ressalvas.
