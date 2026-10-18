import fs from 'fs'
import { countries as countries2025 } from '../lib/data.ts'

const master = JSON.parse(fs.readFileSync('public/finar-2026-master.json', 'utf8'))

console.log('countries2025 length:', countries2025.length)

// Check matching with master y2025
let mismatches = 0
master.countries.forEach(mc => {
  const c25 = countries2025.find(c => c.slug === mc.slug || c.name.toLowerCase() === mc.country.toLowerCase())
  if (!c25) {
    console.log('Not found in 2025 data.ts:', mc.country, mc.slug)
    mismatches++
  } else {
    if (Math.abs(c25.score - mc.y2025.overall) > 0.1 || c25.rank !== mc.y2025.rank) {
      console.log(`Mismatch for ${mc.country}: 2025 data.ts score=${c25.score}, rank=${c25.rank} vs master=${mc.y2025.overall}, rank=${mc.y2025.rank}`)
      mismatches++
    }
  }
})

console.log('Total mismatches between data.ts 2025 and master y2025:', mismatches)
