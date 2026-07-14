---
name: bia-ferreira-voice-validator
description: Avalia um capítulo, cena ou trecho contra as 7 marcas e a régua de registro da autora Bia Ferreira (romance de elite, famílias políticas rivais em Nova York, slow burn, primeira pessoa do presente), atribuindo um score de 0 a 7 e um relatório de desvios com localização e instrução de correção. USE SEMPRE esta skill quando o usuário pedir para "validar", "revisar a voz", "checar fidelidade", "dar nota", "ver se está no tom da Bia" ou "ver se tem deriva" em qualquer trecho do romance. Use também proativamente depois de escrever um capítulo novo com a skill bia-ferreira-chapter-writer, antes de entregar o texto como finalizado.
---

# Bia Ferreira — Validador de Voz (7 Marcas)

## Quando usar

- O usuário pede explicitamente para validar, revisar, dar nota ou checar
  deriva de um trecho
- Imediatamente após escrever um capítulo com `bia-ferreira-chapter-writer`,
  como autovalidação antes de entregar
- O usuário cola um trecho escrito por outra pessoa/ferramenta e pergunta
  "isso parece a Bia?"

---

## Como validar

1. Leia o texto completo de uma vez antes de pontuar qualquer coisa.
2. Leia `references/marcas-completo.md` para os pares ✅/❌ e a régua.
3. Percorra o checklist marca por marca, na ordem. Para cada marca, decida
   APROVADO ou COM DESVIO.
4. Para cada desvio, cite o parágrafo/frase e escreva a instrução de correção
   específica — nunca um comentário genérico como "não parece a Bia".
5. Some os pontos aprovados → score de 0 a 7.
6. Cheque a régua de registro e as observações de mundo (não contam no score,
   mas entram no relatório).
7. Monte o relatório no formato abaixo.

### Marcas não aplicáveis (N/A)

As marcas **3** (slow burn / proximidade negada) e **4** (rivalidade como
cortejo) só se aplicam a cenas em que o interesse amoroso está presente ou
sendo diretamente observado/lembrado. Em cenas sem isso (Sloane sozinha no
trabalho de campo, Auden sozinho numa manobra de poder sem pensar nela),
marque como **N/A** — não contam a favor nem contra.

Quando houver N/A, ajuste o denominador proporcionalmente (ex: se 3 e 4 são
N/A, o score é sobre 5) e registre isso. O limiar de aprovação continua sendo
~78% das marcas aplicáveis (equivalente a ~5,5/7).

---

## Checklist marca por marca (com sinais de deriva)

### Marca 1 — Provocação que vira confissão
- **Aprovado se:** a alfinetada mais afiada revela, sem querer, o que a
  protagonista protege
- **Reprovado se:** a emoção é declarada direto ("eu te odeio") sem confissão
  escondida no ataque
- **Deriva:** sarcasmo "vazio", que ataca mas não entrega nada por baixo

### Marca 2 — Status como linguagem corporal
- **Aprovado se:** poder/dinheiro mostrados em micro-gesto ou objeto
- **Reprovado se:** "a família era rica e poderosa", "ele era influente"
- **Deriva:** descrever luxo como inventário ("o lustre de cristal, o mármore
  italiano") em vez de gesto que carrega hierarquia

### Marca 3 — Slow burn medido em proximidade negada
- **Aprovado se:** a tensão mora no quase, na distância que diminui em
  centímetros, na linha não cruzada
- **Reprovado se:** a tensão se resolve em contato/beijo cedo demais, ou
  estoura a temperatura baixa
- **Deriva:** cena íntima explícita; consumação antes de o preço ser pago

### Marca 4 — Rivalidade que é cortejo disfarçado
- **Aprovado se:** a hostilidade deixa vazar a atenção (lembram detalhes
  demais, escalam para manter o outro perto)
- **Reprovado se:** os dois "simplesmente se odeiam", sem nada por baixo
- **Deriva:** briga genérica que não funciona como disfarce do interesse

### Marca 5 — O proibido tem preço visível
- **Aprovado se:** cada passo um na direção do outro custa algo concreto
- **Reprovado se:** "eles não podiam ficar juntos por causa das famílias"
  (veto declarado, abstrato)
- **Deriva:** o tabu existe só na fala dos personagens, nunca em consequência
  mostrada (doador que recua, nome cortado, vazamento)

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

## Régua de registro (cheque sempre — entra no relatório)

Sinalize qualquer violação destas, mesmo que não derrube o score das 7:

- Não está em primeira pessoa do presente
- Uso de "a gente" (deve ser "nós")
- Excesso de frases de efeito (mais de uma tirada de microfone a cada poucos
  parágrafos)
- Vocabulário "institucional" ou excesso de termo jurídico
- Qualquer brasileirismo (gíria, marca ou referência cultural BR)

---

## Observações de mundo (não contam no score)

Sinalize, como observação:

- **Política como panfleto:** se um dos lados aparece caricato/vilanizado, ou
  o texto pende para doutrina em vez de tensão humana
- **Salvador branco:** se o fio humanitário da heroína vira redenção pessoal
  dela ou usa a África como cenário exótico
- **POV misturado:** se o capítulo mistura POV de Sloane e Auden
- **Devoção tóxica:** se a proteção do herói vira controle sobre ela

---

## Formato do relatório

```
CAPÍTULO/TRECHO: [identificação]
SCORE: [X]/[7 ou denominador ajustado se houver N/A]
MARCAS N/A: [lista, se houver, ex: "3, 4 — interesse amoroso ausente na cena"]
STATUS: APROVADO (≥ ~78% das marcas aplicáveis) | DEVOLVER COM NOTAS

MARCAS APROVADAS: [lista numérica]

MARCAS COM DESVIO:
  - Marca [N] — [trecho/parágrafo citado]:
    PROBLEMA: [descrição objetiva]
    INSTRUÇÃO: [como corrigir, com exemplo se útil]

RÉGUA DE REGISTRO: [ok | lista de violações]

OBSERVAÇÕES DE MUNDO (não contam no score):
  - [política/salvador branco/POV/devoção tóxica, se houver]
```

---

## Regra de aprovação

- **Score ≥ ~5,5/7** (ou ~78% das aplicáveis): aprovado. Pode seguir para o
  próximo capítulo ou para a revisão global.
- **Abaixo disso:** devolver com notas. Se esta skill estiver em conjunto com
  `bia-ferreira-chapter-writer` (autovalidação), reescreva os trechos com
  desvio imediatamente, aplicando a instrução de cada marca reprovada, e
  valide de novo antes de entregar ao usuário.
