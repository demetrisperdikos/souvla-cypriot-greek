(function () {
  'use strict';
  var A = window.SouvlaArt = window.SouvlaArt || {};
  // Brand mark: one bold skewer bar with three larger chunks. No thin lines. Checked at 16, 24 and 48px.
  var MARK = "<svg class='souvla-mark-svg' viewBox='0 0 48 48' width='48' height='48' aria-hidden='true' focusable='false'><rect width='48' height='48' rx='12' fill='#F5E4D5'/><rect x='1' y='20' width='46' height='8' rx='4' fill='#140703'/><circle cx='13' cy='24' r='10' fill='#A0461F'/><circle cx='24' cy='22' r='11' fill='#A0461F'/><circle cx='35' cy='24' r='10' fill='#A0461F'/></svg>";
  A.logo = function () { return MARK; };
})();
