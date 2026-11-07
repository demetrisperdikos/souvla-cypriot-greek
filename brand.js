(function () {
  function chunk(cx, cy, rot) {
    return "<g transform='translate(" + cx + " " + cy + ") rotate(" + rot + ")'>" +
      "<path d='M-9 -4 Q-10 -11 -3 -10 Q2 -13 8 -8 Q11 -2 8 4 Q9 10 3 10 Q-2 12 -7 8 Q-11 3 -9 -4 Z' fill='#B8642E' stroke='#3A1606' stroke-width='1.6' stroke-linejoin='round'/>" +
      "<ellipse cx='-3' cy='-5' rx='2.6' ry='1.2' transform='rotate(-20 -3 -5)' fill='#FFE2B8' opacity='.85'/>" +
      "</g>";
  }
  function logo() {
    return "<svg viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'>" +
      "<rect width='48' height='48' rx='12' fill='#FBF6EF'/>" +
      "<rect x='0.5' y='0.5' width='47' height='47' rx='11.5' fill='none' stroke='#E2D6C6'/>" +
      "<line x1='6' y1='26' x2='42' y2='22' stroke='#3A1606' stroke-width='2.5' stroke-linecap='round'/>" +
      chunk(12, 25, -6) + chunk(24, 23, 4) + chunk(36, 25, -4) +
      "</svg>";
  }
  if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
