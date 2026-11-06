# Progress: Souvla, Cypriot Greek portal

## Round 4 (QA fixes)
- Styles: the eight extra stylesheets are removed. All rules live in app.css, linked from index.html.
- Hero: one owned illustration in hero-clean.js (the Souvla mascot seated at a table with a skewer on the grill, accent blue). hero-clean.js overrides window.SouvlaArt.hero and loads after art.js and art-r2.js.
- Wordmark: 'Souvla' at 2.25rem Nunito 800 (2rem on phone) with a 56px mark.
- Phone header: three equal stat pills with two-line labels, 16px side padding, nothing clipped.
- Daily challenge: 48px accent icon badge; seven day tiles with accent fill and white text when on.
- Uploaded picture: not referenced.

## Verification
- bash check.sh exits 0: syntax, HTTP 200 for index.html and data.json, browser flows, state checks, axe WCAG 2 A/AA, click test (34 controls, 0 dead, 0 errors).
- Known gaps: art.js and art-r2.js still loaded for shared helpers; screen reader and real-device touch targets not verified; daily challenge and test card not re-scored against the 8/10 bar.
