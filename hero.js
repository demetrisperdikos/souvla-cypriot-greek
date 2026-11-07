(function () {
  var DEFS = "<defs>" +
    "<radialGradient id='hMeat' cx='36%' cy='30%' r='74%'><stop offset='0' stop-color='#B8642F'/><stop offset='.5' stop-color='#5E2A10'/><stop offset='1' stop-color='#2A1005'/></radialGradient>" +
    "<linearGradient id='hTop' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='1' stop-color='#EAE3D4'/></linearGradient>" +
    "<linearGradient id='hRim' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#8A7C63'/><stop offset='1' stop-color='#4A4032'/></linearGradient>" +
    "<linearGradient id='hSkewer' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#4A4A4A'/><stop offset='1' stop-color='#1A1A1A'/></linearGradient>" +
    "<filter id='hBlur' x='-50%' y='-200%' width='200%' height='500%'><feGaussianBlur stdDeviation='5'/></filter>" +
    "</defs>";
  // Three charred chunks: irregular outlines, one soft highlight each.
  var SHAPES = [
    'M-34 -10 L-28 -26 L-10 -32 L4 -26 L20 -34 L34 -18 L30 0 L36 16 L18 30 L2 24 L-12 32 L-30 24 L-36 8 Z',
    'M-30 -18 L-14 -30 L6 -26 L22 -32 L34 -12 L28 6 L34 22 L14 30 L-4 24 L-22 30 L-34 14 L-30 0 Z',
    'M-32 -12 L-22 -30 L-2 -28 L14 -34 L32 -20 L30 -2 L36 14 L22 28 L4 22 L-14 30 L-32 20 L-36 4 Z'
  ];
  var XS = [-96, 0, 96];
  var ROT = [-4, 3, -2];
  var SC = [1.15, 1.2, 1.1];
  function chunk(i) {
    return "<g transform='translate(" + XS[i] + " 26) rotate(" + ROT[i] + ") scale(" + SC[i] + ")'>" +
      "<path d='" + SHAPES[i] + "' fill='url(#hMeat)' stroke='#1E0C03' stroke-width='5' stroke-linejoin='round'/>" +
      "<path d='M-16 -16 L-8 2 M10 -18 L16 -2 M-6 10 L8 20' stroke='#1E0C03' stroke-width='3' stroke-linecap='round' fill='none' opacity='.35'/>" +
      "<ellipse cx='-12' cy='-18' rx='9' ry='3.5' transform='rotate(-20 -12 -18)' fill='#FFE2B8' opacity='.6'/>" +
      "</g>";
  }
  function heroSvg() {
    return "<svg class='hero-scene' viewBox='-220 -100 440 200' width='440' height='200' aria-hidden='true' focusable='false'>" + DEFS +
      "<ellipse cx='0' cy='84' rx='200' ry='11' fill='#2A1404' opacity='.18' filter='url(#hBlur)'/>" +
      "<ellipse cx='0' cy='72' rx='186' ry='19' fill='url(#hRim)'/>" +
      "<ellipse cx='0' cy='66' rx='172' ry='15' fill='url(#hTop)'/>" +
      "<ellipse cx='0' cy='62' rx='166' ry='11' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.9'/>" +
      "<rect x='-214' y='20' width='428' height='8' rx='4' fill='url(#hSkewer)'/>" +
      "<circle cx='-216' cy='24' r='5' fill='#1C1C1C'/>" +
      chunk(0) + chunk(1) + chunk(2) +
      "</svg>";
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
