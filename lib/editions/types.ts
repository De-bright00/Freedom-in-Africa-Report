export type EditionYear = '2026' | '2025'

export interface IndicatorMeta {
  code: string // 'A' through 'T'
  key: string
  label: string
  fullName: string
  dimension: 'Political Freedom' | 'Economic Freedom' | 'Prosperity'
  dimensionKey: 'political' | 'economic' | 'prosperity'
  weightPercent: number
  description: string
  nonComparableNote?: string
}

export interface CountryScore {
  country: string
  slug: string
  region: string
  flagEmoji: string
  rank: number
  overall: number
  political: number
  economic: number
  prosperity: number
  tier: 'top' | 'mid' | 'bottom'
  description?: string
  indicators: Record<string, number | null>
}

export interface ComparisonCountry {
  country: string
  slug: string
  region: string
  flagEmoji: string
  y2026: {
    rank: number
    overall: number
    political: number
    economic: number
    prosperity: number
  }
  y2025: {
    rank: number
    overall: number
    political: number
    economic: number
    prosperity: number
  }
  change: {
    overall: number
    rank: number // positive means rank improved (e.g. 8 -> 3 is +5)
    political: number
    economic: number
    prosperity: number
  }
  indicators2026: Record<string, number | null>
  indicators2025: Record<string, number | null>
}

export interface RegionSummary {
  name: string
  avgScore: number
  standing: 'Best performing' | 'High performing' | 'Mid-table' | 'Lower tier' | 'Lowest scoring' | string
  leader?: string
  challenge?: string
}

export interface GlobalComparison {
  region: string
  score: number
  isAfrica?: boolean
}

export interface SpecialTheme {
  id: string
  title: string
  badge: string
  summary: string
  keyStats: Array<{ label: string; value: string }>
  findings: string[]
}

export interface CrossCountryComparison {
  title: string
  countryA: string
  countryB: string
  scoreA: number
  scoreB: number
  analysis: string
}

export interface EditionConfig {
  year: EditionYear
  title: string
  shortMark: string
  fullName: string
  editionTag: string
  headlineSummary: string
  overallScore: number
  politicalScore: number
  economicScore: number
  prosperityScore: number
  coverImage: string
  pdfUrl: string
  pdfFileName: string
  datasetCsvUrl: string
  datasetCsvFileName: string
  datasetPdfUrl?: string
  datasetPdfFileName?: string
  stats: Array<{ value: string; label: string; note: string }>
  regions: RegionSummary[]
  globalComparison: GlobalComparison[]
  specialThemes?: SpecialTheme[]
  crossCountryComparisons?: CrossCountryComparison[]
  keyFindings: string[]
}
