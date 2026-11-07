const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  for (const [name, vp] of [['1440', { width: 1440, height: 900 }], ['390', { width: 390, height: 844 }]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto(process.env.BASE); await p.waitForSelector('.foot', { state: 'attached' }); await p.waitForTimeout(500);
    const out = await p.evaluate(() => {
      const cards = [...document.querySelectorAll('.feature-row > .card')];
      const dump = (c) => [...c.children].map(k => { const r = k.getBoundingClientRect(); const cs = getComputedStyle(k); return { cls: k.className, tag: k.tagName, top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), display: cs.display, flex: cs.flex, margin: cs.margin, height: cs.height, minH: cs.minHeight }; });
      const up = document.querySelector('.challenge-card .up-next');
      const upParent = up && up.parentElement;
      const pcs = upParent && getComputedStyle(upParent);
      return { test: dump(cards[0]), challenge: dump(cards[1]), featureRowDisplay: getComputedStyle(document.querySelector('.feature-row')).display, challengeCardDisplay: getComputedStyle(cards[1]).display, challengeCardHeight: getComputedStyle(cards[1]).height, upParentDisplay: pcs && pcs.display, upParentFlexDir: pcs && pcs.flexDirection, upParentCls: upParent && upParent.className, testOptsCount: cards[0].querySelectorAll('.test-opt, .btn.option').length };
    });
    console.log('== ' + name + ' ==\n' + JSON.stringify(out, null, 1));
    await p.close();
  }
  await b.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
