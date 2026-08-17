/**
 * schema.ts — THE ONLY JSON-LD EMITTER ON THIS SITE. Build plan Part 5.
 *
 * Hard rules enforced here:
 *   • Business type is ["Organization","LocalBusiness","ProfessionalService"].
 *     NOT PestControlService — Guardian applies no pesticide and holds no applicator licence.
 *   • No PostalAddress street line. Service-area business: areaServed only.
 *   • No aggregateRating, no Review, ever, until a verified GBP rating exists.
 *   • No hasCredential without a real, filled credential (B-4).
 *   • Exactly one FAQPage per URL.
 *   • Everything @id-anchored; pages reference the root nodes, never redeclare them.
 */

import { business } from '../data/business';
import { cities } from '../data/cities';

const SITE = business.siteUrl;
export const ID = {
  website: `${SITE}/#website`,
  org: `${SITE}/#organization`,
  logo: `${SITE}/#logo`,
  person: `${SITE}/${business.operator.slug}/#person`,
};

const abs = (path: string) => (path.startsWith('http') ? path : `${SITE}${path}`);

/** Drop null/undefined/empty values so a pending field never emits an empty node. */
function clean<T>(obj: T): T {
  if (Array.isArray(obj)) return obj.map(clean).filter(v => v !== undefined && v !== null) as unknown as T;
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      if (v === null || v === undefined) continue;
      if (Array.isArray(v) && v.length === 0) continue;
      const c = clean(v);
      if (c && typeof c === 'object' && !Array.isArray(c) && Object.keys(c).length === 0) continue;
      out[k] = c;
    }
    return out as T;
  }
  return obj;
}

const sameAs = () =>
  [business.gbpUrl, business.social.facebook, business.social.instagram, business.social.linkedin]
    .filter(Boolean) as string[];

/** The sitewide nodes. Declared once per domain, referenced by @id everywhere else. */
export function coreNodes() {
  const org = {
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': ID.org,
    name: business.name,
    legalName: business.legalName,
    description: business.description,
    url: `${SITE}/`,
    logo: { '@id': ID.logo },
    image: { '@id': ID.logo },
    telephone: business.phoneE164,
    email: business.email,
    foundingDate: business.foundingDate,
    founder: { '@id': ID.person },
    employee: { '@id': ID.person },
    // SERVICE-AREA BUSINESS — deliberately no `address`.
    areaServed: [
      { '@type': 'State', name: 'Washington', sameAs: 'https://www.wikidata.org/wiki/Q1223' },
      ...cities.filter(c => c.cluster !== 'area').map(c => ({ '@type': 'City', name: c.name })),
    ],
    knowsAbout: [
      'Canine scent detection',
      'Bed bug detection',
      'Canada goose management',
      'Multifamily pest documentation',
    ],
    openingHoursSpecification: business.hours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: sameAs(),
    // NO aggregateRating. NO review. NO parentOrganization. See plan 5.1.
  };

  const person = {
    '@type': 'Person',
    '@id': ID.person,
    name: business.operator.name,
    jobTitle: business.operator.jobTitle,
    url: `${SITE}/${business.operator.slug}/`,
    worksFor: { '@id': ID.org },
    knowsAbout: [
      'Canine scent detection',
      'Canine behavior and handling',
      'Bed bug biology',
      'Detection dog training',
    ],
    // Emitted only when the credential actually exists (B-4).
    hasCredential: business.operator.certifyingBody
      ? [{
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'certification',
          name: business.operator.certificationName,
          recognizedBy: { '@type': 'Organization', name: business.operator.certifyingBody },
          dateCreated: business.operator.certificationDate,
          expires: business.operator.certificationExpires,
        }]
      : null,
  };

  return [
    {
      '@type': 'WebSite',
      '@id': ID.website,
      url: `${SITE}/`,
      name: business.name,
      publisher: { '@id': ID.org },
      inLanguage: 'en-US',
    },
    org,
    {
      '@type': 'ImageObject',
      '@id': ID.logo,
      url: abs(business.logo),
      width: business.logoWidth,
      height: business.logoHeight,
      caption: business.name,
    },
    person,
  ];
}

