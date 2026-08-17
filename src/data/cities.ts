/**
 * cities.ts — the Puget Sound core geo layer. Build plan Part 4.6.
 *
 * The `cluster` field controls depth without new code (Keystone 6.3):
 *   full   → city page + city×service children for both families
 *   triple → city page only (children added when research supports them)
 *   area   → areaServed mention on the geo hub only, no page
 *
 * `localHooks` are the anti-slop engine. A writer agent must use these real inputs;
 * a city page written without them will fail the duplicate-sentence scanner.
 * NOTHING here is invented — every hook is a checkable local fact or housing characteristic.
 */

export interface City {
  slug: string;
  name: string;
  county: string;
  lat: number;
  lon: number;
  cluster: 'full' | 'triple' | 'area';
  /** Which service families get a city×service child page. */
  childServices: Array<'bedbug' | 'goose'>;
  housingProfile: string;
  vintage: string;
  landmarks: string[];
  localHooks: string[];
}

export const cities: City[] = [
  {
    slug: 'seattle', name: 'Seattle', county: 'King', lat: 47.6062, lon: -122.3321,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'Majority-renter city — roughly 56% of households rent (about 205,000 renter households). Dense mid-rise and high-rise multifamily with a large pre-1940 apartment stock.',
    vintage: 'Pre-war brick courtyard apartments through 2015+ podium mid-rise',
    landmarks: ['Bell Street Cruise Terminal at Pier 66','Smith Cove Cruise Terminal at Pier 91','University District','Capitol Hill','Belltown','Rainier Valley'],
    localHooks: [
      'Ranked #30 on Orkin\'s 2026 bed bug cities list, up from #39 in 2025 — attribute to Orkin and state the methodology (it measures Orkin treatment volume, not incidence)',
      'Seattle names bed bugs explicitly in SMC 22.206.160.A.3; penalties run $150–$500 per day plus inspection charges',
      'SDCI Director\'s Rule 2-88 sets extermination-program standards and verification procedures',
      'The Rental Registration and Inspection Ordinance (RRIO) subjects registered rentals to periodic inspection',
      'Two cruise terminals homeport eight brands; the 2025 season moved 1.9 million revenue passengers across 298 ship calls',
      'Shared-wall pre-war stock means adjoining-unit screening is the norm, not the exception',
    ],
  },
  {
    slug: 'bellevue', name: 'Bellevue', county: 'King', lat: 47.6101, lon: -122.2015,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'Eastside high-rise and podium multifamily, newer stock, high corporate-housing and relocation turnover.',
    vintage: 'Predominantly post-2000, with 1970s–80s garden-style in the older corridors',
    landmarks: ['Bellevue Downtown Park','Mercer Slough','Lake Washington shoreline','Crossroads','Factoria'],
    localHooks: [
      'Corporate housing and short-stay relocation units turn over far faster than conventional leases — a screening cadence problem, not a one-off inspection',
      'Lakefront and slough-adjacent HOA grounds carry persistent resident Canada goose pressure',
      'Newer construction does not mean lower risk: bed bugs arrive with occupants, not with the building',
    ],
  },
  {
    slug: 'tacoma', name: 'Tacoma', county: 'Pierce', lat: 47.2529, lon: -122.4443,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'Older wood-frame multifamily and converted single-family stock, with a substantial workforce-housing segment.',
    vintage: 'Large 1900–1940 and 1960s–70s inventory',
    landmarks: ['Port of Tacoma','UW Tacoma','Hilltop','Stadium District','Point Defiance Park'],
    localHooks: [
      'Pierce County operates under state law (RCW 59.18.060(4)) without a Seattle-style municipal bed bug provision — the contrast is a genuine content gap worth explaining',
      'UW Tacoma student housing concentrates move-in and move-out surges into narrow windows',
      'Older wood-frame construction offers far more harbourage than the sealed assemblies of newer builds',
    ],
  },
  {
    slug: 'everett', name: 'Everett', county: 'Snohomish', lat: 47.9790, lon: -122.2021,
    cluster: 'full', childServices: ['bedbug'],
    housingProfile: 'Workforce and military-adjacent multifamily with shift-pattern occupancy.',
    vintage: 'Mixed mid-century garden-style and 2000s infill',
    landmarks: ['Naval Station Everett','Everett Waterfront','Silver Lake','Boeing Everett site'],
    localHooks: [
      'Naval Station and aerospace shift work produce occupancy patterns that make daytime-only inspection scheduling unworkable',
      'Waterfront parks and retention basins carry resident goose pressure through the shoulder seasons',
      'High tenant mobility in workforce housing raises turnover-screening value per unit',
    ],
  },
  {
    slug: 'kent', name: 'Kent', county: 'King', lat: 47.3809, lon: -122.2348,
    cluster: 'triple', childServices: [],
    housingProfile: 'Large garden-style apartment inventory serving the region\'s warehouse and distribution workforce.',
    vintage: 'Heavily 1970s–1990s garden-style',
    landmarks: ['Kent Valley distribution corridor','Green River','Kent Station'],
    localHooks: [
      'The Kent Valley is the state\'s distribution spine — workforce housing density and turnover are both high',
      'Garden-style buildings share attics and utility chases, which changes the adjoining-unit screening pattern relative to stacked mid-rise',
      'Green River corridor grounds see seasonal goose activity',
    ],
  },
  {
    slug: 'renton', name: 'Renton', county: 'King', lat: 47.4829, lon: -122.2171,
    cluster: 'triple', childServices: [],
    housingProfile: 'Mixed-vintage multifamily across lake and river corridors.',
    vintage: '1960s–2010s, wide spread',
    landmarks: ['Lake Washington south shore','Cedar River','Gene Coulon Memorial Beach Park'],
    localHooks: [
      'Lake and river corridor parks and HOA grounds are among the most goose-pressured in south King County',
      'Wide construction-vintage spread means inspection approach varies substantially building to building',
    ],
  },
  {
    slug: 'olympia', name: 'Olympia', county: 'Thurston', lat: 47.0379, lon: -122.9007,
    cluster: 'triple', childServices: [],
    housingProfile: 'State-government workforce housing plus a distinct student-housing segment.',
    vintage: 'Mixed mid-century and 1990s–2000s',
    landmarks: ['Washington State Capitol Campus','Capitol Lake','The Evergreen State College','Budd Inlet'],
    localHooks: [
      'Capitol Campus grounds and Capitol Lake carry well-documented waterfowl management pressure',
      'Evergreen student housing concentrates turnover into the academic calendar',
      'State agency and institutional buyers procure differently from private property management — documentation requirements are stricter',
    ],
  },
  {
    slug: 'spokane', name: 'Spokane', county: 'Spokane', lat: 47.6588, lon: -117.4260,
    cluster: 'full', childServices: ['bedbug'],
    housingProfile: 'The oldest multifamily stock among Washington\'s major markets, with a large student-adjacent rental segment.',
    vintage: 'Substantial pre-1940 brick apartment inventory',
    landmarks: ['Gonzaga University','Riverfront Park','Spokane River','Browne\'s Addition'],
    localHooks: [
      'Eastern Washington\'s continental climate produces a materially different indoor pest season from the maritime west side — do not reuse west-side seasonal copy here',
      'Browne\'s Addition and the pre-1940 brick apartment stock offer extensive harbourage in trim, baseboard and shared wall voids',
      'Gonzaga-adjacent rentals turn over on the academic calendar',
    ],
  },
  {
    slug: 'vancouver', name: 'Vancouver', county: 'Clark', lat: 45.6387, lon: -122.6615,
    cluster: 'triple', childServices: [],
    housingProfile: 'Portland-metro spillover housing operating under Washington law.',
    vintage: '1980s–2020s, rapid recent growth',
    landmarks: ['Columbia River waterfront','Esther Short Park','Vancouver Waterfront'],
    localHooks: [
      'Clark County renters and landlords consume Portland media but are governed by Washington law — RCW 59.18 applies, Oregon statute does not. This confusion is a real, unserved content gap',
      'Rapid recent construction sits alongside 1980s stock, so building-age assumptions fail here more than elsewhere',
    ],
  },
  {
    slug: 'bellingham', name: 'Bellingham', county: 'Whatcom', lat: 48.7519, lon: -122.4787,
    cluster: 'triple', childServices: [],
    housingProfile: 'University-driven rental market with significant cross-border travel exposure.',
    vintage: 'Older near-campus housing plus newer infill',
    landmarks: ['Western Washington University','Fairhaven','Bellingham Bay'],
    localHooks: [
      'WWU housing turnover follows the academic calendar with concentrated move-in and move-out weeks',
      'Cross-border travel raises introduction risk in short-stay lodging',
    ],
    // B-6: confirm Whatcom County is within the intended service radius before building.
  },
];

export const fullCities = cities.filter(c => c.cluster === 'full');
export const cityBySlug = (slug: string) => cities.find(c => c.slug === slug);
