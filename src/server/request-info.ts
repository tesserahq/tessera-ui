import { getHints } from '../react-router/hints'
import type { RequestInfo } from '../react-router/types'
import { getTheme } from './theme'

export function getDomainUrl(request: Request): string | null {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('Host')
  if (!host) return null

  const protocol = host.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

/**
 * Builds the `requestInfo` the root loader must return, e.g.
 * `return data({ ..., requestInfo: getRequestInfo(request) })`.
 */
export function getRequestInfo(request: Request): RequestInfo {
  return {
    hints: getHints(request),
    origin: getDomainUrl(request),
    path: new URL(request.url).pathname,
    userPrefs: { theme: getTheme(request) },
  }
}
