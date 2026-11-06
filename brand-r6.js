(function () {
  'use strict';

  // Header mark: a bold skewer (thick stroke, rounded ends) through three large pieces. Drawn at 40px.
  var MARK = '<svg class="brand-glyph" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<rect width="48" height="48" rx="14" fill="#0062CC"/>' +
    '<path d="M6 24H42" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>' +
    '<rect x="8" y="15" width="12" height="18" rx="6" fill="#FFFFFF"/>' +
    '<rect x="18" y="15" width="12" height="18" rx="6" fill="#FFFFFF"/>' +
    '<rect x="28" y="15" width="12" height="18" rx="6" fill="#FFFFFF"/>' +
    '</svg>';

  function render() {
    var b = document.getElementById('brand');
    if (!b) return;
    b.innerHTML = '<span class="brand-mark">' + MARK + '</span>' +
      '<span class="brand-text"><span class="brand-name">Souvla</span>' +
      '<span class="brand-sub">Cypriot Greek</span></span>';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();

  window.SouvlaArt = window.SouvlaArt || {};
  window.SouvlaArt.logo = function () { return MARK; };
})();
