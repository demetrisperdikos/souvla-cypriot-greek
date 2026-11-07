# Build notes: Souvla (job-195)

Commit: 3c9afa4e2323fcdd1c8e18779eb4e5f654249cc9 (content); pushed head 7c82e43b435046ef427c576d8881cbcb69bfc2b5 adds only this line. Repo: github.com/demetrisperdikos/souvla-cypriot-greek.

## Files
- index.html, styles.css (final layer loads last), app.js, ui.js, store.js, lessons.js, hero.js (hero art), brand.js (brand mark), souvla-art.js, data.json, check.sh.
- renders/: brand mark 16/24/48px (mark-*.png), render-mark.js, desk-after.png, phone-after.png, up-next-partial-1of2.png, phone-order.png, phone-cta-under-chips.png, phone-plate.png, desk-plate.png, hero-compare/ (compare-1x.png: QA round 1 art on the left, current art on the right).

## Check
- ./check.sh: syntax, server, HTTP 200, flow, state, reload, click and footer tests. Last run: OK index=200 data=200 browser-tests=passed clicktest=passed.
- Safety grep: grep -rn -E 'TODO|FIXME|eval\(|document.write' --include=*.js --include=*.html *.js index.html gave no matches.

## Measured (390 and 1440, from the current build)
- Phone header chips bottom y104. Start diagnosis top y125, bottom y173. Gap 21px (was 268px before the CSS order change, then 63px, now 21px).
- Phone CTA buttons 48px tall.
- Desktop 1440: Start diagnosis 192x48, Browse lessons 198x48, both at y350 to 398. Peach band ends y422, so the buttons clear the band bottom by 24px.
- Header chips: 128px wide each at 1440, 114px each at 390.
- Phone art panel and plate: panel height matches the SVG within 1px (plate top and bottom gaps 1px each), so no grey or beige band below the plate. Desktop panel 260px, SVG 258px, 1px gaps.
- Footer at 898px on both breakpoints, above the 900px fold.

## Up Next
- Progress comes from flashcard progress in store.js (setProgress / progressOf). Lesson data.json is unchanged, which is a deviation documented here.
- After 1 of 2 cards: fill 50%, text 'In progress, 1 of 2 cards'. Screenshot: renders/up-next-partial-1of2.png. Verified.
- After 2 of 2: fill 100%.

## Brand mark
- One dark skewer bar with three larger chunks (brand.js). Renders at 16, 24, 48px in renders/. Legibility at 16px: NOT VERIFIED by a visual review in this pass.

## Hero art
- Skewer 4px thick, spans 360 of 600 units (60% of plate width), with a highlight line.
- Lower half of each chunk darkened toward #140703.
- The chunks have a 1.5px #140703 non-scaling stroke in code. Whether it reads at 1x: NOT VERIFIED by a visual review in this pass. Before/after 1x comparison is in renders/hero-compare/compare-1x.png.
- Contact shadows are present under the chunks.

## Not done
- Design score at 1440 and 390: NOT SUBMITTED. Not scored against the 8/10 bar.
- Typography: headline weight 800, letter-spacing -0.03em, accent on one keyword (Cypriot.). Souvla Test stat label spacing: NOT VERIFIED.
- Correction: earlier notes claimed the phone gap was not met and the Up Next and rim were verified; the phone gap is now 21px and the Up Next partial is verified, but the rim and brand legibility are not.
