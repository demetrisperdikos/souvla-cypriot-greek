# Build notes, Souvla (job-195), current measured values

Run: bash check.sh (exit 0 after the round 19 changes; see final run below).
Measurements: qa/measure-r17.js against a local server. Phone and desktop values are from the same script.

## Measured values
- 1440x900: H1 56px. UP NEXT strip 72px. Strip-to-CTA gap 8px. CTA 48px. CTA-to-card-bottom 17px. Strip-to-card-bottom 73px. Card height 451px.
- 390x844: H1 36px. UP NEXT strip 93px. Strip-to-CTA gap 8px. CTA-to-card-bottom 17px. Souvla Test card top 663px, height 560px. First question text at y=783 to 831, which is above the 844px fold.
- Phone CTAs sit on one row (round 19). Hero art 100px tall on phone.
- Page height 1457px desktop, 2768px phone. Footer sits at the page bottom. No horizontal overflow at either size.
- Icon tile 48px desktop, 44px phone, border 1px rgb(142,58,23).
- Brand mark 48px, three chunks scaled 0.8 about the centre for inner padding.

## Brief items
1. UP NEXT strip / dead band: NOT VERIFIED. The 73px below the strip is the 8px gap, the 48px CTA and 17px of card padding. The Daily card has no spare height to fill without pushing content below the fold. Decision needed: shorten the Souvla Test card content, or accept the layout.
2. CTA shadow and tone: verified in measurement (tonal shift and warm shadow applied).
3. Headline: verified at 56px desktop. Phone is 36px.
4. Card treatment: NOT VERIFIED visually against the brief.
5. Skewer: viewBox widened to -220 -100 440 200 so the full skewer should fit. Chunks padded in the brand mark. Visual crop review NOT VERIFIED.
6. Phone fold: VERIFIED for the first question (783 to 831, above 844). The card header and body start at y=663.
7. Streak pill accent colour: verified by check.sh.
8. Empty-state icon: 24px inline SVG.
9. Icon tile border at 2x: verified 1px rgb(142,58,23).
10. Rule counts. final.css: .btn 10, .tile 1, .streak-msg 0, .challenge-card 23 (2 blocks), no .daily-card. site.css: .btn 45 hits, .tile 7 hits, .streak-msg 2 hits, .challenge-card 36 hits. The daily card is styled by .challenge-card in both files. NOT VERIFIED as one base rule per selector.
11. XSS: live probe run through the real storage key souvla.state.v2 with a reload. Payload <img src=x onerror> injected into done, lastActive and level. Result: xss=0, injected images 0, raw payload absent from body, 0 page errors. VERIFIED.
12. Feature checks: check.sh runs the quiz result level, XP updates, streak reset, and the click test (34 controls, 0 errors, 0 no-change cases). Footers above the 900px fold. VERIFIED by check.sh.

## Security
- The empty repo demetrisperdikos/souvla-job-195 could not be deleted: HTTP 403, token lacks delete_repo scope. NOT DONE.
- The GitHub token that appeared in git remote output must be rotated by the account owner. NOT DONE. Current remote URL is clean.
