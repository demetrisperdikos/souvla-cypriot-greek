const path = require('path');
const { chromium } = require(path.join(__dirname, '../../tests/node_modules/playwright'));
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1240, height: 340 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'index.html'));
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(__dirname, 'compare-1x.png') });
  for (const [name, w, h] of [['phone', 390, 844], ['desk', 1440, 900]]) {
    const s = await b.newPage({ viewport: { width: w, height: h } });
    await s.goto('http://127.0.0.1:8768/index.html');
    await s.waitForSelector('.hero-art svg');
    const m = await s.evaluate(() => {
      const a = document.querySelector('.hero-art').getBoundingClientRect();
      const v = document.querySelector('.hero-art svg').getBoundingClientRect();
      return { artW: Math.round(a.width), artH: Math.round(a.height), svgW: Math.round(v.width), svgH: Math.round(v.height), topGap: Math.round(v.top - a.top), bottomGap: Math.round(a.bottom - v.bottom) };
    });
    console.log(name, JSON.stringify(m));
    await s.close();
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
