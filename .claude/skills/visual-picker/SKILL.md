---
name: visual-picker
description: Let the user make a visual choice in a local browser page instead of describing options in text. Two modes, crop (drag and zoom a frame over an image, then Save writes the cropped file into the project) and compare (switch between 2 to 6 rendered options with buttons or number keys). Use when the user wants to pick a crop or scope of a photo ("crop my face", "let me select the area"), or decide between design variants, backgrounds, figures, or page versions ("show me both options", "render the two versions so I can decide").
---

# Visual picker

Both modes run a small localhost-only server from this skill's `scripts/` and open the page in the user's default browser with `open`. Run the server in the background (`run_in_background: true`) and stop it when the user is done.

## Crop mode

```bash
python3 .claude/skills/visual-picker/scripts/crop_server.py \
  --src <image> --out <project path to write> \
  [--size 480] [--shape circle|square] [--port 4330]
```

- `--src` takes any format `magick` reads, including HEIC. The page shows a downscaled preview, and the crop is applied to the full-resolution source.
- The user drags the frame, zooms with the slider or the scroll wheel, and clicks **Save**. The server writes `--out` (a JPEG resized to `--size` square) and `<out>.crop.json` with the source-pixel box, so the crop can be redone later.
- Wait for the user to say they saved, then **Read the output image** to check it before wiring it in. Remove the `.crop.json` unless the user wants to keep it.

## Compare mode

Build each option as its own static site or page, serve each on its own port, then serve a switcher page:

```bash
python3 .claude/skills/visual-picker/scripts/compare_server.py \
  --option "Option 1: sunrise ridge=http://127.0.0.1:4341/" \
  --option "Option 2: prayer flags=http://127.0.0.1:4342/" \
  [--port 4340]
```

- Each option opens in a full-size iframe, and the user switches with the buttons or the keys 1 to 6.
- For an Astro site, copy the repo to the scratchpad (exclude `node_modules`, `dist`, `.git`, and symlink `node_modules`), apply the variant, `npx astro build`, and serve `dist/` with `python3 -m http.server <port> --bind 127.0.0.1 -d dist`. Separate ports matter because the pages use root-absolute paths.
- Take your own screenshots of each option too, and give a short recommendation with the tradeoff (for example readability versus character).
- After the user picks, ship only the chosen option, then stop all servers and delete the variant copies.

## Rules

- Bind to 127.0.0.1 only. Never expose these servers beyond localhost.
- A "failed" background-task notice after you stop a server is expected. Don't report it as an error.
