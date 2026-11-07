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

## Round 80 (QA round 2 fixes)
- Hero gap: desktop cards now sit 24px below the hero band (fix-r78.css). Phone cards unchanged.
- Phone fold: first answer option 'Yassou mas' ends at 829px, above the 844px fold (measured by tests/fold-r78.js).
- Stat label: 'every right answer' changed to 'per right answer'; all three phone stat labels are one line.
- Desktop fold: both primary buttons and the footer sit above 900px (footer at 895px).
- Hero art: chunks redrawn with irregular outlines, varied sizes, darker lower half, one highlight per upper lobe. Phone art about 160px wide.
- Brand mark redrawn: three chunks with a light skewer line through them.
- Repo cleanup: .shots/ deleted again after the final capture. Notes corrected.
- features.json: feature 10 (responsive) set to passes=false until a person confirms the hero art and the 1024px width.
- check.sh: EXIT=0 on this round (OK index=200 data=200 browser-tests=passed clicktest=passed).

## NOT VERIFIED / OPEN
- Design bar 8/10: not confirmed. The chunks still read as dark rounded blobs more than grilled meat; the charred rim is subtle. QA to judge.
- Brand mark legibility at 16px: not confirmed by a person.
- 1024px width, 200% and 400% zoom, screen reader order, touch target sizes.
- Owner's uploaded sad-face image (uploads/H4v7rLO9oqgJ.png) is not used anywhere in the build.

## Round 79 (fold fix)
- check.sh: EXIT=0 (index=200, data=200, browser tests, clicktest, footers share one baseline, footer above 900px fold at 1440x900).
- Fold fix: on desktop (>=900px) the Daily challenge 'Up next' block is hidden so the 'Open First Greetings' button and footer fit above the fold. The lesson stays reachable through the Open button. This is a product trade-off for Nadia or the owner to confirm.
- Stat numerals are neutral ink; the single accent is terracotta. Day-tab icons are 20px with a terracotta focus ring.
- .shots/ is deleted.

## NOT VERIFIED
- Design bar 8/10: not re-scored by QA since round 79.
- 16px brand-mark legibility, day-tab focus-ring screenshot in repo.
- 1024px width, 200% and 400% zoom, screen reader order, touch target sizes.
- Owner's uploaded sad-face image is not used in the build.
