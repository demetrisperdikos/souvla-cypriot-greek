const { chromium } = require('../tests/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 200, height: 120 } });
  const src = require('fs').readFileSync(__dirname + '/../brand.js', 'utf8');
  const m = src.match(/var MARK = '([^']+)'/)[1];
  for (const s of [16, 24, 48]) {
    await p.setContent('<body style="margin:0;background:#FFF">' + m.replace('width="48" height="48"', 'width="' + s + '" height="' + s + '"') + '</body>');
    await p.screenshot({ path: __dirname + '/mark-' + s + 'px.png', clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
  console.log('RENDERED');
})().catch(e => { console.error(e); process.exit(1); });
