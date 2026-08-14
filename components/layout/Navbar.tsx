import Link from 'next/link'
import { Menu, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { TorchIcon } from '@/components/ui/TorchIcon'
import { currentReport } from '@/lib/data'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/findings', label: 'Findings' },
  { href: '/political-freedom', label: 'Political Freedom' },
  { href: '/economic-freedom', label: 'Economic Freedom' },
  { href: '/prosperity', label: 'Prosperity' },
  { href: '/regional-overview', label: 'Regional Overview' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Freedom in Africa Report home">
          <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <TorchIcon className="size-6" />
          </span>
          <span className="font-serif text-lg font-bold leading-none tracking-tight">
            Freedom in Africa Report
          </span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="whitespace-nowrap text-xs font-medium text-primary-foreground/75 transition-colors hover:text-primary-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden shrink-0 items-center lg:flex">
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={currentReport.pdfUrl} download="F(in)AR_2025_Freedom_in_Africa_Report.pdf" target="_blank" rel="noopener noreferrer">
              <Download data-icon="inline-start" /> Download Report
            </Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground xl:hidden" aria-label="Open navigation menu" />}>
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-primary text-primary-foreground">
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <div className="flex flex-col gap-6 pt-10">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="text-lg font-medium">
                  {link.label}
                </Link>
              ))}
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={currentReport.pdfUrl} download="F(in)AR_2025_Freedom_in_Africa_Report.pdf" target="_blank" rel="noopener noreferrer">
                  <Download data-icon="inline-start" /> Download Report
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
