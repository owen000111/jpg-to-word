import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
const locales = ['en', 'zh', 'zh-Hant', 'es', 'ar', 'pt', 'ru', 'fr', 'de'];

function getLocaleFromPath(pathname: string): string | null {
  const first = pathname.split('/')[1];
  return locales.includes(first) ? first : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public files and API
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|txt|json|map)$/)) {
    return NextResponse.next();
  }

  // If path already has a locale, continue
  const currentLocale = getLocaleFromPath(pathname);
  if (currentLocale) {
    return NextResponse.next();
  }

  // Redirect root and any non-localized paths to default locale (en)
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};


