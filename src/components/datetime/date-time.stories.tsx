import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateTime } from './date-time'

const meta: Meta<typeof DateTime> = {
  title: 'Components/DateTime',
  component: DateTime,
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof meta>

// Sample dates for stories
const now = new Date()

export const Default: Story = {
  args: {
    date: now,
  },
}
