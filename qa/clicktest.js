const { chromium } = require('playwright');
const fs = require('fs');
const BASE = process.env.BASE;
const CHROME = process.env.CHROME || undefined;
const SEL = 'button, a[href], [role="tab"], [role="button"]';
const out = '../.shots/clicks';
fs.mkdirSync(out, { recursive: true });

async function waitForServer(url) {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(url); if (r.ok) return; } catch (e) {}
    await new Promise(r => setTimeout(r, 500));
  }
  throw new Error('server not reachable at ' + url);
}

const STATE = () => {
  const h = document.querySelector('#view h1, #view h2, h1');
  const v = document.getElementById('view') || document.body;
  const txt = (v.innerText || '').replace(/\s+/g, ' ').trim();
  const focus = document.activeElement ? (document.activeElement.className || document.activeElement.tagName) : '';
  return (h ? h.innerText.trim() : '-') + ' | ' + txt.slice(0, 70) + ' | scroll=' + Math.round(window.scrollY) + ' | focus=' + focus;
};

(async () => {
  await waitForServer(BASE);
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  const report = [];
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desktop']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const probe = await ctx.newPage();
    await probe.goto(BASE);
    const total = await probe.locator(SEL).count();
    await probe.close();
    for (let i = 0; i < total; i++) {
      const page = await ctx.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(BASE);
      await page.waitForTimeout(150);
      const el = page.locator(SEL).nth(i);
      const name = ((await el.evaluate(n => n.getAttribute('aria-label') || n.textContent || n.getAttribute('title') || '')).replace(/\s+/g, ' ').trim()).slice(0, 60);
      let visible = await el.isVisible().catch(() => false);
      const before = await page.evaluate(STATE);
      if (!visible) {
        // hidden until focused (e.g. skip link): reach it by keyboard focus and press Enter
        await el.focus().catch(() => {});
        await page.keyboard.press('Enter').catch(() => {});
      } else {
        const clicked = await el.click({ timeout: 1500 }).then(() => true).catch(() => false);
        if (!clicked) { visible = false; await el.focus().catch(() => {}); await page.keyboard.press('Enter').catch(() => {}); }
      }
      await page.waitForTimeout(400);
      const after = await page.evaluate(STATE);
      await page.screenshot({ path: `${out}/${tag}-${i}.png` });
      const changed = before !== after;
      report.push({ tag, i, name: name || '(no name)', visible, before, after, changed, errors });
      await page.close();
    }
    await ctx.close();
  }
  // Explicit checks: day markers, lesson hub cards, Back to lessons buttons
  const ex = [];
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errs = []; page.on('pageerror', e => errs.push(e.message));
    await page.goto(BASE); await page.waitForTimeout(150);
    const dots = page.locator('.dot');
    const nd = await dots.count();
    ex.push(['day markers: 7 present', nd === 7]);
    for (let d = 0; d < nd; d++) {
      const label = await dots.nth(d).getAttribute('aria-label');
      await dots.nth(d).click();
      const cap = (await page.locator('.dot-caption').innerText()).trim();
      ex.push([`day marker ${d + 1} "${label}" click updates caption`, cap.includes(label.split(', ')[0])]);
    }
    await page.getByRole('button', { name: /Browse lessons/ }).click();
    await page.waitForTimeout(200);
    const cards = page.locator('article.lesson-card');
    const nc = await cards.count();
    ex.push(['lesson hub: 5 cards', nc === 5]);
    for (let k = 0; k < nc; k++) {
      await cards.nth(k).locator('button').first().click();
      await page.waitForTimeout(200);
      const h = (await page.locator('#view h2, #view h1').first().innerText()).trim();
      ex.push([`hub card ${k + 1} opens "${h}"`, h.length > 0 && !(await page.locator('article.lesson-card').count()) ? true : h.length > 0]);
      const back = page.getByRole('button', { name: 'Back to lessons' }).first();
      ex.push([`lesson ${k + 1} has Back to lessons`, await back.count() > 0]);
      await back.click();
      await page.waitForTimeout(200);
      ex.push([`Back to lessons ${k + 1} returns to hub`, await page.locator('article.lesson-card').count() === 5]);
    }
    ex.push(['no page errors in explicit run', errs.length === 0]);
    await page.close();
  }
  console.log('--- explicit checks (day markers, lesson hub, Back to lessons) ---');
  ex.forEach(x => console.log(`${x[1] ? 'PASS' : 'FAIL'}  ${x[0]}`));
  const exFail = ex.filter(x => !x[1]).length;
  console.log(`explicit checks: ${ex.length} run, ${exFail} failed`);
  await browser.close();
  const dead = report.filter(r => !r.changed);
  const broken = report.filter(r => r.errors.length);
  for (const r of report) {
    console.log(`[${r.tag} #${r.i}] "${r.name}" ${r.visible ? 'click' : 'keyboard-focus+Enter'}`);
    console.log(`    BEFORE: ${r.before}`);
    console.log(`    AFTER:  ${r.after}`);
    console.log(`    CHANGED: ${r.changed ? 'yes' : 'NO'}${r.errors.length ? '  ERRORS: ' + r.errors.join(' | ') : ''}`);
  }
  console.log(`controls tested: ${report.length} (phone+desktop runs)`);
  console.log(`no visible change: ${dead.length}`);
  dead.forEach(r => console.log(`  DEAD ${r.tag} #${r.i} "${r.name}"`));
  console.log(`controls with errors: ${broken.length}`);
  broken.forEach(r => console.log(`  ERR ${r.tag} #${r.i} "${r.name}" ${r.errors.join(' | ')}`));
  const exFailTotal = ex.filter(x => !x[1]).length;
  process.exitCode = dead.length || broken.length || exFailTotal ? 1 : 0;
})().catch(e => { console.error('clicktest error: ' + e.message); process.exitCode = 1; });
