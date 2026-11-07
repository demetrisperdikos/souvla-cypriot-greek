(function () {
'use strict';
// Hero scene. Warm radial bread gradient, upper-left specular highlight,
// lower shade, soft contact shadow, plate rim gradient, thick curved grill marks.

var xs = [-144, -48, 48, 144];

function chunk(cx) {
  return '<g transform="translate(' + cx + ' 0)">' +
    '<ellipse cx="0" cy="34" rx="38" ry="9" fill="#1A1A1A" opacity=".38" filter="url(#r12Blur)"/>' +
    '<rect x="-34" y="-30" width="68" height="62" rx="24" fill="url(#r12Meat)"/>' +
    '<rect x="-34" y="-30" width="68" height="62" rx="24" fill="none" stroke="#6B3A18" stroke-opacity=".5" stroke-width="1.5"/>' +
    '<path d="M-32 12 Q0 36 32 12 L32 24 Q0 44 -32 24 Z" fill="url(#r12Shade)"/>' +
    '<ellipse cx="-12" cy="-18" rx="22" ry="9" fill="url(#r12Hi)"/>' +
    '<path d="M-18 -24 Q-24 -4 -26 16 M6 -24 Q0 -4 -4 16" stroke="#2E1505" stroke-width="9" stroke-linecap="round" fill="none" opacity=".9"/>' +
    '</g>';
}

function heroSvg() {
  return '<svg class="hero-scene" viewBox="44 72 432 176" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">' +
    '<defs>' +
    '<radialGradient id="r12Meat" cx="40%" cy="30%" r="75%"><stop offset="0" stop-color="#FFF1D6"/><stop offset=".35" stop-color="#EDB86A"/><stop offset=".75" stop-color="#B86A2E"/><stop offset="1" stop-color="#6B3A18"/></radialGradient>' +
    '<linearGradient id="r12Shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A1C08" stop-opacity="0"/><stop offset="1" stop-color="#3A1C08" stop-opacity=".45"/></linearGradient>' +
    '<linearGradient id="r12Hi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".95"/><stop offset="1" stop-color="#FFF6E6" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="r12Plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#CBD4E0"/></linearGradient>' +
    '<linearGradient id="r12Rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6ECF4"/><stop offset=".5" stop-color="#A9B6C8"/><stop offset="1" stop-color="#6F7E95"/></linearGradient>' +
    '<filter id="r12Blur" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="3.5"/></filter>' +
    '</defs>' +
    '<ellipse cx="260" cy="206" rx="214" ry="22" fill="#1A1A1A" opacity=".16" filter="url(#r12Blur)"/>' +
    '<ellipse cx="260" cy="200" rx="206" ry="30" fill="url(#r12Rim)"/>' +
    '<ellipse cx="260" cy="197" rx="194" ry="24" fill="url(#r12Plate)"/>' +
    '<ellipse cx="260" cy="195" rx="160" ry="14" fill="#FFFFFF" opacity=".7"/>' +
    '<g transform="translate(260 118)">' +
    '<line x1="-190" y1="6" x2="190" y2="6" stroke="#000" stroke-width="7" stroke-linecap="round" opacity=".3" filter="url(#r12Blur)"/>' +
    '<line x1="-190" y1="0" x2="190" y2="0" stroke="#3A3A3A" stroke-width="10" stroke-linecap="round"/>' +
    '<line x1="-188" y1="-2" x2="188" y2="-2" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" opacity=".35"/>' +
    xs.map(chunk).join('') +
    '<circle cx="-190" cy="0" r="6" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="2"/>' +
    '<circle cx="190" cy="0" r="6" fill="#0062CC"/>' +
    '</g>' +
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
