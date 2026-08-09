# Instruções de Loop — Justiça Sombria, Livro 3 (fechamento da trilogia)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Beatriz
               ímpar, Caio par —, 950-1100 palavras, MIRANDO O TOPO da
               faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2 chamadas
               PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`
                   (preferir a `wc -w`, bug de locale documentado).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de perigo/tensão — exceto no epílogo, que
                   fecha em tom sereno).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py (word-boundary correto) + grep
               manual `\ba gente\b`. VIGILÂNCIA MÁXIMA — apareceu em
               TODOS os livros anteriores da casa, sem exceção — tratar
               como certeza estatística, não hipótese.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência gráfica prolongada; nem
               Beatriz nem Caio exercem controle coercitivo um sobre o
               outro; consentimento SEMPRE explícito; plausibilidade
               jurídica/institucional básica; consistência da revelação
               estrutural (antagonistas L1/L2 = mesma rede) com os logs
               de decisão de L1 e L2 — reler antes de escrever qualquer
               capítulo que toque nisso ou traga os casais em cameo.
4. VOZ       → confirmar que a voz de Beatriz soa distinta da de Diana
               (fé institucional genuína sendo testada, não rigidez
               moral) e da de Vera (não neutralidade técnica); e que a
               voz de Caio é distinta da de Noah (isolamento como
               método após anos sozinho, não ironia amarga) e da de
               Marcelo (não cansaço processado).
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
               6 — CONTAR MANUALMENTE desde o cap. 1, mirando o TOPO da
               meta (9-10, repetindo a disciplina do Livro 2).
8. APRESENTAR + CONTINUAR

## Epílogo (obrigatório, fecha a trilogia)
- 2-3 capítulos marcados "# Epílogo" (não "# Capítulo N"), arquivo
  `js3-epilogo01.md` (e -02, -03 se necessário).
- Reunião dos três casais (Beatriz/Caio, Diana/Noah, Vera/Marcelo), tom
  sereno, fechamento definitivo da série — não precisa reabrir conflito
  novo. Caracterização fiel dos quatro personagens em cameo.
- Mesmo processo de 2 chamadas + régua + registro no loop_state, mas
  SEM exigência de gancho de perigo no final (fecha em tom sereno).

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b): trava dura, BLOQUEIO se violado.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa (incluindo detalhes de
  L1/L2 desta série que não batam com os logs de decisão originais):
  parar e verificar.
- Voz de Beatriz ou Caio indistinguível de Diana/Noah/Vera/Marcelo:
  tratar como falha de voz, revisar.
- Inconsistência entre a revelação estrutural (L1/L2 = mesma rede) e o
  que já foi estabelecido nos livros anteriores: tratar como quebra
  estrutural, BLOQUEIO.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: consistência da revelação
    estrutural com os Livros 1-2 (releitura cruzada obrigatória);
    caracterização fiel dos 4 personagens em cameo; nenhum vazamento de
    nome/fato de outra série da casa; plausibilidade jurídica/
    institucional; RESPEITO ESTRITO ao limite de conteúdo.
13. bia-ferreira-formatter — capa nova, tom "Brasília/tribunal superior
    noturno" próprio. Relatório final DEVE incluir resumo da TRILOGIA
    INTEIRA (3 livros, palavras de cada um, total combinado).
14. Relatório final + ressalvas.
