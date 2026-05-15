import { useAuth0 } from '@auth0/auth0-react'

export interface AuthUser {
  email?: string
  name?: string
  picture?: string
  sub?: string
  [key: string]: unknown
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: AuthUser | undefined
  loginWithRedirect: () => void
  logout: (options?: { returnTo?: string }) => void
  getAccessToken: () => Promise<string>
}

export function useAuth(): AuthState {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout, getAccessTokenSilently } =
    useAuth0()

  return {
    isAuthenticated,
    isLoading,
    user,
    loginWithRedirect: () => loginWithRedirect(),
    logout: (options) =>
      logout({ logoutParams: { returnTo: options?.returnTo ?? window.location.origin } }),
    getAccessToken: () => getAccessTokenSilently(),
  }
}
