BEERBELGIO.GITHUB.IO — V0.32 PUBLIC STAGING

STAGING
- Public GitHub Pages staging remains active.
- noindex / nofollow / noarchive remains enabled.
- English remains the primary language.
- sonoDGTL base route: /sonodgtl/ (ENG)
- Italian alternate: /sonodgtl/it/
- .nojekyll remains enabled for direct static hosting.
- Cache-busting advanced to ?v=032 for main CSS/JS/local visual assets.

RIGHTS / LICENSING
- Added LICENSE.md with an explicit © 2026 Matteo Belgiovine / All Rights Reserved notice.
- The public repository is NOT declared open source.
- Any expressly authorised reuse must retain attribution to Matteo Belgiovine / BeerBelgio.
- Added THIRD_PARTY_NOTICES.md for M PLUS Rounded 1c and platform names/logos.
- Platform trademarks/logos are explicitly excluded from the project's original-content ownership claim.

MOBILE STRUCTURE
- Restored the V0.30 75vw stage rule as the authoritative phone width.
- Phone rules now trigger by either viewport width OR coarse pointer, so they remain active more reliably on iPhone, including landscape.
- Added min-width:0 / max-width guards to prevent wide internal grids from forcing the page wider than the intended stage.

HERO CLAIM
- The V0.31 equal-height relationship between FUN and IS A / SERIOUS / THING. is preserved.
- Desktop separation between the two halves is doubled from 18px to 36px.
- The desktop claim grid gains a small amount of extra outer width, allowing both halves to grow outward rather than crowding the centre.
- Desktop fitting allows both halves to grow slightly while preserving their visual-height relationship.
- Mobile uses a smaller 8px centre gap and dimensions appropriate to the narrower stage.

HERO IDENTITIES
- Existing mobile descriptor sizing / spacing retained.
- Phone landscape continues to switch BeerBelgio and sonoDGTL to two side-by-side columns.

QUICK LINKS
- Mobile is explicitly restored to 4 + 4 icons, followed by FULL LAVA alone on a third row.
- Desktop round controls increased from 52px to 58px.
- Every icon, including Email, now uses the exact same 40% mark size inside its circle.
- Icon wrappers use grid centring and zero line-height to remove optical baseline drift.
- Email keeps the exact same pre-filled mailto action as WRITE ME.

FEATURED
- Mobile Spotify / YouTube labels increased to 15.5px after being too small in V0.31.
- Arrows remain proportional to the label and naturally separated.

SONODGTL CARD
- Removed the forced mobile line breaks introduced in V0.31.
- Mobile wrapping is natural again so it can be reassessed after the stage-width fix.

LAVA / IPHONE
- Added viewport-fit=cover to all current HTML entry pages to allow the page/canvas into iPhone safe-area gutters.
- Removed the oversized internal canvas-world workaround from V0.31.
- The lava canvas now maps directly to 100vw × 100dvh.
- Blob centres are allowed to travel up to 1.45 radii beyond each physical viewport edge, so the screen itself is the only intended crop boundary.
- Basic Mode and FULL LAVA continue to use exactly the same lava field and edge rules.

DEFERRED
- Final floating motto scroll-growth / centre-screen transformation remains intentionally NOT implemented yet.
