import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RouterProvider, createMemoryRouter } from 'react-router'
import { GenericErrorBoundary } from './generic-error-boundary'

// Renders GenericErrorBoundary as the ErrorBoundary of a route whose loader
// throws `createError()`, the same way a real data router would.
function ErrorRoute({ createError }: { createError: () => unknown }) {
  const [router] = useState(() =>
    createMemoryRouter([
      {
        path: '/',
        loader: () => {
          throw createError()
        },
        Component: () => null,
        ErrorBoundary: GenericErrorBoundary,
      },
    ])
  )

  return <RouterProvider router={router} />
}

const meta: Meta<typeof GenericErrorBoundary> = {
  title: 'React Router/GenericErrorBoundary',
  component: GenericErrorBoundary,
}

export default meta

type Story = StoryObj<typeof meta>

export const NotFound: Story = {
  render: () => (
    <ErrorRoute
      createError={() => new Response('Not found', { status: 404, statusText: 'Not Found' })}
    />
  ),
}

export const Forbidden: Story = {
  render: () => (
    <ErrorRoute
      createError={() =>
        Response.json(
          { message: 'You are not allowed to access this page.' },
          { status: 403, statusText: 'Forbidden' }
        )
      }
    />
  ),
}

export const ServerError: Story = {
  render: () => (
    <ErrorRoute
      createError={() =>
        new Response('Something broke on our side.', {
          status: 500,
          statusText: 'Internal Server Error',
        })
      }
    />
  ),
}

export const UnexpectedError: Story = {
  render: () => <ErrorRoute createError={() => new Error('Cannot read properties of undefined')} />,
}
