# Build notes: Round 39 (QA fix round, NOT complete)

## Measured this round (1440x900 and 390x844, headless Chromium)
- Footer element footer.foot: bottom 900px at 1440x900 (tests/round39.js). Above the fold, but only by the 12px bar height.
- check.sh footer check measures the feature cards (bottom 870px), not footer.foot. Reported separately above.
- Primary CTA size: 192x48 at 1440 (hero primary); 175x48 at 390 (hero primary).
- Hero chip: 141x32 at both sizes.
- Stat icons: 20x20 (header stats). Up Next icon: 20x20.
- Brand mark SVG: 48x48 in the page.
- Souvla Test card top: 386px at 1440; 722px at 390. Its primary button bottom: 870px at 1440; 1324px at 390.
- Brand PNGs at 16, 24, 48px written to qa-measure/. Not viewed this round: NOT VERIFIED.

## Done
- Hero art: lobed grilled-meat chunks, darker lower half, 1.5px charred rim, upper highlight. Stripes removed.
- Skewer 3px in hero and brand mark. Soft contact shadow under each chunk.
- Phone hero: 'Level check, 3 min' chip on its own row.
- Souvla Test stat row rendered (10 questions, ~3 minutes, +XP) with blue numerals.
- Footer moved to 900px bottom at 1440x900.
- Repo: .shots/, brand-check/, measure18/ removed from disk.

## NOT done or NOT verified
- Phone Souvla Test card: starts at 722px, not above the fold. NOT DONE.
- Design score at 1440 and 390 from new screenshots: NOT VERIFIED; my judgment is below 8/10 at 390 (card cut at fold).
- Day tabs: focus ring override added; 20px icon boxes NOT VERIFIED.
- Card weight reduction: CSS override added; NOT VERIFIED as an improvement.
- Brand mark at 16px read: NOT VERIFIED.
- 1024px layout, 200%/400% zoom, keyboard and accessibility beyond check.sh, console review: NOT VERIFIED.
- features.json: no passes flags changed this round.

## Safety grep
- target=_blank: none. Secrets: none.
- innerHTML uses static strings only (app.js:38, app.js:213, hero.js:53).

## Repo
- Code commit is recorded in git log after this commit.
