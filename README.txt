BEERBELGIO.GITHUB.IO — V0.33 PUBLIC STAGING

STAGING
- Public GitHub Pages staging remains active.
- noindex / nofollow / noarchive remains enabled.
- English remains the primary language.
- sonoDGTL base route: /sonodgtl/ (ENG)
- Italian alternate: /sonodgtl/it/
- .nojekyll remains enabled for direct static hosting.
- Cache-busting advanced to ?v=033 for main CSS/JS/local visual assets.
- Build rule: each new staging build REPLACES the previous authoritative version override block instead of stacking a new override layer on top.

RIGHTS / LICENSING
- Licensing changed from All Rights Reserved to attribution-friendly reuse, as requested.
- Original website code: MIT License.
- Original creative material: CC BY 4.0.
- Reuse is allowed, including adaptation/commercial reuse, with the attribution/licence conditions stated in LICENSE.md.
- Preferred attribution: Matteo Belgiovine / BeerBelgio — https://beerbelgio.github.io/
- Third-party font/platform names/logos remain excluded and are documented in THIRD_PARTY_NOTICES.md.

MOBILE STAGE
- Portrait stage widened from 75vw to 80vw: slightly more card width while still leaving visible lava on both sides.
- Landscape touch stage uses 84vw.

HERO CLAIM
- V0.32 equal-height relationship remains the basis.
- Desktop claim expands symmetrically outside the normal content width, keeping the whole claim centred in the card.
- Desktop centre gap increased to 72px and the fitting area is slightly larger so both halves can grow toward the outer edges.
- Mobile is explicitly locked to one two-column row; FUN and IS A / SERIOUS / THING. cannot collapse into stacked rows.
- JS phone detection now matches CSS: coarse-pointer phones remain in the mobile fitting logic even in landscape.
- The obsolete live-FUN canvas-copy loop is disabled because FUN is now a solid colour again.

HERO IDENTITIES
- Portrait descriptor text is reduced to 11.4px and each explicit descriptor line is kept intact, preventing an orphaned FOR in sonoDGTL.
- Spacing between title / descriptor / categories remains deliberately generous.
- Landscape mobile keeps BeerBelgio / sonoDGTL side-by-side.

QUICK LINKS
- Mobile remains the approved 4 + 4 icon layout followed by FULL LAVA alone.
- Desktop changes to 4 + 4 larger 68px circles.
- Desktop FULL LAVA stays at the right and spans the visual height of both icon rows; FULL / LAVA are split over two lines.
- Mobile FULL LAVA remains one horizontal line.
- Email icon was rebuilt as a filled 24×24 mark so the same 40% CSS scaling now produces an optical size comparable to the other platform icons.

FEATURED
- Mobile play circle reduced to 54px with a 24px play mark.
- Mobile Spotify / YouTube labels set to 15px.
- CTA arrows move slightly closer to their labels everywhere: 8px desktop / 7px mobile.

SONODGTL CARD
- Main title wraps naturally.
- On mobile only, the CTA is deliberately split into:
  OPEN THE WEBSITE
  LET’S WORK TOGETHER!
- Desktop keeps the single-line version with the em dash.

LAVA / IPHONE
- Landscape safe-area fix from V0.32 is retained.
- Portrait touch mode now gives the canvas a hidden vertical runway above and below the visible viewport while keeping blob coordinates aligned with the page.
- This specifically targets the remaining portrait-only top/bottom crop without reintroducing the horizontal crop that V0.32 fixed.
- BASIC MODE and FULL LAVA still use the same lava field and edge behaviour.

DEFERRED
- Final floating motto scroll-growth / centre-screen transformation remains intentionally NOT implemented yet.
