# Instruções de Loop — Enseada dos Ausentes (Segredos à Beira-Mar, Livro 2)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Marina
               ímpar, Theo par —, 950-1100 palavras, MIRANDO O TOPO da
               faixa DESDE O PRIMEIRO CAPÍTULO — mirar pelo menos
               1000-1050 depois de cada rodada de expansão), processo
               de 2 chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`.
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho de mistério ou perigo).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py + grep manual `\ba gente\b` +
               `grep -ilE '\ba gente\b' outputs/conteudo/*.md` no lote
               completo ao final (bug de whitelist conhecido).
               VIGILÂNCIA MÁXIMA.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma violência física gráfica/direta
               consumada contra Marina ou Theo; nenhum controle
               coercitivo entre os dois; consentimento SEMPRE
               explícito; luto/trauma tratado com sensibilidade real;
               resolução via sistema legal, nunca vingança unilateral.
4. VOZ       → confirmar as 7 marcas específicas (cidade pequena como
               personagem coletivo, restauro como metáfora ativa,
               obsessão solitária de Theo virando aliança, luto como
               ponte, mar como relógio narrativo, silêncio como
               cumplicidade/fala como coragem, fechamento em gancho).
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

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b): trava dura, BLOQUEIO se violado —
  especialmente qualquer violência física consumada contra Marina ou
  Theo, ou qualquer resolução do perigo final por vingança unilateral
  em vez de sistema legal.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série/livro da casa: parar e
  verificar.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: nenhuma violência física
    consumada contra os protagonistas; resolução via sistema legal;
    plausibilidade de investigação policial de pequena cidade; nenhum
    vazamento de nome/fato de outra série/livro da casa; RESPEITO
    ESTRITO ao limite de conteúdo; gate consolidado de régua em todos
    os capítulos.
13. bia-ferreira-formatter — capa nova, tom "farol/pousada costeira
    catarinense" próprio.
14. Relatório final + ressalvas.
