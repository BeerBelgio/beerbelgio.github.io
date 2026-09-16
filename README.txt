BEERBELGIO.GITHUB.IO — V0.47 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.47 CHANGELOG
- Hub mobile responsiveness: touch layout no longer trusts CSS vw alone. JS now measures visualViewport.width, sets the stage to exactly 80% of the actually visible viewport in pixels, and centres it using visualViewport.offsetLeft. It refreshes on resize, visualViewport changes and multiple orientation-change passes.
- Hub mobile guard: touch devices explicitly remove desktop proportional scaling and receive touch-portrait / touch-landscape classes, preventing legacy desktop media rules from shrinking or offsetting cards after rotation.
- Hub claim: oversized artwork now stays at 100% layout width and is enlarged only with CSS transform scaling. This prevents the claim itself from altering mobile layout width. Portrait = 1.25x, landscape = 1.125x, desktop = 1.20x, all centred without changing the SVG geometry.
- Hub hero mobile typography: BeerBelgio / sonoDGTL identity typography restored to a substantially larger hierarchy in portrait and landscape; landscape identity blocks now share equal height/alignment.
- Hub contact portrait: CTA headline increased again while retaining the 2/3 text + 1/3 smile structure.
- Hub desktop proportion: stage set to 53.25vw, corresponding closely to a 15% reduction of the previous lava side margins.
- Lava autonomous morph: autonomous phase speeds raised to the same order of magnitude as the previously successful held-drag morph, so shapes keep changing visibly without user input.
- Lava held morph: grabbing a bubble now uses the current autonomous deformation as the baseline and increases both deformation and morph speed by ~50%; grab size remains +5%.
- sonoDGTL ITA hero copy: restored to one continuous sentence rather than two didactic first-person statements.
- sonoDGTL contact HUB button: HUB + BeerBelgio mark is centred as one group; BeerBelgio mark enlarged again while remaining vertically aligned to the text.
- Cache busting updated to ?v=047.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- See COPYRIGHT.md, LICENSE.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override layer. Replace the previous staging layer rather than stacking a new version.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ = standalone lava route.
