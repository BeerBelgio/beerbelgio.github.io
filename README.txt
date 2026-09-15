BEERBELGIO.GITHUB.IO — V0.37 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.37 CHANGELOG
- Build hygiene: V0.37 replaces the V0.36 staging override block; staging overrides are not stacked.
- Android lava scroll: the iPhone portrait document-canvas workaround is now iOS-only. Android stays on the stable fixed canvas and no longer runs the scroll counter-translation path, specifically to remove the heavy Android flicker reported during scrolling.
- Lava visibility: blob containment now follows the visible viewport rather than the oversized backing canvas. Blobs may still travel partially beyond an edge, but interaction / FULL LAVA cannot push the whole population into the invisible overscan area.
- iPhone portrait lava: keeps the vertical overscan experiment, now with blob coordinates explicitly anchored to the visible viewport.
- Desktop resize: phone layout is no longer selected merely because a desktop browser window becomes narrow. Mobile-specific layout is keyed to coarse/touch pointer; fine-pointer desktop windows retain desktop proportions.
- Hero claim: desktop gap reduced from 50 px to 25 px; the overall claim group is wider and both halves receive more fitting room, while remaining centred as a single group.
- Hero claim mobile: group widened, gap reduced, and vertical space above/below cut again.
- Quick links desktop: eight icon buttons are evenly distributed across the available row; FULL LAVA remains at right with slightly smaller type.
- Quick links phone landscape: switches to a desktop-like single-row arrangement (scaled to fit landscape phone width).
- Contact phone landscape: restores the desktop two-line headline instead of the portrait multi-line treatment.
- Featured play: new geometrically centred triangle SVG; same centred scaling is used desktop and mobile.
- Cache busting updated to ?v=037.

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
