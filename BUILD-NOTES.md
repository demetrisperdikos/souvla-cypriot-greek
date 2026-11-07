# Build notes: Souvla (Cypriot Greek), round 27

## HEAD
Code commit: ab46185 (hero.js, app.js). Republished to the same link after it.

## Stylesheet
Load order: fonts.css, site.css, final.css (final.css overrides site.css).
- .hero-art, .hero-scene, .hero-chip: hero panel (site.css, media-query overrides in final.css).
- .btn, .btn.primary: 48px CTAs (site.css line 98, final.css lines 4-6).
- .up-next.next-up, .up-next-pct: Up Next strip (final.css). Class name not renamed.

## Fonts
Self-hosted from fonts/. No remote font link, so no Subresource Integrity needed.

## Safety grep
innerHTML: app.js (Up Next icon, static SVG string) and brand/logo markup (static). hero.js builds its SVG from code, no user input. No eval, no new Function, no target=_blank. http:// hits are SVG namespace strings only.

## Measured
Start diagnosis, Begin the test, Open First Greetings: 48px at 1440 and 390 (Playwright, round 26).

## Status
- Skewer: visible in front of the chunks at 1440 and 390 (screenshot, round 27).
- Up Next: 'Not started, 0 of 6 steps' (screenshot).
- Brand mark legibility at 16, 24, 48px: NOT VERIFIED (no pixel check).
- Hero design vs 8/10 bar: NOT VERIFIED (judged by eye only).
- Desktop hero text and CTA vertical centring: NOT VERIFIED (not measured).
- Souvla Test gap and header chip widths: NOT VERIFIED (not re-measured).
- Screen reader pass: NOT VERIFIED (not run).
