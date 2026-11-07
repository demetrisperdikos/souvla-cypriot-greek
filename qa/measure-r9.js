const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await p.goto(base, { waitUntil: 'load' });
  await p.waitForTimeout(3000);
  const r = await p.evaluate(() => { const t = document.querySelector('.card-head > :first-child'); if (!t) return 'no card-head child'; const cs = getComputedStyle(t); return { cls: t.className, tag: t.tagName, border: cs.borderTopWidth, dpr: window.devicePixelRatio, w: t.getBoundingClientRect().width }; });
  console.log('TILE', JSON.stringify(r));
  const q = await b.newPage({ viewport: { width: 390, height: 844 } });
  await q.route('**/data.json', rt => rt.abort());
  await q.goto(base, { waitUntil: 'load' }).catch(() => {});
  await q.waitForTimeout(8000);
  const e = await q.evaluate(() => { const x = document.querySelector('.err-ic'); if (!x) return 'not rendered; main=' + (document.querySelector('#view') || {}).innerHTML.slice(0, 200); const s = getComputedStyle(x); return { tag: x.tagName, ns: x.namespaceURI, w: x.getBoundingClientRect().width, h: x.getBoundingClientRect().height, display: s.display }; });
  console.log('EMPTY', JSON.stringify(e));
  await b.close();
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
