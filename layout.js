/* =========================================================================
   layout.js — shared navigation bar and footer for every page.
   Edit the site name, menu items, and footer text HERE, once.
   Each page only needs:
     <div id="site-nav"></div>   (top of .wrap)
     <div id="site-footer"></div> (bottom of .wrap)
     <script src="layout.js"></script>  (before </body>)
   ========================================================================= */

(function () {
  var SITE_NAME = "Nikolaos (Nikos) Koutroumanis";

  // label: text shown in the menu · href: the file it links to
  var MENU = [
    { label: "about",        href: "index.html" },
    { label: "experience",   href: "experience.html" },
    { label: "publications", href: "publications.html" },
    { label: "teaching",     href: "teaching.html" }
  ];

  var FOOTER_HTML =
    '© <span id="yr"></span> ' + SITE_NAME + '. Archimedes AI Unit, Athena Research Center.';

  // ---- Which page am I on? (for the active menu highlight) ----
  var current = location.pathname.split("/").pop() || "index.html";
  if (current === "") current = "index.html";

  // ---- Build the nav ----
  var items = MENU.map(function (m) {
    var active = m.href === current ? ' class="active"' : "";
    return '<li><a href="' + m.href + '"' + active + ">" + m.label + "</a></li>";
  }).join("\n        ");

  var navHTML =
    '<nav class="site-nav">' +
      '<div class="bar">' +
        '<a href="index.html" class="brand">' + SITE_NAME + "</a>" +
        '<div class="nav-right">' +
          "<ul>\n        " + items + "\n      </ul>" +
          '<button class="theme-toggle" id="themeToggle" type="button" ' +
            'aria-label="Toggle dark and light theme" title="Toggle theme">' +
            '<span class="icon-dark"><i class="fa-solid fa-moon"></i></span>' +
            '<span class="icon-light"><i class="fa-solid fa-sun"></i></span>' +
          "</button>" +
        "</div>" +
      "</div>" +
    "</nav>" +
    '<hr class="nav-rule">';

  // ---- Mount nav + footer ----
  var navMount = document.getElementById("site-nav");
  if (navMount) navMount.outerHTML = navHTML;

  var footMount = document.getElementById("site-footer");
  if (footMount) {
    footMount.className = "site-footer";
    footMount.innerHTML = FOOTER_HTML;
  }

  // ---- Year in footer ----
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- Theme toggle (default dark, persisted in localStorage) ----
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
})();