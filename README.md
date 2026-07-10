# Ramesh — Portfolio

Personal site & portfolio for my work as a full-stack & AI engineer.

**Live:** [0xrameshh.github.io](https://0xrameshh.github.io)

## Stack
Next.js (App Router, static export) · React · TypeScript · Tailwind CSS v4 · Space Grotesk / Space Mono

## Design
Monochrome, content-first layout. Type: Space Grotesk (display/body) + Space Mono (labels). Dark/light aware; honors `prefers-reduced-motion`.

## Local dev
```bash
npm install
npm run dev
```
All content lives in `src/lib/data.ts`.

## Deploy
Static export (`output: 'export'`) to `./out`, deployed to GitHub Pages on every push to `main` via GitHub Actions.
