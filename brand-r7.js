(function () {
  'use strict';

  // Header mark: a skewer with three threaded pieces. Inline styles so no older stylesheet can hide the pieces.
  var MARK = '<svg class="souvla-mark-svg" width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' +
    '<rect x="0" y="0" width="48" height="48" rx="14" style="fill:#0062CC"/>' +
    '<line x1="4" y1="24" x2="44" y2="24" style="stroke:#FFFFFF;stroke-width:4;stroke-linecap:round"/>' +
    '<circle cx="15" cy="24" r="6.5" style="fill:#FFFFFF;stroke:#0062CC;stroke-width:2"/>' +
    '<circle cx="24" cy="24" r="6.5" style="fill:#FFFFFF;stroke:#0062CC;stroke-width:2"/>' +
    '<circle cx="33" cy="24" r="6.5" style="fill:#FFFFFF;stroke:#0062CC;stroke-width:2"/>' +
    '</svg>';

  function render() {
    var b = document.getElementById('brand');
    if (!b) return;
    b.innerHTML = '<span class="brand-mark souvla-mark">' + MARK + '</span>' +
      '<span class="brand-text"><span class="brand-name">Souvla</span>' +
      '<span class="brand-sub">Cypriot Greek</span></span>';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();

  window.SouvlaArt = window.SouvlaArt || {};
  window.SouvlaArt.logo = function () { return MARK; };
})();
