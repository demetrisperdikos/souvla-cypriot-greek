(function () {
  var A = window.SouvlaArt;
  var NS = 'http://www.w3.org/2000/svg';
  var uid = 0;

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function grad(defs, id, from, to) {
    var g = el('linearGradient', { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el('stop', { offset: 0, 'stop-color': from }, g);
    el('stop', { offset: 1, 'stop-color': to }, g);
  }

  function mascotFace(g) {
    el('circle', { cx: 22, cy: 28, r: 4.5, fill: '#FFFFFF' }, g);
    el('circle', { cx: 42, cy: 28, r: 4.5, fill: '#FFFFFF' }, g);
    el('path', { d: 'M23 40 Q32 48 41 40', fill: 'none', stroke: '#FFFFFF', 'stroke-width': 3.5, 'stroke-linecap': 'round' }, g);
  }

  function mascot() {
    var id = 'mascot-g-' + (++uid);
    var s = el('svg', { viewBox: '0 0 64 64', width: 56, height: 56, class: 'mascot-tile', 'aria-hidden': 'true', focusable: 'false' });
    grad(el('defs', {}, s), id, '#2A7FE0', '#0056B3');
    el('rect', { x: 6, y: 4, width: 52, height: 56, rx: 20, fill: 'url(#' + id + ')' }, s);
    el('ellipse', { cx: 24, cy: 16, rx: 9, ry: 5, fill: '#FFFFFF', opacity: '.18' }, s);
    mascotFace(s);
    return s;
  }

  function skewer(parent, x, y, len, defs, gid) {
    el('line', { x1: x, y1: y, x2: x + len, y2: y, stroke: 'url(#' + gid + ')', 'stroke-width': 4, 'stroke-linecap': 'round' }, parent);
    var px = x + 14;
    while (px < x + len - 20) {
      el('rect', { x: px, y: y - 15, width: 30, height: 26, rx: 9, fill: 'url(#meat-' + gid + ')' }, parent);
      el('ellipse', { cx: px + 9, cy: y - 9, rx: 5, ry: 2.5, fill: '#FFFFFF', opacity: '.55' }, parent);
      el('circle', { cx: px + 21, cy: y + 3, r: 2, fill: '#0062CC', opacity: '.8' }, parent);
      px += 36;
    }
  }

  function hero() {
    var id = 'hero-' + (++uid);
    var s = el('svg', { viewBox: '0 0 560 300', preserveAspectRatio: 'xMidYMid meet', class: 'hero-scene', 'aria-hidden': 'true', focusable: 'false' });
    var d = el('defs', {}, s);
    grad(d, id + '-wall', '#F5F5F1', '#E6E6DF');
    grad(d, id + '-sky', '#EAF3FD', '#D5E7FA');
    grad(d, id + '-table', '#F3F3F0', '#D3D4CE');
    grad(d, id + '-rod', '#C9CDD6', '#7D8390');
    grad(d, id + '-meat-' + id, '#F7F7F4', '#A5AAB4');
    grad(d, 'meat-' + id, '#F7F7F4', '#A5AAB4');
    grad(d, 'meat-' + id + '-rod', '#C9CDD6', '#7D8390');
    el('rect', { x: 0, y: 0, width: 560, height: 300, fill: 'url(#' + id + '-wall)' }, s);

    // window with sky and sun, fully inside the frame
    el('rect', { x: 372, y: 34, width: 150, height: 110, rx: 14, fill: 'url(#' + id + '-sky)', stroke: '#D2D6DC', 'stroke-width': 2 }, s);
    el('circle', { cx: 447, cy: 82, r: 24, fill: '#FFFFFF' }, s);
    el('path', { d: 'M372 124 Q410 104 448 118 T522 110 L522 134 Q522 144 512 144 L382 144 Q372 144 372 134 Z', fill: '#FFFFFF', opacity: '.7' }, s);

    // hanging lamp, warm glow
    el('line', { x1: 150, y1: 0, x2: 150, y2: 40, stroke: '#9AA0AA', 'stroke-width': 2 }, s);
    el('path', { d: 'M126 60 Q150 36 174 60 Z', fill: '#2F3440' }, s);
    el('circle', { cx: 150, cy: 64, r: 6, fill: '#DCE8F5' }, s);
    el('circle', { cx: 150, cy: 64, r: 18, fill: '#DCE8F5', opacity: '.25' }, s);

    // grill-side skewers across the table
    skewer(s, 96, 170, 200, d, 'meat-' + id + '-rod');
    skewer(s, 268, 202, 220, d, 'meat-' + id + '-rod');

    // table: top, front edge, legs and ground line
    el('rect', { x: 52, y: 236, width: 456, height: 14, rx: 6, fill: 'url(#' + id + '-table)' }, s);
    el('rect', { x: 52, y: 250, width: 456, height: 8, rx: 3, fill: '#B9BCC4' }, s);
    el('rect', { x: 84, y: 258, width: 10, height: 30, rx: 4, fill: '#9AA0AA' }, s);
    el('rect', { x: 466, y: 258, width: 10, height: 30, rx: 4, fill: '#9AA0AA' }, s);
    el('line', { x1: 24, y1: 288, x2: 536, y2: 288, stroke: '#D2D4DA', 'stroke-width': 2, 'stroke-linecap': 'round' }, s);

    // mascot seated at the table, feet on the ground line
    el('ellipse', { cx: 504, cy: 290, rx: 30, ry: 5, fill: '#1A1A1A', opacity: '.12' }, s);
    var m = el('g', { transform: 'translate(478 188)' }, s);
    grad(d, id + '-mascot', '#2A7FE0', '#0056B3');
    el('rect', { x: 0, y: 0, width: 52, height: 52, rx: 18, fill: 'url(#' + id + '-mascot)' }, m);
    mascotFace(m);
    return s;
  }

  A.hero = hero;
  A.mascot = mascot;
})();
