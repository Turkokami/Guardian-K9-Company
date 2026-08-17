/**
 * compliance.ts — the regulatory cluster. Build plan Part 4.4.
 *
 * EVERY citation here was verified against a primary source. `url` must resolve.
 * A compliance page renders a visible "Reviewed {reviewedDate} — sources below" line
 * and a standing not-legal-advice notice, both from this data.
 *
 * Wave 3 gate: every citation is re-verified against the primary source by a separate
 * pass before publish. A wrong citation on a compliance page is worse than no page.
 */

export interface Citation {
  label: string;
  url: string;
  quote?: string;
}

export interface ComplianceTopic {
  slug: string;
  title: string;                 // <= 60 chars
  h1: string;
  reviewedDate: string;          // ISO — drives the visible review line and dateModified
  citations: Citation[];
  relatedVerticals: string[];
  relatedServices: string[];
  /** Blocks publish until cleared. */
  blockedBy?: string;
}

export const NOT_LEGAL_ADVICE =
  'This page is general information about Washington law, not legal advice. ' +
  'Statutes and municipal codes change. Verify against the primary sources linked below, ' +
  'and consult an attorney about your specific situation.';

export const complianceTopics: ComplianceTopic[] = [
  {
    slug: 'washington-landlord-tenant-bed-bugs',
    title: 'Bed Bugs in WA Rentals: Landlord or Tenant?',
    h1: 'Bed Bugs in Washington Rentals: Who Is Responsible?',
    reviewedDate: '2026-08-17',
    citations: [
      {
        label: 'RCW 59.18.060(4) — Landlord duties',
        url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.060',
        quote: 'Provide a reasonable program for the control of infestation by insects, rodents, and other pests at the initiation of the tenancy and, except in the case of a single-family residence, control infestation during tenancy except where such infestation is caused by the tenant.',
      },
      { label: 'RCW 59.18.130 — Tenant duties', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.130' },
      { label: 'WashingtonLawHelp — Pest infestations', url: 'https://www.washingtonlawhelp.org/en/pest-infestations' },
    ],
    relatedVerticals: ['multifamily','student-housing','senior-living'],
    relatedServices: ['building-wide-sweep','k9-bed-bug-detection'],
  },
  {
    slug: 'seattle-rental-bed-bug-rules',
    title: 'Seattle Rental Bed Bug Rules and Penalties',
    h1: 'Seattle Rental Housing Bed Bug Rules and Penalties',
    reviewedDate: '2026-08-17',
    citations: [
      { label: 'Seattle SDCI — Pests in rental housing', url: 'https://www.seattle.gov/construction-and-inspections/codes/common-code-questions/pests' },
      { label: 'Seattle CAM 604A', url: 'https://www.seattle.gov/DPD/publications/CAM/Cam604A.pdf' },
    ],
    relatedVerticals: ['multifamily','student-housing'],
    relatedServices: ['building-wide-sweep','turnover-screening'],
  },
  {
    slug: 'entry-notice-for-unit-inspections',
    title: 'Notice Requirements for Entering a Rental Unit',
    h1: 'Entry Notice Requirements for Rental Unit Inspections in Washington',
    reviewedDate: '2026-08-17',
    citations: [
      { label: 'RCW 59.18.150 — Landlord\'s right of entry', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.150' },
    ],
    relatedVerticals: ['multifamily','student-housing','senior-living'],
    relatedServices: ['building-wide-sweep'],
  },
  {
    slug: 'canada-goose-law-washington',
    title: 'Canada Goose Law in Washington: What\'s Allowed',
    h1: 'Canada Goose Law in Washington: What Is and Is Not Allowed',
    reviewedDate: '2026-08-17',
    citations: [
      {
        label: '50 CFR 10.12 — Definition of "take"',
        url: 'https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-10/subpart-B/section-10.12',
        quote: 'to pursue, hunt, shoot, wound, kill, trap, capture, or collect, or attempt to pursue, hunt, shoot, wound, kill, trap, capture, or collect.',
      },
      {
        label: '50 CFR 21.162 — Resident Canada Goose Nest and Egg Depredation Order',
        url: 'https://www.ecfr.gov/current/title-50/chapter-I/subchapter-B/part-21/subpart-D/section-21.162',
      },
      {
        label: 'WDFW — Living with Wildlife: Canada Geese',
        url: 'https://wdfw.wa.gov/species-habitats/living/species-facts/canada-geese',
        quote: 'When directed by a handler, dogs are the method of choice for large open areas such as golf courses, airports, parks, agricultural fields, and corporate parks.',
      },
      { label: 'RCW 77.15.240 — Unlawful use of dogs', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=77.15.240' },
      { label: 'USFWS Resident Canada Goose Registration', url: 'https://apps.fws.gov/rcgr/resources/faq' },
    ],
    relatedVerticals: ['hoas-and-grounds','corporate-campuses'],
    relatedServices: ['k9-goose-deterrent'],
  },
  {
    slug: 'what-a-defensible-report-contains',
    title: 'What Makes a Bed Bug Report Defensible',
    h1: 'What Makes a Bed Bug Inspection Report Defensible',
    reviewedDate: '2026-08-17',
    citations: [
      { label: 'RCW 59.18.060(4)', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.060' },
      { label: 'RCW 59.18.130', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=59.18.130' },
    ],
    relatedVerticals: ['multifamily','hotels-and-lodging','cruise-and-maritime','theaters-and-venues','student-housing','senior-living'],
    relatedServices: ['k9-bed-bug-detection','bed-bug-verification-inspection','building-wide-sweep'],
  },
  {
    slug: 'pest-licensing-in-washington',
    title: 'Pest Licensing in Washington: Who Needs What',
    h1: 'Pest Control Licensing in Washington: Who Needs What',
    reviewedDate: '2026-08-17',
    citations: [
      { label: 'RCW 15.58.030 — Definitions', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=15.58.030' },
      { label: 'RCW 15.58.205 — Structural pest inspector licence', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=15.58.205' },
      { label: 'RCW 15.58.210 — Pest control consultant licence', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=15.58.210' },
      { label: 'RCW 17.21.020 — Applicator definitions', url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=17.21.020' },
    ],
    relatedVerticals: ['multifamily'],
    relatedServices: ['k9-bed-bug-detection'],
    blockedBy: 'B-2 — WSDA written determination required before publish',
  },
];

export const buildableCompliance = complianceTopics.filter(t => !t.blockedBy);
