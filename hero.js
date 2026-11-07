(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) {
  var s = seed * 9301 + 49297;
  return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
// Irregular charred outline: uneven lobes (0.5 to 1.25 of base radius), smoothed with quadratic curves.
function blob(c) {
  var r = rng(c.seed), n = c.n, pts = [], i;
  for (i = 0; i < n; i++) {
    var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.6, k = 0.5 + 0.75 * r();
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
  { cx: 150, cy: 112, rx: 56, ry: 40, seed: 3, n: 9 },
  { cx: 262, cy: 96, rx: 74, ry: 54, seed: 7, n: 11 },
  { cx: 378, cy: 118, rx: 58, ry: 42, seed: 11, n: 8 },
  { cx: 466, cy: 108, rx: 40, ry: 30, seed: 17, n: 7 }
];
var SKEWER_Y = 117;
var DEFS = '<defs>' +
  '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B9622B"/><stop offset=".3" stop-color="#7A3316"/><stop offset=".55" stop-color="#3A170A"/><stop offset=".8" stop-color="#1E0B04"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<linearGradient id="hBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9C8A80"/><stop offset=".45" stop-color="#4A3D36"/><stop offset="1" stop-color="#140703"/></linearGradient>' +
  '<filter id="hSoft" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="3"/></filter>' +
  '</defs>';
function svg() {
  var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' + DEFS + '<rect width="600" height="220" fill="#F5E4D5"/>';
  // contact shadows: soft, blurred, under each chunk
  CH.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + f(c.cy + c.ry - 2) + '" rx="' + f(c.rx * 0.9) + '" ry="6" fill="#140703" opacity=".45" filter="url(#hSoft)"/>';
  });
  // chunks: charred 1.5px rim, crisp narrow highlight on the upper lobe
  CH.forEach(function (c) {
    s += '<path d="' + blob(c) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" stroke-linejoin="round"/>';
    var x0 = c.cx - c.rx * 0.45, y0 = c.cy - c.ry * 0.5;
    s += '<path d="M' + f(x0) + ' ' + f(y0) + ' Q' + f(c.cx - c.rx * 0.1) + ' ' + f(c.cy - c.ry * 0.85) + ' ' + f(c.cx + c.rx * 0.2) + ' ' + f(c.cy - c.ry * 0.6) + '" stroke="#FFF4E6" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".85"/>';
  });
  // skewer: thin metal bar with a visible highlight, in front of the chunks
  s += '<ellipse cx="300" cy="' + (SKEWER_Y + 3) + '" rx="215" ry="2.5" fill="#140703" opacity=".55" filter="url(#hSoft)"/>';
  s += '<rect x="90" y="' + SKEWER_Y + '" width="420" height="3" rx="1.5" fill="url(#hBar)"/>';
  s += '<rect x="96" y="' + (SKEWER_Y + 0.5) + '" width="408" height="0.8" rx="0.4" fill="#F4E3D2" opacity=".75"/>';
  s += '</svg>';
  return s;
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
