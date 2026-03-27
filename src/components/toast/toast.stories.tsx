import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../ui/button'
import { Toaster, toast } from './toast'
import ToastDocs from './toast.mdx'

const meta: Meta<typeof Toaster> = {
  title: 'Information/Toast',
  component: Toaster,
  parameters: {
    layout: 'centered',
    docs: {
      page: ToastDocs,
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Where toasts appear on the screen.',
      table: { defaultValue: { summary: "'bottom-right'" } },
    },
    expand: {
      control: 'boolean',
      description: 'Expand toasts by default when multiple are visible.',
      table: { defaultValue: { summary: 'false' } },
    },
    closeButton: {
      control: 'boolean',
      description: 'Show a close button on each toast.',
      table: { defaultValue: { summary: 'true' } },
    },
    duration: {
      control: { type: 'number', min: 0 },
      description: 'Default duration in ms before auto-dismiss (Infinity = no auto-dismiss).',
      table: { defaultValue: { summary: 'Infinity' } },
    },
    richColors: {
      control: 'boolean',
      description: 'Use distinct colors for success/error/info.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
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

// const toast = new Proxy(sonnerToast, {
//   apply(target, thisArg, argArray: Parameters<typeof sonnerToast>) {
//     return Reflect.apply(target, thisArg, argArray)
//   },
//   get(target, prop, receiver) {
//     if (prop === 'success') {
//       return (
//         message: Parameters<typeof sonnerToast.success>[0],
//         options?: Parameters<typeof sonnerToast.success>[1]
//       ) =>
//         target.success(message, {
//           ...options,
//           duration: options?.duration ?? SUCCESS_AUTO_CLOSE_MS,
//         })
//     }
//     return Reflect.get(target, prop, receiver)
//   },
// }) as typeof sonnerToast
