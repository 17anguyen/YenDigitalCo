/* ============================================================
   Video source helper

   Videos live in a Cloudflare R2 bucket. They must be served
   from the bucket's PUBLIC URL (the "pub-…r2.dev" development
   URL or a custom public domain), NOT from the S3 API endpoint
   ("…r2.cloudflarestorage.com"). The S3 API endpoint requires
   signed AWS authentication and returns an "Authorization" error
   to browsers, so videos pointed at it never load.

   `videoUrl()` builds a full URL from a root-relative path and
   guards against an R2 base that was accidentally set to the
   private S3 API endpoint.
   ============================================================ */

// Public R2 bucket URL. Override with NEXT_PUBLIC_VIDEO_BASE, but
// only if that override is a public URL — never the S3 API endpoint.
const PUBLIC_FALLBACK = 'https://pub-28a37ca9f30345e7a8a22f258f719aa3.r2.dev'

function resolveBase(): string {
  const configured = process.env.NEXT_PUBLIC_VIDEO_BASE?.trim()
  // The R2 S3 API endpoint is not publicly accessible — ignore it.
  if (!configured || configured.includes('r2.cloudflarestorage.com')) {
    return PUBLIC_FALLBACK
  }
  return configured
}

export function videoUrl(p: string): string {
  const base = resolveBase()
  return base.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p)
}
