const { chromium } = require('./node_modules/playwright');
const fs = require('fs');
const out = process.env.OUT;
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await p.goto('http://127.0.0.1:' + process.env.PORT + '/index.html');
  await p.waitForTimeout(400);
  // Unselected day tab: the Tuesday marker (single letter T, second in the row).
  const tabs = p.locator('.day').filter({ hasText: /^T$/ });
  const target = tabs.nth(0);
  await target.focus();
  await p.keyboard.press('Shift+Tab');
  await p.keyboard.press('Tab');
  await p.waitForTimeout(250);
  const info = await target.evaluate(e => ({
    focused: e === document.activeElement,
    focusVisible: e.matches(':focus-visible'),
    outline: getComputedStyle(e).outlineStyle + ' ' + getComputedStyle(e).outlineColor + ' ' + getComputedStyle(e).outlineWidth,
    selected: e.classList.contains('is-selected')
  }));
  console.log('day tab:', JSON.stringify(info));
  const box = await target.boundingBox();
  await p.screenshot({ path: out + '/day-tab-focus.png', clip: { x: box.x - 24, y: box.y - 24, width: box.width + 48, height: box.height + 48 } });
  // Brand mark at 16px and 24px, read from the live SVG.
  const svgHTML = await p.locator('#brand svg').first().evaluate(e => e.outerHTML);
  const q = await b.newPage({ viewport: { width: 200, height: 40 }, deviceScaleFactor: 1 });
  await q.setContent('<body style="margin:0;background:#fff;display:flex;gap:12px;align-items:center;padding:4px"><span id="a"></span><span id="c"></span></body>');
  await q.evaluate((s) => {
    const mk = (w) => { const d = document.createElement('div'); d.innerHTML = s; const v = d.firstChild; v.setAttribute('width', w); v.setAttribute('height', w); return v; };
    document.getElementById('a').appendChild(mk(16));
    document.getElementById('c').appendChild(mk(24));
  }, svgHTML);
  await q.screenshot({ path: out + '/brand-16-24.png', clip: { x: 0, y: 0, width: 200, height: 40 } });
  await b.close();
})();
