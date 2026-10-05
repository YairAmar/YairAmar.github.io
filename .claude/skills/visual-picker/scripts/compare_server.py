#!/usr/bin/env python3
"""Serve a switcher page that shows 2 to 6 options in full-size iframes.

Usage: compare_server.py --option "Label=URL" --option "Label=URL" [--port 4340]
"""
import argparse
import html
import http.server

PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Compare options</title>
<style>
  html, body { margin: 0; height: 100%; font: 14px -apple-system, sans-serif; background: #16181b; color: #e8e6e1; }
  header { display: flex; align-items: center; gap: 12px; padding: 10px 16px; flex-wrap: wrap; }
  button { font: inherit; padding: 8px 16px; border-radius: 8px; border: 1px solid #444; background: #23262a; color: inherit; cursor: pointer; }
  button.on { background: #8fb8e0; color: #111; border-color: #8fb8e0; font-weight: 600; }
  .hint { color: #9ea3a9; margin-left: auto; }
  iframe { display: none; width: 100%; height: calc(100% - 56px); border: 0; }
  iframe.on { display: block; }
</style></head><body>
<header>__BUTTONS__<span class="hint">Press 1 to __N__ to switch. Scroll inside the page.</span></header>
__FRAMES__
<script>
const bs = [...document.querySelectorAll('button')], fs = [...document.querySelectorAll('iframe')];
const pick = (i) => { bs.forEach((b, j) => b.classList.toggle('on', i === j)); fs.forEach((f, j) => f.classList.toggle('on', i === j)); };
bs.forEach((b, i) => b.onclick = () => pick(i));
addEventListener('keydown', (e) => { const i = +e.key - 1; if (i >= 0 && i < bs.length) pick(i); });
pick(0);
</script></body></html>
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--option', action='append', required=True, help='"Label=URL"')
    ap.add_argument('--port', type=int, default=4340)
    a = ap.parse_args()
    opts = [o.rsplit('=', 1) for o in a.option]
    if not 2 <= len(opts) <= 6 or any(len(o) != 2 for o in opts):
        ap.error('give 2 to 6 options as "Label=URL"')

    buttons = ''.join(f'<button>{html.escape(label)}</button>' for label, _ in opts)
    frames = ''.join(f'<iframe src="{html.escape(url)}" title="{html.escape(label)}"></iframe>' for label, url in opts)
    page = PAGE.replace('__BUTTONS__', buttons).replace('__FRAMES__', frames).replace('__N__', str(len(opts))).encode()

    class Handler(http.server.BaseHTTPRequestHandler):
        def log_message(self, *args):
            pass

        def do_GET(self):
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(page)))
            self.end_headers()
            self.wfile.write(page)

    print(f'compare page: http://127.0.0.1:{a.port}/', flush=True)
    http.server.ThreadingHTTPServer(('127.0.0.1', a.port), Handler).serve_forever()


if __name__ == '__main__':
    main()
