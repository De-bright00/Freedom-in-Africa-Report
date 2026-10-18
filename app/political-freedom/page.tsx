import type { Metadata } from 'next'
import { PoliticalFreedomView } from '@/components/views/PoliticalFreedomView'

export const metadata: Metadata = {
  title: 'Political Freedom Dimension (33%) | F(in)AR 2026',
  description:
    'Electoral integrity, freedom of speech, media independence, assembly, judicial independence, and right to dignity across 54 African countries.',
}

export default function PoliticalFreedomPage() {
  return <PoliticalFreedomView year="2026" />
}
