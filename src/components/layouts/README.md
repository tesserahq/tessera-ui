# Layout Components

This directory contains layout components for building consistent page structures with navigation, breadcrumbs, and content areas.

## Components

### `MainLayout`

A layout component with a collapsible sidebar navigation. The sidebar automatically collapses based on route depth - it stays open for routes with 2 or fewer path segments (e.g., `/roles`) and collapses for routes with more than 2 segments (e.g., `/roles/123/overview`).

**Props:**

- `menuItems` (required): Array of menu items for the sidebar navigation (`MainItemProps[]`)
- `header` (required): Header component to display at the top of the content area
- `children` (required): Main content to display in the layout
- `className` (optional): Additional CSS classes for the layout container

**Example:**

```tsx
import MainLayout from '@tessera-ui/components/layouts/main/main-layout'
import type { MainItemProps } from '@tessera-ui/components/layouts'
import { KeyRound, Users, Home, Settings } from 'lucide-react'

function App() {
  const menuItems: MainItemProps[] = [
    {
      title: 'Roles',
      path: '/roles',
      icon: KeyRound,
    },
    {
      title: 'Users',
      path: '/users',
      icon: Users,
    },
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: Home,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
      divider: true,
    },
  ]

  const header = (
    <header className="flex h-16 border-b items-center px-5">
      <h1>My Application</h1>
    </header>
  )

  return (
    <MainLayout header={header} menuItems={menuItems}>
      <Routes>
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/roles/:id/overview" element={<RoleDetailPage />} />
        {/* Sidebar auto-collapses on /roles/:id/overview */}
      </Routes>
    </MainLayout>
  )
}
```

**Sidebar Behavior:**

- **Open**: Routes with 2 or fewer path segments (e.g., `/roles`, `/users`)
- **Collapsed**: Routes with more than 2 path segments (e.g., `/roles/123/overview`)

The sidebar uses `collapsible="icon"` mode, showing icons when collapsed.

### `DetailLayout`

A comprehensive layout component featuring:

- Fixed sidebar navigation with menu items
- Breadcrumb navigation in the header
- Content area with proper spacing

**Props:**

- `menuItems` (required): Array of menu items for the sidebar navigation (`DetailItemsProps[]`)
- `breadcrumb` (required): Array of breadcrumb items for the header (`BreadcrumbItemData[]`)
- `children` (required): The main content to display
- `className` (optional): Additional CSS classes for the content wrapper

**Example:**

```tsx
import { DetailLayout } from '@tessera-ui/components/layouts/detail/detail.layout'
import type { DetailItemsProps, BreadcrumbItemData } from '@tessera-ui/components/layouts'
import { Home, Settings, User } from 'lucide-react'

function DashboardPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: 'Overview',
      path: '/dashboard',
      icon: Home,
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
      children: [
        {
          title: 'Edit Profile',
          path: '/dashboard/profile/edit',
          icon: User,
        },
      ],
    },
  ]

  const breadcrumb: BreadcrumbItemData[] = [
    { label: 'Home', link: '/' },
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Settings', link: '/dashboard/settings' },
  ]

  return (
    <DetailLayout menuItems={menuItems} breadcrumb={breadcrumb}>
      <div>
        <h1>Dashboard Settings</h1>
        <p>Your dashboard settings content goes here.</p>
      </div>
    </DetailLayout>
  )
}
```

**How it works:**

- The component automatically positions the header at `top-[60px]` (accounting for your main app header)
- The sidebar is fixed on the left with a width of `256px` (w-56)
- The content area automatically has left margin (`ml-56`) and top padding (`pt-[53px]`) to account for the sidebar and header
- Menu items are automatically highlighted based on the current route

### `DetailHeader`

A standalone header component with breadcrumb navigation. Useful when you need just the header without the full layout.

**Props:**

- `breadcrumb` (required): Array of breadcrumb items (`BreadcrumbItemData[]`)
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { DetailHeader } from '@tessera-ui/components/layouts/detail/detail-header'
import type { BreadcrumbItemData } from '@tessera-ui/components/layouts'

function CustomPage() {
  const breadcrumb: BreadcrumbItemData[] = [
    { label: 'Home', link: '/' },
    { label: 'Custom Page', link: '/custom' },
  ]

  return (
    <div>
      <DetailHeader breadcrumb={breadcrumb} />
      {/* Content must account for fixed header */}
      <div className="pt-[53px]">
        <h1>Custom Page Content</h1>
        <p>Your content here</p>
      </div>
    </div>
  )
}
```

**Important:** Since the header is fixed at `top-[60px]`, you need to add `pt-[53px]` padding-top to your content to prevent it from being hidden behind the header.

### `DetailSidenav`

A standalone sidebar navigation component. Use it when you need navigation without the breadcrumb header.

**Props:**

- `menuItems` (required): Array of menu items for navigation (`DetailItemsProps[]`)
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { DetailSidenav } from '@tessera-ui/components/layouts/detail/detail-sidenav'
import type { DetailItemsProps } from '@tessera-ui/components/layouts'
import { Home, Settings, User } from 'lucide-react'

function SidebarOnlyPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: 'Home',
      path: '/',
      icon: Home,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="flex">
      <DetailSidenav menuItems={menuItems} />
      {/* Content must account for fixed sidebar */}
      <div className="ml-56 flex-1 p-4">
        <h1>Page Content</h1>
        <p>Your content here</p>
      </div>
    </div>
  )
}
```

