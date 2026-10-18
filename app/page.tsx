import type { Metadata } from 'next'
import { HomeView } from '@/components/views/HomeView'

export const metadata: Metadata = {
  title: 'Freedom in Africa Report 2026 | Measuring Political, Economic Freedom & Prosperity',
  description:
    'The Freedom in Africa Report (F(in)AR) 2026 scores 54 African nations across Political Freedom (52.8), Economic Freedom (44.3), and Prosperity (56.5). Published by Liberalist Centre.',
}

export default function HomePage() {
  return <HomeView year="2026" />
}
