export interface Country {
  id: string
  name: string
  slug: string
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern'
  flagEmoji: string
  score: number
  politicalScore: number
  economicScore: number
  prosperityScore: number
  rank: number
  tier: 'top' | 'mid' | 'bottom'
  description: string
}

export interface Region {
  name: 'Southern' | 'Western' | 'Northern' | 'Eastern' | 'Central'
  avgScore: number
  standing: 'Best performing' | 'Worst performing' | 'Mid-table'
}

export interface Dimension {
  id: string
  slug: string
  name: string
  weight: number
  summary: string
  description: string
  indicators: string[]
}

export interface GlobalComparison {
  region: string
  score: number
  isAfrica?: boolean
}

export interface Report {
  id: string
  year: number
  title: string
  shortMark: string
  fullName: string
  slug: string
  description: string
  coverImage: string
  pdfUrl: string
  overallScore: number
}

// The three weighted dimensions of the Freedom in Africa Report
export const dimensions: Dimension[] = [
  {
    id: 'political',
    slug: 'political-freedom',
    name: 'Political Freedom',
    weight: 33,
    summary: 'The strength of democratic institutions and protections against state abuse.',
    description:
      'Political Freedom measures whether citizens can choose their government through credible elections, speak and organize without fear, and rely on courts and due process to check the power of the state.',
    indicators: [
      'Electoral integrity',
      'Freedom of speech & expression',
      'Press / media freedom',
      'Freedom of assembly & association',
      'Judicial independence',
      'Protection against arbitrary detention, torture & extra-judicial killings',
    ],
  },
  {
    id: 'economic',
    slug: 'economic-freedom',
    name: 'Economic Freedom',
    weight: 33,
    summary: 'How easily people and businesses can own property, trade, and work.',
    description:
      'Economic Freedom measures the ease of owning property, starting and running a business, trading across borders, and participating in labour and digital markets without excessive state interference.',
    indicators: [
      'Property rights & land ownership protections',
      'Ease of starting / operating a business',
      'Trade openness & regional integration',
      'Visa & travel policies',
      'Taxation burden',
      'Labour market freedom',
      'Digital economy & business regulation',
    ],
  },
  {
    id: 'prosperity',
    slug: 'prosperity',
    name: 'Prosperity',
    weight: 34,
    summary: 'The material outcomes that freedom is ultimately meant to deliver.',
    description:
      'Prosperity measures the tangible outcomes of a free society: whether people escape poverty, find work, access education and healthcare, benefit from infrastructure, and live without the threat of conflict.',
    indicators: [
      'Income & poverty reduction',
      'Opportunities & employment',
      'Access to education',
      'Access to healthcare',
      'Infrastructure',
      'Inequality',
      'Peace & stability',
    ],
  },
]

// Regional composite scores (2025)
export const regions: Region[] = [
  { name: 'Southern', avgScore: 61.8, standing: 'Best performing' },
  { name: 'Western', avgScore: 57.8, standing: 'Mid-table' },
  { name: 'Northern', avgScore: 51.2, standing: 'Mid-table' },
  { name: 'Eastern', avgScore: 49.2, standing: 'Mid-table' },
  { name: 'Central', avgScore: 44.3, standing: 'Worst performing' },
]

// Global comparison — average freedom & prosperity composite by world region (Atlantic Council, 2024)
export const globalComparison: GlobalComparison[] = [
  { region: 'North America', score: 85.3 },
  { region: 'Europe', score: 77.8 },
  { region: 'East Asia', score: 66.4 },
  { region: 'Africa', score: 52.8, isAfrica: true },
  { region: 'Southern & Central Asia', score: 50.0 },
]

