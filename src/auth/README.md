# Auth — tessera-ui

Authentication integration built on top of [Auth0](https://auth0.com/). Provides `AuthProvider`, `AuthGuard`, and `useAuth` for all apps in the platform.

---

## How it works

```
AuthProvider
  └── Auth0Provider        — handles login / logout / token lifecycle
        └── TesseraAuth0Bridge  — silently fetches access token
              └── TesseraProvider  — exposes user & applications via useApp()
                    └── your app
```

`AuthProvider` is the single entry point. It replaces both `Auth0Provider` and `TesseraProvider` / `IdentiesProvider` — you do not need to use those directly.

---

## Installation

`@auth0/auth0-react` is a peer dependency. Install it in your app:

```sh
bun add @auth0/auth0-react
# or
npm install @auth0/auth0-react
```

---

## Environment variables

Add these to your app's `.env`:

```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your_client_id
VITE_AUTH0_AUDIENCE=https://your-api-audience
VITE_IDENTIES_API_URL=https://api.example.com
```

---

## Basic setup

Wrap your app root with `AuthProvider`. All other providers (`ReactQueryProvider`, etc.) go inside as children.

```tsx
// main.tsx
import { AuthProvider } from 'tessera-ui'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider
    auth0={{
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      redirectUri: window.location.origin,
      prompt: 'select_account',
    }}
    identiesApiUrl={import.meta.env.VITE_IDENTIES_API_URL}>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </AuthProvider>
)
```

Unauthenticated users are automatically redirected to Auth0 login.

---

## Migrating from Auth0Provider + IdentiesProvider

**Before:**

```tsx
<Auth0Provider
  domain={domain}
  clientId={clientID}
  onRedirectCallback={onRedirectCallback}
  authorizationParams={{
    redirect_uri: hostUrl,
    audience: audience,
    prompt: 'select_account',
  }}>
  <ReactQueryProvider>
    <IdentiesProvider identiesApiUrl={identiesApiUrl}>
      <PersistenceDataProvider>
        <Outlet />
      </PersistenceDataProvider>
    </IdentiesProvider>
  </ReactQueryProvider>
</Auth0Provider>
```

**After:**

```tsx
import { AuthProvider } from 'tessera-ui'

;<AuthProvider
  auth0={{
    domain,
    clientId: clientID,
    audience,
    redirectUri: hostUrl,
    prompt: 'select_account',
    onRedirectCallback,
  }}
  identiesApiUrl={identiesApiUrl}>
  <ReactQueryProvider>
    <PersistenceDataProvider>
      <Outlet />
    </PersistenceDataProvider>
  </ReactQueryProvider>
</AuthProvider>
```

---

## AuthProvider props

| Prop                       | Type                                                 | Required | Default                  | Description                                                                                                                                                  |
| -------------------------- | ---------------------------------------------------- | -------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `auth0.domain`             | `string`                                             | Yes      | —                        | Auth0 tenant domain                                                                                                                                          |
| `auth0.clientId`           | `string`                                             | Yes      | —                        | Auth0 application client ID                                                                                                                                  |
| `auth0.audience`           | `string`                                             | Yes      | —                        | API audience (used for access token scope)                                                                                                                   |
| `auth0.redirectUri`        | `string`                                             | No       | `window.location.origin` | Redirect URL after login                                                                                                                                     |
| `auth0.prompt`             | `'login' \| 'consent' \| 'select_account' \| 'none'` | No       | —                        | Auth0 prompt behaviour                                                                                                                                       |
| `auth0.onRedirectCallback` | `(appState?) => void`                                | No       | —                        | Called after Auth0 redirects back to the app                                                                                                                 |
| `identiesApiUrl`           | `string`                                             | Yes      | —                        | Base URL of the Identies API                                                                                                                                 |
| `requireAuth`              | `boolean`                                            | No       | `true`                   | When `false`, public routes render freely — use `AuthGuard` to protect specific routes                                                                       |
| `onUnauthenticated`        | `() => void`                                         | No       | `loginWithRedirect()`    | Custom handler when user is not authenticated. Fires regardless of `requireAuth`. When omitted and `requireAuth={true}`, falls back to `loginWithRedirect()` |

---

## Hooks

### `useApp()`

Access the authenticated user and their applications. Available anywhere inside `AuthProvider`.

```tsx
import { useApp } from 'tessera-ui'

function Header() {
  const { user, applications, isLoadingIdenties } = useApp()

  if (isLoadingIdenties) return <Spinner />
  return <span>{user?.email}</span>
}
```

| Value               | Type                        | Description                                  |
| ------------------- | --------------------------- | -------------------------------------------- |
| `user`              | `User \| null`              | Authenticated user profile from Identies API |
| `applications`      | `Application[]`             | Apps the user has access to                  |
| `isLoadingIdenties` | `boolean`                   | Loading state for user fetch                 |
| `isLoadingApps`     | `boolean`                   | Loading state for applications fetch         |
| `token`             | `string \| null`            | Raw Auth0 access token                       |
| `error`             | `ApiError \| null`          | Error from Identies API                      |
| `updateUser`        | `(update) => Promise<void>` | Update the current user profile              |

### `useAuth()`

Access Auth0 state and actions.

```tsx
import { useAuth } from 'tessera-ui'

function UserMenu() {
  const { isAuthenticated, user, logout } = useAuth()

  return <button onClick={() => logout()}>Sign out {user?.email}</button>
}
```

| Value               | Type                    | Description                                    |
| ------------------- | ----------------------- | ---------------------------------------------- |
| `isAuthenticated`   | `boolean`               | Whether the user is logged in                  |
| `isLoading`         | `boolean`               | Auth0 initialisation loading state             |
| `user`              | `AuthUser \| undefined` | Auth0 user profile (email, name, picture, sub) |
| `loginWithRedirect` | `() => void`            | Trigger Auth0 login                            |
| `logout`            | `(options?) => void`    | Log out. Accepts optional `returnTo` URL       |
| `getAccessToken`    | `() => Promise<string>` | Fetch the current access token silently        |

---

## AuthGuard

Use `AuthGuard` to protect specific routes when you have a mix of public and private pages.

```tsx
import { AuthGuard } from 'tessera-ui'

// Protect a single route
;<Route
  path="/dashboard"
  element={
    <AuthGuard fallback={<Spinner />}>
      <Dashboard />
    </AuthGuard>
  }
/>
```

| Prop       | Type        | Required | Description                                                |
| ---------- | ----------- | -------- | ---------------------------------------------------------- |
| `children` | `ReactNode` | Yes      | Content to render when authenticated                       |
| `fallback` | `ReactNode` | No       | Shown while loading or unauthenticated. Defaults to `null` |

---

## Public and private routes

By default `requireAuth={true}` — the entire app is protected and `AuthGuard` is not needed.

If your app has a mix of public and private routes, set `requireAuth={false}` on `AuthProvider` and use `AuthGuard` to wrap the protected route group:

```tsx
// main.tsx
<AuthProvider
  auth0={{ domain, clientId, audience }}
  identiesApiUrl={identiesApiUrl}
  requireAuth={false}>
  <Routes>
    {/* Public — no auth required */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/about" element={<AboutPage />} />

    {/* Protected — AuthGuard redirects unauthenticated users */}
    <Route
      element={
        <AuthGuard fallback={<Spinner />}>
          <Outlet />
        </AuthGuard>
      }>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  </Routes>
</AuthProvider>
```

**Behaviour summary:**

|                      | `requireAuth={true}` (default) | `requireAuth={false}`                    |
| -------------------- | ------------------------------ | ---------------------------------------- |
| Unauthenticated user | Auto-redirected to login       | Public routes render freely              |
| Authenticated user   | `useApp()` works everywhere    | `useApp()` works inside protected routes |
| Use `AuthGuard`?     | Not needed                     | Yes — wrap protected route groups        |

> `useApp()` returns empty defaults on public routes when the user is not authenticated. This is safe — no error is thrown.

---

## Custom unauthenticated redirect

By default, unauthenticated users are sent straight to the Auth0 login page. Pass `onUnauthenticated` to override this — useful for redirecting to a custom login page or preserving the return path.

```tsx
const navigate = useNavigate()

<AuthProvider
  auth0={{ ... }}
  identiesApiUrl={identiesApiUrl}
  onUnauthenticated={() => navigate('/login')}
>
  ...
</AuthProvider>
```

```tsx
// Preserve the page the user was trying to reach
<AuthProvider
  auth0={{ ... }}
  identiesApiUrl={identiesApiUrl}
  onUnauthenticated={() =>
    loginWithRedirect({ appState: { returnTo: window.location.pathname } })
  }
>
  ...
</AuthProvider>
```

---

## When to use TesseraProvider directly

`TesseraProvider` is the lower-level building block. Use it only when Auth0 is not involved — for example, when the token comes from a backend session or another auth provider.

```tsx
import { TesseraProvider } from 'tessera-ui'

;<TesseraProvider token={tokenFromBackend} identiesApiUrl={apiUrl}>
  <App />
</TesseraProvider>
```

For all Auth0-based apps, use `AuthProvider` instead.
