import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { Header } from './header'
import { TesseraProvider, type AppHostUrls } from '../../../../main'
import { Button } from '../../../ui/button'

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

const meta: Meta<typeof Header> = {
  title: 'Components/Layouts/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Main layout header containing the app switcher, logo/title link, optional action slot, and profile menu.',
      },
    },
  },
  argTypes: {
    title: { control: { type: 'text' } },
    selectedTheme: {
      control: { type: 'select' },
      options: ['light', 'dark', 'system'],
    },
    action: { control: false },
    onSetTheme: { action: 'onSetTheme' },
    actionLogout: { action: 'actionLogout' },
    actionProfile: { action: 'actionProfile' },
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
    action: (
      <Button size="xs" variant="outline">
        Create
      </Button>
    ),
  },
  render: (args) => (
    <Page>
      <Header {...args} />
    </Page>
  ),
}
