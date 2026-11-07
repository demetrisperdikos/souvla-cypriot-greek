const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto(base, { waitUntil: 'networkidle' });
    out[w] = await p.evaluate(() => {
      const card = document.querySelector('.challenge-card');
      const cs = getComputedStyle(card);
      const strip = card.querySelector('.next-up');
      const ss = getComputedStyle(strip);
      const pv = card.querySelector('.streak-preview');
      const cb = card.getBoundingClientRect().bottom;
      const kids = [...card.children].map(c => ({ cls: c.className, h: Math.round(c.getBoundingClientRect().height), flex: getComputedStyle(c).flex, mt: getComputedStyle(c).marginTop }));
      return { display: cs.display, dir: cs.flexDirection, cardH: Math.round(card.getBoundingClientRect().height), stripStyle: { height: ss.height, flex: ss.flex, minH: ss.minHeight, maxH: ss.maxHeight, display: ss.display }, previewH: pv && Math.round(pv.getBoundingClientRect().height), kids, stripToBottom: Math.round(cb - strip.getBoundingClientRect().bottom) };
    });
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.route('**/data.json', r => r.abort());
  await p.goto(base, { waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(6000);
  out.emptyState = await p.evaluate(() => { const e = document.querySelector('.err-ic'); if (!e) return 'no .err-ic rendered'; const r = e.getBoundingClientRect(); return { tag: e.tagName, ns: e.namespaceURI, w: r.width, h: r.height }; });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
