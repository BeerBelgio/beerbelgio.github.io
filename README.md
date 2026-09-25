# Matteo Belgiovine — Digital Hub

**beerbelgio.github.io** is the personal digital hub of Matteo Belgiovine: musician and creator behind **BeerBelgio**, and digital / marketing consultant behind **sonoDGTL**.

It is intentionally **not a traditional portfolio**. It is a small, independent place that introduces who I am, connects the two sides of my work, points to the channels where the actual work lives, and leaves some room to play.

> **Fun is a serious thing.**

## Why this exists

The project started as a replacement for a conventional link-in-bio page. Instead of relying on a third-party service, I wanted a space I could own, shape and keep deliberately small.

That simple HUB gradually became a playground for interaction design: responsive layouts, custom SVG graphics, small interface experiments and the **LAVA** background — a canvas-based field of autonomous, draggable blobs that reacts to pointer movement, scrolling and direct interaction.

The result is still a HUB first. The playful layer is there because the site should feel like mine, not because it needs to behave like a showcase.

## What is inside

- **HUB** — bilingual EN / IT introduction, BeerBelgio / sonoDGTL gateways, quick links and contact.
- **BeerBelgio** — music and creative identity.
- **sonoDGTL** — dedicated EN / IT professional page.
- **FULL LAVA** — distraction mode: move, scroll, grab, throw and disturb the field.
- **Privacy / site info** — concise information about hosting, external services and data handling.

The site is built with **vanilla HTML, CSS and JavaScript** and hosted on **GitHub Pages**, with no framework or build system. Fonts and interface assets are served locally; external media is loaded only when needed.

This repository contains the personal HUB only. Other BeerBelgio experiments and tool projects are kept separate.

## Project principles

- Small, fast and self-contained.
- Desktop, portrait mobile and landscape mobile each keep a deliberate geometry.
- Interaction should feel physical but remain optional.
- No first-party analytics, advertising pixels or profiling code.
- The LAVA field is playful background behaviour, not a dependency for using the site.
- Code, creative material and third-party assets follow the terms described in the repository licensing files.

## Repository map

- `/index.html` — main HUB (EN).
- `/it/` — Italian HUB.
- `/sonodgtl/` — sonoDGTL EN / IT pages.
- `/lava/` — standalone FULL LAVA entry.
- `/assets/` — local artwork, icons, fonts and social-preview assets.
- `lava.js` — custom canvas / LAVA engine.
- `version.json` — public build marker used to keep browser sessions on one coherent asset generation.
- `LICENSE.md`, `COPYRIGHT.md`, `THIRD_PARTY_NOTICES.md` — licensing, ownership and attribution.

## Changelog

- **V1.1.0 — 25 September 2026** — bilingual EN / IT HUB with persistent language preference, in-place HUB language switching, localized sonoDGTL email fallback and the Android narrow-portrait Hero containment fix.
- **V1.0 — 18 September 2026** — first stable public release: complete HUB, desktop / portrait / landscape layouts, reactive midpoint-sticky final claim, sonoDGTL EN / IT pages, privacy information, social metadata and final LAVA behaviour.
- **V0.55.x** — release stabilization: proportional desktop resize, final-claim play-tail, privacy UI, social preview, cache coherence and final LAVA tuning.
- **V0.54** — LAVA interaction baseline: drag / throw momentum, selected-blob warping and 5+5 blank-space interaction.
- **V0.42** — responsive HUB baseline.
- **V0.1** — first functional HUB prototype.

## Licence

The repository uses a mixed licensing structure. Original website code, original creative material and third-party assets are covered by the terms described in [`LICENSE.md`](LICENSE.md), [`COPYRIGHT.md`](COPYRIGHT.md) and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

Commercial reuse of Matteo Belgiovine / BeerBelgio original material requires a separate agreement where the applicable licence does not already permit it.

---

**Matteo Belgiovine / BeerBelgio**  
Turin, Italy  
https://beerbelgio.github.io/
