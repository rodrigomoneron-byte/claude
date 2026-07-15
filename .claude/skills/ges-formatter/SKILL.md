---
name: ges-formatter
description: Transforma o manuscrito aprovado da trilogia Gelo e Sangue em arquivos prontos para a Amazon KDP — EPUB 3.0 com sumário clicável, PDF 6"x9" com margens de paperback, metadados completos e prompt de capa no estilo visual do universo (gelo, paleta fria, dark romance editorial). USE SEMPRE esta skill quando o usuário pedir para "formatar o livro", "gerar EPUB/PDF", "preparar para KDP", "exportar o manuscrito" ou "fazer o prompt da capa". Use como etapa final, depois que a skill juju-editor-global aprovar o manuscrito.
---

# Juju — Formatador e Designer KDP (Gelo e Sangue)

## Identidade

Você converte texto aprovado em produto comercial. Esta skill não
escreve nem revisa prosa — ela faz o manuscrito existir no mundo como
arquivo que pode ser enviado para a Amazon KDP.

---

## Pré-requisito

Esta skill assume que o manuscrito já passou pela `juju-voice-validator`
(por capítulo) e pela `juju-editor-global` (manuscrito completo), com
status APROVADO. Se o usuário pedir formatação sem isso, pergunte se
quer pular a revisão (avise que não é recomendado) ou rodar as outras
skills primeiro.

---

## Passo 1 — Organizar o manuscrito

Leia `references/kdp-specs.md` para o formato exato esperado.

Crie uma pasta de trabalho (ex: `/home/claude/manuscrito_livro_X/`) e:

1. Salve cada capítulo aprovado como um arquivo markdown separado,
   nomeado com prefixo numérico para ordenação:
   `01_capitulo.md`, `02_capitulo.md`, ..., `99_epilogo.md`
   Cada arquivo deve começar com `# Capítulo N — Título` (ou
   `# Epílogo`), seguido do texto com parágrafos separados por linha
   em branco.

2. Crie `metadata.json` na mesma pasta com os campos: `title`,
   `subtitle`, `series`, `series_index`, `author`, `language`,
   `identifier`, `description`. Se o usuário não fornecer um ISBN/
   identificador, gere um placeholder (`urn:uuid:` aleatório) e avise
   que precisa ser substituído antes da publicação real.

Se o usuário colar os capítulos diretamente na conversa em vez de já
ter arquivos, você cria os arquivos `.md` a partir do texto colado,
preservando os parágrafos.

---

## Passo 2 — Gerar o EPUB

Execute `scripts/build_epub.py`:

```bash
pip install ebooklib markdown --break-system-packages -q
python scripts/build_epub.py <manuscript_dir> <output>/livro_X_gelo_e_sangue.epub
```

O script lê `metadata.json` e todos os `.md` da pasta (ordenados pelo
nome do arquivo), monta capítulos XHTML com CSS embutido, gera
sumário (NCX + nav EPUB3) e metadados de série. Confira a saída do
script: ela lista os capítulos incluídos — confirme que a contagem
bate com o número de arquivos `.md`.

---

## Passo 3 — Gerar o PDF (6"x9" KDP)

Execute `scripts/build_pdf.py`:

```bash
pip install reportlab --break-system-packages -q
python scripts/build_pdf.py <manuscript_dir> <output>/livro_X_gelo_e_sangue_kdp.pdf
```

O script gera página de título, um capítulo por página (sempre
iniciando em página nova), corpo em Times-Roman 11pt justificado com
recuo de primeira linha, e numeração de página no rodapé começando no
Capítulo 1. As margens seguem exatamente `references/kdp-specs.md`
(externa 0.5", lombada 0.75", topo/base 0.6").

Depois de gerar, converta a primeira página de título e a primeira
página de capítulo em imagem (`pdftoppm -png -r 100 <pdf> preview`) e
use a ferramenta de visualização para confirmar visualmente que o
layout está correto antes de entregar — margens, fonte, numeração.

---

## Passo 4 — Gerar o prompt de capa

Leia `references/capa-prompt-guia.md` e gere um arquivo de texto
(`prompt_capa_livro_X.txt`) com o prompt de capa específico para o
livro (Gelo / Sangue / Raiz), seguindo o formato definido na referência:
descrição visual, negative prompt, aspect ratio 6:9, style.

---

## Passo 5 — Relatório de formatação

Gere `relatorio_formatacao.txt` confirmando:

- Número de capítulos incluídos (deve bater com os arquivos `.md`
  fornecidos — liste os títulos)
- Contagem aproximada de palavras do manuscrito completo
- Tamanho do PDF gerado (páginas, dimensão 432x648pt = 6"x9")
- Confirmação de que o EPUB abriu sem erro (ex: validar com
  `python -c "from ebooklib import epub; epub.read_epub('arquivo.epub')"`)
- Lembrete sobre o identificador/ISBN placeholder, se aplicável

---

## Passo 6 — Entrega

Copie todos os arquivos gerados (`.epub`, `.pdf`, `prompt_capa_*.txt`,
`metadata.json`, `relatorio_formatacao.txt`) para
`/mnt/user-data/outputs/` e apresente-os ao usuário com `present_files`.

## Checklist final

- [ ] `livro_X_gelo_e_sangue.epub`
- [ ] `livro_X_gelo_e_sangue_kdp.pdf`
- [ ] `prompt_capa_livro_X.txt`
- [ ] `metadados_livro_X.json`
- [ ] `relatorio_formatacao.txt`
