const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE || 'http://127.0.0.1:8080/index.html';
  const opts = { headless: true };
  if (process.env.CHROME) opts.executablePath = process.env.CHROME;
  const browser = await chromium.launch(opts);
  const out = {};
  for (const [name, vp] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
    const page = await browser.newPage({ viewport: vp, deviceScaleFactor: 1 });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    out[name] = await page.evaluate(() => {
      const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), h: Math.round(b.height) }; };
      const q = (s) => document.querySelector(s);
      const tc = q('.test-card'); const cc = q('.challenge-card');
      const tcBtn = tc && tc.querySelector('.btn:last-of-type');
      const ccBtn = cc && cc.querySelector('.btn:last-of-type');
      const opts = tc && tc.querySelector('.test-opts');
      const lastOpt = opts && opts.lastElementChild;
      return {
        heroArt: r(q('.hero-art')),
        testCard: r(tc), testH2: r(tc && tc.querySelector('h2')),
        testLastOpt: r(lastOpt), testCta: r(tcBtn),
        gapOptsToCta: (lastOpt && tcBtn) ? Math.round(tcBtn.getBoundingClientRect().top - lastOpt.getBoundingClientRect().bottom) : null,
        challengeCard: r(cc), upNext: r(cc && cc.querySelector('.up-next')), challengeCta: r(ccBtn),
        docH: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth
      };
    });
    await page.close();
  }
  await browser.close();
  console.log(JSON.stringify(out, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
