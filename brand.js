(function () {
'use strict';
var A = window.SouvlaArt = window.SouvlaArt || {};
// Brand mark: three large chunks on a skewer bar, on a warm tile. Bar is lighter than the chunks so it reads at 16px. No thin lines or hairline strokes.
var MARK = '<svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" focusable="false"><rect x="0" y="0" width="48" height="48" rx="12" fill="#F5E4D5"/><ellipse cx="14" cy="21" rx="10" ry="9" fill="#140703"/><ellipse cx="24" cy="17" rx="11" ry="11" fill="#140703"/><ellipse cx="34" cy="21" rx="10" ry="9" fill="#140703"/><rect x="3" y="23" width="42" height="7" rx="3.5" fill="#A0461F"/></svg>';
A.logo = function () { return MARK; };
})();
