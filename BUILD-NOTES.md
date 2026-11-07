# Build notes: Souvla (job-195), QA round 12

Live link: https://sites.willysilly.com/s/lszpu5cvgx646628/
Code commit: e593c8f (QA round 12). Previous: d4c3613 (QA round 11).
Repo: https://github.com/demetrisperdikos/souvla-cypriot-greek (main)

## Round 12 changes
- Desktop hero (1440): copy and illustration panel share one row and are centred on each other. Last screenshot: copy about y=123 to 395, panel about y=128 to 387.
- Hero chunks: irregular outlines, varied lobe sizes, lower half darkened toward #140703, crisp highlight on each upper lobe, 1.5px charred rim.
- Phone (390): 24px air above and below the hero art before the Souvla Test card.
- Cards: 1px divider and 48px bottom padding under the cards, added in CSS. Not confirmed visually by the developer.
- .shots folder deleted (gitignored, not in the repo).

## Not verified by the developer
- Design score: not re-scored here. QA scores against the 8/10 bar.
- Brand mark at 16px and 24px: not visually checked.
- Header chip widths and 20px icon boxes at 1440 and 390: not measured.
- Card divider and bottom padding: not confirmed in screenshots.

## Checks
- check.sh: EXIT=0 (index=200, data=200, browser tests, clicktest, footers share baseline at y=895).

## Safety grep (innerHTML, eval, target=_blank, http://)
Six matches, all expected:
- app.js:12 and app.js:148: SVG namespace string, not a script source.
- app.js:38: innerHTML set from SouvlaArt.logo(), a static SVG string.
- app.js:209: innerHTML with a fixed static SVG icon, no user input.
- hero.js:55: innerHTML with a fixed label and static SVG, no user input.
- ui.js:3: SVG namespace string.
No eval, no target=_blank, no http:// script sources.
