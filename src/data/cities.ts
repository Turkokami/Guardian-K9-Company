/**
 * cities.ts — the Northern Washington geo layer. Build plan Part 4.6.
 *
 * POSITIONING (client direction, 2026-08-17): Whatcom and Skagit are the prime work
 * zones. Guardian is a Northern Washington canine detection company that will travel
 * south when the job warrants it — not a Puget Sound company with a northern branch.
 * Array order drives the county order on /service-area/, so the north leads.
 *
 * Every incorporated city and town in Skagit County is represented, per client
 * direction. So is every incorporated city in Whatcom County.
 *
 * The `cluster` field controls depth without new code (Keystone 6.3):
 *   full   → city page + city×service children for both families
 *   triple → city page only (children added when research supports them)
 *   area   → named on the geo hub as covered, no page of its own
 *
 * `localHooks` are the anti-slop engine. A writer agent must use these real inputs;
 * a city page written without them will fail the duplicate-sentence scanner.
 * NOTHING here is invented — every hook is a checkable local fact or housing
 * characteristic. Where a figure could not be verified against a primary source it is
 * described qualitatively rather than guessed at (CONTENT_BRIEF §2).
 *
 * GOOSE SCOPE WARNING for anyone writing Skagit or Whatcom pages: the valley's famous
 * winter goose spectacle is SNOW geese (the Wrangel Island population, wintering in
 * counts often above 50,000, managed by WDFW partly through the Snow Goose Quality
 * Hunt Program). Guardian's goose work is handler-directed hazing of RESIDENT CANADA
 * geese on managed grounds. Do not blur the two. Saying the difference out loud is a
 * trust asset and a genuine differentiator — see CONTENT_BRIEF §1 C3.
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
  // ==========================================================================
  // WHATCOM COUNTY — prime work zone
  // ==========================================================================
  {
    slug: 'bellingham', name: 'Bellingham', county: 'Whatcom', lat: 48.7519, lon: -122.4787,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'The largest rental market north of Everett — a university city with dense older near-campus housing, a downtown and Fairhaven stock of converted and purpose-built apartments, and newer infill on the edges.',
    vintage: 'Pre-1940 near-campus and Fairhaven stock through 2015+ infill',
    landmarks: ['Western Washington University','Fairhaven Historic District','Alaska Marine Highway terminal at Fairhaven','Bellingham Bay','Lake Padden','Whatcom Falls Park','Barkley Village'],
    localHooks: [
      'Bellingham runs a Rental Registration and Safety Inspection Program under BMC 6.15 — rentals must be registered before they are let, a certificate must be posted in each unit, and units are inspected on roughly a three to three-and-a-half year cycle by a city or qualified private inspector. Owners here are already inside an inspection culture, which changes how a detection report is received',
      'WWU housing turns over on the academic calendar, concentrating move-in and move-out into a few weeks and making turnover screening a scheduling problem rather than a per-unit decision',
      'The Alaska Marine Highway southern terminus is at Fairhaven, so long-haul passenger traffic arrives with baggage that has been in shared holds and berths',
      'Cross-border travel from British Columbia raises introduction risk in short-stay lodging in a way that has no equivalent in south sound markets',
      'Lake Padden, Whatcom Falls and the city park system carry resident Canada goose pressure on managed turf — this is the resident population, not the wintering snow geese of the Skagit flats',
      'Older near-campus houses subdivided into rentals have trim, baseboard and shared-wall voids that offer far more harbourage than the sealed assemblies of newer builds',
    ],
  },
  {
    slug: 'ferndale', name: 'Ferndale', county: 'Whatcom', lat: 48.8465, lon: -122.5915,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'A fast-growing small city whose rental stock serves the Cherry Point industrial workforce, with a mix of newer subdivision housing and older river-corridor stock.',
    vintage: 'Predominantly 1990s–2020s, with an older core near the Nooksack',
    landmarks: ['Cherry Point industrial area','BP Cherry Point refinery','the former Alcoa Intalco Works site','Nooksack River','Pioneer Park','Lummi Nation (neighbouring)'],
    localHooks: [
      'Cherry Point industrial employment drives contractor lodging demand that spikes around plant turnarounds rather than following a seasonal curve',
      'Alcoa confirmed the permanent closure of the Intalco aluminium smelter in March 2023 after it had been idle since 2020; AltaGas subsequently acquired development rights to roughly 1,600 acres of the site. That is a real and recent reshaping of the local rental market, not background colour',
      'The Lummi Nation is a neighbouring sovereign government with its own housing authority and its own procurement — never assume county process applies',
      'Ferndale was among the areas ordered to evacuate during the November 2021 Nooksack flooding, and flood remediation cycles put replacement furniture into homes',
      'Corporate and industrial campus grounds with retention ponds carry resident Canada goose pressure of exactly the kind WDFW describes dogs as suited to',
    ],
  },
  {
    slug: 'lynden', name: 'Lynden', county: 'Whatcom', lat: 48.9465, lon: -122.4521,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'An agricultural city with a distinctive Dutch-heritage downtown, a large seasonal farm workforce, and family and institutional housing rather than large conventional apartment complexes.',
    vintage: 'Mixed early-century downtown and 1980s–2020s residential',
    landmarks: ['Lynden downtown historic district','Northwest Washington Fairgrounds','Lynden–Aldergrove border crossing','Nooksack River valley farmland','Berthusen Park'],
    localHooks: [
      'Whatcom County is one of the country\'s major red raspberry producing areas, and seasonal agricultural labour housing is a distinct inspection setting with its own state licensing, access and notice rules — it is not conventional multifamily and should never be written about as though it were',
      'The Lynden–Aldergrove border crossing brings steady cross-border movement through local lodging',
      'The Northwest Washington Fairgrounds draws large event volume into a small city, concentrating short-stay lodging demand into defined weeks',
      'Church, school and community institutional properties carry more of the local overnight capacity than hotel brands do',
      'Dairy and berry operation grounds and the surrounding open fields are the large open-area setting WDFW names as best suited to handler-directed dog work',
    ],
  },
  {
    slug: 'blaine', name: 'Blaine', county: 'Whatcom', lat: 48.9937, lon: -122.7466,
    cluster: 'full', childServices: ['bedbug'],
    housingProfile: 'A border city with an unusually high proportion of vacation, second-home and short-stay accommodation relative to its permanent population.',
    vintage: 'Mixed mid-century and 1990s–2020s resort and residential',
    landmarks: ['Peace Arch border crossing','Pacific Highway commercial truck crossing','Semiahmoo Resort and Spit','Birch Bay','Drayton Harbor','Blaine Marine Park'],
    localHooks: [
      'Blaine hosts both the Peace Arch passenger crossing and the Pacific Highway commercial crossing, putting a high volume of cross-border travellers and long-haul drivers through local lodging',
      'Semiahmoo and Birch Bay run on vacation-rental and resort turnover, where the unit changes occupants far more often than an apartment does and no housekeeping team sees the same room twice in a week',
      'Point Roberts is a United States exclave reachable by road only through Canada — a real service-logistics fact that shapes what can honestly be promised there',
      'Second homes that sit empty for months and are then occupied in bursts have an introduction and detection profile unlike continuously occupied housing',
    ],
  },
  {
    slug: 'everson', name: 'Everson', county: 'Whatcom', lat: 48.9204, lon: -122.3418,
    cluster: 'triple', childServices: [],
    housingProfile: 'A small agricultural city on the Nooksack River with a housing stock materially shaped by repeated flooding.',
    vintage: 'Mid-century and later, with substantial post-2021 flood repair',
    landmarks: ['Nooksack River','Everson Elementary School','agricultural land along the Nooksack'],
    localHooks: [
      'The November 2021 Nooksack flooding was described by county emergency officials as the worst since 1990; more than 500 people were displaced across north Whatcom County and shelters opened at Everson Elementary, Nooksack Elementary and a Lynden church',
      'Flood displacement, temporary housing, donated and replacement furniture and repeated moves are all documented bed bug introduction pathways — this is the single most important local factor here and it is almost never written about honestly',
      'Repeat flood exposure means housing is repaired and reoccupied rather than replaced, so the same structures carry forward',
      'Agricultural and dairy workforce housing sits alongside conventional residential in a way that complicates a building-wide approach',
    ],
  },
  {
    slug: 'nooksack', name: 'Nooksack', county: 'Whatcom', lat: 48.9285, lon: -122.3212,
    cluster: 'triple', childServices: [],
    housingProfile: 'A very small city adjoining Everson, sharing its river-corridor exposure and its agricultural workforce housing.',
    vintage: 'Mid-century and later, with post-2021 flood repair',
    landmarks: ['Nooksack River','Nooksack Elementary School','Nooksack Valley farmland'],
    localHooks: [
      'Nooksack was evacuated alongside Everson and Sumas in the November 2021 floods, and Nooksack Elementary served as one of the emergency shelters',
      'A city this size has no in-house facilities inspection capacity, so documentation has to stand on its own without an internal expert to interpret it',
      'The Nooksack Valley school district is among the larger institutional property holders in the area',
    ],
  },
  {
    slug: 'sumas', name: 'Sumas', county: 'Whatcom', lat: 49.0007, lon: -122.2646,
    cluster: 'triple', childServices: [],
    housingProfile: 'A border town whose building stock was overwhelmingly damaged in the 2021 floods and substantially rebuilt or repaired since.',
    vintage: 'Largely repaired or rebuilt post-2021 over an older base',
    landmarks: ['Sumas border crossing','Nooksack River floodplain','Sumas city centre'],
    localHooks: [
      'In Sumas alone, more than 85% of structures in town were damaged in the November 2021 flooding, many left unsafe or unlivable — there is no comparable recent housing-stock event anywhere else in our service area',
      'A town that has replaced most of its furniture and much of its housing in a compressed period has a genuinely different introduction risk profile, and the honest version of that story is worth more than a generic city page',
      'The Sumas border crossing brings cross-border traffic through a very small town',
      'Rebuild and repair work brings contractor crews into local and nearby lodging',
    ],
  },

  // ==========================================================================
  // SKAGIT COUNTY — prime work zone. All eight incorporated places.
  // ==========================================================================
  {
    slug: 'mount-vernon', name: 'Mount Vernon', county: 'Skagit', lat: 48.4212, lon: -122.3341,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'The Skagit County seat and its largest city — the county\'s main concentration of conventional apartment stock, alongside older downtown housing and a significant agricultural workforce housing segment.',
    vintage: 'Older downtown and riverfront stock through 2000s–2020s apartment development',
    landmarks: ['Skagit County courthouse and county offices','downtown Mount Vernon riverfront and floodwall','Skagit Valley College','Skagit Valley Hospital','Skagit River','Hillcrest Park'],
    localHooks: [
      'As the county seat, Mount Vernon holds the courts, the county offices and the institutional buyers — and institutional procurement has documentation requirements that private property management does not',
      'The Skagit Valley Tulip Festival runs through April and pulls very large visitor volume into the valley over a few weeks, concentrating short-stay lodging demand into a season rather than spreading it across the year',
      'Agricultural labour housing has occupancy patterns, licensing and access constraints unlike conventional multifamily, and cannot be inspected on the same assumptions',
      'Downtown sits behind a Skagit River floodwall; flood risk and remediation cycles put replacement furnishings into buildings on a schedule nobody plans for',
      'Skagit Valley College and Skagit Valley Hospital are the kind of large institutional properties where a detection report has to satisfy a facilities department, not a landlord',
      'The winter geese the valley is famous for are snow geese from the Wrangel Island population, not resident Canada geese — our hazing work is resident Canada goose management on managed grounds and we say so plainly',
    ],
  },
  {
    slug: 'burlington', name: 'Burlington', county: 'Skagit', lat: 48.4757, lon: -122.3251,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'The retail and lodging hub of the north I-5 corridor, carrying more short-stay accommodation per resident than any other Skagit city.',
    vintage: 'Mixed mid-century core and 1990s–2020s commercial-corridor development',
    landmarks: ['Interstate 5 retail and lodging corridor','Skagit River','Skagit Regional Airport (nearby)','Burlington–Edison school district properties'],
    localHooks: [
      'Burlington carries the north county\'s lodging cluster along the I-5 corridor, so transient accommodation risk concentrates here rather than in Mount Vernon where the residents are',
      'Freight and highway traffic through the corridor means a steady flow of one- and two-night stays, which is the hardest turnover pattern to screen against',
      'Retail and hospitality employment supports workforce rental housing with higher-than-average tenant mobility',
      'Skagit River proximity carries the same flood and remediation exposure as the rest of the valley floor',
      'Corridor commercial grounds and retention ponds carry resident Canada goose pressure — the large open managed areas WDFW identifies as suited to handler-directed dogs',
    ],
  },
  {
    slug: 'anacortes', name: 'Anacortes', county: 'Skagit', lat: 48.5126, lon: -122.6127,
    cluster: 'full', childServices: ['bedbug','goose'],
    housingProfile: 'An island city combining heavy industrial employment, marine trades and a substantial seasonal visitor and moorage population.',
    vintage: 'Older townsite stock with marine-industrial and newer waterfront development',
    landmarks: ['March Point refineries','Washington State Ferries terminal','Fidalgo Island','Cap Sante Marina','Guemes Channel','Washington Park'],
    localHooks: [
      'Two major refineries sit on March Point — the HF Sinclair Puget Sound Refinery, one of the largest employers in Skagit County at around 149,000 barrels per day, and the Marathon Anacortes Refinery at around 120,000 barrels per day. Scheduled turnarounds bring large contractor crews into short-stay lodging in predictable windows, which makes screening a calendar decision rather than a reactive one',
      'The Washington State Ferries terminal is the mainland gateway to the San Juan Islands, so seasonal passenger volume runs through local accommodation',
      'Marine trades, boatyards and liveaboard moorage are inspection settings that are not apartments and should not be described as though they were',
      'Island geography means travel time and ferry timetables are real constraints on what can honestly be promised for same-day work',
      'Waterfront parks and managed shoreline turf carry resident Canada goose pressure',
    ],
  },
  {
    slug: 'sedro-woolley', name: 'Sedro-Woolley', county: 'Skagit', lat: 48.5040, lon: -122.2362,
    cluster: 'full', childServices: ['bedbug'],
    housingProfile: 'A former mill and logging town with an older wood-frame housing stock and a large publicly held institutional campus.',
    vintage: 'Substantial early-century wood-frame inventory with later infill',
    landmarks: ['the former Northern State Hospital campus','downtown Sedro-Woolley historic core','Skagit River','State Route 20 — the North Cascades Highway corridor'],
    localHooks: [
      'Mill-era wood-frame construction offers far more harbourage in trim, baseboard and wall voids than the sealed assemblies of newer builds, and it changes how long a thorough search of a single unit actually takes',
      'The former Northern State Hospital campus is a large institutional property in public ownership — the kind of site where scope, access and documentation are negotiated with a public body rather than a landlord',
      'Sedro-Woolley is the gateway to the North Cascades Highway, so seasonal lodging demand tracks the highway season rather than the calendar',
      'A smaller rental market means individual owners rather than regional management companies, and individual owners have no in-house process for handling a positive finding',
    ],
  },
  {
    slug: 'la-conner', name: 'La Conner', county: 'Skagit', lat: 48.3926, lon: -122.4954,
    cluster: 'triple', childServices: [],
    housingProfile: 'A small historic waterfront town whose accommodation base is small inns, bed and breakfasts and vacation rentals rather than conventional lodging or apartments.',
    vintage: 'Predominantly historic, with restoration rather than replacement',
    landmarks: ['Swinomish Channel','La Conner historic waterfront','Museum of Northwest Art','Rainbow Bridge','Swinomish Indian Tribal Community (neighbouring)'],
    localHooks: [
      'The accommodation base is small independent inns and bed and breakfasts — properties with no in-house housekeeping inspection programme and no facilities department, where the owner is the person reading the report',
      'Historic building fabric complicates access to wall voids, trim and floor assemblies, and restoration constraints limit what can be opened up',
      'The Swinomish Indian Tribal Community is a neighbouring sovereign government with its own procurement and its own housing authority',
      'Tulip Festival and summer visitor volume lands disproportionately hard on a town this small',
    ],
  },
  {
    slug: 'concrete', name: 'Concrete', county: 'Skagit', lat: 48.5387, lon: -121.7480,
    cluster: 'triple', childServices: [],
    housingProfile: 'An upper-valley town with a small permanent housing stock and a seasonal recreation lodging component.',
    vintage: 'Early-century townsite stock with later infill',
    landmarks: ['Skagit River','Baker Lake and the Baker River valley','North Cascades Highway corridor','the historic Concrete townsite'],
    localHooks: [
      'Upper-valley travel time from the I-5 corridor is real, and scheduling that pretends otherwise is how a company ends up cancelling on people',
      'Seasonal recreation lodging around Baker Lake and the North Cascades turns over heavily in a short season and sits mostly empty outside it',
      'A very small permanent rental market means most property decisions are made by individual owners without professional management',
    ],
  },
  {
    slug: 'hamilton', name: 'Hamilton', county: 'Skagit', lat: 48.5240, lon: -121.9910,
    cluster: 'area', childServices: [],
    housingProfile: 'A very small upper-valley town on the Skagit River floodplain.',
    vintage: 'Older river-corridor stock',
    landmarks: ['Skagit River','State Route 20'],
    localHooks: [
      'Sits on the Skagit River floodplain with long-standing flood exposure',
      'Too small to support a dedicated page of genuine depth — covered, listed honestly, and served on the same terms as the rest of the upper valley',
    ],
  },
  {
    slug: 'lyman', name: 'Lyman', county: 'Skagit', lat: 48.5257, lon: -122.0576,
    cluster: 'area', childServices: [],
    housingProfile: 'A very small upper-valley town adjoining Hamilton on the Skagit River.',
    vintage: 'Older river-corridor stock',
    landmarks: ['Skagit River','State Route 20'],
    localHooks: [
      'Shares Hamilton\'s river-corridor flood exposure and upper-valley travel constraints',
      'Too small to support a dedicated page of genuine depth — covered, listed honestly, served on the same terms',
    ],
  },

  // ==========================================================================
  // ISLAND COUNTY — northern corridor, adjacent to Skagit across Deception Pass
  // ==========================================================================
  {
    slug: 'oak-harbor', name: 'Oak Harbor', county: 'Island', lat: 48.2932, lon: -122.6432,
    cluster: 'triple', childServices: [],
    housingProfile: 'A military-adjacent rental market where turnover follows posting orders rather than the calendar year.',
    vintage: 'Mid-century base-era housing through 2000s development',
    landmarks: ['Naval Air Station Whidbey Island','Deception Pass','Oak Harbor waterfront','Whidbey Island'],
    localHooks: [
      'Naval Air Station Whidbey Island drives a rental market that turns over on posting orders, so the move-in and move-out peaks do not line up with the academic or calendar-year cycles the rest of the region runs on',
      'Military households move with household goods packed, shipped and stored by third parties — a documented introduction pathway and one tenants have no control over',
      'Whidbey Island is reached from Skagit across Deception Pass, so this is a genuine extension of the northern service area rather than a south sound trip',
      'Base-era housing stock and newer development sit side by side, so building-age assumptions fail more often here than elsewhere',
    ],
  },

  // ==========================================================================
  // SOUTHERN AND EASTERN WASHINGTON — travel markets, scheduled not same-day
  // ==========================================================================
  {
    slug: 'everett', name: 'Everett', county: 'Snohomish', lat: 47.9790, lon: -122.2021,
    cluster: 'full', childServices: ['bedbug'],
    housingProfile: 'Workforce and military-adjacent multifamily with shift-pattern occupancy — the nearest large southern market to the northern base.',
    vintage: 'Mixed mid-century garden-style and 2000s infill',
    landmarks: ['Naval Station Everett','Everett Waterfront','Silver Lake','Boeing Everett site'],
    localHooks: [
      'Naval Station and aerospace shift work produce occupancy patterns that make daytime-only inspection scheduling unworkable',
      'Waterfront parks and retention basins carry resident goose pressure through the shoulder seasons',
      'High tenant mobility in workforce housing raises turnover-screening value per unit',
      'Everett is the hinge between the northern base and the Puget Sound corridor, so it is reachable on a normal schedule in a way Tacoma and Olympia are not',
    ],
  },
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
      'Seattle is a scheduled travel market for us, not a same-day one, and we would rather say that than pretend otherwise',
    ],
  },
  {
    slug: 'bellevue', name: 'Bellevue', county: 'King', lat: 47.6101, lon: -122.2015,
    cluster: 'triple', childServices: [],
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
    cluster: 'triple', childServices: [],
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
    cluster: 'triple', childServices: [],
    housingProfile: 'The oldest multifamily stock among Washington\'s major markets, with a large student-adjacent rental segment.',
    vintage: 'Substantial pre-1940 brick apartment inventory',
    landmarks: ['Gonzaga University','Riverfront Park','Spokane River','Browne\'s Addition'],
    localHooks: [
      'Eastern Washington\'s continental climate produces a materially different indoor pest season from the maritime west side — do not reuse west-side seasonal copy here',
      'Browne\'s Addition and the pre-1940 brick apartment stock offer extensive harbourage in trim, baseboard and shared wall voids',
      'Gonzaga-adjacent rentals turn over on the academic calendar',
      'Spokane is a planned-travel market reached on a booked schedule, and pretending it is anything else would be dishonest',
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
      'This is the furthest point in the service area from the northern base and is scheduled accordingly',
    ],
  },
];

export const fullCities = cities.filter(c => c.cluster === 'full');
export const cityBySlug = (slug: string) => cities.find(c => c.slug === slug);

/**
 * The prime work zones, in the order they must always be presented.
 *
 * WHATCOM LEADS. ALWAYS. Client direction, 2026-08-17. Bellingham is the anchor
 * market and Whatcom is the first county a visitor should see, everywhere it matters.
 * Skagit is second. Do not reorder this array to match alphabetical order, population,
 * or anything else.
 */
export const PRIME_COUNTIES = ['Whatcom', 'Skagit'] as const;
export const primeCities = cities.filter(c => (PRIME_COUNTIES as readonly string[]).includes(c.county));

/**
 * Canonical county display order. Prime counties first in PRIME_COUNTIES order, then
 * everything else in array order. Exported so presentation order is an explicit,
 * testable fact rather than a side effect of how the rows happen to be sorted above.
 */
export function orderedCounties(pool: City[] = cities.filter(c => c.cluster !== 'area')): string[] {
  const seen = [...new Set(pool.map(c => c.county))];
  const prime = (PRIME_COUNTIES as readonly string[]).filter(c => seen.includes(c));
  return [...prime, ...seen.filter(c => !prime.includes(c))];
}

/** Towns covered as areaServed but too small to carry a page of genuine depth. */
export const areaOnlyCities = cities.filter(c => c.cluster === 'area');
