const { chromium } = require('./tests/node_modules/playwright');
(async () => {
  const b = await chromium.launch();
  const out = {};
  for (const [name, vp] of [['phone390', { width: 390, height: 844 }], ['desk1440', { width: 1440, height: 900 }]]) {
    const p = await b.newPage({ viewport: vp });
    await p.goto('http://127.0.0.1:' + process.env.PORT + '/index.html');
    await p.waitForTimeout(400);
    out[name] = await p.evaluate(() => {
      const answers = ['Yassou mas', 'Kalispera sas', 'Efharisto'];
      const all = [...document.querySelectorAll('body *')];
      const hit = all.filter(e => answers.some(a => e.childElementCount === 0 && e.textContent.trim() === a) || answers.some(a => e.textContent.trim() === a && e.children.length <= 2));
      const first = hit.length ? hit[0] : null;
      const optBox = first ? first.closest('button, [role="radio"], [role="button"], label, [class*="opt"], [class*="choice"], [class*="answer"]') || first : null;
      const card = [...document.querySelectorAll('h2, h3')].find(h => /Souvla Test/.test(h.textContent));
      const foot = document.querySelector('.foot');
      return {
        firstAnswerBottom: optBox ? Math.round(optBox.getBoundingClientRect().bottom) : null,
        firstAnswerTag: optBox ? optBox.tagName + '.' + optBox.className : null,
        souvlaTitleTop: card ? Math.round(card.getBoundingClientRect().top) : null,
        footerBottom: foot ? Math.round(foot.getBoundingClientRect().bottom) : null
      };
    });
    await p.close();
  }
  await b.close();
  console.log(JSON.stringify(out));
})();
