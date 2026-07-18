// batch.js — renderiza + exporta todos os post-*.json de uma pasta de dia
// Uso: node batch.js <pasta-dia>   (ex: dia-01)
// Espera posts em <pasta-dia>/<slug>.json e escreve <pasta-dia>/<slug>/carrossel.html + slides/*.png
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { render } = require('./renderer');

(async () => {
  const diaDir = path.resolve(process.argv[2]);
  const files = fs.readdirSync(diaDir).filter(f => f.endsWith('.json'));
  if (!files.length) { console.log('nenhum json em', diaDir); return; }

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  for (const file of files) {
    const slug = file.replace(/\.json$/, '');
    const post = JSON.parse(fs.readFileSync(path.join(diaDir, file), 'utf8'));
    const outDir = path.join(diaDir, slug);
    const slidesDir = path.join(outDir, 'slides');
    fs.mkdirSync(slidesDir, { recursive: true });

    const html = render(post);
    const htmlPath = path.join(outDir, 'carrossel.html');
    fs.writeFileSync(htmlPath, html, 'utf8');

    await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.body.classList.remove('preview-mode'));
    await page.evaluate(() => document.fonts.ready);
    const slides = await page.$$('.slide');
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: path.join(slidesDir, `slide-${String(i + 1).padStart(2, '0')}.png`) });
    }
    console.log('OK', slug, '-', slides.length, 'slides');
  }

  await browser.close();
})();