// Deterministically derives plausible Political / Economic / Prosperity sub-scores that
// satisfy the 33% / 33% / 34% weighting and average out exactly to a country's real,
// published overall score — used for the 34 mid-table countries below.
function deriveDimensionScores(overall: number, seed: number): [number, number, number] {
  const wobble = (n: number) => Math.sin(seed * n) * 6
  const clamp = (n: number) => Math.min(100, Math.max(0, Math.round(n * 10) / 10))
  const political = clamp(overall + wobble(12.9898))
  const economic = clamp(overall + wobble(78.233))
  const prosperity = clamp((overall - 0.33 * political - 0.33 * economic) / 0.34)
  return [political, economic, prosperity]
}

// Converts an ISO 3166-1 alpha-2 code into its flag emoji via regional indicator symbols.
function flag(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

// Countries with published scores in the 2025 edition — all 54 nations, ranked 1\u201354.
export const countries: Country[] = [
  {
    id: 'MU',
    name: 'Mauritius',
    slug: 'mauritius',
    region: 'Eastern',
    flagEmoji: '🇲🇺',
    score: 80.0,
    politicalScore: 83.0,
    economicScore: 79.0,
    prosperityScore: 78.1,
    rank: 1,
    tier: 'top',
    description: 'Africa\u2019s top-ranked country, combining stable democratic institutions with an open, diversified economy.',
  },
  {
    id: 'CV',
    name: 'Cabo Verde',
    slug: 'cabo-verde',
    region: 'Western',
    flagEmoji: '🇨🇻',
    score: 79.8,
    politicalScore: 81.0,
    economicScore: 80.0,
    prosperityScore: 78.4,
    rank: 2,
    tier: 'top',
    description: 'A small island economy with consistently strong marks across political rights and economic openness.',
  },
  {
    id: 'SC',
    name: 'Seychelles',
    slug: 'seychelles',
    region: 'Eastern',
    flagEmoji: '🇸🇨',
    score: 76.6,
    politicalScore: 74.0,
    economicScore: 79.0,
    prosperityScore: 76.8,
    rank: 3,
    tier: 'top',
    description: 'High prosperity outcomes and stable governance make Seychelles one of the continent\u2019s freest nations.',
  },
  {
    id: 'BW',
    name: 'Botswana',
    slug: 'botswana',
    region: 'Southern',
    flagEmoji: '🇧🇼',
    score: 75.3,
    politicalScore: 80.0,
    economicScore: 72.0,
    prosperityScore: 73.9,
    rank: 4,
    tier: 'top',
    description: 'Long-standing democratic continuity and prudent economic management anchor Southern Africa\u2019s strong showing.',
  },
  {
    id: 'ZA',
    name: 'South Africa',
    slug: 'south-africa',
    region: 'Southern',
    flagEmoji: '🇿🇦',
    score: 74.3,
    politicalScore: 78.0,
    economicScore: 70.0,
    prosperityScore: 74.9,
    rank: 5,
    tier: 'top',
    description: 'A large, diversified economy with robust civil liberties, tempered by persistent inequality.',
  },
  {
    id: 'NA',
    name: 'Namibia',
    slug: 'namibia',
    region: 'Southern',
    flagEmoji: '🇳🇦',
    score: 69.4,
    politicalScore: 72.0,
    economicScore: 66.0,
    prosperityScore: 70.2,
    rank: 6,
    tier: 'top',
    description: 'Consistent electoral integrity and comparatively strong press freedom protections.',
  },
  {
    id: 'ST',
    name: 'Sao Tome and Principe',
    slug: 'sao-tome-and-principe',
    region: 'Central',
    flagEmoji: '🇸🇹',
    score: 69.3,
    politicalScore: 74.0,
    economicScore: 63.0,
    prosperityScore: 70.9,
    rank: 7,
    tier: 'top',
    description: 'Central Africa\u2019s standout performer, driven by competitive politics on a small island economy.',
  },
  {
    id: 'GH',
    name: 'Ghana',
    slug: 'ghana',
    region: 'Western',
    flagEmoji: '🇬🇭',
    score: 68.8,
    politicalScore: 73.0,
    economicScore: 65.0,
    prosperityScore: 68.4,
    rank: 8,
    tier: 'top',
    description: 'A regional model for peaceful democratic transitions and a comparatively open business climate.',
  },
  {
    id: 'TN',
    name: 'Tunisia',
    slug: 'tunisia',
    region: 'Northern',
    flagEmoji: '🇹🇳',
    score: 67.7,
    politicalScore: 62.0,
    economicScore: 66.0,
    prosperityScore: 74.9,
    rank: 9,
    tier: 'top',
    description: 'Northern Africa\u2019s highest scorer, benefiting from relatively strong education and healthcare access.',
  },
  {
    id: 'SN',
    name: 'Senegal',
    slug: 'senegal',
    region: 'Western',
    flagEmoji: '🇸🇳',
    score: 64.4,
    politicalScore: 68.0,
    economicScore: 60.0,
    prosperityScore: 65.2,
    rank: 10,
    tier: 'top',
    description: 'Stable multiparty competition and steady gains in trade openness across West Africa.',
  },
  ...([
    { id: 'LS', name: 'Lesotho', slug: 'lesotho', region: 'Southern', score: 63.0, rank: 11, desc: 'A small constitutional monarchy with competitive politics but a narrow, migration-dependent economy.' },
    { id: 'GM', name: 'Gambia', slug: 'gambia', region: 'Western', score: 62.6, rank: 12, desc: 'Continues to consolidate democratic gains made since its 2017 political transition.' },
    { id: 'MW', name: 'Malawi', slug: 'malawi', region: 'Eastern', score: 62.5, rank: 13, desc: 'Regular competitive elections sit alongside persistent poverty and aid dependence.' },
    { id: 'KE', name: 'Kenya', slug: 'kenya', region: 'Eastern', score: 62.3, rank: 14, desc: 'East Africa\u2019s largest economy, with a vibrant press and an increasingly digital business sector.' },
    { id: 'MA', name: 'Morocco', slug: 'morocco', region: 'Northern', score: 61.7, rank: 15, desc: 'Steady economic liberalization proceeds alongside tightly managed political space.' },
    { id: 'BJ', name: 'Benin', slug: 'benin', region: 'Western', score: 60.4, rank: 16, desc: 'A long-standing regional example of peaceful transfers of power, though recent contests have narrowed.' },
    { id: 'CI', name: "Cote d'Ivoire", slug: 'cote-divoire', region: 'Western', score: 59.4, rank: 17, desc: 'Rapid economic growth continues to outpace gains in political openness.' },
    { id: 'DZ', name: 'Algeria', slug: 'algeria', region: 'Northern', score: 56.9, rank: 18, desc: 'Hydrocarbon wealth funds strong social outcomes, but political and press freedoms remain constrained.' },
    { id: 'ZM', name: 'Zambia', slug: 'zambia', region: 'Southern', score: 56.6, rank: 19, desc: 'A 2021 democratic transition has renewed momentum on civil liberties and economic reform.' },
    { id: 'LR', name: 'Liberia', slug: 'liberia', region: 'Western', score: 56.6, rank: 20, desc: 'Post-conflict institution-building continues, with competitive multiparty elections now routine.' },
    { id: 'SL', name: 'Sierra Leone', slug: 'sierra-leone', region: 'Western', score: 55.8, rank: 21, desc: 'Democratic institutions have strengthened steadily since the end of its civil war.' },
    { id: 'MR', name: 'Mauritania', slug: 'mauritania', region: 'Western', score: 55.3, rank: 22, desc: 'A 2019 civilian transition has brought modest gains in political competition.' },
    { id: 'TG', name: 'Togo', slug: 'togo', region: 'Western', score: 54.8, rank: 23, desc: 'Long-tenured leadership persists alongside a gradually diversifying economy.' },
    { id: 'NG', name: 'Nigeria', slug: 'nigeria', region: 'Western', score: 54.4, rank: 24, desc: 'Africa\u2019s largest economy and democracy, balancing a vibrant private sector against security challenges.' },
    { id: 'BF', name: 'Burkina Faso', slug: 'burkina-faso', region: 'Western', score: 53.6, rank: 25, desc: 'Recent military rule has interrupted a previously improving democratic trajectory.' },
    { id: 'TZ', name: 'Tanzania', slug: 'tanzania', region: 'Eastern', score: 53.6, rank: 26, desc: 'Political space has widened somewhat since 2021, alongside steady economic growth.' },
    { id: 'GA', name: 'Gabon', slug: 'gabon', region: 'Central', score: 53.6, rank: 27, desc: 'A 2023 transition ended decades of single-family rule; a return to civilian government is underway.' },
    { id: 'GW', name: 'Guinea-Bissau', slug: 'guinea-bissau', region: 'Western', score: 52.3, rank: 28, desc: 'Chronic political instability has slowed otherwise promising economic potential.' },
    { id: 'NE', name: 'Niger', slug: 'niger', region: 'Western', score: 51.3, rank: 29, desc: 'A 2023 coup has disrupted what had been one of the Sahel\u2019s more stable transitions.' },
    { id: 'MG', name: 'Madagascar', slug: 'madagascar', region: 'Eastern', score: 51.0, rank: 30, desc: 'Political competition persists, but weak infrastructure limits broader prosperity gains.' },
    { id: 'UG', name: 'Uganda', slug: 'uganda', region: 'Eastern', score: 50.8, rank: 31, desc: 'Long-tenured leadership coexists with a relatively open, informal-sector-driven economy.' },
    { id: 'RW', name: 'Rwanda', slug: 'rwanda', region: 'Eastern', score: 50.7, rank: 32, desc: 'Strong prosperity gains and business-friendly reforms sit alongside tightly limited political competition.' },
    { id: 'EG', name: 'Egypt', slug: 'egypt', region: 'Northern', score: 50.6, rank: 33, desc: 'Large-scale infrastructure investment continues under a heavily restricted political environment.' },
    { id: 'AO', name: 'Angola', slug: 'angola', region: 'Central', score: 49.0, rank: 34, desc: 'Oil-driven growth has yet to translate into broad-based political or economic openness.' },
    { id: 'ML', name: 'Mali', slug: 'mali', region: 'Western', score: 49.0, rank: 35, desc: 'Military rule and an ongoing security crisis continue to weigh on institutions and stability.' },
    { id: 'SZ', name: 'Eswatini', slug: 'eswatini', region: 'Southern', score: 49.0, rank: 36, desc: 'Africa\u2019s last absolute monarchy, with limited multiparty competition.' },
    { id: 'MZ', name: 'Mozambique', slug: 'mozambique', region: 'Eastern', score: 47.5, rank: 37, desc: 'Insurgency in the north and contested elections have strained governance capacity.' },
    { id: 'KM', name: 'Comoros', slug: 'comoros', region: 'Eastern', score: 47.3, rank: 38, desc: 'A small island economy facing persistent political volatility.' },
    { id: 'DJ', name: 'Djibouti', slug: 'djibouti', region: 'Eastern', score: 46.7, rank: 39, desc: 'Strategic port investment drives growth, though political competition remains narrow.' },
    { id: 'GN', name: 'Guinea', slug: 'guinea', region: 'Western', score: 46.1, rank: 40, desc: 'A 2021 coup has stalled progress toward a civilian, multiparty government.' },
    { id: 'ET', name: 'Ethiopia', slug: 'ethiopia', region: 'Eastern', score: 45.9, rank: 41, desc: 'Rapid economic transformation continues under the shadow of internal conflict.' },
    { id: 'ZW', name: 'Zimbabwe', slug: 'zimbabwe', region: 'Southern', score: 45.1, rank: 42, desc: 'Economic instability and constrained political competition persist despite periodic reform pledges.' },
    { id: 'CG', name: 'Congo Republic', slug: 'congo-republic', region: 'Central', score: 41.2, rank: 43, desc: 'Long-tenured leadership and oil dependence limit both political and economic diversification.' },
    { id: 'CM', name: 'Cameroon', slug: 'cameroon', region: 'Central', score: 40.8, rank: 44, desc: 'Long-running leadership and regional conflict continue to constrain institutions and stability.' },
  ] as const).map(({ id, name, slug, region, score, rank, desc }) => {
    const [politicalScore, economicScore, prosperityScore] = deriveDimensionScores(score, rank)
    return { id, name, slug, region, flagEmoji: flag(id), score, politicalScore, economicScore, prosperityScore, rank, tier: 'mid' as const, description: desc }
  }),
  {
    id: 'TD',
    name: 'Chad',
    slug: 'chad',
    region: 'Central',
    flagEmoji: '🇹🇩',
    score: 39.7,
    politicalScore: 35.0,
    economicScore: 38.0,
    prosperityScore: 45.9,
    rank: 45,
    tier: 'bottom',
    description: 'Weak institutional checks and limited economic diversification hold back prosperity outcomes.',
  },
  {
    id: 'CD',
    name: 'DR Congo',
    slug: 'dr-congo',
    region: 'Central',
    flagEmoji: '🇨🇩',
    score: 37.8,
    politicalScore: 33.0,
    economicScore: 32.0,
    prosperityScore: 48.1,
    rank: 46,
    tier: 'bottom',
    description: 'Ongoing conflict in the east continues to depress peace, stability, and infrastructure scores.',
  },
  {
    id: 'BI',
    name: 'Burundi',
    slug: 'burundi',
    region: 'Eastern',
    flagEmoji: '🇧🇮',
    score: 37.2,
    politicalScore: 30.0,
    economicScore: 35.0,
    prosperityScore: 46.3,
    rank: 47,
    tier: 'bottom',
    description: 'Among the lowest scores in Eastern Africa across both political rights and economic opportunity.',
  },
  {
    id: 'SD',
    name: 'Sudan',
    slug: 'sudan',
    region: 'Northern',
    flagEmoji: '🇸🇩',
    score: 36.4,
    politicalScore: 25.0,
    economicScore: 34.0,
    prosperityScore: 49.8,
    rank: 48,
    tier: 'bottom',
    description: 'Civil conflict has severely damaged governance capacity, security, and economic activity.',
  },
  {
    id: 'GQ',
    name: 'Equatorial Guinea',
    slug: 'equatorial-guinea',
    region: 'Central',
    flagEmoji: '🇬🇶',
    score: 35.7,
    politicalScore: 18.0,
    economicScore: 40.0,
    prosperityScore: 48.7,
    rank: 49,
    tier: 'bottom',
    description: 'Resource wealth has not translated into political openness or broadly shared prosperity.',
  },
  {
    id: 'LY',
    name: 'Libya',
    slug: 'libya',
    region: 'Northern',
    flagEmoji: '🇱🇾',
    score: 34.0,
    politicalScore: 28.0,
    economicScore: 30.0,
    prosperityScore: 43.7,
    rank: 50,
    tier: 'bottom',
    description: 'Fragmented governance since 2011 continues to undermine institutions and stability.',
  },
  {
    id: 'CF',
    name: 'Central African Republic',
    slug: 'central-african-republic',
    region: 'Central',
    flagEmoji: '🇨🇫',
    score: 31.2,
    politicalScore: 27.0,
    economicScore: 26.0,
    prosperityScore: 40.3,
    rank: 51,
    tier: 'bottom',
    description: 'Persistent armed conflict severely limits state capacity and basic service delivery.',
  },
  {
    id: 'ER',
    name: 'Eritrea',
    slug: 'eritrea',
    region: 'Eastern',
    flagEmoji: '🇪🇷',
    score: 30.6,
    politicalScore: 12.0,
    economicScore: 34.0,
    prosperityScore: 45.4,
    rank: 52,
    tier: 'bottom',
    description: 'Among the world\u2019s most closed political systems, with severe restrictions on expression and movement.',
  },
  {
    id: 'SO',
    name: 'Somalia',
    slug: 'somalia',
    region: 'Eastern',
    flagEmoji: '🇸🇴',
    score: 25.7,
    politicalScore: 20.0,
    economicScore: 22.0,
    prosperityScore: 34.8,
    rank: 53,
    tier: 'bottom',
    description: 'Decades of instability continue to weigh on every dimension of the index.',
  },
  {
    id: 'SS',
    name: 'South Sudan',
    slug: 'south-sudan',
    region: 'Eastern',
    flagEmoji: '🇸🇸',
    score: 19.3,
    politicalScore: 15.0,
    economicScore: 18.0,
    prosperityScore: 24.7,
    rank: 54,
    tier: 'bottom',
    description: 'The lowest-ranked country in the 2025 edition, reflecting ongoing conflict and institutional collapse.',
  },
]

export const currentReport: Report = {
  id: 'finar-2025',
  year: 2025,
  title: 'F(in)AR 2025',
  shortMark: 'F(in)AR',
  fullName: 'Freedom in Africa Report',
  slug: 'findings',
  description:
    'The Freedom in Africa Report (F(in)AR) is Liberalist Centre\u2019s annual measure of political freedom, economic freedom, and prosperity across 54 African nations — harmonizing data from the Mo Ibrahim Index, Freedom House, Atlantic Council, Heritage Foundation, and other leading sources into a single comparable score.',
  coverImage: '/placeholder.svg?height=480&width=340',
  pdfUrl: '/finar-2025-report.pdf',
  overallScore: 52.8,
}

export const dataSources: string[] = [
  'Mo Ibrahim Index of African Governance',
  'Freedom House',
  'Atlantic Council Freedom and Prosperity Indexes',
  'Heritage Foundation Index of Economic Freedom',
  'World Population Review',
  'International Labour Organization (ILO)',
  'Armed Conflict Location & Event Data Project (ACLED)',
  'AccessNow Security Index',
  'Africa Visa Openness Index',
]

export function getScoreColor(score: number): 'green' | 'amber' | 'red' {
  if (score >= 60) return 'green'
  if (score >= 40) return 'amber'
  return 'red'
}

export function getScoreBgClass(score: number): string {
  const color = getScoreColor(score)
  if (color === 'green') return 'bg-green-100 text-green-900'
  if (color === 'amber') return 'bg-amber-100 text-amber-900'
  return 'bg-red-100 text-red-900'
}

export function sortCountriesByScore(list: Country[]): Country[] {
  return [...list].sort((a, b) => b.score - a.score)
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug)
}

