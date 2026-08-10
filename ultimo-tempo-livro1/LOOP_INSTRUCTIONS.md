# Instruções de Loop — Último Tempo (Estrelas do Gramado, Livro 1)

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Júlia
               ímpar, Thiago par —, 950-1100 palavras, MIRANDO O TOPO
               da faixa DESDE O PRIMEIRO CAPÍTULO), processo de 2
               chamadas PADRÃO:
               (a) Write com Abertura + Desenvolvimento.
               (b) Checagem de palavras real via
                   `python3 -c "print(len(open(f).read().split()))"`
                   (preferir a `wc -w`, bug de locale documentado).
               (c) Se abaixo do piso intermediário (~55% do alvo),
                   Edit expandindo com beat de cena real.
               (d) Edit acrescentando Virada + Saída + fechamento
                   (gancho emocional ou físico).
               (e) Checagem final de palavras.
2. RÉGUA     → scripts/regua_gate.py (word-boundary correto) + grep
               manual `\ba gente\b`. VIGILÂNCIA MÁXIMA — apareceu em
               TODOS os livros anteriores da casa, sem exceção.
3. LIMITE DE CONTEÚDO → releitura obrigatória contra project_dna.md
               seção 2b: nenhuma lesão física gráfica/prolongada; nem
               Thiago nem Júlia exercem controle coercitivo; toda
               decisão médica/de carreira é negociada, nunca imposta;
               consentimento SEMPRE explícito; plausibilidade
               médico-esportiva/futebolística básica; antigo empresário
               de Thiago tratado como conflito relacional, não ameaça
               física.
4. CADÊNCIA DE HEAT ADAPTADA → primeira cena real de intimidade só a
               partir de ~cap. 20 (coincide com a "Recaída" do Ato II —
               viagem do time, Only One Bed). Antes disso, construir
               tensão sexual crescente SEM consumação (olhares,
               proximidade física da reabilitação, quase-toques). Depois
               da primeira cena, gap máximo 6 capítulos — CONTAR
               MANUALMENTE, mirando o TOPO da meta (~8-9 cenas).
5. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as marcas
               em project_dna.md seção 1)
6. FALHA     → auto-revisar; máx. 2 revisões; "aprovado com ressalva"
               se persistir e não for estrutural (limite de conteúdo
               NUNCA vira ressalva)
7. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV
               --words W --score S --status aprovado --heat yes|no
7a. PISO DURO → se recusar (sys.exit 3), expandir o estágio curto,
               tentar de novo.
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
- Vazamento de nome/fato de outra série da casa: parar e verificar.
- Cena de heat antes do cap. 20 sem justificativa estrutural forte:
  tratar como quebra da cadência adaptada, revisar/adiar.

## Fim
9. `scripts/loop_state.py check` — confirmar cadência dentro da meta.
10. Relatar taxa de expansão de emergência por ato, com honestidade.
11. Se o total final ficar abaixo do piso da faixa (55.000-58.000),
    rodar um passe de reforço ANTES do editor-global.
12. bia-ferreira-editor-global — atenção a: plausibilidade
    médico-esportiva; consistência da cadência de heat adiada; nenhum
    vazamento de nome/fato de outra série da casa; RESPEITO ESTRITO ao
    limite de conteúdo.
13. bia-ferreira-formatter — capa nova, tom "gramado/estádio noturno"
    próprio. Relatório final deve sinalizar que este é o Livro 1 de
    uma trilogia em andamento e os ganchos deixados pros Livros 2 e 3.
14. Relatório final + ressalvas.
