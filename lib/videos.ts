
const PUBLIC_FALLBACK = 'https://pub-28a37ca9f30345e7a8a22f258f719aa3.r2.dev'

function resolveBase(): string {
  const configured = process.env.NEXT_PUBLIC_VIDEO_BASE?.trim()
  // The R2 S3 API endpoint is not publicly accessible
  if (!configured || configured.includes('r2.cloudflarestorage.com')) {
    return PUBLIC_FALLBACK
  }
  return configured
}

export function videoUrl(p: string): string {
  const base = resolveBase()
  return base.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
}
