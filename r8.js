(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
var ACC = '#0062CC', INK = '#1A1A1A';

/* Brand mark: diagonal three-piece skewer, white on the accent tile. */
function logoSVG(size) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<line x1="12" y1="36" x2="36" y2="12" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="18" cy="30" r="5" fill="#FFFFFF"/>' +
    '<circle cx="24" cy="24" r="5" fill="#FFFFFF"/>' +
    '<circle cx="30" cy="18" r="5" fill="#FFFFFF"/>' +
    '</svg>';
}
A.logo = function () { return logoSVG(32); };

/* Favicon reuses the same mark on the accent tile. */
(function setFavicon() {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="12" fill="' + ACC + '"/>' +
    '<line x1="12" y1="36" x2="36" y2="12" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>' +
    '<circle cx="18" cy="30" r="5" fill="#FFFFFF"/><circle cx="24" cy="24" r="5" fill="#FFFFFF"/><circle cx="30" cy="18" r="5" fill="#FFFFFF"/></svg>';
  var link = document.querySelector('link[rel="icon"]');
  if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
  link.type = 'image/svg+xml';
  link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
})();

/* Hero: one scene, a skewer on a table as the focal point, 2px strokes, soft table shadow. */
A.hero = function () {
  var wrap = document.createElement('div');
  wrap.className = 'hero-art';
  var pieces = '';
  var x0 = 170, y0 = 196, x1 = 470, y1 = 100;
  for (var i = 1; i <= 4; i++) {
    var t = i / 5, x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t;
    if (i % 2) {
      pieces += '<rect x="' + (x - 16) + '" y="' + (y - 16) + '" width="32" height="32" rx="7" fill="#FFFFFF" stroke="' + INK + '" stroke-width="2" transform="rotate(-30 ' + x + ' ' + y + ')"/>';
    } else {
      pieces += '<circle cx="' + x + '" cy="' + y + '" r="15" fill="' + ACC + '" stroke="' + INK + '" stroke-width="2"/>';
    }
  }
  wrap.innerHTML = '<svg class="hero-scene" viewBox="0 0 640 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">' +
    '<rect width="640" height="300" rx="24" fill="#EEF4FB"/>' +
    '<ellipse cx="320" cy="246" rx="230" ry="16" fill="#D3E1F2"/>' +
    '<rect x="110" y="222" width="420" height="14" rx="7" fill="#FFFFFF" stroke="#CFCFCA" stroke-width="2"/>' +
    '<line x1="' + (x0 - 40) + '" y1="' + (y0 + 8) + '" x2="' + (x1 + 40) + '" y2="' + (y1 - 8) + '" stroke="' + INK + '" stroke-width="2" stroke-linecap="round"/>' +
    pieces +
    '<circle cx="' + (x1 + 44) + '" cy="' + (y1 - 9) + '" r="6" fill="none" stroke="' + INK + '" stroke-width="2"/>' +
    '</svg>';
  return wrap;
};

/* The 'What you get' list for the Souvla Test card. */
A.whatYouGet = function () {
  var box = document.createElement('div');
  box.className = 'what-get';
  var title = document.createElement('p');
  title.className = 'what-get-title';
  title.textContent = 'What you get';
  box.appendChild(title);
  var list = document.createElement('ul');
  list.className = 'what-list';
  var rows = [
    ['M5 12l4 4 10-10', 'Ten short questions, no wrong turns'],
    ['M13 2L4 14h7l-1 8 9-12h-7z', 'XP for every right answer'],
    ['M4 6h16M4 12h16M4 18h10', 'Lessons matched to where you start']
  ];
  rows.forEach(function (r) {
    var li = document.createElement('li');
    var ico = document.createElement('span');
    ico.className = 'what-ico';
    ico.setAttribute('aria-hidden', 'true');
    ico.innerHTML = '<svg viewBox="0 0 24 24"><path d="' + r[0] + '"/></svg>';
    var txt = document.createElement('span');
    txt.textContent = r[1];
    li.appendChild(ico);
    li.appendChild(txt);
    list.appendChild(li);
  });
  box.appendChild(list);
  return box;
};
})();
