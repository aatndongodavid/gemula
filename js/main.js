(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------
     Checkerboard pattern generator
     4 cols x 3 rows, alternating orange / white like the Gemula flag
  ----------------------------------------------------------- */
  var PATTERN = [
    1, 0, 1, 0,
    0, 1, 0, 1,
    1, 0, 1, 0
  ];

  function buildFlag(container, tag) {
    if (!container) return;
    container.innerHTML = "";
    PATTERN.forEach(function (isOn, i) {
      var col = i % 4;
      var el = document.createElement(tag || "i");
      el.className = isOn ? "on" : "off";
      el.style.setProperty("--col", col);
      container.appendChild(el);
    });
  }

  buildFlag(document.getElementById("nav-flag"), "i");
  buildFlag(document.getElementById("footer-flag"), "i");
  buildFlag(document.getElementById("hero-flag"), "i");
  buildFlag(document.getElementById("device-flag"), "i");
  buildFlag(document.getElementById("intro-flag"), "span");

  /* -----------------------------------------------------------
     Intro loader — squares ignite one by one, then fade out
  ----------------------------------------------------------- */
  (function introSequence() {
    var loader = document.getElementById("intro-loader");
    if (!loader) return;

    if (prefersReducedMotion) {
      loader.classList.add("is-hidden");
      return;
    }

    var squares = loader.querySelectorAll(".intro-flag span");
    squares.forEach(function (sq, i) {
      setTimeout(function () {
        sq.classList.add("lit");
      }, 90 * i);
    });

    var totalTime = 90 * squares.length + 550;
    setTimeout(function () {
      loader.classList.add("is-hidden");
    }, totalTime);

    setTimeout(function () {
      loader.remove();
    }, totalTime + 700);
  })();

  /* -----------------------------------------------------------
     Nav — shrink on scroll + active link (scrollspy)
  ----------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var navLinks = document.querySelectorAll("[data-nav]");
  var sections = Array.prototype.slice.call(
    document.querySelectorAll("main > section[id]")
  );

  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }

    var scrollPos = window.scrollY + window.innerHeight * 0.3;
    var current = sections[0] ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      var isMatch = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", isMatch);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* -----------------------------------------------------------
     Mobile menu
  ----------------------------------------------------------- */
  var burger = document.getElementById("burger");
  var mobilePanel = document.getElementById("mobile-panel");
  if (burger && mobilePanel) {
    burger.addEventListener("click", function () {
      var isOpen = mobilePanel.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    mobilePanel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobilePanel.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------
     Scroll reveal
  ----------------------------------------------------------- */
  var revealTargets = document.querySelectorAll(".reveal, .stagger");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* -----------------------------------------------------------
     Project filters
  ----------------------------------------------------------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");

      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(" ");
        var show = filter === "tous" || cats.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* -----------------------------------------------------------
     Smooth-scroll offset correction for fixed nav
  ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav ? nav.offsetHeight : 0;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  });
})();
