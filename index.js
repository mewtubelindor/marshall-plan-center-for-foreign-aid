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