import type { Metadata } from 'next'
import { EconomicFreedomView } from '@/components/views/EconomicFreedomView'

export const metadata: Metadata = {
  title: 'Economic Freedom Dimension (33%) | F(in)AR 2026',
  description:
    'Property rights, business entry, AfCFTA trade, visa mobility, taxation burden, labour flexibility, and digital economy growth across Africa.',
}

export default function EconomicFreedomPage() {
  return <EconomicFreedomView year="2026" />
}
