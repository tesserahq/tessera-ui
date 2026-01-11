# Layout Components

This directory contains layout components for building consistent page structures with navigation, breadcrumbs, and content areas.

## Components

### `Layout`

The main layout component that wraps your application routes. Currently acts as a simple outlet wrapper.

### `DetailLayout`

A comprehensive layout component featuring:

- Fixed sidebar navigation with menu items
- Breadcrumb navigation in the header
- Content area with proper spacing

### `DetailHeader`

A standalone header component with breadcrumb navigation. Useful when you need just the header without the full layout.

## Usage

<!-- ### Basic Layout Setup
(Please dont implement this for now!!)

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
``` -->

### Using DetailLayout

The `DetailLayout` component is a complete layout solution that combines a fixed sidebar navigation, breadcrumb header, and content area. It's perfect for detail pages, dashboards, or any page that needs structured navigation.

**Props:**

- `menuItems` (required): Array of menu items for the sidebar navigation
- `breadcrumb` (required): Array of breadcrumb items for the header
- `children` (required): The main content to display
- `className` (optional): Additional CSS classes for the content wrapper

**Example:**

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import type {
  DetailItemsProps,
  BreadcrumbItemData,
} from "@tessera-ui/components/layouts";
import { Home, Settings, User } from "lucide-react";

function DashboardPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: <Home className="w-4 h-4" />,
    },
    {
      title: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="w-4 h-4" />,
      divider: true,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <User className="w-4 h-4" />,
      children: [
        {
          title: "Edit Profile",
          path: "/dashboard/profile/edit",
          icon: <User className="w-4 h-4" />,
        },
      ],
    },
  ];

  const breadcrumb: BreadcrumbItemData[] = [
    { label: "Home", link: "/" },
    { label: "Dashboard", link: "/dashboard" },
    { label: "Settings", link: "/dashboard/settings" },
  ];

  return (
    <Layout.Detail menuItems={menuItems} breadcrumb={breadcrumb}>
      <div>
        <h1>Dashboard Settings</h1>
        <p>Your dashboard settings content goes here.</p>
      </div>
    </Layout.Detail>
  );
}
```

**How it works:**

- The component automatically positions the header at `top-[61px]` (accounting for your main app header)
- The sidebar is fixed on the left with a width of `256px` (w-56)
- The content area automatically has left margin (`ml-56`) and top padding (`pt-[53px]`) to account for the sidebar and header
- Menu items are automatically highlighted based on the current route

### Using DetailLayout Components Individually

You can use `DetailLayoutHeader`, `DetailLayoutSidenav`, and `DetailLayoutContent` separately to build custom layouts that don't follow the standard DetailLayout structure.

#### Using DetailLayoutHeader

The `DetailLayoutHeader` component provides a fixed breadcrumb navigation header. Use it when you need breadcrumbs without the sidebar.

**Props:**

- `breadcrumb` (required): Array of breadcrumb items
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import type { BreadcrumbItemData } from "@tessera-ui/components/layouts";

function CustomPage() {
  const breadcrumb: BreadcrumbItemData[] = [
    { label: "Home", link: "/" },
    { label: "Custom Page", link: "/custom" },
  ];

  return (
    <div>
      <Layout.DetailHeader breadcrumb={breadcrumb} />
      {/* Content must account for fixed header */}
      <div className="pt-[53px]">
        <h1>Custom Page Content</h1>
        <p>Your content here</p>
      </div>
    </div>
  );
}
```

**Important:** Since the header is fixed at `top-[61px]`, you need to add `pt-[53px]` padding-top to your content to prevent it from being hidden behind the header.

#### Using DetailLayoutSidenav

The `DetailLayoutSidenav` component provides a fixed sidebar navigation menu. Use it when you need navigation without the breadcrumb header.

**Props:**

- `menuItems` (required): Array of menu items for navigation
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import type { DetailItemsProps } from "@tessera-ui/components/layouts";
import { Home, Settings, User } from "lucide-react";

function SidebarOnlyPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: "Home",
      path: "/",
      icon: <Home className="w-4 h-4" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex">
      <Layout.DetailSidenav menuItems={menuItems} />
      {/* Content must account for fixed sidebar */}
      <div className="ml-56 flex-1 p-4">
        <h1>Page Content</h1>
        <p>Your content here</p>
      </div>
    </div>
  );
}
```

