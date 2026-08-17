#!/usr/bin/env node
/**
 * The Guardian verification harness — seven scripts, run between every content wave
 * and before every push. Build plan Part 9.2.
 *
 *   1 dead-link crawler        every internal href resolves to a built file
 *   2 per-page SEO audit       one H1, unique title/desc, lengths, alt, OG, canonical
 *   3 duplicate-sentence scan  10+ word sentences on 3+ pages (allowlisted exceptions)
 *   4 word-count auditor       the M1 floor, utility pages exempt by path
 *   5 schema validator         node completeness, @id resolution, one FAQPage, no rating
 *   6 compliance grep suite    the eight C1–C3 rules — THIS ONE BLOCKS THE PUSH
 *   7 orphan & wiring check    every page has an inbound link; hubs audited by count
 *
 * Usage: npm run build && npm run verify
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const FAIL = [];
const WARN = [];
const fail = (script, msg) => FAIL.push(`[${script}] ${msg}`);
const warn = (script, msg) => WARN.push(`[${script}] ${msg}`);

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}

// ---------------------------------------------------------------- helpers
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const files = walk(DIST);
const routeOf = f => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const read = f => fs.readFileSync(f, 'utf8');
/**
 * Keystone 9.2: measure the BODY, not the rendered page — stripping header, footer and
 * the derived wiring nav so shared components do not inflate word counts or trip the
 * duplicate-sentence scanner. Boilerplate lives in components by design (6.3); counting
 * it would punish us for following the standard.
 */
const bodyHtml = html =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<header[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<div class="draft-banner"[\s\S]*?<\/div>/gi, ' ')
    .replace(/<p class="draft-banner"[\s\S]*?<\/p>/gi, ' ');

const textOf = html =>
  bodyHtml(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Utility pages are exempt from the M1 depth floor (build plan 3.3). */
const M1_EXEMPT = ['/contact/', '/privacy/', '/terms/', '/accessibility/', '/thank-you/'];

const pages = files.map(f => {
  const html = read(f);
  return {
    file: f,
    route: routeOf(f),
    html,
    text: textOf(html),
    noindex: /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html),
  };
});

console.log(`\nGuardian verification harness — ${pages.length} built pages\n${'='.repeat(60)}`);

