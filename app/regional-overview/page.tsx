import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { RegionalChart } from '@/components/charts/RegionalChart'
import { countries, regions } from '@/lib/data'

export default function RegionalOverviewPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker-invert">Regional overview</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Freedom Across Africa&apos;s Five Regions</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              Southern Africa leads the continent with an average score of 61.8. Central Africa trails at 44.3, weighed down by ongoing conflict and weak institutions.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <RegionalChart regions={regions} />
            <div className="grid gap-3">
              {regions.map((region) => (
                <Card key={region.name}>
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="font-bold">{region.name} Africa</p>
                      <p className="text-xs text-muted-foreground">{region.standing}</p>
                    </div>
                    <ScoreBadge score={region.avgScore} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker">Scored countries by region</p>
            <h2 className="mt-3 text-3xl font-bold">Where the top &amp; bottom performers sit</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {regions.map((region) => {
                const regionCountries = countries.filter((c) => c.region === region.name)
                return (
                  <Card key={region.name}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold">{region.name} Africa</p>
                        <ScoreBadge score={region.avgScore} size="sm" />
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        {regionCountries.length > 0 ? (
                          regionCountries.map((country) => (
                            <div key={country.id} className="flex items-center justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <span>{country.flagEmoji}</span>
                                {country.name}
                              </span>
                              <span className="font-semibold text-muted-foreground">#{country.rank}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No countries from this region appear in the top or bottom 10.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <Link href="/findings" className="mt-8 inline-flex text-sm font-semibold text-primary hover:text-accent">
              See the full continental rankings <ArrowRight className="ml-1 inline size-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
