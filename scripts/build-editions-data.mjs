import fs from 'fs'

const master = JSON.parse(fs.readFileSync('public/finar-2026-master.json', 'utf8'))
const rankingsCsv = fs.readFileSync('public/finar-2026-rankings.csv', 'utf8').trim().split('\n')
const indicator2026Csv = fs.readFileSync('public/finar-2026-indicator-dataset.csv', 'utf8').trim().split('\n')
const indicator2025Csv = fs.readFileSync('public/finar-2025-dataset.csv', 'utf8').trim().split('\n')

// Country flags
const flagMap = {
  'algeria': '🇩🇿', 'angola': '🇦🇴', 'benin': '🇧🇯', 'botswana': '🇧🇼', 'burkina-faso': '🇧🇫',
  'burundi': '🇧🇮', 'cabo-verde': '🇨🇻', 'cameroon': '🇨🇲', 'central-african-republic': '🇨🇫',
  'chad': '🇹🇩', 'comoros': '🇰🇲', 'congo-republic': '🇨🇬', 'cote-divoire': '🇨🇮',
  'dr-congo': '🇨🇩', 'djibouti': '🇩🇯', 'egypt': '🇪🇬', 'equatorial-guinea': '🇬🇶',
  'eritrea': '🇪🇷', 'eswatini': '🇸🇿', 'ethiopia': '🇪🇹', 'gabon': '🇬🇦', 'gambia': '🇬🇲',
  'ghana': '🇬🇭', 'guinea': '🇬🇳', 'guinea-bissau': '🇬🇼', 'kenya': '🇰🇪', 'lesotho': '🇱🇸',
  'liberia': '🇱🇷', 'libya': '🇱🇾', 'madagascar': '🇲🇬', 'malawi': '🇲🇼', 'mali': '🇲🇱',
  'mauritania': '🇲🇷', 'mauritius': '🇲🇺', 'morocco': '🇲🇦', 'mozambique': '🇲🇿',
  'namibia': '🇳🇦', 'niger': '🇳🇪', 'nigeria': '🇳🇬', 'rwanda': '🇷🇼',
  'sao-tome-and-principe': '🇸🇹', 'senegal': '🇸🇳', 'seychelles': '🇸🇨',
  'sierra-leone': '🇸🇱', 'somalia': '🇸🇴', 'south-africa': '🇿🇦', 'south-sudan': '🇸🇸',
  'sudan': '🇸🇩', 'tanzania': '🇹🇿', 'togo': '🇹🇬', 'tunisia': '🇹🇳', 'uganda': '🇺🇬',
  'zambia': '🇿🇲', 'zimbabwe': '🇿🇼'
}

// 2025 alias map
const aliasMap2025 = {
  'Cape Verde': 'Cabo Verde',
  'Ivory Coast': "Cote d'Ivoire",
  'Republic of the Congo': 'Congo Republic',
  'Democratic Republic of the Congo': 'DR Congo',
  'The Gambia': 'Gambia',
  'Gambia, The': 'Gambia',
  'Sao Tome and Principe': 'Sao Tome and Principe',
  'São Tomé and Príncipe': 'Sao Tome and Principe',
}

