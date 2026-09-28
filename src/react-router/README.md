# tessera-ui/react-router

Shared root-template helpers for apps built on **React Router framework mode** (or any data
router). They read route data (`useRouteLoaderData`, `useRouteError`, `useFetcher`,
`useRevalidator`), so they do not work under a plain `<BrowserRouter>`.

Server-side counterparts (reading the request, writing cookies) live in
[`tessera-ui/server`](../server/README.md).

## Root loader contract

The hooks read `requestInfo` from the route with id `root` (the default id of `app/root.tsx`).
The root loader must return it, built with `getRequestInfo` so the shape always matches:

```tsx
// app/root.tsx
import { getRequestInfo } from 'tessera-ui/server'

export async function loader({ request }: LoaderFunctionArgs) {
  return data({
    // ...app data
    requestInfo: getRequestInfo(request),
  })
}
```

## Root ErrorBoundary

The root `ErrorBoundary` also renders when the root loader did **not** run — for unmatched URLs
and when the root loader itself throws. Anything rendered there must not require root loader
data: use `useOptionalTheme` / `useOptionalRequestInfo`, never `useTheme` / `useRequestInfo`
(those throw when the data is missing, which turns a 404 into a 500).

```tsx
import { GenericErrorBoundary, useNonce, useOptionalTheme } from 'tessera-ui/react-router'

export function ErrorBoundary() {
  const nonce = useNonce()
  const theme = useOptionalTheme()

  return (
    <Document nonce={nonce} theme={theme}>
      <GenericErrorBoundary />
    </Document>
  )
}
```

### Theme on error pages

Without root loader data, `useOptionalTheme` still renders the user's theme if the app provides
it from the request in `entry.server.tsx` (in the browser it reads the same cookies from
`document.cookie`, so server and client render the same theme):

```tsx
// app/entry.server.tsx
import { NonceProvider, RequestThemeProvider } from 'tessera-ui/react-router'
import { getRequestTheme } from 'tessera-ui/server'

;<NonceProvider value={nonce}>
  <RequestThemeProvider value={getRequestTheme(request)}>
    <ServerRouter context={reactRouterContext} url={request.url} nonce={nonce} />
  </RequestThemeProvider>
</NonceProvider>
```

Without `RequestThemeProvider`, error pages are server-rendered with the `fallback` theme
(`'light'`).

### Status handlers

`GenericErrorBoundary` renders `NotFound` for 404 responses by default, so apps do not need a
`route('*')` catch-all. Unmatched URLs are rendered by the root `ErrorBoundary` with a 404 status.
Override any status with `statusHandlers`:

```tsx
<GenericErrorBoundary
  statusHandlers={{
    403: ({ error }) => <p>You are not allowed to do that.</p>,
  }}
/>
```

## API

| Export                                                 | Description                                                                  |
| ------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `useRequestInfo()`                                     | Root loader `requestInfo`. Throws when missing                               |
| `useOptionalRequestInfo()`                             | Same, or `undefined` when missing                                            |
| `useHints()`                                           | Client hints (`theme`, `timeZone`). Throws when root loader data is missing  |
| `useTheme()`                                           | Pending, saved or client hint theme. Throws when root loader data is missing |
| `useOptionalTheme(fallback = 'light')`                 | Same, without root loader data: request theme / cookies, else `fallback`     |
| `RequestThemeProvider`                                 | Provides `getRequestTheme(request)` in `entry.server.tsx`                    |
| `useOptimisticThemeMode()`                             | Theme being submitted through the `THEME_FETCHER_KEY` fetcher, if any        |
| `THEME_FETCHER_KEY`                                    | `useFetcher` key the theme switcher must submit with (`'theme-fetcher'`)     |
| `NonceProvider`, `NonceContext`, `useNonce`            | CSP nonce context. Provide it in `entry.server.tsx`                          |
| `ClientHintCheck`                                      | Client hint cookie script. Render it in the document `<head>`                |
| `GenericErrorBoundary`                                 | Route error view with default 404 → `NotFound`                               |
| `getErrorMessage(error)`                               | Best-effort message from an unknown thrown value                             |
| `getHints`, `hintsUtils`                               | Client hint utilities from `@epic-web/client-hints`                          |
| `RequestInfo`, `Theme`, `ThemeExtended`, `ClientHints` | Types                                                                        |
