# Build notes: Cypriot Greek Diagnostic & Immersion Portal

## Current HEAD
The code commit is the one that last changed souvla-art.js, hero.js or final.css. Run `git log --oneline -1 -- final.css` to confirm. This file was written after that commit.

## Live stylesheet
Load order in index.html: fonts.css, site.css, final.css. The final.css file overrides site.css.

Selectors that define the look of the changed parts:
- .hero-art, .hero-art > svg, .hero-art .hero-chip (hero illustration panel and its chip). Set in site.css and overridden in final.css by media queries at 899px and 900px.
- .stats, .stat, .stat-ico (header streak, XP and skewer chips). Set in site.css and final.css.
- .challenge-card, .challenge-card > .up-next.next-up, .up-next-bar, .up-next-pct (Daily challenge and Up Next strip).
- .btn.primary (48px CTAs).

## Was .up-next renamed?
No. The class is still `up-next next-up`. The track element `.up-next-bar` is hidden with `display:none` in final.css. Measured: the strip is 96px tall at 1440 (y735 to 831). Label shows the text "Not started". Name change: none.

## Overlap of final.css and site.css
Both files set the same selectors. final.css does not replace site.css. It adds rules after it, so for a repeated property the final.css value wins. The hero rules alone are repeated across about 15 rules in final.css, several of which are overridden again by later rules in the same file. This was not consolidated, so the cascade is harder to read than it should be.

## Items
1. Repo hygiene: VERIFIED. .shots/ and qa/ are empty. .shots/ is in .gitignore.
2. Brand mark, 48px tile: VERIFIED in DOM at 40px render (svg width 40). Legibility at 16, 24 and 48px: NOT VERIFIED by eye. No pixel check was run.
3. Hero chunks, lumpy outline and lower-half char: present in hero.js. Judged from screenshot only. NOT VERIFIED as meeting the design bar. In the 1440 screenshot they still read as soft brown clouds.
4. Skewer: 18px bar with metal gradient (hSkew) and a white highlight. Visual judgement only, NOT VERIFIED against the 'about 60% of plate width' brief. The skewer runs the full panel width. This is an owner decision.
5. Phone hero: illustration spans full panel width with 24px of air above (padding-top 24px in final.css). VERIFIED by screenshot. Measured panel width matches the card width.
6. Phone chip: moved to bottom-left of the panel, so it does not cover the chunks. VERIFIED by screenshot.
7. Souvla Test card gap: 16px between panel bottom and card top at 390. Round 20 measurement. Not re-measured this round.
8. Up Next: track removed, label 'Not started'. VERIFIED by screenshot.
9. Gap between streak row, Up Next box and CTA: 16px above and below, measured round 22. Not re-measured this round.
10. Header chip icon boxes and Souvla Test icon box equal size and stroke: NOT VERIFIED.
11. Desktop hero: art fills the panel and is centred against the text block (panel top 121 equals eyebrow top 121 at 1440). VERIFIED by measurement. Empty space below the CTAs: NOT VERIFIED as balanced.
12. Design score: NOT RE-MEASURED. The bar is 8 or higher. Current status is below the bar by QA judgement, not yet re-scored.

## Tests
`bash check.sh` runs syntax checks, serves the folder, runs the flow, state, reload, click and footer tests, and expects HTTP 200 for index.html and data.json. Last run this round: exit 0.
