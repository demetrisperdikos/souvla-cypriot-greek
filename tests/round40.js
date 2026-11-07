const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto('http://localhost:8936/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => { const t = document.querySelector('.test-card'); return { testCardTop: Math.round(t.getBoundingClientRect().top), testCardBottom: Math.round(t.getBoundingClientRect().bottom) }; });
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.log('ERR ' + e.message); process.exitCode = 1; });
