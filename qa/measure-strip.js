const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto(process.env.BASE, { waitUntil: 'load' });
    await p.waitForTimeout(800);
    out[w] = await p.evaluate(() => {
      const card = document.querySelector('.challenge-card');
      if (!card) return { missing: true, classes: [...new Set([...document.querySelectorAll('[class]')].map(e => e.className.baseVal ?? e.className))].slice(0, 40) };
      const s = card.querySelector('.up-next.next-up');
      const c = card.querySelector(':scope > .btn');
      const cr = card.getBoundingClientRect();
      const sr = s.getBoundingClientRect(), br = c.getBoundingClientRect();
      return { stripH: Math.round(sr.height), stripBottom: Math.round(sr.bottom), ctaTop: Math.round(br.top), stripToCtaGap: Math.round(br.top - sr.bottom), ctaBottom: Math.round(br.bottom), cardBottom: Math.round(cr.bottom) };
    });
    out[w].errs = errs;
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
