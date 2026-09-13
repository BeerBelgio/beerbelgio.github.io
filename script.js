(() => {
  const body = document.body;
  const lavaToggle = document.getElementById("lava-toggle");
  const lavaBack = document.getElementById("lava-back");
  const siteStage = document.getElementById("site-stage");
  const siteShell = document.getElementById("site-shell");

  function setLavaMode(active) {
    body.classList.toggle("lava-mode", active);
    if (lavaToggle) {
      lavaToggle.setAttribute("aria-pressed", String(active));
      lavaToggle.textContent = "FULL LAVA";
    }
  }

  if (lavaToggle) lavaToggle.addEventListener("click", () => setLavaMode(true));
  if (lavaBack) lavaBack.addEventListener("click", () => setLavaMode(false));

  // ---------------------------------------------------------------
  // DESKTOP PROPORTIONAL STAGE
  //
  // IMPORTANT: desktop detection must NOT depend on the page's CSS viewport,
  // because Chrome zoom changes that viewport. A fine pointer + desktop-class
  // screen keeps this active at 25%, 100%, 200%, etc.
  //
  // The stage is always 45vw and centred.
  // The internal 760px design is zoomed to fit the stage exactly.
  // The lava remains a separate full-viewport canvas.
  // ---------------------------------------------------------------
  const DESIGN_WIDTH = 760;

  function isDesktopExperience() {
    return matchMedia("(pointer: fine)").matches && screen.width >= 900;
  }

  function updateDesktopStage() {
    if (!siteStage || !siteShell) return;

    if (!isDesktopExperience()) {
      document.documentElement.classList.remove("desktop-proportional");
      siteShell.style.removeProperty("zoom");
      siteStage.style.removeProperty("height");
      return;
    }

    document.documentElement.classList.add("desktop-proportional");

    // 45% of the CURRENT browser viewport in CSS pixels.
    // Browser page zoom changes innerWidth; this counter-scaling is intentional.
    const targetWidth = innerWidth * 0.45;
    const scale = targetWidth / DESIGN_WIDTH;

    siteShell.style.zoom = String(scale);

    requestAnimationFrame(() => {
      // The stage owns the document flow; shell itself is absolutely positioned.
      const visualHeight = siteShell.getBoundingClientRect().height;
      siteStage.style.height = `${Math.max(1, visualHeight)}px`;
    });
  }

  updateDesktopStage();
  addEventListener("resize", updateDesktopStage, { passive: true });
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", updateDesktopStage, { passive: true });
  }

  // ---------------------------------------------------------------
  // HERO CLAIM — equal rectangles + live FUN cutout/window
  // ---------------------------------------------------------------
  const hero = document.querySelector(".hero");
  const heroFunBox = document.querySelector(".hero-claim-box-fun");
  const heroSeriousBox = document.querySelector(".hero-claim-box-serious");
  const heroFunLabel = document.getElementById("hero-fun-label");
  const heroSeriousLabel = document.getElementById("hero-serious-label");
  const heroFunCanvas = document.getElementById("hero-fun-window");
  const lavaCanvasForHero = document.getElementById("lava-canvas");

  const claimMeasureCanvas = document.createElement("canvas");
  const claimMeasureCtx = claimMeasureCanvas.getContext("2d");

  function claimFont(el, sizePx) {
    const cs = getComputedStyle(el);
    return `${cs.fontWeight || 900} ${sizePx}px ${cs.fontFamily}`;
  }

  function visualMetrics(el, text, sizePx) {
    claimMeasureCtx.font = claimFont(el, sizePx);
    const m = claimMeasureCtx.measureText(text);
    return {
      width: m.width,
      ascent: m.actualBoundingBoxAscent || sizePx * 0.76,
      descent: m.actualBoundingBoxDescent || sizePx * 0.18
    };
  }

  function fitHeroClaim() {
    if (!heroFunLabel || !heroSeriousLabel || !heroFunBox || !heroSeriousBox) return;

    const mobile = matchMedia("(max-width: 719px)").matches;
    const landscapeMobile = mobile && matchMedia("(orientation: landscape)").matches;

    // FUN remains the master block. On mobile both halves can grow a little
    // more because the solid fill is much more legible than the old lava cutout.
    let low = 24;
    let high = 300;
    const funMaxW = heroFunBox.clientWidth * (mobile ? 0.94 : 0.90);
    const funMaxH = heroFunBox.clientHeight * (mobile ? 0.90 : 0.86);

    for (let i = 0; i < 22; i++) {
      const mid = (low + high) / 2;
      const m = visualMetrics(heroFunLabel, "FUN", mid);
      const visualH = m.ascent + m.descent;
      if (m.width <= funMaxW && visualH <= funMaxH) low = mid;
      else high = mid;
    }

    const funSize = Math.max(24, low - 0.2);
    heroFunLabel.style.setProperty("font-size", `${funSize}px`, "important");
    const fm = visualMetrics(heroFunLabel, "FUN", funSize);
    const funVisualHeight = fm.ascent + fm.descent;

    // The three-line block is deliberately a touch smaller in perceived mass
    // than FUN, while sharing the same optical horizontal centre line.
    const targetVisualHeight = funVisualHeight * (mobile ? 0.96 : 0.91);
    const lines = ["IS A", "SERIOUS", "THING."];
    low = 10;
    high = 160;
    const seriousMaxW = heroSeriousBox.clientWidth * (mobile ? 0.98 : 0.96);
    const lineHeight = mobile ? 0.82 : 0.82;

    for (let i = 0; i < 22; i++) {
      const mid = (low + high) / 2;
      const ms = lines.map(line => visualMetrics(heroSeriousLabel, line, mid));
      const maxW = Math.max(...ms.map(m => m.width));
      const lineAdvance = mid * lineHeight;
      const totalVisualH = ms[0].ascent + (lineAdvance * 2) + ms[2].descent;
      if (maxW <= seriousMaxW && totalVisualH <= targetVisualHeight) low = mid;
      else high = mid;
    }

    heroSeriousLabel.style.setProperty("font-size", `${Math.max(10, low - 0.2)}px`, "important");
  }

  function drawHeroFunWindow() {
    if (!heroFunCanvas || !heroFunBox || !heroFunLabel || !lavaCanvasForHero) return;

    const boxRect = heroFunBox.getBoundingClientRect();
    const labelRect = heroFunLabel.getBoundingClientRect();
    const lavaRect = lavaCanvasForHero.getBoundingClientRect();
    if (boxRect.width < 2 || boxRect.height < 2) return;

    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(boxRect.width * dpr));
    const h = Math.max(1, Math.round(boxRect.height * dpr));

    if (heroFunCanvas.width !== w || heroFunCanvas.height !== h) {
      heroFunCanvas.width = w;
      heroFunCanvas.height = h;
    }
    heroFunCanvas.style.width = `${boxRect.width}px`;
    heroFunCanvas.style.height = `${boxRect.height}px`;

    const ctx = heroFunCanvas.getContext("2d");
    const scaleX = lavaCanvasForHero.width / Math.max(1, lavaRect.width);
    const scaleY = lavaCanvasForHero.height / Math.max(1, lavaRect.height);
    const sx = Math.max(0, Math.round((boxRect.left - lavaRect.left) * scaleX));
    const sy = Math.max(0, Math.round((boxRect.top - lavaRect.top) * scaleY));
    const sw = Math.max(1, Math.min(lavaCanvasForHero.width - sx, Math.round(boxRect.width * scaleX)));
    const sh = Math.max(1, Math.min(lavaCanvasForHero.height - sy, Math.round(boxRect.height * scaleY)));

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(lavaCanvasForHero, sx, sy, sw, sh, 0, 0, w, h);

    ctx.globalCompositeOperation = "destination-in";
    const cs = getComputedStyle(heroFunLabel);
    const fontSize = parseFloat(cs.fontSize) * dpr;
    ctx.font = `${cs.fontWeight || 900} ${fontSize}px ${cs.fontFamily}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#000";
    const metrics = ctx.measureText("FUN");
    const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.78;
    const descent = metrics.actualBoundingBoxDescent || fontSize * 0.18;
    const glyphH = ascent + descent;
    const labelX = (labelRect.left - boxRect.left) * dpr;
    const labelY = ((labelRect.top - boxRect.top) * dpr) + ((labelRect.height * dpr - glyphH) / 2) + ascent;
    ctx.fillText("FUN", labelX, labelY);
    ctx.globalCompositeOperation = "source-over";

    hero?.classList.add("fun-window-ready");
  }

  async function startHeroClaim() {
    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch {}
    }
    fitHeroClaim();
  }

  addEventListener("resize", fitHeroClaim, { passive: true });
  if (window.visualViewport) visualViewport.addEventListener("resize", fitHeroClaim, { passive: true });
  startHeroClaim();

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