const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base); await p.waitForSelector('.challenge-card', { timeout: 20000 });
    await p.waitForTimeout(500);
    out[w] = await p.evaluate(() => {
      const r = el => el ? el.getBoundingClientRect() : null;
      const card = document.querySelector('.challenge-card');
      const nu = document.querySelector('.challenge-card .next-up');
      const chip = document.querySelector('.hero-chip');
      const sk = document.querySelector('.hero-scene > g');
      const cb = r(card), nb = r(nu), chr = r(chip), skr = r(sk);
      return {
        cardBottom: cb && Math.round(cb.bottom),
        nextUpBottom: nb && Math.round(nb.bottom),
        nextUpHeight: nb && Math.round(nb.height),
        nextUpToCardBottomGap: cb && nb ? Math.round(cb.bottom - nb.bottom) : null,
        chipBox: chr && [Math.round(chr.left), Math.round(chr.top), Math.round(chr.right), Math.round(chr.bottom)],
        firstSkewerBox: skr && [Math.round(skr.left), Math.round(skr.top), Math.round(skr.right), Math.round(skr.bottom)],
        chipBottomToSkewerTop: chr && skr ? Math.round(skr.top - chr.bottom) : null,
        overflowX: document.documentElement.scrollWidth - window.innerWidth
      };
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
