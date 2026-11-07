const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(base, { waitUntil: 'networkidle' });
  const out = await p.evaluate(() => {
    const card = document.querySelector('.test-card');
    if (!card) return { error: 'no .test-card' };
    const r = (e) => { const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height) }; };
    const kids = [...card.children].map(c => ({ tag: c.tagName, cls: c.className, text: (c.textContent || '').trim().slice(0, 40), ...r(c) }));
    const day = document.querySelector('.day.is-selected');
    const stats = [...document.querySelectorAll('#stats .stat')].map(s => ({ text: s.textContent, ...r(s) }));
    return { card: { ...r(card), kids }, daySelected: day ? { cls: day.className, ...r(day) } : null, stats };
  });
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
