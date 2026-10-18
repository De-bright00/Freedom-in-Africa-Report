import type { Metadata } from 'next'
import { FindingsView } from '@/components/views/FindingsView'

export const metadata: Metadata = {
  title: 'Findings | The State of Freedom in Africa 2026',
  description:
    'Key findings, continental rankings, and thematic analysis from the Freedom in Africa Report 2026 edition.',
}

export default function FindingsPage() {
  return <FindingsView year="2026" />
}
