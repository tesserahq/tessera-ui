import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateTime } from './date-time'
import DatetimeDocs from './date-time.mdx'

const meta: Meta<typeof DateTime> = {
  title: 'Information/DateTime',
  component: DateTime,
  parameters: {
    layout: 'centered',
    docs: {
      page: DatetimeDocs,
    },
  },
  argTypes: {
    date: {
      control: { type: 'text' },
      description:
        'Date/time to display. Accepts a `Date` or an ISO string. Strings without a timezone suffix get a trailing `Z` (UTC).',
    },
    formatStr: {
      control: { type: 'text' },
      description: 'A `date-fns` format string.',
      table: { defaultValue: { summary: 'MMM dd, yyyy HH:mm:ss' } },
    },
    timezone: {
      control: { type: 'text' },
      description:
        'IANA timezone (e.g. `UTC`, `America/New_York`). Defaults to the browser timezone (fallback: `America/New_York`).',
    },
    showTimezone: {
      control: { type: 'boolean' },
      description: 'Append the timezone abbreviation to the rendered value.',
      table: { defaultValue: { summary: 'false' } },
    },
    tooltipSide: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
      table: { defaultValue: { summary: 'bottom' } },
    },
    tooltipAlign: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'start' } },
    },
    className: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const sampleDate = '2026-02-26T12:00:00Z'

export const Example: Story = {
  args: {
    date: sampleDate,
  },
}
