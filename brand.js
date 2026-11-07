(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: one bold bar with three chunks on a cream tile. No thin diagonals, no dots.
var MARK = '<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false"><rect x="1" y="1" width="46" height="46" rx="12" fill="#FBF6EF" stroke="#A0461F" stroke-width="2"/><rect x="6" y="21" width="36" height="5" rx="2.5" fill="#140703"/><ellipse cx="14" cy="22" rx="7" ry="7.5" fill="#2A0F05"/><ellipse cx="24" cy="19.5" rx="7.5" ry="9" fill="#140703"/><ellipse cx="34" cy="22" rx="7" ry="7.5" fill="#2A0F05"/></svg>';
A.logo = function () { return MARK; };
})();
