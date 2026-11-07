const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const [n, w, h] of [['1440', 1440, 900], ['390', 390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('http://localhost:8932/', { waitUntil: 'networkidle' });
    out[n] = await p.evaluate(() => {
      const r = (e) => e ? Math.round(e.getBoundingClientRect().bottom) : null;
      const t = document.querySelector('.test-card');
      return { testCardTop: t ? Math.round(t.getBoundingClientRect().top) : null, beginBottom: r(document.querySelector('.test-card .btn.primary')), pageFooterBottom: r(document.querySelector('footer')) };
    });
    await p.close();
  }
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
