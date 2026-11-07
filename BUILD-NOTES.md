# BUILD NOTES: Souvla, Cypriot Greek portal (QA round 3)

Every item is VERIFIED with a measured value or NOT VERIFIED with a reason.

## Item 1: Hero rim contrast
VERIFIED. Chunk halo #FBEBD8 vs darkest meat stop #8E4A22: 5.70:1. Halo vs skewer #1A1A1A: 14.90:1. Chunk outline #140703 vs halo: 16.94:1. Meat gradient was lightened (#F0B27A, #C9783E, #8E4A22) so the body is a warm mid-tone.

## Item 5: 24px brand mark
VERIFIED. Brand SVG renders at 48px (measured with getBoundingClientRect at 390px and 1440px). A 24px crop was captured at /tmp/qa-shots/brand-24px.png and the header crop at /tmp/qa-shots/brand-phone-header.png. Shapes were made bolder (chunks scale 1.75, skewer 5.5 stroke) for legibility at small sizes.
Direction: the sad-face prototype is DROPPED explicitly. The mark is the skewer-and-chunks mark. Owner decision needed if the sad face is wanted.

## Item 8: streak-preview CSS consolidation
PARTLY VERIFIED. The QA-listed child rules were removed: site.css lines 197, 418, 419, 426 and final.css lines 141, 144, 145, plus the duplicate .week-hint rule. The base .streak-preview rule now lives in final.css with a desktop override (min-width 900px). NOT VERIFIED: .streak-top and .streak-ico general rules still exist in site.css (lines 85, 204-206, 265, 341). They are not inside the streak-preview block but were not merged into one rule.

## Item 9: Stylesheet and repo cleanup
VERIFIED. fix-r20.css merged into final.css and removed; index.html loads fonts.css, site.css, final.css only. card-variety.css removed. PROGRESS.md untracked (kept on disk, in .gitignore). qa/baseline-r26.json removed. node_modules trees untracked: git ls-files now lists 35 files, 0 under node_modules. .shots/ emptied (0 files) and in .gitignore.

## Item 10: This file
VERIFIED. Open items: items 8 (partly) and design re-score below.

## Chips at 390px
VERIFIED. Three header chips 114px, 114px, 114px (equal width grid).

## Primary CTA height
VERIFIED. All primary buttons measured at 48px at 390px and 1440px (3 each).

## Daily challenge card
VERIFIED. UP NEXT strip min-height 72px at 1440px (measured 72px) and 97px at 390px. CTA bottom sits 17px above card bottom at both widths (1440: card bottom 864, CTA bottom 847; 390: card 1267, CTA 1250).

## Desktop hero and phone hero
VISUALLY CHECKED via screenshots (desktop-1440.png, phone-390.png in /tmp/qa-shots). Skewer and plate enlarged. Phone hero art 200px tall in its panel. Not pixel-measured against the 900px fold beyond the footer check, which passes.

## Supporting line in streak block
VERIFIED. One supporting line remains under the day chips. The 'Miss a day' note was removed from the code.

## Design re-score
NOT RE-SCORED. No reviewer has re-scored this build. My own read after these fixes: about 7.5/10. Remaining gaps: the phone hero still reads a little plain, the Souvla Test and Daily cards are dense, and the .streak-top/.streak-ico cascade is not fully consolidated. The 8+ bar is not claimed.

## Not verified in this round
NOT VERIFIED: real screen readers, physical phones, Safari, Firefox, Chrome Android.

## Checks
bash check.sh exits 0: syntax, server 200 for index.html and data.json, browser flow tests, state tests, reload persistence, 34-control click test (0 no-op, 0 errors), footer baseline (both 847px), footers above 900px fold.
