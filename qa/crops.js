const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  for (const [n, w, h, d] of [['d1440', 1440, 900, 1], ['p390', 390, 844, 1], ['d1440x2', 1440, 900, 2]]) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: d })).newPage();
    await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
    const br = await p.$('#brand');
    if (br) await br.screenshot({ path: `qa/brand-${n}.png` });
    const hero = await p.$('.hero-art');
    if (hero) await hero.screenshot({ path: `qa/hero-${n}.png` });
    const info = await p.evaluate(() => ({ chunks: document.querySelectorAll('.hero-scene > g').length, brandSvgW: Math.round((document.querySelector('#brand svg') || document.body).getBoundingClientRect().width) }));
    console.log(n, JSON.stringify(info));
  }
  await b.close();
})();
