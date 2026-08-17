/**
 * verticals.ts — the eight commercial programs. Build plan Part 4.5.
 *
 * `authorities` is the field that beats the benchmark. Seven of their eight vertical
 * pages carry an undifferentiated "standards" paragraph; only healthcare names real
 * authorities as subheadings. On this site, EVERY vertical renders named authorities
 * as H3s — a vertical with an empty `authorities` array fails the acceptance gate.
 */

export interface Vertical {
  slug: string;
  name: string;
  title: string;                 // <= 60 chars
  audience: string;              // who actually buys
  stake: string;                 // what they are afraid of (plan 2.3)
  family: 'bedbug' | 'goose' | 'both';
  /** Named standards bodies, statutes or regulators rendered as H3s. Never empty. */
  authorities: string[];
  hooks: string[];
  relatedServices: string[];
  relatedVerticals: string[];
  complianceLinks: string[];
  /** Requires owner sign-off before build (Keystone Part 14). */
  pendingSignOff?: string;
}

export const verticals: Vertical[] = [
  {
    slug: 'multifamily',
    name: 'Multifamily & Property Management',
    title: 'Multifamily Bed Bug Detection Programs | WA',
    audience: 'Property managers, regional managers, asset managers',
    stake: 'A habitability complaint, a chargeback dispute they lose, and spread to adjoining units while responsibility is argued',
    family: 'bedbug',
    authorities: [
      'RCW 59.18.060(4) — the landlord duty to control infestation, and its two carve-outs',
      'RCW 59.18.130 — tenant duties and liability for extermination costs where the tenant caused it',
      'RCW 59.18.150 — entry notice requirements for unit inspections',
      'Seattle SMC 22.206.160.A.3 and SDCI Director\'s Rule 2-88',
      'Seattle Rental Registration and Inspection Ordinance (RRIO)',
    ],
    hooks: [
      'Seattle is a majority-renter city — roughly 56% of households rent',
      'Puget Sound apartment vacancy was 5.6% in Q3 2025; King County average rent $2,126 — a vacant unit day has a price',
      'The unit-by-unit alert map is the artifact that resolves a causation dispute',
      'Statewide there are roughly 1.11 million renter households',
    ],
    relatedServices: ['k9-bed-bug-detection','building-wide-sweep','turnover-screening','bed-bug-verification-inspection'],
    relatedVerticals: ['student-housing','senior-living','hotels-and-lodging'],
    complianceLinks: ['washington-landlord-tenant-bed-bugs','seattle-rental-bed-bug-rules','entry-notice-for-unit-inspections','what-a-defensible-report-contains'],
  },
  {
    slug: 'hotels-and-lodging',
    name: 'Hotels & Lodging',
    title: 'Hotel Bed Bug Inspection Programs | Washington',
    audience: 'General managers, directors of housekeeping, ownership groups',
    stake: 'One review, one refund cycle, one OTA rating drop',
    family: 'bedbug',
    authorities: [
      'AHLA lodging industry guidance on bed bug response protocols',
      'Brand-standard inspection and documentation programs',
      'Washington transient accommodation licensing and inspection requirements',
      'RCW 70.62 — transient accommodation licensing',
    ],
    hooks: [
      'Discretion is an operational requirement: no marked vehicle, no uniform, after-hours scheduling',
      'A room out of service has a nightly cost that makes detection speed the whole economic argument',
      'Verification after treatment is what lets a room be resold with a defensible record',
    ],
    relatedServices: ['k9-bed-bug-detection','bed-bug-verification-inspection','building-wide-sweep'],
    relatedVerticals: ['cruise-and-maritime','multifamily','senior-living'],
    complianceLinks: ['what-a-defensible-report-contains'],
  },
  {
    slug: 'cruise-and-maritime',
    name: 'Cruise & Maritime',
    title: 'Cruise Ship Bed Bug Detection | Port of Seattle',
    audience: 'Hotel directors, port operations, vessel housekeeping management',
    stake: 'A cabin out of service mid-season with a turnaround window measured in hours',
    family: 'bedbug',
    authorities: [
      'CDC Vessel Sanitation Program inspection and reporting framework',
      'Port of Seattle terminal operating requirements and access control',
      'Flag-state and company sanitation standards',
    ],
    hooks: [
      'The 2025 Seattle season moved 1.9 million revenue passengers across 298 ship calls, 8 homeport brands and 14 ships',
      'Bell Street Cruise Terminal at Pier 66 and Smith Cove Cruise Terminal at Pier 91 — Pier 91 has two 1,200-foot berths and a 143,000 sq ft terminal',
      'Turnaround day is the entire inspection window; canine screening covers cabin counts visual inspection cannot',
      'The season runs roughly spring through late October — the 2025 season ended 21 October',
    ],
    relatedServices: ['k9-bed-bug-detection','bed-bug-verification-inspection','building-wide-sweep'],
    relatedVerticals: ['hotels-and-lodging','theaters-and-venues'],
    complianceLinks: ['what-a-defensible-report-contains'],
  },
  {
    slug: 'theaters-and-venues',
    name: 'Theatres & Venues',
    title: 'Cinema and Venue Bed Bug Detection | Washington',
    audience: 'Venue operations managers, facilities directors, circuit operations',
    stake: 'Upholstered seating at scale, no visual inspection method that works, and a complaint they can neither verify nor refute',
    family: 'bedbug',
    authorities: [
      'Washington L&I workplace safety obligations for venue staff',
      'Local health jurisdiction public accommodation standards',
      'Venue insurance carrier inspection and documentation requirements',
    ],
    hooks: [
      'Upholstered fixed seating is the hardest inspection target in the built environment — seams, frames and floor junctions across hundreds of seats',
      'A canine sweep runs between showings; a visual inspection of an auditorium does not scale at all',
      'Most venue complaints cannot currently be verified OR refuted, which is a liability position rather than an answer',
    ],
    relatedServices: ['k9-bed-bug-detection','bed-bug-verification-inspection'],
    relatedVerticals: ['cruise-and-maritime','hotels-and-lodging'],
    complianceLinks: ['what-a-defensible-report-contains'],
  },
  {
    slug: 'student-housing',
    name: 'Student Housing & Campuses',
    title: 'Student Housing Bed Bug Detection | WA Campuses',
    audience: 'Housing directors, residence life, campus facilities',
    stake: 'Move-in and move-out surge, parental escalation, and hundreds of beds turning over in a week',
    family: 'bedbug',
    authorities: [
      'Campus integrated pest management policy requirements',
      'RCW 59.18 as applied to university-owned rental housing',
      'Residence life incident reporting and escalation chains',
      'Washington L&I obligations toward residence life staff',
    ],
    hooks: [
      'Move-in and move-out compress an entire year of turnover risk into two weeks',
      'Belongings arrive from every market a student came from, which makes origin tracing meaningless and screening essential',
      'Parental escalation moves faster than any internal work order system',
    ],
    relatedServices: ['k9-bed-bug-detection','turnover-screening','building-wide-sweep'],
    relatedVerticals: ['multifamily','senior-living'],
    complianceLinks: ['washington-landlord-tenant-bed-bugs','entry-notice-for-unit-inspections','what-a-defensible-report-contains'],
  },
  {
    slug: 'senior-living',
    name: 'Senior Living & Care',
    title: 'Senior Living Bed Bug Detection | Discreet, No Chemicals',
    audience: 'Executive directors, environmental services, regional care operators',
    stake: 'Resident dignity, family communication, and visibility to regulators and the ombudsman',
    family: 'bedbug',
    authorities: [
      'CMS conditions of participation for long-term care facilities',
      'Washington DSHS assisted living and nursing home licensing requirements',
      'Washington State Long-Term Care Ombudsman program oversight',
      'CDC infection-control guidance for congregate care settings',
    ],
    hooks: [
      'Detection involves no chemical exposure — in a setting with medically vulnerable residents that is the lead, not a footnote',
      'Residents cannot always report reliably, so screening replaces complaint-driven discovery',
      'Family communication is easier with a dated third-party document than with an internal assurance',
    ],
    relatedServices: ['k9-bed-bug-detection','bed-bug-verification-inspection','building-wide-sweep'],
    relatedVerticals: ['multifamily','student-housing'],
    complianceLinks: ['what-a-defensible-report-contains'],
  },
  {
    slug: 'hoas-and-grounds',
    name: 'HOAs, Golf & Grounds',
    title: 'HOA and Grounds Goose Management | Washington',
    audience: 'HOA boards, community managers, golf course superintendents, parks staff',
    stake: 'Grounds unusable, slip liability on walkways, and a decision the board has to minute and defend',
    family: 'goose',
    authorities: [
      'Migratory Bird Treaty Act — Canada geese are federally protected',
      '50 CFR 21.162 — Resident Canada Goose Nest and Egg Depredation Order, and who may register',
      'WDFW Living with Wildlife guidance naming handler-directed dogs as the method of choice',
      'RCW 77.15.240 — unlawful use of dogs, which does not apply to waterfowl',
      'Local leash and park ordinances, and WDFW commercial-use permitting on WDFW lands',
    ],
    hooks: [
      'Registration under the nest and egg order belongs to the association or landowner, never to a vendor — Guardian can only act as an agent under their registration',
      'Hazing pauses during the flightless molt: birds that cannot fly cannot be lawfully or humanely moved',
      'This is a program with a cadence, not a one-time visit — geese return to sites that stop being defended',
      'A documented program record is what lets a board show it acted reasonably',
    ],
    relatedServices: ['k9-goose-deterrent'],
    relatedVerticals: ['corporate-campuses'],
    complianceLinks: ['canada-goose-law-washington'],
  },
  {
    slug: 'corporate-campuses',
    name: 'Corporate Campuses',
    title: 'Corporate Campus Detection and Goose Programs',
    audience: 'Facilities directors, workplace services, corporate real estate',
    stake: 'Two unrelated-looking problems landing on one procurement desk',
    family: 'both',
    authorities: [
      'Washington L&I workplace safety obligations',
      'Migratory Bird Treaty Act and 50 CFR 21.162 for grounds work',
      'Corporate real estate vendor documentation and insurance requirements',
    ],
    hooks: [
      'One buyer, one relationship, two line items — corporate housing screening and grounds goose management',
      'Facilities procurement wants a scheduled program with documented results, not an emergency call-out',
    ],
    relatedServices: ['k9-bed-bug-detection','k9-goose-deterrent','turnover-screening'],
    relatedVerticals: ['hoas-and-grounds','multifamily'],
    complianceLinks: ['canada-goose-law-washington','what-a-defensible-report-contains'],
    pendingSignOff: 'B-5 — owner must confirm this vertical is served before the page is built',
  },
];

export const buildableVerticals = verticals.filter(v => !v.pendingSignOff);
export const verticalBySlug = (slug: string) => verticals.find(v => v.slug === slug);
