import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Match exactly /proposals/[slug] — not unlock or any sub-path
  const match = pathname.match(/^\/proposals\/([^/]+)$/)
  if (match) {
    const slug = match[1]
    const cookie = req.cookies.get(`proposal_auth_${slug}`)
    if (!cookie?.value) {
      return NextResponse.redirect(new URL(`/proposals/${slug}/unlock`, req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/proposals/:path*',
}
