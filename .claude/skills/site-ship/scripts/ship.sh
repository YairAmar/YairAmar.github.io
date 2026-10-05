#!/usr/bin/env bash
# Commit everything, push to main, wait for the Pages deploy, and check the live page.
# Usage: ship.sh "<commit message>" ["<text expected on the live page>"]
set -euo pipefail
MSG="${1:?commit message required}"
EXPECT="${2:-}"
ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
cd "$ROOT"

npx astro build >/dev/null
git add -A
if git diff --cached --quiet; then
  echo "nothing to commit"
else
  git commit -q -m "$MSG

Co-Authored-By: Claude <noreply@anthropic.com>"
fi
git push -q origin main
SHA="$(git rev-parse HEAD)"

# Wait for the workflow run of this commit to appear, then for it to finish.
for _ in $(seq 1 30); do
  RUN="$(gh run list --commit "$SHA" --json databaseId -q '.[0].databaseId' 2>/dev/null || true)"
  [ -n "$RUN" ] && break
  sleep 2
done
[ -n "${RUN:-}" ] || { echo "no workflow run found for $SHA"; exit 1; }
gh run watch "$RUN" --exit-status >/dev/null 2>&1 || true
CONCLUSION="$(gh run view "$RUN" --json conclusion -q .conclusion)"
echo "deploy: $CONCLUSION ($(gh run view "$RUN" --json url -q .url))"
[ "$CONCLUSION" = "success" ] || exit 1

if [ -n "$EXPECT" ]; then
  for _ in $(seq 1 24); do
    if curl -s "https://yairamar.github.io/?nocache=$(date +%s)" | grep -qF -- "$EXPECT"; then
      echo "live check: found \"$EXPECT\""
      exit 0
    fi
    sleep 5
  done
  echo "live check: \"$EXPECT\" not found after 2 min"
  exit 1
fi
