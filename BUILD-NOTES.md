# Souvla build notes (job-195)

Project folder: projects/job-195 (replaces projects/job-157 and the earlier draft link).
Live build (current): https://sites.willysilly.com/s/lszpu5cvgx646628/

## What it is
A static Cypriot Greek portal: a 10-question diagnostic that assigns a level, lessons (flashcards, dialogue, Word Match), XP, streak and skewers. Data lives in data.json and localStorage.

## Files
- index.html: page shell, loads styles.css, palette.css, palette-r5.css and the JS modules.
- app.js, ui.js, store.js, lessons.js, art.js: app logic, components, state, lesson engine, inline SVG art and mascots.
- data.json: questions, flashcards, dialogues, word pairs.
- styles.css, palette.css, palette-r5.css: layout, palette (one accent #0062CC) and the round-5 fixes.
- check.sh: pipeline. Syntax checks, HTTP 200 on index.html and data.json, browser flow tests, state and axe checks, and the per-control click test. Any failing step exits non-zero.
- qa/: Playwright tests (test.js, states.js, clicktest.js). clicktest.js waits for its own server.
- clicktest-output.txt: one block per control (both 390px and 1440px) with the BEFORE and AFTER state and whether it changed.
- .shots/: screenshots.

## How to check
`bash check.sh` from the project folder. Last run: all steps passed, including clicktest (20 controls, 0 with no visible change, 0 errors).

## Fixes in this round
- Check pipeline: set -euo pipefail, and every step fails the script. The click test waits for the server and uses 127.0.0.1 (Node 18 resolved localhost to IPv6).
- Click test: one line per control with name, click or keyboard path, before state, after state and changed yes/no. Covers the Skip link (keyboard focus plus Enter), Start diagnosis, Browse lessons, day markers, every lesson card and back buttons.
- Accessibility: Skip link has an aria-label. axe WCAG 2 A/AA clean on home and quiz at 390px and 1440px.
- Design: equal three-column stats grid with 16px gutters on phone; headline capped and balanced; desktop hero columns balanced; logo mark enlarged; lessons section header with 48px rhythm; one accent family (#0062CC) in chrome, art and mascots.
- Uploaded picture (uploads/H4v7rLO9oqgJ.png, sad face and skewer mark): reviewed and not used. A sad face conflicts with the bright game-feel brief, and the skewer mark is already drawn as the logo.

## Design decision: hero artwork
The desktop hero keeps the beach and skewer scene. Its fruit and sun are toned to the single accent and neutrals (round 5), so it is the accepted artwork.

## Live link
See the publish result in QA-HANDOFF.md (set after publish).
## Measured (desktop 1440x900)
- Lessons section starts at y=1148, below the 900px fold; 48px gap above it; subline present (`.section-sub`).
- Phone headline: two lines, "Pull up a chair. / Let’s talk Cypriot." at 390px.
- Screenshots of the lesson hub, flashcard, dialogue and Word Match: .shots/final-*.png (desktop and phone).
- Design score is for QA to assign against the 8/10 bar; this build has not been scored by its builder.
