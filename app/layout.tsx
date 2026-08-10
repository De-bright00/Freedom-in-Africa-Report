import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const libreBaskerville = Libre_Baskerville({ subsets: ['latin'], variable: '--font-libre-baskerville', weight: ['400', '700'] })

export const metadata: Metadata = {
  title: {
    default: 'F(in)AR 2025 | Freedom in Africa Report — Liberalist Centre',
    template: '%s | Freedom in Africa Report',
  },
  description: 'The Freedom in Africa Report (F(in)AR) measures political freedom, economic freedom, and prosperity across 54 African nations. Published by Liberalist Centre.',
  generator: 'Liberalist Centre',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${libreBaskerville.variable} antialiased`}>

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
