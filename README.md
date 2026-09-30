# Product Hub — CleanTake (static site)

Static HTML/CSS/JS, **no build step**. Deploy to any static host free tier:
GitHub Pages, Cloudflare Pages, or Netlify. Upload the folder contents as-is.

## Preview locally

```bash
cd ~/workspace/projects/product-hub
python3 -m http.server 8080
# open http://localhost:8080/
```

## Before deploying — 2 things

1. **Domain.** Every `canonical`, `og:url`, `sitemap.xml` and JSON-LD block uses the
   placeholder `https://cleantake.pages.dev`. Find/replace it with the real domain
   (see the `TODO: replace SITE_BASE` comments). Plan says: no custom domain until
   the funnel shows signal — the free `*.pages.dev` URL is fine for now.
2. **Waitlist.** The form on `/waitlist/` is UI-only (no backend, $0 budget).
   Follow `HUONG-DAN-WAITLIST.md` to embed a Google Form and collect real emails.

## Structure

```
index.html                      /           home
cleantake/index.html            /cleantake   demo A/B + CTA + SoftwareApplication schema
waitlist/index.html             /waitlist    the ONE conversion page
docs/install|use|limits/        /docs/*     honest docs (installer: not yet — says so)
privacy/index.html              /privacy
changelog/index.html             /changelog
blog/index.html                 /blog       index
blog/free-local-audio-denoiser/ /blog/...   Article 01 scaffold (content: Day 3)
assets/css/style.css | assets/js/main.js | assets/audio/*.mp3
robots.txt · sitemap.xml
```

## Tracking (Day 1: 4 events)

Wired via `data-event` attributes → `assets/js/main.js` → `console.log`
until a real provider is connected (TODO in the JS: Plausible/GA4).

| event | fires on | conversion? |
|---|---|---|
| `sample_play` | first play of before/after audio | engagement |
| `download_click` | any "Get CleanTake" CTA | interest |
| `waitlist_submit` | valid waitlist form submit | **MAIN conversion** |
| `outbound_github_click` | X/social outbound links | distribution |

## Rules this site follows (from the 90-day plan)

- **One CTA only** (waitlist) — no download button shown until an installer really exists.
- **Honest positioning repeated everywhere:** environmental noise (fan/AC/hum) on
  recorded files only. NO overlapping-speaker separation. NO real-time calls.
- **Competitor prices/features** are never hardcoded as permanent data — re-check on publish day.
- A feature is announced only after it works (see changelog "Up next" vs shipped).
