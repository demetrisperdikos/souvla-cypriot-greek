# QA round 2: change map

Each QA item, where it is handled, and what to look at.

| QA item | Where | What changed |
|---|---|---|
| Desktop hero scale-up | site.css (min-width 900px block), hero-r12.js | Headline 3rem; hero panel 272px; skewers and plate fill the panel |
| Eyebrow cramped under header | site.css (.hero padding-top) | Extra top padding on desktop so the eyebrow has air above |
| Daily challenge status all caps | site.css (.streak-msg) | Sentence case, 0.875rem, line-height 1.5 |
| Card titles weight and icon tiles | site.css (.card-head h2/h3, .card-head > :first-child) | Weight 800, size 1.375rem; icon tile fill #BFDAF8 with stronger border |
| Skewer and plate art | hero-r12.js | Warm radial gradient, upper-left highlight, lower shade, contact shadow; plate rim gradient and drop shadow |
| Chip overlaps plate | site.css (.hero-chip) | Moved to bottom-left, inside the panel, clear of the plate at 390px and 1440px |
| Browse lessons focus and hover | site.css (.btn.ghost) | Accent focus ring (3px); hover fill, border and shadow matching primary |
| Lessons row heading | app.js (lesson hub), site.css (.lessons) | 'Browse all lessons' heading; 48px top margin |

## Still open (not verified here)
- Design score against the 8/10 bar: judged by QA or owner on the live link.
- Real screen reader pass.
- Physical phone touch and safe-area behaviour.
- Safari iOS and Chrome Android.
- Hover and focus on a real browser beyond the scripted tests.
- Owner decision: hide 'What you get' on desktop (not changed).
