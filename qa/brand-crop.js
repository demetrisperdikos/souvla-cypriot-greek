const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 600, height: 200 }, deviceScaleFactor: 4 });
  await p.goto('http://127.0.0.1:8126/index.html', { waitUntil: 'networkidle' });
  await p.waitForSelector('#brand svg', { timeout: 15000 });
  const loc = p.locator('#brand svg').first();
  console.log(JSON.stringify(await loc.boundingBox()));
  await loc.screenshot({ path: 'brand-crop-48px.png' });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
