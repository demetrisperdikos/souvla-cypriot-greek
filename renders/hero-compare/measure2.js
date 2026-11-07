const path = require('path');
const { chromium } = require(path.join(__dirname, '../../tests/node_modules/playwright'));
(async () => {
  const b = await chromium.launch();
  for (const [name, w, h] of [['phone', 390, 844], ['desk', 1440, 900]]) {
    const s = await b.newPage({ viewport: { width: w, height: h } });
    await s.goto('http://127.0.0.1:8769/index.html');
    await s.waitForSelector('.hero-art svg');
    const m = await s.evaluate(() => {
      const a = document.querySelector('.hero-art').getBoundingClientRect();
      const v = document.querySelector('.hero-art svg').getBoundingClientRect();
      return { artH: Math.round(a.height), svgH: Math.round(v.height), topGap: Math.round(v.top - a.top), bottomGap: Math.round(a.bottom - v.bottom) };
    });
    await s.screenshot({ path: path.join(__dirname, name + '-plate.png'), clip: { x: 0, y: 0, width: w, height: h } });
    console.log(name, JSON.stringify(m));
    await s.close();
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
