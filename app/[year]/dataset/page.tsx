import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DatasetView } from '@/components/views/DatasetView'
import { isValidEditionYear } from '@/lib/editions'

interface PageProps {
  params: Promise<{ year: string }>
}

export function generateStaticParams() {
  return [{ year: '2026' }, { year: '2025' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params
  if (!isValidEditionYear(year)) return { title: 'Not Found' }
  return {
    title: `Country-Level Indicator Dataset | F(in)AR ${year}`,
    description: `Download and explore the Freedom in Africa Report country-level indicator dataset across 20 factors and 3 dimensions for all 54 African nations (${year} edition). Open-access CSV format.`,
  }
}

export default async function YearDatasetPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <DatasetView year={year} />
}
