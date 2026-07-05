# Denuba Services — Website

A static, bilingual (English / Hungarian) marketing site for Denuba Services,
a Budapest property management company. Built with plain HTML/CSS/JS — no
build step, no framework, works on any static host.

## Structure

```
/
├── index.html          English homepage (canonical: /)
├── privacy.html         English privacy policy (placeholder — see below)
├── terms.html           English terms of service (placeholder — see below)
├── hu/
│   ├── index.html       Hungarian homepage (canonical: /hu/)
│   ├── privacy.html     Hungarian privacy policy (placeholder)
│   └── terms.html       Hungarian terms of service (placeholder)
├── assets/
│   ├── style.css        Shared stylesheet for every page
│   └── form.js          Contact form validation + submit handling
├── robots.txt
└── sitemap.xml
```

Each language is a **real, separate, fully-rendered page** (not a JS toggle
that hides/shows text). This is deliberate: search engines can crawl and
index each language independently, and `hreflang` tags on every page tell
Google which version to show to English vs. Hungarian searchers.

## Before you publish — replace these placeholders

1. **Domain.** Every canonical URL, hreflang tag, and Open Graph URL currently
   points to `https://www.denubaservices.com/`. Find-and-replace that string
   across all HTML files and `sitemap.xml`/`robots.txt` with your real domain.

2. **Hero / OG image.** The hero photo currently links directly to the
   original design tool's hosted asset
   (`https://denuba-haven.lovable.app/assets/hero-apartment-...jpg`). Download
   it (or your own photo) and self-host it at `/assets/hero-apartment.jpg` —
   linking to someone else's asset URL is fragile and will break if they take
   the file down. Also add a real `/assets/og-image.jpg` (1200×630px) for the
   Open Graph/Twitter preview tags — right now those `<meta>` tags point to a
   file that doesn't exist yet.

3. **Contact form.** `assets/form.js` currently just shows a "message sent"
   confirmation without sending anything anywhere. Wire it up to a real
   endpoint — e.g. [Formspree](https://formspree.io), [Web3Forms](https://web3forms.com),
   a Netlify Forms attribute, or your own backend. The `TODO` comment in
   `form.js` shows exactly where the `fetch()` call goes.

4. **Legal pages.** `privacy.html` and `terms.html` (and their `/hu/`
   equivalents) are clearly-marked placeholders. Have a Hungarian/EU-qualified
   lawyer review real GDPR-compliant privacy and terms text before launch —
   this matters both for compliance and because you're collecting personal
   data (name/email) via the contact form.

5. **Analytics** (optional). No analytics are included. If you add
   Google Analytics/Plausible/Fathom, keep it privacy-respecting given GDPR —
   a cookie banner is required if you use anything that sets non-essential
   cookies.

## SEO checklist already built in

- Unique `<title>` and meta description per page, in the right language.
- `rel="canonical"` on every page.
- `hreflang` alternates (`en`, `hu`, `x-default`) linking the two language
  versions both ways, on every page and in `sitemap.xml`.
- Open Graph + Twitter Card tags for link previews.
- `RealEstateAgent` JSON-LD structured data on both homepages (helps Google
  understand the business type, service area, and languages spoken).
- Single `<h1>` per page, logical heading order (h1 → h2 → h3).
- Descriptive `alt` text on the hero image (in the page's language).
- `robots.txt` + `sitemap.xml` referencing both language URLs.
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav aria-label>`).

## Accessibility notes

- Skip-to-content link for keyboard users.
- Visible focus outlines (`:focus-visible`) on all interactive elements.
- Form fields have associated `<label>`s and `autocomplete` hints.
- `prefers-reduced-motion` respected (smooth scroll/animation disabled).
- Decorative icons are `aria-hidden`; the form's status message uses
  `aria-live="polite"` so screen readers announce success/error.

## Deploying

This is plain static HTML — drop the whole folder onto any static host:

- **Netlify / Vercel**: drag-and-drop the folder, or connect a git repo.
- **Cloudflare Pages**: same — no build command needed.
- **GitHub Pages**: push to a repo, enable Pages on the root.
- **Any traditional host**: upload via FTP/SFTP into the web root.

After deploying, submit `sitemap.xml` in Google Search Console (and Bing
Webmaster Tools) for both the domain and make sure both `/` and `/hu/` get
indexed — check with `site:yourdomain.com` a few days after launch.
