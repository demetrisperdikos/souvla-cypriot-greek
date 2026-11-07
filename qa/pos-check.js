const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const [name, vp] of [['desktop1440', {width:1440,height:900}], ['phone390', {width:390,height:844}]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto('http://127.0.0.1:8131/index.html', { waitUntil: 'networkidle' });
    const r = await p.evaluate(() => {
      const q = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top + scrollY), bottom: Math.round(b.bottom + scrollY), h: Math.round(b.height), w: Math.round(b.width) }; };
      const btn = [...document.querySelectorAll('button,a')].find(e => /Begin the test/i.test(e.textContent));
      const bb = btn ? btn.getBoundingClientRect() : null;
      const card = document.querySelector('.challenge-card');
      const strip = document.querySelector('.challenge-card .next-up');
      return {
        beginTest: bb ? { top: Math.round(bb.top + scrollY), bottom: Math.round(bb.bottom + scrollY) } : null,
        testCard: q('.test-card'), challengeCard: q('.challenge-card'),
        nextUpStrip: strip ? q('.challenge-card .next-up') : null,
        cardBottomEdgeGap: (card && strip) ? Math.round(card.getBoundingClientRect().bottom - strip.getBoundingClientRect().bottom) : null,
        chip: q('.hero-chip'), hero: q('.hero-art'),
        overflowX: document.documentElement.scrollWidth - innerWidth
      };
    });
    console.log(name, JSON.stringify(r));
    await p.screenshot({ path: `/tmp/${name}.png`, fullPage: false });
    await p.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