// Parse 2025 CSV indicators
const parsed2025Indicators = {}
indicator2025Csv.slice(1).forEach(line => {
  const parts = line.split(',')
  const rawName = parts[0].replace(/"/g, '').trim()
  const name = aliasMap2025[rawName] || rawName
  const vals = parts.slice(1).map(v => {
    const n = parseFloat(v)
    return isNaN(n) ? null : Number((n / 10).toFixed(2))
  })
  parsed2025Indicators[name] = {
    electoral_integrity: vals[0],
    speech: vals[1],
    media: vals[2],
    assembly: vals[3],
    judicial: vals[4],
    freedom_from_oppression: vals[5],
    property_rights: vals[6],
    ease_of_business: vals[7],
    trade: vals[8],
    travel: vals[9],
    tax_burden: vals[10],
    labour: vals[11],
    digital_economy: vals[12],
    income_poverty: vals[13],
    employment: vals[14],
    education: vals[15],
    healthcare: vals[16],
    infrastructure: vals[17],
    social_mobility: vals[18],
    peace_stability: vals[19],
  }
})

// Read previous 2025 descriptions from lib/data.ts
import { countries as prev2025Countries } from '../lib/data.ts'
const descMap2025 = {}
const pillar2025Map = {}
prev2025Countries.forEach(c => {
  const normName = aliasMap2025[c.name] || c.name
  descMap2025[normName] = c.description
  pillar2025Map[normName] = {
    politicalScore: c.politicalScore,
    economicScore: c.economicScore,
    prosperityScore: c.prosperityScore,
  }
})

// Ensure output dir exists
if (!fs.existsSync('lib/editions')) {
  fs.mkdirSync('lib/editions', { recursive: true })
}

// Build 2026 countries list
const countries2026 = master.countries.map(c => {
  const tier = c.y2026.rank <= 10 ? 'top' : c.y2026.rank >= 45 ? 'bottom' : 'mid'
  const flag = flagMap[c.slug] || '🌍'
  return {
    country: c.country,
    slug: c.slug,
    region: c.region,
    flagEmoji: flag,
    rank: c.y2026.rank,
    overall: c.y2026.overall,
    political: c.y2026.political,
    economic: c.y2026.economic,
    prosperity: c.y2026.prosperity,
    tier,
    description: `Ranked #${c.y2026.rank} in the 2026 edition with an overall score of ${c.y2026.overall}. Political freedom stands at ${c.y2026.political}, economic freedom at ${c.y2026.economic}, and prosperity at ${c.y2026.prosperity}.`,
    indicators: c.y2026.indicators
  }
}).sort((a, b) => a.rank - b.rank)

// Build 2025 countries list
const countries2025 = master.countries.map(c => {
  const tier = c.y2025.rank <= 10 ? 'top' : c.y2025.rank >= 45 ? 'bottom' : 'mid'
  const flag = flagMap[c.slug] || '🌍'
  const ind25 = parsed2025Indicators[c.country] || {}
  const prevPillars = pillar2025Map[c.country] || {}
  
  // Compute approximate 2025 pillars if not in prevPillars
  const polScore = prevPillars.politicalScore ?? Number((( (ind25.electoral_integrity ?? 5) + (ind25.speech ?? 5) + (ind25.media ?? 5) + (ind25.assembly ?? 5) + (ind25.judicial ?? 5) + (ind25.freedom_from_oppression ?? 5) ) / 6 * 10).toFixed(1))
  const ecoScore = prevPillars.economicScore ?? Number((( (ind25.property_rights ?? 5) + (ind25.ease_of_business ?? 5) + (ind25.trade ?? 5) + (ind25.travel ?? 5) + (ind25.tax_burden ?? 5) + (ind25.labour ?? 5) + (ind25.digital_economy ?? 5) ) / 7 * 10).toFixed(1))
  const proScore = prevPillars.prosperityScore ?? Number(((c.y2025.overall - 0.33 * polScore - 0.33 * ecoScore) / 0.34).toFixed(1))

  return {
    country: c.country,
    slug: c.slug,
    region: c.region,
    flagEmoji: flag,
    rank: c.y2025.rank,
    overall: c.y2025.overall,
    political: polScore,
    economic: ecoScore,
    prosperity: proScore,
    tier,
    description: descMap2025[c.country] || `Ranked #${c.y2025.rank} in the 2025 edition with an overall score of ${c.y2025.overall}.`,
    indicators: {
      ...ind25,
      monetary_freedom: ind25.income_poverty ?? null,
      inequality: ind25.social_mobility ?? null,
    }
  }
}).sort((a, b) => a.rank - b.rank)

// Build comparison records
const comparisonRecords = master.countries.map(c => {
  const c26 = countries2026.find(x => x.slug === c.slug)
  const c25 = countries2025.find(x => x.slug === c.slug)
  return {
    country: c.country,
    slug: c.slug,
    region: c.region,
    flagEmoji: flagMap[c.slug] || '🌍',
    y2026: {
      rank: c26.rank,
      overall: c26.overall,
      political: c26.political,
      economic: c26.economic,
      prosperity: c26.prosperity,
    },
    y2025: {
      rank: c25.rank,
      overall: c25.overall,
      political: c25.political,
      economic: c25.economic,
      prosperity: c25.prosperity,
    },
    change: {
      overall: Number((c26.overall - c25.overall).toFixed(2)),
      rank: c25.rank - c26.rank, // positive means rank improved (e.g. 8 -> 3 is +5)
      political: Number((c26.political - c25.political).toFixed(2)),
      economic: Number((c26.economic - c25.economic).toFixed(2)),
      prosperity: Number((c26.prosperity - c25.prosperity).toFixed(2)),
    },
    indicators2026: c26.indicators,
    indicators2025: c25.indicators,
  }
}).sort((a, b) => a.y2026.rank - b.y2026.rank)

// Write files
fs.writeFileSync('lib/editions/data-2026.json', JSON.stringify(countries2026, null, 2))
fs.writeFileSync('lib/editions/data-2025.json', JSON.stringify(countries2025, null, 2))
fs.writeFileSync('lib/editions/comparison.json', JSON.stringify(comparisonRecords, null, 2))

console.log('Successfully generated JSON files in lib/editions/!')
