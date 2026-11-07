const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const base = process.env.BASE;
  const out = process.env.OUT;
  const b = await chromium.launch();
  const sizes = [[1440, 900, 'hero-1x-1440.png'], [390, 844, 'hero-1x-390.png']];
  for (const [w, h, name] of sizes) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto(base, { waitUntil: 'networkidle' });
    const box = await p.locator('.hero-art').boundingBox();
    await p.screenshot({ path: path.join(out, name), clip: box });
    await p.close();
  }
  await b.close();
  console.log('HERO_PNGS_OK');
})().catch(e => { console.error(e); process.exit(1); });
