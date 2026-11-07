const puppeteer = require('puppeteer-core');
(async () => {
  const b = await puppeteer.launch({executablePath: '/usr/bin/chromium', headless: 'new', args: ['--no-sandbox']});
  const p = await b.newPage();
  await p.setViewport({width: 1440, height: 900});
  await p.goto('http://127.0.0.1:8799/', {waitUntil: 'networkidle0'});
  const r = await p.evaluate(() => {
    const pick = s => { const e = document.querySelector(s); if (!e) return null; const cs = getComputedStyle(e); const bb = e.getBoundingClientRect(); return {top: Math.round(bb.top), h: Math.round(bb.height), pt: cs.paddingTop, pb: cs.paddingBottom, mt: cs.marginTop, mb: cs.marginBottom}; };
    return {main: pick('.main'), view: pick('#view'), hero: pick('.hero-art'), copy: pick('.hero-row > *:first-child') , row: pick('#view > *'), feature: pick('.feature-row')};
  });
  console.log(JSON.stringify(r, null, 1));
  await b.close();
})();
