import type { Metadata } from 'next'
import { CountryView } from '@/components/views/CountryView'
import { getCountry, getCountries } from '@/lib/editions'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const countries = getCountries('2026')
  return countries.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const country = getCountry(slug, '2026')
  if (!country) {
    return { title: 'Country Not Found' }
  }
  return {
    title: `${country.country} - F(in)AR 2026 Score & Rank`,
    description: `${country.country} ranks #${country.rank} in Africa with an overall score of ${country.overall.toFixed(1)} in the Freedom in Africa Report 2026 edition.`,
  }
}

export default async function CountryPage({ params }: PageProps) {
  const { slug } = await params
  return <CountryView slug={slug} year="2026" />
}
