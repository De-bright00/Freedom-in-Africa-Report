import type { Metadata } from 'next'
import { CompareYearsView } from '@/components/views/CompareYearsView'

export const metadata: Metadata = {
  title: 'Compare 2025 vs 2026 Editions',
  description:
    'Track year-on-year freedom and prosperity changes across 54 African countries between the 2025 and 2026 Freedom in Africa Report editions.',
}

export default function CompareYearsPage() {
  return <CompareYearsView />
}
