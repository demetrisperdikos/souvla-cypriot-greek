const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(process.env.BASE);
  await p.getByRole('button', { name: 'Browse lessons' }).click();
  await p.waitForTimeout(800);
  console.log('browse scrollY', await p.evaluate(() => Math.round(window.scrollY)));
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.goto(process.env.BASE);
  await p.keyboard.press('Tab');
  await p.keyboard.press('Enter');
  await p.waitForTimeout(300);
  console.log('skip focus', await p.evaluate(() => document.activeElement && (document.activeElement.id || document.activeElement.tagName)));
  console.log('errors', errs.length);
  await b.close();
})();
