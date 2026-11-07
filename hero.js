(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
// Irregular lobed outline: each lobe gets its own radius, so the meat is not a uniform blob.
function blob(c) {
  var r = rng(c.seed), n = c.n, pts = [], i;
  for (i = 0; i < n; i++) {
    var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.45, k = 0.6 + 0.6 * r();
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
  { cx: 120, cy: 112, rx: 58, ry: 42, seed: 3, n: 9 },
  { cx: 250, cy: 104, rx: 76, ry: 56, seed: 7, n: 11 },
  { cx: 384, cy: 114, rx: 60, ry: 40, seed: 11, n: 9 },
  { cx: 486, cy: 122, rx: 38, ry: 28, seed: 17, n: 7 }
];
var SKEWER_Y = 111;
var DEFS = '<defs>' +
  '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C97235"/><stop offset=".3" stop-color="#8E4119"/><stop offset=".55" stop-color="#4A200C"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCCFC2"/><stop offset=".5" stop-color="#7A6A60"/><stop offset="1" stop-color="#2A201B"/></linearGradient>' +
  '<filter id="hSoft" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="3"/></filter>' +
  '</defs>';
function svg() {
  var s = '<svg viewBox="40 36 520 130" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + DEFS;
  // Thin metal skewer, 3px, with its own top highlight from the gradient.
  s += '<rect x="40" y="' + SKEWER_Y + '" width="520" height="3" rx="1.5" fill="url(#hBar)"/>';
  // Soft contact shadow under each chunk (blurred, sits on the skewer, no ground bar).
  CH.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + f(c.cy + c.ry - 4) + '" rx="' + f(c.rx * 0.8) + '" ry="4" fill="#140703" opacity=".5" filter="url(#hSoft)"/>';
  });
  CH.forEach(function (c) {
    // Charred rim 1.5px, meat gradient darkens toward #140703 in the lower half.
    s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#0E0401" stroke-width="1.5" stroke-linejoin="round"/>';
    // Crisp 1.5px highlight on the upper lobe.
    s += '<ellipse cx="' + f(c.cx - c.rx * 0.25) + '" cy="' + f(c.cy - c.ry * 0.55) + '" rx="' + f(c.rx * 0.3) + '" ry="1.5" fill="#FBE7D2" opacity=".8"/>';
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
