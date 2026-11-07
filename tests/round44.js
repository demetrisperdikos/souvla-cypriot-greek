const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8939/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => Array.from(document.querySelectorAll('.test-card > *, .test-card .what-get, .test-card .btn')).map(e => ({ cls: e.className, h: Math.round(e.getBoundingClientRect().height), top: Math.round(e.getBoundingClientRect().top) })));
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.log('ERR ' + e.message); process.exitCode = 1; });
