import type { Meta, StoryObj } from '@storybook/react-vite'
import { KeyRound, Settings, Users } from 'lucide-react'
import { MemoryRouter } from 'react-router-dom'
import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router'

import { SidebarProvider } from '../../../ui/sidebar'
import type { MainItemProps } from '../../types'
import { SidebarPanel } from './sidebar-panel'
import SidebarDocs from './sidebar.mdx'

const meta: Meta<typeof SidebarPanel> = {
  title: 'Layouts/Sidebar',
  component: SidebarPanel,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: SidebarDocs,
    },
  },
  argTypes: {
    menuItems: {
      description: 'Array of sidebar menu items.',
      control: { type: 'object' },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultMenuItems: MainItemProps[] = [
  { title: 'Roles', path: '/roles', icon: KeyRound, disabled: true },
  { title: 'Users', path: '/users', icon: Users, disabled: true, divider: true },
  { title: 'Settings', path: '/settings', icon: Settings, disabled: true },
]

const Content = () => {
  return (
    <main className="p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Page content</h2>
        <p className="text-sm text-muted-foreground">
          This is just filler content so you can see how the sidebar implementation in the page.
        </p>
      </div>
    </main>
  )
}

// Story with Routes demonstrating sidebar behavior
export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: '/roles' },
      routing: { path: '/roles' },
    }),
    docs: {
      description: {
        story:
          'Shallow route example (`/roles`). The sidebar should render **expanded** (full width).',
      },
    },
  },
  render: ({ collapseSidebar }) => {
    return (
      <MemoryRouter initialEntries={['/roles']}>
        <SidebarProvider>
          <SidebarPanel
            menuItems={defaultMenuItems}
            className="mt-0"
            collapseSidebar={collapseSidebar}
          />
          <Content />
        </SidebarProvider>
      </MemoryRouter>
    )
  },
}

export const Collapsible: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: { pathParams: { id: '123' } },
      routing: { path: '/roles/:id/overview' },
    }),
    docs: {
      description: {
        story:
          'Deep route example (`/roles/123/overview`). The sidebar should auto-collapse to **icon** mode.',
      },
    },
  },
  render: ({ collapseSidebar }) => (
    <MemoryRouter initialEntries={['/roles/123/overview']}>
      <SidebarProvider>
        <SidebarPanel
          menuItems={defaultMenuItems}
          className="mt-0"
          collapseSidebar={collapseSidebar}
        />
        <Content />
      </SidebarProvider>
    </MemoryRouter>
  ),
}
