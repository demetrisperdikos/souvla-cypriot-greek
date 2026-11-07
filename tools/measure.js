// Measurement helper for QA items. Run: node tools/measure.js (from project root)
const { chromium } = require('../qa/node_modules/playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:' + (process.env.PORT || '8080') + '/index.html';

function lum(rgb) {
  const c = rgb.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) { const x = lum(a), y = lum(b); return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2); }

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME || undefined, args: ['--no-sandbox'] });
  const out = {};

  // 1. Overflow scan 320-500
  const scan = [];
  let p = await browser.newPage({ viewport: { width: 320, height: 800 } });
  await p.goto(BASE); await p.waitForTimeout(400);
  for (let w = 320; w <= 500; w += 15) {
    await p.setViewportSize({ width: w, height: 800 }); await p.waitForTimeout(120);
    scan.push({ w, scrollWidth: await p.evaluate(() => document.documentElement.scrollWidth), clientWidth: await p.evaluate(() => document.documentElement.clientWidth) });
  }
  out.overflowScan = scan;
  await p.close();

  // 2. Desktop 1440x900 measurements
  const d = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await d.goto(BASE); await d.waitForTimeout(500);
  out.desktop = await d.evaluate(() => {
    const r = el => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top * 10) / 10, bottom: Math.round(b.bottom * 10) / 10, left: Math.round(b.left), right: Math.round(b.right), width: Math.round(b.width), height: Math.round(b.height) }; };
    const byText = (sel, txt) => [...document.querySelectorAll(sel)].find(e => e.textContent.trim().replace(/\s+/g, ' ').toLowerCase().startsWith(txt.toLowerCase()));
    const btn = txt => [...document.querySelectorAll('button,a')].find(e => e.textContent.trim().replace(/\s+/g, ' ').toLowerCase().includes(txt.toLowerCase()));
    const cs = (el, props) => { if (!el) return null; const s = getComputedStyle(el); const o = {}; props.forEach(k => o[k] = s[k]); return o; };
    const header = document.querySelector('.topbar') || document.querySelector('header');
    const eyebrow = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /a little cyprus, every day/i.test(e.textContent));
    const h1 = document.querySelector('h1');
    const lede = [...document.querySelectorAll('p')].find(e => /Discover the words/.test(e.textContent));
    const hero = h1 ? (h1.closest('section,.hero,header') || h1.parentElement) : null;
    const panel = document.querySelector('.hero svg') ? document.querySelector('.hero svg').closest('div,figure,section') : null;
    const svg = document.querySelector('.hero svg');
    const pill = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /^Level check/.test(e.textContent.trim()));
    const pillBox = pill ? pill.closest('span,div,p') : null;
    const diag = btn('Start diagnosis');
    const browse = btn('Browse lessons');
    const begin = btn('Begin the test');
    const open = btn('Open First Greetings') || btn('Open ');
    const cards = [...document.querySelectorAll('section,article,.card')].filter(e => /The Souvla Test|Daily challenge/.test(e.textContent) && e.getBoundingClientRect().height > 200);
    const cardTops = cards.map(c => r(c));
    const heroPanelBottom = svg ? svg.getBoundingClientRect().bottom : null;
    const wyg = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === 'What you get');
    const lis = wyg ? [...(wyg.closest('section,div,.card') || document).querySelectorAll('li')] : [];
    const pillRect = pill ? pill.getBoundingClientRect() : null;
    const panelRect = pill ? (pill.closest('[class*=panel],[class*=scene],[class*=art],[class*=visual]') || pill.parentElement.parentElement).getBoundingClientRect() : null;
    return {
      headerBottom: header ? r(header).bottom : null,
      eyebrow: r(eyebrow), eyebrowStyle: cs(eyebrow, ['fontSize','color','marginTop']),
      h1: r(h1), h1Style: cs(h1, ['fontSize','lineHeight','fontWeight','fontFamily']),
      lede: r(lede), ledeStyle: cs(lede, ['fontSize','lineHeight','color','fontFamily']),
      ledeBg: lede ? getComputedStyle(lede.closest('section,div,main') || document.body).backgroundColor : null,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      svgRect: r(svg), panelRect: panelRect ? { top: panelRect.top, bottom: panelRect.bottom, left: panelRect.left, right: panelRect.right } : null,
      pill: r(pillBox), pillInsetTop: pillRect && panelRect ? Math.round(pillRect.top - panelRect.top) : null, pillInsetRight: pillRect && panelRect ? Math.round(panelRect.right - pillRect.right) : null,
      ctaBottoms: { diagnosis: r(diag), browse: r(browse), begin: r(begin), openFirstGreetings: r(open) },
      cardTops, heroPanelBottomToFirstCard: cardTops.length ? Math.round((Math.min(...cardTops.map(c => c.top)) - heroPanelBottom) * 10) / 10 : null,
      whatYouGet: lis.map(li => ({ text: li.textContent.trim().slice(0, 40), font: getComputedStyle(li).fontSize, before: getComputedStyle(li, '::before').content, beforeBg: getComputedStyle(li, '::before').backgroundColor, beforeW: getComputedStyle(li, '::before').width, gap: getComputedStyle(li).rowGap })),
      statChips: [...document.querySelectorAll('#stats > *, .stats > *')].map(e => ({ h: Math.round(e.getBoundingClientRect().height), padL: getComputedStyle(e).paddingLeft }))
    };
  });
  await d.close();

  // 3. Phone 390 measurements
  const m = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await m.goto(BASE); await m.waitForTimeout(500);
  out.phone = await m.evaluate(() => {
    const stats = [...document.querySelectorAll('#stats > *, .stats > *')];
    const gaps = stats.slice(1).map((e, i) => Math.round(e.getBoundingClientRect().left - stats[i].getBoundingClientRect().right));
    const svg = document.querySelector('.hero svg');
    const h1 = document.querySelector('h1');
    const firstCard = [...document.querySelectorAll('section,article,.card')].find(e => /The Souvla Test/.test(e.textContent));
    const svgBox = svg ? svg.getBoundingClientRect() : null;
    const main = document.querySelector('main').getBoundingClientRect();
    return {
      chipHeights: stats.map(e => Math.round(e.getBoundingClientRect().height)),
      chipGaps: gaps,
      chipPaddingTop: stats[0] ? getComputedStyle(stats[0]).paddingTop : null,
      chipPaddingLeft: stats[0] ? getComputedStyle(stats[0]).paddingLeft : null,
      svgLeft: svgBox ? Math.round(svgBox.left) : null, svgRight: svgBox ? Math.round(svgBox.right) : null,
      contentLeft: Math.round(main.left), contentRight: Math.round(main.right),
      svgToFirstCard: firstCard && svgBox ? Math.round(firstCard.getBoundingClientRect().top - svgBox.bottom) : null,
      svgBottomIsPanel: svg ? svg.getBoundingClientRect().bottom : null
    };
  });
  await m.screenshot({ path: '.shots/measure-390.png', fullPage: true });
  await d.screenshot ? null : null;
  await browser.close();
  console.log(JSON.stringify(out, null, 1));
})().catch(e => { console.error('MEASURE FAILED', e); process.exit(1); });
