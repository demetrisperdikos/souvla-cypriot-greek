const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE);
  await p.waitForSelector('.feature-row .card');
  const r = await p.evaluate(() => [...document.querySelectorAll('.feature-row > .card')].map(e => {
    const b = e.getBoundingClientRect();
    return [Math.round(b.top), Math.round(b.bottom)];
  }));
  console.log('cards [top,bottom] at 1440x900:', JSON.stringify(r));
  console.log('above fold:', r.every(c => c[1] <= 900));
  await b.close();
})().catch(e => { console.error(e.message); process.exit(1); });
