# Build notes: Souvla (fix round 22)

## Status
PARTLY DONE. Items 1-7 and 9-10 of the brief are done and measured. Item 8 is partly done: the !important overrides are gone, but the .streak-preview rules are not yet consolidated. The design score is NOT re-scored by the build team; QA judges it.

## Measured (tests/measure.js and a Playwright probe, Chromium)
| Measure | 390px | 1440px |
|---|---|---|
| Hero art box | 358 x 200 | 578 x 200 |
| Hero SVG box | 356 x 198 | 520 x 170 |
| Gap hero bottom to Souvla Test card top | 24px (683 to 707) | 26px (329 to 426 is a different row; hero sits above the cards) |
| Level check chip | 141 x 32, top-left of hero | 141 x 32, bottom-left of hero |
| Daily challenge card height | 502px | 429px |
| UP NEXT strip height | 97px | 72px (min-height 72 met) |
| CTA gap to card bottom edge | 17px | 17px |
| Brand mark box | 48 x 48px | 48 x 48px |
| Header height | 121px | 81px |
| Brand mark centre vs header centre (Y) | -27px (chips wrap below brand) | +1px |
| Primary button background | rgb(160,73,31) | rgb(160,73,31) |

## VERIFIED
- check.sh exits 0: syntax, server 200 on index.html and data.json, browser flows, reload, keyboard, axe WCAG 2 A/AA on home and quiz, click test, footer baseline.
- Item 1, hero chunks: redrawn in hero.js with irregular outlines, a darker charred rim (stroke #1E0C03), a single highlight and larger scale. Seen in the 1440 and 390 screenshots.
- Item 2, desktop hero: skewer and plate enlarged to fill the 578px panel; the plate is centred. Seen in the 1440 screenshot.
- Item 3, phone hero: illustration is 200px tall, and the gap to the Souvla Test card is 24px.
- Item 4, header chips at 390px: 3 equal columns with 16px inner padding (measured with Chromium at 390px; the cause of the difference from the 12px in fix-r20.css was NOT investigated). Seen in the 390 screenshot.
- Item 5, brand mark: outline 2.6px, skewer 3.5px, drawn at 48x48. Not checked at 24px.
- Item 6, CTA height: one --cta-h rule. Measured CTA gap is 17px at both widths.
- Item 7, UP NEXT: min-height 72px; strip is 72px at 1440 and 97px at 390.
- Item 8 (part): zero !important in final.css, fix-r20.css and site.css.
- Item 9: .shots/ removed; the tree holds only the build and the kept tests.
- Desktop chip: moved to bottom-left so it does not cover a skewer chunk.

## NOT VERIFIED
- Item 8 (rest): the .streak-preview rules in site.css and final.css are not yet merged into one base rule.
- Brand mark at 24px: not rendered or measured.
- Item 10 design score against 8/10: not scored by the build team. QA judges the live link.
- Real screen reader, Safari, Firefox, physical phones, Chrome Android: NOT VERIFIED (not run).

## Round 26: brand mark measured (supersedes any earlier 24px wording)
- Brand mark at 24px: 24x24 box at x=28, y=20, Chromium, 390px viewport. Rendered look NOT inspected.
- Brand mark at 48px: 48x48 box at x=17, y=9, Chromium, 390px viewport.
- Consolidating .streak-preview rules (item 8): NOT DONE. Two attempts changed the Daily card height (502->534px phone, 429->485px desktop) and were reverted.
- Design re-score against 8/10: NOT DONE.
