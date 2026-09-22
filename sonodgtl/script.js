(() => {
  const stage = document.getElementById("sd-stage");
  const shell = document.getElementById("sd-shell");
  const DESIGN_WIDTH = 1120;
  const BREAKPOINT = 980;

  function isFineDesktop() {
    return navigator.maxTouchPoints === 0
      && matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function updateScale() {
    if (!stage || !shell) return;
    if (!isFineDesktop() || innerWidth >= BREAKPOINT) {
      document.documentElement.classList.remove("sd-desktop-scaled");
      shell.style.removeProperty("transform");
      stage.style.removeProperty("height");
      return;
    }
    document.documentElement.classList.add("sd-desktop-scaled");
    const targetWidth = innerWidth * 0.80;
    const scale = targetWidth / DESIGN_WIDTH;
    shell.style.transform = `scale(${scale})`;
    requestAnimationFrame(() => {
      stage.style.height = `${Math.max(1, shell.getBoundingClientRect().height)}px`;
    });
  }

  updateScale();
  addEventListener("resize", updateScale, { passive: true });

  // ---------------------------------------------------------------
  // EMAIL FALLBACK — mailto first, structured webmail fallback second.
  // Browsers do not expose a reliable API telling us whether a local mail
  // handler exists. If the visitor stays on the page, reveal copyable fields.
  // ---------------------------------------------------------------
  const writeButton = document.getElementById("sd-write-me");
  const emailFallback = document.getElementById("email-fallback");
  const emailFallbackClose = document.getElementById("email-fallback-close");
  const lang = document.documentElement.lang === "it" ? "it" : "en";
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
    const original = button?.textContent || "";
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
      }
      if (button) {
        button.textContent = lang === "it" ? "COPIATO" : "COPIED";
        setTimeout(() => { button.textContent = original; }, 900);
      }
    } catch {
      const selection = window.getSelection?.();
      const range = document.createRange?.();
      if (selection && range) {
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      if (button) {
        button.textContent = lang === "it" ? "SELEZIONATO" : "SELECTED";
        setTimeout(() => { button.textContent = original; }, 1200);
      }
    }
  }

  if (writeButton) {
    writeButton.addEventListener("click", (event) => {
      const href = writeButton.getAttribute("href") || "";
      if (!href.startsWith("mailto:")) return;
      event.preventDefault();

      clearTimeout(emailFallbackTimer);
      window.location.href = href;
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

  addEventListener("keydown", (event) => {
    if (event.key === "Escape" && emailFallback && !emailFallback.hidden) {
      closeEmailFallback();
    }
  });
})();
