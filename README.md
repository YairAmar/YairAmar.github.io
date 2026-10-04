# yairamar.github.io

Personal research page, built with [Astro](https://astro.build) and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

All content lives in `src/data/site.ts`. To add a headshot, save a square image as `public/headshot.jpg` and set `headshot: '/headshot.jpg'` in that file.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs dist/
```
