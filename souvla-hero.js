(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};

// Hero scene: four kebab chunks on one skewer. No stripes or dash marks.
// Each chunk: irregular outline, dark lower half toward #140703, 1.5px charred rim, crisp highlight on the upper lobe.
var CHUNKS = [
  { x: 78,  rx: 56, ry: 46, m: [1, 0.9, 1.06, 0.94, 1.08, 0.9, 1.02, 0.96] },
  { x: 190, rx: 66, ry: 56, m: [1, 1.07, 0.92, 1.1, 0.88, 1.04, 0.95, 1.06] },
  { x: 302, rx: 58, ry: 48, m: [1.05, 0.9, 1, 1.1, 0.92, 0.98, 0.86, 1.05] },
  { x: 400, rx: 40, ry: 36, m: [1, 0.9, 1.1, 0.86, 1.04, 0.95, 1, 0.88] }
];
var CY = 110;

function f(v) { return v.toFixed(1); }

// Smooth closed outline through jittered points (midpoint quadratic curves).
function blobPath(cx, cy, rx, ry, m) {
  var n = m.length, p = [], i;
  for (i = 0; i < n; i++) {
    var a = 2 * Math.PI * i / n;
    p.push([cx + rx * m[i] * Math.cos(a), cy + ry * m[i] * Math.sin(a)]);
  }
  function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }
  var s = mid(p[n - 1], p[0]);
  var d = 'M' + f(s[0]) + ' ' + f(s[1]);
  for (i = 0; i < n; i++) {
    var q = p[i], e = mid(p[i], p[(i + 1) % n]);
    d += ' Q' + f(q[0]) + ' ' + f(q[1]) + ' ' + f(e[0]) + ' ' + f(e[1]);
  }
  return d + ' Z';
}

function chunk(c) {
  var body = blobPath(c.x, CY, c.rx, c.ry, c.m);
  var hx = c.x - c.rx * 0.22, hy = CY - c.ry * 0.56;
  return '<ellipse cx="' + f(c.x + 4) + '" cy="' + f(CY + c.ry * 0.82) + '" rx="' + f(c.rx * 0.9) + '" ry="7" fill="#140703" opacity=".28"/>' +
    '<path d="' + body + '" fill="url(#hvMeat)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>' +
    '<ellipse cx="' + f(hx) + '" cy="' + f(hy) + '" rx="' + f(c.rx * 0.36) + '" ry="' + f(c.ry * 0.13) + '" transform="rotate(-14 ' + f(hx) + ' ' + f(hy) + ')" fill="#FFE8C4" opacity=".85"/>';
}

function sceneSVG() {
  var defs = '<defs><linearGradient id="hvMeat" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#C0703A"/><stop offset=".38" stop-color="#8E4420"/>' +
    '<stop offset=".7" stop-color="#3B1706"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
    '<linearGradient id="hvSkewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9D9D9"/><stop offset=".5" stop-color="#7A7A7A"/><stop offset="1" stop-color="#3A3A3A"/></linearGradient></defs>';
  var skewer = '<rect x="0" y="' + (CY - 1.5) + '" width="440" height="3" rx="1.5" fill="url(#hvSkewer)"/>';
  var parts = CHUNKS.map(chunk).join('');
  return '<svg class="hv-scene" viewBox="20 20 440 190" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Four chunks of grilled meat on a skewer" focusable="false">' +
    defs + skewer + parts + '</svg>';
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hv-visual hero-art';
  var row = document.createElement('div');
  row.className = 'hv-chip-row';
  var chip = document.createElement('span');
  chip.className = 'hv-chip';
  chip.textContent = 'Level check, 3 min';
  row.appendChild(chip);
  var panel = document.createElement('div');
  panel.className = 'hv-panel';
  panel.insertAdjacentHTML('beforeend', sceneSVG());
  wrap.appendChild(row);
  wrap.appendChild(panel);
  return wrap;
}

A.hero = hero;
})();