export interface Breadcrumb { name: string; path: string }
export interface Faq { q: string; a: string }

export interface PageSchemaInput {
  path: string;                 // e.g. '/services/k9-bed-bug-detection/'
  title: string;
  description: string;
  image?: string;
  breadcrumbs: Breadcrumb[];
  faqs?: Faq[];
  dateModified?: string;
  pageType?:
    | { kind: 'service'; serviceType: string; areaServed?: string[] }
    | { kind: 'article'; citations?: Array<{ label: string; url: string }> }
    | { kind: 'casestudy'; name: string }
    | { kind: 'profile'; about: string }
    | { kind: 'none' };
}

export function pageNodes(input: PageSchemaInput) {
  const url = `${SITE}${input.path}`;
  const webpageId = `${url}#webpage`;
  const imageUrl = abs(input.image ?? business.socialImage);
  const nodes: Record<string, unknown>[] = [];

  nodes.push({
    '@type': 'WebPage',
    '@id': webpageId,
    url,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.org },
    primaryImageOfPage: { '@id': `${url}#primaryimage` },
    inLanguage: 'en-US',
    dateModified: input.dateModified,
    // M4 — voice hooks. Selectors match AnswerBox and Faq components.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['[data-speakable]', '.faq-speakable'],
    },
  });

  nodes.push({
    '@type': 'ImageObject',
    '@id': `${url}#primaryimage`,
    url: imageUrl,
    contentUrl: imageUrl,
  });

  nodes.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: input.breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE}${b.path}`,
    })),
  });

  const pt = input.pageType ?? { kind: 'none' as const };
  if (pt.kind === 'service') {
    nodes.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: input.title,
      description: input.description,
      serviceType: pt.serviceType,
      provider: { '@id': ID.org },
      areaServed: (pt.areaServed ?? ['Washington']).map(n => ({ '@type': 'AdministrativeArea', name: n })),
      isPartOf: { '@id': webpageId },
      // NO Offer with a price unless real published pricing exists (B-10).
      // NO review — Service is not an eligible type for review snippets in any case.
    });
  } else if (pt.kind === 'article') {
    nodes.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: input.title,
      description: input.description,
      isPartOf: { '@id': webpageId },
      mainEntityOfPage: { '@id': webpageId },
      author: { '@id': ID.person },
      reviewedBy: { '@id': ID.person },
      publisher: { '@id': ID.org },
      image: { '@id': `${url}#primaryimage` },
      dateModified: input.dateModified,
      citation: pt.citations?.map(c => ({ '@type': 'CreativeWork', name: c.label, url: c.url })),
    });
  } else if (pt.kind === 'casestudy') {
    nodes.push({
      '@type': 'CreativeWork',
      '@id': `${url}#casestudy`,
      name: pt.name,
      genre: 'Case study',
      inLanguage: 'en-US',
      isPartOf: { '@id': webpageId },
      creator: { '@id': ID.org },
      author: { '@id': ID.person },
    });
  } else if (pt.kind === 'profile') {
    // schema.org has no animal type; model the dog as a Thing with a Wikidata additionalType.
    nodes.push({
      '@type': 'ProfilePage',
      '@id': `${url}#profile`,
      isPartOf: { '@id': webpageId },
      about: {
        '@type': 'Thing',
        name: pt.about,
        additionalType: 'https://www.wikidata.org/wiki/Q144',
      },
      mainEntity: { '@id': ID.person },
    });
  }

  // Exactly one FAQPage per URL, built from the same array the visible block renders from.
  if (input.faqs && input.faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      isPartOf: { '@id': webpageId },
      mainEntity: input.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return nodes;
}

/** Build the full connected @graph for a page. Called once, in BaseLayout. */
export function buildGraph(input: PageSchemaInput) {
  return clean({
    '@context': 'https://schema.org',
    '@graph': [...coreNodes(), ...pageNodes(input)],
  });
}
