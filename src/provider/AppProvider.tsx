import React, { useEffect } from 'react'
import type { ApiError, User, UserUpdate } from '../types/user'
import { useIdenties } from '../hooks/useIdenties'

export interface ICoreUIContextProps {
  user: User | null
  loadingRequest: boolean
  error: ApiError | null
  token: string | null

  // User actions
  updateUser: (userUpdate: UserUpdate) => Promise<void>
}

const CoreUIContext = React.createContext<ICoreUIContextProps>({
  token: null,
  user: null,
  loadingRequest: true,
  error: null,
  updateUser: async () => {},
})

interface IProviderProps {
  children: React.ReactNode
  isAuthenticated: boolean
  callbacktUnauthorized: () => void
  identiesApiUrl: string
  token: string
}

export function CoreUIProvider({
  children,
  isAuthenticated,
  callbacktUnauthorized,
  token,
  identiesApiUrl,
}: IProviderProps) {
  useEffect(() => {
    if (!isAuthenticated) {
      callbacktUnauthorized()
      return
    }
  }, [isAuthenticated])

  const { user, loading, error, updateUser } = useIdenties({
    identiesApiUrl: identiesApiUrl,
    token: token,
  })

  const contextPayload = React.useMemo(
    () => ({
      token,
      user,
      loadingRequest: loading,
      error,
      updateUser,
    }),
    [user, token]
  )

  return <CoreUIContext.Provider value={contextPayload}>{children}</CoreUIContext.Provider>
}

export const useCoreUI = (): ICoreUIContextProps => {
  const context = React.useContext(CoreUIContext)

  if (!context) {
    throw new Error('useCoreUI must be used within an IdentiesProvider')
  }

  return context
}
