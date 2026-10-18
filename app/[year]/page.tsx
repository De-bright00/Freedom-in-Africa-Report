import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { HomeView } from '@/components/views/HomeView'
import { isValidEditionYear, getEditionConfig } from '@/lib/editions'

interface PageProps {
  params: Promise<{ year: string }>
}

export function generateStaticParams() {
  return [{ year: '2026' }, { year: '2025' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params
  if (!isValidEditionYear(year)) return { title: 'Not Found' }
  const edition = getEditionConfig(year)
  return {
    title: `${edition.fullName} | Measuring Freedom & Prosperity in Africa`,
    description: edition.headlineSummary,
  }
}

export default async function YearHomePage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <HomeView year={year} />
}
