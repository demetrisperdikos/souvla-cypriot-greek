const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const out = {};
  for (const [name, vp] of [['1440x900', { width: 1440, height: 900 }], ['390x844', { width: 390, height: 844 }]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto(base); await p.waitForSelector('.foot', { state: 'attached' }); await p.waitForTimeout(600);
    out[name] = await p.evaluate(() => {
      const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), height: Math.round(b.height) }; };
      const cards = [...document.querySelectorAll('.feature-row > .card')];
      const test = cards[0], chal = cards[1];
      const tb = (c) => c ? { top: Math.round(c.getBoundingClientRect().top), bottom: Math.round(c.getBoundingClientRect().bottom) } : null;
      const lastOpt = [...test.querySelectorAll('.test-opt, .btn.option')].pop();
      const testCta = test.querySelector('.btn:last-child');
      const chalCta = chal.querySelector('.btn:last-child');
      const upNext = chal.querySelector('.up-next');
      return {
        firstCardTop: tb(test).top, testCardTop: tb(test).top,
        lastOptionBottom: lastOpt ? Math.round(lastOpt.getBoundingClientRect().bottom) : null,
        testCtaTop: testCta ? Math.round(testCta.getBoundingClientRect().top) : null,
        testGapOptionToCta: (lastOpt && testCta) ? Math.round(testCta.getBoundingClientRect().top - lastOpt.getBoundingClientRect().bottom) : null,
        testCtaBottom: testCta ? Math.round(testCta.getBoundingClientRect().bottom) : null,
        challengeCtaBottom: chalCta ? Math.round(chalCta.getBoundingClientRect().bottom) : null,
        upNextTop: upNext ? Math.round(upNext.getBoundingClientRect().top) : null,
        upNextBottom: upNext ? Math.round(upNext.getBoundingClientRect().bottom) : null,
        upNextHeight: upNext ? Math.round(upNext.getBoundingClientRect().height) : null,
        gapUpNextToCta: upNext && chalCta ? Math.round(chalCta.getBoundingClientRect().top - upNext.getBoundingClientRect().bottom) : null,
        footTop: r('.foot') && r('.foot').top,
        overflowX: document.documentElement.scrollWidth > window.innerWidth,
        cssFiles: [...document.styleSheets].map(s => s.href).filter(Boolean)
      };
    });
    await p.screenshot({ path: `qa/shots/${name}.png`, fullPage: false });
    if (name === '1440x900') {
      await p.screenshot({ path: 'qa/shots/hero-2x-1440.png', clip: { x: 718, y: 137, width: 578, height: 200 }, scale: 'device' });
    }
    await p.close();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
