// F(in)AR Country-Level Indicator Dataset (Multi-Edition: 2026 & 2025)
import { CountryScore, EditionYear } from './editions/types'
import countries2026Data from './editions/data-2026.json'
import countries2025Data from './editions/data-2025.json'

export interface IndicatorMeta {
  code: string
  key: string
  label: string
  fullName: string
  dimension: 'Political Freedom' | 'Economic Freedom' | 'Prosperity'
  dimensionKey: 'political' | 'economic' | 'prosperity'
  weightPercent: number
  description: string
  nonComparableNote?: string
}

export interface CountryIndicatorRecord {
  name: string
  slug: string
  region: string
  canonicalRegion: string
  flag: string
  rank: number
  overallScore: number
  politicalScore: number
  economicScore: number
  prosperityScore: number
  indicators: {
    A: number | null
    B: number | null
    C: number | null
    D: number | null
    E: number | null
    F: number | null
    G: number | null
    H: number | null
    I: number | null
    J: number | null
    K: number | null
    L: number | null
    M: number | null
    N: number | null
    O: number | null
    P: number | null
    Q: number | null
    R: number | null
    S: number | null
    T: number | null
  }
}

export interface DatasetEdition {
  year: number
  title: string
  badge: string
  isCurrent: boolean
  pdfUrl: string
  pdfFileName: string
  csvUrl: string
  csvFileName: string
  extractedFrom: string
  totalCountries: number
  totalIndicators: number
  dimensionsCount: number
  summary: string
}

export const datasetEditions: DatasetEdition[] = [
  {
    year: 2026,
    title: '2026 Indicator Dataset',
    badge: 'Current Edition (Latest)',
    isCurrent: true,
    pdfUrl: '/finar-2026-report.pdf',
    pdfFileName: 'F(in)AR_2026_Freedom_in_Africa_Report.pdf',
    csvUrl: '/finar-2026-indicator-dataset.csv',
    csvFileName: 'F(in)AR_2026_Country_Indicator_Dataset.csv',
    extractedFrom: 'Liberalist Centre F(in)AR 2026 Master Dataset & Full Digital Report',
    totalCountries: 54,
    totalIndicators: 20,
    dimensionsCount: 3,
    summary:
      'Complete country-level scores across 20 factors (Columns A–T) measuring political freedom, economic freedom, and prosperity across all 54 African nations on a 0–10 scale.',
  },
  {
    year: 2025,
    title: '2025 Indicator Dataset',
    badge: 'Previous Edition',
    isCurrent: false,
    pdfUrl: '/finar-2025-indicator-dataset.pdf',
    pdfFileName: 'F(in)AR_2025_Indicator_Dataset.pdf',
    csvUrl: '/finar-2025-dataset.csv',
    csvFileName: 'F(in)AR_2025_Country_Indicator_Dataset.csv',
    extractedFrom: 'Liberalist Centre F(in)AR 2025 Report, page 33 dataset table',
    totalCountries: 54,
    totalIndicators: 20,
    dimensionsCount: 3,
    summary:
      'Complete country-level scores across 20 factors (Columns A–T) normalised to the standard 0–10 scale across all 54 African nations.',
  },
]

