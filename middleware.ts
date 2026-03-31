import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Define what paths are admin-related
  const isAdminPage = path.startsWith('/admin')
  // Define the login page specifically
  const isLoginPage = path === '/admin/login'

  // Get the token from cookies
  const adminToken = request.cookies.get('ADMIN_SECRET')?.value

  // Logic: If trying to access any admin page (except login) without a token, redirect
  if (isAdminPage && !isLoginPage && !adminToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Logic: If already logged in and trying to go to login page, send to dashboard
  if (isLoginPage && adminToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

// Only run this middleware on admin routes
export const config = {
  matcher: ['/admin/:path*'],
}