const { chromium } = require('playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8765/index.html';
const results = [];
const fails = [];
function check(name, ok, info) {
  results.push((ok ? 'PASS ' : 'FAIL ') + name + (info ? ' :: ' + info : ''));
  if (!ok) fails.push(name);
}
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  // Phone 390px: every card must sit fully inside the viewport
  const phone = await b.newContext({ viewport: { width: 390, height: 844 } });
  const p = await phone.newPage();
  await p.goto(BASE);
  await p.waitForSelector('h1.display');
  const cards = await p.locator('.card').evaluateAll(els => els.map(e => {
    const r = e.getBoundingClientRect();
    const h = e.querySelector('h2,h3');
    return { left: r.left, right: r.right, title: h ? h.textContent.trim() : e.className };
  }));
  check('phone 390: at least two cards rendered', cards.length >= 2, 'count=' + cards.length);
  for (const c of cards) {
    check('phone 390: card inside viewport (' + c.title + ')', c.left >= 0 && c.right <= 390.5, 'left=' + c.left.toFixed(1) + ' right=' + c.right.toFixed(1));
  }
  // Style checks for brief items 6, 7, 8
  const style = await p.evaluate(() => {
    const out = {};
    const stat = document.querySelector('.stats .stat');
    if (stat) {
      const s = getComputedStyle(stat);
      out.statBg = s.backgroundImage === 'none' ? s.backgroundColor : s.backgroundImage;
      out.statBorder = s.borderTopWidth + ' ' + s.borderTopColor;
    }
    const card = document.querySelector('.card');
    if (card) out.cardBorder = getComputedStyle(card).borderTopWidth;
    const dayDots = document.querySelectorAll('.week .day, .week .dot');
    out.dayCount = dayDots.length;
    if (dayDots.length) {
      const d = getComputedStyle(dayDots[0]);
      out.dayRadius = d.borderRadius;
      out.dayBorder = d.borderTopWidth;
    }
    return out;
  });
  check('item 6: stat chip uses flat #F4F8FF fill', style.statBg === 'rgb(244, 248, 255)', 'bg=' + style.statBg);
  check('item 6: stat chip has 1px #CFE2FA border', style.statBorder === '1px rgb(207, 226, 250)', 'border=' + style.statBorder);
  check('item 7: card border is 1px', style.cardBorder === '1px', 'border=' + style.cardBorder);
  check('item 8: seven weekday pills rendered', style.dayCount === 7, 'count=' + style.dayCount);
  check('item 8: weekday pill has round radius', style.dayRadius !== undefined && style.dayRadius !== '0px', 'radius=' + style.dayRadius);
  await phone.close();
  await b.close();
  results.forEach(r => console.log(r));
  if (fails.length) { console.log('FAIL layout: ' + fails.length + ' check(s) failed'); process.exit(1); }
  console.log('PASS layout: all ' + results.length + ' checks');
})().catch(e => { console.log('FAIL layout: ' + e.message); process.exit(1); });
