import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

// Custom component to wrap the protected route group for spesific page
export function AuthGuard({ children, fallback = null }: AuthGuardProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isAuthenticated, isLoading, loginWithRedirect])

  if (isLoading || !isAuthenticated) return <>{fallback}</>

  return <>{children}</>
}
