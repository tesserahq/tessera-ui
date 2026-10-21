import { useState, useEffect, useCallback, useMemo } from 'react'
import { createIdentiesClient, type IdentiesClientConfig } from '../api/client'
import type { User, UserUpdate, ApiError } from '../types/user'
import type { Application } from '../types/application'

export interface UseIdentiesConfig extends IdentiesClientConfig {
  autoFetchUser?: boolean
}

export interface UseIdentiesReturn {
  // User state
  user: User | null
  loading: boolean
  error: ApiError | null

  // User actions
  fetchUser: () => Promise<void>
  updateUser: (userUpdate: UserUpdate) => Promise<void>

  // Applications state
  applications: Application[]
  isLoadingApps: boolean
}

export function useIdenties(config: UseIdentiesConfig): UseIdentiesReturn {
  const { token, identiesApiUrl, timeout, headers } = config

  // Create client instance, recreated only when its config changes
  const client = useMemo(
    () => createIdentiesClient({ identiesApiUrl, token, timeout, headers }),
    [identiesApiUrl, token, timeout, headers]
  )

  // State
  const [user, setUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoadingApps, setisLoadingApps] = useState<boolean>(true)
  // Separate errors so one request can't clear the other's failure
  const [userError, setUserError] = useState<ApiError | null>(null)
  const [appsError, setAppsError] = useState<ApiError | null>(null)

  // Fetch user function
  const fetchUser = useCallback(async () => {
    setLoading(true)
    setUserError(null)

    try {
      const userData = await client.getCurrentUser()
      setUser(userData)
    } catch (err) {
      setUserError(err as ApiError)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [client])

  const fetchApplications = useCallback(async () => {
    setisLoadingApps(true)
    setAppsError(null)

    try {
      const application = await client.getApplications()
      setApplications(application.items)
    } catch (err) {
      setAppsError(err as ApiError)
      setApplications([])
    } finally {
      setisLoadingApps(false)
    }
  }, [client])

  // Update user function
  const updateUser = useCallback(
    async (userUpdate: UserUpdate) => {
      setUserError(null)

      try {
        const updatedUser = await client.updateUser(userUpdate)
        setUser(updatedUser)
      } catch (err) {
        setUserError(err as ApiError)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [client]
  )

  useEffect(() => {
    if (token) {
      fetchUser()
      fetchApplications()
    } else {
      setLoading(false)
    }
  }, [token, fetchUser, fetchApplications])

  return {
    user,
    loading,
    fetchUser,
    error: userError ?? appsError,
    updateUser,
    isLoadingApps,
    applications,
  }
}
