(() => {
  const body = document.body;
  const lavaToggle = document.getElementById("lava-toggle");
  const lavaBack = document.getElementById("lava-back");
  const lavaInfo = document.getElementById("lava-info");
  const lavaInfoPanel = document.getElementById("lava-info-panel");
  const lavaInfoClose = document.getElementById("lava-info-close");
  const siteStage = document.getElementById("site-stage");
  const siteShell = document.getElementById("site-shell");

  // Always land on the Hero. In touch portrait the document keeps a 100px
  // pre-roll above the Hero for iPhone top-edge breathing room, but that pre-roll
  // is not the initial reading position: the Hero itself is treated as page zero.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const heroSection = document.querySelector(".hero");
  function isTouchPortrait() {
    return matchMedia("(pointer: coarse) and (orientation: portrait)").matches;
  }
  function heroLandingTop() {
    if (!isTouchPortrait() || !heroSection) return 0;
    return Math.max(0, Math.round(window.scrollY + heroSection.getBoundingClientRect().top));
  }
  function resetLandingToHero() {
    if (location.hash) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    window.scrollTo(0, heroLandingTop());
  }
  resetLandingToHero();
  const forceHeroLanding = () => {
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo({ top: heroLandingTop(), left: 0, behavior: "auto" });
  };
  addEventListener("pageshow", () => {
    forceHeroLanding();
    requestAnimationFrame(forceHeroLanding);
    setTimeout(forceHeroLanding, 80);
    setTimeout(forceHeroLanding, 320);
  }, { passive: true });
  addEventListener("load", () => {
    forceHeroLanding();
    requestAnimationFrame(forceHeroLanding);
    setTimeout(forceHeroLanding, 120);
    setTimeout(forceHeroLanding, 500);
  }, { passive: true });

  // TOUCH ORIENTATION LANDING — after a portrait/landscape rotation, return
  // to the start of the Hero instead of preserving an arbitrary document
  // scroll position. This only changes scroll position; it does not resize,
  // zoom or otherwise govern the responsive stage.
  function scrollToHeroAfterRotation() {
    if (!heroSection || !matchMedia("(pointer: coarse)").matches) return;
    const go = () => {
      const top = Math.max(0, Math.round(window.scrollY + heroSection.getBoundingClientRect().top));
      window.scrollTo({ top, left: 0, behavior: "auto" });
    };
    go();
    requestAnimationFrame(go);
    setTimeout(go, 90);
    setTimeout(go, 260);
  }

  const portraitOrientation = matchMedia("(orientation: portrait)");
  if (typeof portraitOrientation.addEventListener === "function") {
    portraitOrientation.addEventListener("change", scrollToHeroAfterRotation);
  } else if (typeof portraitOrientation.addListener === "function") {
    portraitOrientation.addListener(scrollToHeroAfterRotation);
  }
  addEventListener("orientationchange", scrollToHeroAfterRotation, { passive: true });

  function setLavaInfo(open) {
    if (!lavaInfoPanel || !lavaInfo) return;
    lavaInfoPanel.hidden = !open;
    lavaInfo.setAttribute("aria-expanded", String(open));
  }

  function setLavaMode(active) {
    body.classList.toggle("lava-mode", active);
    if (lavaToggle) {
      lavaToggle.setAttribute("aria-pressed", String(active));
    }
    if (!active) setLavaInfo(false);
  }

  if (lavaToggle) lavaToggle.addEventListener("click", () => setLavaMode(true));
  if (lavaBack) lavaBack.addEventListener("click", () => setLavaMode(false));
  if (lavaInfo) lavaInfo.addEventListener("click", () => setLavaInfo(lavaInfoPanel?.hidden !== false));
  if (lavaInfoClose) lavaInfoClose.addEventListener("click", () => setLavaInfo(false));
  addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lavaInfoPanel && !lavaInfoPanel.hidden) {
      setLavaInfo(false);
    }
  });

  // ---------------------------------------------------------------
  // DESKTOP PROPORTIONAL STAGE
  //
  // Keep one canonical 760px desktop composition. Its approved visual width
  // is 45% of the physical desktop screen, not 45% of the shrinking browser
  // window. The HUB therefore keeps its normal desktop size while it still
  // fits. Only when the browser becomes narrower than that composition plus
  // equal gutters do we scale the whole shell down uniformly.
  // ---------------------------------------------------------------
  const DESIGN_WIDTH = 760;
  const DESKTOP_REFERENCE_RATIO = 0.45;
  const DESKTOP_MIN_GUTTER = 18;

  function isDesktopExperience() {
    return matchMedia("(pointer: fine)").matches && screen.width >= 900;
  }

  function updateDesktopStage() {
    if (!siteStage || !siteShell) return;

    if (!isDesktopExperience()) {
      document.documentElement.classList.remove("desktop-proportional");
      document.documentElement.style.removeProperty("--desktop-stage-scale");
      siteShell.style.removeProperty("zoom");
      siteStage.style.removeProperty("height");
      siteStage.style.removeProperty("--desktop-stage-width");
      return;
    }

    document.documentElement.classList.add("desktop-proportional");

    // Use the physical desktop screen only to establish the approved desktop
    // size. Use clientWidth for the fit threshold because it excludes the
    // vertical scrollbar. Once the preferred width no longer fits, leave the
    // same gutter on both sides and shrink only the single global scale.
    const referenceScreenWidth = Math.max(1, screen.width || innerWidth);
    const preferredWidth = referenceScreenWidth * DESKTOP_REFERENCE_RATIO;
    const layoutViewportWidth = Math.max(1, document.documentElement.clientWidth || innerWidth);
    const availableWidth = Math.max(1, layoutViewportWidth - DESKTOP_MIN_GUTTER * 2);
    const targetWidth = Math.min(preferredWidth, availableWidth);
    const scale = targetWidth / DESIGN_WIDTH;

    siteShell.style.removeProperty("zoom");
    siteStage.style.setProperty("--desktop-stage-width", `${targetWidth}px`);
    document.documentElement.style.setProperty("--desktop-stage-scale", String(scale));

    requestAnimationFrame(() => {
      const layoutHeight = siteShell.scrollHeight;
      siteStage.style.height = `${Math.max(1, layoutHeight * scale)}px`;
    });
  }

  updateDesktopStage();
  addEventListener("resize", updateDesktopStage, { passive: true });
  addEventListener("load", updateDesktopStage, { passive: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(updateDesktopStage).catch(() => {});
  }
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", updateDesktopStage, { passive: true });
  }

  // ---------------------------------------------------------------
  // HERO CLAIM
  // The claim is now a single user-supplied SVG. No font metrics,
  // resize observers or orientation-specific text fitting are required.
  // ---------------------------------------------------------------

  // ---------------------------------------------------------------
  // HERO BEERBELGIO ANCHOR — centre target card on screen
  // ---------------------------------------------------------------
  const beerbelgioHeroAnchor = document.querySelector('.identity-card-link[href="#beerbelgio-links"]');
  const beerbelgioTarget = document.getElementById('beerbelgio-links');

  function scrollCardToCenter(target) {
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetTop = window.scrollY + rect.top - ((window.innerHeight - rect.height) / 2);
    window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
  }

  if (beerbelgioHeroAnchor && beerbelgioTarget) {
    beerbelgioHeroAnchor.addEventListener('click', (event) => {
      event.preventDefault();
      scrollCardToCenter(beerbelgioTarget);
    });
  }

  // ---------------------------------------------------------------
  // SHARE — native share sheet when available, clipboard fallback otherwise.
  // ---------------------------------------------------------------
  const shareSite = document.getElementById("share-site");

  function showShareToast(message) {
    let toast = document.getElementById("share-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "share-toast";
      toast.className = "share-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(showShareToast.timer);
    showShareToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1400);
  }

  if (shareSite) {
    shareSite.addEventListener("click", async () => {
      const shareData = {
        title: "Matteo Belgiovine",
        text: "Music, digital strategy and useful ideas from unexpected angles.",
        url: "https://beerbelgio.github.io/"
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
          return;
        }
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareData.url);
        } else {
          const input = document.createElement("textarea");
          input.value = shareData.url;
          input.setAttribute("readonly", "");
          input.style.position = "fixed";
          input.style.opacity = "0";
          document.body.appendChild(input);
          input.select();
          document.execCommand("copy");
          input.remove();
        }
        showShareToast("LINK COPIED");
      } catch (error) {
        if (error?.name !== "AbortError") showShareToast("COPY THE URL ABOVE");
      }
    });
  }

  // ---------------------------------------------------------------
  // HUB EMAIL — normal mailto first, structured webmail fallback second.
  // Browsers do not expose a reliable API telling us whether a local mail
  // handler exists. We therefore keep mailto behaviour and reveal a compact
  // in-page fallback with TO / SUBJECT / MESSAGE as separate copyable fields.
  // ---------------------------------------------------------------
  const hubWriteButton = document.getElementById("hub-write-me");
  const emailFallback = document.getElementById("email-fallback");
  const emailFallbackClose = document.getElementById("email-fallback-close");
  let emailFallbackTimer = 0;

  function closeEmailFallback() {
    if (!emailFallback) return;
    emailFallback.hidden = true;
    document.body.classList.remove("email-fallback-open");
  }

  function openEmailFallback() {
    if (!emailFallback) return;
    emailFallback.hidden = false;
    document.body.classList.add("email-fallback-open");
  }

  async function copyFallbackField(id, button) {
    const target = document.getElementById(id);
    if (!target) return;
    const value = target.textContent || "";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      if (button) {
        const old = button.textContent;
        button.textContent = "COPIED";
        setTimeout(() => { button.textContent = old; }, 900);
      }
    } catch {
      showShareToast("COPY FAILED — SELECT THE TEXT MANUALLY");
    }
  }

  if (hubWriteButton) {
    hubWriteButton.addEventListener("click", (event) => {
      const href = hubWriteButton.getAttribute("href") || "";
      if (!href.startsWith("mailto:")) return;
      event.preventDefault();

      clearTimeout(emailFallbackTimer);
      window.location.href = href;

      // If no app takes over, the visitor remains on the page and gets a
      // structured fallback instead of one unusable combined clipboard blob.
      emailFallbackTimer = setTimeout(openEmailFallback, 850);
    });
  }

  if (emailFallbackClose) emailFallbackClose.addEventListener("click", closeEmailFallback);
  if (emailFallback) {
    emailFallback.addEventListener("click", (event) => {
      if (event.target === emailFallback) closeEmailFallback();
      const button = event.target.closest?.("[data-copy-target]");
      if (button) copyFallbackField(button.dataset.copyTarget, button);
    });
  }

  // ---------------------------------------------------------------
  // VIDEO
  // ---------------------------------------------------------------
  const videoShell = document.getElementById("video-shell");

  if (videoShell) {
    videoShell.addEventListener("click", () => {
      const id = videoShell.dataset.youtubeId?.trim();
      const list = videoShell.dataset.youtubeList?.trim();

      if (!id) {
        const note = videoShell.querySelector(".video-note");
        if (note) note.textContent = "add the real YouTube ID first";
        return;
      }

      const params = new URLSearchParams({ autoplay: "1" });
      if (list) params.set("list", list);

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?${params.toString()}`;
      iframe.title = "BeerBelgio video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      videoShell.replaceChildren(iframe);
    }, { once: true });
  }

  // ---------------------------------------------------------------
  // FINAL MOTTO — V0.18
  //
  // Typography = real browser-rendered HTML.
  // Reactive colour = exact duplicate HTML text layers.
  //
  // No canvas font rasterisation exists anymore, therefore there is no
  // separate text metric system that can slide several pixels sideways.
  //
  // Each lava blob owns one duplicate layer per phrase half.
  // Its live mask follows the blob smoothly; its colour comes only from the
  // BeerBelgio palette and DEPENDS on the blob family underneath.
  // ---------------------------------------------------------------
  const mottoFit = document.getElementById("motto-fit");
  const mottoFun = document.getElementById("motto-fun");
  const mottoRest = document.getElementById("motto-rest");

  if (mottoFit && mottoFun && mottoRest && window.BeerBelgioLava?.getBlobs) {
    const funHost = mottoFun.querySelector(".motto-reactive-host");
    const restHost = mottoRest.querySelector(".motto-reactive-host");

    const TEXT = {
      fun: "FUN",
      rest: "IS A SERIOUS THING."
    };

    // BeerBelgio-only transformed palette.
    // White/cream + black use the requested main orange/green pair.
    // Warm lava switches into the green branch.
    // Mustard uses the deeper pair.
    const REACTIVE_PALETTE = {
      // Requested behaviour:
      // cream/white blob:
      //   FUN (black base)  -> red
      //   REST (white base) -> black
      // ink/black blob:
      //   FUN (black base)  -> white
      //   REST (white base) -> red
      // warm / mustard blobs:
      //   elegant simple inversion.
      cream: {
        fun:  "#d1442d",
        rest: "#1c1713"
      },
      ink: {
        fun:  "#ffffff",
        rest: "#ec6b2d"
      },
      warm: {
        fun:  "#ffffff",
        rest: "#1c1713"
      },
      mustard: {
        fun:  "#ffffff",
        rest: "#1c1713"
      },
      default: {
        fun:  "#ffffff",
        rest: "#1c1713"
      }
    };

    let funLayers = [];
    let restLayers = [];
    let lastCount = -1;

    function createLayer(role) {
      const el = document.createElement("span");
      el.className = "motto-reactive-layer";
      el.textContent = TEXT[role];
      return el;
    }

    function ensureLayers(count) {
      if (count === lastCount) return;
      lastCount = count;

      funHost.replaceChildren();
      restHost.replaceChildren();

      funLayers = [];
      restLayers = [];

      for (let i = 0; i < count; i++) {
        const f = createLayer("fun");
        const r = createLayer("rest");
        funHost.appendChild(f);
        restHost.appendChild(r);
        funLayers.push(f);
        restLayers.push(r);
      }
    }

    function fitMotto() {
      const footer = mottoFit.parentElement;
      if (!footer) return;

      mottoFit.style.fontSize = "10px";

      const footerStyle = getComputedStyle(footer);
      const padLeft = parseFloat(footerStyle.paddingLeft) || 0;
      const padRight = parseFloat(footerStyle.paddingRight) || 0;
      const target = (footer.clientWidth - padLeft - padRight) * 0.985;

      let low = 10;
      let high = 140;

      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        mottoFit.style.fontSize = `${mid}px`;

        if (mottoFit.getBoundingClientRect().width <= target) low = mid;
        else high = mid;
      }

      mottoFit.style.fontSize = `${Math.max(10, low - 0.25)}px`;
    }

    function updateRoleLayer(el, blob, segRect, role, time) {
      const palette = REACTIVE_PALETTE[blob.family] || REACTIVE_PALETTE.default;
      el.style.color = palette[role];

      const cx = blob.x - segRect.left;
      const cy = blob.y - segRect.top;

      // Slight organic breathing in the mask, but never enough to create
      // a separate "second object" from the real lava underneath.
      const rx = blob.r * (0.92 + 0.045 * Math.sin(blob.phase + time * 0.00018));
      const ry = blob.r * (0.92 + 0.045 * Math.sin(blob.phase2 - time * 0.00014));

      // Soft edge = progressive colour change instead of snapping.
      // Browser renders BOTH base and duplicate with the exact same glyphs.
      const mask = `radial-gradient(ellipse ${rx}px ${ry}px at ${cx}px ${cy}px,
        #000 0%,
        #000 74%,
        rgba(0,0,0,.96) 82%,
        rgba(0,0,0,.55) 90%,
        transparent 100%)`;

      el.style.webkitMaskImage = mask;
      el.style.maskImage = mask;
      el.style.webkitTextStroke = `0.35px ${palette[role]}`;
    }

    function renderMotto(time) {
      const blobs = window.BeerBelgioLava.getBlobs();
      ensureLayers(blobs.length);

      const funRect = mottoFun.getBoundingClientRect();
      const restRect = mottoRest.getBoundingClientRect();

      for (let i = 0; i < blobs.length; i++) {
        updateRoleLayer(funLayers[i], blobs[i], funRect, "fun", time);
        updateRoleLayer(restLayers[i], blobs[i], restRect, "rest", time);
      }

      requestAnimationFrame(renderMotto);
    }

    async function startMotto() {
      if (document.fonts?.ready) {
        try { await document.fonts.ready; } catch {}
      }
      fitMotto();
      requestAnimationFrame(renderMotto);
    }

    addEventListener("resize", fitMotto, { passive: true });
    if (window.visualViewport) {
      visualViewport.addEventListener("resize", fitMotto, { passive: true });
    }
    if (document.fonts?.addEventListener) {
      document.fonts.addEventListener("loadingdone", fitMotto);
    }

    startMotto();
  }
})();