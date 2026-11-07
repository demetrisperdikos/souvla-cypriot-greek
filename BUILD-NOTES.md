# Build notes: Souvla (job-195), QA round 13

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)
Code commit for this round: bd3cf8f. The commit that adds these notes comes after it.
Previous round: 7563440 (QA round 12).

## Round 13 changes (in ea33028 and bd3cf8f)
- hero.js: meat chunks redrawn with irregular outlines, varied lobes, lower half toward #140703, highlight on each upper lobe, 1.5px charred rim.
- hero.js: skewer thinner (6 units), metal highlight, 360 of 600 units wide (60% of plate), soft contact shadow.
- styles.css: hero art background matches the plate; grey band removed from the illustration panel.
- app.js and styles.css: headline keyword 'Cypriot.' in accent colour with tighter tracking.
- styles.css: phone Level check chip sits above the art.
- styles.css: stat figures in accent colour, tighter label line-height; card icon boxes 20px.
- styles.css: selected day tab has a 3px ring.
- styles.css: phone header padding 8px 16px, chips 32px high.
- app.js: Up Next progress is one .up-next-fill element, 0% or 100% by completion state.
- brand.js: mark redrawn as three large chunks on a skewer bar, warm tile, no hairline strokes.
- styles.css (bd3cf8f): desktop band stops 8px inside the hero, so band-to-cards is 32px (8px + 24px row gap).

## Measured
At 1440x900 (commit ea33028, before bd3cf8f):
- Header chips: 128px x3. Header: 81px. Primary CTA: 48px. Hero art: 260px.
- Up Next fill width at fresh state: 0%.

At 1440x900 (commit bd3cf8f):
- Band bottom 390, cards top 422: gap 32px. Footer top 1520, bottom 1544 (above the 900px fold check, which passes).
- Feature row: 1px bottom border, 48px bottom padding.

At 390x844 (commit bd3cf8f):
- Header chips: 114px x3. Header: 113px (was 121px before round 13).
- Primary CTA: 48px. Hero art: 185px.
- Hero box bottom 673, cards top 721: gap 48px.
- Feature row: 1px bottom border, 48px bottom padding.

## Not met or NOT VERIFIED
- Chip-to-CTA gap on phone: NOT REDUCED. The headline and paragraph sit between the header and the CTA, so the brief's gap is not met.
- Design score: NOT VERIFIED. No fresh score against the 8/10 bar was recorded this round.
- Up Next fill: binary (0% or 100%), not partial progress. A screenshot of the filled state is NOT VERIFIED.
- Up Next label: counts cards (2 for First Greetings). data.json unchanged. This is a documented deviation from the step model.
- Brand mark: rendered at 16, 24 and 48px in brandcheck renders; legible. Those renders were not included in the repo.

## Checks
- check.sh: EXIT=0 on bd3cf8f (index=200, data=200, browser tests, clicktest, footers share baseline at y=898, footers above the 900px fold).

## Safety grep (grep -n -E 'innerHTML|eval\(|target=.?_blank|http://|https://' *.js *.html), run on ea33028; bd3cf8f changed only styles.css
app.js:12: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string, not a request)
app.js:38: mark.innerHTML = window.SouvlaArt.logo() (static logo SVG from brand.js)
app.js:149: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
app.js:210: tline.innerHTML = static up-next flame SVG string
hero.js:56: wrap.innerHTML = static chip and hero SVG string
ui.js:3: var SVG_NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
No eval(), no target=_blank, no http or https script sources.
