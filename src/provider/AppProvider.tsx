import React from 'react'
import type { ApiError, User, UserUpdate } from '../types/user'
import { useIdenties } from '../hooks/useIdenties'

export interface ICoreUIContextProps {
  user: User | null
  isLoadingIdenties: boolean
  error: ApiError | null
  token: string | null

  // User actions
  updateUser: (userUpdate: UserUpdate) => Promise<void>
}

const CoreUIContext = React.createContext<ICoreUIContextProps>({
  token: null,
  user: null,
  isLoadingIdenties: true,
  error: null,
  updateUser: async () => {},
})

interface IProviderProps {
  children: React.ReactNode
  identiesApiUrl: string
  token: string
}

export function TesseraProvider({ children, token, identiesApiUrl }: IProviderProps) {
  const { user, loading, error, updateUser } = useIdenties({
    identiesApiUrl: identiesApiUrl,
    token: token,
  })

  const contextPayload = React.useMemo(
    () => ({
      token,
      user,
      isLoadingIdenties: loading,
      error,
      updateUser,
    }),
    [user, token, loading]
  )

  return <CoreUIContext.Provider value={contextPayload}>{children}</CoreUIContext.Provider>
}

export const useApp = (): ICoreUIContextProps => {
  const context = React.useContext(CoreUIContext)

  if (!context) {
    throw new Error('useApp must be used within an IdentiesProvider')
  }

  return context
}
