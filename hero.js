(function () {
'use strict';
// Hero scene: three charred chunks threaded on one skewer, on a plate that runs edge to edge.
// Art box 600x220, preserveAspectRatio slice. Shapes are seeded so the output is deterministic.

function f(n) { return Math.round(n * 10) / 10; }
function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

// Small seeded generator, so each chunk keeps the same uneven lobes on every render.
function rng(seed) {
  var s = seed * 9301 + 49297;
  return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// Closed lumpy outline: 12 points with uneven radii, joined by smooth quadratic curves.
function blobPath(cx, cy, rx, ry, seed) {
  var r = rng(seed), n = 12, pts = [], i, t, k;
  for (i = 0; i < n; i++) {
    t = i * 2 * Math.PI / n;
    k = 0.84 + 0.26 * r();
    pts.push([cx + Math.cos(t) * rx * k, cy + Math.sin(t) * ry * k]);
  }
  var m0 = mid(pts[n - 1], pts[0]);
  var d = 'M' + f(m0[0]) + ' ' + f(m0[1]);
  for (i = 0; i < n; i++) {
    var p = pts[i], m = mid(p, pts[(i + 1) % n]);
    d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(m[0]) + ' ' + f(m[1]);
  }
  return d + ' Z';
}

var CHUNKS = [
  { cx: 200, cy: 112, rx: 60, ry: 50, seed: 3, hx: -22, hy: -30, hw: 10, hr: -10 },
  { cx: 300, cy: 104, rx: 66, ry: 56, seed: 7, hx: -26, hy: -38, hw: 12, hr: -6 },
  { cx: 400, cy: 112, rx: 58, ry: 48, seed: 11, hx: -20, hy: -28, hw: 9, hr: -12 }
];

function svg() {
  var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs>' +
    // meat: warm top, charred bottom half (ends at #140703)
    '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#D98A4E"/><stop offset=".3" stop-color="#8E3F1C"/>' +
    '<stop offset=".5" stop-color="#3E1A0A"/><stop offset=".75" stop-color="#1E0A04"/>' +
    '<stop offset="1" stop-color="#140703"/></linearGradient>' +
    '<linearGradient id="hSkew" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#F4F4F4"/><stop offset=".45" stop-color="#9C9C9C"/>' +
    '<stop offset=".65" stop-color="#5E5E5E"/><stop offset="1" stop-color="#262626"/></linearGradient>' +
    '<linearGradient id="hPlate" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#F1EBDF"/></linearGradient>' +
    '</defs>' +
    // plate: one ellipse wider than the art, so its edge runs off both sides of the panel
    '<ellipse cx="300" cy="190" rx="330" ry="28" fill="url(#hPlate)" stroke="#CFC3AE" stroke-width="1" vector-effect="non-scaling-stroke"/>';
  CHUNKS.forEach(function (c) {
    // soft contact shadow where the chunk sits on the plate
    s += '<ellipse cx="' + c.cx + '" cy="166" rx="' + f(c.rx * 0.9) + '" ry="7" fill="#140703" opacity=".3"/>';
    s += '<path d="' + blobPath(c.cx, c.cy, c.rx, c.ry, c.seed) + '" fill="url(#hMeat)" stroke="#140703" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    // narrow crisp highlight on the upper lobe
    var x0 = c.cx + c.hx, y0 = c.cy + c.hy;
    s += '<path d="M' + f(x0) + ' ' + f(y0) + ' Q' + f(x0 + c.hw) + ' ' + f(y0 - 3) + ' ' + f(x0 + c.hw * 2) + ' ' + f(y0 + c.hr / 3) + '" stroke="#FFF1E0" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".92"/>';
  });
  // skewer drawn last so it passes in front of the chunks; 360 of 600 units, about 60% of the art width
  s += '<rect x="120" y="112" width="360" height="10" rx="5" fill="url(#hSkew)" stroke="#1A1A1A" stroke-width="1" vector-effect="non-scaling-stroke"/>' +
    '<rect x="126" y="113" width="348" height="2" rx="1" fill="#FFFFFF" opacity=".6"/>';
  return s + '</svg>';
}

function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = svg() + '<span class="hero-chip">Level check, 3 min</span>';
  return wrap;
}

if (window.SouvlaArt) window.SouvlaArt.hero = hero;
})();
