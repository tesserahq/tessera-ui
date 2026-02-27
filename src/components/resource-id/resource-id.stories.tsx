import type { Meta, StoryObj } from '@storybook/react-vite'

import { ResourceID } from './resource-id'

const meta: Meta<typeof ResourceID> = {
  title: 'Shortcut/ResourceID',
  component: ResourceID,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'Displays a resource identifier in a compact, monospaced “pill”.',
          '',
          '- Shows a truncated value by default (configurable via `truncate`).',
          '- Reveals the full value in a tooltip when `value` is set.',
          '- Provides an optional copy-to-clipboard button with feedback states.',
          '',
          'Import:',
          '',
          '```tsx',
          "import { ResourceID } from 'tessera-ui/components/resource-id'",
          '```',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        'The full identifier to display and copy. When empty/null, the copy action is disabled and the value tooltip is omitted.',
    },
    truncate: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'How many characters to display before truncating.',
      table: { defaultValue: { summary: '8' } },
    },
    showCopyOnHover: {
      control: 'boolean',
      description:
        'When true, the copy button is only shown on hover/focus. When false, it is always visible.',
      table: { defaultValue: { summary: 'true' } },
    },
    copyFeedbackDurationMs: {
      control: { type: 'number', min: 0, step: 100 },
      description:
        'How long (ms) to keep “Copied” / “Copy failed” feedback before returning to the idle state.',
      table: { defaultValue: { summary: '2000' } },
    },
    className: { control: false },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: '6f6b4b0a-5c6c-4d9b-bbe1-9d7d5a8d2fd1',
  },
}
