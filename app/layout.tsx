import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Stalan L.T.D',
	url: 'https://stalanltd.com',
	logo: 'https://stalanltd.com/logo_square_512.png',
	image: 'https://stalanltd.com/og-image.png',
	description:
		'Stalan L.T.D is a multi-disciplinary technology firm dedicated to revolutionizing modern day technology for the development of society.',
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
	sameAs: ['https://wa.me/2349160655652'],
};

export const metadata: Metadata = {
	metadataBase: new URL('https://stalanltd.com'),
	title: {
		default: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
		template: '%s | Stalan L.T.D',
	},
	description:
		'Stalan L.T.D is a multi-disciplinary technology firm dedicated to revolutionizing modern day technology for the development of society.',
	keywords: [
		'Stalan',
		'technology',
		'RCD',
		'SC-Static',
		'drone',
		'smart home',
		'Nigeria',
		'engineering',
	],
	openGraph: {
		type: 'website',
		siteName: 'Stalan L.T.D',
		title: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
		description:
			'Multi-disciplinary technology firm building next-generation safe infrastructure.',
		url: 'https://stalanltd.com',
		images: [
			{
				url: 'https://stalanltd.com/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Stalan L.T.D — Revolutionizing Modern Day Technology',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		images: ['https://stalanltd.com/og-image.png'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='32x32'
					href='/favicon-32x32.png'
				/>
				<link
					rel='icon'
					type='image/png'
					sizes='16x16'
					href='/favicon-16x16.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body className='bg-[var(--color-background)] text-[var(--color-foreground)] antialiased'>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position='top-right' richColors />
					<Analytics />
				</ThemeProvider>
			</body>
		</html>
	);
}
