(function () {
'use strict';
// Round 9 hero: rounded cubes with a cooked-edge silhouette, warm light-top to deep-base gradient,
// upper-left specular highlight, thick curved grill marks, plate with a visible contact shadow.
// Also supplies a new brand skewer mark that renders at about 70% of its 48px tile.

var XS = [-132, -44, 44, 132];

function cube(cx) {
  return '<g transform="translate(' + cx + ' 0)">' +
    '<ellipse cx="6" cy="50" rx="46" ry="9" fill="#2A1404" opacity=".38" filter="url(#r13Soft)"/>' +
    '<rect x="-44" y="-42" width="88" height="88" rx="28" fill="url(#r13Meat)"/>' +
    '<path d="M-44 14 Q0 40 44 14 L44 28 Q44 46 28 46 L-28 46 Q-44 46 -44 28 Z" fill="url(#r13Base)"/>' +
    '<rect x="-44" y="-42" width="88" height="88" rx="28" fill="none" stroke="#5A2C0E" stroke-opacity=".55" stroke-width="2"/>' +
    '<ellipse cx="-20" cy="-26" rx="20" ry="9" fill="#FFFFFF" opacity=".85" filter="url(#r13Soft2)"/>' +
    '<path d="M-26 -30 Q-36 0 -26 30 M4 -30 Q-6 0 4 30 M30 -30 Q24 0 30 30" stroke="#3B1A06" stroke-width="10" stroke-linecap="round" fill="none" opacity=".88"/>' +
    '</g>';
}

function heroSvg() {
  var chunks = XS.map(cube).join('');
  return '<svg class="hero-scene" viewBox="-214 -58 428 206" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">' +
    '<defs>' +
    '<linearGradient id="r13Meat" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#FBE2B0"/><stop offset=".45" stop-color="#D68B42"/><stop offset=".85" stop-color="#8A4A1C"/><stop offset="1" stop-color="#5A2C0E"/></linearGradient>' +
    '<linearGradient id="r13Base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B1A06" stop-opacity="0"/><stop offset="1" stop-color="#3B1A06" stop-opacity=".55"/></linearGradient>' +
    '<linearGradient id="r13Plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4DCD0"/></linearGradient>' +
    '<linearGradient id="r13Rim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4EEE4"/><stop offset="1" stop-color="#A89C8A"/></linearGradient>' +
    '<linearGradient id="r13Skewer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6A6A6A"/><stop offset="1" stop-color="#2A2A2A"/></linearGradient>' +
    '<filter id="r13Soft" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="4"/></filter>' +
    '<filter id="r13Soft2" x="-50%" y="-150%" width="200%" height="400%"><feGaussianBlur stdDeviation="1.2"/></filter>' +
    '</defs>' +
    '<ellipse cx="0" cy="124" rx="206" ry="16" fill="#2A1404" opacity=".22" filter="url(#r13Soft)"/>' +
    '<ellipse cx="0" cy="114" rx="190" ry="22" fill="url(#r13Rim)"/>' +
    '<ellipse cx="0" cy="108" rx="178" ry="18" fill="url(#r13Plate)"/>' +
    '<rect x="-204" y="-4" width="408" height="8" rx="4" fill="url(#r13Skewer)"/>' +
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

// Brand skewer: white skewer and three amber cubes, drawn to ~70% of the 48px tile.
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
