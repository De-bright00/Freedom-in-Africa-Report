'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Calendar, ChevronDown, Check, GitCompare } from 'lucide-react'
import { EditionYear } from '@/lib/editions/types'
import { cn } from '@/lib/utils'

interface YearSwitcherProps {
  currentYear?: EditionYear
  className?: string
  isCompare?: boolean
}

export function YearSwitcher({ currentYear, className, isCompare: propIsCompare }: YearSwitcherProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Determine active year from URL or prop
  const activeYear: EditionYear =
    currentYear ||
    (pathname?.startsWith('/2025') ? '2025' : '2026')

  // Detect whether we are on the compare years page
  const isCompare =
    propIsCompare ??
    Boolean(pathname && (pathname === '/compare-years' || pathname.includes('compare-years')))

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
    if (!isCompare && targetYear === activeYear) return

    // Save preference
    try {
      localStorage.setItem('finar_preferred_year', targetYear)
      document.cookie = `finar_preferred_year=${targetYear}; path=/; max-age=31536000`
    } catch (e) {
      // Ignore in private browsing
    }

    // Return to the home of that selected year irrespective of current page, with a full refresh
    const targetPath = targetYear === '2025' ? '/2025' : '/'
    window.location.href = targetPath
  }

  const handleSelectCompare = () => {
    setOpen(false)
    if (isCompare) return

    const comparePath = activeYear === '2025' ? '/2025/compare-years' : '/compare-years'
    window.location.href = comparePath
  }

  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={isCompare ? 'Report edition: Compare' : 'Select report edition year'}
        className={cn(
          'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-accent',
          isCompare
            ? 'border-accent/40 bg-accent/15 text-white hover:bg-accent/25'
            : 'border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20'
        )}
      >
        {isCompare ? (
          <>
            <GitCompare className="size-3.5 text-accent" />
            <span>Compare</span>
            <span className="hidden sm:inline-block rounded bg-accent px-1.5 py-0.2 text-[10px] font-bold uppercase text-accent-foreground">
              2025 vs 2026
            </span>
          </>
        ) : (
          <>
            <Calendar className="size-3.5 text-liberalist-coral" />
            <span>{activeYear} Edition</span>
            {activeYear === '2026' && (
              <span className="rounded bg-accent px-1 py-0.2 text-[10px] font-bold uppercase text-accent-foreground">
                Latest
              </span>
            )}
          </>
        )}
        <ChevronDown className={cn('size-3 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 text-card-foreground shadow-xl ring-1 ring-black/5 animate-in fade-in-50 zoom-in-95">
          <div className="px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Report Editions
          </div>
          <button
            type="button"
            onClick={() => handleSelectYear('2026')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left',
              !isCompare && activeYear === '2026' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">2026</span>
              <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">Latest</span>
            </div>
            {!isCompare && activeYear === '2026' && <Check className="size-3.5 text-accent" />}
          </button>

          <button
            type="button"
            onClick={() => handleSelectYear('2025')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left',
              !isCompare && activeYear === '2025' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">2025</span>
            </div>
            {!isCompare && activeYear === '2025' && <Check className="size-3.5 text-accent" />}
          </button>

          <div className="mt-1 border-t border-border pt-1">
            <button
              type="button"
              onClick={handleSelectCompare}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left',
                isCompare ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-muted text-foreground'
              )}
            >
              <div className="flex items-center gap-2">
                <GitCompare className="size-3.5 text-accent" />
                <span className="text-sm font-semibold">Compare</span>
                <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                  2025 vs 2026
                </span>
              </div>
              {isCompare && <Check className="size-3.5 text-accent" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
