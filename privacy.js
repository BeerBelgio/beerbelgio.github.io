(() => {
  const panel = document.getElementById("privacy-panel");
  if (!panel) return;

  const openers = Array.from(document.querySelectorAll("[data-privacy-open]"));
  const closers = Array.from(panel.querySelectorAll("[data-privacy-close]"));
  let returnFocus = null;

  function focusables() {
    return Array.from(panel.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((el) => !el.hasAttribute("hidden") && el.getClientRects().length);
  }

  function setExpanded(value) {
    openers.forEach((el) => el.setAttribute("aria-expanded", String(value)));
  }

  function openPrivacy(opener) {
    if (!panel.hidden) return;
    returnFocus = opener || document.activeElement;
    panel.hidden = false;
    document.body.classList.add("privacy-open");
    setExpanded(true);
    requestAnimationFrame(() => {
      const target = panel.querySelector("[data-privacy-close]") || focusables()[0];
      target?.focus();
    });
  }

  function closePrivacy() {
    if (panel.hidden) return;
    panel.hidden = true;
    document.body.classList.remove("privacy-open");
    setExpanded(false);
    if (returnFocus && typeof returnFocus.focus === "function") returnFocus.focus();
    returnFocus = null;
  }

  openers.forEach((opener) => opener.addEventListener("click", () => openPrivacy(opener)));
  closers.forEach((closer) => closer.addEventListener("click", closePrivacy));

  panel.addEventListener("click", (event) => {
    if (event.target === panel) closePrivacy();
  });

  document.addEventListener("keydown", (event) => {
    if (panel.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closePrivacy();
      return;
    }
    if (event.key !== "Tab") return;

    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
