#!/usr/bin/env python3
"""
Constrói um EPUB pronto para KDP a partir de uma pasta com capítulos em
markdown + metadata.json.

Uso:
    python build_epub.py <manuscript_dir> <output.epub>

A pasta <manuscript_dir> deve conter:
    - metadata.json
    - 01_*.md, 02_*.md, ... (um arquivo por capítulo, ordenados pelo
      nome do arquivo; cada arquivo deve começar com uma linha
      "# Título do capítulo")
"""

import sys
import json
import uuid
from pathlib import Path

try:
    from ebooklib import epub
except ImportError:
    print("Instale com: pip install ebooklib markdown --break-system-packages")
    sys.exit(1)

import markdown as md


def load_metadata(manuscript_dir: Path) -> dict:
    meta_path = manuscript_dir / "metadata.json"
    if not meta_path.exists():
        raise FileNotFoundError(f"metadata.json não encontrado em {manuscript_dir}")
    with open(meta_path, encoding="utf-8") as f:
        return json.load(f)


def load_chapters(manuscript_dir: Path) -> list[dict]:
    files = sorted(manuscript_dir.glob("*.md"))
    if not files:
        raise FileNotFoundError(f"Nenhum arquivo .md encontrado em {manuscript_dir}")
    chapters = []
    for f in files:
        text = f.read_text(encoding="utf-8")
        lines = text.splitlines()
        title, body_start = None, 0
        for i, line in enumerate(lines):
            if line.strip().startswith("#"):
                title = line.strip().lstrip("#").strip()
                body_start = i + 1
                break
        if title is None:
            title = f.stem
        body = "\n".join(lines[body_start:]).strip()
        chapters.append({"filename": f.name, "title": title, "body": body})
    return chapters


def build_epub(manuscript_dir: str, output_path: str) -> None:
    manuscript_dir = Path(manuscript_dir)
    meta = load_metadata(manuscript_dir)
    chapters = load_chapters(manuscript_dir)

    book = epub.EpubBook()

    identifier = meta.get("identifier") or f"urn:uuid:{uuid.uuid4()}"
    book.set_identifier(identifier)
    book.set_title(meta.get("title", "Sem título"))
    book.set_language(meta.get("language", "pt-BR"))
    book.add_author(meta.get("author", "Jussara Leal"))

    if meta.get("description"):
        book.add_metadata("DC", "description", meta["description"])

    if meta.get("series"):
        book.add_metadata(None, "meta", "", {
            "name": "calibre:series", "content": meta["series"]
        })
        if meta.get("series_index") is not None:
            book.add_metadata(None, "meta", "", {
                "name": "calibre:series_index", "content": str(meta["series_index"])
            })

    style = """
    body { font-family: Georgia, "Bookerly", serif; line-height: 1.5; margin: 1.5em; }
    h1 { font-size: 1.4em; font-weight: 500; margin-bottom: 1.5em; text-align: center; }
    p { margin: 0 0 1em 0; text-indent: 1.2em; }
    """
    css_item = epub.EpubItem(
        uid="style_default", file_name="style/default.css",
        media_type="text/css", content=style,
    )
    book.add_item(css_item)

    epub_chapters = []
    for i, chap in enumerate(chapters, start=1):
        html_body = md.markdown(chap["body"])
        content = f"<h1>{chap['title']}</h1>\n{html_body}"
        c = epub.EpubHtml(
            title=chap["title"],
            file_name=f"chap_{i:02d}.xhtml",
            lang=meta.get("language", "pt-BR"),
        )
        c.content = content
        c.add_item(css_item)
        book.add_item(c)
        epub_chapters.append(c)

    book.toc = tuple(epub_chapters)
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    book.spine = ["nav"] + epub_chapters

    epub.write_epub(str(output_path), book)
    print(f"EPUB criado: {output_path}")
    print(f"Capítulos incluídos: {len(epub_chapters)}")
    for c, chap in zip(epub_chapters, chapters):
        print(f"  - {chap['title']}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python build_epub.py <manuscript_dir> <output.epub>")
        sys.exit(1)
    build_epub(sys.argv[1], sys.argv[2])
