import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MethodologyView } from '@/components/views/MethodologyView'
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
    title: `Methodology (${year}) | Scoring Framework & Formula`,
    description: `The evidence and standardisation framework behind the Freedom in Africa Report (${year}), scoring 54 nations across 20 factors and 3 dimensions.`,
  }
}

export default async function YearMethodologyPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <MethodologyView year={year} />
}
