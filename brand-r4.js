(function () {
'use strict';
var U = window.SouvlaUI;
var A = window.SouvlaArt || (window.SouvlaArt = {});

function n(name, attrs, parent) {
  var e = U.svgNode(name, attrs);
  if (parent) parent.appendChild(e);
  return e;
}

// Bold skewer mark: three meat pieces threaded on one stick, on the accent tile.
function logo() {
  var s = U.svgNode('svg', { viewBox: '0 0 48 48', 'class': 'brand-mark', 'aria-hidden': 'true', focusable: 'false' });
  n('rect', { x: 0, y: 0, width: 48, height: 48, rx: 14, fill: '#0062CC' }, s);
  n('path', { d: 'M7 24 H41', stroke: '#FFFFFF', 'stroke-width': 4, 'stroke-linecap': 'round' }, s);
  [14, 24, 34].forEach(function (cx) {
    n('circle', { cx: cx, cy: 24, r: 6.5, fill: '#FFFFFF', stroke: '#0062CC', 'stroke-width': 2.5 }, s);
  });
  return s;
}

function swapLogo() {
  var b = document.getElementById('brand');
  if (!b || b.querySelector('.brand-mark')) return;
  var old = b.querySelector('.mark, .brand-icon, .logo');
  var m = logo();
  if (old && old.parentNode === b) b.replaceChild(m, old);
  else b.insertBefore(m, b.firstChild);
}

swapLogo();
document.addEventListener('DOMContentLoaded', swapLogo);
var b = document.getElementById('brand');
if (b && window.MutationObserver) new MutationObserver(swapLogo).observe(b, { childList: true });

A.logo = logo;
})();
