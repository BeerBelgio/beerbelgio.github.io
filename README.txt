BEERBELGIO.GITHUB.IO — V0.38 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.38 CHANGELOG
- Build hygiene: V0.38 REPLACES the V0.37 staging override block. Staging overrides are not stacked from build to build.
- Hero claim temporary HTML test: gap reduced to 5 px, both halves treated as one centred group, and the complete group enlarged proportionally by ~15%. This is the last HTML-text pass before evaluating Matteo's vector claim.
- Hero claim orientation robustness: delayed refits plus ResizeObserver prevent portrait → landscape → portrait from keeping stale type sizes from the previous orientation.
- Hero mobile: reduced dead space above and below the claim again.
- Hero metadata: MATTEO BELGIOVINE / TORINO, ITALY enlarged and given consistent inset margins.
- Hero identity copy: added consistent horizontal inset from card edges and tightened the vertical rhythm.
- Narrow desktop windows: desktop-proportional mode now explicitly reapplies the internal 760 px desktop design rules, so shrinking a desktop browser window does not fall back to mobile/base proportions.
- Desktop quick links: kept the slightly oval direction, enlarged platform icons by ~15%, restored even distribution, and reduced FULL LAVA type.
- Touch landscape quick links: restored a compact 4 + 4 block on the left with FULL LAVA spanning both rows on the right.
- Touch landscape sonoDGTL card: removed mobile forced line breaks and restored the desktop separator.
- Contact smile: moved left in portrait; landscape smile moved substantially left and enlarged by ~25%.
- Lava interaction: scrolling is now directional in both axes. Trackpads use WheelEvent deltaX/deltaY; touch gestures derive X/Y scroll direction from finger motion; traditional mouse wheels naturally remain vertical.
- iPhone portrait canvas workaround retained from V0.37.
- Android scroll-flicker fix from V0.37 retained pending re-test on the affected devices.
- Cache busting updated to ?v=038.

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
