import type { Metadata } from 'next'
import { MethodologyView } from '@/components/views/MethodologyView'

export const metadata: Metadata = {
  title: 'Methodology | Scoring Framework & Formula',
  description:
    'The evidence and standardisation framework behind the Freedom in Africa Report, scoring 54 nations across 20 factors and 3 dimensions.',
}

export default function MethodologyPage() {
  return <MethodologyView year="2026" />
}
