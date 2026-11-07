const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const [name, w, h] of [['1440', 1440, 900], ['390', 390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('http://localhost:8931/', { waitUntil: 'networkidle' });
    out[name] = await p.evaluate(() => {
      const box = (sel) => Array.from(document.querySelectorAll(sel)).slice(0, 3).map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; });
      return { primaryCta: box('.btn.primary'), chip: box('.hero-chip'), statIco: box('.stat-ico'), upNextIco: box('.up-next-ico'), footerBottom: Math.round(document.querySelector('footer') ? document.querySelector('footer').getBoundingClientRect().bottom : -1), mark: box('.souvla-mark-svg') };
    });
    if (name === '390') out.markSvg = await p.evaluate(() => document.querySelector('.souvla-mark-svg').outerHTML);
    await p.close();
  }
  const p2 = await b.newPage({ viewport: { width: 200, height: 200 } });
  for (const s of [16, 24, 48]) {
    const svg = out.markSvg.replace('width="40" height="40"', 'width="' + s + '" height="' + s + '"');
    await p2.setContent('<body style="margin:0;background:#fff">' + svg + '</body>');
    await p2.screenshot({ path: 'brand-' + s + '.png', clip: { x: 0, y: 0, width: s, height: s } });
  }
  delete out.markSvg;
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch(e => { console.error('MEASURE_ERR', e.message); process.exit(1); });
