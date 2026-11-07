const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(base, { waitUntil: 'networkidle' });
  const svg = await p.evaluate(() => document.querySelector('.souvla-mark-svg') ? document.querySelector('.souvla-mark-svg').outerHTML : '');
  const out = {};
  for (const s of [16, 24, 48]) {
    const html = '<body style="margin:0;background:#fff"><div style="width:' + s + 'px;height:' + s + 'px">' + svg.replace(/width='?"?\d+"?'?/, 'width="' + s + '"').replace(/height='?"?\d+"?'?/, 'height="' + s + '"') + '</div></body>';
    await p.setContent(html);
    const el = await p.$('svg');
    const box = await el.boundingBox();
    await el.screenshot({ path: 'brand-' + s + '.png' });
    out[s] = { w: box.width, h: box.height };
  }
  console.log('BRAND', JSON.stringify(out));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
