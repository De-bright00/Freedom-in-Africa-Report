import { CountryScore, EditionYear } from './editions/types'
import { getEditionConfig, getScoreTone, getScoreLabel as getEditionScoreLabel, getScoreColor as getEditionScoreColor, getScoreBgClass as getEditionScoreBgClass } from './editions'
import countries2026Data from './editions/data-2026.json'
import countries2025Data from './editions/data-2025.json'

export interface Country {
  id: string
  name: string
  slug: string
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern'
  canonicalRegion: string
  flagEmoji: string
  score: number
  politicalScore: number
  economicScore: number
  prosperityScore: number
  rank: number
  tier: 'top' | 'mid' | 'bottom'
  description: string
  indicators: Record<string, number | null>
}

export interface Region {
  name: 'Southern' | 'Western' | 'Northern' | 'Eastern' | 'Central'
  avgScore: number
  standing: 'Best performing' | 'Worst performing' | 'Mid-table' | string
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
      'Right to dignity & freedom from oppression',
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
      'Property rights & land tenure',
      'Ease of starting a business',
      'Trade freedom & AfCFTA integration',
      'Freedom of movement & visa openness',
      'Taxation burden',
      'Labour market freedom',
      'Digital economy growth',
    ],
  },
  {
    id: 'prosperity',
    slug: 'prosperity',
    name: 'Prosperity',
    weight: 34,
    summary: 'The material outcomes that freedom is ultimately meant to deliver.',
    description:
      'Prosperity measures the tangible outcomes of a free society: price stability, productive employment, education, healthcare, infrastructure access, reduced inequality, and domestic peace.',
    indicators: [
      'Income & monetary freedom',
      'Employment & entrepreneurship',
      'Access to education & literacy',
      'Access to healthcare',
      'Infrastructure access',
      'Economic inequality',
      'Peace & stability',
    ],
  },
]

export function getDimensionBySlug(slug: string): Dimension | undefined {
  return dimensions.find((d) => d.slug === slug || d.id === slug)
}

// Regional composite scores (2026 default)
export const regions: Region[] = [
  { name: 'Southern', avgScore: 57.7, standing: 'Best performing' },
  { name: 'Western', avgScore: 56.1, standing: 'Mid-table' },
  { name: 'Eastern', avgScore: 48.9, standing: 'Mid-table' },
  { name: 'Northern', avgScore: 47.9, standing: 'Mid-table' },
  { name: 'Central', avgScore: 43.9, standing: 'Worst performing' },
]

// Global comparison — 2026 Edition
export const globalComparison: GlobalComparison[] = [
  { region: 'North America', score: 84.7 },
  { region: 'Europe', score: 81.1 },
  { region: 'South America', score: 70.2 },
  { region: 'Asia', score: 58.0 },
  { region: 'Africa', score: 51.2, isAfrica: true },
]

function mapCountryScoreToCountry(c: CountryScore): Country {
  const shortRegion = c.region.replace(' Africa', '') as 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern'
  return {
    id: c.slug.toUpperCase(),
    name: c.country,
    slug: c.slug,
    region: shortRegion,
    canonicalRegion: c.region,
    flagEmoji: c.flagEmoji,
    score: c.overall,
    politicalScore: c.political,
    economicScore: c.economic,
    prosperityScore: c.prosperity,
    rank: c.rank,
    tier: c.tier,
    description: c.description || '',
    indicators: c.indicators,
  }
}

// 2026 Countries (Default)
export const countries: Country[] = (countries2026Data as CountryScore[]).map(mapCountryScoreToCountry)

// 2025 Countries
export const countries2025: Country[] = (countries2025Data as CountryScore[]).map(mapCountryScoreToCountry)

export function getCountriesForYear(year: EditionYear = '2026'): Country[] {
  return year === '2025' ? countries2025 : countries
}

export const currentReport: Report = {
  id: 'finar-2026',
  year: 2026,
  title: 'F(in)AR 2026',
  shortMark: 'F(in)AR',
  fullName: 'Freedom in Africa Report 2026',
  slug: 'findings',
  description:
    'The Freedom in Africa Report (F(in)AR) is Liberalist Centre’s annual measure of political freedom, economic freedom, and prosperity across 54 African nations — harmonizing trusted international datasets into a single comparable index.',
  coverImage: '/finar-2026-cover.png',
  pdfUrl: '/finar-2026-report.pdf',
  overallScore: 51.2,
}

export const dataSources: string[] = [
  'Mo Ibrahim Index of African Governance',
  'Freedom House (Freedom in the World & Freedom on the Net)',
  'Cato Institute / Fraser Institute (Human Freedom Index)',
  'World Bank (Business Ready & WDI)',
  'International Labour Organization (ILO)',
  'UNESCO Institute for Statistics',
  'World Health Organization (WHO)',
  'Institute for Economics and Peace (Global Peace Index)',
  'Access Now (KeepItOn internet shutdowns)',
  'Africa Visa Openness Index (AfDB / AU)',
  'CIVICUS Monitor',
]

export const getScoreToneHelper = getScoreTone
export const getScoreLabel = getEditionScoreLabel
export const getScoreColor = getEditionScoreColor
export const getScoreBgClass = getEditionScoreBgClass

export function sortCountriesByScore(list: Country[]): Country[] {
  return [...list].sort((a, b) => b.score - a.score)
}

export function getCountryBySlug(slug: string, year: EditionYear = '2026'): Country | undefined {
  const list = getCountriesForYear(year)
  return list.find((c) => c.slug === slug || c.slug === slug.toLowerCase())
}

export function getTopCountries(year: EditionYear = '2026'): Country[] {
  return getCountriesForYear(year).slice(0, 5)
}

export function getBottomCountries(year: EditionYear = '2026'): Country[] {
  return getCountriesForYear(year).slice(-5).reverse()
}

export function getRegionAverage(region: Country['region'], year: EditionYear = '2026'): number {
  if (year === '2026') {
    const r = regions.find((x) => x.name === region)
    return r?.avgScore ?? 0
  }
  const cfg = getEditionConfig(year)
  const found = cfg.regions.find((x) => x.name.includes(region))
  return found?.avgScore ?? 0
}

export function getAfricaAverage(year: EditionYear = '2026'): number {
  return getEditionConfig(year).overallScore
}

export function getRelatedCountries(country: Country, limit = 4, year: EditionYear = '2026'): Country[] {
  const list = getCountriesForYear(year)
  return list
    .filter((c) => c.slug !== country.slug && c.region === country.region)
    .sort((a, b) => Math.abs(a.score - country.score) - Math.abs(b.score - country.score))
    .slice(0, limit)
}

export function searchCountries(query: string, limit = 8, year: EditionYear = '2026'): Country[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const list = getCountriesForYear(year)
  return list
    .filter((c) => c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
      const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return b.score - a.score
    })
    .slice(0, limit)
}

export function getCountriesBySlugs(slugs: string[], year: EditionYear = '2026'): Country[] {
  return slugs
    .map((slug) => getCountryBySlug(slug, year))
    .filter((c): c is Country => Boolean(c))
}
