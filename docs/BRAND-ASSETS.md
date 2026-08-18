# Brand assets (blocker B-11)

**Where the files go:** `public/img/` in this repo. That directory does not exist yet —
create it when you add the first file. This note lives in `docs/` rather than in `public/`
because everything under `public/` is copied to the live site, and the naming questions at
the bottom are internal.

Two files are referenced by `src/data/business.ts` and are **not yet in the repo**.
Until each one exists, `src/lib/assets.ts` suppresses the reference rather than shipping
a broken image. Drop the file in, rebuild, and it starts rendering everywhere at once.

| File | Size | Used by |
|---|---|---|
| `guardian-k9-logo.png` | 512×512 minimum, square, transparent background | Header brand mark, schema `Organization.logo` and the `#logo` ImageObject node, `og:image` fallback |
| `guardian-k9-social.jpg` | 1200×630 | `og:image` and `twitter:image` on every page (mandate M7) |

## guardian-k9-logo.png

The official circular badge: rope border, spaniel, mountains, bed bug and goose icons,
"GUARDIAN K-9 COMPANY / DETECTION SERVICES / DETECT. PROTECT. PREVENT."

Export square with a transparent background. The header renders it at 38px tall, so check
that the wordmark inside the badge is still legible at that size — if it is not, consider a
second simplified mark for the header and keep the full badge for schema and social.

## guardian-k9-social.jpg

1200×630 is a different aspect ratio from a square badge, so this is **not** the logo
rescaled. It needs its own composition: the badge placed on a background with room around
it, sized so it survives being cropped to a 1.91:1 card by whichever platform is rendering
it. A square logo letterboxed into 1200×630 will look broken in a link preview.

## Colour reference, taken from the badge

These are the values the design tokens in `src/styles/global.css` are tuned against:

- Teal ring and rays — the brand primary
- Gold rope, arrows and icon rings — reserved for CTAs on the site
- Near-black plate — the secondary
- Silver/white "GUARDIAN" wordmark

## Two naming questions the logo raises — see B-8

1. The badge reads **"GUARDIAN K-9 COMPANY"** with a hyphen. `business.name` is
   **"Guardian K9 Company"** without one. NAP consistency requires the Google Business
   Profile, the footer and the schema to match character for character, so this needs a
   decision before launch rather than after.
2. The badge tagline is **"DETECT. PROTECT. PREVENT."** `business.tagline` is
   "Independent canine detection". The word *prevent* sits awkwardly beside the C1
   detection-only discipline in `CONTENT_BRIEF.md`: Guardian does not treat and does not
   prevent. It is fine inside the mark. It should not be repeated as a text claim in body
   copy, because that is where it would read as a service promise.
