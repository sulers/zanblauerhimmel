document.addEventListener("DOMContentLoaded", function () {
  var STORAGE_KEY = "bh-lang";
  var textNodes = document.querySelectorAll("[data-de][data-en]");
  var placeholderNodes = document.querySelectorAll(
    "[data-de-placeholder][data-en-placeholder]"
  );
  var langButtons = document.querySelectorAll("[data-lang-btn]");

  function applyLang(lang) {
    textNodes.forEach(function (el) {
      var text = lang === "en" ? el.getAttribute("data-en") : el.getAttribute("data-de");
      if (text !== null) {
        el.textContent = text;
      }
    });
    placeholderNodes.forEach(function (el) {
      var text =
        lang === "en"
          ? el.getAttribute("data-en-placeholder")
          : el.getAttribute("data-de-placeholder");
      if (text !== null) {
        el.setAttribute("placeholder", text);
      }
    });
    langButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });
    document.documentElement.setAttribute("lang", lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* localStorage unavailable — fine, just won't persist */
    }
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"));
    });
  });

  var saved = null;
  try {
    saved = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  // Default is German; only switch if the visitor previously chose English
  if (saved === "en") {
    applyLang("en");
  }
});
