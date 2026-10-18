import { EditionYear, CountryScore, ComparisonCountry, EditionConfig } from './types'
import { config2026 } from './content-2026'
import { config2025 } from './content-2025'
import { indicatorMetadata } from './indicators'

import countries2026Data from './data-2026.json'
import countries2025Data from './data-2025.json'
import comparisonData from './comparison.json'

export * from './types'
export * from './indicators'

const countries2026 = countries2026Data as CountryScore[]
const countries2025 = countries2025Data as CountryScore[]
const comparisons = comparisonData as ComparisonCountry[]

export function isValidEditionYear(year: string): year is EditionYear {
  return year === '2026' || year === '2025'
}

export function getEditionConfig(year: EditionYear = '2026'): EditionConfig {
  return year === '2025' ? config2025 : config2026
}

export function getCountries(year: EditionYear = '2026'): CountryScore[] {
  return year === '2025' ? countries2025 : countries2026
}

export function getCountry(slug: string, year: EditionYear = '2026'): CountryScore | undefined {
  const list = getCountries(year)
  return list.find((c) => c.slug === slug || c.slug === slug.toLowerCase())
}

export function getTopCountries(year: EditionYear = '2026', limit = 5): CountryScore[] {
  return getCountries(year).slice(0, limit)
}

export function getBottomCountries(year: EditionYear = '2026', limit = 5): CountryScore[] {
  return getCountries(year).slice(-limit).reverse()
}

export function getComparisonData(): ComparisonCountry[] {
  return comparisons
}

export function getComparisonCountry(slug: string): ComparisonCountry | undefined {
  return comparisons.find((c) => c.slug === slug || c.slug === slug.toLowerCase())
}

/**
 * Single Canonical Score Legend across the entire application:
 * - High: Score >= 65
 * - Moderate: Score 45 - 64
 * - Low: Score < 45
 */
export function getScoreTone(score: number): 'high' | 'moderate' | 'low' {
  if (score >= 65) return 'high'
  if (score >= 45) return 'moderate'
  return 'low'
}

export function getScoreLabel(score: number): 'High' | 'Moderate' | 'Low' {
  if (score >= 65) return 'High'
  if (score >= 45) return 'Moderate'
  return 'Low'
}

export function getScoreColor(score: number): 'green' | 'amber' | 'red' {
  if (score >= 65) return 'green'
  if (score >= 45) return 'amber'
  return 'red'
}

export function getScoreBgClass(score: number): string {
  const tone = getScoreTone(score)
  if (tone === 'high') {
    return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-700/50'
  }
  if (tone === 'moderate') {
    return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700/50'
  }
  return 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-700/50'
}

export function searchCountries(query: string, year: EditionYear = '2026', limit = 8): CountryScore[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return getCountries(year)
    .filter((c) => c.country.toLowerCase().includes(q) || c.region.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStarts = a.country.toLowerCase().startsWith(q) ? 0 : 1
      const bStarts = b.country.toLowerCase().startsWith(q) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts
      return b.overall - a.overall
    })
    .slice(0, limit)
}
