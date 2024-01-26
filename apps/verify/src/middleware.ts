import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value;

  if (
    currentUser &&
    (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/authenticate'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    !currentUser &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/authenticate')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - about (about page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - $ (homepage)
     * - about (about page)
     */
    '/((?!api|dashboard|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
};
