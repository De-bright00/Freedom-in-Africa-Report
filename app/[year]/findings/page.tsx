import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { FindingsView } from '@/components/views/FindingsView'
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
    title: `Findings (${year}) | The State of Freedom in Africa`,
    description: `Continental rankings, regional breakdowns, and key findings from the Freedom in Africa Report (${year}).`,
  }
}

export default async function YearFindingsPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <FindingsView year={year} />
}
