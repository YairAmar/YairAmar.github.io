---
name: site-ship
description: Edit, visually check, deploy, and verify Yair's personal site (yairamar.github.io). Use for any change to the page content, layout, styles, images, or links in this repo, such as "update my bio", "add a paper", "change the background", "fix the news", or "push it live".
---

# Ship a change to yairamar.github.io

Astro site, deployed by `.github/workflows/deploy.yml` on every push to `main`. One page: `src/pages/index.astro`.

## Where things live

- `src/data/site.ts`: all content. Profile, bio (HTML strings), contact links, interests, news, publications, experience, education, and the `people` map (names that are auto-linked everywhere).
- `src/styles/global.css`: theme tokens on `:root`, with dark mode under `prefers-color-scheme` and `[data-theme='dark']`. A color change goes in all three blocks.
- `public/`: `headshot.jpg`, `hike-1080.webp` and `hike-1600.webp` (the panning backdrop, served via `srcset`), and `logos/`.
- Icons are inline SVG paths in `index.astro`: `icons` for contact links and `pubIcons` for publication links, both keyed by label.

## Loop

1. Make the edit. Content changes almost always go in `site.ts` only.
2. Run `.claude/skills/site-ship/scripts/shots.sh`. It builds, serves the build locally, and writes full-page screenshots to `/tmp/site-shots/` (desktop light, desktop dark, mobile). **Read the screenshots** before shipping, and look for wrapped dates, overflow, contrast, and broken images. For a close-up of one section, use `shots.sh <outdir> '#section-id'`.
3. Run `.claude/skills/site-ship/scripts/ship.sh "<commit message>" "<text that must appear on the live page>"`. It commits all changes, pushes, waits for the Actions run, then polls the live page until the text appears (up to 2 min).
4. Report what changed, quoting new prose verbatim, and confirm the live check passed.

## Rules

- Prose follows the user's unslop style: no em or en dashes, plain words, straight quotes.
- Don't invent facts (dates, titles, venues, author order). Ask, or check the user's own sources: LinkedIn and Google Scholar through Chrome, arXiv, and local paper and poster sources. Flag mismatches between sources instead of picking one silently.
- When the user sends a photo for the page, ask for the full-resolution original (HEIC is fine) before tuning around a low-res copy. Convert it with `magick` to WebP at the sizes the page needs.
- For visual choices (crop, A/B between options), use the `visual-picker` skill rather than describing options in text.
- Don't narrate shell noise. `pkill` exits 1 when nothing matched. `grep -c` counts lines, and the built HTML is one line, so use `grep -o ... | wc -l`.
