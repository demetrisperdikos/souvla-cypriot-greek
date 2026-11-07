const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8765/index.html';
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => [...document.querySelectorAll('.feature-row > .card')].map(c => {
    const btns = [...c.querySelectorAll('.btn')];
    const last = btns[btns.length - 1];
    return { bottom: Math.round(last.getBoundingClientRect().bottom) };
  }));
  await b.close();
  const same = r.length === 2 && r[0].bottom === r[1].bottom;
  const above = r.every(x => x.bottom <= 900);
  console.log((same ? 'PASS' : 'FAIL') + ' footers share one baseline :: ' + JSON.stringify(r));
  console.log((above ? 'PASS' : 'FAIL') + ' footers above 900px fold');
  if (!same || !above) process.exit(1);
})().catch(e => { console.log('FAIL footers: ' + e.message); process.exit(1); });
