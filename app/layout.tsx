import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stalan L.T.D',
  url: 'https://stalan.ltd',
  logo: 'https://stalan.ltd/logo_square_512.png',
  image: 'https://stalan.ltd/og-image.png',
  description: 'Stalan L.T.D is a multi-disciplinary technology firm dedicated to revolutionizing modern day technology for the development of society.',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+234-916-065-5652',
    contactType: 'customer service',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'NG',
  },
  sameAs: [
    'https://wa.me/2349160655652',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://stalan.ltd'),
  title: {
    default: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
    template: '%s | Stalan L.T.D',
  },
  description: 'Stalan L.T.D is a multi-disciplinary technology firm dedicated to revolutionizing modern day technology for the development of society.',
  keywords: ['Stalan', 'technology', 'RCD', 'SC-Static', 'drone', 'smart home', 'Nigeria', 'engineering'],
  icons: {
    icon: [
      {
        url: '/logo_square_512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        url: '/logo_32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    apple: '/logo_square_512.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Stalan L.T.D',
    title: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
    description: 'Multi-disciplinary technology firm building next-generation safe infrastructure.',
    url: 'https://stalan.ltd',
    images: [
      {
        url: 'https://stalan.ltd/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://stalan.ltd/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-right" richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