**Important:** Since the sidebar is fixed with `w-56` (256px) width, you need to add `ml-56` margin-left to your content to prevent it from being hidden behind the sidebar.

#### Using DetailLayoutContent

The `DetailLayoutContent` component provides a content wrapper with proper spacing for use with the DetailLayout components. It automatically applies left margin for the sidebar and padding.

**Props:**

- `children` (required): Content to display
- `className` (optional): Additional CSS classes

**Example:**

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import type {
  DetailItemsProps,
  BreadcrumbItemData,
} from "@tessera-ui/components/layouts";
import { Home, Settings } from "lucide-react";

function CustomLayoutPage() {
  const menuItems: DetailItemsProps[] = [
    {
      title: "Home",
      path: "/",
      icon: <Home className="w-4 h-4" />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const breadcrumb: BreadcrumbItemData[] = [
    { label: "Home", link: "/" },
    { label: "Settings", link: "/settings" },
  ];

  return (
    <>
      <Layout.DetailHeader breadcrumb={breadcrumb} />
      <div className="flex items-start gap-3 h-full relative pt-[53px]">
        <Layout.DetailSidenav menuItems={menuItems} />
        <Layout.DetailContent>
          <h1>Custom Layout</h1>
          <p>Using components individually for custom layouts</p>
        </Layout.DetailContent>
      </div>
    </>
  );
}
```

**Note:** `DetailLayoutContent` automatically applies `ml-56` for the sidebar spacing and includes padding. If you're building a custom layout, you may need to adjust spacing based on your specific needs.

#### Combining Components for Custom Layouts

You can combine all three components to create layouts that match your specific design requirements:

```tsx
import { Layout } from "@tessera-ui/components/layouts";
import type {
  DetailItemsProps,
  BreadcrumbItemData,
} from "@tessera-ui/components/layouts";

function AdvancedCustomLayout() {
  const menuItems: DetailItemsProps[] = [
    /* ... */
  ];
  const breadcrumb: BreadcrumbItemData[] = [
    /* ... */
  ];

  return (
    <>
      {/* Custom header with additional elements */}
      <div className="fixed top-[61px] w-full z-10">
        <Layout.DetailHeader breadcrumb={breadcrumb} />
        {/* Additional header content */}
        <div className="bg-gray-100 px-4 py-2">
          <p>Additional header information</p>
        </div>
      </div>

      {/* Custom layout structure */}
      <div className="flex pt-[53px]">
        <Layout.DetailSidenav menuItems={menuItems} />

        {/* Custom content area */}
        <div className="ml-56 flex-1">
          <div className="p-4">
            <Layout.DetailContent>
              <h1>Custom Content</h1>
              <p>Fully customized layout structure</p>
            </Layout.DetailContent>
          </div>
        </div>
      </div>
    </>
  );
}
```

## Type Definitions

### `DetailItemsProps`

Menu item structure for sidebar navigation:

```tsx
interface DetailItemsProps {
  title: string; // Display text for the menu item
  path: string; // Route path (e.g., "/dashboard")
  icon: React.ReactNode; // Icon component (e.g., from lucide-react)
  children?: ItemProps[]; // Optional nested menu items
  divider?: boolean; // Optional divider after this item
}
```

### `BreadcrumbItemData`

Breadcrumb item structure:

```tsx
interface BreadcrumbItemData {
  label: string; // Display text for the breadcrumb
  link: string; // Route path for navigation
}
```

### `SidebarItemsProps`

Wrapper for sidebar menu items:

```tsx
interface SidebarItemsProps {
  menuItems: DetailItemsProps[];
}
```

## Features

### Active Menu Highlighting

Menu items in `DetailLayoutSidenav` are automatically highlighted when their path matches the current route. The component uses `useLocation()` from `react-router` to detect the active route. Parent menu items are also highlighted when any of their children are active.

### Breadcrumb Navigation

- The last item in the breadcrumb array is displayed as the current page (non-clickable)
- All previous items are clickable links
- Breadcrumb labels are automatically capitalized
- Works in both `DetailLayout` and standalone `DetailLayoutHeader`

### Nested Menu Support

`DetailLayoutSidenav` supports nested menu items with accordion-style expansion. Parent items with children automatically expand when a child route is active.

### Responsive Design

- Fixed sidebar (256px width) - `DetailLayoutSidenav`
- Fixed header with breadcrumb - `DetailLayoutHeader` positioned at `top-[61px]`
- Content area automatically adjusts for sidebar and header spacing - `DetailLayoutContent`
- All components can be used together or individually for custom layouts

### Dark Mode Support

All layout components support dark mode through Tailwind CSS dark mode classes.

## Styling

The layout components use Tailwind CSS classes and support:

- Custom className prop on `DetailLayout` content area
- Custom className prop on `DetailHeader`
- Consistent spacing and styling across components

## Requirements

- `react-router` (v6+) - Required for navigation
- `react-router-dom` (v6+) - Required for Link components
- Tailwind CSS - Required for styling

## Examples

### Nested Menu Items

```tsx
const menuItems: DetailItemsProps[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home />,
    children: [
      {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: <BarChart />,
      },
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <FileText />,
      },
    ],
  },
];
```

### Menu with Dividers

```tsx
const menuItems: DetailItemsProps[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <Settings />,
    divider: true, // Adds a divider after this item
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <User />,
  },
];
```

### Dynamic Breadcrumb Based on Route

```tsx
import { useLocation } from "react-router";

