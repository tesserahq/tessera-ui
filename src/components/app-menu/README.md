# AppMenu Component

The `AppMenu` component provides a dropdown menu for displaying and navigating to multiple applications. It features a grid layout with app logos and names, perfect for application switchers or launcher menus.

## Features

- **Dropdown Menu**: Clean dropdown interface triggered by a grip icon button
- **Grid Layout**: 2-column grid layout for app items
- **App Logos**: Displays app logos/images with automatic path resolution
- **External Links**: Opens app links in new tabs
- **Hover Effects**: Smooth hover transitions for better UX
- **Scrollable**: Automatically scrollable when content exceeds max height
- **Accessible**: Built on Radix UI primitives for accessibility

## Usage

### Basic Example

```tsx
import { AppMenu } from "tessera-ui/components/app-menu";
import type { AppMenuProps } from "tessera-ui/components/app-menu";

function Header() {
  const apps: AppMenuProps[] = [
    { name: "dashboard", link: "https://dashboard.example.com" },
    { name: "analytics", link: "https://analytics.example.com" },
    { name: "settings", link: "https://settings.example.com" },
    { name: "reports", link: "https://reports.example.com" },
  ];

  return (
    <header>
      <AppMenu apps={apps} />
    </header>
  );
}
```

### With Navigation Router

```tsx
import { AppMenu } from "tessera-ui/components/app-menu";
import type { AppMenuProps } from "tessera-ui/components/app-menu";

function NavigationBar() {
  const apps: AppMenuProps[] = [
    { name: "home", link: "/" },
    { name: "dashboard", link: "/dashboard" },
    { name: "profile", link: "/profile" },
  ];

  return (
    <nav className="flex items-center justify-between">
      <div>Logo</div>
      <AppMenu apps={apps} />
    </nav>
  );
}
```

### Complete Header Example with Environment Variables

```tsx
import { AppMenu } from "tessera-ui/components/app-menu";
import { ProfileMenu } from "tessera-ui";
import type { AppMenuProps } from "tessera-ui/components/app-menu";
import { useMemo } from "react";

function AppHeader() {
  // Get host URLs from environment variables or configuration
  const quoreHostUrl = import.meta.env.VITE_QUORE_HOST_URL;
  const looplyHostUrl = import.meta.env.VITE_LOOPLY_HOST_URL;
  const vaultaHostUrl = import.meta.env.VITE_VAULTA_HOST_URL;
  const identiesHostUrl = import.meta.env.VITE_IDENTIES_HOST_URL;

  const apps = useMemo(() => {
    return [
      {
        name: "quore",
        link: `${quoreHostUrl}?autologin=true`,
      },
      {
        name: "looply",
        link: `${looplyHostUrl}?autologin=true`,
      },
      {
        name: "vaulta",
        link: `${vaultaHostUrl}?autologin=true`,
      },
      {
        name: "identies",
        link: `${identiesHostUrl}?autologin=true`,
      },
    ];
  }, [quoreHostUrl, looplyHostUrl, vaultaHostUrl, identiesHostUrl]);

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <h1>My Application</h1>
        <AppMenu apps={apps} />
      </div>
      <ProfileMenu
        selectedTheme="light"
        onSetTheme={(theme) => console.log(theme)}
        actionLogout={() => console.log("logout")}
        actionProfile={() => console.log("profile")}
        defaultAvatar="/default-avatar.png"
      />
    </header>
  );
}
```

## Props

### `AppMenu`

| Prop   | Type             | Required | Description                                 |
| ------ | ---------------- | -------- | ------------------------------------------- |
| `apps` | `AppMenuProps[]` | Yes      | Array of app objects to display in the menu |

### `AppMenuProps`

| Property | Type     | Required | Description                               |
| -------- | -------- | -------- | ----------------------------------------- |
| `name`   | `string` | Yes      | App name (used for display and logo path) |
| `link`   | `string` | Yes      | URL or route path for the app             |

## App Logo Images

The component automatically looks for app logos at:

```
/images/apps/{app.name}-logo.png
```

**Example:**

- App name: `"quore"` → Logo path: `/images/apps/quore-logo.png`
- App name: `"looply"` → Logo path: `/images/apps/looply-logo.png`
- App name: `"vaulta"` → Logo path: `/images/apps/vaulta-logo.png`
- App name: `"identies"` → Logo path: `/images/apps/identies-logo.png`

