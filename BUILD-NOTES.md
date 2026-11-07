# Build notes: Round 46 (QA fix round, NOT complete)

## Measured (headless Chromium, tests/round46.js, 1440x900)
- footer.foot: top 888, bottom 900 (at the fold).
- Feature cards: bottom 883 (both). Up Next is back on the Daily challenge card, compacted.
- check.sh footer check measures the feature cards (bottom 866 after the last change).
- Primary CTA: 192x48 at 1440, 175x48 at 390. Hero chip: 141x32 at both sizes.
- Stat icons and Up Next icon: 20x20.
- Souvla Test card top: 386px at 1440, 715px at 390.
- Brand PNGs at 16, 24, 48px in qa-measure/: written, NOT VIEWED.

## Done
- Hero art: lobed grilled-meat chunks, darker lower half, 1.5px charred rim, upper highlight. Stripes removed.
- Skewer 3px in hero and brand mark. Soft contact shadow under each chunk.
- Phone hero: 'Level check, 3 min' on its own row above the art.
- Souvla Test stat tiles (10 questions, ~3 minutes, +XP) with blue numerals.
- Footer bottom at 900px at 1440x900.
- Repo: .shots/, brand-check/, measure18/ removed from disk.

## NOT verified
- Design score at 1440 and 390 from new screenshots: NOT VERIFIED as 8/10.
- Day tabs: 20px icon boxes are CSS-only, not visually verified.
- Brand mark at 16px read: NOT VERIFIED.
- 1024px, 200%/400% zoom, keyboard and accessibility beyond check.sh, console review: NOT VERIFIED.
- features.json: no passes flags changed.

## Safety grep
- target=_blank: none. Secrets: none.
- innerHTML uses static strings only (app.js:38, app.js:213, hero.js:53).
