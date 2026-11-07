(function () {
'use strict';
// Round 18 brand mark: one skewer with three seared chunks, white on the accent tile.
function logo() {
  return '<svg viewBox="1 8 30 16" width="38" height="20" aria-hidden="true" focusable="false">' +
    '<defs><linearGradient id="brandMeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9B8"/><stop offset=".55" stop-color="#F0A552"/><stop offset="1" stop-color="#B8651F"/></linearGradient></defs>' +
    '<rect x="2" y="15" width="28" height="2.5" rx="1.25" fill="#FFFFFF" opacity=".9"/>' +
    '<rect x="4" y="9" width="8" height="14" rx="4" fill="url(#brandMeat)"/>' +
    '<rect x="12" y="9" width="8" height="14" rx="4" fill="url(#brandMeat)"/>' +
    '<rect x="20" y="9" width="8" height="14" rx="4" fill="url(#brandMeat)"/>' +
    '<path d="M6.5 12v7M14.5 12v7M22.5 12v7" stroke="#7A3E10" stroke-width="1.4" stroke-linecap="round" opacity=".55"/>' +
    '<rect x="5.5" y="10" width="2" height="3" rx="1" fill="#FFFFFF" opacity=".7"/>' +
    '<rect x="13.5" y="10" width="2" height="3" rx="1" fill="#FFFFFF" opacity=".7"/>' +
    '<rect x="21.5" y="10" width="2" height="3" rx="1" fill="#FFFFFF" opacity=".7"/>' +
    '</svg>';
}
if (window.SouvlaArt) window.SouvlaArt.logo = logo;
})();
