BEERBELGIO.GITHUB.IO — V0.55.1 PUBLIC STAGING

STATUS
V0.54.4 remains the frozen lava / interaction baseline. V0.55.1 corrects the V0.55 desktop shell regression and makes the final-motto play tail portrait-only.

V0.55.1 CHANGES
- Wide desktop sizing/alignment is restored to the exact V0.54.4 mechanism: the canonical 760px shell again uses CSS zoom into the centred 45vw stage. The transform-scale experiment from V0.55 is removed.
- Narrow desktop windows keep the DESKTOP CSS state even below the historical 720px viewport breakpoint. A desktop-only lock replays the existing desktop media rules only when JS has positively identified a fine-pointer desktop. Touch/mobile layouts are unaffected.
- Target: wide desktop must look exactly like V0.54.4; narrowing the browser should shrink the same composition proportionally instead of reflowing text/cards.
- Final motto sticky midpoint behavior is now MOBILE PORTRAIT ONLY. Mobile landscape returns to the V0.54.4 normal ending.
- Portrait lava-only play tail doubled from 72svh to 144svh.
- lava.js remains byte-for-byte V0.54.4/V0.55. No changes to L1-L4, canvas, overscan, viewport, drag, warping or 5+5.
- sonoDGTL unchanged.

TEST TARGET
- Desktop full width: exact V0.54.4 card size and alignment.
- Desktop narrow window: same composition scales down with no text/card reflow.
- Mobile portrait: motto stays at vertical midpoint and extra play area is about twice V0.55.
- Mobile landscape: page ending behaves as V0.54.4, with no midpoint-sticky motto and no extra play tail.

BEERBELGIO.GITHUB.IO — V0.55 / RESPONSIVE SHELL

STATUS
V0.54.4 / L4 is the frozen functional baseline: HUB, sonoDGTL and lava behaviour are approved. V0.55 changes ONLY two non-lava presentation behaviours: proportional desktop-window scaling and the mobile final-claim scroll/sticky zone. lava.js remains byte-for-byte V0.54.4.

V0.55 CHANGES
- Desktop proportional stage: replaces CSS `zoom` with a fixed 760px internal layout painted via `transform: scale(...)`. The 45vw stage ratio is unchanged, but text wrapping/card geometry no longer reflow when the browser window becomes narrow.
- Desktop shell height is now computed from the fixed unscaled `scrollHeight × scale`, matching the transform model.
- Desktop proportional mode explicitly locks the canonical desktop page gap/radius variables.
- Final motto fitting is now transform-aware: its visual fit calculation compares visual units to visual units instead of mixing scaled getBoundingClientRect() width with unscaled clientWidth.
- Mobile final claim: `FUN IS A SERIOUS THING.` scrolls normally until its centre reaches the vertical middle of the viewport, then remains sticky there while the rest of the cards continue to scroll away.
- Mobile tail/play zone: adds 72svh of scroll space after the final claim so the cards can disappear completely and the claim can remain alone over the lava for a while.
- No change to lava.js, canvas geometry, mobile stage width, hero responsive rules, sonoDGTL or L1–L4 behaviour.

TEST TARGET
- Desktop: resize the browser continuously from wide to very narrow; cards and all text should preserve the same internal composition and line breaks, only scaling proportionally.
- Mobile: scroll to the final claim; it should rise naturally, stop with its centre at mid-screen, and remain there while the cards disappear above.
- Mobile: continue scrolling after the last card is gone; there should be a clean claim + lava play zone.
- Lava behaviour must be indistinguishable from V0.54.4.

BEERBELGIO.GITHUB.IO — V0.54.4 / L4

STATUS
V0.54.2.3 is the approved L2/L3-without-size-growth baseline. V0.54.3 is rejected because the selected-blob +5% render scaling coincided with a mobile proportion regression and worse blob behaviour; that size-growth experiment is fully removed here.
V0.54.4 restarts directly from V0.54.2.3 and adds ONLY the 5+5 blank-click attraction/repulsion behaviour.

