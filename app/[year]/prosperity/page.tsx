import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ProsperityView } from '@/components/views/ProsperityView'
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
    title: `Prosperity Dimension (34%) | F(in)AR ${year}`,
    description: `Income stability, healthcare access, education, infrastructure, inequality reduction, and peace across 54 African nations in ${year}.`,
  }
}

export default async function YearProsperityPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <ProsperityView year={year} />
}
