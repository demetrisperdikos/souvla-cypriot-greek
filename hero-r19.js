(function () {
'use strict';
// Round 19 hero: four irregular seared souvla chunks on a dark skewer, charred edges,
// grill marks and a juicy highlight, on a plate with a lit top lip, darker rim and soft shadow.

var CHUNK = 'M-44 -18 C-46 -36 -26 -44 -12 -38 C0 -46 18 -44 30 -36 C46 -30 48 -12 44 2 C48 18 40 36 22 38 C10 46 -8 44 -18 40 C-34 46 -48 34 -46 16 C-50 2 -48 -8 -44 -18 Z';
var XS = [-132, -44, 44, 132];

function chunk(x, i) {
  var rot = i % 2 ? -3 : 3;
  return '<g transform="translate(' + x + ' 0) rotate(' + rot + ')">' +
    '<ellipse cx="4" cy="46" rx="48" ry="7" fill="#2A1205" opacity=".35" filter="url(#h19Soft)"/>' +
    '<path d="' + CHUNK + '" fill="url(#h19Meat)"/>' +
    '<path d="' + CHUNK + '" fill="url(#h19Char)"/>' +
    '<path d="M-34 -22 Q-38 -2 -30 20 M-4 -28 Q-8 0 -2 28 M28 -24 Q24 -2 30 22" fill="none" stroke="#1E0E04" stroke-width="5" stroke-linecap="round" opacity=".55"/>' +
    '<path d="' + CHUNK + '" fill="none" stroke="#1E0E04" stroke-opacity=".7" stroke-width="2.2"/>' +
    '<ellipse cx="-24" cy="-26" rx="10" ry="5" transform="rotate(-18 -24 -26)" fill="#FFF6E0" opacity=".85"/>' +
    '<circle cx="-31" cy="-31" r="2" fill="#FFFFFF" opacity=".9"/>' +
    '</g>';
}

function heroSvg() {
  var chunks = XS.map(chunk).join('');
  return '<svg class="hero-svg" viewBox="-240 -62 480 160" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
    '<defs>' +
    '<radialGradient id="h19Meat" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#F6B872"/><stop offset=".55" stop-color="#C8702E"/><stop offset="1" stop-color="#7A3510"/></radialGradient>' +
    '<linearGradient id="h19Char" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1205" stop-opacity="0"/><stop offset=".6" stop-color="#2A1205" stop-opacity=".25"/><stop offset="1" stop-color="#1A0A02" stop-opacity=".75"/></linearGradient>' +
    '<linearGradient id="h19Skewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A6A6A"/><stop offset="1" stop-color="#1F1F1F"/></linearGradient>' +
    '<linearGradient id="h19Plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#EDE6DA"/></linearGradient>' +
    '<linearGradient id="h19Rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D9D0C1"/><stop offset="1" stop-color="#B9AE9B"/></linearGradient>' +
    '<filter id="h19Soft" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '</defs>' +
    '<ellipse cx="0" cy="84" rx="196" ry="12" fill="#3A2410" opacity=".28" filter="url(#h19Soft)"/>' +
    '<ellipse cx="0" cy="72" rx="184" ry="20" fill="url(#h19Rim)"/>' +
    '<ellipse cx="0" cy="66" rx="174" ry="16" fill="url(#h19Plate)"/>' +
    '<ellipse cx="0" cy="61" rx="150" ry="5" fill="#FFFFFF" opacity=".85"/>' +
    '<rect x="-216" y="-3.5" width="432" height="7" rx="3.5" fill="url(#h19Skewer)"/>' +
    '<circle cx="216" cy="0" r="5" fill="#1F1F1F"/>' +
    chunks +
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
