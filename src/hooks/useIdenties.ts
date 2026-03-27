import { useState, useEffect, useCallback } from 'react'
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
  const { token, ...clientConfig } = config

  // Create client instance
  const client = createIdentiesClient({ ...clientConfig, token })

  // State
  const [user, setUser] = useState<User | null>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isLoadingApps, setisLoadingApps] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  // Fetch user function
  const fetchUser = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const userData = await client.getCurrentUser()
      setUser(userData)
    } catch (err) {
      setError(err as ApiError)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [client, token])

  const fetchApplications = useCallback(async () => {
    setisLoadingApps(true)
    setError(null)

    try {
      const application = await client.getApplications()
      setApplications(application.items)
    } catch (err) {
      setError(err as ApiError)
      setApplications([])
    } finally {
      setisLoadingApps(false)
    }
  }, [client, token])

  // Update user function
  const updateUser = useCallback(
    async (userUpdate: UserUpdate) => {
      setError(null)

      try {
        const updatedUser = await client.updateUser(userUpdate)
        setUser(updatedUser)
      } catch (err) {
        setError(err as ApiError)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [client, token]
  )

  useEffect(() => {
    if (token) {
      fetchUser()
      fetchApplications()
    } else {
      setLoading(false)
    }
  }, [token])

  return {
    user,
    loading,
    fetchUser,
    error,
    updateUser,
    isLoadingApps,
    applications,
  }
}
