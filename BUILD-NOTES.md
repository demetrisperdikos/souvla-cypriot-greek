# BUILD NOTES: Souvla, Cypriot Greek portal (QA round 6)

HEAD before this round: 53e3b7b. This round changes hero.js, brand.js and final.css (round 18 and 18b blocks at the end of final.css). Measured at 1440x900 and 390x844 with Playwright.

## Suite
- check.sh exit 0: index=200 data=200, browser tests passed, clicktest passed, footer baseline passed.
- VERIFIED: 34 controls tested, 0 with errors (clicktest output).

## Hero (brief item 1)
- Chunks: three lumpy path outlines (irregular, not circles), stroke #140703 at 1.5px via non-scaling-stroke, one crisp highlight ellipse each.
- VERIFIED in code: stroke colour and width. Chunks enlarged about 1.2x versus round 17.
- NOT VERIFIED: visual quality of the charred rim at 1x and 2x pixel density, judged by a reviewer.

## Brand mark (brief item 5)
- Redrawn as flat silhouette: one skewer bar, three lumpy chunks about 1.3x, cream keyline, one highlight.
- VERIFIED: rendered #brand svg measures 16x16, 24x24, 48x48 (Playwright, 1440px).
- NOT VERIFIED: legibility of the silhouette at 16 and 24px (visual judgement, needs a reviewer).

## Footer / fold
- VERIFIED: footer buttons bottom at 895px on 1440x900 (fold 900px). Was 907px before the up-next strip was trimmed.

## Header chips
- VERIFIED: 128/128/128 at 1440, 114/114/114 at 390 (round 16 measurements, unchanged).

## Daily challenge up-next strip
- Added a 24px icon box and a visible 8px lesson meter (replaces the bare 0% label).
- VERIFIED: icon box 24x24 and meter 8px tall at 1440.
- NOT VERIFIED: that the strip reads as intentional (visual judgement).

## Housekeeping
- .shots/ holds only what tests/clicktest.js writes (.shots/clicks). Scratch shot-*.png removed. .shots is git-ignored.
- VERIFIED: no shot-1440-0.png or shot-390-0.png remain.

## Design score
- NOT RE-SCORED by a reviewer. No 8+ claim is made.

## Not verified
Real screen readers, physical phones, Safari, Firefox, Chrome Android.
OPEN: sad-face mark decision (owner asked, default is the skewer silhouette).
