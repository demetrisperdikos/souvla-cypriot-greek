const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const BASE = process.env.BASE;
const CHROME = process.env.CHROME || undefined;
const axeSrc = fs.readFileSync(path.join(__dirname, 'node_modules', 'axe-core', 'axe.min.js'), 'utf8');

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox'] });
  let failures = 0;
  for (const [w, h, tag] of [[390, 844, 'phone'], [1440, 900, 'desktop']]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto(BASE);
    await page.waitForTimeout(300);
    await page.addScriptTag({ content: axeSrc });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, { resultTypes: ['violations'] });
      return r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help }));
    });
    console.log(`[${tag}] axe violations: ${res.length}`);
    res.forEach(v => console.log(`  ${v.impact || 'n/a'} ${v.id} x${v.nodes} - ${v.help}`));
    failures += res.filter(v => v.impact === 'critical' || v.impact === 'serious').length;
    const small = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('button, a[href]').forEach(n => {
        const r = n.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.height < 44 || r.width < 44) out.push(((n.getAttribute('aria-label') || n.textContent || '').trim().slice(0, 40)) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
      });
      return out;
    });
    console.log(`[${tag}] controls under 44x44: ${small.length}`);
    small.forEach(s => console.log('  ' + s));
    await page.close();
  }
  await browser.close();
  process.exitCode = failures ? 1 : 0;
})().catch(e => { console.error('a11y error: ' + e.message); process.exitCode = 1; });
