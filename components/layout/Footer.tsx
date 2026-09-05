import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Findings', href: '/findings' },
  { label: 'Dataset', href: '/dataset' },
  { label: 'Regional Overview', href: '/regional-overview' },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_0.7fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block" aria-label="F(in)AR home">
            <img
              src="/logo.png"
              alt="F(in)AR"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-6 text-primary-foreground/65">
            Freedom in Africa Report (F[in]AR) is a project of the Liberalist Centre, a research and policy think tank promoting liberty and prosperity in Africa.
          </p>
          <div className="mt-8 max-w-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/70">Research updates</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email address" className="border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40" aria-label="Email address for research updates" />
              <Button className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/70">Explore</p>
          <nav className="flex flex-col gap-3 text-sm text-primary-foreground/75">
            {exploreLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-primary-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground/70">Liberalist Centre</p>
          <p className="text-sm leading-6 text-primary-foreground/65">
            Liberalist Centre gratefully acknowledges Atlas Network as a support partner for this research.
          </p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <Link href="https://theliberalist.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-foreground">
              Our media outlet: theliberalist.org <ArrowUpRight className="ml-1 inline size-3" />
            </Link>
            <a href="mailto:hello@liberalistcentre.org?subject=Freedom%20in%20Africa%20Report" className="text-primary-foreground/80 hover:text-primary-foreground">
              Get in touch <Mail className="ml-1 inline size-3" />
            </a>
          </div>
          <div className="mt-6 flex gap-2">
            <Link href="#" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/15 text-xs font-bold text-primary-foreground/75 hover:text-primary-foreground" aria-label="X / Twitter">X</Link>
            <Link href="#" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/15 text-xs font-bold text-primary-foreground/75 hover:text-primary-foreground" aria-label="Facebook">f</Link>
            <Link href="#" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/15 text-xs font-bold text-primary-foreground/75 hover:text-primary-foreground" aria-label="LinkedIn">in</Link>
            <a href="mailto:hello@liberalistcentre.org" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/75 hover:text-primary-foreground" aria-label="Email">
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-primary-foreground/65 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© 2025 Liberalist Centre. All rights reserved.</span>
          <span>Freedom in Africa Report (F(in)AR)</span>
        </div>
      </div>
    </footer>
  )
}
