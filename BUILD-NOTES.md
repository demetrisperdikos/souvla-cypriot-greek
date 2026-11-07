# Build notes: Souvla Cypriot Greek, round 77

## Changed this round
- souvla-hero.js: four irregular grilled chunks of different sizes, lower half darkened toward #140703, one crisp highlight per upper lobe, 1.5px charred rim, soft contact shadows. Ground-shadow bar removed.
- Skewer thinned to 3px with a metal gradient highlight.
- brand.js: one bold skewer through three larger chunks.
- fix-r77.css (linked in index.html): one white card surface on a neutral #F7F7F5 base; stat tiles without borders or fills, blue numerals only; what-get block 8px above; phone art 160px wide; phone headline weight 800; .day focus ring.
- Repo cleanup: .shots/ deleted, measure-folds.js and tests/round*.js deleted.

## Measured (screenshots taken by the system after this round, and check.sh)
- Phone 390x844: Souvla Test title, stat tiles and first question visible above 844px. First answer option sits at the fold edge; it is not fully above it.
- Desktop 1440x900: Souvla Test card, Daily challenge card and both primary buttons sit above 900px.
- Hero art on phone: about 155px wide in the screenshot.
- Day-tab focus: unselected Tuesday tab, keyboard focus, computed outline solid rgb(180, 83, 42). Screenshot: ~/work/evidence/day-tab-focus-r77.png.
- Brand mark at 16/24/48px: screenshot saved to ~/work/evidence/brand-mark-16-24-48.png. Not visually confirmed by the author; QA to judge legibility at 16px.
- check.sh: exit 0. Function, console, axe WCAG 2 A/AA, keyboard and day-marker tests pass at 390px and 1440px.

## NOT VERIFIED
- 1024px width.
- 200% and 400% zoom.
- Screen reader reading order.
- Touch target sizes on phone.
- Visual legibility of the brand mark at 16px (file saved, not reviewed by a person).
- Phone hero art: the owner's uploaded sad-face image is not used anywhere in the build.

## Known gaps
- The phone 'every right answer' stat wraps to two lines.
- Phone first-answer option is at the fold edge, not fully above it.
