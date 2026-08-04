# Capítulo 9

*POV: Helena*

A tela pisca o resultado da terceira seed às 14h32, e por um segundo eu sorrio, genuinamente, porque bate exatamente com as outras duas — convergência limpa, métricas excelentes, o tipo de número que qualquer orientador olharia e chamaria de sorte de doutorando talentoso. Só que sorte não se repete três vezes seguidas com precisão decimal idêntica. Isso não é sorte. Isso é padrão.

Puxo o log de treinamento inteiro, linha por linha, do jeito que Arthur sugeriu antes de sair, e é aí que encontro a primeira coisa que não bate: um bloco de pré-processamento, enterrado fundo na pipeline, que nenhum dos dois escreveu daquele jeito específico. A sintaxe é nossa. A lógica por dentro, não é. É como reconhecer a própria letra numa carta que você não lembra de ter escrito.

Copio o trecho pra uma aba separada e comparo com o histórico de versão do repositório, remontando commit por commit, cada vez mais rápido, o coração acelerando junto com o scroll. O bloco aparece pela primeira vez seis meses atrás — antes de Arthur e eu sequer termos decidido fundir os projetos, antes de qualquer um dos dois imaginar que precisaríamos comparar código um do outro linha por linha. Está lá, quieto, dormindo dentro dos dois algoritmos separados o tempo todo, esperando que alguém rodasse os dois juntos pra acordar.

Abro uma segunda aba, quase sem pensar, e busco pelo mesmo padrão de código no repositório antigo de Arthur, o que ele me deu acesso na semana da fusão. Está lá também — mesma estrutura, variáveis renomeadas o suficiente pra passar despercebida numa leitura rápida, mas o esqueleto é idêntico. Dois algoritmos, escritos por duas pessoas que mal se falavam até um mês atrás, carregando o mesmo bloco estranho, plantado antes de qualquer fusão. Isso não é coincidência de dois alunos parecidos pensando parecido. Isso é alguma coisa que entrou nos dois sistemas de fora, por um caminho que nenhum dos dois escolheu.

Sinto o estômago revirar. Se esse bloco está inflando artificialmente a performance do modelo — e tudo que estou vendo aponta pra isso —, então o artigo que estamos prestes a fundir, o mesmo que já foi aceito com revisão em andamento no *Journal of Adaptive Systems*, está construído em cima de um resultado que não é real. Não é erro pequeno de estudante nervosa. É o tipo de erro que se torna escândalo público quando alguém de fora descobre antes de nós — retratação, investigação de conduta, o financiamento inteiro do departamento sob suspeita numa época em que já estamos perdendo verba federal ano após ano.

E o meu nome, o meu visto, a minha bolsa condicionada a resultado publicado, tudo isso amarrado num artigo que talvez precise ser desmentido publicamente antes mesmo de sair da revisão.

Fecho os olhos um segundo, só um, e vejo o formulário da Bolsa Alvorada que assinei há três anos, a promessa impressa em letra miúda de que o financiamento continua condicionado à "conduta acadêmica exemplar e ausência de qualquer irregularidade em pesquisa vinculada". Não escrevi essas palavras. Só as li, sozinha, na cozinha da casa dos meus pais, antes de assinar embaixo sem hesitar, porque hesitar não era opção disponível pra quem tinha uma única passagem de avião comprada com o que sobrou do décimo terceiro do meu pai. Naquele dia a irregularidade era conceito abstrato, cláusula de contrato que eu nunca imaginei precisar entender de verdade. Hoje ela tem nome: um bloco de código que nenhum dos dois escreveu, dormindo dentro do Janus há seis meses, esperando o momento exato de acordar e cobrar a conta de todo mundo que confiou demais na própria competência.

Rodo o modelo mais uma vez, removendo o bloco suspeito manualmente, só pra confirmar — e a convergência desmorona na hora, os números voltando pro território realista, mais lento, mais honesto, exatamente o tipo de resultado modesto que qualquer pesquisadora séria esperaria de um problema dessa dificuldade. A prova está ali, cristalina, do jeito que só matemática consegue ser cristalina em meio a tanto medo: sem aquele bloco, nunca teríamos convergido tão rápido. Com ele, os dois construímos uma mentira sem saber, tijolo por tijolo, durante meses.

Minhas mãos tremem no teclado. Penso em ligar pra minha mãe e não digo nada, porque não existe frase em português nem em inglês que explique isso sem soar pior do que já é. Penso em Sofia, no aviso dela sobre quem esse departamento decide proteger quando a decisão fica difícil, e sei, com uma certeza gelada, que não sou eu.

Penso em Sterling — *me tragam antes de qualquer outra pessoa deste prédio* — e é exatamente o que pretendo fazer, assim que conseguir respirar direito de novo.

Penso também no Dr. Harrison, na taça de vinho erguida em brinde silencioso na festa, no quadro de logotipos pequenos demais pra ler, na oferta que ele fez a Arthur e a mim quase com as mesmas palavras. Não tenho prova de nada que ligue um fato ao outro. Só tenho o mesmo instinto que me fez decorar sete linhas de apresentação de manhã cedo, todo santo dia, pra nunca ser pega de surpresa: alguma coisa aqui não é acidente.

A porta do laboratório abre. Não levanto os olhos na hora, mas reconheço o peso dos passos, o jeito que a mochila bate no chão sempre no mesmo ângulo.

— Helena?

Não consigo formar as palavras ainda. Só aponto pra tela, o dedo tremendo demais pra disfarçar, e vejo — pelo canto do olho, sem coragem de encarar de frente — o rosto de Arthur mudar de curiosidade pra alguma coisa muito mais parecida com o que eu sinto agora.

— O que é isso? — ele pergunta, já puxando a cadeira pra perto, já lendo por cima do meu ombro, e a proximidade que antes me deixava sem ar agora só amplifica o pânico, os dois corpos colados pela mesma emergência em vez de qualquer outra coisa.

— Isso — eu digo, finalmente, a voz mais fina do que eu gostaria — é um erro que nenhum de nós dois cometeu sozinho. E acho que está em produção há meses.

Ele não responde na hora. Só olha pra tela, depois pra mim, e o silêncio entre nós dois pesa mais do que qualquer coisa que já dividimos até agora — nem rivalidade, nem atração, só o mesmo medo cru, dividido ao meio, sem ninguém pra culpar além de um código que nenhum dos dois lembra de ter escrito daquele jeito.
