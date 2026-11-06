const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const base = process.env.BASE;
const axeSrc = fs.readFileSync(path.join(__dirname, 'node_modules/axe-core/axe.min.js'), 'utf8');
const fails = [];
function check(name, ok, detail) {
  console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail !== undefined ? ' :: ' + detail : ''));
  if (!ok) fails.push(name);
}
async function axeIds(page) {
  await page.addScriptTag({ content: axeSrc });
  return page.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa'] });
    return r.violations.map(v => v.id + ':' + v.nodes.length);
  });
}
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, bypassCSP: true });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await page.goto(base);
    const start = page.locator('button', { hasText: 'Start diagnosis' }).first();
    await start.waitFor({ state: 'visible', timeout: 20000 });

    const before = await start.evaluate(el => getComputedStyle(el).backgroundColor);
    await start.hover();
    await page.waitForTimeout(300);
    const hovered = await start.evaluate(el => getComputedStyle(el).backgroundColor);
    check('hover changes primary button (' + w + ')', before !== hovered, before + ' -> ' + hovered);

    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const a = document.activeElement; if (!a) return 'none';
      const s = getComputedStyle(a); return s.outlineStyle + ' ' + s.outlineWidth;
    });
    check('keyboard focus ring visible (' + w + ')', !/none 0px/.test(outline), outline);

    const hres = await axeIds(page);
    check('axe WCAG 2 A/AA home (' + w + ')', hres.length === 0, hres.join(', ') || 'clean');

    await start.click();
    await page.locator('.option').first().waitFor({ state: 'visible', timeout: 20000 });
    const opts = await page.locator('.option').count();
    check('quiz shows options (' + w + ')', opts >= 2, 'options=' + opts);
    const qres = await axeIds(page);
    check('axe WCAG 2 A/AA quiz (' + w + ')', qres.length === 0, qres.join(', ') || 'clean');

    check('no page errors (' + w + ')', errs.length === 0, errs.join(' | ') || 'none');
    await ctx.close();
  }
  await browser.close();
  if (fails.length) { console.log('FAILED: ' + fails.join('; ')); process.exit(1); }
  console.log('ALL STATE CHECKS PASSED');
})().catch(e => { console.error(e); process.exit(1); });
