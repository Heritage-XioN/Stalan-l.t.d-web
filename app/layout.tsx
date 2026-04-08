import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Stalan L.T.D — Advancing Technology for Humanity',
    template: '%s | Stalan L.T.D',
  },
  description: 'Stalan L.T.D is a multi-disciplinary technology firm dedicated to advancing safe and healthy technology for the development of society.',
  keywords: ['Stalan', 'technology', 'RCD', 'SC-Static', 'drone', 'smart home', 'Nigeria', 'engineering'],
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Stalan L.T.D',
    title: 'Stalan L.T.D — Advancing Technology for Humanity',
    description: 'Multi-disciplinary technology firm building next-generation safe infrastructure.',
    url: 'https://stalan.ltd',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
