BEERBELGIO.GITHUB.IO — V0.36 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.36 CHANGELOG
- Build hygiene: V0.36 REPLACES the V0.35 staging override block. Staging overrides are not stacked from build to build.
- Hero BeerBelgio anchor: clicking the BeerBelgio block in the hero now scrolls the BeerBelgio links card to the centre of the viewport instead of pinning it near the top.
- Hero claim desktop: reduced the gap logic to a fixed 50 px group spacing, enlarged the overall claim area, and let both halves scale up again inside a single centred group.
- Hero claim mobile: tighter vertical spacing, slightly larger claim boxes, reduced dead space above / below, and kept the two halves as one centred group.
- Hero identity blocks: slight spacing rebalance only; content structure unchanged.
- Quick links desktop: removed the stacked 4+4 columns. The eight icon circles now sit on a single row and FULL LAVA sits as a pill on the right.
- FULL LAVA desktop: one-line label again, 50 px corner radius, and larger type.
- Quick links mobile: preserved the approved 4 + 4 + FULL LAVA layout.
- Featured play: re-centred the triangle by removing the positional nudge so the icon sits optically in the middle of the red play circle again.
- Contact mobile: kept the broken lines stable while slightly widening the text area to avoid awkward wrapping.
- Lava iPhone portrait: added deliberate vertical overscan to the canvas layer (top and bottom) on top of the V0.35 document-layer workaround, to try to finally kill the persistent top/bottom blob clipping in portrait.
- Cache busting updated to ?v=036.

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
