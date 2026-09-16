BEERBELGIO.GITHUB.IO — V0.54.1 / L1 PUBLIC STAGING

STATUS
V0.54 is the frozen UI/responsive baseline. V0.54.1 is the first isolated LAVA-only test.
All HUB layout/responsive behaviour and all sonoDGTL UI remain V0.54.

V0.54.1 / L1 — LAVA ONLY
- Reduced scroll sensitivity for wheel and touch.
  - Normal HUB wheel response: mode scale 0.48, input multiplier 0.20, per-event cap 28, accumulated cap 34.
  - Immersive/FULL LAVA wheel response: mode scale 0.30 with the same multiplier/caps.
  - Normal HUB touch response: mode scale 0.52, input multiplier 0.31, per-event cap 28, accumulated cap 34.
  - Immersive/FULL LAVA touch response: mode scale 0.34 with the same multiplier/caps.
  - V0.40 scroll-warp boost values are deliberately unchanged in L1; only movement sensitivity is being tested.
- Removed abrupt click-driven morphology changes: blank-space burst clicks no longer jump phase/phase2. Clicks still retain the V0.40 motion impulse.
- Removed drag-direction shape-axis steering: selecting/dragging a blob no longer rotates its deformation axis toward pointer direction. Existing V0.40 deformation amount remains otherwise unchanged.

FROZEN / EXPLICITLY NOT TOUCHED
- HUB geometry, responsive stage, Hero, quick links, Contact, mail fallback and rotation-to-Hero behaviour: V0.54 exactly.
- sonoDGTL: V0.54 exactly.
- Canvas sizing, overscan, visualViewport logic and resize/orientation behaviour: unchanged from the V0.40 lava baseline used by V0.54.
- L2 release/momentum behaviour: NOT introduced.
- L3 +5% selected size / +50% liquid warp: NOT introduced.
- L4 5+5 attraction/repulsion: NOT introduced.

CACHE
- Only lava.js loaders are bumped to ?v=0541. Other V0.54 UI assets retain ?v=054 because they are frozen.

--- V0.54 BASELINE NOTES (frozen) ---
BEERBELGIO.GITHUB.IO — V0.54 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

BASELINE / FREEZE STRATEGY
- HUB responsive architecture remains the known-good V0.42 baseline restored in V0.49, plus the approved UI refinements through V0.53.
- Desktop HUB layout remains frozen.
- LAVA ENGINE remains byte-for-byte the V0.40 lava.js baseline. No lava-engine feature is reintroduced in V0.54.
- sonoDGTL remains on the current design baseline with only the two refinements listed below.

V0.54 HUB CHANGES
- Touch rotation landing: when a coarse-pointer phone rotates between portrait and landscape, the page now returns to the current start of the Hero after the new orientation layout settles.
- The rotation correction uses only scroll positioning. It does NOT write responsive widths, zoom, visualViewport values, stage geometry or canvas dimensions.
- Portrait 100 px runway above the Hero remains unchanged; on portrait landing the Hero itself is the visual page zero.
- No other HUB UI, responsive geometry, Contact, quick links, claim sizing, desktop layout or final motto behaviour is changed.

V0.54 SONODGTL CHANGES
- Touch-portrait sonoDGTL lettering increased from 57 px to 60 px.
- Contact-card HUB group remains centred; text-to-logo gap increased from 3 px to 7 px.

LAVA STATUS
- lava.js is deliberately unchanged from the V0.40 baseline.
- SHA-256 expected: 2ea8275caca3e54a5020682611c89a3400207ce7b7dc7f0d52eba9a069cd9ba2
- LAVA_AUDIT_V040-V048.txt remains included for the controlled reintroduction phase.

PLANNED V0.54.x LAVA TEST SERIES — ONLY AFTER V0.54 UI IS APPROVED
- V0.54.1 / L1: reduce scroll sensitivity + remove artificial shape rotation/jump on click.
- V0.54.2 / L2: gesture-proportional release velocity + residual momentum + gradual return to autonomous movement + warping decay tied to momentum.
- V0.54.3 / L3: selected blob +5% size +50% liquid deformation/warping for the full drag, with matching release decay.
- V0.54.4 / L4: 5+5 blank-click cycle for attraction / repulsion, trajectory-only and without abrupt morph jumps.
- Stop there if L1-L4 already produce the desired behaviour. Do NOT automatically reintroduce later V0.45-V0.48 morphology experiments.
- Keep mobile canvas overscan changes, visualViewport resize/orientation logic and HUB responsive-stage changes out of the entire V0.54.x lava test series.
- Prefer isolated lava-only changes; if cache-busting changes are needed, touch only lava.js plus the HTML loaders and documentation required for the test version.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- See LICENSE.md, COPYRIGHT.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override layer; do not stack old version override blocks.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ = standalone lava route.
