# Progress: Souvla, Cypriot Greek portal

## Round 5 (QA round 2 fixes)
- Day chips: seven round chips in the Daily challenge card. Tapping a chip sets is-selected and aria-pressed, and the caption under the row updates (art.js).
- Phone hero: full-width card, 358x220 on phone (final-r4.css, round 5 block).
- Desktop cards: flex columns with the CTA pinned to the bottom. Measured at 1440px: both cards 476px tall, bottoms at 951px, CTA bottoms at 930px.
- Icons: both desktop cards use the same outline SVG family (featIcon in app.js). Daily challenge no longer uses the filled mascot.
- Wordmark: 36px Nunito 800 beside the 48px skewer mark.
- Souvla Test card: 'First question' preview (app.js testCard).
- Desktop hero scene: 360px tall to fill the right column.

## Verification
- bash check.sh exits 0: syntax, HTTP 200 for index.html and data.json, browser flows, state checks, click test (34 controls, 0 dead, 0 errors).
- Screenshots at 1440px and 390px saved in .shots/.

## Not verified
- Design score against the 8/10 bar: judge from the live link.
- Screen reader and real-device touch behaviour.
