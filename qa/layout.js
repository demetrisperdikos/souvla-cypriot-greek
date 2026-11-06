const { chromium } = require('playwright');
const BASE = process.env.BASE;
const CHROME = process.env.CHROME || undefined;
(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desktop']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(BASE);
    await page.waitForSelector('.hero-art svg');
    const hero = await page.locator('.hero-art').boundingBox();
    const row = await page.locator('.feature-row').boundingBox();
    const heroBottom = await page.locator('.hero').boundingBox();
    const gap = row.y - (heroBottom.y + heroBottom.height);
    console.log(`${tag}: hero-art ${Math.round(hero.width)}x${Math.round(hero.height)} | cards top ${Math.round(row.y)} bottom ${Math.round(row.y + row.height)} | gap hero->cards ${Math.round(gap)}px | viewport ${h}`);
    await page.close();
  }
  await browser.close();
})();
