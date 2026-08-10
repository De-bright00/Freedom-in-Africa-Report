import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { DimensionWeightChart } from '@/components/charts/DimensionWeightChart'
import { dataSources, dimensions } from '@/lib/data'

export default function MethodologyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker-invert">The evidence behind the index</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">Methodology</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">
              A transparent framework combining nine independent data sources into one comparable score for political freedom, economic freedom, and prosperity across 54 African nations.
            </p>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[220px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-3 border-l-2 border-border pl-5 text-sm">
              <a href="#overview" className="font-semibold text-primary">Overview &amp; purpose</a>
              <a href="#framework" className="text-muted-foreground hover:text-primary">Scoring framework</a>
              <a href="#scale" className="text-muted-foreground hover:text-primary">Score interpretation</a>
              <a href="#sources" className="text-muted-foreground hover:text-primary">Data sources</a>
              <a href="#limits" className="text-muted-foreground hover:text-primary">Limitations</a>
            </div>
          </aside>

          <article className="max-w-3xl">
            <section id="overview">
              <p className="section-kicker">01 · Overview</p>
              <h2 className="mt-3 text-3xl font-bold">Why measure freedom and prosperity?</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Freedom is not an abstraction. It is experienced at the ballot box, in the marketplace, and at the hospital or school gate. The Freedom in Africa Report turns that experience into a readable annual measure of whether people can vote, speak, trade, work, and thrive without undue interference.
              </p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                The index is designed to be comparable without pretending every country&apos;s story is the same. We publish the underlying dimensions and weights so readers can interrogate the result, not simply accept a single number.
              </p>
            </section>

            <section id="framework" className="mt-14">
              <p className="section-kicker">02 · Scoring framework</p>
              <h2 className="mt-3 text-3xl font-bold">Three weighted dimensions</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Each country receives a score from 0 to 100 on each dimension. The three scores are combined using the weights below to produce the overall F(in)AR score.
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-[220px_1fr] sm:items-center">
                <DimensionWeightChart dimensions={dimensions} />
                <div className="flex flex-col gap-3">
                  {dimensions.map((dimension) => (
                    <div key={dimension.id} className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
                      <span className="font-semibold">{dimension.name}</span>
                      <span className="font-serif text-xl font-bold text-primary">{dimension.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-6">
                {dimensions.map((dimension) => (
                  <Card key={dimension.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{dimension.name}</span>
                        <span className="font-serif text-lg text-primary">{dimension.weight}%</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-muted-foreground">{dimension.description}</p>
                      <ul className="mt-4 flex flex-col gap-2">
                        {dimension.indicators.map((indicator) => (
                          <li key={indicator} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                            <span>{indicator}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={`/${dimension.slug}`} className="mt-5 inline-flex text-sm font-semibold text-primary hover:text-accent">
                        Explore {dimension.name} <ArrowRight className="ml-1 inline size-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section id="scale" className="mt-14">
              <p className="section-kicker">03 · Score interpretation</p>
              <h2 className="mt-3 text-3xl font-bold">Reading the 0\u2013100 scale</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">Scores of 60 and above indicate strong institutions and outcomes; 40\u201359 indicates meaningful constraints; below 40 indicates severe restrictions or instability.</p>
            </section>

            <section id="sources" className="mt-14">
              <p className="section-kicker">04 · Data sources</p>
              <h2 className="mt-3 text-3xl font-bold">Where the data comes from</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                F(in)AR does not collect primary data. It harmonizes secondary sources from leading research organizations into one comparable index.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {dataSources.map((source) => (
                  <li key={source} className="flex items-start gap-2 rounded-lg border bg-background px-4 py-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="limits" className="mt-14">
              <p className="section-kicker">05 · Limitations</p>
              <h2 className="mt-3 text-3xl font-bold">What the index cannot capture</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Because F(in)AR harmonizes secondary sources rather than collecting primary data, it inherits each source&apos;s own methodology and update cycle. Scores reflect the most recent available data at time of publication and should be read as a comparative snapshot, not a precise real-time measure.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
