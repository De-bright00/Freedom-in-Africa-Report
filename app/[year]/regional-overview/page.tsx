import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RegionalOverviewView } from '@/components/views/RegionalOverviewView'
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
    title: `Regional Overview (${year}) | Freedom Across Africa’s Five Regions`,
    description: `Comparative freedom and prosperity index across Southern, Western, Eastern, Northern, and Central Africa in ${year}.`,
  }
}

export default async function YearRegionalOverviewPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <RegionalOverviewView year={year} />
}