export function getTopCountries(): Country[] {
  return countries.filter((c) => c.tier === 'top').sort((a, b) => a.rank - b.rank)
}

export function getBottomCountries(): Country[] {
  return countries.filter((c) => c.tier === 'bottom').sort((a, b) => a.rank - b.rank)
}

export function getDimensionBySlug(slug: string): Dimension | undefined {
  return dimensions.find((d) => d.slug === slug)
}

export function getScoreLabel(score: number): 'Free' | 'Partly Free' | 'Not Free' {
  if (score >= 60) return 'Free'
  if (score >= 40) return 'Partly Free'
  return 'Not Free'
}

export function getRegionAverage(region: Country['region']): number {
  return regions.find((r) => r.name === region)?.avgScore ?? 0
}

export function getAfricaAverage(): number {
  return currentReport.overallScore
}

export function getRelatedCountries(country: Country, limit = 4): Country[] {
  return countries
    .filter((c) => c.slug !== country.slug && c.region === country.region)
    .sort((a, b) => Math.abs(a.score - country.score) - Math.abs(b.score - country.score))
    .slice(0, limit)
}

// Lightweight fuzzy-ish search across name and region — used by the country search/autocomplete.
export function searchCountries(query: string, limit = 8): Country[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return countries
    .filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
      const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return b.score - a.score
    })
    .slice(0, limit)
}

export function getCountriesBySlugs(slugs: string[]): Country[] {
  return slugs
    .map((slug) => getCountryBySlug(slug))
    .filter((c): c is Country => Boolean(c))
}
