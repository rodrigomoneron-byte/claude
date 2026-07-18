// export.js — screenshot de cada .slide em 1080x1350
// Uso: node export.js <carrossel.html> <pasta-saida>
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const htmlPath = path.resolve(process.argv[2]);
  const outDir = path.resolve(process.argv[3]);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--force-color-profile=srgb'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  await page.evaluate(() => document.body.classList.remove('preview-mode'));
  await page.evaluate(() => document.fonts.ready);

  const slides = await page.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`) });
  }
  await browser.close();
  console.log('OK', slides.length, 'slides ->', outDir);
})();
