/*
 * ===================================================================================
 *  DevlogMaker website settings: THE ONE PLACE TO EDIT prices and download links.
 * ===================================================================================
 *
 *  - Prices are set in Stripe (Dashboard -> Product catalog). Copy them here so the
 *    website matches what customers see at Stripe Checkout. Show prices the way your
 *    market expects (e.g. EU/UK consumers: VAT-inclusive, or say "+ VAT").
 *  - Limits must match the server's PLAN_* environment variables (server/README.md).
 *  - The same values are written into the HTML as fallbacks for visitors without
 *    JavaScript. If you change them here, also search the HTML for "$X" / the old
 *    value (index.html pricing section), or leave the fallbacks as they are.
 *
 *  This file runs on every page (no tracking, no network requests).
 */
window.DEVLOGMAKER_SITE = {
  // Where the "Download" buttons go: the public releases page. packaging/publish_public.py
  // fills this in when it publishes the site. Never the private source repo.
  downloadUrl: "https://github.com/glumbis/devlogmaker-app/releases/latest",
  // Optional direct links per platform (leave "" to use downloadUrl).
  downloadWindows: "https://github.com/glumbis/devlogmaker-app/releases/latest/download/DevlogMaker_0.2.0_x64-setup.exe",
  downloadMac: "",

  currencyNote: "Prices in USD. Taxes may apply at checkout.",
  plans: {
    creator: {
      price: "$X",         // e.g. "$12"
      period: "/mo",
      voiceChars: "60,000",       // PLAN_CREATOR_VOICE_CHARACTERS
      voiceMinutes: "about 65",   // ~900 characters per minute of narration
      claudeTokens: "2 million",  // PLAN_CREATOR_CLAUDE_TOKENS
    },
    studio: {
      price: "$Y",         // e.g. "$39"
      period: "/mo",
      voiceChars: "250,000",
      voiceMinutes: "about 275",
      claudeTokens: "8 million",
    },
  },
};

(function () {
  var cfg = window.DEVLOGMAKER_SITE;
  function fill() {
    // Download links
    var links = document.querySelectorAll("[data-download]");
    for (var i = 0; i < links.length; i++) {
      var kind = links[i].getAttribute("data-download");
      var url = (kind === "windows" && cfg.downloadWindows) || (kind === "mac" && cfg.downloadMac) || cfg.downloadUrl;
      if (url) links[i].setAttribute("href", url);
    }
    // Text values: data-cfg="plans.creator.price"
    var nodes = document.querySelectorAll("[data-cfg]");
    for (var j = 0; j < nodes.length; j++) {
      var path = nodes[j].getAttribute("data-cfg").split(".");
      var value = cfg;
      for (var k = 0; k < path.length && value != null; k++) value = value[path[k]];
      if (typeof value === "string" && value !== "") nodes[j].textContent = value;
    }
    var year = document.querySelectorAll("[data-year]");
    for (var y = 0; y < year.length; y++) year[y].textContent = String(new Date().getFullYear());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fill);
  else fill();
})();
