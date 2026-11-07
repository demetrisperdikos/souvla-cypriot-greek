# Build notes: Souvla (job-195), QA round 12

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)
Code commit for this round: e593c8f (QA round 12). The commit that adds these notes comes after it.
Previous round: d4c3613 (QA round 11).

## Round 12 changes
- Desktop hero (1440): copy and illustration panel share one row, centred on each other. Last screenshot: copy about y=123 to 395, panel about y=128 to 387.
- Hero chunks: irregular outlines, varied lobe sizes, lower half darkened toward #140703, crisp highlight on each upper lobe, 1.5px charred rim (hero.js).
- Phone (390): 24px air above and below the hero art before the Souvla Test card (styles.css).
- Cards: 1px divider and 48px bottom padding under the cards (styles.css). Not confirmed visually by the developer.
- .shots folder deleted; it is gitignored and not in the repo.

## Not verified by the developer
- Design score: not re-scored here. QA scores against the 8/10 bar.
- Brand mark at 16px and 24px: not visually checked.
- Header chip widths and 20px icon boxes at 1440 and 390: not measured.
- Card divider and bottom padding: not confirmed in screenshots.

## Checks
- check.sh: EXIT=0 (index=200, data=200, browser tests, clicktest, footers share baseline at y=895).

## Safety grep (innerHTML, eval, target=_blank, http://)
app.js:12: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string, not a request)
app.js:38: mark.innerHTML = logo() (static SVG string from brand.js)
app.js:148: var NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
app.js:209: tline.innerHTML = static up-next flame SVG string
hero.js:55: wrap.innerHTML = static chip and hero SVG string
ui.js:3: var SVG_NS = 'http://www.w3.org/2000/svg' (SVG namespace string)
No eval(), no target=_blank, no http script sources.
