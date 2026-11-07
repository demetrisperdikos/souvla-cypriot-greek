const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const base = process.env.BASE || 'http://127.0.0.1:8080/index.html';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(base, { waitUntil: 'load' });
  await page.waitForSelector('#brand svg');
  const svg = await page.$eval('#brand svg', (s) => s.outerHTML);
  const out = {};
  for (const px of [16, 24, 48]) {
    const html = '<body style="margin:0;background:#FFFCF8">' + svg.replace(/width='48' height='48'|width="48" height="48"/, 'width="' + px + '" height="' + px + '"') + '</body>';
    await page.setContent(html);
    const el = await page.$('svg');
    const file = 'brand-' + px + '.png';
    await el.screenshot({ path: file });
    out[px] = { file, bytes: fs.statSync(file).size };
  }
  console.log(JSON.stringify(out, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