function MyPage() {
  const location = useLocation();

  const getBreadcrumb = (): BreadcrumbItemData[] => {
    const paths = location.pathname.split("/").filter(Boolean);
    const breadcrumb: BreadcrumbItemData[] = [{ label: "Home", link: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      breadcrumb.push({
        label: path.charAt(0).toUpperCase() + path.slice(1),
        link: currentPath,
      });
    });

    return breadcrumb;
  };

  const breadcrumb = getBreadcrumb();

  return (
    <Layout.Detail menuItems={menuItems} breadcrumb={breadcrumb}>
      {/* Your content */}
    </Layout.Detail>
  );
}
```

## Notes

### Spacing and Positioning

- **DetailLayoutHeader**: Fixed at `top-[61px]` - ensure your main app header accounts for this. When using standalone, add `pt-[53px]` to content below it.
- **DetailLayoutSidenav**: Fixed sidebar with `w-56` (256px) width. When using standalone, add `ml-56` margin-left to content next to it.
- **DetailLayoutContent**: Automatically applies `ml-56` for sidebar spacing and includes padding. Use this wrapper when combining components manually.
- **DetailLayout**: Combines all three components with proper spacing already applied - no manual spacing needed.

### Route Matching

- Menu items are automatically highlighted based on route matching using `react-router`'s `useLocation()`
- Parent menu items highlight when any child route is active
- Accordion menus automatically expand when a child route is active

### Import Paths

All components can be imported from the main layouts export:

```tsx
import { Layout } from "@tessera-ui/components/layouts";

// Use as compound component
<Layout.Detail ... />
<Layout.DetailHeader ... />
<Layout.DetailSidenav ... />
<Layout.DetailContent ... />
```

Or import individually:

```tsx
import {
  DetailLayout,
  DetailHeader,
  DetailSidenav,
  DetailContent,
} from "@tessera-ui/components/layouts";
```
