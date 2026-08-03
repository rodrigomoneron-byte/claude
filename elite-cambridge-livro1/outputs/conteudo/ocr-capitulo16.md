# Capítulo 16 — Arthur

Gabriel me alcança no corredor antes de eu chegar na sala 214, café na mão, os olhos com aquela urgência específica que ele só usa quando encontrou alguma coisa importante demais pra guardar até o almoço.

— Preciso te contar uma coisa, e não me pergunta como eu sei, porque a resposta vai te deixar desconfortável.

— Fala.

— Vi o Harrison saindo de uma reunião ontem à noite, tarde, com um cara de terno que eu nunca vi por aqui. Sem crachá do departamento, sem identificação nenhuma visível. Os dois saíram apertando a mão de um jeito que não parecia reunião acadêmica normal.

— Você reconheceu o cara?

— Não. Mas reconheci o carro que veio buscar ele — uma placa de frota corporativa, o tipo que empresa grande usa pra visitante importante. Achei estranho o bastante pra fotografar, de longe, tipo espião amador de filme ruim.

Ele me mostra a foto no celular: o carro escuro, os faróis acesos, muito escuro pra ler qualquer detalhe além da silhueta. Não é prova de nada, tecnicamente, mas empilha em cima de tudo que Helena e eu já reunimos, mais um tijolo numa parede que está começando a formar desenho reconhecível.

— Gabriel, eu preciso te contar uma coisa também, mas ainda não posso contar tudo.

— Tá relacionado com a sala secreta?

— Tá.

— Então guarda o resto pra quando puder falar de verdade. Só me avisa se precisar de mais alguém fotografando carro escuro de longe. — Ele sorri, mas por trás do sorriso tem preocupação genuína, o tipo que só existe entre gente que já se ajudou de verdade antes. — Se cuida, Arthur.

Ele se afasta pelo corredor, e eu fico parado ali um instante, pensando em como consegui, sem perceber, dividir o mundo em duas categorias: as pessoas que sabem o suficiente pra se preocupar comigo, e as pessoas que sabem o suficiente pra me ajudar de verdade. Gabriel virou as duas coisas ao mesmo tempo, sem eu nem contar tudo — e isso, de algum jeito estranho, pesa mais do que qualquer segredo que eu ainda esteja guardando dele.

Chego na sala 214 e Helena já está lá, como sempre, olhos vermelhos de sono maldormido mas alertas, o tipo de cansaço que vira combustível em vez de fraqueza.

— O resultado bom demais pra mandar por texto — ela diz, virando a tela pra mim sem preâmbulo. — Rodei uma varredura completa em todos os commits suspeitos que já catalogamos. Todos, sem exceção, carregam um identificador oculto no metadado — não é assinatura de usuário normal, é um hash fixo, repetido exatamente igual em cada um.

Debruço sobre a tela, o coração acelerando do jeito que só acelera quando um padrão se revela claro demais pra ser coincidência.

— O mesmo hash em todos?

— O mesmo hash em todos. Dezessete commits ao longo de seis meses, espalhados pelos dois repositórios, sempre com o mesmo identificador escondido dentro do metadado de compilação, invisível a menos que alguém olhe especificamente pra essa camada.

Ela abre uma planilha organizada com uma precisão que só ela teria paciência de montar: data, hora, fuso deslocado, o hash idêntico repetido dezessete vezes na última coluna, cada linha um tijolo a mais na mesma parede. Sinto um misto de orgulho e desconforto olhando aquilo — orgulho porque o trabalho dela é impecável, desconforto porque a impecabilidade só existe porque alguém, em algum lugar, tentou esconder rastro o bastante pra precisar desse nível de rigor pra encontrar.

— Consegue rodar o hash contra algum banco de assinatura conhecido? — pergunto. — Ferramenta de compilação corporativa costuma deixar identificador de licença embutido, às vezes sem querer.

— Isso não é bug acidental. Isso é assinatura — repito, quase pra mim mesmo, sentindo o peso da palavra assentar de verdade pela primeira vez.

— É exatamente isso que estou pensando. — Ela se recosta, esfregando os olhos, a exaustão finalmente vencendo por um segundo. — Alguém plantou esse código deliberadamente, com ferramenta própria, e deixou uma marca digital consistente — seja por descuido, seja porque queria conseguir provar depois que foi ele quem fez, por algum motivo que nós ainda não entendemos.

Conto pra ela sobre Gabriel, o carro, o homem de terno sem crachá, e vejo o rosto dela mudar, as peças se encaixando na cabeça dela quase visivelmente, o jeito que só acontece quando alguém como Helena finalmente vê o quadro completo se formando depois de meses fitando pedaços soltos.

— Precisamos decodificar esse hash — ela diz, já digitando de novo, a voz vibrando com uma urgência nova. — Se ele aponta pra alguma coisa reconhecível — um domínio, uma empresa, um nome —, temos a primeira prova real que Sterling está esperando.

Fico olhando ela trabalhar, o cursor piscando, os dedos dela voando pelo teclado mais rápido do que eu já vi, e sinto, pela primeira vez desde que essa história inteira começou, alguma coisa parecida com esperança de verdade.

O programa de busca roda, uma barra de progresso lenta demais pro tanto de adrenalina que os dois estamos sentindo, e quando finalmente para — sem nenhum resultado, o banco de assinaturas públicas vazio pra aquele hash específico — Helena bate a palma da mão na mesa, frustrada, e eu pouso a minha por cima da dela sem pensar duas vezes, um gesto pequeno que diz, sem precisar de palavra nenhuma: ainda não achamos, mas vamos achar, juntos.
