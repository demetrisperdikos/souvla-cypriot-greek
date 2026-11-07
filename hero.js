(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
function f(n) { return Math.round(n * 10) / 10; }
function mid(p, q) { return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; }
function rng(seed) {
var s = seed * 9301 + 49297;
return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
// Irregular charred outline: uneven lobe count, angles and radii, smoothed with quadratic curves.
function blob(c) {
var r = rng(c.seed), n = c.n, pts = [], i;
for (i = 0; i < n; i++) {
var a = i * 2 * Math.PI / n + (r() - 0.5) * 0.6, k = 0.6 + 0.6 * r();
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
{ cx: 172, cy: 118, rx: 62, ry: 46, seed: 3, n: 9 },
{ cx: 300, cy: 92, rx: 80, ry: 60, seed: 7, n: 11 },
{ cx: 428, cy: 122, rx: 54, ry: 40, seed: 11, n: 8 }
];
function svg() {
var s = "<svg viewBox='0 0 600 220' preserveAspectRatio='xMidYMid meet' aria-hidden='true' focusable='false'>";
s += '<defs>' +
"<linearGradient id='hMeat' x1='0' y1='0' x2='0' y2='1'>" +
"<stop offset='0' stop-color='#B8622E'/><stop offset='.35' stop-color='#6E2E14'/>" +
"<stop offset='.7' stop-color='#2A0F05'/><stop offset='1' stop-color='#140703'/></linearGradient>" +
"<linearGradient id='hMetal' x1='0' y1='0' x2='0' y2='1'>" +
"<stop offset='0' stop-color='#F4F4F4'/><stop offset='.45' stop-color='#9A9A9A'/><stop offset='.55' stop-color='#6A6A6A'/><stop offset='1' stop-color='#E8E8E8'/></linearGradient>" +
"<linearGradient id='hGround' x1='0' y1='0' x2='0' y2='1'>" +
"<stop offset='0' stop-color='#E9CDB3' stop-opacity='0'/><stop offset='.5' stop-color='#E9CDB3' stop-opacity='.6'/><stop offset='1' stop-color='#E9CDB3' stop-opacity='0'/></linearGradient>" +
"<filter id='hSoft' x='-30%' y='-200%' width='160%' height='500%'><feGaussianBlur stdDeviation='3'/></filter>" +
'</defs>';
// ground: soft fade across the full panel width, no hard edge
s += "<rect x='-20' y='168' width='640' height='52' fill='url(#hGround)'/>";
CH.forEach(function (c) {
s += "<ellipse cx='" + c.cx + "' cy='" + (c.cy + c.ry - 2) + "' rx='" + f(c.rx * 0.9) + "' ry='6' fill='#140703' opacity='.45' filter='url(#hSoft)'/>";
});
CH.forEach(function (c) {
s += "<path d='" + blob(c) + "' fill='url(#hMeat)' stroke='#140703' stroke-width='1.5' stroke-linejoin='round' vector-effect='non-scaling-stroke'/>";
// crisp narrow highlight on the upper lobe
var x0 = c.cx - c.rx * 0.5, y0 = c.cy - c.ry * 0.5;
s += "<path d='M" + f(x0) + ' ' + f(y0) + ' Q' + f(x0 + c.rx * 0.25) + ' ' + f(y0 - 6) + ' ' + f(x0 + c.rx * 0.5) + ' ' + f(y0 - 2) + "' stroke='#FFF4E6' stroke-width='1.6' stroke-linecap='round' fill='none' opacity='.9' vector-effect='non-scaling-stroke'/>";
});
// skewer drawn last so it passes in front of the chunks: 360 of 600 units (60% of plate width)
s += "<rect x='120' y='118' width='360' height='8' rx='4' fill='#140703' opacity='.35' filter='url(#hSoft)'/>";
s += "<rect x='120' y='112' width='360' height='7' rx='3.5' fill='url(#hMetal)' stroke='#5A5A5A' stroke-width='.5'/>";
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
