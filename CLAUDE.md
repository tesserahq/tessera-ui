# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`tessera-ui` is TesseraHQ's private, shared React component library — not an app.
It's distributed to consumer apps via `bun link` or a git dependency
(`bun install git+https://github.com/tesserahq/tessera-ui.git`), imported under the
`tessera-ui` path alias. There is no consumer app in this repo; changes here are
verified through Storybook.

## Commands

```bash
bun install          # install deps
bun storybook        # Storybook dev server on :6006 — primary way to exercise components
bun run dev           # Vite dev server
bun run build         # tsc -b && vite build — library build (entry: src/main.ts)
bun run typecheck     # tsc -b
bun run lint          # eslint src/**/*.{ts,tsx}
bun run lint:fix
bun run format        # prettier --write
bun run format:check
bun run check         # format + lint + typecheck, run this before considering work done
bun run build-storybook
```

There is no test runner configured in this repo (no unit/integration test script) —
verification happens by running Storybook and clicking through the affected story.

## Architecture

### Public API surface (barrel exports)

Everything consumers import flows through `src/main.ts`, which re-exports from:
- `provider/AppProvider` — `TesseraProvider`, `useApp`
- `auth` — `AuthProvider`, `AuthGuard`, `useAuth`
- `components/misc/ProfileMenu`, `components/misc/Form`
- `components` (barrel of `components/index.ts`, itself re-exporting `layouts`,
  `app-menu`, `datetime`, `new-button`, `empty-content`, `toast`, `pagination`,
  `combo-box`, `resource-id`)

`package.json` also exposes narrower subpath exports (`tessera-ui/layouts`,
`tessera-ui/components`, `tessera-ui/components/delete-confirmation`) mapped
directly to their `index.ts`/component file. When adding a new public component,
wire it into the relevant barrel file, not just its own folder.

`src/components/layouts` uses a compound-component export pattern — `Layout` is
assembled in `layouts/index.ts` as `Object.assign(Layout, { Main, Header, Detail,
DetailHeader, DetailSidenav, DetailContent })`, so `Layout.Main`, `Layout.Header`,
etc. are the real public names, not the underlying `MainLayout`/`Header` component
names.

### Auth and app data flow

- `AuthProvider` (`src/auth/AuthProvider.tsx`) wraps Auth0 (`@auth0/auth0-react`)
  and bridges it to this library's own context: it waits for Auth0 to finish
  loading, resolves an access token via `getAccessTokenSilently`, and only then
  mounts `TesseraProvider` around `children`. If there's no token and
  `requireAuth` is false, `children` render *without* `TesseraProvider` — so
  anything reading `useApp()` in that path must tolerate/handle that.
- `TesseraProvider` (`src/provider/AppProvider.tsx`) calls `useIdenties`
  (`src/hooks/useIdenties.ts`), which fetches the current user and applications
  from `createIdentiesClient` (`src/api/client.ts`, an Axios wrapper) and exposes
  `user`, `isLoadingIdenties`, `error`, `applications`, `isLoadingApps`,
  `updateUser` via `useApp()`.
- **Provider placement matters**: any component that calls `useApp()` must be
  rendered under `TesseraProvider` in the actual React tree — not just visually
  nested via CSS (e.g. `position: fixed`). Since `Layout.Header` and `Layout.Main`
  are composed as siblings-in-JSX-but-parent/child-in-render by consumer apps
  (`Layout.Header` is typically passed as a child of `Layout.Main`, which wraps
  its `children` in its own `SidebarProvider`), always check where a new
  `useApp()`/`useSidebar()` consumer sits in the actual component tree, not just
  where it appears visually in the header/layout.
- Storybook mocks: `src/auth/auth.mock.tsx` provides `MockAuthProvider`/`withAuth`
  (wraps both `Auth0Context.Provider` and `TesseraUIContext.Provider` with fixed
  mock data) for stories that need a populated user/app context without hitting
  the real API. Stories that just need *a* provider (without caring about the
  data) instead mount the real `TesseraProvider` directly with
  `identiesApiUrl=""` `token=""` — see `header.stories.tsx`. Any story rendering
  a component that calls `useApp()` needs one of these two, or it will throw.

### Sidebar / mobile layout

`src/components/ui/sidebar.tsx` is a shadcn-style sidebar primitive
(`SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`,
etc.) with its own mobile/desktop branching: below the `768px` breakpoint
(`src/hooks/use-mobile.ts`, `useIsMobile()`) it renders as a `Sheet` overlay
controlled by `openMobile`/`setOpenMobile`; at `md:` and above it renders as a
persistent flex column. `src/components/layouts/main/sidebar/sidebar-panel.tsx`
and `main-layout.tsx` are the concrete usage of this primitive for the app's main
nav.

This project's Tailwind theme (`src/index.css`, Tailwind v4 `@theme` block) only
defines `--color-sidebar-background` (not the shadcn-standard bare
`--color-sidebar`) plus `sidebar-border`/`sidebar-accent`/`sidebar-foreground`/etc.
When touching `ui/sidebar.tsx`, use `bg-sidebar-background`, not `bg-sidebar` —
the latter silently resolves to nothing (transparent) since it isn't a defined
token in this theme.

### Styling conventions

- Tailwind v4, theme tokens defined in `src/index.css` under `@theme` (not a
  `tailwind.config.ts` — this project uses CSS-first Tailwind config).
- `cn()` (`src/utils/misc.ts`, `clsx` + `tailwind-merge`) is the standard
  className-merge helper used throughout — prefer it over string concatenation
  for any conditional/overridable className.
- kebab-case filenames; Prettier is configured with `prettier-plugin-tailwindcss`
  (auto-sorts Tailwind classes) and `@trivago/prettier-plugin-sort-imports`
  (auto-sorts imports) — don't hand-order either, formatting will reorder them.
- No semicolons, single quotes, 100-char print width (`prettier.config.mjs`).

### Known documentation drift

Several `.md`/`.stories.tsx`/docstring examples in this repo (e.g.
`src/docs/coreui-provider.md`, the `MainLayout` docstring, parts of
`src/components/layouts/README.md`) describe older prop APIs (like a `header`
prop on `MainLayout`) that no longer match the current implementation. Don't
trust doc comments or `.md` files over the actual component source/props when
they conflict — verify against the real `interface`/`Props` type.
