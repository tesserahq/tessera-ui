import * as cookie from 'cookie'
import { getHints } from '../react-router/hints'
import { THEME_COOKIE_KEY, getThemeFromCookie } from '../react-router/theme'
import type { Theme, ThemeExtended } from '../react-router/types'

export { THEME_COOKIE_KEY, parseThemeFormData } from '../react-router/theme'

/**
 * Returns the theme saved in the request's Cookie, or null if there is none
 * (so callers fall back to the client hint theme).
 */
export function getTheme(request: Request): Theme | null {
  return getThemeFromCookie(request.headers.get('Cookie') ?? '')
}

/**
 * Resolves the theme to render straight from the request (saved theme, else
 * client hint theme), without the root loader. Pass it to
 * `RequestThemeProvider` in `entry.server.tsx` so the root ErrorBoundary
 * renders the right theme even when the root loader did not run.
 */
export function getRequestTheme(request: Request): Theme {
  return getTheme(request) ?? getHints(request).theme
}

/**
 * Returns a `Set-Cookie` header value that saves the given theme.
 * `'system'` clears the Cookie so the client hint theme is used.
 */
export function setTheme(theme: ThemeExtended): string {
  if (theme === 'system') {
    return cookie.serialize(THEME_COOKIE_KEY, '', { path: '/', maxAge: -1, sameSite: 'lax' })
  }

  return cookie.serialize(THEME_COOKIE_KEY, theme, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
}
