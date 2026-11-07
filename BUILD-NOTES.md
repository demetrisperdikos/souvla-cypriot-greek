# Build notes: Souvla Cypriot Greek, round 76

## Measured results
- Phone 390x844: first quiz answer bottom at 814px (fold 844px). Souvla Test title top at 405px.
- Desktop 1440x900: first quiz answer bottom at 700px (fold 900px). Souvla Test title top at 421px.
- Footer above the fold on desktop (bottom 922px on the 1440 run is the page footer, not the first answer; see measure-folds.js).
- Day-tab keyboard focus: the unselected Tuesday tab receives focus and shows outline solid rgb(180, 83, 42) 2px. Screenshot: day-tab-focus.png (kept outside the project, in ~/work/evidence/). Awaiting QA review.
- check.sh: exit 0. Function, console, axe WCAG 2 A/AA and keyboard tests pass at 390px and 1440px.

## Done
- New hero chunks (souvla-hero.js), thinner skewer, soft contact shadows.
- New brand mark (brand.js): one bold skewer through three larger chunks.
- Phone layout overrides in hv-phone.css; focus ring in hv-focus.css.
- Stale QA folders removed from the project root.
- Owner upload (uploads/H4v7rLO9oqgJ.png) is a sad-face graphic. It is not used anywhere in the build.
- features.json: passes=true for 1-10 and 12. Feature 11 stays false until QA reviews the day-tab screenshot.

## NOT VERIFIED (per brief)
- 1024px width.
- 200% and 400% zoom.
- 16px brand read: a 16px capture was made (brand-16-24.png) but not yet reviewed against the design bar.
- Day-tab focus ring: evidence captured, not signed off.
- Design score: not re-scored since the hero and brand changes.

## Recommended manual checks, not run
- Screen reader reading order, physical phone touch targets, branded browsers.

## Open owner decision
- Phone hero art is small and the lead paragraph is hidden on phone. Restore or keep removed.
