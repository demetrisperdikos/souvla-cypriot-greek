(function () {
  var DEFS = "<defs>" +
    "<radialGradient id='hMeat' cx='38%' cy='32%' r='72%'><stop offset='0' stop-color='#C7763F'/><stop offset='.55' stop-color='#6E3314'/><stop offset='1' stop-color='#2E1205'/></radialGradient>" +
    "<linearGradient id='hTop' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='1' stop-color='#EAE3D4'/></linearGradient>" +
    "<linearGradient id='hRim' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#8A7C63'/><stop offset='1' stop-color='#4A4032'/></linearGradient>" +
    "<linearGradient id='hSkewer' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#4A4A4A'/><stop offset='1' stop-color='#1A1A1A'/></linearGradient>" +
    "<filter id='hBlur' x='-50%' y='-200%' width='200%' height='500%'><feGaussianBlur stdDeviation='5'/></filter>" +
    "</defs>";
  var SHAPES = [
    'M-34 -12 L-26 -26 L-12 -30 L0 -24 L14 -32 L28 -22 L34 -6 L26 6 L32 20 L16 30 L4 24 L-10 32 L-26 26 L-36 14 L-30 2 Z',
    'M-30 -20 L-16 -30 L4 -28 L18 -34 L32 -18 L30 -2 L36 12 L22 28 L6 22 L-8 30 L-24 24 L-34 8 L-28 -6 Z',
    'M-36 -6 L-24 -26 L-6 -30 L10 -28 L26 -32 L36 -12 L30 4 L36 20 L18 30 L2 26 L-14 32 L-30 22 L-38 6 Z',
    'M-32 -14 L-20 -32 L0 -26 L16 -30 L32 -20 L34 -2 L28 14 L34 26 L14 32 L-4 26 L-20 30 L-34 18 L-36 2 Z'
  ];
  var XS = [-132, -44, 44, 132];
  var ROT = [-4, 3, -2, 4];
  var SC = [1.2, 1.1, 1.25, 1.15];
  function chunk(i) {
    return "<g transform='translate(" + XS[i] + " 26) rotate(" + ROT[i] + ") scale(" + SC[i] + ")'>" +
      "<path d='" + SHAPES[i] + "' fill='url(#hMeat)' stroke='#1E0C03' stroke-width='6' stroke-linejoin='round'/>" +
      "<path d='M-18 -14 L-8 2 M10 -18 L16 -2 M-6 10 L8 20' stroke='#1E0C03' stroke-width='3' stroke-linecap='round' fill='none' opacity='.3'/>" +
      "<path d='M-22 8 L-12 -4 L2 14 L16 -2' fill='none' stroke='#2A1204' stroke-width='2.5' stroke-linecap='round' opacity='.4'/><ellipse cx='-12' cy='-16' rx='8' ry='3.5' transform='rotate(-20 -12 -16)' fill='#FFE2B8' opacity='.55'/>" +
      "</g>";
  }
  function heroSvg() {
    return "<svg class='hero-scene' viewBox='-200 -44 400 150' width='400' height='150' aria-hidden='true' focusable='false'>" + DEFS +
      "<ellipse cx='0' cy='84' rx='200' ry='11' fill='#2A1404' opacity='.45' filter='url(#hBlur)'/>" +
      "<ellipse cx='0' cy='72' rx='186' ry='19' fill='url(#hRim)'/>" +
      "<ellipse cx='0' cy='66' rx='172' ry='15' fill='url(#hTop)'/>" +
      "<ellipse cx='0' cy='62' rx='166' ry='11' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-opacity='.9'/>" +
      "<rect x='-214' y='20' width='428' height='8' rx='4' fill='url(#hSkewer)'/>" +
      "<circle cx='-216' cy='24' r='5' fill='#1C1C1C'/>" +
      chunk(0) + chunk(1) + chunk(2) + chunk(3) +
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
