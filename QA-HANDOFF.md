# QA handoff: Souvla, Cypriot Greek portal (job-195)

## Run it
- `bash check.sh` from projects/job-195. Exits 0 only if every step passes: syntax, HTTP 200 for index.html and data.json, browser flows, state checks, axe, and the per-control click test.
- Click test output: clicktest-output.txt (34 controls across desktop and phone runs, one block each, with before and after state).
- Screenshots: .shots/ (390px and 1440px).

## Feature checks run on the app (browser, real clicks)
- Diagnostic: Start diagnosis, answer 10 questions, result shows a level (Advanced at 10 correct); XP 170.
- Flashcard: flipped card shows cypriot_pronunciation, standard_greek_comparison and cultural_context; Previous/Next work.
- Word Match: all pairs matched, feedback 'All matched', XP 245 to 310.
- Streak resets to 0 after 2 and 3 idle days.

## Click test (per control, from clicktest-output.txt)
- Skip to content: keyboard focus + Enter, moves focus to main, changed yes.
- Start diagnosis: opens question 1 of 10, changed yes.
- Browse lessons, the day markers and the lesson cards: each changes the view, changed yes.
- Back buttons: return to home, changed yes.
- Result: 0 with no visible change, 0 with errors.

## Accessibility
- Skip link has an aria-label.
- axe WCAG 2 A/AA: clean on home and quiz at 390px and 1440px.

## Uploaded picture
- uploads/H4v7rLO9oqgJ.png reviewed and not used (sad face conflicts with the bright brief; skewer mark is already the logo).

## Manual checks still deferred
- Screen reader announcements, real phone touch targets, slow 4G font load.

## Live link
Set after publish (see the publish result).