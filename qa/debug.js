const { chromium } = require('playwright');
const base = process.env.BASE;
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const bypass of [false, true]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, bypassCSP: bypass });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror: ' + e));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    page.on('requestfailed', r => errs.push('requestfailed: ' + r.url()));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);
    const info = await page.evaluate(() => ({
      view: (document.getElementById('view') || {}).innerHTML ? document.getElementById('view').innerHTML.slice(0, 300) : 'no #view',
      buttons: Array.from(document.querySelectorAll('button')).map(b => b.textContent.trim()).slice(0, 10),
      css: !!document.querySelector('link[href="styles.css"]'),
      bg: getComputedStyle(document.body).backgroundColor
    }));
    console.log('bypassCSP=' + bypass, JSON.stringify(info));
    console.log(errs.slice(0, 10).join('\n') || 'no errors');
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
