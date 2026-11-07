# Build notes, Souvla (job-195)

Run: bash check.sh (exit 0 on commit 81f519e). Measurements: live page at 1440x900 and 390x844, read with getBoundingClientRect.

## Measured values (commit 81f519e)
- 1440x900: day hint 8px below the day chips. UP NEXT strip 96px, directly below the hint with a 17px gap. Strip-to-CTA gap 8px. CTA-to-card-bottom 17px. Card height 427px.
- 390x844: day hint 8px below the day chips. UP NEXT strip 199px, 25px below the hint. Strip-to-CTA gap 8px. CTA-to-card-bottom 17px. Card height 560px.
- No horizontal overflow at either size. Footers share one baseline and sit above the 900px fold at desktop.

## Brief items
1. Dead band below UP NEXT strip: VERIFIED at 1440. The strip now fills the spare height and the CTA sits 17px above the card edge. At 390 the strip is 199px tall and the 25px gap above it is a design call, NOT VERIFIED as intended.
2. CTA shadow and tone: VERIFIED by earlier measurement, not re-checked this round.
3. Headline: VERIFIED at 56px desktop. Phone is 36px.
4. Card treatment: NOT VERIFIED visually against the brief.
5. Skewer redraw and 48px brand mark crop: NOT VERIFIED this round.
6. Phone fold: first question sits above 844px, verified in the earlier round.
7. Day hint 8px below the chips: VERIFIED at both sizes.
8. Helper note 'Miss a day and the streak resets...': hidden at all widths. The brief did not ask for it, so removing it is a copy decision for the owner, NOT VERIFIED as intended.
9. Rule consolidation: duplicate .challenge-card base rules removed from site.css, one base rule remains in final.css. .btn modifier rules are variants, not duplicates. VERIFIED for .challenge-card. NOT VERIFIED for .btn and .tile as one base rule each.
10. Scratch files under qa/: removed from the repo. VERIFIED.
11. Republish: NOT VERIFIED until the publish step returns.
12. Design score against the 8/10 bar: NOT VERIFIED. QA owns this.

## Decisions for the owner
- Helper note: keep it hidden, or restore it below the chips.
- Phone strip height (199px): accept, or shorten the strip and let the Souvla Test card change.
