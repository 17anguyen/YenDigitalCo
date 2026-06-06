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

export const metadata: Metadata = {
  title: 'Yên Digital Company — Multimedia Production & Web Management',
  description: 'Cinematic video, photography, and web management. Serenity · Fortitude · Perseverance · Grace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
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
