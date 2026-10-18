import type { Metadata } from 'next'
import { DatasetView } from '@/components/views/DatasetView'

export const metadata: Metadata = {
  title: 'Country-Level Indicator Dataset | F(in)AR 2026',
  description:
    'Download and explore the Freedom in Africa Report country-level indicator dataset across 20 factors and 3 dimensions for all 54 African nations. Open-access CSV format.',
}

export default function DatasetPage() {
  return <DatasetView year="2026" />
}
