import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Video Gallery',
  description: 'Cinematic video work by Yên Digital Company — nightlife recaps, event coverage, automotive, and promotional content. Based in Seattle, WA.',
  alternates: { canonical: '/video' },
  openGraph: {
    url: '/video',
    title: 'Video Gallery | Yên Digital Company',
    description: 'Cinematic video production — nightlife, events, automotive, and promotional content from Seattle, WA.',
    images: [{ url: '/images/thumbs/senpai-squad.jpg', width: 1280, height: 720, alt: 'Yên Digital — Video Production' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/thumbs/senpai-squad.jpg'],
  },
}

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
