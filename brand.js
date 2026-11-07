(function () {
  // Brand mark: one bold dark skewer bar with three chunks threaded on it. No thin lines, no dots.
  var LUMP = 'M-6 -1 C-7 -6 -3 -7.5 0 -7.5 C4 -7.5 7 -6 7 -1 C8 3 5 6.5 1 6.5 C-3 7 -7 4 -6 -1 Z';
  function chunk(cx) {
    return "<path transform='translate(" + cx + " 24)' d='" + LUMP + "' fill='#A0491F'/>";
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='3' y='21.5' width='42' height='5' rx='2.5' fill='#2A0F03'/>" +
      chunk(13) + chunk(24) + chunk(35) +
      '</svg>';
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
