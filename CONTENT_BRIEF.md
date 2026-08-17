# CONTENT_BRIEF.md — Guardian K9 Company

**Read this file completely before writing a single word.** It is the highest-leverage
file in the build. If something here conflicts with a general instinct about how service
websites are written, this file wins.

---

## 0. What this business actually is

Guardian K9 Company is an **independent, detection-only** canine service, independently
owned and operated by **Lindsey Elling**, serving all of Washington State as a
service-area business with no published street address.

Two services:
1. **Canine bed bug detection** — inspections, post-treatment verification, turnover
   screening, building-wide sweeps.
2. **K9 Canada goose deterrent** — handler-directed hazing programs on managed grounds.

**Guardian does not treat.** No pesticides, no extermination, no treatment sales, ever.
This is not a capability gap to write around — it is the product. Every page either
protects the credibility of an inspection that has nothing to sell, or it damages it.

**The customer is usually not the person with the bed bugs.** It is a property manager,
a general manager, a facilities director or an HOA board deciding who pays and what to
document. Write for them. The money asset is not "we'll get rid of your bed bugs" — it is
**a defensible, dated, third-party report**.

---

## 1. Hard content rules — violating one is not a style problem

These are enforced automatically by `scripts/run-harness.mjs` (check 6), which **blocks
the push**. They exist because each has a statute or a peer-reviewed dataset behind it.

### C1 — the Washington licensing line

Guardian reports **where the dog alerted and what was confirmed**. Nothing more.

**Never write:**
- Any named pesticide, active ingredient, product or brand
- Any recommendation, ranking or comparison of treatment methods
- "We recommend…", "the best product for…", "you should use…"
- "We treat", "we can also treat", "we can arrange treatment"
- Any claim about what Washington law requires of *other* pest businesses

**Why:** RCW 15.58.210 makes anyone who "offers or supplies technical advice or makes
recommendations to the user of… any other pesticide except those pesticides which are
labeled and intended for home and garden use only" a **pest control consultant**,
requiring a licence Guardian does not hold. Referral is always to *a licensed applicator
of the client's choosing*, never to a named product or company.

**Also never write:** the flat claim that no licence is required in Washington for canine
bed bug detection. The statutory reading is strong but unconfirmed by WSDA in writing
(blocker B-2). Describe what Guardian **does and does not do**; do not pronounce on state
requirements.

### C2 — the accuracy rule

**No bare accuracy percentage appears anywhere except `/detection-accuracy/`.** Not in a
hero, not in a stat tile, not in an FAQ answer, not in a vertical page.

The industry's "98% accurate" comes from a **laboratory** study (Pfiester, Koehler &
Pereira 2008). The **field** study — Cooper, Wang & Singh 2014, teams in naturally
infested apartments — found **44% mean detection (range 10–100%)** and **15% mean false
positives (range 0–57%)**.

When accuracy comes up, **link to `/detection-accuracy/`** rather than restating a
number. An unqualified accuracy claim is a Consumer Protection Act (ch. 19.86 RCW)
exposure and a doctrine violation.

**The productive framing:** the 10–100% range means *the team* is the variable, which is
why we publish the handler, the dog, the certifying body and the certification dates.
This turns an uncomfortable statistic into the reason to hire a specific documented team.

### C3 — goose work

**Approved framing, use it verbatim in substance:** *handler-directed hazing — no contact,
no injury, no nests or eggs disturbed.*

**Never write:** "harassment is not take." 50 CFR 10.12 includes **"pursue"** in the
definition of take.

**Never offer** nest or egg work as a Guardian service. Registration under the Resident
Canada Goose Nest and Egg Depredation Order (50 CFR 21.162) belongs to the **landowner,
HOA or local government** — never to a vendor. Guardian could act as their agent under
*their* registration, and only if blocker B-3 is cleared.

**Always state** the flightless-molt pause as published operating policy. Saying it out
loud is a trust asset.

### Other standing bans

| Never write | Why |
|---|---|
| A Washington statewide bed bug **disclosure law** | **There is none.** HB 1440 (2019) is the 60-day rent-increase notice bill. There is no RCW 59.18.060(15) disclosure provision. Asserting one is affirmatively false. |
| Any named cruise line, hotel brand, theatre chain or property adjacent to a bed bug claim | Trade libel with no supporting evidence. Discuss venue **categories**. |
| Any certification Guardian has not been issued | B-4. The guard pattern hides the block until the field is filled. Never write around it. |
| Unqualified guarantees — "lifetime", "guaranteed results", "100% guarantee" | Defined-term only; every "guaranteed" links to `/our-guarantee/`. |
| Fabricated reviews, ratings, stats, client counts, job counts, pricing | Ranking and legal liability, not a shortcut. No "trusted by 15+ companies" without names and permission. |
| Puget Sound resident goose population figures | WDFW publishes none that could be verified. Do not invent one. |
| WA/Seattle total apartment **unit** counts | Not verified. Renter **household** counts are solid; unit counts are not. |
| NESDCA's specific certification rules | Their published rules could not be retrieved. Obtain directly (B-4) before describing them. |

