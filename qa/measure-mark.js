const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const w of [390, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
    await p.waitForSelector('.mark svg', { timeout: 15000 });
    out[w] = await p.evaluate(() => {
      const m = document.querySelector('.mark');
      const s = m.querySelector('svg');
      const pick = (e) => { const c = getComputedStyle(e); return [c.backgroundColor, c.borderTopWidth, c.borderTopColor, c.boxShadow, c.width, c.height, c.borderRadius, c.paddingTop, c.display, c.position].join('|'); };
      const r = m.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      return [pick(m), pick(s), Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(sr.width), Math.round(sr.height)].join(';');
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
