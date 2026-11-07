const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({ args: ['--no-sandbox'] });
  const p = await b.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('http://127.0.0.1:8800/index.html', { waitUntil: 'networkidle0' });
  const out = await p.evaluate(() => {
    const card = document.querySelector('.challenge-card');
    const strip = card.querySelector('.up-next');
    const cs = getComputedStyle(strip);
    const rules = [];
    for (const sheet of document.styleSheets) {
      for (const r of sheet.cssRules) {
        if (r.selectorText && strip.matches(r.selectorText) && /height|flex|min-height/.test(r.style.cssText)) {
          rules.push(r.selectorText + ' => ' + r.style.cssText);
        }
        if (r.cssRules) for (const rr of r.cssRules) {
          if (rr.selectorText && strip.matches(rr.selectorText) && /height|flex|min-height/.test(rr.style.cssText)) {
            rules.push('@media ' + r.conditionText + ' | ' + rr.selectorText + ' => ' + rr.style.cssText);
          }
        }
      }
    }
    return {
      cardH: card.getBoundingClientRect().height,
      stripH: strip.getBoundingClientRect().height,
      computedHeight: cs.height,
      computedFlex: cs.flex,
      computedMinH: cs.minHeight,
      cardComputedHeight: getComputedStyle(card).height,
      cardDisplay: getComputedStyle(card).display,
      rules: rules
    };
  });
  console.log(JSON.stringify(out, null, 2));
  await b.close();
})();
