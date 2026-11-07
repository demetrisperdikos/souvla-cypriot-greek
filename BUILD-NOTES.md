# Build notes: Souvla (job-195), QA round 13

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)
Code commit for this round: d82a0ba. The commit that adds these notes comes after it.
Previous round: 7563440 (QA round 12).

## Round 13 changes (done)
- Hero art (hero.js): meat chunks redrawn with irregular outlines, varied lobe sizes, lower half toward #140703, highlight on each upper lobe, 1.5px charred rim.
- Skewer: thinner (6 units), metal highlight, 360 of 600 units wide (60% of plate), soft contact shadow.
- Plate: hero art background matches the plate; the grey band is removed from the illustration panel.
- Headline: accent-coloured keyword 'Cypriot.' and tighter tracking (app.js, styles.css).
- Phone: the Level check chip sits above the art; 24px air before the Souvla Test card (styles.css).
- Stat figures in accent colour, tighter label line-height; card icon boxes set to 20px.
- Day tabs: selected state has a visible 3px ring.

## Measured (fresh run of measure13 at 1440x900 and 390x844)
- Header chips at 1440: 128px, 128px, 128px (equal).
- Header chips at 390: 114px, 114px, 114px (equal).
- CTA heights (hero and first card buttons): 48px at 1440 and 390.
- Header height: 81px at 1440, 121px at 390 (NOT MET: brief asked for a tighter phone header; not changed in round 13).
- Hero art height: 260px at 1440, 185px at 390.

## Not done or NOT VERIFIED
- Design score: not re-scored. QA scores against the 8/10 bar.
- Brand mark at 16px, 24px and 48px: not re-rendered or checked in this round. The mark is the same as round 12.
- Up Next progress bar fill: the new .up-next-fill rule is in styles.css, but the markup still uses .up-next-seg segments. Visible fill is NOT VERIFIED.
- Up Next steps: data.json not changed. Deviation: the bar counts cards (2 for First Greetings) because the lesson model has cards and no steps.
- Phone header tightening and the gap between chips and the first CTA: NOT DONE in round 13.
- Section divider and 48px bottom padding: present in styles.css from round 12, not re-measured.
- Local .shots folder: deleted; it is gitignored and not in the repo.

## Checks
- check.sh: EXIT=0 in round 13 (index=200, data=200, browser tests, clicktest, footers share baseline at y=898).

## Safety grep
Run before submission; see command output in the round log. Known matches:
- app.js: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string, not a request)
- app.js: innerHTML = static SVG strings from brand.js and icons
- hero.js: wrap.innerHTML = static chip and hero SVG string
- ui.js: SVG_NS = 'http://www.w3.org/2000/svg'
No eval(), no target=_blank, no http script sources.
