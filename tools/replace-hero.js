const fs = require('fs');
const p = 'art.js';
let src = fs.readFileSync(p, 'utf8');
const hero = `function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  var s = U.svgNode('svg', { viewBox: '0 0 480 320', 'class': 'art', focusable: 'false', preserveAspectRatio: 'xMidYMid meet' });
  add(s, 'rect', { x: 0, y: 0, width: 480, height: 320, rx: 24, fill: '#F2F2F0' });
  // one scene: a charcoal grill, two skewers, and the blue mascot seated beside it
  add(s, 'rect', { x: 96, y: 216, width: 8, height: 64, fill: '#4A4A4A' });
  add(s, 'rect', { x: 296, y: 216, width: 8, height: 64, fill: '#4A4A4A' });
  add(s, 'rect', { x: 88, y: 200, width: 232, height: 20, rx: 8, fill: '#5A5A5A' });
  add(s, 'rect', { x: 128, y: 182, width: 160, height: 4, rx: 2, fill: '#8C8C8C' });
  add(s, 'rect', { x: 136, y: 150, width: 144, height: 4, rx: 2, fill: '#8C8C8C' });
  [144, 176, 208, 240, 272].forEach(function (x) {
    add(s, 'circle', { cx: x, cy: 184, r: 9, fill: '#FFFFFF', stroke: '#CFCFCA', 'stroke-width': 2 });
  });
  [152, 184, 216, 248].forEach(function (x) {
    add(s, 'circle', { cx: x, cy: 152, r: 9, fill: '#FFFFFF', stroke: '#CFCFCA', 'stroke-width': 2 });
  });
  add(s, 'rect', { x: 0, y: 280, width: 480, height: 40, fill: '#ECEAE6' });
  character(s, 400, 280, 1);
  wrap.appendChild(s);
  return wrap;
}

`;
const re = /function hero\(\) \{[\s\S]*?\n\}\n\n/;
if (!re.test(src)) { console.error('hero not found'); process.exit(1); }
src = src.replace(re, hero);
src = src.replace("var mascotSvg = mascot('flame');", "var mascotSvg = window.SouvlaArt.mascot('flame');");
fs.writeFileSync(p, src);
console.log('ok');
