const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  p.on('response', r => { if (r.status() >= 400) console.log('HTTP ' + r.status() + ' ' + r.url()); });
  p.on('pageerror', e => console.log('pageerror: ' + e.message));
  p.on('console', m => { if (m.type() === 'error') console.log('console: ' + m.text()); });
  await p.goto(process.env.BASE, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  console.log('viewChildren=' + await p.evaluate(() => document.querySelectorAll('#view > *').length));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
