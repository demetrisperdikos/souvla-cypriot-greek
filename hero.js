(function () {
'use strict';
// Hero scene: three irregular charred chunks threaded on one skewer, on a plate that spans the panel.
// Art box 600x220, preserveAspectRatio slice. Outlines are seeded, so output is deterministic.

function f(n) { return Math.round(n * 10) / 10; }
function mid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

// Seeded pseudo-random in [0,1), so each chunk gets its own lobe sizes.
function rng(seed) {
  var s = Math.sin(seed * 12.9898) * 43758.5453;
  return function () { s = Math.sin(s * 78.233 + 1.1) * 43758.5453; return s - Math.floor(s); };
}

// Irregular closed outline: 11 lobes with varied radii, so it reads as charred meat, not a soft ellipse.
function blobPath(cx, cy, rx, ry, seed) {
  var n = 11, pts = [], i, t, r = rng(seed), k;
  for (i = 0; i < n; i++) {
    t = i * 2 * Math.PI / n;
    k = 0.84 + 0.30 * r();
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
  { cx: 200, cy: 108, rx: 62, ry: 50, seed: 0.4 },
  { cx: 300, cy: 102, rx: 68, ry: 56, seed: 2.1 },
  { cx: 400, cy: 110, rx: 60, ry: 48, seed: 4.0 }
];

function svg() {
  var s = '<svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' +
    '<defs>' +
    // meat: warm top, dark lower half toward #140703
    '<linearGradient id="hMeat" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#D98A4E"/><stop offset=".3" stop-color="#A9522A"/>' +
    '<stop offset=".5" stop-color="#4A200D"/><stop offset=".72" stop-color="#241006"/>' +
    '<stop offset="1" stop-color="#140703"/></linearGradient>' +
    '<linearGradient id="hSkew" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#F4F4F4"/><stop offset=".45" stop-color="#9C9C9C"/>' +
    '<stop offset=".65" stop-color="#5E5E5E"/><stop offset="1" stop-color="#262626"/></linearGradient>' +
    '<linearGradient id="hPlate" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EFE9DC"/></linearGradient>' +
    // soft contact shadow: dark centre fading to transparent
    '<radialGradient id="hContact"><stop offset="0" stop-color="#140703" stop-opacity=".5"/>' +
    '<stop offset="1" stop-color="#140703" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    // plate: one body edge to edge of the panel, no separate grey band
    '<ellipse cx="300" cy="178" rx="300" ry="22" fill="url(#hPlate)" stroke="#8A7C63" stroke-width="1.5" vector-effect="non-scaling-stroke"/>';
  CHUNKS.forEach(function (c) {
    s += '<ellipse cx="' + c.cx + '" cy="' + (c.cy + c.ry * 0.95) + '" rx="' + (c.rx * 1.1) + '" ry="9" fill="url(#hContact)"/>';
  });
  CHUNKS.forEach(function (c) {
    s += '<path d="' + blobPath(c.cx, c.cy, c.rx, c.ry, c.seed) + '" fill="url(#hMeat)" stroke="#0E0502" stroke-width="1.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>';
    // crisp narrow highlight on the upper lobe
    s += '<path d="M' + f(c.cx - c.rx * 0.55) + ' ' + f(c.cy - c.ry * 0.35) + ' Q' + f(c.cx - c.rx * 0.1) + ' ' + f(c.cy - c.ry * 0.7) + ' ' + f(c.cx + c.rx * 0.3) + ' ' + f(c.cy - c.ry * 0.55) + '" stroke="#FFF3E0" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85" vector-effect="non-scaling-stroke"/>';
  });
  // skewer drawn last so it passes in front of the chunks; 60% of the art width
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
