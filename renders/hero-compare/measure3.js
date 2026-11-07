const path = require('path');
const { chromium } = require(path.join(__dirname, '../../tests/node_modules/playwright'));
(async () => {
  const b = await chromium.launch();
  const s = await b.newPage({ viewport: { width: 390, height: 844 } });
  await s.goto('http://127.0.0.1:8770/index.html');
  await s.waitForSelector('.hero .actions');
  const m = await s.evaluate(() => {
    const chips = [...document.querySelectorAll('.stats > *')];
    const cb = Math.round(Math.max(...chips.map((e) => e.getBoundingClientRect().bottom)));
    const cta = document.querySelector('.hero .actions').getBoundingClientRect();
    const btns = [...document.querySelectorAll('.hero .actions .btn')].map((e) => Math.round(e.getBoundingClientRect().height));
    return { chipsBottom: cb, ctaTop: Math.round(cta.top), ctaBottom: Math.round(cta.bottom), gap: Math.round(cta.top) - cb, btnHeights: btns };
  });
  await s.screenshot({ path: path.join(__dirname, 'phone-cta-under-chips.png') });
  console.log(JSON.stringify(m));
  await s.close();
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
