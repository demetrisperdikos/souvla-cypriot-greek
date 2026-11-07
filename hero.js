(function () {
  var DEFS = "<defs>" +
    "<radialGradient id='hMeat' cx='36%' cy='30%' r='74%'><stop offset='0' stop-color='#F0B27A'/><stop offset='.55' stop-color='#C9783E'/><stop offset='1' stop-color='#8E4A22'/></radialGradient>" +
    "<linearGradient id='hTop' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#FFFFFF'/><stop offset='1' stop-color='#EAE3D4'/></linearGradient>" +
    "<linearGradient id='hRim' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#8A7C63'/><stop offset='1' stop-color='#4A4032'/></linearGradient>" +
    "<linearGradient id='hSkewer' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#4A4A4A'/><stop offset='1' stop-color='#1A1A1A'/></linearGradient>" +
    "<filter id='hBlur' x='-50%' y='-200%' width='200%' height='500%'><feGaussianBlur stdDeviation='5'/></filter>" +
    "</defs>";
  // Three charred chunks: irregular outlines, darker char rim, one crisp highlight.
  var SHAPES = [
    'M-36 -12 Q-38 -30 -18 -30 Q-6 -40 8 -32 Q30 -36 34 -14 Q40 2 30 14 Q34 30 12 32 Q-4 38 -20 30 Q-40 26 -36 -12 Z',
    'M-30 -18 Q-14 -40 4 -34 Q26 -38 32 -16 Q42 0 30 18 Q26 36 4 32 Q-14 40 -28 26 Q-42 12 -30 -18 Z',
    'M-34 -6 Q-36 -28 -12 -34 Q8 -40 22 -28 Q40 -24 38 -4 Q42 14 26 24 Q18 40 -2 34 Q-26 38 -34 18 Q-42 6 -34 -6 Z'
  ];
  var XS = [-80, 0, 80], ROT = [-8, 5, -4], SC = [1.25, 1.35, 1.2];
  function chunk(i) {
    return "<g transform='translate(" + XS[i] + " 8) rotate(" + ROT[i] + ") scale(" + SC[i] + ")'>" +
      "<path d='" + SHAPES[i] + "' fill='none' stroke='#FBEBD8' stroke-width='9' stroke-linejoin='round' opacity='.9'/>" +
      "<path d='" + SHAPES[i] + "' fill='url(#hMeat)' stroke='#140703' stroke-width='4.5' stroke-linejoin='round'/>" +
      "<path d='M-12 -20 L-4 -4 M14 -22 L18 -6 M-14 14 L4 20' stroke='#140703' stroke-width='2.4' stroke-linecap='round' fill='none' opacity='.5'/>" +
      "<ellipse cx='-16' cy='-22' rx='8' ry='2.8' transform='rotate(-18 -16 -22)' fill='#FFE8C8' opacity='.85'/>" +
      "</g>";
  }
  function heroSvg() {
    // Tighter viewBox: skewer and plate fill the panel instead of floating in space.
    return "<svg class='hero-scene' viewBox='-230 -50 460 150' width='460' height='150' aria-hidden='true' focusable='false'>" + DEFS +
      "<ellipse cx='0' cy='84' rx='200' ry='11' fill='#2A1404' opacity='.18' filter='url(#hBlur)'/>" +
      "<ellipse cx='0' cy='82' rx='150' ry='6' fill='#2A1404' opacity='.34'/>" +
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
