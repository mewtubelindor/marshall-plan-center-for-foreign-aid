(function () {
  "use strict";

  // Sticky header shadow on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow = window.scrollY > 8
        ? "0 4px 28px rgba(10,16,24,0.45)"
        : "none";
    }, { passive: true });
  }

  // Search button
  const searchBtn = document.querySelector(".btn-search");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const q = prompt("Search the Marshall Plan Center:");
      if (q && q.trim()) alert(`Searching: "${q.trim()}"\n(Search coming soon)`);
    });
  }

})();

// Burger menu
const burger = document.querySelector('.btn-burger');
const mainNav = document.querySelector('.main-nav');
if (burger && mainNav) {
  burger.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
  });
  // Close on nav link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}