**Important:** Since the sidebar is fixed with `w-56` (256px) width, you need to add `ml-56` margin-left to your content to prevent it from being hidden behind the sidebar.

### `DetailContent`

A content wrapper component with proper spacing for use with the DetailLayout components. It automatically applies left margin for the sidebar and padding.

**Props:**

- `children` (required): Content to display
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { DetailContent } from '@tessera-ui/components/layouts/detail/detail-content'
import type { DetailItemsProps, BreadcrumbItemData } from '@tessera-ui/components/layouts'
import { Home, Settings } from 'lucide-react'

function CustomLayoutPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: 'Home',
      path: '/',
      icon: Home,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ]

  const breadcrumb: BreadcrumbItemData[] = [
    { label: 'Home', link: '/' },
    { label: 'Settings', link: '/settings' },
  ]

  return (
    <>
      <DetailHeader breadcrumb={breadcrumb} />
      <div className="flex items-start gap-3 h-full relative pt-[53px]">
        <DetailSidenav menuItems={menuItems} />
        <DetailContent>
          <h1>Custom Layout</h1>
          <p>Using components individually for custom layouts</p>
        </DetailContent>
      </div>
    </>
  )
}
```

**Note:** `DetailContent` automatically applies `ml-56` for the sidebar spacing and includes padding (`p-3`). If you're building a custom layout, you may need to adjust spacing based on your specific needs.

## Type Definitions

### `MainItemProps`

Menu item structure for MainLayout sidebar navigation:

```tsx
interface MainItemProps {
  title: string // Display text for the menu item
  path: string // Route path (e.g., "/roles")
  icon: LucideIcon // Icon component type (e.g., from lucide-react)
  children?: ItemProps[] // Optional nested menu items
  divider?: boolean // Optional divider after this item
  disabled?: boolean // Optional disabled state
}
```

### `DetailItemsProps`

Menu item structure for DetailLayout sidebar navigation:

```tsx
interface DetailItemsProps {
  title: string // Display text for the menu item
  path: string // Route path (e.g., "/dashboard")
  icon: LucideIcon // Icon component type (e.g., from lucide-react)
  children?: ItemProps[] // Optional nested menu items
  divider?: boolean // Optional divider after this item
  disabled?: boolean // Optional disabled state
}
```

### `BreadcrumbItemData`

Breadcrumb item structure:

```tsx
interface BreadcrumbItemData {
  label: string // Display text for the breadcrumb
  link: string // Route path for navigation
  disabled?: boolean // Optional disabled state (prevents navigation)
}
```

### `ItemProps`

Nested menu item structure (used in children arrays):

```tsx
interface ItemProps {
  title: string // Display text
  path: string // Route path
  icon: LucideIcon // Icon component type
  disabled?: boolean // Optional disabled state
}
```

### `SidebarPanelProps`

Wrapper for MainLayout sidebar menu items:

```tsx
interface SidebarPanelProps {
  menuItems: MainItemProps[]
}
```

### `SidebarItemsProps`

Wrapper for DetailLayout sidebar menu items:

```tsx
interface SidebarItemsProps {
  menuItems: DetailItemsProps[]
}
```

## Features

### Active Menu Highlighting

Menu items in both `MainLayout` and `DetailLayout` are automatically highlighted when their path matches the current route. The components use `useLocation()` from `react-router` to detect the active route. Parent menu items are also highlighted when any of their children are active.

### Automatic Sidebar Collapse (MainLayout)

The `MainLayout` sidebar automatically collapses based on route depth:

- **Open**: Routes with 2 or fewer path segments (e.g., `/roles`, `/users`)
- **Collapsed**: Routes with more than 2 path segments (e.g., `/roles/123/overview`)

This provides more screen space for detail views while keeping navigation accessible.

### Breadcrumb Navigation

- The last item in the breadcrumb array is displayed as the current page (non-clickable)
- All previous items are clickable links
- Breadcrumb labels are automatically capitalized (unless they contain `@`)
- Supports disabled state to prevent navigation
- Works in both `DetailLayout` and standalone `DetailHeader`

### Nested Menu Support

Both `DetailLayoutSidenav` and `MainLayout` support nested menu items with accordion-style expansion. Parent items with children automatically expand when a child route is active.

### Disabled State

Menu items and breadcrumb items support a `disabled` prop that:

- Prevents navigation (links to `#` when disabled)
- Applies disabled styling
- Works for both parent and child menu items

### Responsive Design

- **MainLayout**: Collapsible sidebar with icon mode when collapsed
- **DetailLayout**: Fixed sidebar (256px width) - `DetailSidenav`
- **DetailHeader**: Fixed header with breadcrumb positioned at `top-[60px]`
- **DetailContent**: Content area automatically adjusts for sidebar and header spacing
- All components can be used together or individually for custom layouts

### Dark Mode Support

