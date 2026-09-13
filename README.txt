BEERBELGIO.GITHUB.IO — V0.35 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.35 CHANGELOG
- Build hygiene: V0.35 REPLACES the V0.34 staging override block. Staging overrides are not stacked from build to build.
- Hero claim: FUN + IS A / SERIOUS / THING. are treated as one centred group. The group itself is centred in the hero instead of pushing each half independently toward the card edges.
- Hero claim mobile: reduced vertical breathing and kept a compact two-column group; both halves remain fitted proportionally by JavaScript.
- Hero landscape mobile: removed inherited minimum-height/dead-space behaviour below the identity copy.
- Hero identity blocks: retained the approved mobile typography and landscape side-by-side behaviour.
- Quick links desktop: circles reduced to 58 px (roughly half the V0.34 visual scale). Eight icons remain mapped to the first 4 cells of the 6x2 conceptual grid.
- FULL LAVA desktop: still occupies the footprint of four conceptual grid cells, but uses a squarer 30 px corner radius, larger two-line type, and larger separation between FULL / LAVA.
- Quick links mobile: unchanged approved 4 + 4 + FULL LAVA arrangement.
- Featured play: replaced the play SVG with a much tighter/larger triangle shape and sizes it proportionally inside the red circle.
- Contact mobile: forced four clean lines: WORKING ON / SOMETHING / WEIRD / AND COOL?.
- Lava iPhone portrait: experimental structural fix. The canvas is no longer a fixed compositor layer in portrait touch mode; it becomes an absolute document-layer canvas and JavaScript counter-translates it with scroll. This is specifically intended to test Safari's persistent top/bottom clipping while preserving the no-flicker behaviour.
- Lava iPhone landscape: keeps the V0.34 fixed-canvas behaviour that already resolved lateral clipping.
- Cache busting updated to ?v=035.

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
