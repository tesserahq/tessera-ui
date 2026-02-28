import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewButton } from './new-button'
import NewButtonDocs from './new-button.mdx'

const meta: Meta<typeof NewButton> = {
  title: 'Shortcut/NewButton',
  component: NewButton,
  parameters: {
    layout: 'centered',
    docs: {
      page: NewButtonDocs,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Example: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    disabled: false,
  },
}
