document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".header");
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  window.addEventListener("scroll", function () {
    if (window.scrollY > 8) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });
    // Close mobile menu after tapping a link
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
      });
    });
  }
});
