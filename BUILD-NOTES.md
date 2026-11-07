# Build notes: Fix round (job-195), Round 49

## Status
NOT DONE. Design is not verified at 8/10. Brand mark at 16px is not legible. features.json passes are unchanged.

## What changed this round
- Hero art rebuilt in souvla-hero.js (four chunks, no stripes or dash marks, irregular outlines, dark lower half, 1.5px rim, highlight on upper lobe).
- Level-check chip moved onto its own row above the art panel (hv-v2.css).
- Terracotta limited to the primary CTA and the headline keyword; card CTAs neutral.
- Desktop headline 60px; Souvla Test and Daily challenge cards lighter.
- Footer at 892px at 1440x900 (under the 900px fold).
- .shots/ deleted from disk; check for it returns 0.
- Legacy .hero-art height rules neutralised on the new wrapper.
- Brand mark (brand.js) redrawn with bigger chunks and a lighter skewer.

## Scores (tests/score.js, rubric, not a visual 8/10)
- 1440: 8.9 (fails: Souvla Test card ends below the 900px fold).
- 390: 10.
- Visual judgment: NOT VERIFIED at 8/10 at either width.

## Measurements
- Primary CTA width: 192px at 1440 (measured). 175px at 390 (measured in an earlier run).
- Hero chip width: 143px at 1440, 143px at 390 (measured).
- Footer bottom: 892px at 1440x900 (check.sh).
- Brand mark 16/24/48px: rendered in qa-measure/brand-16-24-48/. 16px is still a dark smudge: FAIL.
- Day-tab focus ring: computed outline is none; box-shadow shows a 2px white plus 2px terracotta ring. Screenshot at qa-measure/day-tab-focus.png (captured before the last CSS edits; NOT re-verified).
- 1024px, 200% and 400% zoom: NOT VERIFIED.
- Keyboard and accessibility beyond check.sh: NOT VERIFIED.
- Console errors: none on load and on focus test (fx.js). Full interaction set NOT VERIFIED beyond check.sh.
- Browser test suite: check.sh passes (test.js, states.js, reload.js, clicktest.js).

## Safety grep
innerHTML at app.js:38 (logo constant), app.js:214 (static icon constant). No eval, new Function, target=_blank, or secrets. http:// appears only as the SVG namespace in ui.js and app.js.

## Repo
- Code commit: e57a91e (Round 49b). Working tree clean after that commit.
- git status: clean.

## Republish
See publish result in the chat. The link https://sites.willysilly.com/s/lszpu5cvgx646628/ is republished from this commit after the notes commit.
