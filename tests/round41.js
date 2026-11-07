const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8937/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => { const f = document.querySelector('footer.foot').getBoundingClientRect(); return { footerTop: Math.round(f.top), footerBottom: Math.round(f.bottom), left: Math.round(f.left), width: Math.round(f.width) }; });
  console.log(JSON.stringify(r));
  console.log(r.footerBottom <= 900 ? 'PASS footer.foot above 900px fold' : 'FAIL footer.foot below 900px fold');
  await b.close();
})().catch(e => { console.log('ERR ' + e.message); process.exitCode = 1; });
