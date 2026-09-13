BEERBELGIO.GITHUB.IO — V0.30 PUBLIC STAGING

STAGING
- Public GitHub Pages staging remains active.
- noindex / nofollow / noarchive remains enabled.
- English remains the primary language.
- sonoDGTL base route: /sonodgtl/ (ENG)
- Italian alternate: /sonodgtl/it/
- .nojekyll remains enabled for direct static hosting.
- V0.30 adds explicit cache-busting query strings (?v=030) to the main CSS, JS and local visual assets so mobile Safari cannot keep serving older build styling after a deploy.

HERO
- Reworked claim sizing again using actual glyph metrics rather than CSS line-box height.
- FUN remains the master block but now intentionally leaves breathing room instead of filling its entire half.
- “IS A / SERIOUS / THING.” is fitted to the real visible height of FUN, so the three-line block should no longer appear taller than FUN.
- FUN remains a live cutout/window onto the lava behind the card.
- BeerBelgio remains right-aligned; sonoDGTL remains left-aligned.
- Lower identity blocks have more separation between title / descriptor / metadata.
- Descriptor is only slightly reduced and softened; metadata remains close to V0.29.

QUICK LINKS
- User-supplied platform SVGs retained.
- Circular controls restored to 58px on desktop and mobile.
- Each icon now occupies 40% of the button diameter, leaving ~30% margin on each side.
- Email quick link now uses the exact same pre-filled mailto subject/body as WRITE ME.
- Desktop remains one row with eight circular links plus FULL LAVA.
- Mobile remains 4 + 4 icons, with FULL LAVA as a full-width third row.
- Mobile FULL LAVA is taller and its label is larger.

FEATURED
- Play icon is cache-busted and optically centered with one shared rule for desktop and mobile.
- SPOTIFY / YOUTUBE typography remains enlarged.
- Their arrows remain site-cream, match the text scale and keep extra spacing.

CONTACT
- WRITE ME arrow remains separated from its label.
- Smiley uses the same vertical-centering rule on desktop and mobile: top: 50% + translateY(-50%).

MOBILE
- Main site stage is explicitly width + max-width 75vw, leaving 25% total viewport width as surrounding lava.
- Main CSS/JS/icons are cache-busted to eliminate the stale-mobile-build behaviour observed between V0.28 and V0.29.
- Quick actions use the same new SVG files and sizing rules as desktop.

LAVA / MOBILE SAFARI
- Removed the mobile-only “keep the whole blob inside the screen” fence introduced in V0.29.
- Blobs can now travel partly beyond physical screen edges in normal and FULL LAVA modes.
- Canvas dimensions no longer use visualViewport.width/height, which can be smaller than the actual layout viewport on iPhone Safari (especially landscape).
- Canvas now sizes from the full layout viewport and only uses visualViewport as a resize signal.
- Orientation changes trigger immediate + delayed resize passes to catch Safari after its UI/safe-area geometry settles.

DEFERRED
- Final floating motto scroll-growth / center-screen transformation remains intentionally NOT implemented yet.
