> Especificações técnicas (EPUB/PDF) são universais para qualquer livro
> da casa. Só o "Autor" e os metadados de série/título variam por
> projeto — confirme sempre com o project_dna.md do projeto atual.

# Especificações Técnicas KDP — R.B. Guidenelli (ex-"Bia Ferreira")

## EPUB

- Versão: EPUB 3.0
- Ferramenta recomendada: `ebooklib` (Python, pip-installable, sem
  dependências de sistema)
- Metadados obrigatórios:
  - Título e subtítulo
  - Autor: "R.B. Guidenelli" (pseudônimo atual da casa; confirme com
    o usuário se este projeto usa outro nome/pseudônimo)
  - Série: nome da série + número do volume (1, 2, 3...) — usar
    placeholder se ainda não definido
  - Idioma: pt-BR
  - Identificador (ISBN — usar placeholder se o usuário não fornecer,
    ex: `urn:uuid:` gerado automaticamente)
  - Categoria sugerida KDP: Romance > New Adult / Contemporâneo
- Sumário (TOC): clicável, lista todos os capítulos + epílogo
- Estilo (CSS embutido no EPUB):
  - Fonte do corpo: serif (ex: Georgia, "Bookerly", ou fallback serif)
  - Tamanho base: 1em (deixe o leitor de ebook controlar o zoom —
    NUNCA fixar em px)
  - Margens internas: ~1.5em laterais, ~1.5em topo/base
  - Travessão de diálogo: usar — (em-dash), nunca - (hífen simples)
  - Itálico preservado para ênfase/pensamento interno

## PDF (paperback KDP — 6" x 9")

- Tamanho de página: 6 x 9 polegadas = 432 x 648 pontos
- Margens (orientação retrato, considerando encadernação):
  - Externa (outer): 0.5"
  - Interna/lombada (inner/gutter): 0.75" — maior para acomodar a
    encadernação; para manuscritos com 300+ páginas, considerar 0.875"
  - Topo: 0.6"
  - Base: 0.6" (espaço para número de página)
- Fonte do corpo: serif (Georgia, Times, ou fonte embutida equivalente),
  11pt, espaçamento entre linhas ~1.4
- Fonte de títulos de capítulo: mesma família ou sans-serif leve, 18pt,
  peso médio, com espaço generoso antes do texto (capítulo sempre
  começa em página nova)
- Numeração de página: rodapé centralizado, numeração árabe começando
  no Capítulo 1 (página de título, sumário e página de direitos não são
  numeradas ou usam numeração romana)
- Cada capítulo começa em página nova (page break antes do título)

## Marcação de POV no arquivo de entrada

Os capítulos do manuscrito usam um cabeçalho de POV (ex: `### POV:
Sloane`) durante a escrita. Para o produto final, decida com o usuário:
- Remover a linha de POV por completo, OU
- Convertê-la em um subtítulo discreto (ex: itálico pequeno sob o
  título do capítulo).
Nunca deixar a marcação crua "### POV:" no EPUB/PDF do leitor.

## Estrutura do manuscrito de entrada

Cada capítulo deve existir como um arquivo markdown separado, nomeado
com prefixo numérico para ordenação (`01_capitulo.md`, `02_capitulo.md`,
..., `99_epilogo.md`). O arquivo deve começar com:

```markdown
# Capítulo 1

Texto do capítulo, parágrafos separados por linha em branco.

— Diálogo usa travessão.

*Itálico* para ênfase ou pensamento interno, se necessário.
```

Um arquivo `metadata.json` na mesma pasta define os metadados gerais:

```json
{
  "title": "TÍTULO DO LIVRO",
  "subtitle": "Subtítulo opcional",
  "series": "NOME DA SÉRIE",
  "series_index": 1,
  "author": "R.B. Guidenelli",
  "language": "pt-BR",
  "identifier": "urn:uuid:GERAR-AUTOMATICAMENTE-SE-AUSENTE",
  "description": "Sinopse curta para metadados do EPUB."
}
```

## Checklist de entrega final

- [ ] `livro_X.epub` — abre sem erros, sumário funcional
- [ ] `livro_X_kdp.pdf` — 6x9", margens corretas, cada capítulo em
      página nova, numeração de página presente
- [ ] `prompt_capa_livro_X.txt` — prompt completo (ver
      `references/capa-prompt-guia.md`)
- [ ] `metadados_livro_X.json` — todos os campos preenchidos
- [ ] `relatorio_formatacao.txt` — confirma contagem de capítulos,
      contagem aproximada de palavras, régua "a gente" limpa, e que
      nenhum capítulo ficou de fora
