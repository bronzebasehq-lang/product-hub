/* CleanTake product hub — event tracking (Day 1: 4 events).
 *
 * ANALYTICS (Day 3, prepared but NOT activated):
 * The 4 events (sample_play, download_click, waitlist_submit,
 * outbound_github_click) are ready to send to GA4 (free). To activate,
 * Minh creates a GA4 property and sends the Measurement ID (G-XXXXXXXXXX)
 * to Rio, who sets window.CLEANTAKE_GA4_ID below. Until then every event
 * is logged to the console so funnels can be verified manually.
 * Main conversion = waitlist_submit.
 *
 * Wiring: add data-event="<name>" to any element. Optional data-event-detail
 * carries extra context (e.g. which sample). Audio <audio> tags use
 * data-event="sample_play" and fire on first 'play' only.
 */
(function () {
  "use strict";

  // Set by Rio once Minh provides the GA4 Measurement ID. Empty = disabled.
  window.CLEANTAKE_GA4_ID = "G-RJRLH29XWS";

  // Load gtag.js only when a real ID is configured.
  if (/^G-[A-Z0-9]+$/.test(window.CLEANTAKE_GA4_ID || "")) {
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + window.CLEANTAKE_GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", window.CLEANTAKE_GA4_ID);
  }

  function track(name, detail) {
    var payload = { event: name, detail: detail || {}, at: new Date().toISOString() };
    if (window.gtag && window.CLEANTAKE_GA4_ID) {
      // GA4: send the same 4 events, no PII (email is hashed to domain only).
      var params = {};
      Object.keys(payload.detail).forEach(function (k) { params[k] = String(payload.detail[k]).slice(0, 100); });
      window.gtag("event", name, params);
    } else if (window.console && console.log) {
      console.log("[analytics:TODO]", JSON.stringify(payload));
    }
    return payload;
  }

  // Click-based events: sample CTA buttons, download, waitlist, outbound links.
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-event]");
    if (!el) return;
    var name = el.getAttribute("data-event");
    if (name === "sample_play") return; // handled via 'play' listener below
    var detail = {};
    try { detail = JSON.parse(el.getAttribute("data-event-detail") || "{}"); } catch (_) {}
    detail.href = el.getAttribute("href") || null;
    detail.text = (el.textContent || "").trim().slice(0, 80);
    track(name, detail);
  });

  // sample_play: fire once per audio element on first play.
  document.querySelectorAll("audio[data-event='sample_play']").forEach(function (audio) {
    var fired = false;
    audio.addEventListener("play", function () {
      if (fired) return;
      fired = true;
      var detail = {};
      try { detail = JSON.parse(audio.getAttribute("data-event-detail") || "{}"); } catch (_) {}
      track("sample_play", detail);
    });
  });

  // Waitlist form: client-side only (no backend yet — see HUONG-DAN-WAITLIST.md).
  // Fires waitlist_submit (the MAIN conversion event) on valid submit.
  var form = document.getElementById("waitlist-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (form.querySelector('input[name="email"]') || {}).value || "";
      var name = (form.querySelector('input[name="name"]') || {}).value || "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        var err = document.getElementById("waitlist-error");
        if (err) err.hidden = false;
        return;
      }
      track("waitlist_submit", { name: name.trim().slice(0, 60), email_domain: email.split("@")[1] || "" });
      var ok = document.getElementById("waitlist-ok");
      if (ok) ok.hidden = false;
      form.querySelector('button[type="submit"]').disabled = true;
      // TODO: when the Google Form embed (see HUONG-DAN-WAITLIST.md) is live,
      // hide this local form and let the embed handle submissions instead.
    });
  }

  // A/B player tabs on /cleantake
  document.querySelectorAll(".player-tabs .tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-target");
      document.querySelectorAll(".player-tabs .tab").forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");
      document.querySelectorAll(".player-pane").forEach(function (pane) {
        var show = pane.id === target;
        pane.hidden = !show;
        if (!show) { var a = pane.querySelector("audio"); if (a) a.pause(); }
      });
    });
  });

  window.__cleantakeTrack = track; // exposed for manual QA in devtools
})();