V0.54.4 CHANGES
- Restores lava.js directly from approved V0.54.2.3 before adding L4; no +5% selected-blob size growth is present.
- Keeps all approved L1/L2 behaviour unchanged: reduced scroll sensitivity, click-vs-drag threshold, gesture-proportional release, strength-dependent momentum/decay and +50% held liquid morph with release decay.
- Blank-space clicks now run a 5+5 cycle: first five clicks REPULSE blobs from the click point; next five ATTRACT blobs toward it; then the cycle repeats.
- L4 changes trajectory only. It does NOT inject phase/phase2 jumps, rotate the morph axis, alter morphBoost, resize blobs, or touch canvas/viewport/responsive geometry.
- Clicks on blobs remain governed by the existing click-vs-drag logic and do not count toward the 5+5 blank-click cycle.
- Clicks on cards/buttons/links/form controls remain excluded.
- Desktop browser-window resize issue is intentionally NOT addressed in this lava-isolation build; UI/responsive files remain frozen to the V0.54 baseline.

TEST TARGET
- iPhone/mobile proportions must remain identical to V0.54.2.3.
- Click blank lava five times: blobs should move away from each click point.
- Click blank lava five more times: blobs should move toward each click point.
- Eleventh click must begin a new repulsion block.
- No abrupt morph/rotation glitch should occur on blank clicks.
- Existing blob drag/release and +50% held morph behaviour must remain unchanged.

BEERBELGIO.GITHUB.IO — V0.54.2.3 / L2

STATUS
V0.54.1B remains the approved L1 baseline.
For orderly numbering, the previous experimental labels map as follows: V0.54.2A = V0.54.2.1 and V0.54.2B = V0.54.2.2. From this build onward the numeric subversion scheme is canonical.
V0.54.2.3 starts from the responsive-correct V0.54.2.2 behaviour and changes only LAVA release timing + selected-blob morphology.

V0.54.2.3 CHANGES
- Keeps the approved L1 scroll sensitivity, click-vs-drag threshold and no-abrupt-click-morph behaviour unchanged.
- Keeps the approved 180 ms weighted release history, 72/28 recent-vs-whole-gesture blend, 0.30 release gain and 0.16 px/ms cap unchanged.
- Release decay now grows progressively with throw strength instead of shrinking: weak throws settle quickly; strong throws remain visibly influenced by the user's gesture for longer.
- Strength mapping uses a smooth curve: hold is about 450 ms for weak throws up to about 1150 ms for strong throws; blend is about 850 ms up to about 2350 ms.
- A selected/held blob now receives a true +50% BASE liquid-morph boost even when the pointer/finger is stationary. The boost affects the whole contour deviation and morph phase speed, not only gesture-speed deformation.
- The held boost ramps in over ~120 ms, avoiding a hard shape jump on pointer-down.
- On release, the selected-blob morph boost decays smoothly back from its held value to 1.0 across the same strength-dependent release window.
- A stationary hold that never crosses the 4 px drag threshold still gets the morph boost while held, but translation remains a true L1 no-op; its morph boost relaxes over ~900 ms after release.
- No +5% selected-blob size growth yet.
- No L4 5+5 attraction/repulsion logic yet.
- No changes to canvas geometry, overscan, visualViewport, resize/orientation logic, HUB responsive layout or sonoDGTL.

TEST TARGET
- iPhone portrait geometry must remain identical to V0.54.2.2.
- Weak throw: brief residual influence, then quick return to autonomous movement.
- Strong throw: clearly longer residual trajectory/decay than a weak throw.
- Grab a blob and stop moving: it must continue visibly morphing about 50% more than neighbouring blobs.
- Release after holding: that extra morph must fade smoothly rather than switch off.

BEERBELGIO.GITHUB.IO — V0.54.2B / L2B

STATUS
V0.54.1B remains the approved L1 baseline.
V0.54.2A is the approved translational L2A baseline: portrait responsive geometry is correct and gesture-proportional release is perceptible.
This L2B keeps that exact release model, shortens the return-to-autonomous timing for fast throws, and adds a controlled +50% held-warp with release decay.

