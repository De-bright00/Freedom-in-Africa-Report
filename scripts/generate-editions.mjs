import fs from 'fs'

const master = JSON.parse(fs.readFileSync('public/finar-2026-master.json', 'utf8'))
const rankingsCsv = fs.readFileSync('public/finar-2026-rankings.csv', 'utf8').trim().split('\n')
const indicator2026Csv = fs.readFileSync('public/finar-2026-indicator-dataset.csv', 'utf8').trim().split('\n')
const indicator2025Csv = fs.readFileSync('public/finar-2025-dataset.csv', 'utf8').trim().split('\n')

// 2025 indicator mapping
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

// Parse 2025 CSV rows
const parsed2025Indicators = {}
const headers2025 = indicator2025Csv[0].split(',')
indicator2025Csv.slice(1).forEach(line => {
  const parts = line.split(',')
  const rawName = parts[0].replace(/"/g, '').trim()
  const name = aliasMap2025[rawName] || rawName
  const vals = parts.slice(1).map(v => {
    const n = parseFloat(v)
    return isNaN(n) ? null : Number((n / 10).toFixed(2)) // normalise to 0-10 scale
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

console.log('2025 parsed countries count:', Object.keys(parsed2025Indicators).length)
