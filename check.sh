#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
PORT=${PORT:-8093}
fail() { echo "FAIL: $1"; exit 1; }

for f in *.js qa/tests/*.js qa/*.js; do
  if [ -f "$f" ]; then node --check "$f" || fail "syntax error in $f"; fi
done

python3 -m http.server $PORT >/dev/null 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT

for i in $(seq 1 30); do
  curl -sf "http://127.0.0.1:$PORT/index.html" -o /dev/null && break
  sleep 0.5
done

CODE=$(curl -s -o /tmp/souvla-index.html -w '%{http_code}' "http://127.0.0.1:$PORT/index.html")
DATA=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/data.json")
[ "$CODE" = "200" ] && [ "$DATA" = "200" ] || fail "index=$CODE data=$DATA"
grep -q 'app.js' /tmp/souvla-index.html || fail 'index.html does not load app.js'

if [ ! -d qa/node_modules/playwright ]; then
  (cd qa && (test -f package.json || npm init -y >/dev/null) && npm install --silent playwright@1.47.2)
fi
CHROME="${CHROME:-$(command -v chromium || command -v chromium-browser || command -v google-chrome || true)}"
export CHROME
BASE="http://127.0.0.1:$PORT/index.html"
export BASE

(cd qa && timeout 300 node test.js) || fail 'test.js (flows) failed'
(cd qa && timeout 300 node states.js) || fail 'states.js failed'
(cd qa && timeout 300 node clicktest.js) > clicktest-output.txt 2>&1 || { cat clicktest-output.txt; fail 'clicktest.js failed'; }
cat clicktest-output.txt
echo "OK index=200 data=200 browser-tests=passed clicktest=passed"
