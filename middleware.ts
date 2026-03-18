import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const password = process.env.STUDIO_PASSWORD
  if (!password) return NextResponse.next()

  const auth = request.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString()
      const pwd = decoded.substring(decoded.indexOf(':') + 1)
      if (pwd === password) {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Timotion Studio CMS"' },
  })
}

export const config = {
  matcher: '/studio/:path*',
}
