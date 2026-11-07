# Souvla build notes (job-195, round 17)

Commit: e79e1c4

## Changed this round
- hero.js: irregular grilled chunks, highlights, charred rim, contact shadows, thinner skewer with metal highlight.
- brand.js: one bold skewer bar with three chunks.
- styles.css: phone chip 24px above art; Souvla Test card tightened for the desktop fold.

## Measured
- Brand mark rendered at 16, 24 and 48px (DOM boundingBox): 16x16, 24x24, 48x48. Visual check of the PNGs: NOT VERIFIED (PNG files did not save).
- Desktop 1440 and phone 390 screenshots taken after the change: Souvla Test card buttons sit above the fold at 1440.
- Hierarchy (headline vs card row): NOT VERIFIED, no metric taken.
- Design score at 1440 and 390: NOT VERIFIED, no scorer run.

## Safety grep (TODO, FIXME, console.log, innerHTML, eval, excluding node_modules and tests)
./app.js:38:  mark.innerHTML = (window.SouvlaArt && window.SouvlaArt.logo) ? window.SouvlaArt.logo() : '';
./app.js:213:  tline.innerHTML = "<svg class='up-next-ico' viewBox='0 0 24 24' width='20' height='20' aria-hidden='true' focusable='false'><path d='M12 2c1 3.5 4.5 5.5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3.2 2-4.3.2 1.6.9 2.6 2 3.1C11 7.6 11.2 5 12 2z' fill='currentColor'/></svg>";
./hero.js:60:  wrap.innerHTML = "<span class='hero-chip'>Level check, 3 min</span>" + svg();

## check.sh
Passes: index 200, data 200, browser tests, click test, footers above fold.
