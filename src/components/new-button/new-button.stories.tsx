import type { Meta, StoryObj } from '@storybook/react-vite'
import { NewButton } from './new-button'

const meta: Meta<typeof NewButton> = {
  title: 'Components/NewButton',
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

export const Small: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'sm',
    disabled: false,
  },
}

export const Large: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'lg',
    disabled: false,
  },
}

export const ExtraSmall: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'xs',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    disabled: true,
  },
}

export const CustomLabel: Story = {
  args: {
    label: 'Add new project',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    disabled: false,
  },
}

export const CustomTitle: Story = {
  args: {
    label: 'Create new item',
    title: 'Create',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    disabled: false,
  },
}

export const VariantSecondary: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    variant: 'secondary',
    disabled: false,
  },
}

export const VariantOutline: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    variant: 'outline',
    disabled: false,
  },
}

export const VariantGhost: Story = {
  args: {
    label: 'Create new item',
    onClick: () => console.log('New button clicked'),
    size: 'default',
    variant: 'ghost',
    disabled: false,
  },
}
