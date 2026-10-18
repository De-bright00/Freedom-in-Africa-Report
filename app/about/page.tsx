import type { Metadata } from 'next'
import { AboutView } from '@/components/views/AboutView'

export const metadata: Metadata = {
  title: 'About Liberalist Centre',
  description:
    'Liberalist Centre is an African policy and research think tank measuring and advancing political freedom, economic freedom, and prosperity.',
}

export default function AboutPage() {
  return <AboutView year="2026" />
}
