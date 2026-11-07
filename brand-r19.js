(function () {
'use strict';
// Round 19 brand mark: one skewer line through three seared chunks with highlights. Reads at 24px and 48px.
var XS = [7.5, 16, 24.5];
function chunk(cx) {
  var d = `M${cx - 4.2} 13 Q${cx - 3} 9.5 ${cx} 10 Q${cx + 4} 9.3 ${cx + 4.6} 13 Q${cx + 5.2} 16 ${cx + 4} 19.4 Q${cx} 22.6 ${cx - 3.8} 19.6 Q${cx - 5.4} 16 ${cx - 4.2} 13 Z`;
  return `<path d='${d}' fill='url(#b19Meat)' stroke='#2B1204' stroke-width='1' stroke-linejoin='round' stroke-opacity='.75'/>` +
    `<ellipse cx='${cx - 1.4}' cy='12.6' rx='1.4' ry='.75' fill='#FFFFFF' opacity='.9'/>`;
}
function logo() {
  return `<svg viewBox='0 0 32 32' width='32' height='32' aria-hidden='true' focusable='false'>` +
    `<defs><radialGradient id='b19Meat' cx='.4' cy='.35' r='.8'><stop offset='0' stop-color='#FFD28A'/><stop offset='.6' stop-color='#D4772E'/><stop offset='1' stop-color='#6E2E0C'/></radialGradient></defs>` +
    `<rect x='1.5' y='15.2' width='29' height='1.6' rx='.8' fill='#E6ECF8'/>` +
    chunk(XS[0]) + chunk(XS[1]) + chunk(XS[2]) +
    '</svg>';
}
if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
