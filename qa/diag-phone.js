const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto('http://127.0.0.1:8127/index.html', { waitUntil: 'networkidle' });
  await p.waitForSelector('.test-card', { timeout: 15000 });
  const r = await p.evaluate(() => { const card = document.querySelector('.test-card'); return { card: Math.round(card.getBoundingClientRect().bottom), kids: [...card.children].map(c => { const bb = c.getBoundingClientRect(); const cs = getComputedStyle(c); return { cls: c.className, top: Math.round(bb.top), bottom: Math.round(bb.bottom), mt: cs.marginTop, order: cs.order, display: cs.display }; }) }; });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
