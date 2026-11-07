const { chromium } = require('playwright');
(async () => {
  const base = process.env.BASE;
  const b = await chromium.launch();
  const out = {};
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: w === 1440 ? 900 : 844 } });
    await p.goto(base, { waitUntil: 'networkidle' });
    out[w] = await p.evaluate((w) => {
      const checks = [];
      const add = (name, ok) => checks.push({ name: name, ok: !!ok });
      add('no horizontal overflow', document.documentElement.scrollWidth <= window.innerWidth);
      const h1 = document.querySelector('h1');
      add('headline 40px or larger', h1 && parseFloat(getComputedStyle(h1).fontSize) >= 40);
      const btns = [...document.querySelectorAll('.btn')];
      add('every button at least 40px tall', btns.length > 0 && btns.every(x => x.getBoundingClientRect().height >= 40));
      add('no unstyled native button', [...document.querySelectorAll('button')].every(x => x.className));
      add('hero art svg present', !!document.querySelector('.hero-art svg'));
      add('three stat tiles with labels', document.querySelectorAll('.stat .stat-label').length === 3);
      add('week day tabs 40px', [...document.querySelectorAll('.week>.day')].every(d => Math.round(d.getBoundingClientRect().width) === 40));
      add('brand mark present', !!document.querySelector('.souvla-mark-svg'));
      const card = document.querySelector('.test-card');
      add('Souvla Test card ends above 900px fold', w !== 1440 || (card && card.getBoundingClientRect().bottom <= 900));
      return { passed: checks.filter(c => c.ok).length, total: checks.length, score: Math.round(10 * checks.filter(c => c.ok).length / checks.length * 10) / 10, failed: checks.filter(c => !c.ok).map(c => c.name) };
    }, w);
    await p.close();
  }
  console.log('SCORE ' + JSON.stringify(out));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
