# Progress: Souvla, Cypriot Greek portal

## Round 3 (QA fixes)
- Contrast: primary buttons and eyebrow use #0062CC. Lowest text pair 4.81:1 (green on tinted green tile). All audited pairs pass AA.
- Hero: new Cypriot scene in art.js (souvla skewer over coal grill, sea horizon, warm sun). Pill row "Ten questions" / "About 3 minutes" above CTAs.
- Cards: Daily challenge has 7-day streak preview. At 1440px both cards 300px tall, same top. At 390px stacked, no horizontal overflow.
- Souvla Test stat tiles: tinted blue with border.
- Lessons: mini-game tiles use terracotta accent (tile-clay).
- Header pills: white surface, border, bolder value.
- Footer: stray dot removed, single centred line.
- Streak test: 2-day idle case added beside 3-day case.

## Verification
- check.sh: syntax, HTTP 200 index and data, 27-check browser suite passed.
- axe-core WCAG 2 A/AA: 0 violations at 390px and 1440px.
- Contrast audit: all listed text pairs pass 4.5:1.

## Not automatable here
- Screen reader announcements, real phone touch targets, hover/active polish, Google Fonts on slow 4G.

## Round 4 (design fixes)
- Accent: #0062CC used for primary actions and text (AA). The plan's #007AFF is kept only for the hero sea band. Deviation noted here; #0062CC chosen for 4.5:1 text contrast on white.
- Hero: redrawn scene (sun, sea bands, shoreline, charcoal grill on legs, souvla skewers with tomato and onion rhythm, parasol).
- Brand: new skewer glyph replaces the generic sun mark.
- Header pills: warm terracotta (streak) and sunflower (XP) tints; skewers pill stays blue.
- Daily challenge card carries a warm tint to match.
- Remaining manual checks: screen reader announcements, real touch targets, hover/active polish, Google Fonts on slow 4G.

## Round 5 and 6 (QA round 2 fixes)
- Storage: app.js reads window.localStorage inside try/catch; store.js wraps every get and set. Falls back to in-memory storage when blocked.
- Primary CTA: 'Begin the test' now uses the same solid primary pill as 'Start diagnosis' and 'Open First Greetings'.
- Logo: inline SVG skewer glyph (horizontal stick, meat and tomato pieces) replaces the generic sun mark.
- Header: at 390px the three pills share one row under the brand.
- Hero: reverted the unconditional override that broke stacking; desktop stays two columns, phone stacks.
- Souvla Test stat tiles: warm terracotta tint with larger numerals.
- Accent deviation: #0062CC used instead of the plan's #007AFF for AA text contrast on white (4.5:1 minimum). #007AFF stays only on the decorative sea band.
- Screenshots: home, quiz, mid-quiz, result, lessons, flashcard front and back, dialogue and Word Match captured at 390px and 1440px (.shots/).
- Browser checks: check.sh 27-check suite passes; click-through of every control covered by qa/test.js.

## Card CTAs
- Souvla Test and Daily challenge both use the solid primary pill (`btn-primary`). The earlier open note about the Daily challenge button was wrong; no change needed.

## Deferred manual checks (cannot run in this environment)
- Screen reader announcements: deferred; needs a real VoiceReader pass.
- Touch target sizes on a real phone: deferred; min-height 44px set on buttons, to be measured on device.
- Hover and active states: deferred to a manual pass; hover rules exist in styles.css.
- Google Fonts on slow 4G: deferred; fonts load with display=swap and system-ui fallback.

## Round 7 (QA handoff)
- Files: index.html, styles.css, ui.js, art.js, store.js, lessons.js, app.js, data.json, check.sh, qa/test.js.
- check.sh: passes (syntax, HTTP 200 index and data, full browser suite).
- Pending visual review by QA: quiz, mid-quiz, result, lesson hub, flashcard front and back, dialogue, Word Match at 390px and 1440px (.shots/).
- Warm Souvla Test tiles changed after the last home screenshot; re-check at both widths.

## Round 8 and 9 (QA round 2, build notes)
- Hero: desktop headline capped to two balanced lines; illustration fills the right column at 1440px.
- Phone hero: illustration shortened to 150px tall so the CTA and a full image sit above the fold at 390px.
- Phone header: stat pills in an even three-column grid (Round 9).
- Daily challenge: seven labelled day markers (M T W T F S S) replace the grey bars; each has an aria-label.
- Lesson hub: flashcard, dialogue and mini-game cards carry accent top borders and tinted headers, with a hover lift.
- Palette: calm, emoji-free, one accent #0062CC. Owner confirmation still pending.
- Still open: visual score of quiz, result, lessons, flashcard, dialogue and Word Match against the 8/10 bar; deferred manual checks.

## Round 8 (QA fix pass)
- Hero illustration redrawn in the accent blue plus warm neutrals (sand, white, soft sky), clean shapes, no muddy grey-blue bridge.
- Skewer mascot (art.js mascot()) used on the streak card empty state and feature tiles; drawn in accent and neutrals.
- Daily challenge day markers: three states (done, today, upcoming), hover and focus ring matching the primary button, each tappable with a status caption.
- Logo mark enlarged to fill its tile; wordmark Nunito 800 at 1.5rem with 'Cypriot Greek' as the secondary line.
- Type scale set to 12, 14, 16, 20, 28, 40; Nunito display weight used only for headings.
- qa/clicktest.js extended: day markers, lesson hub cards, and Back to lessons buttons now have explicit checks. Output in clicktest-output.txt (34 controls, 0 dead, 0 errors).
- check.sh passes: syntax, HTTP 200 on index and data, browser suite, clicktest.

## Round 12 (QA fix pass, job-195 fix)
- final-r3.css loaded last: stat tiles white with hairline border and ink numerals; logo glyph enlarged to 36px on accent tile; phone stat pills in a 3-column grid with 16px gaps; phone hero card 358x220; desktop feature cards 48px below hero.
- art-r2.js: hero path dots and lamp glow moved from orange and yellow to the accent #0062CC and its tint #DCE8F5, so the hero uses one accent.
- Click test: 34 controls, 0 dead, 0 errors (clicktest-output.txt).
- check.sh: OK index=200 data=200 browser-tests=passed clicktest=passed.
