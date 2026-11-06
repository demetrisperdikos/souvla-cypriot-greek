const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE);
  await p.waitForTimeout(400);
  const top = await p.locator('.card').first().evaluate(e => Math.round(e.getBoundingClientRect().top));
  const h = await p.locator('.card').first().evaluate(e => Math.round(e.getBoundingClientRect().bottom));
  console.log('first card top=' + top + ' bottom=' + h + ' viewport=900');
  await p.screenshot({ path: '../.shots/fold-1440.png' });
  await b.close();
})();
