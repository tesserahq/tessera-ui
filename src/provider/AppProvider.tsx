import React from 'react'
import type { ApiError, User, UserUpdate } from '../types/user'
import { useIdenties } from '../hooks/useIdenties'
import type { Application } from '../types/application'

export interface ITesseraUIContextProps {
  user: User | null
  isLoadingIdenties: boolean
  error: ApiError | null
  token: string | null
  applications: Application[]
  isLoadingApps: boolean
  // User actions
  updateUser: (userUpdate: UserUpdate) => Promise<void>
}

export const TesseraUIContext = React.createContext<ITesseraUIContextProps>({
  token: null,
  user: null,
  isLoadingIdenties: true,
  error: null,
  isLoadingApps: true,
  applications: [],
  updateUser: async () => {},
})

interface IProviderProps {
  children: React.ReactNode
  identiesApiUrl: string
  token: string
}

export function TesseraProvider({ children, token, identiesApiUrl }: IProviderProps) {
  const { user, loading, error, updateUser, isLoadingApps, applications } = useIdenties({
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
      isLoadingApps,
      applications,
    }),
    [user, token, loading]
  )

  return <TesseraUIContext.Provider value={contextPayload}>{children}</TesseraUIContext.Provider>
}

export const useApp = (): ITesseraUIContextProps => {
  const context = React.useContext(TesseraUIContext)

  if (!context) {
    throw new Error('useApp must be used within a TesseraProvider')
  }

  return context
}
