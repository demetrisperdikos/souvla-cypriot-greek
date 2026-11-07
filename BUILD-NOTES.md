# Build notes: Round 41 (QA fix round, NOT complete)

## Measured (headless Chromium, tests/round36.js, round37.js, round40.js, round41.js)
- Footer element footer.foot at 1440x900: top 888, bottom 900 (at the fold, not above it by any margin). check.sh's footer check measures the feature cards (bottom 870), not footer.foot.
- Primary CTA (hero): 192x48 at 1440; 175x48 at 390.
- Hero chip: 141x32 at both sizes.
- Stat icons: 20x20. Up Next icon: 20x20.
- Brand mark SVG: 48x48 in the page. Brand PNGs at 16, 24, 48px in qa-measure/: NOT VIEWED.
- Souvla Test card top: 386px at 1440; 715px at 390.

## Done
- Hero art: lobed grilled-meat chunks, darker lower half, 1.5px charred rim, upper highlight. Stripes removed.
- Skewer 3px in hero and brand mark. Soft contact shadow under each chunk.
- Phone hero: 'Level check, 3 min' on its own row above the art.
- Souvla Test stat row (10 questions, ~3 minutes, +XP) with blue numerals.
- Footer bottom at 900px at 1440x900.
- Repo: .shots/, brand-check/, measure18/ removed from disk.

## NOT done or NOT verified
- Design score at 1440 and 390 from new screenshots: NOT VERIFIED as 8/10. My judgment: the phone Souvla Test card still starts low, so 390 is below the bar.
- Day tabs: focus ring added; 20px icon boxes NOT VERIFIED.
- Card weight: NOT VERIFIED as an improvement.
- Brand mark at 16px: NOT VERIFIED.
- 1024px, 200%/400% zoom, keyboard and accessibility beyond check.sh, console review: NOT VERIFIED.
- features.json: no passes flags changed.

## Safety grep
- target=_blank: none. Secrets: none.
- innerHTML uses static strings only (app.js:38, app.js:213, hero.js:53).

## Repo
- Code commit: recorded below after commit.
