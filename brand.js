(function () {
  'use strict';
  var A = window.SouvlaArt = window.SouvlaArt || {};
  // Brand mark: one bold skewer bar carrying three larger chunks. No thin lines, no hairlines. Bar is dark and thick so it reads at 16px.
  var MARK = '<svg class="souvla-mark-svg" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false"><rect width="48" height="48" rx="12" fill="#F5E4D5"/><rect x="2" y="21" width="44" height="7" rx="3.5" fill="#140703"/><ellipse cx="13" cy="24" rx="9" ry="9" fill="#A0461F"/><ellipse cx="24" cy="21" rx="10" ry="10" fill="#A0461F"/><ellipse cx="35" cy="24" rx="9" ry="9" fill="#A0461F"/></svg>';
  A.logo = function () { return MARK; };
})();
