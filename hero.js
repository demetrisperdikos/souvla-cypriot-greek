(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) {
  var s = seed;
  return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
// Irregular charred outline: uneven lobes smoothed with quadratic curves.
function blob(c) {
  var r = rng(c.seed), n = c.n, pts = [], i;
  for (i = 0; i < n; i++) {
    var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.5, k = 0.6 + 0.6 * r();
    pts.push([c.cx + Math.cos(a) * c.rx * k, c.cy + Math.sin(a) * c.ry * k]);
  }
  var m = mid(pts[n - 1], pts[0]), d = 'M' + f(m[0]) + ' ' + f(m[1]);
  for (i = 0; i < n; i++) {
    var p = pts[i], q = mid(p, pts[(i + 1) % n]);
    d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(q[0]) + ' ' + f(q[1]);
  }
  return d + ' Z';
}
// Varied lobe sizes: one large, one tall, two small.
var CH = [
  { cx: 150, cy: 118, rx: 62, ry: 44, seed: 3, n: 9 },
  { cx: 275, cy: 100, rx: 82, ry: 58, seed: 7, n: 11 },
  { cx: 402, cy: 122, rx: 64, ry: 46, seed: 11, n: 8 },
  { cx: 500, cy: 116, rx: 42, ry: 32, seed: 17, n: 7 }
];
var SKY = 134;
var DEFS = '<defs>' +
  '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9622B"/><stop offset=".3" stop-color="#7A3316"/><stop offset=".55" stop-color="#3A170A"/><stop offset=".8" stop-color="#1E0B04"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9C8A80"/><stop offset=".5" stop-color="#4A3D36"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<filter id="hSoft" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>' +
  '</defs>';
function svg() {
  var s = '<svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + DEFS;
  // Thin skewer with a metal highlight along its length.
  s += '<ellipse cx="300" cy="' + (SKY + 5) + '" rx="250" ry="2.5" fill="#140703" opacity=".5" filter="url(#hSoft)"/>';
  s += '<rect x="40" y="' + SKY + '" width="520" height="4" rx="2" fill="url(#hBar)"/>';
  s += '<rect x="48" y="' + (SKY + 0.5) + '" width="504" height="1" rx="0.5" fill="#F4E3D2" opacity=".6"/>';
  // Soft contact shadow under each chunk.
  CH.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + f(c.cy + c.ry * 0.85) + '" rx="' + f(c.rx * 0.9) + '" ry="6" fill="#140703" opacity=".45" filter="url(#hSoft)"/>';
  });
  // Chunks: charred 1.5px rim, narrow highlight on the upper lobe.
  CH.forEach(function (c) {
    s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" stroke-linejoin="round"/>';
    s += '<ellipse cx="' + f(c.cx - c.rx * 0.25) + '" cy="' + f(c.cy - c.ry * 0.5) + '" rx="' + f(c.rx * 0.35) + '" ry="1.8" fill="#F4E3D2" opacity=".7" transform="rotate(-6 ' + c.cx + ' ' + c.cy + ')"/>';
  });
  return s + '</svg>';
}
function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = "<span class='hero-chip'>Level check, 3 min</span>" + svg();
  return wrap;
}
A.hero = hero;
})();
