import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Supported locales
const locales = ['en', 'zh', 'zh-Hant', 'es', 'ar', 'pt', 'ru', 'fr', 'de'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore internal paths, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|txt|json|map|css|js|woff|woff2)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if path already starts with a supported locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const url = request.nextUrl.clone();
    // Redirect to default locale
    url.pathname = `/${defaultLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring _next, api, and static files references by extension
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};


