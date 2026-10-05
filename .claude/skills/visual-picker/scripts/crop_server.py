#!/usr/bin/env python3
"""Serve a drag-and-zoom crop page for one image; Save writes the crop into the project.

Usage: crop_server.py --src IMG --out PATH [--size 480] [--shape circle|square] [--port 4330]
"""
import argparse
import http.server
import json
import os
import subprocess
import tempfile

PAGE = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pick a crop</title>
<style>
  body { margin: 0; font: 15px/1.5 -apple-system, sans-serif; background: #16181b; color: #e8e6e1; display: flex; gap: 32px; padding: 24px; flex-wrap: wrap; }
  #stage { position: relative; user-select: none; touch-action: none; overflow: hidden; }
  #stage img { display: block; max-height: calc(100vh - 48px); max-width: 60vw; }
  #box { position: absolute; border-radius: __RADIUS__; box-shadow: 0 0 0 9999px rgba(0,0,0,.55); outline: 2px solid #fff; cursor: move; }
  .side { display: flex; flex-direction: column; gap: 16px; min-width: 240px; }
  canvas { width: 176px; height: 176px; border-radius: __RADIUS__; background: #222; }
  input[type=range] { width: 240px; }
  button { font: inherit; padding: 10px 18px; border-radius: 8px; border: 0; background: #8fb8e0; color: #111; font-weight: 600; cursor: pointer; }
  #msg { color: #9ea3a9; min-height: 1.5em; }
</style></head><body>
<div id="stage"><img id="src" src="/preview.jpg" alt="Source image"><div id="box"></div></div>
<div class="side">
  <h2 style="margin:0">Pick the crop</h2>
  <p style="margin:0;color:#9ea3a9">Drag the frame to move it. Use the slider or the scroll wheel to zoom.</p>
  <label>Size<br><input id="size" type="range" min="40" max="100" value="40"></label>
  <p style="margin:0">Preview</p>
  <canvas id="prev" width="352" height="352"></canvas>
  <button id="save">Save crop</button>
  <div id="msg"></div>
</div>
<script>
const FULL = __FULL__; // full-resolution source size
const img = document.getElementById('src'), box = document.getElementById('box'), sizeIn = document.getElementById('size');
const prev = document.getElementById('prev'), ctx = prev.getContext('2d'), msg = document.getElementById('msg');
let crop = null; // in preview pixels
const k = () => img.clientWidth / img.naturalWidth;
function init() {
  const m = Math.min(img.naturalWidth, img.naturalHeight);
  sizeIn.min = Math.round(m * 0.05); sizeIn.max = m;
  crop = { s: Math.round(m * 0.4), x: 0, y: 0 };
  crop.x = (img.naturalWidth - crop.s) / 2; crop.y = (img.naturalHeight - crop.s) / 3;
  draw();
}
function draw() {
  if (!crop) return;
  const m = Math.min(img.naturalWidth, img.naturalHeight);
  crop.s = Math.min(crop.s, m);
  crop.x = Math.max(0, Math.min(crop.x, img.naturalWidth - crop.s));
  crop.y = Math.max(0, Math.min(crop.y, img.naturalHeight - crop.s));
  const z = k();
  Object.assign(box.style, { left: crop.x * z + 'px', top: crop.y * z + 'px', width: crop.s * z + 'px', height: crop.s * z + 'px' });
  sizeIn.value = crop.s;
  ctx.clearRect(0, 0, 352, 352); ctx.drawImage(img, crop.x, crop.y, crop.s, crop.s, 0, 0, 352, 352);
}
function resize(ns) { const cx = crop.x + crop.s / 2, cy = crop.y + crop.s / 2; crop.s = ns; crop.x = cx - ns / 2; crop.y = cy - ns / 2; draw(); }
img.onload = init; if (img.complete && img.naturalWidth) init(); addEventListener('resize', draw);
sizeIn.oninput = () => resize(+sizeIn.value);
box.addEventListener('wheel', (e) => { e.preventDefault(); resize(crop.s * (e.deltaY > 0 ? 1.05 : 0.95)); }, { passive: false });
let drag = null;
box.onpointerdown = (e) => { drag = { x: e.clientX, y: e.clientY, cx: crop.x, cy: crop.y }; box.setPointerCapture(e.pointerId); };
box.onpointermove = (e) => { if (!drag) return; const z = k(); crop.x = drag.cx + (e.clientX - drag.x) / z; crop.y = drag.cy + (e.clientY - drag.y) / z; draw(); };
box.onpointerup = () => { drag = null; };
document.getElementById('save').onclick = async () => {
  msg.textContent = 'Saving...';
  const f = FULL.w / img.naturalWidth; // map preview pixels to source pixels
  const body = { x: Math.round(crop.x * f), y: Math.round(crop.y * f), s: Math.round(crop.s * f) };
  const r = await fetch('/save', { method: 'POST', body: JSON.stringify(body) });
  msg.textContent = r.ok ? 'Saved. You can close this tab and tell Claude.' : 'Save failed: ' + await r.text();
};
</script></body></html>
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--size', type=int, default=480)
    ap.add_argument('--shape', choices=['circle', 'square'], default='circle')
    ap.add_argument('--port', type=int, default=4330)
    a = ap.parse_args()

    src = os.path.abspath(os.path.expanduser(a.src))
    out = os.path.abspath(os.path.expanduser(a.out))
    work = tempfile.mkdtemp(prefix='visual-picker-')
    # Normalize orientation once, then keep a full-size PNG and a light preview.
    full = os.path.join(work, 'full.png')
    subprocess.run(['magick', src, '-auto-orient', full], check=True)
    w, h = (int(v) for v in subprocess.run(['magick', 'identify', '-format', '%w %h', full],
                                           check=True, capture_output=True, text=True).stdout.split())
    subprocess.run(['magick', full, '-resize', '1600x1600>', '-quality', '88', os.path.join(work, 'preview.jpg')], check=True)
    page = (PAGE.replace('__FULL__', json.dumps({'w': w, 'h': h}))
                .replace('__RADIUS__', '50%' if a.shape == 'circle' else '6px'))

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kw):
            super().__init__(*args, directory=work, **kw)

        def log_message(self, *args):
            pass

        def do_GET(self):
            if self.path in ('/', '/index.html'):
                data = page.encode()
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(len(data)))
                self.end_headers()
                self.wfile.write(data)
            else:
                super().do_GET()

        def do_POST(self):
            c = json.loads(self.rfile.read(int(self.headers['Content-Length'])))
            x, y, s = int(c['x']), int(c['y']), int(c['s'])
            os.makedirs(os.path.dirname(out), exist_ok=True)
            r = subprocess.run(['magick', full, '-crop', f'{s}x{s}+{x}+{y}', '+repage',
                                '-resize', f'{a.size}x{a.size}', '-strip', '-quality', '86', out],
                               capture_output=True, text=True)
            with open(out + '.crop.json', 'w') as f:
                json.dump({'src': src, 'x': x, 'y': y, 's': s}, f)
            self.send_response(200 if r.returncode == 0 else 500)
            self.end_headers()
            self.wfile.write((r.stderr or 'ok').encode())
            print(f'saved {out} from box x={x} y={y} s={s}', flush=True)

    print(f'crop page: http://127.0.0.1:{a.port}/  (source {w}x{h}, output {out})', flush=True)
    http.server.ThreadingHTTPServer(('127.0.0.1', a.port), Handler).serve_forever()


if __name__ == '__main__':
    main()
