BEERBELGIO.GITHUB.IO — V0.48 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.48 CHANGELOG
- Responsive architecture audit: compared the hub with markdo27/markdo27.github.io. The reference keeps mobile sizing in normal CSS flow (viewport meta, max/relative widths, auto margins and media queries) instead of writing visualViewport widths/margins from JavaScript.
- Hub touch layout: removed the V0.47 JavaScript visualViewport sizing system completely. No touch-experience / touch-portrait / touch-landscape classes, no inline mobile widths and no visualViewport offset margins are written anymore.
- Hub iPhone typography: explicitly sets -webkit-text-size-adjust / text-size-adjust to 100%, preventing Safari from independently inflating text and breaking the fixed visual proportions.
- Hub mobile stage: portrait and landscape return to a CSS-only 80vw stage centred with auto margins; shell stays in normal document flow at 100% of the stage.
- Hub claim: portrait and landscape preserve the current size but are centred by the wrapper itself, with no left:50%/translate compensation. Desktop claim is reduced by exactly 10% from the V0.47 1.20 scale (now 1.08) and centred the same way.
- Hub desktop: proportional stage target increased to 60vw so the entire 760px composition is visibly larger; desktop detection now depends only on a genuine fine-pointer/hover viewport >= 900px.
- Lava morphology: phase and phase2 now start close together and evolve at similar rates. The base contour uses mostly even harmonics (2/4/6) with only a small asymmetric component, reducing persistent pear/potato silhouettes while preserving liquid motion.
- Lava autonomous movement: base travel speed reduced by about 10% while autonomous morphology remains strong.
- Lava interaction: autonomous deformation is now the baseline; grabbing a blob raises that same liquid behaviour by about 50% while preserving the existing +5% size growth.
- sonoDGTL landscape: hero name/profession and location are explicitly the same 14px size.
- sonoDGTL hero description: desktop copy increased by ~5px; mobile-landscape copy increased from 13px to 18px.
- sonoDGTL skills: TRAINING / FORMAZIONE moved before DIGITALISATION / DIGITALIZZAZIONE.
- sonoDGTL landscape contact CTA: increased by 10px to encourage the intended four-line composition.
- sonoDGTL HUB button: text/logo group keeps true flex centring and the gap is now exactly 4px.
- Cache busting updated to ?v=048.

RESPONSIVE DIAGNOSIS
The V0.47 mobile crop was not an 80vw arithmetic problem. Mobile CSS and JavaScript were both trying to own the same stage: CSS declared an 80vw centred layout while JS rewrote width/max-width/margin-left from visualViewport on resize, scroll and orientation changes. Combined with historical desktop proportional rules and Safari text inflation, this created competing sources of truth. V0.48 removes the mobile JS sizing layer rather than adding another override.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- Third-party fonts, logos, names and trademarks retain their own terms. See LICENSE.md, COPYRIGHT.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block. Replace the previous block rather than stacking another version underneath it.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
