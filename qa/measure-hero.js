const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const w of [390, 600, 768, 899, 900, 1024, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(process.env.BASE, { waitUntil: 'networkidle' });
    await p.waitForSelector('.hero-art', { timeout: 15000 });
    out[w] = await p.evaluate(() => {
      const a = document.querySelector('.hero-art').getBoundingClientRect();
      const c = document.querySelector('.hero-art').firstElementChild.getBoundingClientRect();
      return [Math.round(a.height), Math.round(c.height), Math.round(c.top - a.top)];
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
