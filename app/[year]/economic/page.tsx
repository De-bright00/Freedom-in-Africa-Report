import { redirect } from 'next/navigation'

interface PageProps {
  params: Promise<{ year: string }>
}

export function generateStaticParams() {
  return [{ year: '2026' }, { year: '2025' }]
}

export default async function YearEconomicRedirect({ params }: PageProps) {
  const { year } = await params
  redirect(`/${year}/economic-freedom`)
}