export const indicatorMetadata: IndicatorMeta[] = [
  // Political Freedom (6 indicators)
  {
    code: 'A',
    key: 'electoral_integrity',
    label: 'Electoral integrity',
    fullName: 'Electoral integrity — free, fair, competitive elections',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Measures the degree to which national elections are competitive, transparent, and multiparty.',
  },
  {
    code: 'B',
    key: 'speech',
    label: 'Speech & expression',
    fullName: 'Freedom of speech and expression',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Protection of individual expression without fear of harassment, censorship, or retribution.',
  },
  {
    code: 'C',
    key: 'media',
    label: 'Press freedom',
    fullName: 'Media freedom and journalist safety',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Openness of the media environment and ability of journalists to report independently without state interference.',
  },
  {
    code: 'D',
    key: 'assembly',
    label: 'Assembly & association',
    fullName: 'Freedom of assembly and civic association',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Liberty to form civil society organisations, political parties, unions, and protest peacefully.',
  },
  {
    code: 'E',
    key: 'judicial',
    label: 'Judicial independence',
    fullName: 'Judicial autonomy and impartial adjudication',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Independence of courts from executive pressure, fairness of trials, and institutional checks.',
  },
  {
    code: 'F',
    key: 'freedom_from_oppression',
    label: 'Right to Dignity',
    fullName: 'Freedom from oppression and torture',
    dimension: 'Political Freedom',
    dimensionKey: 'political',
    weightPercent: 33,
    description: 'Safeguards against torture, cruel treatment, arbitrary detention, and political persecution by the state.',
  },

  // Economic Freedom (7 indicators)
  {
    code: 'G',
    key: 'property_rights',
    label: 'Property rights',
    fullName: 'Security of private property and land tenure',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Legal clarity, enforcement of contracts, and protection of assets from arbitrary state expropriation.',
  },
  {
    code: 'H',
    key: 'ease_of_business',
    label: 'Ease of business',
    fullName: 'Ease of starting and operating a business',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Low bureaucratic entry barriers, transparent registration, and minimal red tape for formal enterprise.',
  },
  {
    code: 'I',
    key: 'trade',
    label: 'Trade freedom',
    fullName: 'Trade openness and AfCFTA integration',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Low tariffs, streamlined customs logistics, and reduced non-tariff barriers across borders.',
  },
  {
    code: 'J',
    key: 'travel',
    label: 'Free movement',
    fullName: 'Freedom of travel and intra-continental mobility',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Visa-free entry policies, visas on arrival, and unhindered movement of persons across borders.',
  },
  {
    code: 'K',
    key: 'tax_burden',
    label: 'Tax burden',
    fullName: 'Taxation burden on households and enterprise',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Moderate corporate/personal income tax rates and simple, non-confiscatory fiscal regimes.',
  },
  {
    code: 'L',
    key: 'labour',
    label: 'Labour freedom',
    fullName: 'Labour market flexibility and hiring freedom',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Flexibility for workers to change jobs and for employers to hire, without punitive labour mandates.',
  },
  {
    code: 'M',
    key: 'digital_economy',
    label: 'Digital economy',
    fullName: 'Digital economy and tech enterprise regulation',
    dimension: 'Economic Freedom',
    dimensionKey: 'economic',
    weightPercent: 33,
    description: 'Growth of e-commerce, fintech, mobile money, and absence of unlawful internet shutdowns.',
  },

  // Prosperity (7 indicators)
  {
    code: 'N',
    key: 'monetary_freedom',
    label: 'Monetary Freedom',
    fullName: 'Monetary Freedom / Income & Financial Stability',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Price stability, controlled inflation rates, and preservation of household purchasing power.',
    nonComparableNote:
      'Note on cross-edition comparison: In 2026, this factor measures Monetary Freedom (price stability & inflation); in 2025, it measured Income Levels & Poverty Reduction.',
  },
  {
    code: 'O',
    key: 'employment',
    label: 'Employment',
    fullName: 'Employment and entrepreneurship opportunities',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Availability of formal sector work and dynamic, productive entrepreneurship over survival self-employment.',
  },
  {
    code: 'P',
    key: 'education',
    label: 'Education & literacy',
    fullName: 'Access to education and quality schooling',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Literacy rates, educational attainment, classroom safety, and human capital development.',
  },
  {
    code: 'Q',
    key: 'healthcare',
    label: 'Healthcare access',
    fullName: 'Access to affordable healthcare and health outcomes',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Accessible clinical services, low out-of-pocket medical expense burdens, and life expectancy.',
  },
  {
    code: 'R',
    key: 'infrastructure',
    label: 'Infrastructure',
    fullName: 'Access to physical infrastructure and power',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Reliable electrical grids, clean drinking water, paved road networks, and digital connectivity.',
  },
  {
    code: 'S',
    key: 'inequality',
    label: 'Inequality Index',
    fullName: 'Economic Inequality / Social Mobility',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Gini coefficient moderation, wealth equity, and fair access to economic opportunity.',
    nonComparableNote:
      'Note on cross-edition comparison: In 2026, this factor measures the Inequality Index; in 2025, it evaluated Social Mobility & Inequality.',
  },
  {
    code: 'T',
    key: 'peace_stability',
    label: 'Peace & stability',
    fullName: 'Peace, domestic security, and conflict resilience',
    dimension: 'Prosperity',
    dimensionKey: 'prosperity',
    weightPercent: 34,
    description: 'Absence of civil war, insurgencies, terrorist violence, violent crime, and political coups.',
  },
]