### Setting Up App Logos

1. Create an `images/apps` directory in your `public` folder (or equivalent)
2. Add logo images with the naming convention: `{app-name}-logo.png`
3. Ensure images are square or properly sized for the avatar component

**Example directory structure:**

```
public/
  images/
    apps/
      quore-logo.png
      looply-logo.png
      vaulta-logo.png
      identies-logo.png
```

## Behavior

### Dropdown State

- The dropdown is controlled via internal state
- Opens/closes on button click
- Closes when clicking outside or selecting an app
- Button shows accent background when dropdown is open

### Link Behavior

- All app links open in **new tabs** (`target="_blank"`)
- Uses `rel="noreferrer"` for security
- Works with both external URLs and internal routes (when using react-router)

### Grid Layout

- **Columns**: Fixed 2-column grid
- **Spacing**: Gap of 1 unit between items
- **Padding**: px-5 py-3 on dropdown content
- **Scroll**: Auto-scrolls when content exceeds max height

## Accessibility

The component is built on Radix UI's `DropdownMenu` primitive, which provides:

- Keyboard navigation support
- ARIA attributes
- Focus management
- Screen reader announcements

## Requirements

- `react-router` (v6+) - Required for Link component
- `lucide-react` - Required for Grip icon
- Tailwind CSS - Required for styling
- Radix UI Dropdown Menu - Included as a dependency

## Examples

### Using useMemo with Environment Variables (Recommended)

This is the recommended pattern for production applications:

```tsx
import { AppMenu } from "tessera-ui/components/app-menu";
import type { AppMenuProps } from "tessera-ui/components/app-menu";
import { useMemo } from "react";

function AppMenuWithEnvVars() {
  // Get host URLs from environment variables or configuration
  const quoreHostUrl = import.meta.env.VITE_QUORE_HOST_URL;
  const looplyHostUrl = import.meta.env.VITE_LOOPLY_HOST_URL;
  const vaultaHostUrl = import.meta.env.VITE_VAULTA_HOST_URL;
  const identiesHostUrl = import.meta.env.VITE_IDENTIES_HOST_URL;

  const apps = useMemo(() => {
    return [
      {
        name: "quore",
        link: `${quoreHostUrl}?autologin=true`,
      },
      {
        name: "looply",
        link: `${looplyHostUrl}?autologin=true`,
      },
      {
        name: "vaulta",
        link: `${vaultaHostUrl}?autologin=true`,
      },
      {
        name: "identies",
        link: `${identiesHostUrl}?autologin=true`,
      },
    ];
  }, [quoreHostUrl, looplyHostUrl, vaultaHostUrl, identiesHostUrl]);

  return <AppMenu apps={apps} />;
}
```

**Benefits of using `useMemo`:**

- Prevents unnecessary re-renders when dependencies haven't changed
- Memoizes the apps array to avoid recreating it on every render
- Only recalculates when host URLs change

### Filtered Apps

```tsx
import { AppMenu } from "tessera-ui/components/app-menu";
import type { AppMenuProps } from "tessera-ui/components/app-menu";

function FilteredAppMenu({ userRole }: { userRole: string }) {
  const allApps: AppMenuProps[] = [
    { name: "dashboard", link: "/dashboard" },
    { name: "admin", link: "/admin" },
    { name: "reports", link: "/reports" },
  ];

  const filteredApps = allApps.filter((app) => {
    if (app.name === "admin" && userRole !== "admin") {
      return false;
    }
    return true;
  });

  return <AppMenu apps={filteredApps} />;
}
```

## Notes

- App names are automatically capitalized in the display
- The component expects app logos to follow the naming convention: `{name}-logo.png`
- Links always open in new tabs for better UX when switching between apps
- The dropdown aligns to the end (right side) of the trigger button
- Maximum height is 400px with automatic scrolling for long app lists

## Import Paths

```tsx
// Import component and types
import { AppMenu } from "tessera-ui/components/app-menu";
import type { AppMenuProps } from "tessera-ui/components/app-menu";

// Or from main export (if available)
import { AppMenu } from "tessera-ui";
```
