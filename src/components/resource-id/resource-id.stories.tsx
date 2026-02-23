import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResourceId } from './resource-id'

const meta: Meta<typeof ResourceId> = {
  title: 'Components/ResourceId',
  component: ResourceId,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '6f6b4b0a-5c6c-4d9b-bbe1-9d7d5a8d2fd1',
  },
}

export const AlwaysShowCopy: Story = {
  args: {
    value: '6f6b4b0a-5c6c-4d9b-bbe1-9d7d5a8d2fd1',
    showCopyOnHover: false,
  },
}
