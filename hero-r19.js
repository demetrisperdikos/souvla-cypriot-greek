(function () {
'use strict';
// Round 19 hero: four irregular seared souvla chunks on a dark skewer, over a plate with a lit top lip, darker rim and soft shadow.
var DEFS = `<defs>
<radialGradient id='h19Meat' cx='.4' cy='.35' r='.8'><stop offset='0' stop-color='#F8B873'/><stop offset='.55' stop-color='#C8702E'/><stop offset='1' stop-color='#6E2E0C'/></radialGradient>
<linearGradient id='h19Skewer' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#6A6A6A'/><stop offset='1' stop-color='#1C1C1C'/></linearGradient>
<linearGradient id='h19Plate' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFFEFA'/><stop offset='1' stop-color='#ECE5D6'/></linearGradient>
<linearGradient id='h19Rim' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#CDC3AE'/><stop offset='1' stop-color='#9E9380'/></linearGradient>
<filter id='h19Blur' x='-50%' y='-200%' width='200%' height='500%'><feGaussianBlur stdDeviation='5'/></filter>
</defs>`;
var SHAPES = [
'M-40 -16 L-34 -30 L-14 -35 L6 -30 L24 -36 L40 -26 L43 -6 L37 8 L42 24 L22 35 L4 29 L-12 36 L-31 28 L-42 14 L-36 0 Z',
'M-41 -10 L-30 -28 L-10 -33 L10 -36 L30 -30 L42 -14 L38 4 L44 18 L28 33 L10 30 L-8 36 L-28 31 L-40 20 L-37 4 Z',
'M-38 -24 L-18 -34 L2 -31 L20 -37 L38 -22 L41 2 L35 14 L40 30 L18 36 L-2 30 L-22 35 L-40 24 L-42 6 Z',
'M-42 -6 L-32 -26 L-8 -32 L14 -34 L34 -28 L42 -8 L40 12 L30 30 L8 34 L-14 31 L-34 34 L-41 18 Z'
];
var XS = [-132, -44, 44, 132];
var ROT = [-3, 2, -2, 3];
function chunk(i) {
  var p = SHAPES[i];
  return `<g transform='translate(${XS[i]} 24) rotate(${ROT[i]})'>` +
    `<path d='${p}' fill='url(#h19Meat)'/>` +
    `<path d='${p}' fill='none' stroke='#2A1204' stroke-width='6' stroke-linejoin='round' opacity='.65'/>` +
    `<path d='M-24 -22 L-14 26 M0 -26 L8 28 M22 -22 L30 20' stroke='#3A1706' stroke-width='3.5' stroke-linecap='round' fill='none' opacity='.5'/>` +
    `<ellipse cx='-18' cy='-20' rx='8' ry='3.5' transform='rotate(-18 -18 -20)' fill='#FFF4DC' opacity='.85'/>` +
    `<circle cx='20' cy='-24' r='2' fill='#FFF8E8' opacity='.9'/>` +
    '</g>';
}
function heroSvg() {
  return `<svg viewBox='-230 -50 460 172' width='460' height='172' aria-hidden='true' focusable='false'>` + DEFS +
    `<ellipse cx='0' cy='80' rx='200' ry='13' fill='#2A1404' opacity='.28' filter='url(#h19Blur)'/>` +
    `<ellipse cx='0' cy='72' rx='186' ry='19' fill='url(#h19Rim)'/>` +
    `<ellipse cx='0' cy='66' rx='176' ry='17' fill='url(#h19Plate)'/>` +
    `<ellipse cx='0' cy='63' rx='170' ry='14' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.9'/>` +
    `<rect x='-214' y='20' width='428' height='8' rx='4' fill='url(#h19Skewer)'/>` +
    `<circle cx='-216' cy='24' r='5' fill='#1C1C1C'/>` +
    chunk(0) + chunk(1) + chunk(2) + chunk(3) +
    '</svg>';
}
function hero() {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = heroSvg() + '<span class="hero-chip">Level check, 3 min</span>';
  return wrap;
}
if (window.SouvlaArt) window.SouvlaArt.hero = hero;
})();
