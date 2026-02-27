import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/button'
import { Toaster, toast } from './toast'

const meta: Meta<typeof Toaster> = {
  title: 'Information/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <Button onClick={() => toast('Saved successfully')} variant="default">
          Show Toast
        </Button>
        <Button onClick={() => toast.success('Changes applied')} variant="outline">
          Success
        </Button>
        <Button
          onClick={() =>
            toast.error('Something went wrong', {
              description: 'Please try again later.',
            })
          }
          variant="outline">
          Error
        </Button>
      </div>
      <Toaster {...args} />
    </div>
  ),
  args: {
    position: 'top-right',
  },
}
