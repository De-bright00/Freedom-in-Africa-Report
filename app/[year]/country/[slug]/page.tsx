import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CountryView } from '@/components/views/CountryView'
import { getCountry, getCountries, isValidEditionYear, EditionYear } from '@/lib/editions'

interface PageProps {
  params: Promise<{ year: string; slug: string }>
}

export async function generateStaticParams() {
  const years: EditionYear[] = ['2026', '2025']
  const params: { year: string; slug: string }[] = []

  for (const year of years) {
    const countries = getCountries(year)
    for (const c of countries) {
      params.push({ year, slug: c.slug })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year, slug } = await params
  if (!isValidEditionYear(year)) return { title: 'Not Found' }
  const country = getCountry(slug, year)
  if (!country) {
    return { title: 'Country Not Found' }
  }
  return {
    title: `${country.country} - F(in)AR ${year} Score & Rank`,
    description: `${country.country} ranks #${country.rank} in Africa with an overall score of ${country.overall.toFixed(1)} in the Freedom in Africa Report ${year} edition.`,
  }
}

export default async function YearCountryPage({ params }: PageProps) {
  const { year, slug } = await params
  if (!isValidEditionYear(year)) {
    notFound()
  }
  const country = getCountry(slug, year)
  if (!country) {
    notFound()
  }
  return <CountryView slug={slug} year={year} />
}
