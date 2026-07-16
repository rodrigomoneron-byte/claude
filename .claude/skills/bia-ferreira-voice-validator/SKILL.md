---
name: bia-ferreira-voice-validator
description: Avalia um capítulo, cena ou trecho contra as 7 marcas e a régua de registro da voz da casa R.B. Guidenelli (ex-"Bia Ferreira"), atribuindo um score de 0 a 7 e um relatório de desvios com localização e instrução de correção. USE SEMPRE esta skill quando o usuário pedir para "validar", "revisar a voz", "checar fidelidade", "dar nota", "ver se está no tom da casa" ou "ver se tem deriva" em qualquer trecho de um livro dessa casa. Use também proativamente depois de escrever um capítulo novo com a skill bia-ferreira-chapter-writer, antes de entregar o texto como finalizado. Funciona para qualquer livro/série da casa — a lista exata de marcas e o registro de heat (fade-to-black vs. explícito) vêm do project_dna.md do projeto ATUAL.
---

# R.B. Guidenelli (ex-"Bia Ferreira") — Validador de Voz (7 Marcas)

## Quando usar

- O usuário pede explicitamente para validar, revisar, dar nota ou checar
  deriva de um trecho
- Imediatamente após escrever um capítulo com `bia-ferreira-chapter-writer`,
  como autovalidação antes de entregar
- O usuário cola um trecho escrito por outra pessoa/ferramenta e pergunta
  "isso parece a voz da casa?"

---

## ANTES DE VALIDAR — confirme a lista de marcas do projeto atual

O checklist marca-por-marca abaixo (seção seguinte) é o TEMPLATE original
da casa, ilustrado com o mundo do primeiro livro. **Cada livro pode
travar sua própria lista de 7 marcas no onboarding**, redefinindo o que
"aprovado" significa para aquele projeto especificamente — isso já
aconteceu num livro posterior da série, cuja lista de marcas e cujo
registro de heat (explícito-elegante, não fade-to-black) são diferentes
do template abaixo.

**Regra de prioridade:** se o `project_dna.md` do projeto atual definir
sua própria lista de marcas/checklist de qualidade, use ESSA lista para
pontuar — o checklist abaixo vira só referência de método (como
estruturar a avaliação), não a fonte de verdade sobre o que é "correto".
Nunca reprove um trecho por violar uma regra do template abaixo (ex.:
"nunca cena explícita") se o projeto atual define outro registro de heat.

---

## Como validar

1. Leia o texto completo de uma vez antes de pontuar qualquer coisa.
2. Confirme a lista de marcas aplicável: a do project_dna.md do projeto
   atual, se existir; senão, leia `references/marcas-completo.md` como
   template (pares ✅/❌ ilustrativos do primeiro livro da casa).
3. Percorra o checklist marca por marca, na ordem. Para cada marca, decida
   APROVADO ou COM DESVIO.
4. Para cada desvio, cite o parágrafo/frase e escreva a instrução de correção
   específica — nunca um comentário genérico como "não parece a voz da casa".
5. Some os pontos aprovados → score de 0 a 7 (ou ao denominador do
   projeto atual, se a lista dele tiver outro tamanho).
6. Cheque a régua de registro (universal, ver abaixo) e as observações
   de mundo do projeto atual (não contam no score, mas entram no
   relatório).
7. Monte o relatório no formato abaixo.

### Marcas não aplicáveis (N/A)

Marcas ligadas a slow burn/tensão romântica só se aplicam a cenas em que
o interesse amoroso está presente ou sendo diretamente observado/
lembrado. Em cenas sem isso, marque como **N/A** — não contam a favor
nem contra.

Quando houver N/A, ajuste o denominador proporcionalmente e registre
isso. O limiar de aprovação continua sendo ~78% das marcas aplicáveis
(equivalente a ~5,5/7 numa lista de 7).

---

## Checklist marca por marca — TEMPLATE (exemplo do primeiro livro da casa)

> ⚠️ Confirme contra o project_dna.md do projeto atual antes de aplicar
> ao pé da letra — em especial a Marca 3, cujo critério de heat é
> ESPECÍFICO de cada livro (ver nota na própria marca).

### Marca 1 — Provocação que vira confissão
- **Aprovado se:** a alfinetada mais afiada revela, sem querer, o que o
  personagem protege
- **Reprovado se:** a emoção é declarada direto ("eu te odeio") sem confissão
  escondida no ataque
- **Deriva:** sarcasmo "vazio", que ataca mas não entrega nada por baixo

### Marca 2 — Status/poder como linguagem corporal
- **Aprovado se:** poder/dinheiro/posição mostrados em micro-gesto ou objeto
- **Reprovado se:** "a família era rica e poderosa", "ele era influente"
  (declarado em abstrato)
- **Deriva:** descrever contexto como inventário em vez de gesto que
  carrega hierarquia

### Marca 3 — Slow burn medido em proximidade negada
- **Aprovado se:** a tensão mora no quase, na distância que diminui aos
  poucos, na linha não cruzada
