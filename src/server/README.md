# tessera-ui/server

Server-side helpers for React Router loaders and actions. Only call them from `loader` /
`action` code or `entry.server.tsx`: React Router strips loader/action code from the client
bundle and `entry.server.tsx` never ships to it, so these helpers never reach the browser. This
entry does not import any CSS.

> tessera-ui is a **public** repository. Never add secrets, environment variables, internal URLs
> or app-specific config here — keep those in the app.

## Root loader

```tsx
import { getRequestInfo } from 'tessera-ui/server'

export async function loader({ request }: LoaderFunctionArgs) {
  return data({ /* ... */, requestInfo: getRequestInfo(request) })
}
```

See [`tessera-ui/react-router`](../react-router/README.md) for the hooks that read it.

## Theme action

```ts
// app/routes/resources/update-theme.ts
import { redirect, type ActionFunctionArgs } from 'react-router'
import { parseThemeFormData, setTheme } from 'tessera-ui/server'

export async function action({ request }: ActionFunctionArgs) {
  const { theme, redirectTo } = parseThemeFormData(await request.formData())
  const responseInit = { headers: { 'Set-Cookie': setTheme(theme) } }

  return redirectTo ? redirect(redirectTo, responseInit) : new Response(null, responseInit)
}
```

Sanitize `redirectTo` in the app (e.g. `safeRedirect`) before redirecting.

## API

| Export                         | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| `getRequestInfo(request)`      | Builds the root loader `requestInfo` (`hints`, `origin`, `path`, `userPrefs.theme`) |
| `getDomainUrl(request)`        | `http(s)://host` from `X-Forwarded-Host` / `Host`, or `null`                        |
| `getTheme(request)`            | Theme saved in the `_theme` cookie, or `null` if none                               |
| `getRequestTheme(request)`     | Saved theme, else client hint theme. For `RequestThemeProvider` in `entry.server`   |
| `setTheme(theme)`              | `Set-Cookie` value that saves the theme (`'system'` clears it)                      |
| `parseThemeFormData(formData)` | Validates `theme` / `redirectTo`. Throws a 400 `Response` on invalid input          |
| `THEME_COOKIE_KEY`             | `'_theme'`                                                                          |
