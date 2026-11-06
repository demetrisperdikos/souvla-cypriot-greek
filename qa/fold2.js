const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE);
  await p.waitForTimeout(400);
  const r = await p.evaluate(() => [...document.querySelectorAll('.feature-row .card')].map(c => { const b = c.querySelector('.btn').getBoundingClientRect(); const cr = c.getBoundingClientRect(); return { cardBottom: Math.round(cr.bottom), btnBottom: Math.round(b.bottom) }; }));
  const hero = await p.evaluate(() => Math.round(document.querySelector('.hero').getBoundingClientRect().bottom));
  const top = await p.evaluate(() => Math.round(document.querySelector('.feature-row').getBoundingClientRect().top));
  console.log(JSON.stringify({ heroBottom: hero, cardsTop: top, cards: r }));
  await b.close();
})();
