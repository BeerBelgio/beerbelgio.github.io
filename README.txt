BEERBELGIO.GITHUB.IO — V0.41 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

V0.41 CHANGELOG
- Build hygiene: V0.41 REPLACES the V0.40 staging override block. Staging overrides are not stacked from build to build.
- Hero claim: desktop and landscape SVG reduced by 20%; portrait SVG enlarged by 25% from V0.40.
- Hero meta: portrait location is now right-aligned, with name/location sharing the same internal margin logic.
- Hero bottom spacing: reduced from V0.40 to a middle value between the previous two builds.
- Quick links: LinkedIn icon replaced with the user-supplied SVG; Share icon replaced with the square + upward-arrow symbol; Share keeps the same sizing rules as the other platform icons.
- Quick links spacing: desktop, portrait and landscape all use one explicit grid/spacing system so Share and FULL LAVA participate in the same spacing logic.
- FULL LAVA desktop: slightly smaller text while retaining the 58 px height and 50 px corner radius.
- Contact card: rebuilt the lower region as a true grid so WRITE ME is vertically centred in the residual space below the headline. Smiley is no longer an absolute overlay.
- Contact portrait: smiley centred in its own right-side area, with a safer gap from the text.
- Contact landscape: headline enlarged; smiley enlarged by ~10% and centred in its right-side area.
- Desktop narrow-window behaviour: restored the canonical 760 px desktop composition under the desktop-proportional class and explicitly overrides mobile-era rules when a desktop window becomes narrow.
- Bubble drag physics: release velocity now uses a short weighted motion history, so slow/fast gestures produce proportionally slow/fast release momentum.
- Bubble drag warping: manual liquid deformation now decays over the same hold/blend period as manual release momentum.
- Bubble drag rotation: manual dragging and force changes no longer rotate the deformation axis; shape mutates via phase/deformation instead.
- FULL LAVA scroll: wheel/touch scroll sensitivity reduced in immersive lava while keeping normal page interaction more responsive.
- sonoDGTL: first real content-first page replaces the placeholder. English remains primary at /sonodgtl/; Italian remains alternative at /sonodgtl/it/. Initial content is based on the uploaded CV and cover-letter material: strategy, communication, content, analytics, CRM, automation/AI, process design, remote coordination and the “clearer priorities” working principle.
- Cache busting updated to ?v=041.

SONODGTL SOURCE NOTE
- The initial V0.2 sonoDGTL structure is grounded in the uploaded CV and cover letter.
- The current Wix URL was supplied as an additional reference, but the staging environment could not fetch that Wix page directly during this build. No Wix-specific copy was invented to fill that gap.

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
