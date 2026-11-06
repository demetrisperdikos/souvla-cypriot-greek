(function () {
  'use strict';

  // Header mark: bold skewer, three large dots on a single stroke, reads at 40px.
  var MARK = '<svg class="brand-glyph" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<rect width="48" height="48" rx="14" fill="#0062CC"/>' +
    '<path d="M4 24H44" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="14" cy="24" r="7.5" fill="#FFFFFF"/>' +
    '<circle cx="24" cy="24" r="7.5" fill="#FFFFFF"/>' +
    '<circle cx="34" cy="24" r="7.5" fill="#FFFFFF"/>' +
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