export const measurementMethodology = [
  {
    factor: 'Data sources',
    method: 'Trusted internationally recognised datasets, including Mo Ibrahim Index, Freedom House, Atlantic Council, World Bank Business Ready, ILO, UNESCO, WHO, IEP Global Peace Index, Access Now, and AU/AfDB Africa Visa Openness Index.',
  },
  {
    factor: 'Data coverage',
    method: 'All 54 African countries covered across 20 distinct indicator factors and 3 core dimensions.',
  },
  {
    factor: 'Standardisation',
    method: 'Raw indicators are standardised onto a common 0–10 scale. Dimension and overall scores are computed and presented on a 0–100 scale.',
  },
  {
    factor: 'Missing data',
    method: 'Null indicates no source data was published; it is treated as "n/a" and never assigned zero.',
  },
  {
    factor: 'Dimension weights',
    method: 'Political Freedom: 33%; Economic Freedom: 33%; Prosperity: 34%.',
  },
  {
    factor: 'Overall formula',
    method: 'Overall Score (0–100) = ((Political × 0.33) + (Economic × 0.33) + (Prosperity × 0.34)) × 10',
  },
  {
    factor: 'Score Legend',
    method: 'High: Score ≥ 65 | Moderate: Score 45–64 | Low: Score < 45',
  },
]

function formatIndicatorValue(val: number | null | undefined): number | null {
  if (val === null || val === undefined || isNaN(val)) return null
  return Number(val.toFixed(2))
}

function buildRecord(c: CountryScore): CountryIndicatorRecord {
  const shortRegion = c.region.replace(' Africa', '')
  const ind = c.indicators || {}
  return {
    name: c.country,
    slug: c.slug,
    region: shortRegion,
    canonicalRegion: c.region,
    flag: c.flagEmoji,
    rank: c.rank,
    overallScore: c.overall,
    politicalScore: c.political,
    economicScore: c.economic,
    prosperityScore: c.prosperity,
    indicators: {
      A: formatIndicatorValue(ind.electoral_integrity),
      B: formatIndicatorValue(ind.speech),
      C: formatIndicatorValue(ind.media),
      D: formatIndicatorValue(ind.assembly),
      E: formatIndicatorValue(ind.judicial),
      F: formatIndicatorValue(ind.freedom_from_oppression),
      G: formatIndicatorValue(ind.property_rights),
      H: formatIndicatorValue(ind.ease_of_business),
      I: formatIndicatorValue(ind.trade),
      J: formatIndicatorValue(ind.travel),
      K: formatIndicatorValue(ind.tax_burden),
      L: formatIndicatorValue(ind.labour),
      M: formatIndicatorValue(ind.digital_economy),
      N: formatIndicatorValue(ind.monetary_freedom ?? ind.income_poverty),
      O: formatIndicatorValue(ind.employment),
      P: formatIndicatorValue(ind.education),
      Q: formatIndicatorValue(ind.healthcare),
      R: formatIndicatorValue(ind.infrastructure),
      S: formatIndicatorValue(ind.inequality ?? ind.social_mobility),
      T: formatIndicatorValue(ind.peace_stability),
    },
  }
}

export const dataset2026: CountryIndicatorRecord[] = (countries2026Data as CountryScore[]).map(buildRecord)
export const dataset2025: CountryIndicatorRecord[] = (countries2025Data as CountryScore[]).map(buildRecord)

export function getDataset(year: EditionYear = '2026'): CountryIndicatorRecord[] {
  return year === '2025' ? dataset2025 : dataset2026
}