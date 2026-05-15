import React from 'react'
import { Auth0Context } from '@auth0/auth0-react'
import type { Auth0ContextInterface } from '@auth0/auth0-react'
import { TesseraUIContext } from '../provider/AppProvider'
import type { ITesseraUIContextProps } from '../provider/AppProvider'
import type { User } from '../types/user'

export const mockUser: User = {
  id: 'mock-user-id',
  email: 'demo@tessera.io',
  username: 'demo',
  first_name: 'Demo',
  last_name: 'User',
  verified: true,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
}

const mockAuth0Context = {
  isAuthenticated: true,
  isLoading: false,
  user: {
    email: mockUser.email,
    name: `${mockUser.first_name} ${mockUser.last_name}`,
    sub: 'auth0|mock-user-id',
  },
  loginWithRedirect: async () => {},
  logout: async () => {},
  getAccessTokenSilently: async () => 'mock-access-token',
  getIdTokenClaims: async () => undefined,
  handleRedirectCallback: async () => ({ appState: undefined }),
} as unknown as Auth0ContextInterface

const mockTesseraUIContext: ITesseraUIContextProps = {
  token: 'mock-access-token',
  user: mockUser,
  isLoadingIdenties: false,
  isLoadingApps: false,
  error: null,
  applications: [],
  updateUser: async () => {},
}

interface MockAuthProviderProps {
  children: React.ReactNode
  overrides?: Partial<ITesseraUIContextProps>
}

export function MockAuthProvider({ children, overrides }: MockAuthProviderProps) {
  return (
    <Auth0Context.Provider value={mockAuth0Context}>
      <TesseraUIContext.Provider value={{ ...mockTesseraUIContext, ...overrides }}>
        {children}
      </TesseraUIContext.Provider>
    </Auth0Context.Provider>
  )
}

export function withAuth(overrides?: Partial<ITesseraUIContextProps>) {
  // eslint-disable-next-line react/display-name
  return (Story: React.ComponentType) => (
    <MockAuthProvider overrides={overrides}>
      <Story />
    </MockAuthProvider>
  )
}
