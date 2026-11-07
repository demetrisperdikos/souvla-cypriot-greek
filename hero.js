(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
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
var CH = [
  { cx: 120, cy: 120, rx: 62, ry: 46, seed: 3, n: 9 },
  { cx: 245, cy: 100, rx: 80, ry: 60, seed: 7, n: 11 },
  { cx: 380, cy: 122, rx: 64, ry: 44, seed: 11, n: 9 },
  { cx: 488, cy: 128, rx: 40, ry: 30, seed: 17, n: 7 }
];
var SKEWER_Y = 112;
var DEFS = '<defs>' +
  '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9622B"/><stop offset=".35" stop-color="#7A3316"/><stop offset=".65" stop-color="#3A170A"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9C8A80"/><stop offset=".5" stop-color="#4A3D36"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<filter id="hSoft" x="-30%" y="-300%" width="160%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>' +
  '</defs>';
function svg() {
  var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + DEFS;
  s += '<rect x="40" y="' + SKEWER_Y + '" width="520" height="3.5" rx="1.75" fill="url(#hBar)"/>';
  s += '<rect x="48" y="' + (SKEWER_Y + 0.7) + '" width="504" height="1" rx="0.5" fill="#F4E3D2" opacity=".7"/>';
  CH.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + f(c.cy + c.ry - 4) + '" rx="' + f(c.rx * 0.85) + '" ry="6" fill="#140703" opacity=".5" filter="url(#hSoft)"/>';
  });
  CH.forEach(function (c) {
    s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5"/>';
    s += '<ellipse cx="' + f(c.cx - c.rx * 0.2) + '" cy="' + f(c.cy - c.ry * 0.55) + '" rx="' + f(c.rx * 0.45) + '" ry="2" fill="#F4E3D2" opacity=".65"/>';
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
