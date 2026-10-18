import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { EconomicFreedomView } from '@/components/views/EconomicFreedomView'
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
    title: `Economic Freedom Dimension (33%) | F(in)AR ${year}`,
    description: `Property rights, business entry, AfCFTA trade, visa mobility, taxation burden, labour flexibility, and digital economy growth across Africa in ${year}.`,
  }
}

export default async function YearEconomicFreedomPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <EconomicFreedomView year={year} />
}
