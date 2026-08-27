# Web Performance Lab

A reproducible Next.js product page for learning web performance through before-and-after experiments. The baseline is intentionally slow; the improvement branch keeps each change in a separate commit so readers can inspect or repeat the work.

## Branches

- `main` contains the baseline and intentionally failing performance tests.
- `codex/performance-improvements` contains the completed experiments and their evidence.

The improvement branch is kept separate from `main` so the pull request remains a readable comparison rather than replacing the exercise.

## Quick Start

```bash
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the baseline.

## Performance Tests

The tests describe the finish line for each experiment. They are expected to fail on `main` and pass on `codex/performance-improvements`.

```bash
corepack pnpm exec playwright install chromium
corepack pnpm test
corepack pnpm test:image
```

`corepack pnpm test` builds and serves the production application before running the Playwright suite. The focused scripts in `package.json` run one experiment at a time.

## Baseline

The page intentionally includes the following problems:

- Product data appears only after client-side JavaScript runs.
- Product, review, and recommendation API requests run sequentially.
- Most of the page lives inside one broad Client Component.
- A roughly 13 MB PNG product image loads through a plain `<img>` element.
- An offscreen 4.5 MB video downloads and plays immediately.
- An external Google Fonts stylesheet declares seven Korean font weights through CSS `@import`.
- Images and asynchronous content do not reserve enough final layout space.

The goal is not simply to raise a Lighthouse score. Each change should explain its effect on the Critical Rendering Path, user experience, transfer size, and execution cost.

## Experiments

| Order | Experiment | Change | Evidence |
| --- | --- | --- | --- |
| 1 | Image optimization | Deliver responsive images with priorities based on their position | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/01-image-optimization.md) |
| 2 | Video loading | Defer the offscreen autoplay video while reserving its layout | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/02-video-loading.md) |
| 3 | Font loading | Replace the external CSS import with `next/font` | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/03-font-loading.md) |
| 4 | Server rendering | Include primary product content in the initial HTML | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/04-server-rendering.md) |
| 5 | Parallel data | Start independent server reads together | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/05-parallel-data.md) |
| 6 | Streaming SSR | Stream delayed sections through independent `Suspense` boundaries | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/06-streaming-ssr.md) |
| 7 | Layout stability | Verify the combined effect on CLS in a production build | [Notes](https://github.com/seojuny95/web-performance-lab/blob/codex/performance-improvements/docs/experiments/07-layout-stability.md) |

## Evidence and Scope

The `artifacts` directory contains the DevTools screenshots used in the experiment notes. Files ending in `-dev` are development-server captures used to explain request shape, not production benchmarks.

The automated checks cover image delivery, video request timing, font discovery, server-rendered content, parallel data timing, and streaming order. Lighthouse results, real-user data, bundle analysis, visual quality, and deployed cache behavior require separate measurement and are not claimed by this lab.

## Verify

```bash
corepack pnpm lint
corepack pnpm test
```
