import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description: 'Photography portfolio by Yên Digital Company — nightlife, events, automotive, and brand shoots. High-craft stills from Seattle-based photographers.',
  alternates: { canonical: '/photos' },
  openGraph: {
    url: '/photos',
    title: 'Photo Gallery | Yên Digital Company',
    description: 'High-craft photography — nightlife, events, automotive, and brand campaigns. Seattle-based.',
    images: [{ url: '/images/kawaii-rave-texas-2026/_A7R2807.jpg', width: 1200, height: 900, alt: 'Yên Digital — Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/kawaii-rave-texas-2026/_A7R2807.jpg'],
  },
}

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
