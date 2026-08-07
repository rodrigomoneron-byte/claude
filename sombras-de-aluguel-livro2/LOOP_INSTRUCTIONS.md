# Instruções de Loop — Sombras de Aluguel, Livro 2

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Fernanda
               ímpar, Dante par —, 950-1100 palavras, MIRANDO O TOPO
               da faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` real, ou
                   `python3 -c "print(len(open(f).read().split()))"`
                   se parecer inconsistente (bug de locale
                   documentado, use Python como padrão preferencial).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real, checar de
                   novo.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de perigo/tensão).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py (word-boundary correto) + grep
               manual `\ba gente\b` e formas oblíquas. VIGILÂNCIA
               MÁXIMA — apareceu em TODOS os livros anteriores da
               casa, incluindo o Livro 1 desta série.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência gráfica prolongada contra
               Fernanda; Dante nunca exerce controle coercitivo;
               consentimento explícito em intimidade.
4. VOZ       → confirmar que a voz de Dante soa NOTAVELMENTE diferente
               da de Julian (Livro 1) — mais rápido, irônico,
               verborrágico quando nervoso, não silencioso/contido.
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
               6 — CONTAR MANUALMENTE desde o cap. 1. Se houver período
               de maior risco/isolamento extremo no Ato 2 ou 3,
               PLANEJAR cena antes e depois dele deliberadamente
               (lição do déficit do Livro 1).
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
  Livro 1, exceto o cameo confirmado de Julian/Clara): parar e
  verificar.
- Voz de Dante indistinguível da de Julian: tratar como falha de voz,
  revisar.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: nenhum vazamento de nome/
    fato de outra série da casa; consistência com o Livro 1 (cameo,
    fatos do universo já estabelecidos); RESPEITO ESTRITO ao limite de
    conteúdo; lógica básica do esquema financeiro.
13. bia-ferreira-formatter — capa nova, tom "tech noir" próprio.
14. Relatório final + ressalvas.
