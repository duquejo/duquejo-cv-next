import { routing } from '@/i18n/routing';
import rateLimitMiddleware from '@/middleware/rate-limiter-middleware';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest): NextResponse<unknown> {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/v1')) {
    return rateLimitMiddleware(request);
  }

  return createMiddleware(routing)(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/api/v1/:path*',
    '/((?!api|_next|_vercel|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
