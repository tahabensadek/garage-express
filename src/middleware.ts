import { NextRequest, NextResponse } from 'next/server'

const locales = ['fr', 'en']
const defaultLocale = 'fr'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Detect locale from browser
  const locale = getLocale(request) || defaultLocale
  
  // Redirect to locale path
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

function getLocale(request: NextRequest): string | undefined {
  // Get from cookie first
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Get from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    if (acceptLanguage.includes('en')) return 'en'
    if (acceptLanguage.includes('fr')) return 'fr'
  }

  return defaultLocale
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, static files)
    '/((?!api|_next/static|_next/image|images|flakes|favicon|favicon.ico|logo.svg).*)',
  ],
}
