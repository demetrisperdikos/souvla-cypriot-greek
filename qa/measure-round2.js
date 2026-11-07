const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto('http://localhost:8123/index.html', { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const q = s => { const e = document.querySelector(s); if (!e) return null; const x = e.getBoundingClientRect(); return { top: Math.round(x.top), bottom: Math.round(x.bottom), left: Math.round(x.left), width: Math.round(x.width) }; };
      const btns = [...document.querySelectorAll('button, a.btn, .btn')].filter(e => e.offsetParent).map(e => { const x = e.getBoundingClientRect(); return { text: e.textContent.trim().slice(0, 30), top: Math.round(x.top), bottom: Math.round(x.bottom) }; });
      return { hero: q('.hero-art'), testCard: q('.test-card'), firstCard: q('.card, .test-card'), ctas: btns.slice(0, 6), docH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth };
    });
    console.log(w, JSON.stringify(r));
    await p.screenshot({ path: 'qa/qa-shots/round2-' + w + '.png', fullPage: false });
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
