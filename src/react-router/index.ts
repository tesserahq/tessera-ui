// React Router (framework mode / data router) helpers. These read route data
// (`useRouteLoaderData`, `useRouteError`, `useFetcher`), so they do not work
// under a plain `<BrowserRouter>`. See ./README.md for the root loader contract.
export { ClientHintCheck } from './components/client-hint-check'
export { GenericErrorBoundary, getErrorMessage } from './components/generic-error-boundary'
export type { GenericErrorBoundaryProps, StatusHandler } from './components/generic-error-boundary'
export { getHints, hintsUtils } from './hints'
export { useHints } from './hooks/use-hints'
export { NonceContext, NonceProvider, useNonce } from './hooks/use-nonce'
export { useOptionalRequestInfo, useRequestInfo } from './hooks/use-request-info'
export {
  RequestThemeProvider,
  useOptimisticThemeMode,
  useOptionalTheme,
  useTheme,
} from './hooks/use-theme'
export { THEME_FETCHER_KEY } from './theme'
export type { ClientHints, RequestInfo, Theme, ThemeExtended } from './types'
