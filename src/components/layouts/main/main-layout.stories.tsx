import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router'
import type React from 'react'
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Settings, Users, KeyRound } from 'lucide-react'
import { MainLayout } from './main-layout'
import { Header } from './header/header'
import { DetailLayout } from '../detail/detail.layout'
import type { MainItemProps } from '../types'
import type { DetailItemsProps, BreadcrumbItemData } from '../types'
import type { AppHostUrls } from '../../../main'

const AutoCollapseMainLayout = ({
  children,
  menuItems,
  customSidebar,
  collapseSidebar,
}: {
  children: React.ReactNode
  menuItems: MainItemProps[]
  collapseSidebar: boolean
  customSidebar?: React.ReactNode
}) => {
  return (
    <MainLayout
      menuItems={menuItems}
      collapseSidebar={collapseSidebar}
      customSidebar={customSidebar}>
      {children}
    </MainLayout>
  )
}

const meta: Meta<typeof MainLayout> = {
  title: 'Components/Layouts/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      description: 'Array of menu items to display in the sidebar navigation',
      control: { type: 'object' },
    },
    children: {
      description: 'Main content to display in the layout',
      control: { type: 'object' },
    },
    className: {
      description: 'Additional CSS classes for the layout container',
      control: { type: 'text' },
    },
    collapseSidebar: {
      description: 'Collapse main sidebar',
      control: { type: 'boolean' },
    },
    customSidebar: {
      description: 'Custom sidebar menu',
      control: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

// Mock menu items
const defaultMenuItems: MainItemProps[] = [
  {
    title: 'Roles',
    path: '/roles',
    icon: KeyRound,
    disabled: true,
  },
  {
    title: 'Users',
    path: '#',
    icon: Users,
    disabled: true,
  },
  {
    title: 'Settings',
    path: '#',
    icon: Settings,
    disabled: true,
  },
]

const defaultDetailMenuItems: DetailItemsProps[] = [
  {
    title: 'Roles',
    path: '/roles',
    icon: KeyRound,
    disabled: true,
  },
  {
    title: 'Users',
    path: '#',
    icon: Users,
    disabled: true,
  },
]

const defaultBreadcrumb: BreadcrumbItemData[] = [
  { label: 'Home', link: '#' },
  { label: 'Roles', link: '#' },
]

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

// Mock page components
const RolesListPage = () => (
  <div className="space-y-6 p-6">
    <div>
      <h2 className="text-2xl font-bold mb-2">Roles List - Sidebar Open</h2>
      <p className="text-muted-foreground mb-4">
        This page demonstrates MainLayout with the sidebar <strong>expanded/open</strong>. The
        sidebar is visible and shows full menu items.
      </p>
      <div
        className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800
          rounded-lg">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
          ✓ Sidebar is OPEN (expanded)
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
          Route: /roles (2 path segments) - Sidebar remains open
        </p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
        <h3 className="font-semibold">Administrator</h3>
        <p className="text-sm text-muted-foreground">Full system access</p>
        <p className="text-xs text-muted-foreground mt-2">Click to view details</p>
      </div>
      <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
        <h3 className="font-semibold">Editor</h3>
        <p className="text-sm text-muted-foreground">Content editing access</p>
        <p className="text-xs text-muted-foreground mt-2">Click to view details</p>
      </div>
    </div>
  </div>
)

const RoleDetailPage = () => (
  <div className="">
    <div>
      <h2 className="text-2xl font-bold mb-2">Role Detail - Sidebar Collapsed</h2>
      <p className="text-muted-foreground mb-4">
        This page demonstrates MainLayout with the sidebar <strong>collapsed</strong>. The sidebar
        automatically collapses when the route has more than 2 path segments.
      </p>
      <div
        className="p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200
          dark:border-orange-800 rounded-lg">
        <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
          ✓ Sidebar is COLLAPSED
        </p>
        <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
          Route: /roles/123/overview (4 path segments) - Sidebar automatically collapses
        </p>
      </div>
    </div>
    <div className="p-6 border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Role Information</h3>
      <div className="space-y-3">
        <div>
          <span className="text-sm text-muted-foreground">Role ID:</span>
          <p className="font-medium">123</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Role Name:</span>
          <p className="font-medium">Administrator</p>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Description:</span>
          <p className="font-medium">Full system access with all permissions</p>
        </div>
      </div>
    </div>
  </div>
)

const MockHeader = () => {
  return (
    <Header
      title="Custos"
      selectedTheme="system"
      onSetTheme={() => {}}
      actionLogout={() => {}}
      actionProfile={() => {}}
      defaultAvatar=""
      appHostUrls={defaultAppHostUrls}
      isStorybook
    />
  )
}

// Story with Routes demonstrating sidebar behavior
export const HomePage: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: '/roles' },
      routing: { path: '/roles' },
    }),
    docs: {
      description: {
        story:
          'Demonstrates sidebar behavior based on route depth. Navigate to /roles to see sidebar open, and /roles/:id/overview to see it collapsed.',
      },
    },
  },
  render: ({ collapseSidebar }) => (
    <MemoryRouter initialEntries={['/roles']}>
      <MockHeader />
      <AutoCollapseMainLayout menuItems={defaultMenuItems} collapseSidebar={collapseSidebar}>
        <Routes>
          <Route path="/roles" element={<RolesListPage />} />
          <Route path="/roles/:id/overview" element={<RoleDetailPage />} />
        </Routes>
      </AutoCollapseMainLayout>
    </MemoryRouter>
  ),
}

// Story showing MainLayout with DetailLayout inside
export const DetailPage: Story = {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: { pathParams: { id: '123' } },
      routing: { path: '/roles/:id' },
    }),
    docs: {
      description: {
        story:
          'Demonstrates MainLayout containing DetailLayout as children, with navigation between list and detail views.',
      },
    },
  },
  render: () => (
    <MemoryRouter initialEntries={['/roles']}>
      <MockHeader />
      <AutoCollapseMainLayout menuItems={defaultMenuItems} collapseSidebar={true}>
        <Routes>
          <Route
            path="/roles"
            element={
              <DetailLayout
                menuItems={defaultDetailMenuItems}
                breadcrumbs={defaultBreadcrumb}
                isLoading={false}>
                <div className="space-y-4 p-3">
                  <h1 className="text-2xl font-bold">Roles List</h1>
                  <p className="text-muted-foreground">
                    This demonstrates MainLayout containing DetailLayout as children.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Administrator</h3>
                      <p className="text-sm text-muted-foreground">Full system access</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-semibold">Editor</h3>
                      <p className="text-sm text-muted-foreground">Content editing access</p>
                    </div>
                  </div>
                </div>
              </DetailLayout>
            }
          />
          <Route
            path="/roles/:id/overview"
            element={
              <DetailLayout
                menuItems={defaultDetailMenuItems}
                breadcrumbs={[
                  { label: 'Home', link: '/' },
                  { label: 'Roles', link: '/roles' },
                  { label: 'Role Detail', link: '/roles/123/overview' },
                ]}
                isLoading={false}>
                <div className="space-y-4 p-3">
                  <h1 className="text-2xl font-bold">Role Detail</h1>
                  <p className="text-muted-foreground">
                    DetailLayout with nested breadcrumb navigation.
                  </p>
                  <div className="p-6 border rounded-lg bg-card">
                    <h3 className="text-lg font-semibold mb-4">Role Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Role ID:</span>
                        <p className="font-medium">123</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Role Name:</span>
                        <p className="font-medium">Administrator</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DetailLayout>
            }
          />
        </Routes>
      </AutoCollapseMainLayout>
    </MemoryRouter>
  ),
}
