import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/navigation'
import CursorGlow from '@/components/cursor-glow'
import Footer from '@/components/footer'
import Intro from '@/components/intro'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const SITE_URL = 'https://yendigital.co'
const SITE_NAME = 'Yên Digital Company'
const DEFAULT_DESCRIPTION = 'Cinematic video production, photography, and web management based in Seattle, WA. Nightlife, events, automotive, and brand content crafted with calm precision.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Multimedia Production & Web Management`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['video production Seattle', 'nightlife photography Seattle', 'event videographer Seattle', 'multimedia production', 'web management', 'brand photography', 'cinematic video'],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Multimedia Production & Web Management`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/images/about-portrait.jpg', width: 1200, height: 630, alt: `${SITE_NAME} — Multimedia Production` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Multimedia Production & Web Management`,
    description: DEFAULT_DESCRIPTION,
    images: ['/images/about-portrait.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  address: { '@type': 'PostalAddress', addressLocality: 'Seattle', addressRegion: 'WA', addressCountry: 'US' },
  sameAs: ['https://www.instagram.com/livydoesmedia'],
  serviceArea: { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 47.6062, longitude: -122.3321 }, geoRadius: '50000' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Production' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photography' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web Management' } },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","x2wa0jlqjy");`,
          }}
        />
      </head>
      <body>
        <CursorGlow />
        <div id="grain" />
        <Intro />
        <Navigation />
        <main id="app">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
