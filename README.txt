BEERBELGIO.GITHUB.IO — V0.39 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.39 CHANGELOG
- Build hygiene: V0.39 REPLACES the V0.38 staging override block. Staging overrides are not stacked from build to build.
- Hero claim: replaced the responsive HTML/text-fitting system with Matteo's supplied vector artwork (`assets/claim.svg`). The claim is now one SVG object, centred and proportionally scaled on desktop/mobile/rotation with no font-metric JS.
- Hero landing: refresh / page load now always returns to the top Hero. Clicking the Hero BeerBelgio block still centres the BeerBelgio links card, but no URL hash is left behind to be restored on refresh.
- Hero mobile: larger name/location text, larger coherent card margins, more bottom breathing, and a single SVG claim that no longer changes construction after orientation changes.
- Hero landscape mobile: reduced empty vertical space while preserving side-by-side BeerBelgio / sonoDGTL identity blocks.
- Lower BeerBelgio / sonoDGTL cards: typography enlarged substantially to echo the hierarchy of the Hero identity blocks.
- Desktop proportional layout: narrow desktop windows explicitly retain the full 760 px desktop composition (two identity columns, desktop typography, cards and quick links) and scale the whole shell as one unit.
- Quick links desktop: restored true 58x58 circles, icons enlarged, equidistant distribution retained, and extra breathing added between Hero / Quick Links / Featured.
- Quick links mobile portrait: keeps the approved 4 + 4 + FULL LAVA layout.
- Quick links mobile landscape: changed to one compact row, scaled to fit the available width.
- Mobile page end: restored desktop-like bottom spacing instead of leaving excessive scroll after the final motto.
- Lava direct manipulation: mouse/pen can click-drag a visible blob from the background. Touch drag is enabled in FULL LAVA and /lava/ so normal page scrolling remains usable.
- Lava deformation: deformation direction now interpolates instead of snapping to a new force angle, specifically to prevent occasional sudden blob rotations.
- Lava touch warping: scroll/touch impulses now feed the deformation system as well as position, so mobile scrolling produces liquid warping closer to the desktop wheel/trackpad behaviour.
- Lava iOS portrait: retired the scroll-follow document-canvas transform; portrait now uses a fixed vertically overscanned canvas, avoiding the extra document scroll range caused by translating an absolute canvas with scrollY.
- Cache busting updated to ?v=039.

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
