const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ headless: true });
  const out = {};
  for (const [n, vp] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto(base, { waitUntil: 'networkidle' });
    out[n] = await p.evaluate(() => {
      const g = (s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e); return { weight: c.fontWeight, size: c.fontSize, text: e.textContent.slice(0, 30) }; };
      return { testTitle: g('.test-card h2'), challengeTitle: g('.challenge-card h2'), bodyTitle: g('.lesson-card h3') || g('.lesson-card h2') || g('.card h3'), upNext: g('.challenge-card .up-next') };
    });
    await p.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
