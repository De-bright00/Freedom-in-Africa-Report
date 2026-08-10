import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { getDimensionBySlug } from '@/lib/data'

export default function EconomicFreedomPage() {
  const dimension = getDimensionBySlug('economic-freedom')!

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <p className="section-kicker-invert">Dimension 2 of 3 · {dimension.weight}% of the score</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{dimension.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/70">{dimension.summary}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="section-kicker">What it measures</p>
              <h2 className="mt-3 text-3xl font-bold">Property, trade, and business openness</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">{dimension.description}</p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">
                Economic Freedom carries {dimension.weight}% of the overall F(in)AR score. Countries that make it easy to own land, start a business, and trade across borders consistently post stronger prosperity outcomes.
              </p>
              <Link href="/methodology" className="mt-6 inline-flex text-sm font-semibold text-primary hover:text-accent">
                Read the full methodology <ArrowRight className="ml-1 inline size-4" />
              </Link>
            </div>
            <Card className="h-fit bg-muted/30">
              <CardContent className="p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Indicators</p>
                <ul className="mt-6 flex flex-col gap-4">
                  {dimension.indicators.map((indicator) => (
                    <li key={indicator} className="flex items-start gap-3 border-b pb-4 text-base font-medium last:border-0 last:pb-0">
                      <Check className="mt-0.5 size-5 shrink-0 text-accent" />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-t bg-muted/30">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-14 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="section-kicker">Continue exploring</p>
              <h2 className="mt-2 text-2xl font-bold">See the other dimensions</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/political-freedom" className="text-sm font-semibold text-primary hover:text-accent">
                Political Freedom <ArrowRight className="ml-1 inline size-4" />
              </Link>
              <Link href="/prosperity" className="text-sm font-semibold text-primary hover:text-accent">
                Prosperity <ArrowRight className="ml-1 inline size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
