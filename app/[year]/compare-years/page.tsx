import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CompareYearsView } from '@/components/views/CompareYearsView'
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
    title: 'Compare 2025 vs 2026 Editions | F(in)AR',
    description:
      'Track year-on-year freedom and prosperity changes across 54 African countries between the 2025 and 2026 Freedom in Africa Report editions.',
  }
}

export default async function YearCompareYearsPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <CompareYearsView />
}