V0.54.2B CHANGES
- Keeps all approved L1 behaviour unchanged.
- Keeps V0.54.2A release velocity, 180 ms weighted history, 72/28 recent-vs-whole-gesture blend, 0.30 release gain and 0.16 px/ms cap unchanged.
- Faster gestures now return to autonomous motion sooner instead of holding their manual trajectory longer: hold is about 1350 ms for slow releases down to about 700 ms for fast releases; blend is about 2400 ms down to about 1500 ms.
- Selected/dragged blob warp amplitude is +50% over the proven V0.40 drag-warp calculation for the full duration of a real drag.
- On release, that extra warp decays smoothly back toward the autonomous morph floor across the same overall release window.
- The warp implementation changes ONLY deformation amplitude. It does not inject extra phase / phase2 changes, does not rotate the deformation axis, and does not introduce a new visualViewport/canvas/resize path.
- No +5% size growth yet. Size remains unchanged in this build.
- No L4 5+5 attraction/repulsion logic yet.
- No changes to canvas geometry, overscan, visualViewport, resize/orientation logic, HUB responsive layout or sonoDGTL.

TEST TARGET
- iPhone portrait geometry must remain identical to approved V0.54.2A.
- Fast throw: momentum should still be clearly visible, but the return to autonomous motion should happen noticeably sooner.
- Slow throw: should remain readable and not disappear immediately.
- While a blob is held: liquid deformation should be visibly about 50% stronger.
- On release: the extra deformation should fade smoothly instead of snapping off.

BEERBELGIO.GITHUB.IO — V0.54.2A / L2A

STATUS
V0.54.1B remains the approved L1 baseline.
The first V0.54.2 attempt is rejected: it reintroduced the iPhone portrait/compositing regression and its release momentum was too weak, especially for slow desktop gestures.
This diagnostic L2A restarts directly from V0.54.1B and isolates TRANSLATIONAL release/momentum only.

V0.54.2A CHANGES
- Keeps all approved L1 behaviour unchanged: reduced scroll sensitivity, 4 px click-vs-drag threshold, simple blob click as no-op, no abrupt blank-click phase jump.
- Adds a 180 ms weighted drag-velocity history.
- Release velocity blends recent velocity (72%) with the whole gesture average (28%), so slow deliberate movement still produces a visible release vector.
- Release gain raised to 0.30 with a 0.16 px/ms safety cap. This is intentionally more perceptible than the rejected first L2 attempt.
- Reuses the EXISTING V0.40 manualMomentumUntil/manualBlendUntil mechanism already present in update(); no new per-frame momentum architecture is introduced.
- Momentum hold/blend duration scales moderately with release energy.
- IMPORTANT: the rejected first L2 manualWarp fields / per-frame phase mutation are NOT present. No new per-frame morph branch has been added.
- Warping-decay work is deliberately deferred to a separate L2B only if this translational L2A passes responsive + release tests.
- No changes to canvas geometry, overscan, visualViewport, resize/orientation logic, HUB responsive layout or sonoDGTL.

WHY L2 WAS SPLIT
The rejected V0.54.2 changed two systems at once: release/momentum and a new manual-warp branch executed every frame. Because V0.54.1B was responsive-correct and V0.54.2 was not, L2 is now split to isolate the suspect morph branch instead of continuing with a mixed implementation.

TEST TARGET
- iPhone portrait geometry must remain identical to V0.54.1B.
- Slow desktop drag/release must visibly continue in the gesture direction.
- Faster gesture must create proportionally stronger motion up to the safety cap.
- The blob must then return gradually to autonomous motion, without a hard snap.
- Ignore warping-decay quality for this build: that is intentionally NOT part of L2A.

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

V0.55.2 — LAVA PAIRED SCROLL COUNTERFLOW TEST
- Baseline: V0.55.1 UI/layout and the frozen V0.54.4 interaction stack.
- Lava-only experiment: each colour keeps its two existing blobs, but one copy follows scroll perturbation with normal polarity and the same-colour twin uses the inverse polarity.
- The counterflow applies only to the scroll-derived force/warp input. Autonomous movement, drag/release physics, held +50% morph boost, 5+5 blank-click behaviour, canvas sizing, viewport/orientation logic and all HUB/sonoDGTL layout files are unchanged.
- Purpose: reduce the tendency of repeated scrolling to herd the entire field into one area while preserving the existing visual language and colour pairing.
- Desktop narrow-window layout remains a known separate issue and is intentionally NOT changed in this lava experiment.
