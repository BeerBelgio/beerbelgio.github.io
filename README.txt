BEERBELGIO.GITHUB.IO — V0.54.2 / L2

STATUS
V0.54 remains the frozen UI/responsive baseline.
V0.54.1B is the approved completed L1 baseline.
This build adds ONLY L2 release / momentum behaviour on top of L1.

V0.54.2 / L2 CHANGES
- Keeps the approved L1 scroll sensitivity, click-vs-drag 4 px threshold and no abrupt blank-click phase jump unchanged.
- Release velocity now uses a short weighted history (~140 ms), with recent samples weighted more heavily: slow gestures release slowly, faster gestures release faster.
- Release momentum duration is proportional to gesture energy, then blends gradually back into autonomous lava motion rather than snapping back.
- Residual liquid warping follows the same hold + blend timeline as release momentum, so the release deformation fades together with the manual motion.
- A click/tap below the L1 4 px threshold remains a true no-op and never enters the L2 release system.
- L3 is NOT present: no +5% selected-blob size and no +50% selected-blob warping during drag.
- No L4 5+5 attraction/repulsion logic.
- No changes to canvas geometry, overscan, visualViewport, resize/orientation logic, HUB responsive layout, HUB UI or sonoDGTL.

TEST TARGET
- Slow drag + release should result in visibly slower residual motion.
- Fast drag + release should result in stronger residual motion, but remain controlled.
- The blob should retain manual momentum briefly and then return gradually to autonomous movement without a visible snap.
- Release warping should fade on the same curve as the residual momentum.
- Portrait/landscape/desktop geometry must remain identical to V0.54.1B.

BEERBELGIO.GITHUB.IO — V0.54.1B / L1

STATUS
V0.54 remains the frozen UI/responsive baseline.
V0.54.1A is the promoted scroll-sensitivity baseline.
This build completes L1 by separating a real drag from a simple click/tap, without introducing any L2 release/momentum changes.

V0.54.1B CHANGES
- Keeps V0.54.1A scroll sensitivity exactly as approved.
- Adds a 4 px drag threshold: pressing a blob does NOT immediately put it into drag mode.
- A click/tap that stays below the threshold is a true no-op on the blob: it does not overwrite vx/vy, baseAngle, deformation direction or phase. This removes the V0.40 zero-distance-drag behaviour that could park a clicked blob.
- A genuine drag, once the threshold is crossed, uses the original V0.40 drag and release physics unchanged. No gesture-history / proportional-release logic from L2 is included.
- Blank-space burst clicks keep their movement impulse but no longer inject abrupt phase / phase2 jumps, removing the visible morph/rotation glitch without removing the motion impulse.
- No changes to canvas geometry, overscan, visualViewport, resize/orientation logic, HUB responsive layout or sonoDGTL.

TEST TARGET
- Portrait responsive geometry must remain identical to V0.54 / V0.54.1A.
- Simple click on a blob: blob should keep moving autonomously rather than stopping.
- Blank click: movement impulse remains, but without an abrupt shape jump.
- Real drag: should still feel like V0.40. L2 is deliberately not present yet.

BEERBELGIO.GITHUB.IO — V0.54.1A / L1 DIAGNOSTIC

STATUS
V0.54 remains the frozen UI/responsive baseline.
This diagnostic build changes ONLY lava scroll sensitivity.
All click/drag/morph/canvas/viewport behaviour is restored byte-for-byte to the V0.40 lava baseline.

WHY THIS BUILD EXISTS
V0.54.1 unexpectedly showed a portrait layout/compositing regression even though style.css and script.js were unchanged from V0.54.
It also exposed that a simple blob click is treated by V0.40 as a zero-distance drag: on release vx/vy are overwritten with ~0 and the manual-momentum hold makes the blob appear stationary. The old deformation-axis movement visually masked that pause.

V0.54.1A CHANGES
- Lava scroll response only: wheel and touch impulses reduced to 75% of V0.40 in the normal hub.
- FULL LAVA response reduced further (wheel 50%, touch 55% of V0.40).
- V0.40 scrollWarpBoost values are unchanged.
- The attempted no-rotation edits from V0.54.1 are completely removed for this diagnostic.
- No changes to style.css, script.js, sonoDGTL, canvas geometry, overscan, resize, orientation or visualViewport.

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
