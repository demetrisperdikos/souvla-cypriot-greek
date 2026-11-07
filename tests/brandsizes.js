const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 120, height: 80 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.resolve(__dirname, 'brandsizes.html'));
  const boxes = await p.evaluate(() => ['a','b','c'].map(id => { const s = document.querySelector('#' + id + ' svg'); if (!s) return [id, 'missing']; const r = s.getBoundingClientRect(); return [id, r.width, r.height]; }));
  console.log(JSON.stringify(boxes));
  await p.screenshot({ path: path.resolve(__dirname, '..', 'BRAND-SIZES.png') });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
