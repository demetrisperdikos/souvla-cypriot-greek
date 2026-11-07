# Build notes: Souvla (job-195)

Commit: 6a33e3d3942137577f3c6c09f9d4071179e277ea (pushed to main, github.com/demetrisperdikos/souvla-cypriot-greek)

## Files
- index.html, styles.css, app.js, ui.js, store.js, lessons.js, hero.js (hero art), brand.js (brand mark), souvla-art.js, data.json
- check.sh: syntax, server, HTTP 200, browser flows, state, reload, click and footer tests. Last run: OK.
- renders/: brand mark at 16, 24, 48px (mark-*.png), render-mark.js, desk-after.png, phone-after.png, up-next-partial-1of2.png

## Measured (fresh, this commit)
- Desktop 1440: CTA row 350 to 398 (48px). Hero band ends 422. Band clears the buttons by 24px.
- Desktop buttons: Start diagnosis 192x48, Browse lessons 198x48.
- Phone 390: Start diagnosis 175x48, Browse lessons 175x48.
- Header chips: 128px each at 1440, 114px each at 390.
- Phone chips bottom y104 to Start diagnosis top y372: gap 268px. NOT MET (QA asked for it to shrink). Eyebrow, headline and paragraph still sit between them.
- Phone art panel 185px tall (y460 to 645). Desktop art panel 260px (y129 to 389).
- Footer: 898px on both breakpoints, above the 900px fold.

## Up Next
- Progress is driven by flashcard progress (store.setProgress). Fill is 50% after 1 of 2 cards, 100% after 2 of 2, and shows 'In progress, N of 2 cards'.
- Screenshot: renders/up-next-partial-1of2.png (fill 50%, text 'In progress, 1 of 2 cards'). Verified.
- Deviation: data.json unchanged. Progress is kept in the store, not the lesson data.

## Brand mark
- One dark skewer bar with three chunks (brand.js). Renders at 16, 24, 48px are in renders/. Legibility at 16px: NOT VERIFIED by visual review in this pass.

## Hero art
- Skewer 4px thick, spans 360 of 600 units (60% of plate width).
- Lower half of chunks darkened toward #140703.
- 1.5px charred rim and before/after 1x renders: NOT VERIFIED. Rim not confirmed in this pass.
- Plate edge-to-edge and grey band check: NOT VERIFIED.

## Design score
- 1440 and 390 scored: NOT SUBMITTED. The phone order and hero art rim are not yet to spec, so the 8/10 bar is not claimed.

## Typography
- Headline weight 800, letter-spacing -0.03em. Accent on one keyword (Cypriot.). Stat label spacing: NOT VERIFIED.

## Safety grep
- Run check.sh (includes click, state and footer tests). Output: OK index=200 data=200 browser-tests=passed clicktest=passed.

## Open
- Phone hero order (CTA above headline) is an owner decision, raised with Jimmy.
- Hero art rim and plate check.
- Design score.
