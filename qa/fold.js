const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE);
  await p.waitForSelector('.test-card .btn');
  await p.waitForTimeout(400);
  const ctas = await p.evaluate(() => {
    const pick = s => { const e = document.querySelector(s); return e ? Math.round(e.getBoundingClientRect().bottom) : null; };
    return { test: pick('.test-card .btn'), daily: pick('.challenge-card .btn') };
  });
  console.log('CTA bottoms test=' + ctas.test + ' daily=' + ctas.daily + ' viewport=900');
  const ok = ctas.test !== null && ctas.daily !== null && ctas.test <= 900 && ctas.daily <= 900;
  console.log(ok ? 'PASS both card CTAs end above 900px' : 'FAIL a card CTA ends below 900px');
  await p.screenshot({ path: '../.shots/fold-1440.png' });
  await b.close();
  process.exit(ok ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
