const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base); await p.waitForSelector('.challenge-card', { timeout: 20000 });
    await p.waitForTimeout(400);
    const rows = await p.evaluate(() => {
      const card = document.querySelector('.challenge-card');
      const cb = card.getBoundingClientRect().bottom;
      return [...card.children].map(c => {
        const r = c.getBoundingClientRect();
        const cs = getComputedStyle(c);
        return { tag: c.tagName, cls: c.className, top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), mt: cs.marginTop, mb: cs.marginBottom, display: cs.display, pos: cs.position, cardBottomGap: Math.round(cb - r.bottom) };
      });
    });
    console.log(w, JSON.stringify(rows));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
