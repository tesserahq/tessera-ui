import type { Meta, StoryObj } from '@storybook/react-vite'

import { BarChart3, FileText, Home, Settings, User } from 'lucide-react'
import { withRouter } from 'storybook-addon-remix-react-router'
import type { BreadcrumbItemData, DetailItemsProps } from '../types'
import { DetailLayout } from './detail.layout'

const meta: Meta<typeof DetailLayout> = {
  title: 'Components/Layouts/DetailLayout',
  component: DetailLayout,
  parameters: {
    docs: {
      description: {
        component: `
DetailLayout provides a full-page layout with a fixed sidebar, breadcrumb header, and main content area. Use it for detail pages, dashboards, or any screen that needs structured navigation.

## Features
- **DetailHeader** – Breadcrumb navigation at the top
- **DetailSidenav** – Fixed left sidebar with menu items (supports nested items and dividers)
- **DetailContent** – Main content area with spacing for the sidebar

## Usage
\`\`\`tsx
<DetailLayout
  menuItems={menuItems}
  breadcrumb={breadcrumb}
>
  <YourPageContent />
</DetailLayout>
\`\`\`
        `,
      },
    },
  },
  decorators: [withRouter],
  tags: ['autodocs'],
  argTypes: {
    menuItems: {
      description: 'Sidebar menu items. Can include nested children and optional divider.',
      control: { type: 'object' },
    },
    breadcrumb: {
      description: 'Breadcrumb items shown in the header (label + link).',
      control: { type: 'object' },
    },
    children: {
      description: 'Main content rendered inside DetailContent.',
      control: { type: 'object' },
    },
    className: {
      description: 'Optional class for the layout container.',
      control: { type: 'text' },
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

const defaultMenuItems: DetailItemsProps[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    title: 'Documents',
    path: '/dashboard/documents',
    icon: FileText,
    children: [
      {
        title: 'All Documents',
        path: '/dashboard/documents',
        icon: FileText,
      },
      {
        title: 'Recent',
        path: '/dashboard/documents/recent',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
    divider: true,
  },
  {
    title: 'Profile',
    path: '/dashboard/profile',
    icon: User,
  },
]

const defaultBreadcrumb: BreadcrumbItemData[] = [
  { label: 'Home', link: '/' },
  { label: 'Dashboard', link: '/dashboard' },
]

export const DefaultDetailLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default DetailLayout with sidebar menu, breadcrumb, and dashboard-style content.',
      },
    },
  },
  args: {
    menuItems: defaultMenuItems,
    breadcrumb: defaultBreadcrumb,
    children: (
      <div className="space-y-4 p-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. This is the main content area.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">$45,678</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Orders</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>
      </div>
    ),
  },
}
