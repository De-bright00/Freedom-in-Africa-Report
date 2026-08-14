import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { ScoreBadge } from '@/components/ui/ScoreBadge'
import { GlobalComparisonChart, RegionalChart } from '@/components/charts/RegionalChart'
import { RankingsDashboard } from '@/components/RankingsDashboard'
import { currentReport, globalComparison, regions } from '@/lib/data'

const stats = [
  { value: '52.8', label: 'Africa\u2019s overall score', note: 'out of 100 · 2025' },
  { value: '54', label: 'Countries scored', note: 'across the continent' },
  { value: '61.8', label: 'Best-performing region', note: 'Southern Africa' },
  { value: '44.3', label: 'Lowest-scoring region', note: 'Central Africa' },
]

export default function FindingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[280px_1fr] lg:items-center lg:px-8">
            <div className="mx-auto max-w-[280px] shadow-2xl overflow-hidden rounded-lg border border-white/10">
              <img
                src="/finar-2025-cover.png"
                alt="Freedom in Africa Report 2025 Cover"
                className="w-full h-auto object-cover"
              />
            </div>
            <div>
              <p className="section-kicker-invert">Findings · 2025 edition</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">The State of Freedom in Africa</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">{currentReport.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href={currentReport.pdfUrl} download="F(in)AR_2025_Freedom_in_Africa_Report.pdf" target="_blank" rel="noopener noreferrer">
                    <Download data-icon="inline-start" /> Download PDF
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link href="#rankings">
                    Jump to rankings <ArrowRight data-icon="inline-end" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <p className="section-kicker">Key findings</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <p className="font-serif text-4xl font-bold tracking-tight text-primary">{stat.value}</p>
                  <p className="mt-3 font-semibold">{stat.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
            <p className="section-kicker">Global context</p>
            <h2 className="mt-3 text-3xl font-bold">How Africa compares</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">Average freedom and prosperity composite score by world region, Atlantic Council 2024 data.</p>
            <div className="mt-8">
              <GlobalComparisonChart data={globalComparison} />
            </div>
          </div>
        </section>

        <section id="rankings" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="section-kicker">The rankings</p>
              <h2 className="mt-3 text-3xl font-bold">Continental Rankings &amp; Comparison</h2>
              <p className="mt-2 text-sm text-muted-foreground">Scores are measured on a 0–100 scale. Search countries or select multiple to compare side-by-side.</p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/methodology">
                Read the methodology <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <div className="mt-8">
            <RankingsDashboard />
          </div>
        </section>

        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="section-kicker">Regional breakdown</p>
                <h2 className="mt-3 text-3xl font-bold">Freedom by region</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  Southern Africa leads the continent, driven by Botswana, South Africa, and Namibia. Central Africa scores lowest, weighed down by ongoing conflict and weak institutions.
                </p>
                <div className="mt-8">
                  <RegionalChart regions={regions} />
                </div>
              </div>
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>How to read the score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={70} />
                      <div>
                        <p className="font-semibold">High freedom &amp; prosperity</p>
                        <p className="text-sm text-muted-foreground">60\u2013100: strong institutions and outcomes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={50} />
                      <div>
                        <p className="font-semibold">Moderate</p>
                        <p className="text-sm text-muted-foreground">40\u201359: meaningful constraints remain</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScoreBadge score={25} />
                      <div>
                        <p className="font-semibold">Low freedom &amp; prosperity</p>
                        <p className="text-sm text-muted-foreground">0\u201339: severe restrictions or instability</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <Link href="/methodology" className="text-sm font-semibold text-primary hover:text-accent">
                    Read the full methodology <ArrowRight className="ml-1 inline size-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="section-kicker">About this report</p>
              <h2 className="mt-3 text-3xl font-bold">A measure of freedom and prosperity</h2>
            </div>
            <div className="flex flex-col gap-5 text-base leading-7 text-muted-foreground">
              <p>The Freedom in Africa Report — F(in)AR — measures the conditions that let people vote in credible elections, speak freely, own property, trade, and build a better life across 54 African nations.</p>
              <p>The report does not collect primary data. Instead, it harmonizes secondary sources — including the Mo Ibrahim Index, Freedom House, Atlantic Council, and Heritage Foundation — into one transparent, comparable score.</p>
              <Link href="/methodology" className="font-semibold text-primary hover:text-accent">
                How we built the index <ArrowRight className="ml-1 inline size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
