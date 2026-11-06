#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
fail() { echo "FAIL: $1"; exit 1; }

for f in *.js qa/tests/*.js qa/*.js; do
  if [ -f "$f" ]; then node --check "$f" || fail "syntax error in $f"; fi
done

PORT=$(python3 -c 'import socket;s=socket.socket();s.bind(("127.0.0.1",0));print(s.getsockname()[1]);s.close()')
python3 -m http.server "$PORT" --bind 127.0.0.1 >/tmp/souvla-server.log 2>&1 &
PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT

ready=0
for i in $(seq 1 60); do
  if curl -sf "http://127.0.0.1:$PORT/index.html" -o /dev/null; then ready=1; break; fi
  kill -0 $PID 2>/dev/null || break
  sleep 0.5
done
[ "$ready" = "1" ] || { cat /tmp/souvla-server.log; fail "server did not start on port $PORT"; }

CODE=$(curl -s -o /tmp/souvla-index.html -w '%{http_code}' "http://127.0.0.1:$PORT/index.html")
DATA=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/data.json")
[ "$CODE" = "200" ] && [ "$DATA" = "200" ] || fail "index=$CODE data=$DATA"
grep -q 'app.js' /tmp/souvla-index.html || fail 'index.html does not load app.js'

if [ ! -d qa/node_modules/playwright ]; then
  (cd qa && (test -f package.json || npm init -y >/dev/null) && npm install --silent playwright@1.47.2)
fi
CHROME="${CHROME:-$(command -v chromium || command -v chromium-browser || command -v google-chrome || true)}"
export CHROME
export BASE="http://127.0.0.1:$PORT/index.html"

kill -0 $PID 2>/dev/null || { cat /tmp/souvla-server.log; fail 'server stopped before browser tests'; }
(cd qa && timeout 300 node test.js) || fail 'test.js (flows) failed'
kill -0 $PID 2>/dev/null || { cat /tmp/souvla-server.log; fail 'server stopped during test.js'; }
(cd qa && timeout 300 node states.js) || fail 'states.js failed'
kill -0 $PID 2>/dev/null || { cat /tmp/souvla-server.log; fail 'server stopped during states.js'; }
(cd qa && timeout 300 node clicktest.js) > clicktest-output.txt 2>&1 || { cat clicktest-output.txt; fail 'clicktest.js failed'; }
cat clicktest-output.txt
echo "OK index=200 data=200 browser-tests=passed clicktest=passed"
