(function () {
'use strict';
// Hero scene: three charred chunks on one skewer over a plate that runs edge to edge.
// viewBox 600x220 with meet, so the whole scene shows at 1440 and 390.
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) {
var s = seed * 9301 + 49297;
return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
// Irregular outline: 9 lobes with uneven radii and angles, smoothed with quadratic curves.
function blobPath(cx, cy, rx, ry, seed) {
var r = rng(seed), n = 9, pts = [], i, a, k;
for (i = 0; i < n; i++) {
a = i * 2 * Math.PI / n + (r() - 0.5) * 0.4;
k = 0.7 + 0.55 * r();
pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
}
var m0 = mid(pts[n - 1], pts[0]);
var d = 'M' + f(m0[0]) + ' ' + f(m0[1]);
for (i = 0; i < n; i++) {
var p = pts[i], q = mid(p, pts[(i + 1) % n]);
d += ' Q' + f(p[0]) + ' ' + f(p[1]) + ' ' + f(q[0]) + ' ' + f(q[1]);
}
return d + ' Z';
}
var CHUNKS = [
{ cx: 172, cy: 116, rx: 64, ry: 46, seed: 3, hx: -30, hy: -24, hw: 14, hr: -6 },
{ cx: 300, cy: 90, rx: 78, ry: 60, seed: 7, hx: -36, hy: -30, hw: 16, hr: -8 },
{ cx: 426, cy: 122, rx: 56, ry: 42, seed: 11, hx: -26, hy: -22, hw: 12, hr: -6 }
];
function svg() {
var s = `<svg viewBox='0 0 600 220' preserveAspectRatio='xMidYMid meet' aria-hidden='true' focusable='false'>`;
s += `<defs>` +
`<linearGradient id='hMeat' x1='0' y1='0' x2='0' y2='1'>` +
`<stop offset='0' stop-color='#D98A4E'/><stop offset='.3' stop-color='#8E3F1C'/>` +
`<stop offset='.6' stop-color='#3A1709'/><stop offset='1' stop-color='#140703'/></linearGradient>` +
`<linearGradient id='hSkew' x1='0' y1='0' x2='0' y2='1'>` +
`<stop offset='0' stop-color='#E4E4E4'/><stop offset='.5' stop-color='#8C8C8C'/><stop offset='1' stop-color='#4A4A4A'/></linearGradient>` +
`<linearGradient id='hGround' x1='0' y1='0' x2='0' y2='1'>` +
`<stop offset='0' stop-color='#140703' stop-opacity='0'/><stop offset='.35' stop-color='#140703' stop-opacity='.16'/><stop offset='1' stop-color='#140703' stop-opacity='0'/></linearGradient>` +
`<filter id='hSoft' x='-30%' y='-200%' width='160%' height='500%'><feGaussianBlur stdDeviation='3'/></filter>` +
`</defs>`;
// plate: a soft ground band that runs edge to edge, with no hard edge
s += `<rect x='-900' y='168' width='2100' height='52' fill='url(#hGround)'/>`;
s += '';
CHUNKS.forEach(function (c) {
s += `<ellipse cx='${c.cx}' cy='${c.cy + c.ry - 2}' rx='${f(c.rx * 0.85)}' ry='5' fill='#140703' opacity='.4' filter='url(#hSoft)'/>`;
s += `<path d='${blobPath(c.cx, c.cy, c.rx, c.ry, c.seed)}' fill='url(#hMeat)' stroke='#0B0402' stroke-width='1.5' stroke-linejoin='round' vector-effect='non-scaling-stroke'/>`;
var x0 = c.cx + c.hx, y0 = c.cy + c.hy;
s += `<path d='M${f(x0)} ${f(y0)} Q${f(x0 + c.hw)} ${f(y0 - 3)} ${f(x0 + 2 * c.hw)} ${f(y0 + c.hr / 2)}' stroke='#FFF4E6' stroke-width='2' stroke-linecap='round' fill='none' vector-effect='non-scaling-stroke'/>`;
});
// skewer drawn last: 360 of 600 units, which is 60% of the plate width
s += `<rect x='120' y='110' width='360' height='6' rx='3' fill='url(#hSkew)'/>`;
s += `</svg>`;
return s;
}
function hero() {
var wrap = document.createElement('div');
wrap.className = 'hero-art';
wrap.setAttribute('aria-hidden', 'true');
wrap.innerHTML = `<span class='hero-chip'>Level check, 3 min</span>` + svg();
return wrap;
}
if (window.SouvlaArt) window.SouvlaArt.hero = hero;
})();
