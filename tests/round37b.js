const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8933/', { waitUntil: 'networkidle' });
  const info = await p.evaluate(() => Array.from(document.querySelectorAll('footer, .footer, .site-footer, .foot, [class*=foot]')).map(e => ({ tag: e.tagName, cls: e.className, bottom: Math.round(e.getBoundingClientRect().bottom), top: Math.round(e.getBoundingClientRect().top) })));
  console.log(JSON.stringify(info));
  await b.close();
})();
