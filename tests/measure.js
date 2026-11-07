const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch();
  const out = {};
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(base, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    out[w] = await p.evaluate(() => {
      const q = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { t: Math.round(r.top), b: Math.round(r.bottom), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), h: Math.round(r.height) }; };
      return {
        art: q('.hero-art'), artSvg: q('.hero-art svg'), copy: q('.hero-copy'), actions: q('.hero-copy .actions'),
        card: q('.card'), topbar: q('.topbar'),
        chips: [...document.querySelectorAll('.stats > *')].map((e) => Math.round(e.getBoundingClientRect().width))
      };
    });
    await p.screenshot({ path: '../.shots/m-' + w + '.png' });
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 800, height: 400 } });
  await p.goto(base, { waitUntil: 'networkidle' });
  for (const s of [16, 24, 48]) {
    await p.evaluate((sz) => { const v = document.querySelector('#brand svg'); v.setAttribute('width', sz); v.setAttribute('height', sz); }, s);
    await p.locator('#brand').screenshot({ path: '../.shots/logo-' + s + '.png' });
    out['logo' + s] = await p.locator('#brand svg').boundingBox();
  }
  console.log(JSON.stringify(out, null, 1));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
