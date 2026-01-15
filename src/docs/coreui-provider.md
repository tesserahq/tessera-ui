# CoreUIProvider

The `CoreUIProvider` is a React context provider that manages user authentication state and provides a centralized way to access user data and perform user-related operations throughout your application.

## Overview

The CoreUIProvider wraps your application and provides:

- User authentication state management
- User data fetching and caching
- User profile updates
- Error handling for authentication failures
- Integration with the Identies API

## Features

- ✅ **User authentication state management**
- ✅ **Automatic user data fetching**
- ✅ **User profile updates**
- ✅ **Error handling and loading states**
- ✅ **Theme preference management**
- ✅ **Integration with ProfileMenu component**

## Installation

The CoreUIProvider is part of the tessera-ui package and doesn't require additional installation.

## Basic Usage

### 1. Wrap your application with CoreUIProvider

```tsx
import { CoreUIProvider } from "./provider/AppProvider";

function App() {
  const handleUnauthorized = () => {
    // Handle unauthorized access (e.g., redirect to login)
    window.location.href = "/login";
  };

  return (
    <CoreUIProvider
      isAuthenticated={true}
      callbacktUnauthorized={handleUnauthorized}
      identiesApiUrl="https://api.identies.com"
      token="your-auth-token"
    >
      <YourAppContent />
    </CoreUIProvider>
  );
}
```

### 2. Use the useCoreUI hook in your components

```tsx
import { useCoreUI } from "./provider/AppProvider";

function UserProfile() {
  const { user, loadingRequest, error, updateUser } = useCoreUI();

  if (loadingRequest) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.detail}</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.first_name}!</h1>
      <p>Email: {user?.email}</p>
    </div>
  );
}
```

## Props

### CoreUIProvider Props

| Prop                    | Type              | Required | Description                                             |
| ----------------------- | ----------------- | -------- | ------------------------------------------------------- |
| `children`              | `React.ReactNode` | Yes      | The components to be wrapped by the provider            |
| `isAuthenticated`       | `boolean`         | Yes      | Whether the user is currently authenticated             |
| `callbacktUnauthorized` | `() => void`      | Yes      | Callback function called when user is not authenticated |
| `identiesApiUrl`        | `string`          | Yes      | Base URL for the Identies API                           |
| `token`                 | `string`          | Yes      | Authentication token for API requests                   |

## Context Value

The `useCoreUI` hook returns an object with the following properties:

| Property         | Type                                        | Description                                |
| ---------------- | ------------------------------------------- | ------------------------------------------ |
| `user`           | `User \| null`                              | Current user data or null if not loaded    |
| `loadingRequest` | `boolean`                                   | Whether a request is currently in progress |
| `error`          | `ApiError \| null`                          | Any error that occurred during requests    |
| `token`          | `string \| null`                            | Current authentication token               |
| `updateUser`     | `(userUpdate: UserUpdate) => Promise<void>` | Function to update user data               |

## User Interface

```tsx
interface User {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
  avatar_asset_id?: string;
  first_name: string;
  last_name: string;
  provider?: string;
  confirmed_at?: string;
  verified: boolean;
  verified_at?: string;
  external_id?: string;
  theme_preference?: string;
  created_at: string;
  updated_at: string;
}

interface UserUpdate {
  email?: string;
  username?: string;
  avatar_asset_id?: string;
  first_name?: string;
  last_name?: string;
  provider?: string;
  verified?: boolean;
  verified_at?: string;
  theme_preference?: string;
}
```

## Error Handling

The provider automatically handles authentication errors and calls the `callbacktUnauthorized` function when:

- The user is not authenticated (`isAuthenticated` is false)
- API requests return unauthorized errors

## Integration with ProfileMenu

The CoreUIProvider is designed to work seamlessly with the ProfileMenu component. The ProfileMenu automatically uses the user data and update functions provided by the CoreUIProvider.

### ProfileMenu Usage

```tsx
import { ProfileMenu } from "./components/misc/ProfileMenu/ProfileMenu";

function Header() {
  const [theme, setTheme] = useState("system");

  const handleLogout = () => {
    // Handle logout logic
  };

  const handleProfile = () => {
    // Navigate to profile page
  };

  return (
    <header>
      <ProfileMenu
        selectedTheme={theme}
        onSetTheme={setTheme}
        actionLogout={handleLogout}
        actionProfile={handleProfile}
        defaultAvatar="/default-avatar.png"
      />
    </header>
  );
}
```

### ProfileMenu Features

The ProfileMenu component provides:

- **User avatar display** with loading states
- **User information display** (name and email)
- **Theme selection** (Dark, Light, System) with automatic user preference updates
- **Profile navigation** button
- **Logout functionality**
- **Responsive design** with dropdown menu

### ProfileMenu Props

| Prop            | Type                      | Required | Description                     |
| --------------- | ------------------------- | -------- | ------------------------------- |
| `selectedTheme` | `string`                  | Yes      | Current theme selection         |
| `onSetTheme`    | `(theme: string) => void` | Yes      | Callback when theme changes     |
| `actionLogout`  | `() => void`              | Yes      | Callback for logout action      |
| `actionProfile` | `() => void`              | Yes      | Callback for profile navigation |
| `defaultAvatar` | `string`                  | Yes      | Default avatar image URL        |

## Examples

### Complete App Setup

```tsx
import React, { useState } from "react";
import { CoreUIProvider } from "./provider/AppProvider";
import { ProfileMenu } from "./components/misc/ProfileMenu/ProfileMenu";

function App() {
  const [theme, setTheme] = useState("system");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const token = "your-auth-token";

  const handleUnauthorized = () => {
    setIsAuthenticated(false);
    // Redirect to login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear token and redirect
  };

  const handleProfile = () => {
    // Navigate to profile page
  };

  return (
    <CoreUIProvider
      isAuthenticated={isAuthenticated}
      callbacktUnauthorized={handleUnauthorized}
      identiesApiUrl="https://api.identies.com"
      token={token}
    >
      <div className="app">
        <header>
          <ProfileMenu
            selectedTheme={theme}
            onSetTheme={setTheme}
            actionLogout={handleLogout}
            actionProfile={handleProfile}
            defaultAvatar="/default-avatar.png"
          />
        </header>
        <main>{/* Your app content */}</main>
      </div>
    </CoreUIProvider>
  );
}
```

### User Data Management

```tsx
import { useCoreUI } from "./provider/AppProvider";

function UserSettings() {
  const { user, updateUser } = useCoreUI();

  const handleUpdateProfile = async () => {
    try {
      await updateUser({
        first_name: "John",
        last_name: "Doe",
        theme_preference: "dark",
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div>
      <h2>User Settings</h2>
      <p>
        Current user: {user?.first_name} {user?.last_name}
      </p>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}
```

## Best Practices

1. **Always wrap your app** with CoreUIProvider at the root level
2. **Handle loading states** when using user data
3. **Implement proper error handling** for authentication failures
4. **Use the ProfileMenu component** for consistent user interface
5. **Update user preferences** through the `updateUser` function to maintain consistency

## Error Types

```tsx
interface ApiError {
  detail: string;
  status_code: number;
}
```

Common error scenarios:

- `401 Unauthorized`: User token is invalid or expired
- `403 Forbidden`: User doesn't have permission
- `404 Not Found`: User data not found
- `500 Internal Server Error`: Server-side error

## Dependencies

- React 18+
- TypeScript
- Lucide React (for icons in ProfileMenu)
- Tailwind CSS (for styling)
