BEERBELGIO.GITHUB.IO — V0.40 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.40 CHANGELOG
- Build hygiene: V0.40 REPLACES the V0.39 staging override block. Staging overrides are not stacked from build to build.
- Quick links: removed the Email quick-link asset/code and replaced it with a native Share button. On supported devices it opens the system share sheet; otherwise it copies https://beerbelgio.github.io/ to the clipboard.
- Contact card: WRITE ME is vertically centred in the remaining space between the heading and the lower edge of the card.
- Lava direct manipulation: dragged bubbles retain their release momentum for roughly 2 seconds, then blend back progressively into autonomous motion over the following ~3 seconds.
- Lava interaction isolation: while a bubble is being dragged, global scroll/pointer impulses are suppressed for the other blobs.
- Lava touch warping: stronger touch deformation and per-blob scroll response gains/delays/directional offsets. Blobs now react less uniformly and with more individual timing/shape variation.
- Hero claim: still uses Matteo's supplied SVG. Desktop now explicitly resets the old two-column H1 grid and scales the SVG artwork to compensate for transparent artboard margins; portrait mobile is +25% versus V0.39, landscape uses the desktop-like scale.
- Hero landing: strengthened top-of-page reset on load/pageshow so refresh always returns to the Hero rather than preserving an internal scroll position.
- Hero mobile: name/location increased again, more coherent inner margin, more lower-card breathing.
- Lower BeerBelgio / sonoDGTL cards: descriptors enlarged to better match the Hero hierarchy.
- Quick links landscape: one-row layout retained and buttons increased to 42 px with equal spacing, including the Share button.
- Desktop narrow-window mode: reinforced the complete desktop-proportional rule set so old viewport-width media rules cannot remap individual components while the 760 px composition is being scaled.
- Mobile page end: bottom padding reduced to keep the final claim closer to the desktop ending behaviour.
- Cache busting updated to ?v=040.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine, including commercial terms / compensation where applicable.
- Third-party fonts, logos, names and trademarks retain their own terms. See LICENSE.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block. Replace the previous block rather than stacking another version underneath it.
- Cache-busting query strings must increment with each staging build.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
