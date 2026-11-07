(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) { var s = seed; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
// Irregular lobed outline: each lobe gets its own radius, so chunks are not uniform blobs.
function blob(c) {
  var r = rng(c.seed), n = c.n, pts = [], i;
  for (i = 0; i < n; i++) {
    var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.45, k = 0.62 + 0.55 * r();
    pts.push([c.cx + Math.cos(a) * c.rx * k, c.cy + Math.sin(a) * c.ry * k]);
  }
  var m = mid(pts[n - 1], pts[0]), d = 'M' + f(m[0]) + ' ' + f(m[1]);
  for (i = 0; i < n; i++) {
    var p = pts[i], q = mid(p, pts[(i + 1) % n]);
    d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(q[0]) + ' ' + f(q[1]);
  }
  return d + ' Z';
}
// Chunks: varied sizes, the skewer runs through the middle of each.
var CH = [
  { cx: 120, cy: 118, rx: 60, ry: 44, seed: 3, n: 9 },
  { cx: 250, cy: 100, rx: 78, ry: 58, seed: 7, n: 11 },
  { cx: 384, cy: 120, rx: 62, ry: 42, seed: 11, n: 9 },
  { cx: 486, cy: 128, rx: 38, ry: 30, seed: 17, n: 7 }
];
var SKEWER_Y = 112;
var DEFS = '<defs>' +
  // Meat: light top, darkened toward #140703 at the bottom half.
  '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C97235"/><stop offset=".28" stop-color="#8E4119"/><stop offset=".52" stop-color="#4E210D"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  // Metal skewer: bright highlight band on top, dark underside.
  '<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E7D9CC"/><stop offset=".35" stop-color="#8F8078"/><stop offset=".7" stop-color="#3C302A"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<filter id="hSoft" x="-60%" y="-300%" width="220%" height="700%"><feGaussianBlur stdDeviation="2.5"/></filter>' +
  '</defs>';
function svg() {
  var s = '<svg viewBox="40 34 520 142" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + DEFS;
  // Metal bar, 4px, with a crisp highlight stripe.
  s += '<rect x="40" y="' + SKEWER_Y + '" width="520" height="4" rx="2" fill="url(#hBar)"/>';
  s += '<rect x="44" y="' + (SKEWER_Y + 0.6) + '" width="512" height="1.2" rx="0.6" fill="#FBF1E6" opacity=".85"/>';
  // Soft contact shadows under each chunk.
  CH.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + f(c.cy + c.ry - 2) + '" rx="' + f(c.rx * 0.9) + '" ry="5" fill="#140703" opacity=".55" filter="url(#hSoft)"/>';
  });
  CH.forEach(function (c) {
    // Charred rim: 1.5px dark outline.
    s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#0E0401" stroke-width="1.5" stroke-linejoin="round"/>';
    // Narrow crisp highlight on the upper lobe.
    s += '<ellipse cx="' + f(c.cx - c.rx * 0.22) + '" cy="' + f(c.cy - c.ry * 0.5) + '" rx="' + f(c.rx * 0.34) + '" ry="1.8" fill="#FBE7D2" opacity=".85"/>';
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
