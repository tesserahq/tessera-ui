import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppMenu } from './app-menu'
import type { AppHostUrls } from './app-menu'
import { withRouter } from 'storybook-addon-remix-react-router'

const CURRENT_APP_OPTIONS = [
  'quore',
  'looply',
  'vaulta',
  'identies',
  'custos',
  'indexa',
  'sendly',
  'orcha',
] as const

const meta: Meta<typeof AppMenu> = {
  title: 'Shortcut/AppMenu',
  component: AppMenu,
  parameters: {
    layout: 'centered',
  },
  decorators: [withRouter],
  argTypes: {
    currentApp: {
      control: { type: 'select' },
      options: CURRENT_APP_OPTIONS,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultAppHostUrls: AppHostUrls = {
  quore: 'https://quore.example.com',
  looply: 'https://looply.example.com',
  vaulta: 'https://vaulta.example.com',
  identies: 'https://identies.example.com',
  custos: 'https://custos.example.com',
  indexa: 'https://indexa.example.com',
  sendly: 'https://sendly.example.com',
  orcha: 'https://orcha.example.com',
}

export const Default: Story = {
  args: {
    currentApp: 'identies',
    appHostUrls: defaultAppHostUrls,
  },
}
