import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SmoothScroll from '@/components/smooth-scroll'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://ctrl-alt-delta.vercel.app'),
  title: {
    template: '%s | Ctrl. Alt. Delta',
    default: 'Ctrl. Alt. Delta | Premier AI & Software Development Agency',
  },
  description: 'We build proprietary AI infrastructure that belongs to you. Premier AI and custom software development agency offering AI workflows, MVP sprints, and fractional CTO services.',
  generator: 'Next.js',
  keywords: ['AI Agency', 'Custom Software Development', 'Build AI MVP', 'Proprietary AI Assets', 'Enterprise AI Solutions', 'AI automation', 'workflow automation', 'startup development'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ctrl-alt-delta.vercel.app',
    siteName: 'Ctrl. Alt. Delta',
    title: 'Ctrl. Alt. Delta | Premier AI & Software Development Agency',
    description: 'We build proprietary AI infrastructure that belongs to you. Premier AI and custom software development agency offering AI workflows, MVP sprints, and fractional CTO services.',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ctrl. Alt. Delta | Premier AI & Software Development Agency',
    description: 'We build proprietary AI infrastructure that belongs to you.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/images/tab_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/images/tab_logo.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
    apple: '/images/tab_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  )
}