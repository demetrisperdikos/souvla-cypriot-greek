const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
    await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
    const out = await p.evaluate(() => {
      const cards = [...document.querySelectorAll('.feature-row > .card')];
      return cards.map(c => {
        const cb = c.getBoundingClientRect();
        const kids = [...c.children].map(e => { const r = e.getBoundingClientRect(); return e.tagName + '.' + e.className.toString().split(' ')[0] + ' top=' + Math.round(r.top - cb.top) + ' h=' + Math.round(r.height) + ' bottom=' + Math.round(cb.bottom - r.bottom); });
        const kidsSum = [...c.children].reduce((s, e) => s + e.getBoundingClientRect().height, 0);
        return { cls: c.className, cardH: Math.round(cb.height), childrenSum: Math.round(kidsSum), kids };
      });
    });
    console.log(w + 'x' + h, JSON.stringify(out, null, 1));
  }
  await b.close();
})();
