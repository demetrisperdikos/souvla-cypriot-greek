const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
  const out = {};
  for (const w of [390, 1440]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(process.env.BASE); await p.waitForSelector('.streak-msg');
    out[w] = await p.evaluate(() => {
      const cs = getComputedStyle(document.querySelector('.streak-msg'));
      return ['font-size','font-weight','line-height','color','margin-top','margin-bottom','text-transform','letter-spacing'].map(k => k + '=' + cs.getPropertyValue(k)).join(';');
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
