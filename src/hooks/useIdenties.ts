import { useState, useEffect, useCallback } from 'react'
import { createIdentiesClient, type IdentiesClientConfig } from '../api/client'
import type { User, UserUpdate, ApiError } from '../types/user'

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
}

export function useIdenties(config: UseIdentiesConfig): UseIdentiesReturn {
  const { token, ...clientConfig } = config

  // Create client instance
  const client = createIdentiesClient({ ...clientConfig, token })

  // State
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
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
    console.log('TEST')

    if (token) {
      fetchUser()
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
  }
}
