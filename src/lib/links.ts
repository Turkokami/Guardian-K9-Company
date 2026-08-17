/**
 * links.ts — spoke-and-wheel wiring, DERIVED not hand-authored (mandate M3).
 *
 * Every page's up / in / lateral links are computed from the data graph, so an orphan
 * is structurally impossible rather than merely discouraged. scripts/orphan-check.mjs
 * verifies the result against the built output.
 */

import { services } from '../data/services';
import { verticals, buildableVerticals } from '../data/verticals';
import { cities } from '../data/cities';
import { complianceTopics, buildableCompliance } from '../data/compliance';
import { species } from '../data/species';

export interface Link { href: string; label: string }
export interface Wiring {
  up: Link | null;        // parent
  hub: Link;              // always home
  lateral: Link[];        // siblings
  down: Link[];           // children
  cross: Link[];          // cross-cluster (compliance, library, authority spine)
}

const HOME: Link = { href: '/', label: 'Guardian K9 Company' };

const svcLink = (slug: string): Link | null => {
  const s = services.find(x => x.slug === slug);
  return s ? { href: `/services/${s.slug}/`, label: s.name } : null;
};
const vertLink = (slug: string): Link | null => {
  const v = buildableVerticals.find(x => x.slug === slug);
  return v ? { href: `/commercial/${v.slug}/`, label: v.name } : null;
};
const compLink = (slug: string): Link | null => {
  const c = buildableCompliance.find(x => x.slug === slug);
  return c ? { href: `/compliance/${c.slug}/`, label: c.h1 } : null;
};
const notNull = <T,>(a: (T | null)[]): T[] => a.filter((x): x is T => x !== null);

export function wireService(slug: string): Wiring {
  const s = services.find(x => x.slug === slug)!;
  return {
    up: { href: '/services/', label: 'All services' },
    hub: HOME,
    lateral: services.filter(x => x.slug !== slug).map(x => ({ href: `/services/${x.slug}/`, label: x.name })),
    down: s.problems.map(p => ({ href: `/services/${s.slug}/${p.slug}/`, label: p.title })),
    cross: notNull(s.relatedVerticals.map(vertLink)),
  };
}

export function wireProblem(serviceSlug: string, problemSlug: string): Wiring {
  const s = services.find(x => x.slug === serviceSlug)!;
  return {
    up: { href: `/services/${s.slug}/`, label: s.name },
    hub: HOME,
    lateral: s.problems
      .filter(p => p.slug !== problemSlug)
      .map(p => ({ href: `/services/${s.slug}/${p.slug}/`, label: p.title })),
    down: [],
    cross: notNull(
      species.filter(sp => sp.relatedProblems.includes(problemSlug))
        .map(sp => ({ href: `/pest-library/${sp.slug}/`, label: sp.name })),
    ),
  };
}

export function wireVertical(slug: string): Wiring {
  const v = verticals.find(x => x.slug === slug)!;
  return {
    up: { href: '/commercial/', label: 'Commercial programs' },
    hub: HOME,
    lateral: notNull(v.relatedVerticals.map(vertLink)),
    down: [],
    cross: [...notNull(v.relatedServices.map(svcLink)), ...notNull(v.complianceLinks.map(compLink))],
  };
}

export function wireCity(slug: string): Wiring {
  const c = cities.find(x => x.slug === slug)!;
  const children: Link[] = [];
  for (const fam of c.childServices) {
    for (const s of services.filter(x => x.family === fam)) {
      children.push({ href: `/service-area/${c.slug}/${s.slug}/`, label: `${s.name} in ${c.name}` });
      break; // one flagship service per family per city
    }
  }
  return {
    up: { href: '/service-area/', label: 'Service area' },
    hub: HOME,
    lateral: cities
      .filter(x => x.slug !== slug && x.county === c.county)
      .concat(cities.filter(x => x.slug !== slug && x.county !== c.county).slice(0, 3))
      .slice(0, 5)
      .map(x => ({ href: `/service-area/${x.slug}/`, label: x.name })),
    down: children,
    cross: services.map(s => ({ href: `/services/${s.slug}/`, label: s.name })),
  };
}

export function wireCityService(citySlug: string, serviceSlug: string): Wiring {
  const c = cities.find(x => x.slug === citySlug)!;
  const s = services.find(x => x.slug === serviceSlug)!;
  return {
    up: { href: `/service-area/${c.slug}/`, label: `${c.name} service area` },
    hub: HOME,
    lateral: cities
      .filter(x => x.slug !== citySlug && x.childServices.includes(s.family))
      .map(x => ({ href: `/service-area/${x.slug}/${s.slug}/`, label: `${s.shortName} in ${x.name}` })),
    down: [],
    cross: [{ href: `/services/${s.slug}/`, label: s.name }],
  };
}

export function wireCompliance(slug: string): Wiring {
  const t = complianceTopics.find(x => x.slug === slug)!;
  return {
    up: { href: '/commercial/', label: 'Commercial programs' },
    hub: HOME,
    lateral: buildableCompliance
      .filter(x => x.slug !== slug)
      .map(x => ({ href: `/compliance/${x.slug}/`, label: x.title })),
    down: [],
    cross: [...notNull(t.relatedVerticals.map(vertLink)), ...notNull(t.relatedServices.map(svcLink))],
  };
}

export function wireSpecies(slug: string): Wiring {
  const sp = species.find(x => x.slug === slug)!;
  return {
    up: { href: '/pest-library/', label: 'Species library' },
    hub: HOME,
    lateral: species
      .filter(x => x.slug !== slug && x.family === sp.family)
      .map(x => ({ href: `/pest-library/${x.slug}/`, label: x.name })),
    down: [],
    cross: notNull(sp.relatedServices.map(svcLink)),
  };
}

/** Every indexable route the site generates. Used by the sitemap and the harness. */
export function allRoutes(): string[] {
  const r: string[] = [
    '/', '/services/', '/commercial/', '/service-area/', '/pest-library/',
    '/lindsey-elling/', '/our-dogs/', '/how-canine-detection-works/',
    '/detection-accuracy/', '/independent-detection/', '/our-guarantee/', '/contact/',
  ];
  for (const s of services) {
    r.push(`/services/${s.slug}/`);
    for (const p of s.problems) r.push(`/services/${s.slug}/${p.slug}/`);
  }
  for (const v of buildableVerticals) r.push(`/commercial/${v.slug}/`);
  for (const c of cities.filter(x => x.cluster !== 'area')) {
    r.push(`/service-area/${c.slug}/`);
    for (const fam of c.childServices) {
      const s = services.find(x => x.family === fam);
      if (s) r.push(`/service-area/${c.slug}/${s.slug}/`);
    }
  }
  for (const t of buildableCompliance) r.push(`/compliance/${t.slug}/`);
  for (const sp of species) r.push(`/pest-library/${sp.slug}/`);
  return r;
}
