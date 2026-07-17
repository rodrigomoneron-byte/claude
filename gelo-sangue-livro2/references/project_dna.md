# DNA do Projeto — Gelo e Sangue, Livro 2: Sangue (R.B. Guidenelli)

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md). Paleta/textura
  da casa mantida; a imagem-concept da capa deste livro é de tundra/
  aurora/torres de petróleo de Fort McMurray, com um fio vermelho
  cortando o gelo (ver seção 6).

## 1. Estilo e Voz (as 7 marcas — herdadas do Livro 1, mesmo elenco)
1. **Provocação que vira confissão** — a alfinetada mais afiada entrega,
   sem querer, o que o personagem protege.
2. **Controle como linguagem corporal** — poder/posse ou a falta dele
   mostrados em micro-gesto ou objeto (a bússola quebrada de Dante, a
   paleta de cores de Isa agora mais viva, o silêncio antes de uma
   carta ser aberta), nunca declarado em abstrato.
3. **Proximidade reconquistada aos poucos** — o slow burn do Livro 1 dá
   lugar a uma reconstrução medida: confiança que precisa ser provada de
   novo, não retomada de onde parou por decreto.
4. **A máscara pública esconde a ferida privada** — Baz continua
   "herói" na mídia; Dante aprende a existir sem a máscara de "atleta
   invencível"; Marco Marchetti tem a própria máscara de pai frustrado
   rachando.
5. **O proibido/o custo continua tendo preço visível** — mesmo livres
   fisicamente um do outro, cada risco (contato, viagem, reencontro)
   ainda custa algo concreto — não é "final feliz automático" só porque
   Baz está longe.
6. **Humor ácido como armadura** — Dante e Isa mantêm a ironia seca como
   escudo emocional, agora também como ferramenta de reconstrução
   (fazer graça do próprio colapso); nunca a narração comenta que foi
   piada.
7. **O capítulo fecha no gesto que abre um loop** — mesma regra do L1:
   última linha é reação física, não resolução verbal. Loop suave na
   maioria, cliffhanger forte em ~30%.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem (nem popular, nem criança, nem vilão).
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo,
  citando "a régua", ou "se ouvindo" falar errado. Isso inclui a
  narração comentando que "não corrigiu" a fala de alguém — já é
  quebra de quarta parede. Se surgir o impulso, reescrever a fala
  limpa.
- Falsos positivos permitidos (whitelist do gate): "essa gente",
  "esta gente", "toda gente", "nossa gente", "muita gente", "gente
  demais" etc.
- TODO capítulo passa pelo gate ANTES de ser registrado, E por
  varredura manual `grep -n "a gente"` (o gate tem bug conhecido de
  substring — window de 12 caracteres pode mascarar hit real perto de
  frase whitelisted). HIT = corrigir e revalidar. Sem exceção.
- **Nota de ambientação:** cenário passa a ser majoritariamente Fort
  McMurray, Alberta (Canadá), com trechos em Boston/Toronto — livro
  escrito em português para o público brasileiro; mesma liberdade de
  registro coloquial do L1 (contrações e calor de fala são permitidos;
  gíria muito regional brasileira tipo "mano"/"só que não" ainda deve
  ser evitada por destoar do cenário).

## 3. HEAT
- Registro: **explícito-elegante** (mostra o ato, sensorial + emocional,
  sem vulgaridade/termo clínico, sem fade to black) — mesmo registro do
  L1.
- Cadência-alvo: **80/20** (~12 cenas em 60 capítulos) — mesma proporção
  do L1 (decisão travada no onboarding do L2).
- Janela da primeira cena: **mais cedo que no L1** — não é mais slow
  burn do zero, Dante e Isa já se amam e já tiveram intimidade no L1;
  a primeira cena deste livro acontece no reencontro físico em Fort
  McMurray, estimado entre os **caps 21-26** (ver arco-trama-livro2.md,
  Ato 2), como a cena de reconexão depois da separação forçada do Ato 1.
- Regra de gap máximo: nunca mais de 5-6 capítulos sem oportunidade real
  DEPOIS da primeira cena — mas nunca forçar cena que contradiga o beat
  da trama. Ato 1 (separação física, cartas) não tem cena por design —
  a ausência DE cena no Ato 1 é o ponto (distância real, não
  performada).
- Cena(s) no Ato 3 permitidas se emocionalmente justificadas pelo beat
  exato do capítulo (mesma regra revisada do L1), evitando o capítulo
  do clímax do jogo de acesso em si.
- Nunca gratuito: cada cena avança a relação (reconstrução de confiança,
  entrega, medo compartilhado) — nunca é sedução calculada.

## 4. Formato
- **60 capítulos** (sem epílogo neste volume — fecha em ponto de
  tensão/reviravolta nova, epílogo reservado para o Livro 3 da
  trilogia).
- Extensão: modelo (a) — número fixo por capítulo: **~950-1100
  palavras/cap**, total estimado **~57.000-66.000 palavras** — mesmo
  modelo do L1 (decisão travada no onboarding do L2).
- Cabeçalho do arquivo: `# Sangue — Capítulo N` + `### POV: Nome`
  (o formatter converte em subtítulo discreto na diagramação).
- Arquivos: `outputs/conteudo/sangue-capituloNN.md` (NN = 01..60).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado)
- [ ] POV correto (Dante ímpar / Isa par) e 1ª pessoa presente — mesma
      regra do L1, Baz nunca tem capítulo de POV próprio
- [ ] Abertura forte + fechamento que vira o chão
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livro2.md) e com o Livro 1
      (canon-gelo-livro1.md do projeto irmão) — NUNCA contradizer fatos
      já registrados no L1, incluindo os nomes fictícios de time
      (Boston Griffins, Toronto Comets, Fort McMurray Oil Barons)
- [ ] Baz nunca tem capítulo de POV próprio
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das 7 marcas (≥5,5/7) →
      registrar; abaixo → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default =
  R.B. Guidenelli), prompt de capa no branding da casa (paleta "Old
  English Gentleman's Club") adaptado à imagem-conceito deste livro:
  tundra ártica industrial de Fort McMurray — silhuetas de torres de
  extração de petróleo ao fundo sob aurora boreal fria, um rinque de
  gelo ao ar livre em primeiro plano, um fio fino vermelho-sangue
  atravessando uma rachadura no gelo (sangue/vínculo familiar/o preço
  pago), com o mesmo acento quente pontual em ouro envelhecido da
  bússola quebrada — sem casal em pose romântica, sem rosto explícito.
  Metadados: série "Gelo e Sangue", series_index 2.
