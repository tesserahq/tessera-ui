import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/button'
import { ErrorDialog } from './error-dialog'
import { showErrorDialog } from './error-dialog-store'
import ErrorDialogDocs from './error-dialog.mdx'

const meta: Meta<typeof ErrorDialog> = {
  title: 'Information/ErrorDialog',
  component: ErrorDialog,
  parameters: {
    layout: 'centered',
    docs: {
      page: ErrorDialogDocs,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="destructive"
        onClick={() =>
          showErrorDialog({
            statusCode: 403,
            message: 'You do not have access to this resource.',
          })
        }>
        Trigger 403
      </Button>
      <ErrorDialog />
    </div>
  ),
}

export const WithCustomAction: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="destructive"
        onClick={() =>
          showErrorDialog({
            statusCode: 403,
            message: 'Your session no longer has admin privileges.',
          })
        }>
        Trigger 403
      </Button>
      <ErrorDialog
        renderAction={({ statusCode }) =>
          statusCode === 403 ? (
            <Button variant="outline" onClick={() => console.log('Navigate to /login')}>
              Log in again
            </Button>
          ) : null
        }
      />
    </div>
  ),
}

export const ServerError: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        variant="destructive"
        onClick={() =>
          showErrorDialog({
            statusCode: 500,
            message: 'Something went wrong while processing your request. Please try again.',
          })
        }>
        Trigger 500
      </Button>
      <ErrorDialog
        renderAction={({ statusCode }) =>
          statusCode === 500 ? (
            <Button onClick={() => console.log('Retry the failed request')}>Retry</Button>
          ) : null
        }
      />
    </div>
  ),
}