---

## 2. The verified fact bank

**If a fact is not in this bank, research it and cite a primary source, or do not use it.**
This is the anti-slop engine, not a formality.

### Washington and Seattle rental law
- **RCW 59.18.060(4)** — landlord must "[p]rovide a reasonable program for the control of
  infestation by insects, rodents, and other pests at the initiation of the tenancy and,
  **except in the case of a single-family residence**, control infestation during tenancy
  **except where such infestation is caused by the tenant**."
- **RCW 59.18.130** — tenant duties; tenant may be liable for extermination costs where
  the tenant caused the infestation.
- **RCW 59.18.150** — landlord entry notice requirements. Operationally essential for
  building-wide sweeps.
- **Seattle SMC 22.206.160.A.3, 22.206.170.C, SDCI Director's Rule 2-88** — owners must
  control insects **including bed bugs, named explicitly**; renters cannot be charged
  unless they caused it; penalties **$150–$500 per day** plus inspection charges. RRIO
  subjects registered rentals to periodic inspection.

### Washington licensing
- **RCW 15.58.030(41)** — "structural pest inspector" is defined entirely in terms of
  wood-destroying organism inspections.
- **RCW 15.58.030(44)** — a "wood destroying organism" is an insect or fungus that
  "consume[s], excavate[s], develop[s] in, or otherwise modif[ies] the integrity of wood."
  Bed bugs do none of these.
- **RCW 15.58.205** (inspector), **RCW 15.58.210** (consultant), **RCW 17.21.020**
  (applicator/operator).

### Canada goose law
- **Migratory Bird Treaty Act** — Canada geese are federally protected.
- **50 CFR 10.12** — "take" means "to **pursue**, hunt, shoot, wound, kill, trap, capture,
  or collect…"
- **50 CFR 21.162** — Resident Canada Goose Nest and Egg Depredation Order; registration
  belongs to landowners, HOAs and local governments **and their agents**; egg oiling with
  100% corn oil and nest/egg destruction are the authorised methods; registrants must use
  non-lethal techniques to minimise take.
- **WDFW, Living with Wildlife — Canada Geese:** "When directed by a handler, dogs are the
  method of choice for large open areas such as golf courses, airports, parks, agricultural
  fields, and corporate parks." WDFW also notes dogs may be inappropriate in residential
  areas, continuously-used parks, near roadways and on large water bodies.
- **RCW 77.15.240** — unlawful use of dogs; covers deer, elk, moose, caribou, mountain
  sheep and endangered species only. **Does not restrict goose hazing.**

### Detection accuracy
- **Pfiester, Koehler & Pereira (2008)**, *J. Econ. Entomol.* 101(4):1389 — controlled
  laboratory conditions, planted hides.
- **Cooper, Wang & Singh (2014)**, *J. Econ. Entomol.* 107(6):2171 — naturally infested
  apartments: **44% mean detection (10–100%)**, **15% mean false positives (0–57%)**.
- **WDDO Bed Bug Canine Detection Test** — double blind means neither team, proctor nor
  anyone present knows hide count or location; hide counts randomised by dice roll; at
  least one blank search area per phase; alerts must be within three feet or scored false;
  Basic Odor Recognition requires zero false alerts and zero misses.

### Washington market
- **Orkin bed bug cities:** Seattle **#30 in 2026**, up from **#39 in 2025**. Always
  attribute to Orkin and state the methodology — it ranks metros by Orkin's own treatment
  volume, not scientific incidence.
- **US Census QuickFacts (ACS 2020–2024, V2025):** WA — 8,001,020 population, 3,064,820
  households, 63.8% owner-occupied (≈36.2% renter, ≈1.11m renter households). Seattle —
  784,777 population, 363,466 households, 43.7% owner-occupied (≈56.3% renter, ≈204,600
  renter households). **Present derived renter figures as approximate** ("about 56%",
  "roughly 205,000").
- **UW Runstad/WCRER, Q3 2025:** statewide apartment vacancy 5.5%, Puget Sound 5.6%; King
  County average rent $2,126.
- **Port of Seattle, 2025 season:** 1.9 million revenue passengers, 298 ship calls, 8
  homeport brands, 14 ships; season ended 21 October 2025; $1.2bn regional impact; 5,120+
  jobs; 65% of ships used shore power.
- **Terminals:** Bell Street Cruise Terminal at Pier 66 (2225 Alaskan Way); Smith Cove
  Cruise Terminal at Pier 91 (two 1,200-ft berths, 143,000 sq ft terminal opened April
  2009, 800 parking spaces, shore power at each berth, 30–40 min from SEA).
  **Do not publish a cruise-line-to-pier table** — assignments change annually.

---

## 3. Voice

First person, Lindsey. Plain, specific, unexcitable — the register of someone who writes
reports that get read by lawyers.

