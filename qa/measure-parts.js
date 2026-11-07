const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(process.env.BASE, { waitUntil: 'load' });
  await p.waitForSelector('.challenge-card', { timeout: 15000 });
  const out = await p.evaluate(() => {
    const H = e => Math.round(e.getBoundingClientRect().height);
    const card = document.querySelector('.challenge-card');
    const test = document.querySelector('.test-card');
    return {
      row: H(document.querySelector('.feature-row')),
      dailyCard: H(card),
      testCard: H(test),
      dailyChildren: [...card.children].map(c => c.className + ':' + H(c)),
      testChildren: [...test.children].map(c => c.className + ':' + H(c))
    };
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