- **Reprovado se:** a tensão se resolve em contato/consumação cedo
  demais PARA O QUE O PROJETO ATUAL DEFINE COMO "cedo demais" — o
  critério de temperatura (fade-to-black vs. explícito-elegante) e a
  janela da primeira cena íntima vêm do project_dna.md do projeto
  atual, NÃO deste template. Um livro pode ter heat explícito
  autorizado a partir de determinado capítulo; nesse caso, cena
  explícita ali é aprovada, não desvio.
- **Deriva:** consumação antes do preço emocional ser pago (isso sim é
  universal — o desvio é sobre acúmulo insuficiente, não sobre
  explicitação em si)

### Marca 4 — Rivalidade/conflito que é cortejo disfarçado
- **Aprovado se:** a hostilidade deixa vazar a atenção (lembram detalhes
  demais, escalam para manter o outro perto)
- **Reprovado se:** os dois "simplesmente se odeiam", sem nada por baixo
- **Deriva:** conflito genérico que não funciona como disfarce do interesse

### Marca 5 — O proibido/o preço tem custo visível
- **Aprovado se:** cada passo na direção do outro custa algo concreto
- **Reprovado se:** o obstáculo é só declarado, abstrato ("não podíamos
  ficar juntos por causa disso")
- **Deriva:** o tabu existe só na fala dos personagens, nunca em
  consequência mostrada

### Marca 6 — Humor ácido como armadura
- **Aprovado se:** a ironia é mais afiada quando o personagem está exposto, e
  a narração nunca comenta o humor
- **Reprovado se:** qualquer meta-comentário ("ela disse, brincando")
- **Deriva:** humor como alívio cômico solto, desconectado da vulnerabilidade

### Marca 7 — O capítulo fecha no gesto que abre um loop
- **Aprovado se:** a última linha é uma reação física E deixa um loop aberto
  (pergunta sem resposta, fio para o próximo capítulo, consciência dupla)
- **Reprovado se:** o capítulo fecha na frase que entrega o fato, numa conversa
  que resolve a tensão em voz alta, OU num gesto que encerra todas as pontas
- **Deriva:** capítulo que amarra tudo; último parágrafo explicativo ("e foi
  assim que tudo mudou")

---

## Régua de registro (universal — cheque sempre, em qualquer projeto)

Sinalize qualquer violação destas, mesmo que não derrube o score das marcas:

- Não está em primeira pessoa do presente (a menos que o projeto atual
  defina outro tempo/pessoa verbal)
- **Uso de "a gente"** (deve ser "nós") — em narração OU diálogo de
  QUALQUER personagem, sem exceção. Cuidado com falsos negativos: "a
  gente" seguido de palavra começando com de/da/do/que/como pode
  passar despercebido em verificação automática por substring — releia
  manualmente.
- **Device proibido:** personagem dizendo "a gente" e se autocorrigindo,
  ou citando "a régua"/quebrando a quarta parede sobre a própria
  gramática do livro. Se aparecer, a correção é remover o trecho
  inteiro, nunca só trocar a palavra.
- Excesso de frases de efeito (mais de uma tirada de microfone a cada
  poucos parágrafos)
- Vocabulário "institucional" ou excesso de termo jurídico fora de
  contexto
- **Nomes/mundo de outro livro da casa vazando para o projeto atual**
  (ex.: um personagem, símbolo ou local que pertence a outra série)
- Regionalismo/sotaque fora do que o projeto atual define para o
  cenário (alguns livros da casa são ambientados fora do Brasil e
  proíbem brasileirismo; outros são ambientados no Brasil e o exigem —
  confirme qual é o caso do projeto atual)

---

## Observações de mundo (do projeto atual — não contam no score)

Sinalize, como observação, qualquer regra fixa que o project_dna.md do
projeto atual definir (ex.: nenhum dos lados do conflito é vilão
caricato; cuidado com clichê de salvador; POV misturado no mesmo
capítulo; devoção que vira controle/toxicidade). As regras fixas
específicas mudam por projeto — confirme contra o project_dna.md atual
em vez de assumir as do template.

---

## Formato do relatório

```
CAPÍTULO/TRECHO: [identificação]
SCORE: [X]/[7 ou denominador ajustado, conforme a lista do projeto atual]
MARCAS N/A: [lista, se houver, com motivo]
STATUS: APROVADO (≥ ~78% das marcas aplicáveis) | DEVOLVER COM NOTAS

MARCAS APROVADAS: [lista numérica]

MARCAS COM DESVIO:
  - Marca [N] — [trecho/parágrafo citado]:
    PROBLEMA: [descrição objetiva]
    INSTRUÇÃO: [como corrigir, com exemplo se útil]

RÉGUA DE REGISTRO: [ok | lista de violações]

OBSERVAÇÕES DE MUNDO (não contam no score):
  - [conforme regras fixas do projeto atual, se houver]
```

---

## Regra de aprovação

- **Score ≥ ~5,5/7** (ou ~78% das aplicáveis, no denominador do projeto
  atual): aprovado. Pode seguir para o próximo capítulo ou para a
  revisão global.
- **Abaixo disso:** devolver com notas. Se esta skill estiver em conjunto com
  `bia-ferreira-chapter-writer` (autovalidação), reescreva os trechos com
  desvio imediatamente, aplicando a instrução de cada marca reprovada, e
  valide de novo antes de entregar ao usuário.
