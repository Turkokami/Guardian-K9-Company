/**
 * business.ts — the single source of truth for every NAP, credential and identity string
 * on this site. Nothing anywhere else hardcodes a phone number, email, licence or URL.
 *
 * PENDING-CLIENT-INPUT PATTERN (Keystone 7.2):
 *   Fields the client still owes are `null`, never a plausible placeholder.
 *   Components guard on them: {business.phone && <PhoneBar/>}
 *   A null field means the block does not render and the schema node is not emitted.
 *   NEVER fill one of these with an invented value to "make the page look finished."
 *
 * Blocker IDs refer to Part 12 of the build plan.
 */

export type PendingString = string | null;

export const business = {
  // ---- identity -----------------------------------------------------------
  name: 'Guardian K9 Company',
  legalName: null as PendingString,          // B-8: exact name as registered with WA DOR
  shortName: 'Guardian K9',
  domain: 'guardiank9company.com',
  siteUrl: 'https://guardiank9company.com',
  tagline: 'Independent canine detection',
  description:
    'Independent canine bed bug detection and K9 goose deterrent services for multifamily ' +
    'housing and commercial facilities across Washington State.',

  // ---- contact ------------------------------------------------------------
  phone: null as PendingString,              // B-8: E.164 in `phoneE164`, display in `phone`
  phoneE164: null as PendingString,
  email: null as PendingString,              // B-8
  contactFormOnly: true,                     // until phone lands, CTAs route to the form

  // ---- registration -------------------------------------------------------
  ubi: null as PendingString,                // B-8: WA DOR UBI number
  foundingDate: null as PendingString,       // B-8: ISO date
  insuranceCarrier: null as PendingString,   // B-8
  insuranceCoverage: null as PendingString,  // B-8

  /**
   * SERVICE-AREA BUSINESS — no street address is published anywhere on this site.
   * Schema emits areaServed only; there is deliberately no PostalAddress street line.
   * Whatever the GBP shows must match the footer and schema character for character.
   */
  address: null,
  addressRegion: 'WA',
  addressCountry: 'US',

  // ---- the operator -------------------------------------------------------
  operator: {
    name: 'Lindsey Elling',
    slug: 'lindsey-elling',
    jobTitle: 'Owner and Canine Detection Handler',
    yearsAnimalCare: 20,
    /**
     * B-4: certification is NOT claimed until it is held and verifiable.
     * When these fill in, the credential block renders and hasCredential is emitted
     * everywhere at once. Until then neither appears. This is a hard honesty gate.
     */
    certifyingBody: null as PendingString,        // 'NESDCA' | 'WDDO' | other
    certificationName: null as PendingString,
    certificationDate: null as PendingString,     // ISO
    certificationExpires: null as PendingString,  // ISO
    /**
     * B-7: written consent from Kimberly Camera required before the lineage block renders.
     * Copy rule (plan 4.9): factual, past tense, scope + period. Methodology transfers;
     * status does NOT. Never imply affiliation, endorsement or certification-by-mentor.
     */
    mentorConsentOnFile: false,
    mentorName: null as PendingString,
    mentorTrainingPeriod: null as PendingString,
    mentorTrainingScope: null as PendingString,
  },

  // ---- the dogs (mandate G1) ---------------------------------------------
  /**
   * B-4. Empty array = the /our-dogs/ profile routes are not generated and the
   * named-team block does not render. G1 cannot be satisfied with a stock photo.
   */
  dogs: [] as Array<{
    name: string;
    slug: string;
    breed: string;
    birthYear: number;
    source: string;
    certifiedOn: string[];        // odours the dog is certified to detect
    certifyingBody: string;
    certificationDate: string;    // ISO
    certificationExpires: string; // ISO
    maintenanceTraining: string;  // e.g. 'daily blind-trial reps'
    photo: string;
  }>,

  // ---- profiles -----------------------------------------------------------
  gbpUrl: null as PendingString,             // B-8
  social: {
    facebook: null as PendingString,
    instagram: null as PendingString,
    linkedin: null as PendingString,
  },

  // ---- brand assets -------------------------------------------------------
  logo: '/img/guardian-k9-logo.png',         // B-11: 512x512 minimum
  logoWidth: 512,
  logoHeight: 512,
  /**
   * Small rendition of the same badge for the header, which renders it at 38px.
   * The 512px file above stays the canonical logo for schema and social cards; serving
   * it into a 38px slot would push half a megabyte onto every page load.
   */
  logoMark: '/img/guardian-k9-logo-mark.png',
  /** Hero-scale rendition of the badge. Kept for reuse; the homepage now leads with the banner. */
  logoLarge: '/img/guardian-k9-badge-480.jpg',
  /**
   * Full-width homepage banner. Source art is 1983x793 (2.5:1); these are the web
   * renditions. `bannerWidths` drives the srcset so the browser picks by viewport.
   */
  banner: '/img/guardian-k9-banner-1280.jpg',
  bannerWidths: [800, 1280, 1920],
  bannerAspect: '1983 / 793',
  socialImage: '/img/guardian-k9-social.jpg',// B-11: M7 shared hero/social image
  socialImageWidth: 1200,
  socialImageHeight: 630,

  // ---- policy -------------------------------------------------------------
  /** Defined-term only, process not outcome. B-9 supplies the ratified text. */
  guaranteeTermsPublished: false,
  /** B-10: 'ranges' | 'methodology' | 'none' */
  pricingPosture: 'methodology' as 'ranges' | 'methodology' | 'none',
  /** B-3: whether Guardian will act as agent under a landowner 50 CFR 21.162 registration */
  offersNestEggAgentWork: false,

  hours: [
    { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '07:00', closes: '18:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],
} as const;

/** True when every launch-blocking (P0) field is filled. Used by the harness. */
export function launchReady(): { ready: boolean; missing: string[] } {
  const missing: string[] = [];
  if (!business.legalName) missing.push('legalName (B-8)');
  if (!business.phone) missing.push('phone (B-8)');
  if (!business.email) missing.push('email (B-8)');
  if (!business.ubi) missing.push('ubi (B-8)');
  if (!business.operator.certifyingBody) missing.push('operator.certifyingBody (B-4)');
  if (business.dogs.length === 0) missing.push('dogs[] (B-4) — mandate G1 cannot be met');
  if (!business.guaranteeTermsPublished) missing.push('guaranteeTerms (B-9)');
  return { ready: missing.length === 0, missing };
}
