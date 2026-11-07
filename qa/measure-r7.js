const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base, { waitUntil: 'load' });
    await p.waitForSelector('.challenge-card .next-up', { timeout: 15000 });
    await p.waitForTimeout(500);
    const out = await p.evaluate(() => {
      const card = document.querySelector('.challenge-card');
      const strip = card.querySelector('.next-up');
      const cs = getComputedStyle(card);
      const ss = getComputedStyle(strip);
      const cb = card.getBoundingClientRect().bottom;
      const kids = [...card.children].map(c => ({ cls: c.className, h: Math.round(c.getBoundingClientRect().height), flex: getComputedStyle(c).flex }));
      const row = card.parentElement;
      const rs = getComputedStyle(row);
      return { cardDisplay: cs.display, cardDir: cs.flexDirection, cardH: Math.round(card.getBoundingClientRect().height), rowDisplay: rs.display, rowAlign: rs.alignItems, stripFlex: ss.flex, stripHeight: ss.height, stripToCardBottom: Math.round(cb - strip.getBoundingClientRect().bottom), kids };
    });
    console.log(w, JSON.stringify(out));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
