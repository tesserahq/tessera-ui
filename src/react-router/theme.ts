/**
 * Theme constants and validation shared by the server helpers
 * (`tessera-ui/server`) and the client hooks. Keep this file free of React
 * and cookie imports so both sides can use it.
 */
import type { Theme, ThemeExtended } from './types'

export const THEME_COOKIE_KEY = '_theme'

/**
 * Reads the saved theme from a Cookie string (a request `Cookie` header on the
 * server, `document.cookie` in the browser). Both sides must parse it the same
 * way, or the server and client render different themes.
 */
export function getThemeFromCookie(cookieString: string): Theme | null {
  const value = cookieString
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${THEME_COOKIE_KEY}=`))
    ?.slice(THEME_COOKIE_KEY.length + 1)

  return value === 'light' || value === 'dark' ? value : null
}

// `useFetcher` key the app's theme switcher must submit with, so
// `useOptimisticThemeMode` can read the pending value.
export const THEME_FETCHER_KEY = 'theme-fetcher'

export function isThemeExtended(value: unknown): value is ThemeExtended {
  return value === 'light' || value === 'dark' || value === 'system'
}

/**
 * Validates the theme form submitted to the app's update-theme action.
 * Throws a 400 Response for invalid input.
 */
export function parseThemeFormData(formData: FormData): {
  theme: ThemeExtended
  redirectTo?: string
} {
  const theme = formData.get('theme')
  const redirectTo = formData.get('redirectTo')

  if (!isThemeExtended(theme)) {
    throw new Response('Invalid theme', { status: 400 })
  }

  return {
    theme,
    redirectTo: typeof redirectTo === 'string' && redirectTo ? redirectTo : undefined,
  }
}
