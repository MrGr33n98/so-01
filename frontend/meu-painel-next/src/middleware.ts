import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('auth_token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}