// ------------------------------------------------- 1 · dead-link crawler
{
  const built = new Set(pages.map(p => p.route));
  let checked = 0;
  for (const p of pages) {
    const hrefs = [...p.html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
    for (const h of hrefs) {
      if (/^(https?:|tel:|mailto:|#|data:)/.test(h)) continue;
      const target = h.split('#')[0].split('?')[0];
      if (!target || path.extname(target)) continue;
      checked++;
      const norm = target.endsWith('/') ? target : target + '/';
      if (!built.has(norm)) fail('dead-link', `${p.route} → ${h} (no such page)`);
    }
  }
  console.log(`1 · dead-link crawler ......... ${checked} internal links checked`);
}

// ------------------------------------------------- 2 · per-page SEO audit
{
  const titles = new Map();
  const descs = new Map();
  for (const p of pages) {
    const h1s = [...p.html.matchAll(/<h1[\s>]/gi)].length;
    if (h1s !== 1) fail('seo', `${p.route} has ${h1s} H1 elements (must be exactly 1)`);

    const title = (p.html.match(/<title>([^<]*)<\/title>/i) || [])[1] ?? '';
    if (!title) fail('seo', `${p.route} missing <title>`);
    if (title.length > 60) fail('seo', `${p.route} title ${title.length} chars (max 60): "${title}"`);
    if (titles.has(title)) fail('seo', `duplicate title on ${p.route} and ${titles.get(title)}: "${title}"`);
    titles.set(title, p.route);

    const desc = (p.html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || [])[1] ?? '';
    if (!desc) fail('seo', `${p.route} missing meta description`);
    else {
      if (desc.length < 110 || desc.length > 165)
        fail('seo', `${p.route} description ${desc.length} chars (must be 110–165)`);
      if (!/[.!?]$/.test(desc.trim()))
        fail('seo', `${p.route} description does not end on punctuation (dangling ending)`);
      if (descs.has(desc)) fail('seo', `duplicate description on ${p.route} and ${descs.get(desc)}`);
      descs.set(desc, p.route);
    }

    if (!/rel=["']canonical["']/i.test(p.html)) fail('seo', `${p.route} missing canonical`);
    if (!/property=["']og:image["']/i.test(p.html)) fail('seo', `${p.route} missing og:image (M7)`);

    for (const img of p.html.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt=/.test(img[0])) fail('seo', `${p.route} has an <img> with no alt attribute (M6)`);
    }
  }
  console.log(`2 · per-page SEO audit ........ ${pages.length} pages, ${titles.size} unique titles`);
}

// ------------------------------------- 3 · duplicate-sentence scanner
{
  // Legitimate repeats — the NAP line, legal notices, published policy statements, headings.
  const ALLOW = [
    /not legal advice/i,
    /detection only/i,
    /we apply no pesticides/i,
    /serving all of washington/i,
    /frequently asked questions/i,
    /every alert is visually confirmed/i,
  ];
  const seen = new Map();
  for (const p of pages) {
    const sentences = p.text.split(/(?<=[.!?])\s+/).filter(s => s.split(/\s+/).length >= 10);
    for (const s of new Set(sentences)) {
      const key = s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
      if (!key) continue;
      if (!seen.has(key)) seen.set(key, { text: s, routes: [] });
      seen.get(key).routes.push(p.route);
    }
  }
  let flagged = 0;
  for (const { text, routes } of seen.values()) {
    if (routes.length < 3) continue;
    if (ALLOW.some(re => re.test(text))) continue;
    flagged++;
    warn('dedup', `on ${routes.length} pages: "${text.slice(0, 90)}…"`);
  }
  console.log(`3 · duplicate-sentence scan ... ${flagged} cross-page repeats flagged`);
}

// ------------------------------------------------- 4 · word-count auditor
{
  let below = 0, exempt = 0, ok = 0;
  for (const p of pages) {
    if (M1_EXEMPT.includes(p.route)) { exempt++; continue; }
    const words = p.text.split(/\s+/).filter(Boolean).length;
    if (words < 3000) {
      below++;
      // A thin page is only a FAILURE if it is indexable. Drafts are noindex by design.
      if (!p.noindex) fail('word-count', `${p.route} is indexable with ${words} words (M1 floor is 3,000)`);
    } else ok++;
  }
  console.log(`4 · word-count auditor ........ ${ok} meet M1, ${below} below (noindex drafts), ${exempt} exempt`);
}

// ------------------------------------------------- 5 · schema validator
{
  let checked = 0;
  for (const p of pages) {
    const blocks = [...p.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    if (blocks.length === 0) { fail('schema', `${p.route} emits no JSON-LD`); continue; }
    if (blocks.length > 1) fail('schema', `${p.route} emits ${blocks.length} JSON-LD blocks (one emitter only)`);

    let graph;
    try {
      graph = JSON.parse(blocks[0][1]);
    } catch (e) {
      // Catches the set:html double-escaping trap — the graph renders as visible text.
      fail('schema', `${p.route} JSON-LD does not parse: ${String(e).slice(0, 80)}`);
      continue;
    }
    checked++;
    const nodes = graph['@graph'] ?? [];
    const types = nodes.flatMap(n => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]));

    for (const required of ['WebSite', 'WebPage', 'ImageObject', 'Organization', 'BreadcrumbList']) {
      if (!types.includes(required)) fail('schema', `${p.route} missing ${required} node`);
    }
    if (!types.includes('Person')) fail('schema', `${p.route} missing Person node (every page is attributed)`);

    const faqNodes = nodes.filter(n => n['@type'] === 'FAQPage');
    if (faqNodes.length > 1) fail('schema', `${p.route} has ${faqNodes.length} FAQPage nodes (exactly one per URL)`);

    // Honesty gate: no self-serving rating markup, anywhere, ever.
    const raw = blocks[0][1];
    if (/aggregateRating|"@type"\s*:\s*"Review"/.test(raw))
      fail('schema', `${p.route} emits aggregateRating or Review — forbidden until a verified GBP rating exists`);

    // @id resolution: every internal reference must resolve inside the graph.
    const ids = new Set(nodes.map(n => n['@id']).filter(Boolean));
    const refs = [];
    JSON.stringify(nodes, (k, v) => {
      if (k === '@id' && typeof v === 'string') return v;
      if (v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 1 && v['@id'])
        refs.push(v['@id']);
      return v;
    });
    for (const ref of refs) {
      if (!ids.has(ref)) fail('schema', `${p.route} references unresolved @id ${ref}`);
    }

    // Duplicate @id within one graph.
    const idList = nodes.map(n => n['@id']).filter(Boolean);
    if (new Set(idList).size !== idList.length) fail('schema', `${p.route} has duplicate @id values`);

    if (!/SpeakableSpecification/.test(raw)) fail('schema', `${p.route} missing SpeakableSpecification (M4)`);
  }
  console.log(`5 · schema validator .......... ${checked} graphs parsed and validated`);
}

// ------------------------------- 6 · compliance grep suite (BLOCKS THE PUSH)
{
  const ACCURACY_PAGE = '/detection-accuracy/';
  const RULES = [
    {
      id: 'C2-percentage',
      desc: 'bare accuracy percentage outside /detection-accuracy/',
      re: /\b\d{2,3}(\.\d+)?\s*(%|percent)\s*(accurate|accuracy|detection rate|effective)/i,
      skip: r => r === ACCURACY_PAGE,
    },
    {
      id: 'C2-98',
      desc: 'the unsupported "98% accurate" industry claim',
      re: /\b9[5-9](\.\d+)?\s*(%|percent)[^.]{0,40}(accurate|accuracy)/i,
      skip: r => r === ACCURACY_PAGE,
    },
    {
      id: 'C1-pesticide-rec',
      desc: 'naming or recommending a pesticide product / active ingredient',
      re: /\b(we recommend|recommended product|best product|apply)\s+(a\s+)?(pyrethroid|neonicotinoid|deltamethrin|bifenthrin|chlorfenapyr|fipronil)/i,
    },
    {
      id: 'C1-treatment-offer',
      desc: 'offering treatment (Guardian is detection-only)',
      re: /\bwe (treat|exterminate|will treat|also treat|can treat|offer treatment|provide treatment)\b/i,
    },
    {
      id: 'D6-unqualified-guarantee',
      desc: 'unqualified guarantee language',
      re: /\b(lifetime guarantee|guaranteed (results|elimination|bed[- ]bug free)|100%\s*guarantee)/i,
    },
    {
      id: 'A2-fake-law',
      desc: 'claiming a Washington statewide bed bug disclosure law (there is none)',
      re: /washington[^.]{0,60}bed bug disclosure (law|statute|requirement)/i,
    },
    {
      id: 'C3-take',
      desc: 'the unsafe "harassment is not take" framing',
      re: /(harassment|hazing)[^.]{0,30}(is not|isn't|does not constitute)[^.]{0,15}take/i,
    },
    {
      id: 'B4-unearned-cert',
      desc: 'claiming certification while the credential field is empty',
      re: /\b(certified by|we are)\s+(NESDCA|WDDO)\b/i,
      onlyIf: () => !fs.readFileSync('src/data/business.ts', 'utf8').match(/certifyingBody:\s*'/),
    },
  ];

  let hits = 0;
  for (const p of pages) {
    for (const rule of RULES) {
      if (rule.skip && rule.skip(p.route)) continue;
      if (rule.onlyIf && !rule.onlyIf()) continue;
      const m = p.text.match(rule.re);
      if (m) {
        hits++;
        fail('compliance', `${rule.id} on ${p.route} — ${rule.desc}: "${m[0].slice(0, 70)}"`);
      }
    }
  }
  console.log(`6 · compliance grep suite ..... ${RULES.length} rules × ${pages.length} pages, ${hits} violations`);
}

// ------------------------------------------- 7 · orphan & wiring check
{
  const inbound = new Map(pages.map(p => [p.route, 0]));
  for (const p of pages) {
    const hrefs = new Set(
      [...p.html.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map(m =>
        m[1].endsWith('/') ? m[1] : m[1] + '/',
      ),
    );
    for (const h of hrefs) {
      if (h === p.route) continue;
      if (inbound.has(h)) inbound.set(h, inbound.get(h) + 1);
    }
  }
  let orphans = 0;
  for (const [route, count] of inbound) {
    if (route === '/') continue;
    if (count === 0) { orphans++; fail('orphan', `${route} has zero inbound internal links (M3)`); }
  }
  // Hubs are audited by inbound-link count, not by how they look (Keystone 3.1).
  const HUBS = ['/services/', '/commercial/', '/service-area/', '/pest-library/'];
  const hubReport = HUBS.filter(h => inbound.has(h))
    .map(h => `${h} ${inbound.get(h)}`).join(', ');
  console.log(`7 · orphan & wiring check ..... ${orphans} orphans | hub inbound: ${hubReport}`);
}

// ---------------------------------------------------------------- report
console.log('='.repeat(60));
if (WARN.length) {
  console.log(`\n${WARN.length} warning(s):`);
  WARN.slice(0, 25).forEach(w => console.log('  ! ' + w));
  if (WARN.length > 25) console.log(`  … and ${WARN.length - 25} more`);
}
if (FAIL.length) {
  console.log(`\n${FAIL.length} FAILURE(S) — push blocked:\n`);
  FAIL.slice(0, 50).forEach(f => console.log('  ✗ ' + f));
  if (FAIL.length > 50) console.log(`  … and ${FAIL.length - 50} more`);
  console.log('');
  process.exit(1);
}
console.log('\n✓ All seven checks passed. Safe to push.\n');
