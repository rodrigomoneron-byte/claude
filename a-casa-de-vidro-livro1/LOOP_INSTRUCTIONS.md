# Instruções de Loop — A Casa de Vidro

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Clara
               ímpar, Bernardo par —, 950-1100 palavras, MIRANDO O
               TOPO da faixa DESDE O PRIMEIRO CAPÍTULO — mirar pelo
               menos 1000-1050 depois de cada rodada de expansão, não
               parar no primeiro número acima do piso técnico),
               processo de 2 chamadas PADRÃO:
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
               completo ao final (bug de whitelist conhecido em formas
               "gente da"/"gente daqui"). VIGILÂNCIA MÁXIMA.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b (REFORÇADA): nenhuma violência física real
               mostrada contra Mel (6 anos) — ameaça sempre risco
               evitado ou tensão psicológica; Bernardo NUNCA usa a
               posição de empregador pra pressionar Clara
               romanticamente — avanço físico só depois de
               reformulação explícita da relação profissional; nenhum
               controle coercitivo entre os dois; consentimento SEMPRE
               explícito; Mateus tratado com seriedade sem violência
               gráfica, resolução via via legal; Vitória Andrade
               (antagonista) só extorsão/manipulação, nunca violência
               física direta; trauma/mutismo de Mel com sensibilidade
               clínica real, recuperação gradual da fala.
4. VOZ       → confirmar as 7 marcas específicas (transparência como
               ameaça, intuição de Clara, controle como proteção não
               posse em Bernardo, desenhos de Mel como linguagem
               narrativa, barreira profissional redesenhada
               explicitamente, tempestade como relógio emocional,
               fechamento em gancho).
5. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
6. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
7. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
7a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
7b. CADÊNCIA → heat meta 8-9 cenas, primeira ~cap. 20 (adiada por
               causa da barreira profissional + criança na casa), gap
               máximo 6 depois disso — CONTAR MANUALMENTE desde o
               cap. 1.
8. APRESENTAR + CONTINUAR

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua: trava dura.
- Piso de extensão: trava dura.
- LIMITE DE CONTEÚDO (seção 2b, REFORÇADA): trava dura, BLOQUEIO se
  violado — especialmente qualquer cena que mostre violência física
  real contra Mel, ou qualquer avanço romântico de Bernardo sobre
  Clara antes da reformulação explícita da relação profissional.
- Score baixo não-estrutural: aprovado com ressalva, continuar.
- Quebra estrutural: BLOQUEIO, parar para o usuário.
- Vazamento de nome/fato de outra série da casa: parar e verificar.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: nenhuma violência mostrada
    contra Mel; nenhuma pressão profissional de Bernardo sobre Clara;
    plausibilidade de investigação doméstica/policial; RESPEITO
    ESTRITO ao limite de conteúdo reforçado; gate consolidado de régua
    em todos os capítulos.
13. bia-ferreira-formatter — capa nova, tom "mansão de vidro
    noturna/costa catarinense" próprio.
14. Relatório final + ressalvas.
