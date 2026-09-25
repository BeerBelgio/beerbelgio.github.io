(() => {
  const body = document.body;
  const lavaToggle = document.getElementById("lava-toggle");
  const lavaBack = document.getElementById("lava-back");
  const lavaInfo = document.getElementById("lava-info");
  const lavaInfoPanel = document.getElementById("lava-info-panel");
  const lavaInfoClose = document.getElementById("lava-info-close");
  const siteStage = document.getElementById("site-stage");
  const siteShell = document.getElementById("site-shell");

  // ---------------------------------------------------------------
  // HUB LANGUAGE — in-place switch, no page reload.
  // The LAVA canvas and its live physics stay untouched while only copy,
  // metadata and language-aware links are updated. Preference is shared with
  // sonoDGTL through localStorage.
  // ---------------------------------------------------------------
  const LANGUAGE_STORAGE_KEY = "beerbelgio-language";
  let currentLanguage = document.documentElement.lang.toLowerCase().startsWith("it") ? "it" : "en";
  const isItalian = () => currentLanguage === "it";

  const HUB_COPY = {
    en: {
      description: "Music, digital strategy and useful ideas from unexpected angles. Fun is a serious thing.",
      pageControls: "Page controls",
      switchLabel: "Switch to Italian version",
      switchText: "ITA",
      switchHref: "/it/",
      switchHreflang: "it",
      privacyOpen: "Open privacy information",
      lavaBack: "BACK",
      lavaBackAria: "Exit full lava mode",
      lavaInfoAria: "Full Lava controls",
      lavaInfoCloseAria: "Close Full Lava controls",
      lavaInfoCopy: '<span><strong>MOVE</strong> the pointer through the field to create a perturbation.</span><span><strong>SCROLL</strong> around to push the whole field and affect the blobs.</span><span><strong>GRAB &amp; DRAG</strong> a blob, move it and release it — throw it, play with it.</span><span><strong>5+5</strong> clicks on empty space will repel the blobs, then attract them. Drive ’em crazy.</span>',
      privacyCloseAria: "Close privacy information",
      privacyIntro: "This site is intentionally light on tracking.",
      privacyCopy: '<section><h3>THIS SITE</h3><p>No first-party analytics, advertising pixels, profiling or marketing trackers are used by this website.</p></section><section><h3>HOSTING</h3><p>The site is hosted with GitHub Pages. GitHub states that visitors’ IP addresses are logged and stored for security purposes. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub Privacy Statement <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>YOUTUBE</h3><p>Embedded videos are loaded only after you choose to play them and use YouTube’s Privacy-Enhanced Mode (<code>youtube-nocookie.com</code>). Once activated, Google / YouTube may process data under their own policies. <a href="https://support.google.com/youtube/answer/171780?hl=en" target="_blank" rel="noopener noreferrer">About Privacy-Enhanced Mode <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>EXTERNAL LINKS</h3><p>Music, social and professional links open third-party services. Their own privacy terms apply once you leave this site.</p></section><section><h3>CONTACT DATA</h3><p>“Write me” first tries to open your email app through a <code>mailto:</code> link; if no handler takes over, the site shows TO, SUBJECT and MESSAGE as separate fields you can copy into your webmail. This website does not submit or store the message itself. If you email Matteo, the data you voluntarily provide are used to reply to your request and manage the related correspondence. The legal basis is taking steps at your request before a possible collaboration where applicable (GDPR Art. 6(1)(b)); otherwise, the legitimate interest in answering and managing correspondence (Art. 6(1)(f)). Providing contact data is voluntary.</p></section><section><h3>EMAIL PROVIDER</h3><p>Email is received through Gmail / Google. Google may process that correspondence under its own privacy terms and applicable international-transfer safeguards. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>RETENTION &amp; RIGHTS</h3><p>Correspondence is kept only as long as reasonably needed for the request, any resulting relationship and applicable legal or accounting obligations. No automated decision-making or profiling is carried out by Matteo through this site. Where the GDPR applies, you may request access, correction, deletion, restriction, objection or portability where applicable, and you may lodge a complaint with the competent supervisory authority.</p></section><section><h3>CONTROLLER / CONTACT</h3><p>Matteo Belgiovine — Turin, Italy<br><a href="mailto:matteo.sonodgtl@gmail.com">matteo.sonodgtl@gmail.com</a></p></section>',
      privacyUpdated: "Last updated: 25 September 2026.",
      country: "ITALY",
      beerHeroAria: "Go to BeerBelgio links",
      beerTagline: "GLITCH DESIGNER FOR<br>MISBEHAVING SOUNDS",
      beerMeta: ["MUSIC", "DIGITAL CURIOSITY", "VISUAL EXPERIMENTS"],
      sonoHeroAria: "Open sonoDGTL",
      sonoTagline: "DIGITAL STRATEGIES FOR<br>REAL-WORLD PROJECTS",
      sonoMeta: ["MARKETING", "BRAND DEVELOPMENT", "DIGITAL WORKFLOWS"],
      platformsAria: "Main platforms",
      shareAria: "Share this site",
      videoAria: "Play Sounds Like Something on YouTube",
      beerMusic: "Music I've Made",
      beerMusicMeta: "SPOTIFY PLAYLIST",
      journalMeta: "TELEGRAM BROADCAST",
      supportMeta: "SUPPORT MY WORK",
      sonoCard: 'Digital Strategies for <br class="mobile-only-break">Real-World Projects<small>OPEN THE WEBSITE<span class="sonodgtl-cta-separator"> — </span><br class="mobile-only-break">LET’S WORK TOGETHER!</small>',
      sonoHref: "/sonodgtl/",
      contactTitle: '<span class="contact-line contact-line-one"><span>WORKING ON</span> <span>SOMETHING</span></span><span class="contact-line contact-line-two"><span>WEIRD</span> <span>AND COOL?</span></span>',
      writeLabel: "WRITE ME",
      mailto: "mailto:matteo.sonodgtl@gmail.com?subject=Something%20weird%20and%20cool&body=Hi%20Matteo%2C%0A%0AWHO%20I%20AM%3A%0A%0AMY%20LINKS%3A%0A%0AWHAT%20I%27M%20WORKING%20ON%3A%0A%0AWHY%20AM%20I%20WRITING%20TO%20YOU%3A%0A",
      emailCloseAria: "Close email details",
      emailTitle: "NO MAIL APP?",
      emailIntro: "Use these three fields in your webmail.",
      emailLabels: ["TO", "SUBJECT", "MESSAGE"],
      emailSubject: "Something weird and cool",
      emailBody: "Hi Matteo,\n\nWHO I AM:\n\nMY LINKS:\n\nWHAT I'M WORKING ON:\n\nWHY AM I WRITING TO YOU:",
      copy: "COPY"
    },
    it: {
      description: "Musica, strategia digitale e idee utili da angolazioni inaspettate. Fun is a serious thing.",
      pageControls: "Controlli pagina",
      switchLabel: "Passa alla versione inglese",
      switchText: "EN",
      switchHref: "/",
      switchHreflang: "en",
      privacyOpen: "Apri le informazioni privacy",
      lavaBack: "INDIETRO",
      lavaBackAria: "Esci dalla modalità Full Lava",
      lavaInfoAria: "Comandi Full Lava",
      lavaInfoCloseAria: "Chiudi i comandi Full Lava",
      lavaInfoCopy: '<span><strong>MUOVI</strong> il puntatore nel campo per creare una perturbazione.</span><span><strong>SCORRI</strong> per spingere l’intero campo e influenzare le bolle.</span><span><strong>AFFERRA &amp; TRASCINA</strong> una bolla, spostala e rilasciala — lanciala, giocaci.</span><span><strong>5+5</strong> click sullo spazio vuoto respingono le bolle, poi le attraggono. Falle impazzire.</span>',
      privacyCloseAria: "Chiudi le informazioni privacy",
      privacyIntro: "Questo sito è volutamente leggero sul tracciamento.",
      privacyCopy: '<section><h3>QUESTO SITO</h3><p>Il sito non utilizza analytics di prima parte, pixel pubblicitari, profilazione o tracker di marketing.</p></section><section><h3>HOSTING</h3><p>Il sito è ospitato tramite GitHub Pages. GitHub dichiara che gli indirizzi IP dei visitatori vengono registrati e conservati per finalità di sicurezza. <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">Privacy Statement di GitHub <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>YOUTUBE</h3><p>I video incorporati vengono caricati solo dopo che scegli di riprodurli e utilizzano la modalità Privacy-Enhanced di YouTube (<code>youtube-nocookie.com</code>). Dopo l’attivazione, Google / YouTube possono trattare dati secondo le proprie informative. <a href="https://support.google.com/youtube/answer/171780?hl=it" target="_blank" rel="noopener noreferrer">Informazioni sulla modalità Privacy-Enhanced <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>LINK ESTERNI</h3><p>I link musicali, social e professionali aprono servizi di terze parti. Una volta lasciato questo sito si applicano le rispettive informative privacy.</p></section><section><h3>DATI DI CONTATTO</h3><p>“Scrivimi” prova ad aprire l’app email tramite un link <code>mailto:</code>; se non viene gestito, il sito mostra i campi destinatario, oggetto e messaggio da copiare nella propria webmail. Questo sito non invia né memorizza direttamente il messaggio. Se scrivi a Matteo, i dati forniti volontariamente vengono utilizzati per rispondere alla richiesta e gestire la relativa corrispondenza. La base giuridica è l’esecuzione di misure precontrattuali richieste dall’interessato, quando applicabile (art. 6(1)(b) GDPR); negli altri casi, il legittimo interesse a rispondere e gestire la corrispondenza (art. 6(1)(f)). Il conferimento dei dati di contatto è volontario.</p></section><section><h3>FORNITORE EMAIL</h3><p>Le email vengono ricevute tramite Gmail / Google. Google può trattare la corrispondenza secondo la propria informativa privacy e le garanzie applicabili ai trasferimenti internazionali. <a href="https://policies.google.com/privacy?hl=it" target="_blank" rel="noopener noreferrer">Privacy Policy di Google <img class="privacy-link-arrow" src="/assets/icon-arrow-up-right.svg?v=1101" alt="" aria-hidden="true"></a></p></section><section><h3>CONSERVAZIONE E DIRITTI</h3><p>La corrispondenza viene conservata solo per il tempo ragionevolmente necessario alla richiesta, all’eventuale rapporto conseguente e agli obblighi legali o contabili applicabili. Matteo non effettua tramite questo sito processi decisionali automatizzati o profilazione. Nei casi previsti dal GDPR puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione o portabilità, quando applicabili, e presentare reclamo all’autorità di controllo competente.</p></section><section><h3>TITOLARE / CONTATTO</h3><p>Matteo Belgiovine — Torino, Italia<br><a href="mailto:matteo.sonodgtl@gmail.com">matteo.sonodgtl@gmail.com</a></p></section>',
      privacyUpdated: "Ultimo aggiornamento: 25 settembre 2026.",
      country: "ITALIA",
      beerHeroAria: "Vai ai link BeerBelgio",
      beerTagline: "GLITCH DESIGNER PER<br>SUONI INDISCIPLINATI",
      beerMeta: ["MUSICA", "CURIOSITÀ DIGITALE", "ESPERIMENTI VISIVI"],
      sonoHeroAria: "Apri sonoDGTL",
      sonoTagline: "STRATEGIE DIGITALI PER<br>PROGETTI REALI",
      sonoMeta: ["MARKETING", "SVILUPPO DEL BRAND", "DIGITALIZZAZIONE"],
      platformsAria: "Piattaforme principali",
      shareAria: "Condividi questo sito",
      videoAria: "Riproduci Sounds Like Something su YouTube",
      beerMusic: "Music I've Made",
      beerMusicMeta: "PLAYLIST SPOTIFY",
      journalMeta: "CANALE TELEGRAM",
      supportMeta: "SUPPORTA IL MIO LAVORO",
      sonoCard: 'Strategie digitali per <br class="mobile-only-break">progetti reali<small>APRI IL SITO <br class="mobile-only-break"><span class="sonodgtl-cta-separator">e </span>LAVORIAMO INSIEME!</small>',
      sonoHref: "/sonodgtl/it/",
      contactTitle: '<span class="contact-line contact-line-one"><span>LAVORI A</span> <span>QUALCOSA</span></span><span class="contact-line contact-line-two"><span>DI STRANO</span> <span>E FIGO?</span></span>',
      writeLabel: "SCRIVIMI",
      mailto: "mailto:matteo.sonodgtl@gmail.com?subject=Qualcosa%20di%20strano%20e%20figo&body=Ciao%20Matteo%2C%0A%0ACHI%20SONO%3A%0A%0AI%20MIEI%20LINK%3A%0A%0AA%20COSA%20STO%20LAVORANDO%3A%0A%0APERCH%C3%89%20TI%20STO%20SCRIVENDO%3A%0A",
      emailCloseAria: "Chiudi i dettagli email",
      emailTitle: "L’EMAIL NON SI APRE?",
      emailIntro: "Usa questi tre campi nella tua webmail.",
      emailLabels: ["DESTINATARIO", "OGGETTO", "MESSAGGIO"],
      emailSubject: "Qualcosa di strano e figo",
      emailBody: "Ciao Matteo,\n\nCHI SONO:\n\nI MIEI LINK:\n\nA COSA STO LAVORANDO:\n\nPERCHÉ TI STO SCRIVENDO:",
      copy: "COPIA"
    }
  };

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }
  function setHTML(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }
  function setAttr(selector, name, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(name, value);
  }

  function applyHubLanguage(lang, { historyMode = "none", persist = true } = {}) {
    if (!HUB_COPY[lang]) return;
    currentLanguage = lang;
    const copy = HUB_COPY[lang];

    document.documentElement.lang = lang;
    setAttr('meta[name="description"]', "content", copy.description);
    setAttr('meta[property="og:description"]', "content", copy.description);
    setAttr('meta[name="twitter:description"]', "content", copy.description);
    setAttr('link[rel="canonical"]', "href", lang === "it" ? "https://beerbelgio.github.io/it/" : "https://beerbelgio.github.io/");
    setAttr('meta[property="og:url"]', "content", lang === "it" ? "https://beerbelgio.github.io/it/" : "https://beerbelgio.github.io/");

    const languageLaunch = document.querySelector(".language-launch");
    if (languageLaunch) {
      languageLaunch.href = copy.switchHref;
      languageLaunch.hreflang = copy.switchHreflang;
      languageLaunch.lang = copy.switchHreflang;
      languageLaunch.setAttribute("aria-label", copy.switchLabel);
      const mark = languageLaunch.querySelector(".language-launch-mark");
      if (mark) mark.textContent = copy.switchText;
    }

    setAttr(".hero-controls", "aria-label", copy.pageControls);
    setAttr(".privacy-launch", "aria-label", copy.privacyOpen);
    if (lavaBack) { lavaBack.textContent = copy.lavaBack; lavaBack.setAttribute("aria-label", copy.lavaBackAria); }
    if (lavaInfo) lavaInfo.setAttribute("aria-label", copy.lavaInfoAria);
    if (lavaInfoClose) lavaInfoClose.setAttribute("aria-label", copy.lavaInfoCloseAria);
    setHTML(".lava-info-copy", copy.lavaInfoCopy);
    setAttr(".privacy-close", "aria-label", copy.privacyCloseAria);
    setText(".privacy-intro", copy.privacyIntro);
    setHTML(".privacy-copy", copy.privacyCopy);
    setText(".privacy-updated", copy.privacyUpdated);

    setText(".location-country", copy.country);
    const identityLinks = document.querySelectorAll(".identity-card-link");
    if (identityLinks[0]) {
      identityLinks[0].setAttribute("aria-label", copy.beerHeroAria);
      const tagline = identityLinks[0].querySelector(".identity-tagline"); if (tagline) tagline.innerHTML = copy.beerTagline;
      identityLinks[0].querySelectorAll(".identity-meta span").forEach((el, i) => { if (copy.beerMeta[i]) el.textContent = copy.beerMeta[i]; });
    }
    if (identityLinks[1]) {
      identityLinks[1].setAttribute("aria-label", copy.sonoHeroAria);
      identityLinks[1].href = copy.sonoHref;
      const tagline = identityLinks[1].querySelector(".identity-tagline"); if (tagline) tagline.innerHTML = copy.sonoTagline;
      identityLinks[1].querySelectorAll(".identity-meta span").forEach((el, i) => { if (copy.sonoMeta[i]) el.textContent = copy.sonoMeta[i]; });
    }

    setAttr(".platforms", "aria-label", copy.platformsAria);
    const shareButton = document.getElementById("share-site");
    if (shareButton) { shareButton.setAttribute("aria-label", copy.shareAria); shareButton.title = copy.shareAria; }
    const videoButton = document.getElementById("video-shell");
    if (videoButton) videoButton.setAttribute("aria-label", copy.videoAria);

    const beerLinks = document.querySelectorAll("#beerbelgio-links > a > span:first-child");
    if (beerLinks[0]) beerLinks[0].innerHTML = `${copy.beerMusic}<small>${copy.beerMusicMeta}</small>`;
    if (beerLinks[1]) beerLinks[1].innerHTML = `Sound Journal<small>${copy.journalMeta}</small>`;
    if (beerLinks[2]) beerLinks[2].innerHTML = `BeerMe!<small>${copy.supportMeta}</small>`;

    const sonoCardLink = document.querySelector("#sonodgtl-link > a");
    if (sonoCardLink) {
      sonoCardLink.href = copy.sonoHref;
      const first = sonoCardLink.querySelector("span:first-child");
      if (first) first.innerHTML = copy.sonoCard;
    }

    setHTML(".contact h2", copy.contactTitle);
    const writeButton = document.getElementById("hub-write-me");
    if (writeButton) {
      writeButton.href = copy.mailto;
      const arrow = writeButton.querySelector("img");
      writeButton.textContent = `${copy.writeLabel} `;
      if (arrow) writeButton.appendChild(arrow);
    }

    const fallbackClose = document.getElementById("email-fallback-close");
    if (fallbackClose) fallbackClose.setAttribute("aria-label", copy.emailCloseAria);
    setText("#email-fallback-title", copy.emailTitle);
    setText(".email-fallback-card > p", copy.emailIntro);
    const fields = document.querySelectorAll("#email-fallback .email-field");
    fields.forEach((field, i) => {
      const label = field.querySelector(":scope > span");
      const button = field.querySelector("button");
      if (label && copy.emailLabels[i]) label.textContent = copy.emailLabels[i];
      if (button) button.textContent = copy.copy;
    });
    setText("#email-fallback-subject", copy.emailSubject);
    setText("#email-fallback-body", copy.emailBody);

    if (persist) {
      try { localStorage.setItem(LANGUAGE_STORAGE_KEY, lang); } catch (_) {}
    }

    if (historyMode !== "none") {
      const target = new URL(lang === "it" ? "/it/" : "/", location.origin);
      target.search = location.search;
      target.hash = location.hash;
      if (historyMode === "replace") history.replaceState({ hubLanguage: lang }, "", target.pathname + target.search + target.hash);
      else history.pushState({ hubLanguage: lang }, "", target.pathname + target.search + target.hash);
    }

    requestAnimationFrame(updateDesktopStage);
  }

  const languageLaunch = document.querySelector(".language-launch");
  if (languageLaunch) {
    languageLaunch.addEventListener("click", (event) => {
      event.preventDefault();
      applyHubLanguage(currentLanguage === "it" ? "en" : "it", { historyMode: "push", persist: true });
    });
  }

  addEventListener("popstate", () => {
    const lang = location.pathname === "/it/" || location.pathname.startsWith("/it/") ? "it" : "en";
    applyHubLanguage(lang, { historyMode: "none", persist: true });
  });

  // Honour the last explicit site-language choice without reloading the page.
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if ((savedLanguage === "it" || savedLanguage === "en") && savedLanguage !== currentLanguage) {
      applyHubLanguage(savedLanguage, { historyMode: "replace", persist: false });
    }
  } catch (_) {}

  // Always land on the Hero. In touch portrait the document keeps a 110px
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
  // Keep one canonical 760px desktop composition and scale that single
  // design canvas to 45% of the CURRENT layout viewport. The outer stage is
  // centred by normal document flow; the shell itself never reflows.
  // ---------------------------------------------------------------
  const DESIGN_WIDTH = 760;
  const DESKTOP_REFERENCE_RATIO = 0.45;

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
      document.documentElement.style.removeProperty("--desktop-stage-width");
      return;
    }

    document.documentElement.classList.add("desktop-proportional");

    // clientWidth excludes the vertical scrollbar. Scaling from that value
    // keeps both gutters proportional at every desktop window width instead
    // of pinning one side once a fixed minimum gutter is reached.
    const layoutViewportWidth = Math.max(1, document.documentElement.clientWidth || innerWidth);
    const targetWidth = layoutViewportWidth * DESKTOP_REFERENCE_RATIO;
    const scale = targetWidth / DESIGN_WIDTH;

    siteShell.style.removeProperty("zoom");
    siteStage.style.setProperty("--desktop-stage-width", `${targetWidth}px`);
    document.documentElement.style.setProperty("--desktop-stage-width", `${targetWidth}px`);
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
        text: isItalian()
          ? "Musica, strategia digitale e idee utili da angolazioni inaspettate."
          : "Music, digital strategy and useful ideas from unexpected angles.",
        url: isItalian() ? "https://beerbelgio.github.io/it/" : "https://beerbelgio.github.io/"
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
        showShareToast(isItalian() ? "LINK COPIATO" : "LINK COPIED");
      } catch (error) {
        if (error?.name !== "AbortError") showShareToast(isItalian() ? "COPIA L’URL QUI SOPRA" : "COPY THE URL ABOVE");
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
        button.textContent = isItalian() ? "COPIATO" : "COPIED";
        setTimeout(() => { button.textContent = old; }, 900);
      }
    } catch {
      showShareToast(isItalian() ? "COPIA NON RIUSCITA — SELEZIONA IL TESTO" : "COPY FAILED — SELECT THE TEXT MANUALLY");
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
      const availableWidth = footer.clientWidth - padLeft - padRight;
      const fitRatio = document.documentElement.classList.contains("desktop-proportional") ? 1 : 0.985;
      const target = availableWidth * fitRatio;

      // getBoundingClientRect() includes the ancestor transform used by the
      // proportional desktop stage, while clientWidth above does not. Convert
      // the measured motto back into the same untransformed coordinate space.
      const footerRect = footer.getBoundingClientRect();
      const visualScale = footer.clientWidth > 0 ? (footerRect.width / footer.clientWidth) : 1;
      const safeScale = Number.isFinite(visualScale) && visualScale > 0 ? visualScale : 1;

      let low = 10;
      let high = 140;

      for (let i = 0; i < 18; i++) {
        const mid = (low + high) / 2;
        mottoFit.style.fontSize = `${mid}px`;

        const measuredWidth = mottoFit.getBoundingClientRect().width / safeScale;
        if (measuredWidth <= target) low = mid;
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
      // Portrait uses the dedicated SVG engine below. Avoid animating the
      // hidden HTML duplicate layers at the same time on mobile.
      if (!isTouchPortrait()) {
        const blobs = window.BeerBelgioLava.getBlobs();
        ensureLayers(blobs.length);

        const funRect = mottoFun.getBoundingClientRect();
        const restRect = mottoRest.getBoundingClientRect();

        for (let i = 0; i < blobs.length; i++) {
          updateRoleLayer(funLayers[i], blobs[i], funRect, "fun", time);
          updateRoleLayer(restLayers[i], blobs[i], restRect, "rest", time);
        }
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

  // ---------------------------------------------------------------
  // UNIVERSAL FINAL CLAIM — V1.0
  //
  // Reuses the exact V0.55.1.15 / claim-portrait-end.svg construction.
  // The base artwork is black + white; live duplicate SVG paths are softly
  // masked by each lava blob so the promoted per-family reactive palette is
  // preserved identically on desktop, portrait and landscape.
  // ---------------------------------------------------------------
  const portraitMottoSvg = document.getElementById("motto-portrait-svg");
  const portraitMottoDefs = document.getElementById("motto-portrait-defs");
  const portraitMottoRoot = document.getElementById("motto-portrait-reactive-root");

  if (portraitMottoSvg && portraitMottoDefs && portraitMottoRoot && window.BeerBelgioLava?.getBlobs) {
    const SVG_NS = "http://www.w3.org/2000/svg";
    const PORTRAIT_VIEWBOX_W = 740;
    const PORTRAIT_VIEWBOX_H = 150;

    const PORTRAIT_PALETTE = {
      cream:   { fun: "#d1442d", rest: "#1c1713" },
      ink:     { fun: "#ffffff", rest: "#ec6b2d" },
      warm:    { fun: "#ffffff", rest: "#1c1713" },
      mustard: { fun: "#ffffff", rest: "#1c1713" },
      default: { fun: "#ffffff", rest: "#1c1713" }
    };

    let portraitLayers = [];
    let portraitLayerCount = -1;

    function svgEl(name) {
      return document.createElementNS(SVG_NS, name);
    }

    function ensurePortraitLayers(count) {
      if (count === portraitLayerCount) return;
      portraitLayerCount = count;

      for (const layer of portraitLayers) {
        layer.mask.remove();
        layer.gradient.remove();
      }
      portraitMottoRoot.replaceChildren();
      portraitLayers = [];

      for (let i = 0; i < count; i++) {
        const gradientId = `motto-portrait-gradient-${i}`;
        const maskId = `motto-portrait-mask-${i}`;

        const gradient = svgEl("radialGradient");
        gradient.id = gradientId;
        gradient.setAttribute("gradientUnits", "userSpaceOnUse");
        gradient.setAttribute("cx", "0");
        gradient.setAttribute("cy", "0");
        gradient.setAttribute("r", "1");

        const stops = [
          ["0%", "1"],
          ["74%", "1"],
          ["82%", ".96"],
          ["90%", ".55"],
          ["100%", "0"]
        ];
        for (const [offset, opacity] of stops) {
          const stop = svgEl("stop");
          stop.setAttribute("offset", offset);
          stop.setAttribute("stop-color", "#ffffff");
          stop.setAttribute("stop-opacity", opacity);
          gradient.appendChild(stop);
        }

        const mask = svgEl("mask");
        mask.id = maskId;
        mask.setAttribute("maskUnits", "userSpaceOnUse");
        mask.setAttribute("maskContentUnits", "userSpaceOnUse");
        mask.setAttribute("x", "0");
        mask.setAttribute("y", "0");
        mask.setAttribute("width", String(PORTRAIT_VIEWBOX_W));
        mask.setAttribute("height", String(PORTRAIT_VIEWBOX_H));

        const maskRect = svgEl("rect");
        maskRect.setAttribute("x", "0");
        maskRect.setAttribute("y", "0");
        maskRect.setAttribute("width", String(PORTRAIT_VIEWBOX_W));
        maskRect.setAttribute("height", String(PORTRAIT_VIEWBOX_H));
        maskRect.setAttribute("fill", `url(#${gradientId})`);
        mask.appendChild(maskRect);

        portraitMottoDefs.appendChild(gradient);
        portraitMottoDefs.appendChild(mask);

        const group = svgEl("g");
        group.setAttribute("mask", `url(#${maskId})`);

        const funUse = svgEl("use");
        funUse.setAttribute("href", "#motto-portrait-fun-shape");
        const restUse = svgEl("use");
        restUse.setAttribute("href", "#motto-portrait-rest-shape");
        group.append(funUse, restUse);
        portraitMottoRoot.appendChild(group);

        portraitLayers.push({ gradient, mask, funUse, restUse });
      }
    }

    function renderPortraitMotto(time) {
      const rect = portraitMottoSvg.getBoundingClientRect();
      if (rect.width > 1 && rect.height > 1) {
        const blobs = window.BeerBelgioLava.getBlobs();
        ensurePortraitLayers(blobs.length);

        const sx = PORTRAIT_VIEWBOX_W / rect.width;
        const sy = PORTRAIT_VIEWBOX_H / rect.height;

        for (let i = 0; i < blobs.length; i++) {
          const blob = blobs[i];
          const layer = portraitLayers[i];
          const palette = PORTRAIT_PALETTE[blob.family] || PORTRAIT_PALETTE.default;

          layer.funUse.setAttribute("fill", palette.fun);
          layer.restUse.setAttribute("fill", palette.rest);

          const cx = (blob.x - rect.left) * sx;
          const cy = (blob.y - rect.top) * sy;
          const rx = Math.max(0.01, blob.r * sx * (0.92 + 0.045 * Math.sin(blob.phase + time * 0.00018)));
          const ry = Math.max(0.01, blob.r * sy * (0.92 + 0.045 * Math.sin(blob.phase2 - time * 0.00014)));

          layer.gradient.setAttribute(
            "gradientTransform",
            `translate(${cx} ${cy}) scale(${rx} ${ry})`
          );
        }
      }

      requestAnimationFrame(renderPortraitMotto);
    }

    requestAnimationFrame(renderPortraitMotto);
  }
})();