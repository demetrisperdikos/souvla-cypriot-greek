const { chromium } = require('../tests/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:8931/index.html', { waitUntil: 'load' });
  await p.waitForSelector('.foot', { timeout: 15000 });
  const r = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('body *').forEach(e => {
      const x = e.getBoundingClientRect();
      if (x.height > 0 && x.bottom > 855 && x.bottom <= 905 && x.top < 900) {
        const s = getComputedStyle(e);
        out.push({ t: e.tagName, c: String(e.className).slice(0, 40), top: Math.round(x.top), bot: Math.round(x.bottom), pb: s.paddingBottom, mb: s.marginBottom, mt: s.marginTop });
      }
    });
    return out;
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
