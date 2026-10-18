import type { Metadata } from 'next'
import { ProsperityView } from '@/components/views/ProsperityView'

export const metadata: Metadata = {
  title: 'Prosperity Dimension (34%) | F(in)AR 2026',
  description:
    'Income stability, healthcare access, education, infrastructure, inequality reduction, and peace across 54 African nations.',
}

export default function ProsperityPage() {
  return <ProsperityView year="2026" />
}
