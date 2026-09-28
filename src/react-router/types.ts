import type { getHints } from './hints'

export type Theme = 'light' | 'dark'
export type ThemeExtended = Theme | 'system'

export type ClientHints = ReturnType<typeof getHints>

/**
 * Shape of `requestInfo` returned by the root loader. Build it with
 * `getRequestInfo(request)` from `tessera-ui/server` so it always matches
 * what the hooks in this module read.
 */
export interface RequestInfo {
  hints: ClientHints
  origin: string | null
  path: string
  userPrefs: { theme: Theme | null }
}
