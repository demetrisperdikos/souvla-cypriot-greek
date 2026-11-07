const { chromium } = require('../tests/node_modules/playwright');
const fs = require('fs');
(async () => {
  const svg = fs.readFileSync('brand.js', 'utf8').match(/MARK = "(.*?)";/)[1];
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 200, height: 80 }, deviceScaleFactor: 1 });
  const cells = [16, 24, 48].map(s => '<div style="width:'+s+'px;height:'+s+'px">' + svg.replace(/width='48' height='48'/, "width='"+s+"' height='"+s+"'") + '</div>').join('');
  await p.setContent('<body style="margin:0;background:#fff;display:flex;gap:12px;align-items:center;padding:8px">' + cells + '</body>');
  await p.screenshot({ path: 'qa-measure/brand-sizes.png' });
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
