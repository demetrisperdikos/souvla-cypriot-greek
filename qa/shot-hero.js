const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [n, w, h] of [['desktop', 1440, 900], ['phone', 390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto('http://127.0.0.1:8798/index.html');
    await p.waitForSelector('.hero-art', { state: 'attached' });
    await p.waitForTimeout(400);
    await p.locator('.hero-art').screenshot({ path: `/tmp/hero-${n}.png` });
    await p.close();
  }
  await b.close();
  console.log('shots ok');
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
