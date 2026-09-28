/**
 * Implementation based on github.com/epicweb-dev/epic-stack
 */
import { createContext, useContext } from 'react'
import { useFetcher } from 'react-router'
import { getHints } from '../hints'
import { THEME_FETCHER_KEY, getThemeFromCookie, isThemeExtended } from '../theme'
import type { Theme, ThemeExtended } from '../types'
import { useOptionalRequestInfo, useRequestInfo } from './use-request-info'

// Theme resolved from the request in `entry.server.tsx`
// (`getRequestTheme(request)`), for server renders without root loader data.
const RequestThemeContext = createContext<Theme | undefined>(undefined)
export const RequestThemeProvider = RequestThemeContext.Provider

// Theme to use when root loader data is missing: the request theme on the
// server, the same Cookies read from `document.cookie` in the browser, so both
// sides render the same theme.
function useFallbackTheme(): Theme | undefined {
  const requestTheme = useContext(RequestThemeContext)
  if (requestTheme) return requestTheme

  if (typeof document !== 'undefined') {
    return getThemeFromCookie(document.cookie) ?? getHints().theme
  }
  return undefined
}

/**
 * If the user is changing their theme preference, returns the value it's
 * being changed to.
 */
export function useOptimisticThemeMode(): ThemeExtended | undefined {
  const themeFetcher = useFetcher({ key: THEME_FETCHER_KEY })
  const theme = themeFetcher.formData?.get('theme')

  return isThemeExtended(theme) ? theme : undefined
}

/**
 * Returns the user's theme preference, or the client hint theme if the user
 * has not set one. Throws when root loader data is missing — use
 * `useOptionalTheme` in the root ErrorBoundary.
 */
export function useTheme(): Theme {
  const requestInfo = useRequestInfo()
  const optimisticMode = useOptimisticThemeMode()

  if (optimisticMode) {
    return optimisticMode === 'system' ? requestInfo.hints.theme : optimisticMode
  }
  return requestInfo.userPrefs.theme ?? requestInfo.hints.theme
}

/**
 * Like `useTheme`, but safe to call when root loader data is missing
 * (e.g. in the root ErrorBoundary). Then it reads the theme from
 * `RequestThemeProvider` on the server and from Cookies in the browser, and
 * only uses `fallback` when neither is available.
 */
export function useOptionalTheme(fallback: Theme = 'light'): Theme {
  const requestInfo = useOptionalRequestInfo()
  const optimisticMode = useOptimisticThemeMode()
  const fallbackTheme = useFallbackTheme() ?? fallback
  const hintTheme = requestInfo?.hints.theme ?? fallbackTheme

  if (optimisticMode) {
    return optimisticMode === 'system' ? hintTheme : optimisticMode
  }
  return requestInfo ? (requestInfo.userPrefs.theme ?? hintTheme) : fallbackTheme
}
