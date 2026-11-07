const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const logs = [];
  p.on('console', m => logs.push(m.type() + ': ' + m.text()));
  p.on('pageerror', e => logs.push('pageerror: ' + e.message));
  await p.goto(process.env.BASE, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  const info = await p.evaluate(() => ({
    featureRowChildren: [...document.querySelectorAll('.feature-row > *')].map(e => e.tagName + '.' + e.className),
    challengeAnywhere: document.querySelectorAll('.challenge-card').length,
    upNext: document.querySelectorAll('.up-next').length,
    viewChildren: [...document.querySelectorAll('#view > *')].map(e => e.className).slice(0, 10)
  }));
  console.log(JSON.stringify({ info, logs: logs.slice(0, 10) }, null, 1));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
