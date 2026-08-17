/**
 * species.ts — the deliberately narrow library. Build plan Part 4.7.
 * Only species Guardian's dog actually works, or that clients routinely misidentify.
 * A 30-entry library of species Guardian has nothing to do with is padding (Keystone 6.3).
 */

export interface Species {
  slug: string;
  name: string;
  scientificName: string;
  taxonRank: 'species';
  wikidata: string;
  family: 'bedbug' | 'goose';
  /** Why this profile exists at all. */
  rationale: string;
  misidentifiedAs: string[];
  relatedServices: string[];
  relatedProblems: string[];
}

export const species: Species[] = [
  {
    slug: 'bed-bug', name: 'Bed Bug', scientificName: 'Cimex lectularius', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q189332', family: 'bedbug',
    rationale: 'The core profile: identification, lifecycle, harbourage, why scent detection works on it, and Northwest seasonality.',
    misidentifiedAs: ['carpet-beetle','spider-beetle','bat-bug'],
    relatedServices: ['k9-bed-bug-detection'],
    relatedProblems: ['bites-but-no-evidence'],
  },
  {
    slug: 'bat-bug', name: 'Bat Bug', scientificName: 'Cimex adjunctus', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q10333402', family: 'bedbug',
    rationale: 'The professional\'s misidentification, and a real issue where bats roost in older Washington attics. Wrong ID means the wrong treatment and a recurring problem.',
    misidentifiedAs: ['bed-bug'],
    relatedServices: ['k9-bed-bug-detection'],
    relatedProblems: ['bites-but-no-evidence'],
  },
  {
    slug: 'carpet-beetle', name: 'Carpet Beetle', scientificName: 'Anthrenus verbasci', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q1399778', family: 'bedbug',
    rationale: 'The number one consumer misidentification and the most common cause of "bites but no bed bugs" — carpet beetle larval hairs cause dermatitis that reads as bites.',
    misidentifiedAs: ['bed-bug'],
    relatedServices: ['k9-bed-bug-detection'],
    relatedProblems: ['bites-but-no-evidence'],
  },
  {
    slug: 'spider-beetle', name: 'Spider Beetle', scientificName: 'Mezium americanum', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q1972905', family: 'bedbug',
    rationale: 'The second most common misidentification in multifamily settings — similar size and colour, found in the same places, entirely different problem.',
    misidentifiedAs: ['bed-bug'],
    relatedServices: ['k9-bed-bug-detection'],
    relatedProblems: ['bites-but-no-evidence'],
  },
  {
    slug: 'canada-goose', name: 'Canada Goose', scientificName: 'Branta canadensis', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q26733', family: 'goose',
    rationale: 'Resident versus migratory behaviour, why resident birds are the actual problem, federal protection status, and the honest limits of what hazing achieves.',
    misidentifiedAs: ['cackling-goose'],
    relatedServices: ['k9-goose-deterrent'],
    relatedProblems: ['geese-on-a-retention-pond'],
  },
  {
    slug: 'cackling-goose', name: 'Cackling Goose', scientificName: 'Branta hutchinsii', taxonRank: 'species',
    wikidata: 'https://www.wikidata.org/wiki/Q764604', family: 'goose',
    rationale: 'A genuine Washington distinction almost nobody covers. Cackling geese winter here, are routinely confused with Canada geese, and the management answer differs — wintering migrants are not a resident-goose problem and should not be treated as one.',
    misidentifiedAs: ['canada-goose'],
    relatedServices: ['k9-goose-deterrent'],
    relatedProblems: ['geese-on-a-retention-pond'],
  },
];

export const speciesBySlug = (slug: string) => species.find(s => s.slug === slug);
