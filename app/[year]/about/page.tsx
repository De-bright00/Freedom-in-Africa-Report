import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AboutView } from '@/components/views/AboutView'
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
    title: `About Liberalist Centre · ${year}`,
    description:
      'Liberalist Centre is an African policy and research think tank measuring and advancing political freedom, economic freedom, and prosperity.',
  }
}

export default async function YearAboutPage({ params }: PageProps) {
  const { year } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  return <AboutView year={year} />
}
