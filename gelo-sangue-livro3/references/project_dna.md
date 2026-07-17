# DNA do Projeto — Gelo e Sangue, Livro 3: Raiz (R.B. Guidenelli)

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md). Paleta/textura
  da casa mantida; a imagem-concept da capa deste livro combina o frio
  do L1 e o vermelho-sangue do L2 com um terceiro elemento novo: uma
  muda de árvore brotando na rachadura do gelo (ver seção 6).

## 1. Estilo e Voz (as 7 marcas — herdadas dos Livros 1 e 2, mesmo elenco)
1. **Provocação que vira confissão** — a alfinetada mais afiada entrega,
   sem querer, o que o personagem protege.
2. **Controle como linguagem corporal** — poder/posse ou a falta dele
   mostrados em micro-gesto ou objeto (a bússola quebrada de Dante, o
   cachecol vermelho de Isa, agora também a muda de árvore plantada
   pelos dois), nunca declarado em abstrato.
3. **Raízes que seguram em vez de prender** — o tema deste volume:
   pertencimento escolhido (time, família, lugar) como oposto do
   controle herdado. Cada capítulo deve mostrar algum tipo de raiz
   sendo lançada ou testada.
4. **A máscara pública esconde a ferida privada** — Baz continua
   "herói" na mídia até a escalada do Ato 2; Grant Vance mantém a
   fachada de "pai preocupado" até a própria queda; Marco termina de
   integrar a máscara de "pai frustrado" com a pessoa real por trás.
5. **O proibido/o custo continua tendo preço visível** — a vitória
   esportiva e o ganho legal têm custo emocional real (exposição
   pública, luto ambíguo por Grant, medo residual mesmo depois da
   ameaça desaparecer).
6. **Humor ácido como armadura** — mantido como ferramenta de
   reconstrução, mais raro nos capítulos do meio do livro (dark
   moment), retomado com mais leveza no epílogo.
7. **O capítulo fecha no gesto que abre um loop** — mesma regra do
   L1/L2: última linha é reação física, não resolução verbal. Loop
   suave na maioria, cliffhanger forte em ~30%. O Epílogo é a ÚNICA
   exceção autorizada — pode fechar em resolução mais explícita, por
   ser o fim da trilogia (mas ainda evitar resumo/declaração vazia).

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem (nem popular, nem criança, nem vilão).
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo,
  citando "a régua", ou "se ouvindo" falar errado. Isso inclui a
  narração comentando que "não corrigiu" a fala de alguém — já é
  quebra de quarta parede. Se surgir o impulso, reescrever a fala
  limpa.
- Falsos positivos permitidos (whitelist do gate): "essa gente",
  "esta gente", "toda gente", "nossa gente", "muita gente", "tanta
  gente", "gente demais", "gente de/da/do/que/como" (= pessoas).
- TODO capítulo passa pelo gate ANTES de ser registrado, E por
  varredura manual `grep -n "a gente"` E por regex de texto
  normalizado (`re.sub(r'\s+',' ',texto)`) — o gate tem bug conhecido
  de substring que pode mascarar hit real perto de frase whitelisted,
  ou hit dividido por quebra de linha do markdown. HIT = corrigir e
  revalidar. Sem exceção.
- **LIÇÃO DA SESSÃO ANTERIOR (L2):** o erro mais recorrente do modelo
  foi justamente escrever "a gente" em fala de personagem secundário
  "realista"/coloquial (pai, treinador, amigo) achando que soa mais
  natural. NÃO SOA — a régua da casa vale para QUALQUER personagem,
  sem exceção de registro social. Escrever "nós" desde a primeira
  versão, nunca como correção posterior.
- **Nota de ambientação:** cenário majoritariamente Fort McMurray,
  Alberta (Canadá), com trechos possíveis em Toronto (julgamento) —
  livro escrito em português para o público brasileiro.

## 3. HEAT
- Registro: **explícito-elegante** (mostra o ato, sensorial + emocional,
  sem vulgaridade/termo clínico, sem fade to black) — mesmo registro
  dos L1/L2.
- Cadência-alvo: **80/20** (~12 cenas em 60 capítulos) — mesma
  proporção da série.
- Janela da primeira cena: livre desde o cap. 1 (Dante e Isa já moram
  juntos desde o fim do L2) — mas a PRIMEIRA cena do livro deve estar
  emocionalmente ancorada (ex.: véspera do julgamento/final, não
  cena gratuita de abertura).
- Regra de gap máximo: nunca mais de 5-6 capítulos sem oportunidade
  real DEPOIS da primeira cena — mas nunca forçar cena que contradiga
  o beat da trama (luto por Grant, semana do julgamento = janelas sem
  cena por design, não desvio).
- Nenhuma cena nos capítulos de clímax (final de acesso, revelação da
  morte de Grant, confronto final com Baz) — mesma regra revisada da
  série.
- Cena(s) no Epílogo permitidas e incentivadas (fechamento do arco
  físico do casal, tom mais solar).
- Nunca gratuito: cada cena avança a relação.

## 4. Formato
- **60 capítulos numerados + 1 Epílogo** (61 arquivos no total) — o
  Epílogo é reservado especificamente para este volume, conforme
  planejado desde o L2.
- Extensão: modelo (a) — número fixo por capítulo: **~950-1100
  palavras/cap**, total estimado **~58.000-67.000 palavras** (60
  capítulos + epílogo um pouco mais longo, ~1200-1500 palavras) —
  mesmo modelo dos L1/L2.
- **ESCREVER CADA CAPÍTULO JÁ NA EXTENSÃO-ALVO DESDE A PRIMEIRA
  VERSÃO** — no L2, o manuscrito foi entregue abaixo da meta (43k
  palavras) e precisou de uma passada inteira de reforço depois da
  rejeição do dono. Não repetir esse erro: nunca fechar um capítulo
  abaixo de ~900 palavras nem cortar uma cena de heat planejada
  "para depois".
- Cabeçalho do arquivo: `# Raiz — Capítulo N` + `### POV: Nome`
  (o formatter converte em subtítulo discreto na diagramação). O
  epílogo usa `# Raiz — Epílogo` + `### POV: Nome`.
- Arquivos: `outputs/conteudo/raiz-capituloNN.md` (NN = 01..60) e
  `outputs/conteudo/raiz-epilogo.md`.

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual + regex normalizado)
- [ ] Extensão dentro da faixa (~900-1150 palavras; abaixo disso = não
      registrar, expandir antes)
- [ ] POV correto (Dante ímpar / Isa par) e 1ª pessoa presente — Baz
      nunca tem capítulo de POV próprio
- [ ] Abertura forte + fechamento que vira o chão
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livro3.md) e com os Livros
      1 e 2 (canon-livro3.md) — NUNCA contradizer fatos já registrados,
      incluindo nomes fictícios de time (Boston Griffins, Toronto
      Comets, Fort McMurray Oil Barons)
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das 7 marcas (≥5,5/7) →
      registrar; abaixo → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default =
  R.B. Guidenelli), prompt de capa no branding da casa adaptado à
  imagem-conceito deste livro: síntese visual da trilogia — gelo
  rachado (L1) com o fio vermelho-sangue na rachadura (L2), e agora
  uma pequena muda de árvore brotando exatamente no ponto de encontro
  das duas rachaduras, símbolo de raiz nova crescendo do que antes
  era só ferida — mesmo acento em ouro envelhecido, sem casal em pose
  romântica, sem rosto explícito. Metadados: série "Gelo e Sangue",
  series_index 3.
