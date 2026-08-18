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

---

## The banner carries three claims the linter cannot see — needs a decision

`guardian-k9-banner-*.jpg` has marketing copy baked into the artwork. The compliance grep
suite in `scripts/run-harness.mjs` scans rendered **text**. These are **pixels**, so check 6
passes and always will, no matter what the image says. That is the whole reason this section
exists.

Three of the baked-in lines sit against `CONTENT_BRIEF.md` section 1:

| On the banner | The problem |
|---|---|
| **ADVANCED DETECTION** — "Finding what others miss." | A comparative superiority claim. The entire `/detection-accuracy/` page is built on the opposite position: the published field research shows canine detection varies enormously *between teams*, and we deliberately publish that rather than a flattering number. An unsupported "better than others" claim is the Consumer Protection Act (ch. 19.86 RCW) exposure that rule C2 exists to avoid. |
| **RELIABLE PROTECTION** — "Keeping what matters safe." | Implies Guardian protects. Guardian detects. |
| **PROACTIVE PREVENTION** — "Stopping problems before they start." | The most serious of the three. Guardian does not prevent, cannot prevent, and prevention work is licensed applicator activity. Every page of prose on this site says detection only, no treatment. The banner says the opposite, in larger type, above the fold. |

The same tension applies to **DETECT. PROTECT. PREVENT.**, which also appears in the logo
badge. Inside a mark it reads as a slogan. Beside three feature callouts explaining what each
word means as a service, it reads as a service list.

### Why this is worth fixing rather than living with

The site's whole competitive position is that it concedes what competitors overstate. A
visitor who reads "Stopping problems before they start" in the banner and then reads "we do
not treat and we do not prevent" four paragraphs down does not conclude the company is
careful. They conclude one of the two is untrue.

### Options, in order of preference

1. **Re-export the banner without the three right-hand callouts.** The badge, the mountains
   and the DETECT/PROTECT/PREVENT lockup all stay. This is a crop or a layer toggle for
   whoever produced it, and it removes the whole problem.
2. **Reword the callouts** to things Guardian actually does: *Independent detection — we sell
   no treatment.* / *Documented findings — every alert visually confirmed.* / *Defensible
   reports — dated, signed, retained.*
3. **Leave it**, with the client accepting the exposure in writing. It is their mark and
   their call, but it should be a decision rather than an oversight.

Until it is decided, none of those three phrases appears anywhere in the site's prose, and
the alt text describes the scene rather than repeating the claims.
