const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.route('**/data.json', r => r.abort());
  await p.goto(base, { waitUntil: 'load' }).catch(() => {});
  await p.waitForSelector('.empty .err-ic', { timeout: 20000 }).catch(() => {});
  out.emptyState = await p.evaluate(() => { const e = document.querySelector('.err-ic'); if (!e) return 'not rendered'; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { tag: e.tagName, ns: e.namespaceURI, w: r.width, h: r.height, display: cs.display, border: cs.borderTopWidth, dpr: window.devicePixelRatio }; });
  const q = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await q.goto(base, { waitUntil: 'load' });
  await q.waitForSelector('.tile', { timeout: 15000 });
  out.tile2x = await q.evaluate(() => { const t = document.querySelector('.card-head .tile'); const cs = getComputedStyle(t); return { border: cs.borderTopWidth, color: cs.borderTopColor, dpr: window.devicePixelRatio }; });
  console.log(JSON.stringify(out));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
