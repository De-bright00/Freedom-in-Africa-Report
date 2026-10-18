import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PoliticalFreedomView } from '@/components/views/PoliticalFreedomView'
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
    title: `Political Freedom Dimension (33%) | F(in)AR ${year}`,
    description: `Electoral integrity, freedom of speech, media independence, assembly, judicial independence, and right to dignity across 54 African countries in ${year}.`,
  }
}

export default async function YearPoliticalFreedomPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <PoliticalFreedomView year={year} />
}
