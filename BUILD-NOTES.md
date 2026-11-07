# Build notes: Souvla (job-195), QA round 13

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)
Code commit for this round: ea33028. The commit that adds these notes comes after it.
Previous round: 7563440 (QA round 12).

## Round 13 changes (in ea33028)
- hero.js: meat chunks redrawn with irregular outlines, varied lobes, lower half toward #140703, highlight on each upper lobe, 1.5px charred rim.
- hero.js: skewer thinner (6 units), metal highlight, 360 of 600 units wide (60% of plate), soft contact shadow.
- styles.css: hero art background matches the plate; grey band removed.
- app.js and styles.css: headline keyword 'Cypriot.' in accent colour with tighter tracking.
- styles.css: phone Level check chip sits above the art; 24px air before the Souvla Test card.
- styles.css: stat figures in accent colour, tighter label line-height; card icon boxes 20px.
- styles.css: selected day tab has a 3px ring.
- styles.css: phone header padding 8px 16px, chips 32px high.
- app.js: Up Next progress is one .up-next-fill element, 0% or 100% by completion state.
- brand.js: mark redrawn as three large chunks on a skewer bar, warm tile, no hairline strokes.

## Measured (fresh run at 1440x900 and 390x844, commit ea33028)
- Header chips: 128px x3 at 1440; 114px x3 at 390 (equal widths at each size).
- Header height: 81px at 1440; 113px at 390 (was 121px at 390 before round 13).
- CTA height (primary button): 48px at both widths.
- Hero art height: 260px at 1440; 185px at 390.
- Up Next fill width at fresh state: 0%.
- Brand mark: rendered at 16, 24 and 48px in brandcheck screenshots; legible at all three.

## Not met or NOT VERIFIED
- Chip-to-CTA gap: NOT REDUCED. The headline and paragraph sit between the header and the CTA, so the brief's gap is not met.
- Design score: NOT VERIFIED. No fresh score against the 8/10 bar was recorded this round.
- Up Next fill: the fill is 0% or 100%, not partial progress. Visible fill in a screenshot: NOT VERIFIED.
- Up Next label: counts cards (2 for First Greetings). data.json unchanged; this is a documented deviation from the step model.
- Section divider and 48px bottom padding: present from round 12; NOT RE-MEASURED this round.

## Checks
- check.sh: EXIT=0 on ea33028 (index=200, data=200, browser tests, clicktest, footers share baseline at y=898).

## Safety grep (grep -n -E 'innerHTML|eval\(|target=.?_blank|http://|https://' *.js *.html), run on ea33028
app.js:12: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string, not a request)
app.js:38: mark.innerHTML = window.SouvlaArt.logo() (static logo SVG from brand.js)
app.js:149: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
app.js:210: tline.innerHTML = static up-next flame SVG string
hero.js:56: wrap.innerHTML = static chip and hero SVG string
ui.js:3: var SVG_NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
No eval(), no target=_blank, no http or https script sources.
