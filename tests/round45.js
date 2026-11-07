const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8940/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => { const f = document.querySelector('footer.foot').getBoundingClientRect(); const c = Array.from(document.querySelectorAll('.feature-row > .card')).map(e => Math.round(e.getBoundingClientRect().bottom)); return { footerTop: Math.round(f.top), footerBottom: Math.round(f.bottom), cardBottoms: c }; });
  console.log(JSON.stringify(r));
  await b.close();
})().catch(e => { console.log('ERR ' + e.message); process.exitCode = 1; });
