#!/usr/bin/env python3
"""
Constrói um PDF 6"x9" pronto para KDP paperback a partir de uma pasta
com capítulos em markdown + metadata.json.

Uso:
    python build_pdf.py <manuscript_dir> <output.pdf>

A pasta <manuscript_dir> deve conter:
    - metadata.json
    - 01_*.md, 02_*.md, ... (um arquivo por capítulo, ordenados pelo
      nome do arquivo; cada arquivo deve começar com uma linha
      "# Título do capítulo")
"""

import sys
import re
import json
from pathlib import Path

try:
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
    from reportlab.lib.colors import HexColor
    from reportlab.lib.units import inch as INCH
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
except ImportError:
    print("Instale com: pip install reportlab --break-system-packages")
    sys.exit(1)

# Especificações KDP 6"x9"
PAGE_WIDTH = 6 * INCH
PAGE_HEIGHT = 9 * INCH
MARGIN_OUTER = 0.5 * INCH
MARGIN_INNER = 0.75 * INCH  # lombada/gutter
MARGIN_TOP = 0.6 * INCH
MARGIN_BOTTOM = 0.6 * INCH


def load_metadata(manuscript_dir: Path) -> dict:
    with open(manuscript_dir / "metadata.json", encoding="utf-8") as f:
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
        paragraphs = [p.strip() for p in re.split(r"\n\s*\n", body) if p.strip()]
        chapters.append({"title": title, "paragraphs": paragraphs})
    return chapters


def _markdown_inline_to_reportlab(text: str) -> str:
    """Converte *itálico* markdown simples para tags <i> do reportlab."""
    text = re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)
    # Escapa & e < que não fazem parte de uma tag já convertida
    text = re.sub(r"&(?!amp;|lt;|gt;)", "&amp;", text)
    return text


def add_page_number(canvas, doc):
    canvas.saveState()
    canvas.setFont("Times-Roman", 9)
    page_num = canvas.getPageNumber()
    if page_num > 1:  # página de título (1) não é numerada
        canvas.drawCentredString(PAGE_WIDTH / 2, MARGIN_BOTTOM / 2, str(page_num - 1))
    canvas.restoreState()


def build_pdf(manuscript_dir: str, output_path: str) -> None:
    manuscript_dir = Path(manuscript_dir)
    meta = load_metadata(manuscript_dir)
    chapters = load_chapters(manuscript_dir)

    doc = SimpleDocTemplate(
        str(output_path),
        pagesize=(PAGE_WIDTH, PAGE_HEIGHT),
        leftMargin=MARGIN_INNER,
        rightMargin=MARGIN_OUTER,
        topMargin=MARGIN_TOP,
        bottomMargin=MARGIN_BOTTOM,
        title=meta.get("title", ""),
        author=meta.get("author", "Jussara Leal"),
    )

    styles = getSampleStyleSheet()

    body_style = ParagraphStyle(
        "Body", parent=styles["Normal"], fontName="Times-Roman",
        fontSize=11, leading=15.5, alignment=TA_JUSTIFY,
        firstLineIndent=18, spaceAfter=0,
    )
    title_style = ParagraphStyle(
        "BookTitle", parent=styles["Title"], fontName="Helvetica-Bold",
        fontSize=24, alignment=TA_CENTER, spaceAfter=12,
    )
    subtitle_style = ParagraphStyle(
        "BookSubtitle", parent=styles["Normal"], fontName="Helvetica",
        fontSize=13, alignment=TA_CENTER, textColor=HexColor("#444444"),
        spaceAfter=4,
    )
    chapter_title_style = ParagraphStyle(
        "ChapterTitle", parent=styles["Heading1"], fontName="Helvetica",
        fontSize=18, alignment=TA_CENTER, spaceAfter=24, spaceBefore=72,
        textColor=HexColor("#000000"),
    )

    story = []

    # Página de título
    story.append(Spacer(1, 2.5 * INCH))
    story.append(Paragraph(meta.get("title", ""), title_style))
    if meta.get("subtitle"):
        story.append(Paragraph(meta["subtitle"], subtitle_style))
    story.append(Spacer(1, 1 * INCH))
    story.append(Paragraph(meta.get("author", "Jussara Leal"), subtitle_style))
    if meta.get("series"):
        idx = meta.get("series_index", "")
        story.append(Paragraph(f"{meta['series']} — Livro {idx}", subtitle_style))
    story.append(PageBreak())

    # Capítulos
    for chap in chapters:
        story.append(Paragraph(chap["title"], chapter_title_style))
        for para in chap["paragraphs"]:
            text = " ".join(line.strip() for line in para.splitlines())
            text = _markdown_inline_to_reportlab(text)
            story.append(Paragraph(text, body_style))
            story.append(Spacer(1, 6))
        story.append(PageBreak())

    if story and isinstance(story[-1], PageBreak):
        story.pop()

    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"PDF criado: {output_path}")
    print(f"Capítulos incluídos: {len(chapters)}")
    for chap in chapters:
        print(f"  - {chap['title']} ({len(chap['paragraphs'])} parágrafos)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso: python build_pdf.py <manuscript_dir> <output.pdf>")
        sys.exit(1)
    build_pdf(sys.argv[1], sys.argv[2])
