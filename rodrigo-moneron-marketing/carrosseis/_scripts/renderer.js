// renderer.js — gera carrossel.html a partir de dados estruturados de um post
// Uso: node renderer.js <post.json> <saida.html>
const fs = require('fs');
const path = require('path');

const FONTS_CSS = fs.readFileSync(path.join(__dirname, '..', '_assets', 'fonts.css'), 'utf8');

function esc(s) {
  if (s == null) return '';
  return String(s);
}

// aplica marcações inline simples no texto: **grifo**, __sublinhado__, ~~risco~~
function inlineVerde(text) {
  if (!text) return '';
  let t = esc(text);
  t = t.replace(/\*\*(.+?)\*\*/g, '<span class="grifo">$1</span>');
  t = t.replace(/__(.+?)__/g, '<span class="sub">$1</span>');
  t = t.replace(/~~(.+?)~~/g, '<span class="risco">$1</span>');
  t = t.replace(/\+\+(.+?)\+\+/g, '<strong>$1</strong>');
  return t;
}

function renderComponent(comp) {
  if (!comp) return '';
  if (comp.tipo === 'num-gigante') {
    return `<div class="num-gigante">${esc(comp.numero)}</div><div class="num-label">${esc(comp.label)}</div>`;
  }
  if (comp.tipo === 'card') {
    return `<div class="card">${inlineVerde(comp.texto)}</div>`;
  }
  if (comp.tipo === 'tabela') {
    const header = `<tr>${comp.colunas.map(c => `<th>${esc(c)}</th>`).join('')}</tr>`;
    const rows = comp.linhas.map(r => `<tr class="${r.destaque ? 'linha-destaque' : ''}">${r.celulas.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
    return `<table class="tabela"><thead>${header}</thead><tbody>${rows}</tbody></table>`;
  }
  if (comp.tipo === 'camadas') {
    const barras = comp.camadas.map((c, i) => {
      const isLast = i === comp.camadas.length - 1;
      return `<div class="camada-barra ${isLast ? 'camada-final' : ''}" style="width:${c.largura || (40 + i * 20)}%"><span>${esc(c.label)}</span></div>`;
    }).join('');
    return `<div class="camadas">${barras}</div>`;
  }
  if (comp.tipo === 'ecg') {
    return `<svg class="ecg-svg" viewBox="0 0 400 120" preserveAspectRatio="none">
      <path d="${comp.pathBase}" fill="none" stroke="currentColor" stroke-width="3" opacity="0.55"/>
      <path d="${comp.pathMeta}" fill="none" stroke="var(--verde)" stroke-width="4"/>
    </svg>`;
  }
  return '';
}

function renderSlideBase(baseClass, kickerText, handle, num, total) {
  return { kickerHtml: `<div class="kicker"><span>${esc(kickerText)}</span><span>${esc(handle)}</span></div>`,
           progHtml: `<div class="prog"><div class="prog-track"><div class="prog-fill" style="width:${Math.round((num/total)*100)}%"></div></div><div class="prog-num">${num}/${total}</div></div>` };
}

function renderCapa(post, total) {
  const { kickerHtml, progHtml } = renderSlideBase('capa', post.editoria, post.handle, 1, total);
  const subHtml = post.capa.sub ? `<div class="capa-sub">${inlineVerde(post.capa.sub)}</div>` : '';
  return `<div class="slide s-${post.capa.base}">
    ${kickerHtml}
    <div class="conteudo">
      <div class="capa-headline">${inlineVerde(post.capa.headline)}</div>
      ${subHtml}
    </div>
    ${progHtml}
  </div>`;
}

function renderInterno(slide, idx, total, post) {
  const { kickerHtml, progHtml } = renderSlideBase(slide.base, post.editoria, post.handle, idx, total);
  const titleHtml = slide.title ? `<div class="titulo-interno">${inlineVerde(slide.title)}</div>` : '';
  const bodyHtml = (slide.body || []).map(b => `<p class="body-txt">${inlineVerde(b)}</p>`).join('');
  const quoteHtml = slide.quote ? `<div class="quote">${inlineVerde(slide.quote)}</div>` : '';
  const compHtml = renderComponent(slide.componente);
  return `<div class="slide s-${slide.base}">
    ${kickerHtml}
    <div class="conteudo">
      ${titleHtml}
      ${quoteHtml}
      ${compHtml}
      ${bodyHtml}
    </div>
    ${progHtml}
  </div>`;
}

function renderCTA(post, idx, total) {
  const { kickerHtml, progHtml } = renderSlideBase(post.cta.base, post.editoria, post.handle, idx, total);
  return `<div class="slide s-${post.cta.base}">
    ${kickerHtml}
    <div class="conteudo cta-conteudo">
      <div class="ponte">${inlineVerde(post.cta.ponte)}</div>
      <div class="chamada">${inlineVerde(post.cta.chamada)}</div>
      <div class="keyword-box">
        <div class="kw-instrucao">${esc(post.cta.instrucao)}</div>
        <div class="kw-palavra grifo">${esc(post.cta.palavra)}</div>
        <div class="kw-beneficio">${esc(post.cta.beneficio)}</div>
      </div>
      <div class="assinatura">${esc(post.handle)} · resposta automática na DM</div>
    </div>
    ${progHtml}
  </div>`;
}

function render(post) {
  const total = 1 + post.slides.length + 1;
  let slidesHtml = renderCapa(post, total);
  post.slides.forEach((s, i) => { slidesHtml += renderInterno(s, i + 2, total, post); });
  slidesHtml += renderCTA(post, total, total);

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<title>${esc(post.tema)}</title>
<style>
${FONTS_CSS}
:root {
  --verde: #2BFF00;
  --tinta: #0A0A0A;
  --papel: #F5F1E8;
  --grafite: #2A2A2A;
  --cinza: #8A8A8A;
  --serif: 'Lora', Georgia, serif;
  --sans: 'Inter', Helvetica, sans-serif;
}
* { box-sizing: border-box; margin:0; padding:0; }
body { background:#444; }
.slide { width:1080px; height:1350px; position:relative; overflow:hidden; font-family:var(--sans); }
.s-tinta { background:var(--tinta); color:var(--papel); }
.s-papel { background:var(--papel); color:var(--tinta); }
.kicker { position:absolute; top:64px; left:56px; right:56px; display:flex; justify-content:space-between; align-items:baseline; font-family:var(--sans); font-size:15px; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:var(--cinza); }
.prog { position:absolute; bottom:0; left:0; right:0; padding:0 56px 34px; display:flex; align-items:center; gap:16px; font-family:var(--sans); }
.prog-track { flex:1; height:2px; }
.s-tinta .prog-track { background:rgba(245,241,232,0.12); }
.s-papel .prog-track { background:rgba(10,10,10,0.10); }
.prog-fill { height:100%; }
.s-tinta .prog-fill { background:rgba(245,241,232,0.55); }
.s-papel .prog-fill { background:rgba(10,10,10,0.45); }
.prog-num { font-size:15px; font-weight:600; color:var(--cinza); }
.conteudo { position:absolute; top:150px; left:56px; right:56px; bottom:90px; display:flex; flex-direction:column; justify-content:flex-end; padding-bottom:40px; }
.grifo { background:var(--verde); color:var(--tinta); padding:0 8px; box-decoration-break:clone; -webkit-box-decoration-break:clone; }
.sub { border-bottom:5px solid var(--verde); padding-bottom:2px; }
.risco { position:relative; }
.risco::after { content:''; position:absolute; left:-2%; right:-2%; top:52%; height:5px; background:var(--verde); transform:rotate(-1.5deg); }
.capa-headline { font-family:var(--serif); font-weight:500; font-size:96px; line-height:1.12; letter-spacing:-1px; }
.capa-sub { font-family:var(--sans); font-size:30px; font-weight:400; color:var(--cinza); margin-top:36px; max-width:85%; }
.titulo-interno { font-family:var(--serif); font-weight:500; font-size:60px; line-height:1.15; margin-bottom:32px; }
.body-txt { font-family:var(--sans); font-size:38px; line-height:1.5; margin-bottom:20px; font-weight:400; }
.s-tinta .body-txt { color:rgba(245,241,232,0.72); }
.s-papel .body-txt { color:rgba(10,10,10,0.68); }
.body-txt strong { font-weight:700; }
.s-tinta .body-txt strong { color:#F5F1E8; }
.s-papel .body-txt strong { color:var(--tinta); }
.quote { font-family:var(--serif); font-style:italic; font-weight:400; font-size:48px; line-height:1.3; margin-bottom:20px; }
.num-gigante { font-family:var(--sans); font-weight:900; font-size:200px; line-height:1; }
.num-label { font-family:var(--sans); font-size:28px; color:var(--cinza); margin-top:12px; margin-bottom:24px; }
.card { background:var(--grafite); border-radius:12px; padding:44px 48px; font-family:var(--sans); font-size:34px; line-height:1.5; margin-bottom:20px; }
.s-papel .card { background:#EDE8DD; }
.tabela { width:100%; border-collapse:collapse; margin-bottom:24px; font-family:var(--sans); }
.tabela th { font-size:15px; font-weight:600; text-transform:uppercase; color:var(--cinza); text-align:left; padding-bottom:12px; border-bottom:2px solid; }
.s-tinta .tabela th { border-color:rgba(245,241,232,0.3); }
.s-papel .tabela th { border-color:rgba(10,10,10,0.2); }
.tabela td { font-size:26px; padding:14px 0; border-bottom:1px solid; }
.s-tinta .tabela td { border-color:rgba(245,241,232,0.1); }
.s-papel .tabela td { border-color:rgba(10,10,10,0.08); }
.linha-destaque td:first-child { border-left:4px solid var(--verde); padding-left:12px; }
.camadas { display:flex; flex-direction:column; gap:14px; margin-bottom:24px; }
.camada-barra { background:var(--grafite); border-radius:8px; padding:20px 24px; font-family:var(--sans); font-size:24px; font-weight:600; }
.s-papel .camada-barra { background:#EDE8DD; }
.camada-barra.camada-final, .s-tinta .camada-barra.camada-final, .s-papel .camada-barra.camada-final { background:var(--verde); color:var(--tinta); }
.ecg-svg { width:100%; height:160px; margin-bottom:24px; }
.cta-conteudo { align-items:flex-start; text-align:left; }
.ponte { font-family:var(--serif); font-style:italic; font-size:38px; margin-bottom:24px; }
.chamada { font-family:var(--serif); font-weight:500; font-size:60px; margin-bottom:32px; }
.keyword-box { background:var(--grafite); border-radius:12px; padding:36px 40px; margin-bottom:28px; width:100%; }
.s-papel .keyword-box { background:#EDE8DD; }
.kw-instrucao { font-family:var(--sans); font-size:22px; color:var(--cinza); margin-bottom:10px; }
.kw-palavra { font-family:var(--sans); font-weight:900; font-size:72px; display:inline-block; margin-bottom:10px; }
.kw-beneficio { font-family:var(--sans); font-size:24px; }
.assinatura { font-family:var(--sans); font-size:18px; color:var(--cinza); }
.preview-mode .slide { transform:scale(0.30); transform-origin:top left; margin-bottom:-945px; display:inline-block; margin-right:-756px; vertical-align:top; }
.wrap { display:flex; flex-wrap:wrap; }
.toggle-btn { position:fixed; top:12px; right:12px; z-index:99; padding:10px 16px; background:#222; color:#fff; border:none; border-radius:6px; cursor:pointer; font-family:sans-serif; }
</style>
</head>
<body class="preview-mode">
<button class="toggle-btn" onclick="document.body.classList.toggle('preview-mode')">Alternar preview / tamanho real</button>
<div class="wrap">
${slidesHtml}
</div>
</body>
</html>`;
}

module.exports = { render };

if (require.main === module) {
  const inputPath = process.argv[2];
  const outputPath = process.argv[3];
  const post = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  fs.writeFileSync(outputPath, render(post), 'utf8');
  console.log('OK', outputPath, '-', (1 + post.slides.length + 1), 'slides');
}
