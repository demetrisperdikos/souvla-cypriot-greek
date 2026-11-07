# Build notes: Round 48 (QA fix round, NOT complete)

Code commit: 528230a. The notes commit follows it.

## Done this round
- Hero art redrawn as grilled chunks on a 3px skewer, with irregular lobes, darker lower halves, upper highlights, and a soft contact shadow. Stripe line and grey ground bar removed.
- Phone hero: 'Level check, 3 min' on its own row above the art. Art panel fits the art height.
- Phone: Souvla Test heading and the three stat tiles sit above the 844px fold. Stat tiles are one row.
- Desktop: streak icon pinned to a 20px box, so it no longer overlaps 'No streak yet'.
- Day tabs: visible focus ring added to unselected tabs (override.css). Not yet viewed in a screenshot.
- .shots/ deleted from disk; ls -la | grep -c shots returned 0 after the last run.
- check.sh exit 0 (all functional, state, keyboard, axe and day-marker checks passed).

## Design judgment (screenshots, not tests/score.js)
- 1440: NOT SCORED at 8/10. My own read is about 6/10. The hero and streak card are clean, but the desktop headline and the two cards still compete.
- 390: NOT SCORED at 8/10. My own read is about 6/10. The Souvla Test card now starts above the fold, but the hero art is small.
- Terracotta is still used on the Daily challenge CTA and the Souvla Test CTA as well as the primary CTA. Hierarchy fix is NOT complete.

## Measurements
- Primary CTA: NOT RE-MEASURED this round.
- Hero chip: NOT RE-MEASURED this round.
- Footer: check.sh reports footers at 891px bottom at 1440x900 (above the fold).
- Brand mark at 16/24/48px: NOT VIEWED this round.

## NOT verified
- Design at 8/10 at 1440 and 390.
- Brand mark 16px read.
- 1024px, 200% and 400% zoom.
- Keyboard and accessibility beyond check.sh.
- Console review beyond check.sh.
- features.json: no passes changed in this round.

## Safety grep
Not re-run in this round; see the last QA report for the round before.

## Republish
Same link: https://sites.willysilly.com/s/lszpu5cvgx646628/ (draft for QA).
