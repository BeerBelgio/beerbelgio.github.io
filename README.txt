BEERBELGIO.GITHUB.IO — V0.49 PUBLIC STAGING

STATUS
Controlled rollback / split-baseline build.
Search indexing remains disabled until the public 1.0 launch.

BASELINES IN THIS BUILD
- MAIN HUB: restored to the known-good V0.42 implementation (index.html, style.css, script.js and claim.svg), with cache-busting only updated to ?v=049 and the staging marker relabelled V0.49.
- LAVA ENGINE: restored to V0.40 (lava.js and /lava/index.html logic), with cache-busting updated to ?v=049.
- SONODGTL: kept from V0.48 and advanced only with the V0.49 changes listed below.
- COPYRIGHT.md / LICENSE.md / THIRD_PARTY_NOTICES.md: retained from the current repository documentation.

WHY THIS ROLLBACK
V0.42 is confirmed by live-device testing as the last HUB build with correct portrait-mobile proportional behaviour. V0.43 is the first build where the portrait regression appears.
Important audit result: root script.js is byte-identical between V0.42 and V0.43. The stage-width / desktop-proportional JavaScript did NOT change at the first regression boundary. The first regression therefore originates in the V0.43 CSS / asset / lava-side changes, not in a new root script.js sizing algorithm.

V0.42 -> V0.48 HUB / LAVA AUDIT
V0.43
- claim.svg viewBox was cropped around the visible artwork instead of preserving the supplied artboard.
- Portrait claim changed from the V0.42 oversized centred SVG to a 100% left-anchored SVG with 5px top/bottom wrapper margins.
- Identity stack portrait gap changed 16px -> 14px.
- Contact layout changed substantially: larger card/headline, smile became absolute-positioned and WRITE ME layout changed from grid to flex with reserved right padding.
- Touch canvas overscan increased from ±12vw / ±12svh to roughly ±18vw / ±18svh, with a separate iOS rule.
- Lava deformation parameters were raised; smoothing reduced; 5-click repel/attract system introduced; hub/FULL-LAVA scroll response changed.
- Root script.js itself did not change from V0.42.

V0.44
- Original claim SVG artboard was restored.
- Added JS touch-portrait / touch-landscape classes and repeated orientation-settling passes.
- Reasserted 80vw touch widths through those classes.
- Contact positioning changed again to bottom/right margin anchoring.
- WRITE ME fallback initially copied only the email address before mailto.
- Lava orientation / visualViewport settling logic expanded; scroll sensitivity and morph rules changed again.

V0.45
- Removed the V0.44 touch-orientation classes and returned to direct CSS orientation rules.
- Re-established 80vw touch portrait/landscape composition.
- Hero meta / identity typography / claim spacing were restored toward earlier values.
- Contact rebuilt around reserved smile columns; final motto alignment changed.
- WRITE ME fallback became the full TO / SUBJECT / MESSAGE copy panel.
- Lava root-cause fix restored lost autonomous phase increments; grab scaling / drag warp / scroll response changed.

V0.46
- Added a hard touch guard to desktop-proportional detection (maxTouchPoints + hover / fine-pointer checks).
- Desktop stage target changed 45vw -> 52vw.
- Touch rules were made more explicit to override accidental desktop-proportional behaviour.
- Hero/mobile typography and claim scales changed again.
- Lava contour coefficients, radial limits and per-blob phase speeds were substantially rewritten; grab scale reduced to ~5% while warp strength increased.

V0.47
- Introduced JavaScript visualViewport ownership of the mobile stage: JS wrote inline width / max-width / margin-left values from the visible viewport and updated them on resize / visualViewport / orientation changes.
- Added touch-experience / touch-portrait / touch-landscape state handling again.
- Claim sizing moved from layout width to transform scaling.
- Desktop target changed to 53.25vw.
- Mobile hero typography changed again.
- Lava autonomous morph speed was raised to the held-drag range; held deformation and phase speed increased ~50%.

V0.48
- Removed the V0.47 visualViewport stage sizing and touch-state classes again.
- Added text-size-adjust:100% to fight Safari text inflation.
- Returned touch stage to CSS-only 80vw / auto margins.
- Desktop stage target changed again, this time to 60vw.
- Claim centring / transform rules changed again.
- Lava phase initialisation / harmonic structure / base travel speed were rewritten again to reduce potato / pear silhouettes.

PRIMARY REGRESSION SUSPECTS
Because V0.42 works and V0.43 is the first failing build while root script.js is identical, the first regression is NOT the later V0.44–V0.48 responsive JavaScript experimentation. The first boundary is limited to V0.43 changes: claim asset/viewBox + claim CSS/overflow geometry, contact absolute-layout changes, coarse-pointer canvas overscan/compositor changes, and V0.43 lava/canvas behaviour. Later builds then added multiple competing responsive ownership systems while trying to repair the original regression.

V0.49 SONODGTL CHANGES
- Browser/tab title shortened to exactly "sonoDGTL" in both EN and IT.
- Top-left sonoDGTL wordmark made dramatically larger: 190px on regular desktop, 96px in touch landscape and 64px in touch portrait.
- Portrait navigation is now two rows: large sonoDGTL lettering first, EN / ITA / HUB controls on a separate second row aligned right.
- All other sonoDGTL content / responsive behaviour remains based on V0.48.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- See COPYRIGHT.md, LICENSE.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Main HUB stays frozen on the V0.42 baseline until the portrait regression is isolated deliberately.
- LAVA stays frozen on the V0.40 baseline until its later improvements are reintroduced one family at a time.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ = standalone lava route.
