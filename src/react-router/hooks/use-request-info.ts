import { useRouteLoaderData } from 'react-router'
import type { RequestInfo } from '../types'

type RootLoaderData = { requestInfo?: RequestInfo }

/**
 * Returns the request info from the root loader, or undefined when the root
 * loader did not run (unmatched URLs, root loader failures). Use this in the
 * root ErrorBoundary.
 */
export function useOptionalRequestInfo(): RequestInfo | undefined {
  const data = useRouteLoaderData('root') as RootLoaderData | undefined
  return data?.requestInfo
}

/**
 * Returns the request info from the root loader. Throws when it is missing,
 * so only use it in routes rendered below a root loader that ran.
 */
export function useRequestInfo(): RequestInfo {
  const requestInfo = useOptionalRequestInfo()
  if (!requestInfo) {
    throw new Error(
      'No request info found in Root loader. Return `requestInfo: getRequestInfo(request)` ' +
        'from the root loader, and use `useOptionalRequestInfo` in the root ErrorBoundary.'
    )
  }

  return requestInfo
}
