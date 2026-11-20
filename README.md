# mw-jeong.github.io

Personal website of Minwoo Jeong, Ph.D. student in Data Science at KAIST.
Live at **https://mw-jeong.github.io**.

Built with [Astro](https://astro.build). The header scene is rendered with [deck.gl](https://deck.gl) from OpenStreetMap data.

## Development

Requires Node 22.12 or later.

```bash
npm install
npm run dev     # http://localhost:4321
npm run build   # static site in dist/
```

## Content

| What | Where |
| --- | --- |
| Profile, links, bio | `src/data/profile.ts` |
| Education, publications, experience, teaching, awards, news, gallery | `src/data/cv.ts` |
| Header scene | `src/scripts/hero3d.js`, data in `public/data/city.json` |
| Images | `public/` |

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`).

## Credits

Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
