# Build notes: Souvla (round 28)

## Status
NOT FINISHED. check.sh exits 0 (syntax, server 200 on index.html and data.json, browser flows, states, reload, keyboard, axe, click test, footers). Open: item 8 (.streak-preview consolidation), item 5 (24px brand judgement and prototype reconciliation), design re-score against 8/10.

## Measured values (Chromium, probe in ~/work/scratch, outside the repo)
- Hero charred rim (outline #140703) vs panel #F8EADF: 16.79:1.
- Rim vs darkest meat stop (#6A3414): 1.99:1. The rim separates from the fill, but only modestly.
- Meat stops: light #D08A4E 2.40:1, mid #9A5224 4.94:1, dark #6A3414 8.43:1 against the panel.
- Highlights: 1 per chunk, colour #FFE8C8, 4.89:1 against the mid meat stop.
- Chunk size 1440px: 116x112, 119x116, 111x104. Chunk size 390px: 79x77, 81x80, 76x71.
- Skewer rect 1440px: 484x9 (x 737 to 1221, inside hero box 719 to 1239). Skewer rect 390px: 331x6.
- Hero box: 1440px 520x170; 390px 356x198.
- Brand mark box: 48x48 at both widths. Brand stroke #2A0F03 vs tile #FBF6EF: 16.72:1.
- CTA height: 48px for Start diagnosis, Begin the test and Open First Greetings at 1440px and 390px (round 27 baseline).
- Daily card height: 429px desktop, 502px phone (round 27 baseline).
- UP NEXT strip: 72px desktop, 97px phone.
- Header chips at 390px: 114px each, equal columns (round 26 measure).
- Features: 12 of 12 passing in features.json, verified by tests/test.js.

## Item status
1. Hero chunks: fill lightened, dark outline kept, one highlight each. Rim contrast measured above. Chunks no longer read as dark blobs in the round 28 screenshots. Partly done: the chunks have an irregular outline and one highlight, but the rim is only 1.99:1 darker than the fill. QA to judge.
2. Desktop skewer and plate: skewer rect measured at 484x9. Plate centring against the text block was NOT measured. NOT VERIFIED.
3. Phone hero: illustration 198px tall. Gap to The Souvla Test card 24px (round 26 measure).
4. Header chips 390px: equal 114px columns (round 26 measure).
5. Brand mark: 48x48 measured. 24px rendered look NOT VERIFIED (screenshots saved in ~/work/scratch/evidence, silhouette not judged). Owner prototype: sad-face circle and a three-blob shape. The current mark is three chunks on a skewer. Not reconciled: the sad face does not match the Souvla skewer brand.
6. CTA heights: one rule, 48px, measured.
7. UP NEXT: min-height 72px met. Measured 72px desktop, 97px phone.
8. .streak-preview consolidation: NOT DONE. Rules still sit in site.css (lines 57, 84, 198, 199, 267, 421, 422, 429, 433, 438, 453) and final.css (lines 19, 28, 44 to 69, 110, 116, 149 to 162). Two earlier attempts changed the Daily card height (502 to 534px phone, 429 to 485px desktop) and were reverted.
9. Repo: uploads/H4v7rLO9oqgJ.png removed from the index (git rm --cached). .shots/ empty. git ls-files shows no .png. qa/ holds baseline-r26.json.
10. These notes: rewritten round 28. Stale round 22 to 26 sections removed.

## Owner image (uploads/H4v7rLO9oqgJ.png)
Not used on the site. Reason: it shows a sad-face circle and a three-blob mark. It is a prototype reference, not a brand the owner asked us to use, and a sad face conflicts with the friendly tone of the brief. The site keeps the skewer mark.

## Design re-score against 8/10
NOT PRODUCED by the build team. QA judges the live link.

## NOT VERIFIED (not run here)
- Real screen readers: no assistive technology on the test machine.
- Physical phones: only emulated viewports.
- Safari, Firefox, Chrome Android: only Chromium was run.
