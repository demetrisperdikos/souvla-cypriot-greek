const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
  const rows = await p.evaluate(() => {
    const card = document.querySelector('.challenge-card');
    const cb = card.getBoundingClientRect();
    return [...card.children].map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: e.className, top: Math.round(r.top - cb.top), h: Math.round(r.height), bottom: Math.round(cb.bottom - r.bottom) }; });
  });
  console.log(JSON.stringify(rows, null, 1));
  await b.close();
})();
