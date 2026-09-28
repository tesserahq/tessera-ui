import type { ReactElement } from 'react'
import type { ErrorResponse } from 'react-router'
import { isRouteErrorResponse, useParams, useRouteError } from 'react-router'
import { NotFound } from '../../components/not-found'

export type StatusHandler = (info: {
  error: ErrorResponse
  params: Record<string, string | undefined>
}) => ReactElement | null

export interface GenericErrorBoundaryProps {
  /** Rendered for error responses without a matching `statusHandlers` entry. */
  defaultStatusHandler?: StatusHandler
  /** Per-status overrides, merged over the defaults (404 → `NotFound`). */
  statusHandlers?: Record<number, StatusHandler>
  /** Rendered for thrown errors that are not route error responses. */
  unexpectedErrorHandler?: (error: unknown) => ReactElement | null
}

const defaultStatusHandlers: Record<number, StatusHandler> = {
  404: () => <NotFound />,
}

/**
 * Renders the error thrown by a route's loader/action/component. Usable as a
 * root `ErrorBoundary`: it does not read any loader data.
 */
export function GenericErrorBoundary({
  statusHandlers,
  defaultStatusHandler = ({ error }) => (
    <ErrorMessage
      title={`${error.status} ${error.statusText}`.trim()}
      description={getErrorResponseMessage(error)}
    />
  ),
  unexpectedErrorHandler = (error) => (
    <ErrorMessage
      title="Something went wrong"
      description={
        import.meta.env.DEV
          ? getErrorMessage(error)
          : 'An unexpected error occurred. Please try again later.'
      }
    />
  ),
}: GenericErrorBoundaryProps) {
  const params = useParams()
  const error = useRouteError()

  if (typeof document !== 'undefined') {
    console.error(error)
  }

  const handlers = { ...defaultStatusHandlers, ...statusHandlers }

  return (
    <div
      className="dark:text-primary-foreground flex h-full w-full flex-col items-center
        justify-center">
      {isRouteErrorResponse(error)
        ? (handlers[error.status] ?? defaultStatusHandler)({ error, params })
        : unexpectedErrorHandler(error)}
    </div>
  )
}

function ErrorMessage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-6">
      <p className="text-primary text-2xl font-medium">{title}</p>
      {description && (
        <p className="text-primary/60 text-center text-lg font-normal">{description}</p>
      )}
    </div>
  )
}

// Error response bodies are either plain strings (`new Response('...')`) or
// JSON like `{ message: '...' }`.
function getErrorResponseMessage(error: ErrorResponse): string | undefined {
  const data: unknown = error.data
  if (typeof data === 'string') return data
  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message
  }
  return undefined
}

export function getErrorMessage(err: unknown) {
  if (typeof err === 'string') return err
  if (err && typeof err === 'object' && 'message' in err && typeof err.message === 'string') {
    return err.message
  }
  console.error('Unable to get error message for error:', err)
  return 'Unknown error'
}
