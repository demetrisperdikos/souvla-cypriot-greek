# Souvla build notes (job-195, round 18)

Commit: see `git rev-parse --short HEAD` (this file is committed in the final commit; the hash is recorded in the publish message).

## Changed this round
- hero.js: hero art redrawn with an SVG viewBox fitted to the four chunks and the skewer, preserveAspectRatio meet. The chunks no longer crop at the panel edges.
- hero.js: skewer is a 3px metal bar with a highlight line, plus a soft contact shadow under each chunk.
- brand.js: one bold skewer bar with three chunks.
- styles.css: Souvla Test card is the primary action (stronger shadow and border). Daily challenge card is quieter (flat, lighter button). Test card stat tiles and list use the 8px spacing scale.
- .shots/ deleted from disk and kept out of git.

## Measured
- Brand mark: rendered with headless Chromium at 16, 24 and 48px. PNG sizes confirmed as 16x16, 24x24 and 48x48 (brand-check/mark-16.png, mark-24.png, mark-48.png). These files are in the repo.
- Visual check of the brand mark PNGs: I did not view the image pixels in this run. Treat the 16px read as unconfirmed until someone looks at brand-check/mark-16.png.
- Desktop 1440 screenshot: hero art fills the right panel with no crop at the edges. Souvla Test card buttons sit above the fold.
- Phone 390 screenshot: hero panel fits the art with the chip in the top left. The Souvla Test card starts below the hero.
- Hierarchy: at 1440 the Souvla Test card's filled primary button is the strongest control in the card row. The Daily challenge button is a tinted secondary.
- Design score (my judgement from the 1440 and 390 screenshots, not an automated scorer): 7/10. Remaining gap: the hero art still reads as one flat illustration at small size, and the skewer is thin at 390px.

## Safety grep (final tree)
Run on the tree that was committed.
- TODO / FIXME / console.log / eval / new Function / document.write / secrets: none found.
- innerHTML: 3 uses, all with static strings (app.js:38 uses SouvlaArt.logo(), app.js:213 static SVG, hero.js:54 static chip plus SVG).
- http strings: none except the XML namespace identifier.

## check.sh
Passes on the round 18 tree: index 200, data 200, browser flow tests, state tests, reload persistence, click test (24 controls, 0 with no visible change, 0 with errors), footers above the fold.

## Manual checks still needed (cannot run here)
- Screen reader labels on the hero art and brand mark.
- Real phone touch targets.
- Visual check at 1024px and at 200% and 400% zoom.
