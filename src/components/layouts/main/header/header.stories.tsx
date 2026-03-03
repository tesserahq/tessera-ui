import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { Header } from './header'
import { TesseraProvider, type AppHostUrls } from '../../../../main'
import { Button } from '../../../ui/button'
import type React from 'react'
import HeaderDocs from './header.mdx'

const defaultAppHostUrls: AppHostUrls = {
  quore: 'https://quore.example.com',
  looply: 'https://looply.example.com',
  vaulta: 'https://vaulta.example.com',
  identies: 'https://identies.example.com',
  custos: 'https://custos.example.com',
  indexa: 'https://indexa.example.com',
  sendly: 'https://sendly.example.com',
  orcha: 'https://orcha.example.com',
  conversa: 'https://conversa.example.com',
}

const meta: Meta<typeof Header> = {
  title: 'Layouts/Header',
  component: Header,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: HeaderDocs,
    },
  },
  args: {
    title: 'Custos',
    selectedTheme: 'system',
    onSetTheme: () => {},
    actionLogout: () => {},
    actionProfile: () => {},
    defaultAvatar: '/images/logo.png',
    appHostUrls: defaultAppHostUrls,
    isStorybook: true,
  },
  argTypes: {
    title: { control: { type: 'text' } },
    selectedTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'system'],
    },
    contentLeft: { control: false },
    contentCenter: { control: false },
    contentRight: { control: false },
    onSetTheme: { action: 'onSetTheme' },
    actionLogout: { action: 'actionLogout' },
    actionProfile: { action: 'actionProfile' },
    avatarUrl: { action: { type: 'text' } },
    defaultAvatar: { control: { type: 'text' } },
    appHostUrls: { control: { type: 'object' } },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="h-full pt-[60px] bg-background text-foreground">
    {children}
    <main className="p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Page content</h2>
        <p className="text-sm text-muted-foreground">
          This is just filler content so you can see how the fixed header overlays the page.
        </p>
      </div>
    </main>
  </div>
)

export const Default: Story = {
  render: (args) => (
    <Page>
      <TesseraProvider identiesApiUrl="" token="">
        <Header {...args} />
      </TesseraProvider>
    </Page>
  ),
}

export const WithAction: Story = {
  args: {
    ...Default.args,
    contentRight: (
      <Button size="xs" variant="outline">
        Create
      </Button>
    ),
  },
  render: (args) => (
    <Page>
      <TesseraProvider identiesApiUrl="" token="">
        <Header {...args} />
      </TesseraProvider>
    </Page>
  ),
}
