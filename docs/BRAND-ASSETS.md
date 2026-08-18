# Brand assets (blocker B-11)

**Where the files live:** `public/img/`. Source originals are in `Images/`. This note lives
in `docs/` rather than in `public/` because everything under `public/` is copied to the live
site, and the naming questions at the bottom are internal.

**Status: delivered and in the repo (2026-08-18).** Client supplied both files as JPEGs in
`Images/`, which is kept as the source of truth. They were converted into `public/img/` in
the formats `src/data/business.ts` references. `src/lib/assets.ts` still guards every
reference, so if a file is ever removed the site degrades to the wordmark rather than
shipping a broken image.

| File | Size | Used by |
|---|---|---|
| `guardian-k9-logo.png` | 512×512 | schema `Organization.logo` and the `#logo` ImageObject node |
| `guardian-k9-logo-mark.png` | 128×128 | the header brand mark, rendered at 46px |
| `guardian-k9-social.jpg` | 1200×630 | `og:image` and `twitter:image` on every page (mandate M7) |

### Why there is a separate 128px mark

The 512px PNG is roughly 490 KB. Serving that into a 46px header slot would put half a
megabyte on every page load for something the size of a thumbnail. The small rendition is
about 37 KB. The large file remains canonical for schema and social, where consumers
genuinely want the full-resolution badge.

### The transparency was lost before it reached us

The delivered files are JPEG, which has no alpha channel, so the badge sits on a flattened
solid black square. In the header it is cropped to a circle in CSS, which works because the
badge is circular and its own outer ring is dark. **If a transparent PNG of the badge is
available from whoever produced it, that is worth getting** — it would drop the CSS crop and
give a cleaner mark on any background.

## guardian-k9-logo.png

The official circular badge: rope border, spaniel, mountains, bed bug and goose icons,
"GUARDIAN K-9 COMPANY / DETECTION SERVICES / DETECT. PROTECT. PREVENT."

Export square with a transparent background. The header renders it at 46px tall, so check
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
