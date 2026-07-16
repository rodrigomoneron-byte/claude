# DNA do Projeto — [Título da Série] (R.B. Guidenelli)

> Preencha cada seção abaixo. Isso é o que faz o motor genérico
> (skills da casa) virar a voz deste livro específico. As skills
> fixadas na raiz do repo NUNCA devem ser editadas por projeto — tudo
> que varia por livro mora aqui.

## 0. Pseudônimo e branding
- Autor público: **R.B. Guidenelli** (conceito "The Old English
  Gentleman's Club" — ver references/branding-rbg.md).
- [Se esta série usar outro pseudônimo/conceito visual, defina aqui.]

## 1. Estilo e Voz (as 7 marcas — preencher ou herdar do template)
> O template original das skills tem 7 marcas ilustradas com o
> primeiro livro da casa (provocação-confissão, status corporal, slow
> burn de proximidade negada, etc — ver
> `.claude/skills/bia-ferreira-chapter-writer/references/marcas-completo.md`).
> Um livro já trocou essa lista inteira mantendo o espírito da casa
> (ver `livro3/references/project_dna.md` como segundo exemplo real).
> Decida: herdar o template, ou definir a lista de 7 marcas própria
> deste livro. Preencha abaixo:

1. **[Marca 1]** — [definição operacional]
2. **[Marca 2]** — [definição operacional]
3. **[Marca 3]** — [definição operacional]
4. **[Marca 4]** — [definição operacional]
5. **[Marca 5]** — [definição operacional]
6. **[Marca 6]** — [definição operacional]
7. **[Marca 7]** — [definição operacional]

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
  substring). HIT = corrigir e revalidar. Sem exceção.

## 3. HEAT (definir o registro e a cadência DESTE livro)
- Registro: **[fade-to-black | explícito-elegante]** — escolher um.
- Cadência-alvo: **[ex.: "80/20", "1 cena a cada N capítulos"]**.
- Janela da primeira cena: **[ex.: "a partir do cap X"]**.
- Regra de gap máximo: **[ex.: "nunca mais de N caps sem oportunidade"]**
  — mas nunca forçar cena que contradiga o beat da trama (ex.: durante
  ruptura ativa entre o casal).
- Nunca gratuito: cada cena avança a relação (trégua, reconciliação,
  entrega, celebração, sobrevivência).

## 4. Formato
- **[N_CAPS] capítulos** ([N_CAPS-1] + Epílogo, ou conforme a bíblia).
- Extensão: **[escolher UM modelo]**
  - (a) Número fixo por capítulo: "~X-Y palavras/cap, total ~[X*N]-[Y*N]k"
  - (b) Total do livro com capítulos variáveis: "~X-Yk palavras totais,
    alcançado com ~N capítulos de densidade natural (não inflar para
    bater número fixo por capítulo)"
- Cabeçalho do arquivo: `# Livro [N] — Capítulo N` + `### POV: Nome`
  (o formatter converte em subtítulo discreto na diagramação).
- Arquivos: `outputs/conteudo/livroN-capituloNN.md` (NN = 01..[N_CAPS]).

## 5. Marcas de Qualidade / Checklist de Validação (por capítulo)
- [ ] Régua limpa (gate = LIMPO + grep manual confirmado)
- [ ] POV correto e tempo verbal correto
- [ ] Abertura forte + fechamento que vira o chão
- [ ] Pelo menos 1 imagem concreta ancorando emoção
- [ ] Continuidade com a bíblia (arco-trama-livroN.md) — NUNCA contradizer
      decisões travadas
- [ ] Heat: cadência monitorada contra a meta da seção 3
- [ ] Score mínimo de aprovação: ~78% das marcas aplicáveis → registrar;
      abaixo → revisar antes

## 6. Requisitos de Formatação (fase final)
- EPUB 3.0 + PDF 6"x9" KDP via bia-ferreira-formatter (autor default =
  R.B. Guidenelli), prompt de capa no branding da casa (ver
  references/branding-rbg.md) + imagem-conceito específica deste livro
  (decidir na bíblia ou no onboarding), metadados com série e
  series_index corretos.
