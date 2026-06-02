(function () {
  "use strict";

  /* ── Article catalogue ── */
  var ARTICLES = [
    {
      title:    "The Marshall Plan in Context: Reassessing Historical Conditions",
      tag:      "Historical Analysis",
      date:     "April 24, 2026",
      author:   "Ari Yamashita",
      url:      "article-marshall-plan-context.html",
      image:    "https://www.trumanlibrary.gov/public/styles/tiff_conversion/public/photographs/73/73-3398.tif.jpg?VersionId=ASkwlcHnHcPt36c_0wKEjDOINIgQ_YaE&itok=c9QiuJ8x",
      keywords: "marshall plan germany europe truman wwii world war reconstruction cold war bipolar industrial history foreign aid congress vandenberg kennan eca oeec erp"
    },
    {
      title:    "What Iraq and Afghanistan Reveal about the Foreign Aid Debate",
      tag:      "Commentary",
      date:     "May 26, 2026",
      author:   "Ari Yamashita",
      url:      "article-iraq-afghanistan.html",
      image:    "https://tse2.mm.bing.net/th/id/OIP.zRj2SeLPPhTzIgn9kd_57wHaEK?r=0&cb=thfvnextfalcon&rs=1&pid=ImgDetMain&o=7&rm=3",
      keywords: "iraq afghanistan foreign aid debate humanitarian military reconstruction usaid failure polarization pew research spending budget sigar beltway bandits polio health"
    },
    {
      title:    "Policy Recommendations for Ukraine",
      tag:      "Policy Brief",
      date:     "May 31, 2026",
      author:   "Ari Yamashita",
      url:      "article-ukraine.html",
      image:    "https://i.insider.com/64151705e4a9f30018a6c238?width=2000&format=jpeg&auto=webp",
      keywords: "ukraine russia war reconstruction marshall plan eu nato military aid economic labor capital stability hryvnia corruption wef cfr world bank refugees army of recovery"
    },
    {
      title:    "What Makes a Successful Foreign Aid Plan?",
      tag:      "Policy Brief",
      date:     "June 1, 2026",
      author:   "Ari Yamashita",
      url:      "article-what-makes-successful-aid.html",
      image:    "https://education.cfr.org/sites/default/files/images/image/2024/03/Development.jpg",
      keywords: "foreign aid success germany japan somalia haiti kosovo iraq afghanistan nation-building conditions recommendations rand dobbins usaid civilian pdd56 spoils system reconstruction"
    }
  ];

  /* ── Sticky header shadow ── */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8
        ? "0 4px 28px rgba(10,16,24,0.45)"
        : "none";
    }, { passive: true });
  }

  /* ── Build & inject search overlay ── */
  var overlayEl = document.createElement("div");
  overlayEl.className = "search-overlay";
  overlayEl.id = "searchOverlay";
  overlayEl.setAttribute("aria-hidden", "true");
  overlayEl.innerHTML =
    '<div class="search-overlay-box">' +
      '<div class="search-bar">' +
        '<svg class="search-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
          '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>' +
        '</svg>' +
        '<input type="text" class="search-field" id="searchField"' +
          ' placeholder="Search articles" autocomplete="off" spellcheck="false" />' +
        '<button class="search-close-btn" id="searchClose" aria-label="Close search">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<path d="M18 6 6 18M6 6l12 12"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div id="searchResults"></div>' +
    '</div>';
  document.body.appendChild(overlayEl);

  var searchField    = document.getElementById("searchField");
  var searchResults  = document.getElementById("searchResults");
  var searchCloseBtn = document.getElementById("searchClose");

  function openSearch() {
    overlayEl.classList.add("is-open");
    overlayEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(function () { searchField.focus(); }, 60);
    renderResults("");
  }

  function closeSearch() {
    overlayEl.classList.remove("is-open");
    overlayEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    searchField.value = "";
    searchResults.innerHTML = "";
  }

  function cardHTML(a) {
    return (
      '<a href="' + a.url + '" class="card card--portrait">' +
        '<div class="card-art">' +
          '<img src="' + a.image + '" alt="' + a.title.replace(/"/g, "&quot;") + '" />' +
        '</div>' +
        '<div class="card-body">' +
          '<span class="card-tag">' + a.tag + '</span>' +
          '<h3 class="card-title">' + a.title + '</h3>' +
          '<div class="card-meta">' +
            '<span class="card-author">' + a.author + '</span>' +
            '<span class="card-dot">·</span>' +
            '<span>' + a.date + '</span>' +
          '</div>' +
        '</div>' +
      '</a>'
    );
  }

  function renderResults(query) {
    var q = query.trim().toLowerCase();
    var matches, countLabel;

    if (!q) {
      searchResults.innerHTML =
        '<div class="search-result-count">ALL ARTICLES</div>' +
        '<div class="search-result-grid">' + ARTICLES.map(cardHTML).join("") + '</div>';
      return;
    }

    matches = ARTICLES.filter(function (a) {
      return (
        a.title.toLowerCase().indexOf(q)    !== -1 ||
        a.tag.toLowerCase().indexOf(q)      !== -1 ||
        a.keywords.toLowerCase().indexOf(q) !== -1 ||
        a.author.toLowerCase().indexOf(q)   !== -1
      );
    });

    if (!matches.length) {
      searchResults.innerHTML =
        '<p class="search-empty-msg">No articles found for “' + q + '”.</p>';
      return;
    }

    countLabel = matches.length === 1 ? "1 RESULT" : matches.length + " RESULTS";
    searchResults.innerHTML =
      '<div class="search-result-count">' + countLabel + '</div>' +
      '<div class="search-result-grid">' + matches.map(cardHTML).join("") + '</div>';
  }

  /* ── Wire search button ── */
  var searchBtn = document.querySelector(".btn-search");
  if (searchBtn) {
    searchBtn.addEventListener("click", openSearch);
  }
  searchCloseBtn.addEventListener("click", closeSearch);
  searchField.addEventListener("input", function () { renderResults(searchField.value); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlayEl.classList.contains("is-open")) closeSearch();
  });
  overlayEl.addEventListener("click", function (e) {
    if (e.target === overlayEl) closeSearch();
  });

  /* ── Burger menu ── */
  var burger  = document.querySelector(".btn-burger");
  var mainNav = document.querySelector(".main-nav");
  if (burger && mainNav) {
    burger.addEventListener("click", function () {
      var open = mainNav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open);
    });
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", false);
      });
    });
  }

})();
