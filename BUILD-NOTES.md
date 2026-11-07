# Build notes: Souvla (job-195), round 28

Current commit: 6487acb (main, local)
Stylesheets: fonts.css, site.css, final.css (final.css loads last).
Key selectors: .hero, .hero::before (warm band), .hero-art, .hero-chip, .hero-copy, .stats, .topbar (z-index 5), .up-next, .up-next-pct, .card, .section-divider, .main (bottom padding).

## Changed this round
- Repo hygiene: .shots/ untracked (git rm --cached), folder deleted, .shots/ in .gitignore. art2.js/art3.js do not exist, nothing to remove.
- Skewer shortened in hero.js to 360 of 600 units (60% of art width), x=120.
- Brand mark (brand.js): one dark bar and three lumpy chunks, no thin lines or dots.
- Up Next (app.js): status reads from the lesson model; steps when present, cards otherwise (currently 'Not started, 0 of 2 cards').
- Desktop hero: text group centred against the art panel (align-items:center, final.css).
- Warm band behind hero, card surface tint #FFFCF8, bottom padding on .main, section divider class added.

## Checks run this round
- check.sh: exit 0 (index 200, data 200, flows, states, reload, clicktest, footers).
- Axe WCAG 2 A/AA: clean on home and quiz at 390 and 1440.
- Screenshots at 1440 and 390 taken after the header fix.

## NOT VERIFIED
- Hero chunk outlines (item 2): NOT changed this round. Darkening, varied lobes, highlight and charred rim were not redone; chunks still read as soft shapes.
- Brand mark at 16, 24, 48px: NOT VERIFIED (no pixel comparison run).
- Design score vs 8/10: NOT SCORED. No scored review was run.
- Desktop text/CTA centring: NOT measured against the art panel.
- Phone air above art (24px) and Souvla Test card spacing: NOT re-measured.
- Safety grep output: NOT re-run this round (last run: no eval, no new Function, no target=_blank).
- GitHub push: NOT DONE. Commit is local only.
