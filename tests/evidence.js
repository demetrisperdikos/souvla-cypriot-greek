const { chromium } = require('playwright');
const BASE = process.env.BASE;
(async () => {
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  for (const width of [390, 1440]) {
    const p = await b.newPage({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: 1 });
    await p.goto(BASE, { waitUntil: 'networkidle' });
    if (width === 1440) {
      for (const size of [16, 24, 48]) {
        await p.evaluate(s => { const m = document.querySelector('#brand svg'); m.setAttribute('width', s); m.setAttribute('height', s); }, size);
        await (await p.$('#brand svg')).screenshot({ path: '../evidence/brand-' + size + 'px.png' });
      }
    }
    const day = p.locator('.week > .day').nth(1);
    await day.focus();
    const vis = await p.evaluate(() => document.activeElement.matches(':focus-visible'));
    await (await p.$('.week')).screenshot({ path: '../evidence/day-focus-' + width + 'px.png' });
    console.log('PASS focus ring evidence ' + width + 'px :: focus-visible=' + vis);
    await p.close();
  }
  await b.close();
})().catch(e => { console.log('FAIL evidence: ' + e.message); process.exit(1); });
