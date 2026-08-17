# Guardian K9 Company — guardiank9company.com

Astro static build. Keystone Track 7A. Tier 1.0 on the 2.0 framework.

## Commands
    npm ci
    npm run build      # → dist/
    npm run verify     # the seven-script harness; blocks the push on failure

## Non-negotiables
- **Detection only.** No treatment, no pesticide recommendation, ever. See CONTENT_BRIEF.md §1.
- **One schema emitter** — `src/lib/schema.ts`. No page emits inline JSON-LD.
- **No aggregateRating / Review** until a verified GBP rating exists.
- **No bare accuracy percentage** outside `/detection-accuracy/`.
- **Pending fields are `null`**, never a placeholder. Components guard and omit.

## Where things live
| Path | What |
|---|---|
| `src/data/*.ts` | Facts that drive routing and schema. Edit here, not in routes. |
| `src/content/bodies/*.md` | The 3–5k word page bodies, matched to a route by `route` frontmatter. |
| `src/lib/schema.ts` | The only JSON-LD emitter. |
| `src/lib/links.ts` | Derived spoke-and-wheel wiring. Orphans are structurally impossible. |
| `scripts/run-harness.mjs` | The seven checks. |
| `CONTENT_BRIEF.md` | Read before writing anything. |

## Deploy
Vercel, framework preset **Astro** (set it explicitly — an unset preset 404s every route
even when the build succeeds). Flat bundle at repo root. `vercel.json` pins framework,
build command, output dir and trailing slash.

Before calling anything deployed:
    git ls-files "src/pages/**" | wc -l   # must be > 0
    rm -rf node_modules dist && npm ci && npm run build && npm run verify