- **No** exclamation marks, "peace of mind", "rest easy", "don't let bed bugs win",
  fear-selling, or urgency manufactured out of nothing.
- **No** em-dash-heavy breathless rhythm. Short declaratives. Let the facts carry it.
- **Where a fact is uncertain, say so.** That is the brand. "The honest answer varies"
  beats a confident answer you cannot support.
- **Concede the weak points before a competitor does.** The 44% field number is published
  on our own site, in our own words, with the sources linked. That is why we are credible.
- Second person for the reader ("your building", "your board"), first person for Guardian.

---

## 4. Per-page requirements (M1–M7, G1–G2)

Every indexable page:

| ID | Requirement |
|---|---|
| **M1** | 3,000–5,000 words of unique, researched, hyper-local content. Enforced by the harness on body text (nav/footer stripped). A page below the floor stays `noindex` — set `depthVerified: true` in frontmatter **only** when it genuinely passes. |
| **M2** | Full AEO/SEO/GEO stack: Quick Answer at top, question-formed H2s answer-first, complete FAQ, 7-node schema, breadcrumb, geo signals. |
| **M3** | Wired up / in / laterally. Handled automatically by `src/lib/links.ts` — do not hand-author internal link blocks. |
| **M4** | Speakable hooks on the Quick Answer and FAQ. Handled by `AnswerBox` and `Faq` components. |
| **M5** | Title ≤ 60 chars, unique sitewide, city/keyword front-loaded. Description 110–165 chars, **ending on punctuation**. Both validated at build by the collection schema and again by the harness. |
| **M6** | Every image with a descriptive Title and Alt **judged by sight, never by filename**. Formula: [what's shown] + [action/context] + [local]. ≤125 chars. Logo alt = business name. |
| **M7** | Shared brand hero/social image + logo on every page. Handled by `BaseLayout`. |
| **G1** | **Named handler-and-dog attribution.** Every service, vertical and city page names the working team with certifying body and dates, linking to the profile. Handled by `TeamBlock`; renders only when the data is real. |
| **G2** | **The deliverable described** on every commercial page — what the report contains, who signs it, how it is dated, what an alert map and an all-clear look like. Handled by `ReportBlock`. |

### The Quick Answer

40–60 words. Written to be quoted verbatim by an answer engine. **One string, four
surfaces:** rendered at the top of the page, used as the meta description, used as the
first FAQ answer, and used as the Speakable target. Write it last, after you know what
the page actually says.

### FAQ

6–12 questions. Real objections, not softballs. Every commercial page carries the two
that matter most: **"Do you treat, or only detect?"** and **"Who is responsible, the
landlord or the tenant?"** where relevant.

---

## 5. Anti-slop

- **Use the data.** Each city row in `src/data/cities.ts` carries `housingProfile`,
  `vintage`, `landmarks[]` and `localHooks[]`. Those are real, checkable inputs. A city
  page written without them will read as a template and will trip the duplicate scanner.
- **Real facts beat volume.** A page grounded in "the pre-1940 brick apartment stock in
  Browne's Addition" cannot read as a template. Ten substantive differentiated pages beat
  eighty templated near-duplicates that never get indexed.
- **Boilerplate lives in components, never in bodies.** CTA, trust strip, team block,
  report block, footer all render from components. Page bodies are unique prose.
- **No template variables in body copy.** The page title never appears verbatim inside a
  sentence. "Bed bug detection in Kent, WA" is a title, not something a person writes.
- **Do not write a heading script.** Verticals share a *block contract*, not identical H2
  strings. The benchmark's eight vertical pages run the same thirteen H2s in the same
  order and are mechanically detectable as generated. Write each industry's headings for
  that industry.
- **Never invent a service or vertical.** Build only the confirmed set in
  `src/data/services.ts` and `src/data/verticals.ts`.

---

## 6. Workflow

1. Read this file and the gold-standard exemplar (`/commercial/multifamily/`).
2. Research your assigned pages — real local facts, before writing.
3. Write into `src/content/bodies/<slug>.md` with the frontmatter the collection schema
   requires (`route`, `title`, `description`, `answer`, `faqs`, `dateModified`,
   `depthVerified`). Bad frontmatter fails the build immediately, which is the point.
4. `npm run build && npm run verify` — all seven checks must pass.
5. Never set `depthVerified: true` on a page you have not actually taken over 3,000 words
   of genuine content. The flag is a statement of fact, not a switch to make a warning go
   away.

## 7. Pending fields — never fabricate

`src/data/business.ts` holds `null` for everything the client still owes: phone, email,
UBI, legal name, insurance, certification body and dates, and the dog roster. Components
guard on these and simply do not render when they are empty.

**Never fill one with a plausible placeholder to make a page look finished.** A missing
section is a known gap. An invented phone number or certification date that ships is a
much worse outcome, and it is exactly the kind of thing nobody notices until a customer
does.
