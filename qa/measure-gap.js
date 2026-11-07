const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(process.env.BASE); await p.waitForSelector('.challenge-card');
    out[w] = await p.evaluate(() => {
      const s = document.querySelector('.challenge-card .up-next.next-up').getBoundingClientRect();
      const c = document.querySelector('.challenge-card > .btn').getBoundingClientRect();
      const card = document.querySelector('.challenge-card').getBoundingClientRect();
      return { stripBottom: Math.round(s.bottom), ctaTop: Math.round(c.top), stripToCtaGap: Math.round(c.top - s.bottom), ctaToCardBottom: Math.round(card.bottom - c.bottom) };
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
