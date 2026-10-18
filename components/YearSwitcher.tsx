'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Calendar, ChevronDown, Check } from 'lucide-react'
import { EditionYear } from '@/lib/editions/types'
import { cn } from '@/lib/utils'

interface YearSwitcherProps {
  currentYear?: EditionYear
  className?: string
}

export function YearSwitcher({ currentYear, className }: YearSwitcherProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Determine active year from URL or prop
  const activeYear: EditionYear =
    currentYear ||
    (pathname?.startsWith('/2025') ? '2025' : '2026')

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectYear = (targetYear: EditionYear) => {
    setOpen(false)
    if (targetYear === activeYear) return

    // Save preference
    try {
      localStorage.setItem('finar_preferred_year', targetYear)
      document.cookie = `finar_preferred_year=${targetYear}; path=/; max-age=31536000`
    } catch (e) {
      // Ignore in private browsing
    }

    // Build target path
    const stripped = pathname.replace(/^\/(2026|2025)/, '') || '/'
    let targetPath = '/'

    if (targetYear === '2026') {
      // For 2026, root is /, otherwise keep stripped path
      targetPath = stripped === '/' ? '/' : stripped
    } else {
      // For 2025, prefix with /2025
      targetPath = stripped === '/' ? '/2025' : `/2025${stripped}`
    }

    router.push(targetPath)
  }

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Select report edition year"
        className="flex items-center gap-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <Calendar className="size-3.5 text-liberalist-coral" />
        <span>{activeYear} Edition</span>
        {activeYear === '2026' && (
          <span className="rounded bg-accent px-1 py-0.2 text-[10px] font-bold uppercase text-accent-foreground">
            Latest
          </span>
        )}
        <ChevronDown className={cn('size-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1.5 text-card-foreground shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Report Editions
          </div>
          <button
            type="button"
            onClick={() => handleSelectYear('2026')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left',
              activeYear === '2026' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">2026</span>
              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">Latest</span>
            </div>
            {activeYear === '2026' && <Check className="size-3.5 text-accent" />}
          </button>

          <button
            type="button"
            onClick={() => handleSelectYear('2025')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left',
              activeYear === '2025' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">2025</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">Inaugural</span>
            </div>
            {activeYear === '2025' && <Check className="size-3.5 text-accent" />}
          </button>

          <div className="mt-1 border-t border-border pt-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                router.push('/compare-years')
              }}
              className="flex w-full items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 transition-colors text-left"
            >
              <span>⚡ Compare 2025 vs 2026</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