All layout components support dark mode through Tailwind CSS dark mode classes.

## Styling

The layout components use Tailwind CSS classes and support:

- Custom `className` prop on `MainLayout` container
- Custom `className` prop on `DetailLayout` content wrapper
- Custom `className` prop on `DetailHeader`
- Custom `className` prop on `DetailSidenav`
- Custom `className` prop on `DetailContent`
- Consistent spacing and styling across components

## Requirements

- `react-router` (v6+) - Required for navigation
- `react-router-dom` (v6+) - Required for Link components
- Tailwind CSS - Required for styling
- `lucide-react` - Required for icon types

## Examples

### MainLayout with Routes

```tsx
import MainLayout from '@tessera-ui/components/layouts/main/main-layout'
import type { MainItemProps } from '@tessera-ui/components/layouts'
import { Routes, Route } from 'react-router-dom'
import { KeyRound, Users } from 'lucide-react'

function App() {
  const menuItems: MainItemProps[] = [
    {
      title: 'Roles',
      path: '/roles',
      icon: KeyRound,
    },
    {
      title: 'Users',
      path: '/users',
      icon: Users,
    },
  ]

  return (
    <MainLayout
      header={<Header />}
      menuItems={menuItems}>
      <Routes>
        <Route path="/roles" element={<RolesPage />} />
        {/* Sidebar stays open */}
        <Route path="/roles/:id/overview" element={<RoleDetailPage />} />
        {/* Sidebar auto-collapses */}
      </Routes>
    </MainLayout>
  )
}
```

### Nested Menu Items

```tsx
const menuItems: DetailItemsProps[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
    children: [
      {
        title: 'Analytics',
        path: '/dashboard/analytics',
        icon: BarChart,
      },
      {
        title: 'Reports',
        path: '/dashboard/reports',
        icon: FileText,
      },
    ],
  },
]
```

### Menu with Dividers

```tsx
const menuItems: DetailItemsProps[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
    divider: true, // Adds a divider after this item
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
  },
]
```

### Disabled Menu Items

```tsx
const menuItems: DetailItemsProps[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    title: 'Coming Soon',
    path: '/coming-soon',
    icon: Settings,
    disabled: true, // Disables navigation and applies disabled styling
  },
]
```

### Dynamic Breadcrumb Based on Route

```tsx
import { useLocation } from 'react-router'
import { DetailLayout } from '@tessera-ui/components/layouts/detail/detail.layout'

function MyPage() {
  const location = useLocation()

  const getBreadcrumb = (): BreadcrumbItemData[] => {
    const paths = location.pathname.split('/').filter(Boolean)
    const breadcrumb: BreadcrumbItemData[] = [{ label: 'Home', link: '/' }]

    let currentPath = ''
    paths.forEach((path) => {
      currentPath += `/${path}`
      breadcrumb.push({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        link: currentPath,
      })
    })

    return breadcrumb
  }

  const breadcrumb = getBreadcrumb()

  return (
    <DetailLayout menuItems={menuItems} breadcrumb={breadcrumb}>
      {/* Your content */}
    </DetailLayout>
  )
}
```

## Notes

### Spacing and Positioning

- **MainLayout**: Uses `SidebarProvider` and `SidebarInset` for proper spacing. Content has `pt-[60px]` to account for header.
- **DetailLayoutHeader**: Fixed at `top-[60px]` - ensure your main app header accounts for this. When using standalone, add `pt-[53px]` to content below it.
- **DetailLayoutSidenav**: Fixed sidebar with `w-56` (256px) width. When using standalone, add `ml-56` margin-left to content next to it.
- **DetailLayoutContent**: Automatically applies `ml-56` for sidebar spacing and includes padding (`p-3`). Use this wrapper when combining components manually.
- **DetailLayout**: Combines all three components with proper spacing already applied - no manual spacing needed.

### Route Matching

- Menu items are automatically highlighted based on route matching using `react-router`'s `useLocation()`
- Parent menu items highlight when any child route is active
- Accordion menus automatically expand when a child route is active
- Exact path matches take precedence over partial matches

### Import Paths

All components can be imported individually:

```tsx
// MainLayout
import MainLayout from '@tessera-ui/components/layouts/main/main-layout'

// DetailLayout components
import {
  DetailLayout,
  DetailHeader,
  DetailSidenav,
  DetailContent,
} from '@tessera-ui/components/layouts/detail'

// Types
import type {
  MainItemProps,
  DetailItemsProps,
  BreadcrumbItemData,
  SidebarPanelProps,
  SidebarItemsProps,
} from '@tessera-ui/components/layouts'
```

Or use the compound Layout export:

```tsx
import { Layout } from '@tessera-ui/components/layouts'

// Use as compound component
<Layout.Main header={header} menuItems={menuItems}>
  {children}
</Layout.Main>

<Layout.Detail menuItems={menuItems} breadcrumb={breadcrumb}>
  {children}
</Layout.Detail>

<Layout.DetailHeader breadcrumb={breadcrumb} />
<Layout.DetailSidenav menuItems={menuItems} />
<Layout.DetailContent>{children}</Layout.DetailContent>
```
