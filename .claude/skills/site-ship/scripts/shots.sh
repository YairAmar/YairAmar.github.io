#!/usr/bin/env bash
# Build the site, serve it locally, and take review screenshots.
# Usage: shots.sh [outdir] [css-selector]
#   outdir defaults to /tmp/site-shots. With a selector, also shoots that element.
set -euo pipefail
ROOT="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
OUT="${1:-/tmp/site-shots}"
SEL="${2:-}"
PORT=4329
mkdir -p "$OUT"
cd "$ROOT"

npx astro build >/dev/null
npx astro preview --port "$PORT" >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
until curl -sf "http://localhost:$PORT/" >/dev/null; do sleep 0.5; done

# Playwright resolves from the skill-local cache so the site has no dev dependency.
CACHE="${XDG_CACHE_HOME:-$HOME/.cache}/site-ship-playwright"
if [ ! -d "$CACHE/node_modules/playwright" ]; then
  mkdir -p "$CACHE" && npm i --prefix "$CACHE" --silent playwright >/dev/null
  "$CACHE/node_modules/.bin/playwright" install chromium >/dev/null
fi

NODE_PATH="$CACHE/node_modules" node - "$PORT" "$OUT" "$SEL" <<'EOF'
const { chromium } = require('playwright');
const [port, out, sel] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  const runs = [
    ['desktop-light', { width: 1280, height: 800 }, 'light'],
    ['desktop-dark', { width: 1280, height: 800 }, 'dark'],
    ['mobile-light', { width: 390, height: 844 }, 'light'],
  ];
  for (const [name, viewport, colorScheme] of runs) {
    const page = await browser.newPage({ viewport, colorScheme });
    await page.goto(`http://localhost:${port}/`);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    if (sel) {
      const el = await page.$(sel);
      if (el) await el.screenshot({ path: `${out}/${name}-section.png` });
      else console.error(`selector not found: ${sel}`);
    }
    await page.close();
  }
  await browser.close();
})();
EOF
ls -1 "$OUT"/*.png
