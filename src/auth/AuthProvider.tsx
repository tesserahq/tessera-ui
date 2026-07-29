import React from 'react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import type { AppState } from '@auth0/auth0-react'
import { TesseraProvider } from '../provider/AppProvider'
import { AppPreloader } from '../components/app-preloader/app-preloader'

export interface Auth0Config {
  domain: string
  clientId: string
  audience: string
  redirectUri?: string
  organizationID?: string
  prompt?: 'login' | 'consent' | 'select_account' | 'none'
  onRedirectCallback?: (appState?: AppState) => void
}

interface AuthProviderProps {
  children: React.ReactNode
  auth0: Auth0Config
  identiesApiUrl: string
  onUnauthenticated?: () => void
  requireAuth?: boolean
  loadingFallback?: React.ReactNode
}

interface BridgeProps {
  children: React.ReactNode
  identiesApiUrl: string
  audience: string
  onUnauthenticated?: () => void
  requireAuth: boolean
  loadingFallback: React.ReactNode
}

function TesseraAuth0Bridge({
  children,
  identiesApiUrl,
  audience,
  onUnauthenticated,
  requireAuth,
  loadingFallback,
}: BridgeProps) {
  const { isAuthenticated, isLoading, getAccessTokenSilently, loginWithRedirect } = useAuth0()
  const [token, setToken] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) {
      if (onUnauthenticated) {
        onUnauthenticated() // Custom redirect
      } else if (requireAuth) {
        loginWithRedirect() // Auto redirect to login page from auth0
      }
      return
    }
    getAccessTokenSilently({ authorizationParams: { audience } })
      .then(setToken) // get shared token
      .catch(() => {
        if (requireAuth) {
          loginWithRedirect()
        }
      })
  }, [isAuthenticated, isLoading, audience, requireAuth, getAccessTokenSilently, loginWithRedirect])

  // Display loading when waiting app getting token
  if (isLoading) return <>{loadingFallback || <AppPreloader className="h-screen" />}</>

  // Handle public page which don't need token
  if (!token) return requireAuth ? null : <>{children}</>

  return (
    <TesseraProvider token={token} identiesApiUrl={identiesApiUrl}>
      {children}
    </TesseraProvider>
  )
}

export function AuthProvider({
  children,
  auth0,
  identiesApiUrl,
  onUnauthenticated,
  requireAuth = true,
  loadingFallback = null,
}: AuthProviderProps) {
  const { domain, clientId, audience, redirectUri, prompt, onRedirectCallback, organizationID } =
    auth0

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: redirectUri ?? window.location.origin,
        audience,
        organization: organizationID,
        ...(prompt && { prompt }),
      }}>
      <TesseraAuth0Bridge
        identiesApiUrl={identiesApiUrl}
        audience={audience}
        requireAuth={requireAuth}
        loadingFallback={loadingFallback}
        onUnauthenticated={onUnauthenticated}>
        {children}
      </TesseraAuth0Bridge>
    </Auth0Provider>
  )
}
