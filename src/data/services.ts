/**
 * services.ts — the five confirmed services. Build plan Part 4.2.
 * Keystone Part 14: never invent a service. Adding a row here is an owner decision.
 */

export interface Service {
  slug: string;
  name: string;              // H1 / nav label
  title: string;             // <title>, <= 60 chars, validated by scripts/seo-audit.mjs
  shortName: string;         // for cross-links and breadcrumbs
  order: number;
  family: 'bedbug' | 'goose';
  schemaServiceType: string;
  /** Problem micro pages nested under this service (Part 4.3). */
  problems: Array<{ slug: string; title: string }>;
  /** Verticals that should link laterally to this service. */
  relatedVerticals: string[];
}

export const services: Service[] = [
  {
    slug: 'k9-bed-bug-detection',
    name: 'K9 Bed Bug Detection',
    title: 'K9 Bed Bug Detection Inspections | Washington',
    shortName: 'Bed bug detection',
    order: 1,
    family: 'bedbug',
    schemaServiceType: 'Canine bed bug detection inspection',
    problems: [
      { slug: 'bites-but-no-evidence',        title: 'Bites but No Bed Bugs Found: What to Do Next' },
      { slug: 'adjoining-unit-screening',     title: 'One Unit Has Bed Bugs. Which Neighbours Do You Check?' },
      { slug: 'still-there-after-treatment',  title: 'Bed Bugs Still There After Treatment? Verify First' },
      { slug: 'after-a-hotel-or-cruise-stay', title: 'Bed Bugs After a Hotel or Cruise Stay | What to Check' },
      { slug: 'used-furniture-screening',     title: 'Screening Used Furniture Before It Comes Inside' },
    ],
    relatedVerticals: ['multifamily','hotels-and-lodging','cruise-and-maritime','theaters-and-venues','student-housing','senior-living'],
  },
  {
    slug: 'bed-bug-verification-inspection',
    name: 'Post-Treatment Verification',
    title: 'Post-Treatment Bed Bug Verification Inspections',
    shortName: 'Verification inspections',
    order: 2,
    family: 'bedbug',
    schemaServiceType: 'Post-treatment bed bug verification inspection',
    problems: [],
    relatedVerticals: ['multifamily','hotels-and-lodging','senior-living'],
  },
  {
    slug: 'turnover-screening',
    name: 'Move-In / Move-Out Screening',
    title: 'Move-In and Move-Out Bed Bug Screening | WA',
    shortName: 'Turnover screening',
    order: 3,
    family: 'bedbug',
    schemaServiceType: 'Tenant turnover bed bug screening',
    problems: [],
    relatedVerticals: ['multifamily','student-housing'],
  },
  {
    slug: 'building-wide-sweep',
    name: 'Building-Wide Sweeps',
    title: 'Building-Wide Canine Bed Bug Sweeps | Multifamily',
    shortName: 'Building-wide sweeps',
    order: 4,
    family: 'bedbug',
    schemaServiceType: 'Building-wide canine bed bug sweep',
    problems: [],
    relatedVerticals: ['multifamily','student-housing','senior-living','hotels-and-lodging'],
  },
  {
    slug: 'k9-goose-deterrent',
    name: 'K9 Goose Deterrent',
    title: 'K9 Canada Goose Deterrent Programs | Washington',
    shortName: 'Goose deterrent',
    order: 5,
    family: 'goose',
    schemaServiceType: 'Canine Canada goose hazing and deterrent program',
    problems: [
      { slug: 'geese-on-a-retention-pond',       title: 'Geese on a Retention Pond: What Actually Works' },
      { slug: 'droppings-and-walkway-liability', title: 'Goose Droppings, Walkways and Property Liability' },
    ],
    relatedVerticals: ['hoas-and-grounds','corporate-campuses'],
  },
];

export const serviceBySlug = (slug: string) => services.find(s => s.slug === slug);
