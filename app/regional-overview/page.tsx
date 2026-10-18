import type { Metadata } from 'next'
import { RegionalOverviewView } from '@/components/views/RegionalOverviewView'

export const metadata: Metadata = {
  title: 'Regional Overview | Freedom Across Africa’s Five Regions',
  description:
    'Comparative freedom and prosperity index across Southern, Western, Eastern, Northern, and Central Africa.',
}

export default function RegionalOverviewPage() {
  return <RegionalOverviewView year="2026" />
}
