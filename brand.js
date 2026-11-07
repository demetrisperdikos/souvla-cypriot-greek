(function () {
  // Brand mark: three chunks threaded on one bold dark skewer bar. Chunks drawn first, bar on top.
  function chunk(cx) {
    return "<circle cx='" + cx + "' cy='24' r='9.5' fill='#A0491F' stroke='#5C2410' stroke-width='1.5'/>";
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      chunk(14) + chunk(24) + chunk(34) +
      "<rect x='2' y='20.5' width='44' height='7' rx='3.5' fill='#2A0F03'/>" +
      '</svg>';
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
