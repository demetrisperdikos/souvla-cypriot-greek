(function () {
'use strict';
// Round 14 hero: four cut souvla cubes on a dark skewer, each with a charred base,
// a fat band, sear marks and a specular highlight. Brand skewer mark unchanged.

var XS = [-132, -44, 44, 132];

function chunk(cx) {
  var d = 'M-44 -34 Q-40 -44 -26 -42 Q0 -48 26 -42 Q42 -44 44 -32 L45 28 Q45 44 29 44 L-29 44 Q-45 44 -45 28 Z';
  return '<g transform="translate(' + cx + ' 0)">' +
    '<ellipse cx="6" cy="50" rx="46" ry="8" fill="#2A1404" opacity=".4" filter="url(#r14Soft)"/>' +
    '<path d="' + d + '" fill="url(#r14Meat)"/>' +
    '<path d="M-45 -2 Q0 -18 45 -2 L45 6 Q0 -10 -45 6 Z" fill="#FFF0CC" opacity=".5"/>' +
    '<path d="' + d + '" fill="url(#r14Char)"/>' +
    '<path d="' + d + '" fill="none" stroke="#2A1204" stroke-width="3" stroke-opacity=".6"/>' +
    '<ellipse cx="-18" cy="-30" rx="18" ry="7" fill="#FFFFFF" opacity=".7" filter="url(#r14Soft2)"/>' +
    '<path d="M-30 -22 Q-38 0 -30 22 M-4 -22 Q-12 0 -4 22 M24 -22 Q18 0 24 22" stroke="#2A1204" stroke-width="7" stroke-linecap="round" fill="none" opacity=".7"/>' +
    '</g>';
}

function heroSvg() {
  var chunks = XS.map(chunk).join('');
  return '<svg class="hero-scene" viewBox="-214 -58 428 206" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="r14Meat" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FBE2B0"/><stop offset=".45" stop-color="#D68B42"/><stop offset=".85" stop-color="#8A4A1C"/><stop offset="1" stop-color="#5A2C0E"/></linearGradient>' +
    '<linearGradient id="r14Char" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1204" stop-opacity="0"/><stop offset="1" stop-color="#2A1204" stop-opacity=".55"/></linearGradient>' +
    '<linearGradient id="r14Plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4DCD0"/></linearGradient>' +
    '<linearGradient id="r14Rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4EEE4"/><stop offset="1" stop-color="#A89C8A"/></linearGradient>' +
    '<linearGradient id="r14Skewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A6A6A"/><stop offset="1" stop-color="#2A2A2A"/></linearGradient>' +
    '<filter id="r14Soft" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '<filter id="r14Soft2" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="1.2"/></filter>' +
    '</defs>' +
    '<ellipse cx="0" cy="124" rx="206" ry="16" fill="#2A1404" opacity=".22" filter="url(#r14Soft)"/>' +
    '<ellipse cx="0" cy="114" rx="190" ry="22" fill="url(#r14Rim)"/>' +
    '<ellipse cx="0" cy="108" rx="178" ry="18" fill="url(#r14Plate)"/>' +
    '<rect x="-204" y="-4" width="408" height="8" rx="4" fill="url(#r14Skewer)"/>' +
    '<circle cx="-206" cy="0" r="5" fill="#2A2A2A"/>' +
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

function logo() {
  return '<svg viewBox="3 12 42 24" width="36" height="20" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="brandCube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B0"/><stop offset="1" stop-color="#E0953F"/></linearGradient></defs>' +
    '<rect x="4" y="22.5" width="40" height="3" rx="1.5" fill="#FFFFFF"/>' +
    '<rect x="6" y="14" width="10" height="18" rx="4" fill="url(#brandCube)"/>' +
    '<rect x="19" y="14" width="10" height="18" rx="4" fill="url(#brandCube)"/>' +
    '<rect x="32" y="14" width="10" height="18" rx="4" fill="url(#brandCube)"/>' +
    '</svg>';
}

if (window.SouvlaArt) { window.SouvlaArt.hero = hero; window.SouvlaArt.logo = logo; }
})();
