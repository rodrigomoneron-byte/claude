# DNA do Projeto — Família Bittencourt, Livro 3 (R.B. Guidenelli)

> Preenchido no onboarding em 2026-08-03. Terceiro e ÚLTIMO livro da
> trilogia — protagonizado por Dona Sofia Bittencourt, fechando a
> série com um romance de segunda chance/sênior, categoria nova pro
> catálogo.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli**.
- Capa: tom diferente dos Livros 1-2 (nem glamour corporativo, nem
  Lisboa/Alfama) — sugestão: elegância madura, calor doméstico, luz
  dourada de fim de tarde, talvez incorporando os símbolos acumulados
  da trilogia (taça + andorinha) de forma discreta, mais um elemento
  novo deste livro.

## 1. Estilo e Voz — marcas herdadas, reapontadas pra Dona Sofia
1. **Fachada que racha em público** — invertida de novo: Dona Sofia
   NUNCA teve fachada pública quebrável (ela é a própria instituição
   da família) — a marca aqui é a fachada PRIVADA de "estou bem, não
   preciso de mais nada" rachando pela primeira vez.
2. **Status como armadura** — ela é status personificado (matriarca);
   o arco é sobre existir como pessoa por trás do papel.
3. **Slow burn medido em permissão que ela mesma não se dá** — mais
   contido e mais lento que os Livros 1-2, ritmo emocional condizente
   com personagens mais velhos, menos pressa dramática.
4. **Rivalidade vira atração** — não se aplica necessariamente aqui;
   pode ser substituída por "desconforto inicial vira ternura" se
   fizer mais sentido pro par romântico deste livro.
5. **Preço visível** — o preço de Dona Sofia é reputação/imagem
   dentro do próprio círculo social e a reação real da família.
6. **Humor leve como alívio** — humor seco, mordaz, já estabelecido
   como traço dela nos Livros 1-2; usar com carinho, não caricatura.
7. **Capítulo fecha no gesto que reabre o jogo** — herdado, mas o
   "jogo" final da trilogia pode se resolver em serenidade no
   epílogo, não precisa reabrir conflito novo ali.

## 2. RÉGUA ABSOLUTA — NÃO MUDA
- SÓ "nós", NUNCA "a gente" — mesma trava mecânica dos Livros 1-2.
- `regua_gate.py` + grep manual em todo capítulo antes de registrar.

## 3. CHECKPOINT DE CADÊNCIA E PROCESSO DE ESCRITA — status honesto
Nos Livros 1 e 2, a taxa de capítulos precisando de expansão de
emergência ficou em 100% em praticamente todos os atos, independente
da técnica tentada (mirar mais alto, abertura mais substancial,
critério numérico de parágrafos). CONCLUSÃO ACUMULADA DE 2 LIVROS: a
trava dura no `loop_state.py record` é a única coisa que funciona de
forma confiável — ela não reduz o número de rodadas de expansão, mas
garante que nenhum capítulo saia do livro abaixo do piso. Pra este
livro, NÃO gastar esforço tentando mais uma técnica nova de "escrever
mais grosso de primeira" — aceitar o processo de 2 chamadas como
está, confiar na trava dura, e focar a energia em qualidade de prosa
em vez de tentar resolver um problema que já foi testado e não cedeu.

## 4. Cadência de heat — AJUSTADA pra este livro
Romance sênior/segunda chance pede registro DIFERENTE dos Livros 1-2:
mais peso em intimidade emocional, contato físico não-explícito
(mãos, proximidade, um beijo que carrega mais peso que uma cena
inteira nos livros anteriores) do que em cenas de heat explícitas.
- Meta: 3-5 cenas ao longo do livro (bem menos que os ~10 dos Livros
  1-2), registro MENOS explícito — sugestão "fade-to-warm": a cena
  pode começar explícita em tensão/desejo mas fechar ANTES do detalhe
  anatômico completo, focando no que é dito/sentido mais que no que é
  descrito fisicamente. Ajustável na escrita conforme o tom natural
  dos personagens pedir — não forçar nem uma cena explícita completa
  nem fade-to-black total, encontrar o meio-termo que a bíblia sugere.
- Gap: sem meta rígida de "cena até o capítulo X" — a intimidade deste
  casal desenvolve no próprio tempo, mais devagar que os livros
  anteriores por design.

## 5. Formato
- ~55-58 capítulos (pode esticar um pouco mais que os livros
  anteriores pra acomodar o epílogo de fechamento da trilogia), POV
  dual — Dona Sofia (ímpar) / novo interesse romântico (par), primeira
  pessoa do presente.
- Extensão: 950-1100 palavras/capítulo, total ~55.000-58.000 palavras
  + epílogo.
- COM epílogo (diferente dos Livros 1-2) — fecha a trilogia inteira.

## 6. Pipeline operacional
1. ESCREVER (bia-ferreira-chapter-writer) — processo de 2 chamadas
   padrão, sem nova técnica experimental (ver seção 3).
2. RÉGUA (regua_gate.py) — trava dura.
3. VALIDAR (bia-ferreira-voice-validator) — score /7 contra as marcas
   adaptadas deste livro.
4. Falha não-estrutural → auto-revisar (máx. 2) → aprovado com ressalva.
5. REGISTRAR (loop_state.py record) — trava dura.
6. Repetir até completar todos os capítulos + epílogo.
7. bia-ferreira-editor-global — atenção à continuidade com os Livros
   1-2 (fatos herdados: recuperação de Dona Sofia, arcos de Isabela/
   Leo e Pedro/Inês) e a reunir o elenco da trilogia inteira no
   fechamento sem contradição.
8. bia-ferreira-formatter — capa nova, tom próprio deste livro.

## 7. Símbolos
Criar símbolo próprio pra Dona Sofia na escrita — ideia sugerida (não
travada): algo ligado ao próprio casamento dela com Otávio, recuperado
ou reinterpretado (ex: um objeto que ela guardou sem nunca mais usar
depois da viuvez, redescoberto). No epílogo/clímax final, considerar
um gesto que reúna conscientemente os três símbolos da trilogia (taça,
andorinha, o novo) sem forçar list de inventário.

## 8. Decisões via AskUserQuestion — registro
O usuário pediu diretamente "fechar trilogia", sem especificar
protagonista — decisão editorial (não pergunta enviada) de fechar com
Dona Sofia, justificada por: (1) os dois netos já resolveram os
próprios arcos românticos nos Livros 1-2, fechar com a matriarca dá um
arco de encerramento temático real à série inteira, não só "mais um
casal"; (2) ela é personagem plenamente estabelecida havia 2 livros,
com voz e história já ricas, reduzindo o risco de um protagonista
"forçado" só pra fechar número de volumes; (3) romance sênior é
categoria de mercado real e reconhecida (Kindle Unlimited inclusive),
coerente com o público-alvo do briefing original da série. Ajustável
se o usuário preferir outra direção ao ver o resultado.
