# GELO E SANGUE — Lei do Projeto

Trilogia de romance esportivo dark (hóquei, NHL) no estilo da autora Jussara Leal.
Este arquivo é lido em TODA sessão. Suas regras têm precedência sobre qualquer
instrução casual de conversa. Em caso de conflito, este arquivo vence.

## REGRA ZERO — Leia as skills antes de escrever

Antes de escrever, revisar ou validar QUALQUER texto da trilogia:

1. Leia `.claude/skills/juju-chapter-writer/SKILL.md` + suas references
2. Após escrever, valide com `.claude/skills/juju-voice-validator/SKILL.md`
3. Revisão global de manuscrito: `.claude/skills/juju-editor-global/SKILL.md`
4. Formatação KDP (só após aprovação global): `.claude/skills/ges-formatter/SKILL.md`

Nenhum capítulo é considerado pronto sem score >= 8/9 no voice-validator.

## ORDEM DE SERVIÇO ATUAL (prioridade máxima)

**Antes de escrever qualquer capítulo novo: expandir os capítulos 1–11 do
Livro 1 (GELO), que estão com ~1.230 palavras cada — menos da metade do piso.**

Regras da expansão:
- Meta por capítulo: 3.000–5.000 palavras. Piso absoluto: 2.500.
- Expandir não é encher: adicionar interioridade do POV, fricção entre o casal,
  competência em cena (marca 3), ambiente projetando emoção (marca 5).
  Cenas de transição viram cenas de tensão.
- Um capítulo por vez: expandir → validar (9 marcas) → corrigir → registrar
  em PROGRESS.json → só então avançar.
- Consulte PROGRESS.json no início de toda sessão para saber onde parou.

## TAMANHO — trava inegociável

| Unidade | Meta | Piso |
|---|---|---|
| Capítulo | 3.000–5.000 palavras | 2.500 |
| Livro | 70.000–90.000 palavras | 65.000 |
| Capítulos por livro | 22–28 | — |

Capítulo abaixo do piso NÃO é entregue como pronto. Se o conteúdo planejado
render menos que isso, o problema é o plano da cena — aprofunde, não encurte.
Padrão de referência: romances da Jussara Leal têm 500–670 páginas; a leitora
deste nicho maratona no Kindle Unlimited (remuneração por página lida).

## UNIVERSO — resumo mínimo (detalhes nas references das skills)

- **Dante Marchetti** (24→26): ala direito, Boston Bruins → Fort McMurray Oil
  Barons. Ombro destruído (escondido), pai Marco (trauma: "se você não matar
  esse lance, você tá morto pra mim"), apagões sensoriais sob pressão, pavor de
  hospitais, tatuagem da bússola quebrada. Não sabe quem é fora do hóquei.
- **Isadora "Isa" Conti** (24→26): artista plástica, presa na gaiola dourada de
  Baz. Mãos manchadas de tinta, paleta que clareou sob o controle dele.
  Arco: sombra → albergue/garçonete/murais → artista independente. Mãe era
  costureira, morreu de câncer quando Isa tinha 19 anos (18 meses de
  diagnóstico até o fim); deixou uma caixa de retalhos nunca aberta, guardada
  na casa do pai — fato de canon estabelecido no cap. 5 do Livro 1.
- **Sebastian "Baz" Vance** (26→28): capitão do Toronto Maple Leafs. Psicopatia
  funcional: controla para silenciar o "você não é suficiente". REGRA:
  compreendido, NUNCA redimido. Sem abraço final, sem perdão.
- **Beau Renard** (62): técnico dos Oil Barons, mentor. "Hóquei é sobre
  carregar o peso uns dos outros."
- **Estrutura**: Livro 1 GELO (queda: exposição da lesão, Isa foge, todos
  quebrados) → Livro 2 SANGUE (reconstrução separada, cartas, zero encontro
  físico) → Livro 3 RAIZ (final pelo acesso contra Baz, reencontro maduro,
  pai de Baz morre e ele não sente nada, Dante passa o disco, epílogo).
- **Tema**: "Você não precisa vencer o mundo para se encontrar. Às vezes, você
  só precisa vencer o gelo dentro de você."

## POV E VOZ — resumo (regra completa nas references)

- Livro 2: POV de Isa e Dante NUNCA no mesmo capítulo.
- Tom: dark romance esportivo — cerebral, contido, ironia controlada; humor
  diminui quando a dor aumenta.
- As 9 marcas se aplicam a cada parágrafo (lista completa e exemplos ✅/❌ em
  `.claude/skills/juju-chapter-writer/references/9-marcas-completo.md`).
- Hóquei é linguagem corporal, nunca espetáculo. Fort McMurray nunca é piada.

## FLUXO DE TRABALHO POR SESSÃO

1. Ler PROGRESS.json → identificar tarefa atual.
2. Ler a skill relevante ANTES de produzir texto.
3. Produzir (escrever/expandir UM capítulo por vez).
4. Rodar voice-validator no texto. Score < 8/9 → corrigir e revalidar.
5. Atualizar PROGRESS.json (palavras, score, status, próxima tarefa).
6. Só então perguntar ao usuário se avança.

## PROIBIÇÕES DE PROJETO

- Não entregar capítulo abaixo do piso de palavras.
- Não escrever capítulo novo com a ordem de serviço de expansão pendente.
- Não pular a validação das 9 marcas.
- Não alterar fatos do universo (nomes, arcos, objetos simbólicos) sem
  confirmação explícita do usuário — em caso de dúvida, perguntar.
- Não redimir Baz. Nunca.
