# Build notes: Souvla (fix round 20)

## Status
IN PROGRESS. Items 1, 2 and 8 of the brief are NOT DONE. Design score is NOT re-scored.

## Measured this round (tests/measure.js, Chromium via Playwright)
| Measure | 390px | 1440px |
|---|---|---|
| Daily challenge card height | 502px | 429px |
| UP NEXT strip height | 97px | 72px (min-height 72 met) |
| CTA gap to card bottom edge | 17px | 17px |
| Brand mark box | 48 x 48px | 48 x 48px |
| Header height | 121px | 81px |
| Brand mark centre vs header centre (Y) | -27px | +1px |
| Primary button background | rgb(160,73,31) | rgb(160,73,31) |

Note: at 390px the stats chips wrap below the brand, so the brand mark sits at the top of a taller header and is NOT vertically centred there.

## VERIFIED
- check.sh exits 0 (syntax, server 200 on index and data.json, browser flows, keyboard, axe on home and quiz, click test, footer baseline).
- Brand mark: strokes thickened to 2.6px outline and 3.5px skewer; drawn at 48x48 in the header.
- CTA gap to card edge: 17px at both widths (measured above).
- UP NEXT strip min-height 72px rule is in place (desktop measures 72px).
- Header chip grid rule (equal columns, 12px inner padding at max-width 600px) is in fix-r20.css and loaded after final.css.

## NOT VERIFIED
- Item 1, hero skewer chunk redraw (irregular outline, darker rim, crisper highlight, larger chunks): NOT DONE. hero.js still uses the previous chunk shapes.
- Item 2, desktop hero skewer and plate enlargement/centring: NOT DONE, not measured.
- Item 3, phone hero illustration size: rule added in fix-r20.css, not measured.
- Item 4, equal-width header chips at 390px: rule added, not measured.
- Item 6, one 48px CTA height: rule added, button heights NOT measured.
- Item 8, remove !important in the 600px media query and consolidate .streak-preview: NOT DONE. The brief names styles.css; this project uses site.css and final.css.
- Item 9, tree clean-up of qa/ and .shots/: not done this round. .shots/ is gitignored.
- Item 10, design score against 8/10: NOT RE-SCORED.
- Real screen reader, Safari, Firefox, physical phones, Chrome Android: NOT VERIFIED (not run).
