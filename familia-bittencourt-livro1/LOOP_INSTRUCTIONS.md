# Instruções de Loop — Família Bittencourt, Livro 1: Acordo de Vidro

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.
Apresentar cada capítulo e continuar automaticamente.

## Tamanho do lote
- capitulos_por_turno: 4-6

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto — Isabela
               ímpar, Leo par —, 950-1100 palavras), em DUAS chamadas
               de ferramenta obrigatórias, com medição real no meio:
               (a) Write do arquivo com só Abertura + Desenvolvimento.
               (b) Bash `wc -w <arquivo>` — chamada separada de verdade.
               (c) Se < ~50-55% do alvo do capítulo, Edit acrescentando
                   mais um beat de cena real, `wc -w` de novo até bater.
               (d) Edit acrescentando Virada + Saída + fechamento.
               (e) `wc -w` final no capítulo completo.
               HISTÓRICO (Jogo Infinito L5): esse processo reduziu a
               taxa de expansão de emergência de 90% pra 60% num ato,
               mas voltou a 90% no ato seguinte — funciona parcialmente,
               não é solução definitiva. Aplicar mesmo assim, mas
               reportar a taxa real no relatório de cada ato.
2. RÉGUA     → scripts/regua_gate.py (trava dura; corrigir até LIMPO) +
               grep manual padrão `a gente` E formas oblíquas
               (`pra gente|da gente|na gente|com a gente`). ATENÇÃO
               REDOBRADA nesta série: brasileirismo geral é permitido
               (diferente das séries anteriores da casa), o que aumenta
               o risco de "a gente" escapar por reflexo do registro
               natural — não relaxar a vigilância por causa disso.
3. VALIDAR   → bia-ferreira-voice-validator (score /7 contra as 7
               marcas ADAPTADAS desta série em project_dna.md seção 1,
               não o template genérico da casa)
4. FALHA     → auto-revisar pontos apontados; máx. 2 revisões; se persistir e
               não for quebra estrutural → "aprovado com ressalva" e CONTINUA
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV --words W
               --score S --status aprovado --heat yes|no
5a. PISO DURO → se o `record` recusar (sys.exit 3), o capítulo NÃO foi salvo.
               Identifique QUAL estágio ficou curto e expanda ELE
               especificamente, rode `record` de novo antes de seguir.
5b. CADÊNCIA → checkpoint automático a cada `record` aceito. Ajustar os
               próximos capítulos se aparecer aviso.
6. APRESENTAR + CONTINUAR (sem pedir aprovação)

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua (a gente / device): trava dura, sempre corrigir, nunca avançar com hit.
- Piso de extensão: trava dura por capítulo — ver passo 5a.
- Cadência de heat: trava dura de ritmo — ver passo 5b.
- Score baixo persistente (não estrutural): aprovar com ressalva, continuar.
- Quebra estrutural: registrar BLOQUEIO em PROGRESS e PARAR para o usuário.
- Vazamento de universo: qualquer nome/fato de Jogo Infinito ou de
  qualquer outra série da casa aparecendo aqui por engano — parar e
  corrigir antes de continuar, nunca presumir que está certo.

## Fim (critério de parada atingido)
7. `scripts/loop_state.py check` — confirmar cadência de extensão E heat
   dentro da meta.
8. Relatar a taxa de capítulos que precisaram de expansão de emergência
   por ato, com total honestidade.
9. bia-ferreira-editor-global (revisão global)
10. bia-ferreira-formatter (EPUB/PDF/capa — capa adaptada ao tom deste
    livro, não herdando automaticamente o branding do "clube de
    carvalho" das séries anteriores)
11. Relatório final + lista de ressalvas
