# Instruções de Loop — Jogo Infinito, Livro 4

## Autonomia
Rodar capítulo a capítulo, EM SEQUÊNCIA, SEM checkpoint humano.
Apresentar cada capítulo e continuar automaticamente. Refinamento fino
fica para o final — EXCETO cadência de extensão/heat, que agora é
TRAVA DURA capítulo a capítulo (ver seção "Checkpoint de cadência").

## Tamanho do lote
- capitulos_por_turno: 4-6 (continua no turno seguinte sem pedir
  aprovação; o usuário pode interromper quando quiser)

## Ações obrigatórias por iteração
1. ESCREVER  → bia-ferreira-chapter-writer (POV correto, 950-1100 palavras,
               já na extensão-alvo — não escrever curto pra "completar depois")
2. RÉGUA     → scripts/regua_gate.py (trava dura; corrigir até LIMPO) +
               grep manual padrão E de formas obliquas
               (`pra gente|da gente|na gente|com a gente`)
3. VALIDAR   → bia-ferreira-voice-validator (score /7 + relatório)
4. FALHA     → auto-revisar pontos apontados; máx. 2 revisões; se persistir e
               não for quebra estrutural → "aprovado com ressalva" e CONTINUA
5. ESTADO    → scripts/loop_state.py record <proj> --n N --pov POV --words W
               --score S --status aprovado --heat yes|no
               (SEMPRE marcar --heat yes quando o capítulo tiver cena)
5a. PISO DURO → se o `record` recusar (sys.exit 3, "PISO DE EXTENSÃO NÃO
               ATINGIDO"), o capítulo NÃO foi salvo. EXPANDIR o capítulo
               AGORA, no mesmo turno, e rodar `record` de novo antes de
               seguir pro próximo capítulo. Só usar --ressalva se houver
               motivo estrutural real (clímax curto deliberado, transição) —
               não como atalho pra pular a expansão.
5b. CADÊNCIA → o `record` (quando aceito) roda o checkpoint automaticamente.
               Se aparecer `⚠️ CHECKPOINT DE CADÊNCIA`:
               - atraso de extensão → os PRÓXIMOS capítulos saem maiores
                 (o aviso já calcula a média necessária)
               - atraso/gap de heat → avaliar ativamente se o próximo beat
                 comporta cena; se não comportar, registrar com --ressalva
                 explicando por quê, não deixar acumular em silêncio
               NUNCA adiar correção de cadência pra um "reforço" no final.
6. APRESENTAR + CONTINUAR (sem pedir aprovação)

## Limiares
- limiar_aprovacao: 5.5 (de 7)
- max_revisoes: 2

## Política de falha
- Régua (a gente / device): trava dura, sempre corrigir, nunca avançar com hit.
- Piso de extensão: trava dura por capítulo — ver passo 5a. Isso é NOVO
  neste livro (nos livros anteriores era só aviso cumulativo).
- Cadência de heat: trava dura de ritmo — ver passo 5b.
- Score baixo persistente (não estrutural): aprovar com ressalva, registrar
  para refinamento final, continuar.
- Quebra estrutural (POV errado, tempo verbal, contradição de trama, arco
  incoerente): registrar BLOQUEIO em PROGRESS e PARAR para o usuário.

## Fim (critério de parada atingido)
7. `scripts/loop_state.py check` — confirmar cadência de extensão E heat
   dentro da meta antes de prosseguir. Como o piso agora é trava dura por
   capítulo, este check final deve, por construção, já vir limpo — se não
   vier, é sinal de --ressalva usada em excesso, revisar antes de seguir.
8. bia-ferreira-editor-global (revisão global; ajustes recomendados)
9. bia-ferreira-formatter (EPUB/PDF/capa)
10. Relatório final + lista de ressalvas para refinamento
