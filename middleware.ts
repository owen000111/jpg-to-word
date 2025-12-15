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

  // Check if path starts with default locale using a simple regex or substring check
  // We want to redirect /en/foo -> /foo
  if (pathname.startsWith(`/${defaultLocale}/`) || pathname === `/${defaultLocale}`) {
    const url = request.nextUrl.clone();
    // Remove the default locale prefix
    const newPathname = pathname.replace(new RegExp(`^/${defaultLocale}`), '');
    url.pathname = newPathname === '' ? '/' : newPathname;
    return NextResponse.redirect(url);
  }

  // Check if path is missing locale, but only for non-default locales
  // If we are here, path does NOT start with /en
  // If path starts with /de, /fr etc, we are good.
  // If path has NO locale (e.g. /privacy), it implies default locale (en), so we do NOTHING.
  // just need to check if it matches other locales? No, we trust it's fine.

  // Actually, we usually want to ensure that if a user visits /de it works.
  // If user visits /privacy, it treats as en.
  // The only check needed is: Does it start with a supported NON-default locale?
  // If no, we assume it's default locale content.

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring _next, api, and static files references by extension
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};


