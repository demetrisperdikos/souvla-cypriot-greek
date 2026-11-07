const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const browser = await chromium.launch();
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(base);
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => {
      const box = (e) => e ? Math.round(e.getBoundingClientRect().bottom) : null;
      const top = (e) => e ? Math.round(e.getBoundingClientRect().top) : null;
      const opt = document.querySelector('.test-opt, .btn.option');
      const hero = document.querySelector('.hero');
      const art = document.querySelector('.hero-svg');
      const test = document.querySelector('.test-card');
      const chal = document.querySelector('.challenge-card');
      const cells = [...document.querySelectorAll('.test-card .meta-cell')].map(c => Math.round(c.getBoundingClientRect().height));
      return { heroBottom: box(hero), artWidth: art ? Math.round(art.getBoundingClientRect().width) : null, testCardTop: top(test), challengeTop: top(chal), firstOptionTop: top(opt), firstOptionBottom: box(opt), metaCellHeights: cells, labels: [...document.querySelectorAll('.test-card .meta-cell')].map(c => c.innerText.replace(/\n/g, ' | ')) };
    });
    console.log(w + 'x' + h, JSON.stringify(r));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
