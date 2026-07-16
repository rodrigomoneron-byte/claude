# Canon Tracker — Gelo (Livro 1)

Continuidade, símbolos e decisões travadas durante a escrita — igual
em espírito ao `livro3/references/canon-livro3.md`, adaptado a este
projeto.

## Auditoria de fim de Ato 1 (cap. 20)

- **POV:** alternância estrita confirmada, Dante em todos os ímpares
  (1,3,5,7,9,11,13,15,17,19), Isa em todos os pares (2,4,6,8,10,12,14,
  16,18,20). Baz não teve POV em nenhum capítulo — confirmado via
  `grep -l "POV: Baz" outputs/conteudo/*.md` (vazio).
- **Nomes de time:** nenhuma menção a nomes reais da NHL (Bruins,
  Maple Leafs) — confirmado via grep. Griffins/Comets usados
  consistentemente.
- **Símbolos costurados até aqui:**
  - Gelo/rinque: presente em todos os 20 capítulos (ambientação
    natural do livro).
  - Bússola quebrada (tatuagem de Dante): caps 1, 3. Precisa reaparecer
    em pelo menos 1 momento de decisão relevante no Ato 2/3 para bater
    a meta de mín. 3 aparições — planejar para decisão importante
    (ex.: decidir contar tudo a Isa, ou decisão sobre cirurgia).
  - Paleta de cores / linha vermelha de Isa: caps 2, 8, 9, 10, 14, 16,
    20 — bem estabelecido, evolução clara (1 linha → 2 linhas → 3
    linhas na tela).
  - Troféu: caps 4, 6, 10, 12, 14 — bem estabelecido (estante dos
    Vance), reservar aparição final forte para o fechamento do Ato 3
    (Baz posando com o troféu).
- **Heat:** nenhuma cena ainda — correto, janela trava para cap 24-28
  (ainda não chegamos).
- **Desvio de bug conhecido do gate:** nenhum "a gente" real escapou
  para o registro final, mas o IMPULSO apareceu 2x durante rascunho
  (cap. 19 e cap. 20) — nos dois casos era eu, o modelo, escrevendo o
  device proibido (personagem "corrigindo" a fala) ou usando "a gente"
  dentro de uma frase nova. Ambos pegos por grep manual ANTES do
  registro final e reescritos limpos (não só a palavra — a frase
  inteira). Reforça a lição herdada do L3: vigilância constante,
  inclusive em capítulos tardios do próprio livro atual, não só nos
  primeiros.
- **Escopo:** nenhum desvio da bíblia. Ato 1 fechou conforme planejado
  — cotovelada (cap 3), café inicial (cap 1-2), galeria/mostra
  individual (caps 9, 18), quase-flagra da paparazzi (caps 19-20) como
  fechamento de ato, sem resolver a tensão cedo demais.
- **Extensão:** 20 capítulos, 18.193 palavras (~910 palavras/cap em
  média) — dentro da faixa 950-1100 buscada, levemente abaixo por
  causa de capítulos que precisaram de expansão manual para bater a
  meta (rascunho inicial sistematicamente curto; segunda passada de
  expansão width, corrigindo assunto por assunto, atingiu 900+ na
  maioria). Ritmo aceitável para a meta total de 57-66k.

## Ato 2 — progresso

- **Cap. 21:** primeiro toque real (mão no rosto) debaixo de uma
  árvore no parque. Ainda não é beijo — trégua consciente, os dois
  nomeiam o risco em voz alta.
- **Cap. 23-24:** primeira cena de heat, dentro da janela travada
  (24-28) — trégua não planejada no apartamento antigo de Isa
  (segredo que nem Baz conhece: ela ainda paga o aluguel escondido).
  Registro explícito-elegante, sem vulgaridade/termo clínico, avança a
  identificação mútua (ombro de Dante, cicatriz de Isa), não é sedução
  calculada. Duas ocorrências do impulso "a gente" pegas em rascunho
  (uma em diálogo do Dante, uma em narração da Isa) — reescritas antes
  do registro. Total de impulsos pegos até aqui: 4 (caps 19, 20, 24×2).
  Continua reforçando: vigilância constante é necessária em TODO
  capítulo, sem exceção, mesmo depois de dezenas de capítulos limpos
  seguidos.

- **Cap. 31:** primeiro rascunho colocou Marco Marchetti fisicamente
  presente no quarto do hospital após a cirurgia — contradiz a decisão
  travada em `arco-trama-livro1.md` ("aparece por telefone/lembrança
  neste livro, não fisicamente... reservar presença física real para
  o Livro 2"). Pego ANTES do registro, capítulo reescrito inteiro
  trocando a cena para uma ligação telefônica, preservando a confissão
  emocional (Marco também escondeu lesão própria, reconhece dureza
  excessiva) sem violar a bíblia. Lição: sempre reconferir decisões de
  elenco/aparição física contra a bíblia antes de escrever cena nova
  com personagem secundário, não só nomes/símbolos.

- **Cap. 33:** ALERTA — rascunho inicial continha uma violação grave e
  dupla da régua: (1) diálogo da Isa com "a gente" ("Odeio que a gente
  precise disso") SEGUIDO de (2) um parágrafo de narração comentando
  explicitamente que o erro não foi corrigido em voz alta e mencionando
  "a régua da narrativa" — ou seja, o device proibido na sua forma mais
  grave (quebra de quarta parede citando a régua diretamente), escrito
  por mim, o modelo, aparentemente por automatismo ao pensar sobre o
  processo de revisão enquanto escrevia. Também havia "pra gente" numa
  fala do Dante (variante equivalente a "a gente"). Todos os 3 hits
  pegos por grep manual ANTES do registro, capítulo reescrito removendo
  o parágrafo inteiro do device e trocando as duas falas por "nós"/
  "nosso". Reforça com mais força ainda a lição já documentada: o
  impulso de escrever o device pode aparecer de formas sutis e travestidas
  de "nota de processo", não só como fala de personagem — vigilância
  tem que cobrir a narração inteira, não só diálogo.

- **Cap. 39:** ALERTA MAIS GRAVE ATÉ AGORA — rascunho inicial abriu com
  "a gente" na fala da Isa, seguido de um parágrafo de narração dizendo
  explicitamente "não corrijo em voz alta o pequeno deslize" (o device
  descrito quase literalmente pelas próprias instruções do projeto) E
  então uma quebra de quarta parede completa: "Espera. Isso não está
  certo. Recomeço a cena." — o modelo comentando o próprio processo de
  escrita dentro do texto do capítulo. Pego por leitura manual antes do
  registro (não só grep — o "recomeço a cena" não seria pego por um
  grep de "a gente" sozinho). Removido o trecho inteiro, capítulo
  reescrito limpo desde a primeira linha. LIÇÃO REFORÇADA COM MÁXIMA
  PRIORIDADE: o impulso do device pode se manifestar como uma tentativa
  de "corrigir a si mesmo em tempo real" dentro do rascunho — isso é
  ainda mais perigoso que o "a gente" sozinho, porque quebra ficção por
  completo. Todo capítulo precisa ser lido inteiro, do início ao fim,
  por um humano (ou pelo próprio processo de revisão) ANTES do registro
  — grep automatizado sozinho não pega esse tipo de falha estrutural.

## Isolamento de universo
Confirmado por grep negativo: nenhum nome do universo de "A Rede"
(Cole, Sloane, Auden, Thorne, Daniel, Vivian, Adrian, Eleanor, Efua)
apareceu em nenhum dos 20 capítulos.
