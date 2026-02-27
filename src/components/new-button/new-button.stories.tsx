import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewButton } from './new-button'

const meta: Meta<typeof NewButton> = {
  title: 'Shortcut/NewButton',
  component: NewButton,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    disabled: false,
  },
}
