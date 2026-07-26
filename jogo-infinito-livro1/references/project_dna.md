# DNA do Projeto — Jogo Infinito, Livro 1: O Início do Jogo (R.B. Guidenelli)

> Preenchido no onboarding em 2026-07-26. Série nova da casa,
> inspirada no planejamento "Romance/Thriller Corporativo" (Wall
> Street, cotejo com "Billions") trazido pelo dono do projeto.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md). Mesma casa dos
  livros Gelo e Sangue; universo e elenco totalmente isolados —
  nenhum nome ou símbolo é reaproveitado.
- Paleta de capa desta série ecoa a mesma paleta oficial da casa
  (Verde Floresta Noturno, Ouro Envelhecido, Carvalho Envelhecido,
  Vinho Borgonha) — coincide com a sugestão do próprio planejamento
  original ("verde escuro estilo British Racing Green + dourado
  discreto + preto"), sem necessidade de adaptação.

## 1. Estilo e Voz (7 marcas próprias deste livro)
1. **Estratégia como linguagem corporal** — poder e controle
   aparecem em gesto/objeto/decisão calculada (uma assinatura, um
   silêncio cronometrado, uma cadeira escolhida numa sala), nunca em
   "ele era poderoso". Substitui o jargão financeiro pesado por
   comportamento.
2. **A neutralidade que já é escolha** — Cami tenta se manter
   equidistante entre Alex e Dan; cada gesto de "neutralidade" na
   verdade denuncia pra quem seu corpo já pende. A imparcialidade
   profissional é a fachada mais frágil do livro.
3. **Slow burn medido em conflito de interesse** — a proximidade
   entre Cami e Alex cresce sempre colada a uma razão profissional
   concreta (uma reunião, uma crise a apagar, um documento) — nunca
   um encontro gratuito. A tensão mora no motivo válido que esconde o
   motivo real.
4. **Rivalidade que é intimidade antiga** — as cenas entre Cami e Dan
   carregam o peso de um passado já vivido; a hostilidade profissional
   deixa vazar mágoa e afeto genuínos, nunca ódio puro.
5. **O jogo tem preço visível e concreto** — cada vantagem ganha por
   Alex, cada avanço de Dan na investigação, cada aproximação de Cami
   custa algo nomeável (um contrato, uma fonte, uma amizade, a
   confiança de alguém) — nunca "ele perdeu tudo" em abstrato.
6. **Humor ácido como blindagem executiva** — sarcasmo entre iguais de
   poder (sobretudo Alex e seu braço direito) como forma de dizer o
   que não pode ser dito formalmente; nunca comentado como piada.
7. **O capítulo fecha no gesto que reabre o jogo** — a virada chega um
   beat antes do fim; o último parágrafo é ação física ou decisão
   silenciosa que deixa um fio puxando o capítulo seguinte — nunca uma
   cena que resolve tudo.

## 2. RÉGUA ABSOLUTA (trava mecânica — regua_gate.py) — NÃO MUDA ENTRE LIVROS
- SÓ **"nós"**. NUNCA **"a gente"** — em narração NEM em diálogo de
  NENHUM personagem (nem o braço direito informal, nem o pai político,
  nem ninguém).
- PROIBIDO o device: personagem dizendo "a gente" e se corrigindo,
  citando "a régua", ou a narração comentando que "não corrigiu" a
  fala de alguém — já é quebra de quarta parede. Reescrever a fala
  limpa desde a primeira versão.
- Falsos positivos permitidos (whitelist do gate): "essa gente", "esta
  gente", "toda gente", "nossa gente", "muita gente", "tanta gente",
  "gente demais", "gente de/da/que/como" no sentido de "pessoas".
- TODO capítulo passa pelo gate ANTES de ser registrado, E por
  varredura manual `grep -n "a gente"` (o gate tem bug conhecido de
  substring, documentado nos 3 livros anteriores da casa). HIT =
  corrigir e revalidar. Sem exceção. Cenário é Nova York — zero
  brasileirismo de registro.

## 3. HEAT (registro e cadência deste livro)
- Registro: **explícito-elegante** (mesmo padrão validado nos 3 livros
  anteriores da casa — sensorial/emocional acima do mecânico, nunca
  vulgar).
- Cadência-alvo: **80/20**, ~12 cenas ao longo do livro.
- Janela da primeira cena: a partir do momento em que a proximidade
  profissional entre Cami e Alex vira contato físico com peso — não
  antes do cap. 12 aproximadamente (a atração é proibida pelo próprio
  conflito de interesse; precisa de acúmulo real antes da primeira
  cena).
- Regra de gap máximo: nunca mais de 5-6 capítulos sem oportunidade
  real — mas nunca forçar cena que contradiga o beat da trama (ex.:
  durante uma ruptura ativa ou quando Cami está genuinamente afastada
  de Alex por conflito ético).
- Nenhuma cena de heat nos capítulos de clímax do livro (confronto
  público entre Alex e Dan, exposição da investigação, virada final).
- Nunca gratuito: cada cena avança a relação e o conflito de interesse
  que a torna proibida — nunca só celebração vazia.

## 4. Formato
- **60 capítulos** (Livro 1 de uma série de 5 — sem epílogo neste
  volume: o Livro 1 fecha em gancho forte pro Livro 2; o epílogo da
  série fica reservado para o Livro 5, o fechamento final). Modelo
  herdado dos 3 livros anteriores da casa por já ser um alvo testado e
  bem-sucedido com o mesmo registro de heat.
- Extensão: modelo (a) — número fixo por capítulo: ~950-1100
  palavras/capítulo, total ~58.000-67.000 palavras. Escrever cada
  capítulo já na extensão-alvo desde a primeira versão (lição
  histórica da casa: nunca registrar abaixo de ~900 palavras nem
  deixar para uma passada de reforço depois).
- Cabeçalho do arquivo: `# Jogo Infinito — Livro 1 — Capítulo N` +
  `### POV: Nome` (o formatter converte em subtítulo discreto na
  diagramação).
- Arquivos: `outputs/conteudo/jogo1-capituloNN.md` (NN = 01..60).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado)
- [ ] POV correto (Cami ímpar / Alex par) e tempo verbal correto (1ª
      pessoa do presente)
- [ ] Abertura forte + fechamento que vira o chão (marca 7)
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livro1.md) — NUNCA
      contradizer decisões travadas
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das marcas aplicáveis → registrar;
      abaixo → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default =
  R.B. Guidenelli), prompt de capa no branding da casa (ver
  references/branding-rbg.md) adaptado à imagem-conceito deste livro:
  síntese visual do universo Wall Street/fintech — um relógio de
  bolso antigo (símbolo central do livro) rachado ou parado sobre uma
  superfície de vidro/mármore escuro refletindo luzes de arranha-céu
  desfocadas, acento em ouro envelhecido, sem casal em pose romântica,
  sem rosto explícito. Metadados: série "Jogo Infinito", series_index
  1.
