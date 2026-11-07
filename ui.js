(function () {
'use strict';
var SVG_NS = 'http://www.w3.org/2000/svg';
var PATHS = {
  flame: 'M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  skewer: 'M3 12h18M7 8v8M17 8v8',
  right: 'M5 12h14M13 6l6 6-6 6',
  left: 'M19 12H5M11 6l-6 6 6 6',
  book: 'M4 4h6a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3-3zM20 4h-6a3 3 0 0 0-3 3v13h6a3 3 0 0 1 3-3z',
  chat: 'M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z',
  puzzle: 'M4 4h5v3a2 2 0 1 0 4 0V4h5v5h-3a2 2 0 1 0 0 4h3v7H4v-7h3a2 2 0 1 0 0-4H4z',
  sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 2v2M12 20v2M2 12h2M20 12h2',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 11h.01',
  flip: 'M4 4v5h5M20 20v-5h-5M20 9a8 8 0 0 0-14-3M4 15a8 8 0 0 0 14 3',
  refresh: 'M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5'
};
function svgNode(tag, attrs) {
  var n = document.createElementNS(SVG_NS, tag);
  Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
  return n;
}
function icon(name, cls) {
  var svg = svgNode('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false', 'class': 'i ' + (cls || '') });
  svg.appendChild(svgNode('path', { d: PATHS[name] || '' }));
  return svg;
}
function el(tag, cls, text) {
  var n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function btn(label, cls, onClick, iconName) {
  var variants = ['primary', 'secondary', 'ghost'];
  var b = el('button', 'btn ' + (variants.indexOf(cls) >= 0 ? cls : (cls || '')));
  b.type = 'button';
  if (iconName) b.appendChild(icon(iconName));
  b.appendChild(document.createTextNode(label));
  b.addEventListener('click', onClick);
  return b;
}
function shuffle(a) {
  var b = a.slice();
  for (var i = b.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = b[i]; b[i] = b[j]; b[j] = t;
  }
  return b;
}
function levelName(n) { return ['Beginner', 'Intermediate', 'Advanced'][(n || 1) - 1]; }
function findById(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
window.SouvlaUI = { svgNode: svgNode, icon: icon, el: el, btn: btn, shuffle: shuffle, levelName: levelName, findById: findById };
})();
