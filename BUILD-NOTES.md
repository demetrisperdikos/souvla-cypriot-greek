# Souvla build notes (job-195)

CODE HEAD: 1df9901 (build commit, pushed to main). This notes commit is on top of it.

## Files
- index.html loads fonts.css, site.css, final.css in that order.
- brand.js: header mark. hero.js: hero illustration. app.js, lessons.js, store.js, ui.js, data.json: app and content.
- check.sh: runs the browser tests, serves the folder, checks HTTP 200. Last run EXIT=0.
- .shots/ removed and gitignored. tests/measure.js deleted (scratch, not called by check.sh). qa/ is empty.
- QA-round comments removed from final.css and site.css (count 0). Duplicate rules NOT consolidated.

## Measured at 1440x900 and 390x844 (rendered page, Round 22)
- Brand mark box: 48x48. 1440 x25 y17. 390 x17 y9. VERIFIED.
- Brand mark at 16, 24, 48px, 1x and 2x: rendered standalone, PNGs written (343/683, 514/807, 807/1503 bytes). Size VERIFIED. Visual legibility at 16 and 24px: NOT VERIFIED by eye.
- Contrast: bar #2A0F03 on #FBF6EF 16.72:1; chunk #A0491F on #FBF6EF 5.63:1 (above 3:1 for graphics). VERIFIED by calculation.
- Brief 1 (no sunglasses look): one dark skewer bar with three accent chunks. Judged from screenshot. Owner judgement pending.
- Desktop hero panel: x718 y121 w578 h273 (bottom 394). Illustration svg x719 y122 w576 h271. VERIFIED fills panel.
- Skewer vs plate: skewer runs edge to edge (about 100% of plate width). Brief asked for about 60%. NOT MET. Owner decision.
- Vertical centring: panel top 121 equals eyebrow top 121 at 1440. VERIFIED. Empty space below CTAs: judged from screenshot, NOT VERIFIED as balanced.
- Chunk rim: DOM stroke is #140703 at stroke-width 1.5 (non-scaling) at 1x and 2x (rendered svg 575.75x271 at both). VERIFIED in DOM. Rendered pixel thickness at 1x and 2x: NOT VERIFIED (no pixel measurement run).
- Chunk outline lumps and lower-half gradient: present in hero.js. Visual judgement only, NOT VERIFIED as cooked-meat quality.
- CTAs 48px tall. 1440: Start diagnosis y346-394, Begin the test y847-895, Open First Greetings y847-895. 390: Start diagnosis y399-447, Begin the test y1174-1222, Open First Greetings y1735-1783. VERIFIED.
- Hero composition 1440: eyebrow top 121, panel top 121. VERIFIED.
- Hero composition 390: eyebrow y141-159, panel top 471 (312px apart with the header chips and intro between). Stacked layout, not a same-row pair. VERIFIED values.
- Phone hero: panel bottom 663, Souvla Test card top 679 (16px gap). VERIFIED in round 20.
- Up Next 1440: strip y735-831 (96px). Streak preview bottom 719, so 16px gap above. CTA top 847, so 16px gap below. VERIFIED.
- Up Next 390: strip y1599-1719. Gaps 16px above and below (1583-1599, 1719-1735). VERIFIED.
- Up Next label: 'Not started' with 8px track, no step count. NOT VERIFIED as a designed state by eye.
- Header chips 20px icon box and stroke: NOT VERIFIED.
- Footer baseline: bottom 895 at 1440x900. VERIFIED.

## Design score
NOT MEASURED by a reviewer. No 8+ claim is made. Build is NOT DONE.

## Open
1. Skewer width: 60% of plate vs edge to edge. Owner decision.
2. Chunk rim 1.5px #140703 at 1x and 2x: measure.
3. Consolidate final.css and site.css into one block per component.
4. Brand legibility at 16 and 24px by eye.
5. Design score by a reviewer.

## Round 23: consolidation attempt reverted
- A rewrite of final.css (62 lines) was tried. It broke the desktop day chips (ran past the card edge), shifted the hero, and moved the footer baseline from 895px to 877px.
- final.css was restored from git (git checkout). check.sh EXIT=0 after the restore, footer baseline 895px on both runs.
- Live stylesheet is therefore unchanged from the previous commit. final.css (228 lines) and site.css (430 lines) still have overlapping rules. NOT consolidated.
- Design score: NOT MEASURED. No 8+ claim. Build is NOT DONE.

## Round 24: safe stylesheet cleanup
- Removed empty @media blocks and dead comment placeholders from final.css (10955 -> 10484 bytes).
- Pixel check: full-page screenshots at 1440x900 and 390x844 hash-identical before and after (1440 sha256 e26ccb6a..., 390 sha256 dd0a3108...). Footer bottoms 1490.8 and 2824.25 unchanged.
- check.sh run after the cleanup: see result above.
- Consolidation of overlapping rules across final.css and site.css is still NOT complete. Design score NOT MEASURED. Build is NOT DONE.

## Round 24 (current)
- Stylesheet order: fonts.css, site.css, final.css. Round 23 and 24 overrides are appended at the end of final.css.
- Brand mark: one dark bar (#2A2A2A, 42x6 at y21) with three accent chunks (#A0491F). Judged from screenshot at 40px; 16/24/48px legibility NOT VERIFIED by eye.
- Skewer: 18px bar with a grey-to-dark metal gradient (hSkew) and a white highlight line. Visual judgement only.
- Phone hero: art spans full panel width, 24px air above. Chip moved to bottom-left (final.css round 24). Chip no longer covers the chunks. VERIFIED by screenshot only.
- Up Next: track removed; state text reads Not started. VERIFIED by screenshot.
- Chunks: still read soft in the 1440 screenshot. Design score NOT RE-MEASURED by QA; this round does not claim 8+.
- check.sh: exit 0 on this HEAD.
