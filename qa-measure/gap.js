const { chromium } = require('../tests/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://127.0.0.1:8931/index.html', { waitUntil: 'load' });
  await p.waitForSelector('.foot', { timeout: 15000 });
  const r = await p.evaluate(() => {
    const f = document.querySelector('.foot');
    const cs = getComputedStyle(f);
    const chain = [];
    let e = f.parentElement;
    for (let i = 0; i < 4 && e; i++) {
      const s = getComputedStyle(e);
      chain.push({ tag: e.tagName, cls: e.className, pad: s.padding, mar: s.margin, bottom: Math.round(e.getBoundingClientRect().bottom) });
      e = e.parentElement;
    }
    const prev = f.previousElementSibling;
    return { footer: { mar: cs.margin, pad: cs.padding, h: cs.height, top: Math.round(f.getBoundingClientRect().top), bottom: Math.round(f.getBoundingClientRect().bottom) }, prev: prev ? { tag: prev.tagName, cls: prev.className, bottom: Math.round(prev.getBoundingClientRect().bottom), mar: getComputedStyle(prev).margin } : null, chain };
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
