const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const BASE = process.env.BASE || 'http://127.0.0.1:8765/index.html';
  const b = await chromium.launch({ args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    const svg = document.querySelector('.hero-art > svg');
    const sb = svg.getBoundingClientRect();
    const sk = svg.querySelector('rect[fill="url(#hBar)"]').getBoundingClientRect();
    const chunks = [...svg.querySelectorAll('path[stroke="#140703"]')].map(e => e.getBoundingClientRect());
    const plateL = Math.min(...chunks.map(r => r.left)), plateR = Math.max(...chunks.map(r => r.right));
    const div = document.querySelector('.section-divider');
    const dv = div ? div.getBoundingClientRect() : null;
    const cards = [...document.querySelectorAll('.feature-row > .card')].map(c => c.getBoundingClientRect().bottom);
    return { skewerWidthPct: +(100 * sk.width / (plateR - plateL)).toFixed(1), skewerWidthOfPlatePct: +(100*sk.width/sb.width).toFixed(1), plateEdgeToEdgePx: +(plateR-plateL).toFixed(1), divider: dv ? { top: Math.round(dv.top), viewport: 900 } : null, lowerCardsBottom: cards.map(Math.round) };
  });
  console.log(JSON.stringify(m));
  const bp = await b.newPage({ viewport: { width: 200, height: 120 }, deviceScaleFactor: 1 });
  const brandSvg = await p.evaluate(() => document.querySelector('#brand .mark').innerHTML);
  for (const s of [16, 24, 48]) {
    await bp.setContent('<body style="margin:0;background:#fff"><div style="width:'+s+'px;height:'+s+'px">' + brandSvg.replace('width="48" height="48"', 'width="'+s+'" height="'+s+'"') + '</div></body>');
    await bp.screenshot({ path: path.resolve(__dirname, '..', '..', 'renders', 'brand-' + s + '.png'), clip: { x: 0, y: 0, width: s, height: s } });
  }
  console.log('brand sizes written to renders/');
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
