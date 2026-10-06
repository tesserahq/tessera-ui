# PRD 0001 — Shared Theme Tokens

## Problem Statement

Every TesseraHQ portal (conversa, custos, identies, indexa, looply, modela, orcha, sendly, togly,
vaulta) defined its own full set of color tokens in `app/styles/root.css`. The blocks were
copy-pasted between apps and drifted over time. An audit of the `.dark` blocks on each portal's
default branch (4 Oct 2026) found:

- 32 color tokens per portal, 17 of them neutral (surfaces, text, borders, status, sidebar
  neutrals). Not one neutral token had the same value in all ten portals.
- Four different neutral palettes: dark background `219 29% 15%` (identies, indexa, looply, orcha,
  vaulta), `217 35% 10%` (conversa, modela), `220 20% 12%` (custos, sendly) and `222 25% 10%`
  (togly).
- Template leftovers: a lime `--sidebar-primary` in six portals, sendly's orange chart palette in
  four other portals, an orange `--ring` in identies and vaulta.
- Primary button labels below the 4.5:1 WCAG contrast minimum in seven portals (as low as 1.80:1).
- tessera-ui itself shipped a light-only theme, and its components used raw palette classes
  (`slate-*`, `gray-*`, `navy-*`, hardcoded white text) that bypass app tokens, so shared
  components looked different from app code in dark mode.

The result is that dark mode looks different in every portal, and fixing a color means editing up
to ten repositories.

## Solution

tessera-ui owns the neutral color tokens and ships them as `tessera-ui/theme.css`. Portals import
it right after Tailwind and override only their brand tokens. Tokens are split into two layers:

- **Layer 1 (tessera-ui)**: neutral tokens. Identical in every portal; apps must not redefine them.
- **Layer 2 (per app)**: four brand tokens — `--primary`, `--primary-foreground`, `--accent`,
  `--accent-foreground`. Everything brand-colored (ring, sidebar brand colors, first chart series)
  is derived from them.

Shared components in tessera-ui use semantic tokens only, so they follow whatever brand the
consuming app sets.

## User Stories

1. As a portal user, I want dark mode to look the same in every TesseraHQ app, so that moving
   between apps feels like one product.
2. As a portal user, I want button labels, links and focus rings to be readable in both themes,
   so that I can use the apps comfortably in any lighting.
3. As a portal developer, I want to set up colors by overriding four brand tokens, so that I don't
   maintain a 70-line token block per app.
4. As a portal developer, I want tessera-ui components to follow my app's brand automatically, so
   that I don't patch component colors locally.
5. As a tessera-ui maintainer, I want one place to change a neutral color, so that a fix reaches
   every portal through a version bump.
6. As a reviewer, I want a written rule for which tokens an app may override, so that I can reject
   drift in PRs.

## Implementation Decisions

### Distribution

- `src/styles/theme.css`, exported from `package.json` as `./theme.css` with `style` and
  `default` conditions. `sideEffects` is `["*.css"]` so bundlers keep the file when it is imported
  from JS.
- Consumer setup:

  ```css
  @import 'tailwindcss';
  @import 'tessera-ui/theme.css';

  :root {
    --primary: ...;
    --primary-foreground: ...;
    --accent: ...;
    --accent-foreground: ...;
  }
  .dark {
    --primary: ...;
    --primary-foreground: ...;
    --accent: ...;
    --accent-foreground: ...;
  }
  ```

- Values are bare HSL channels (`217 35% 10%`). They work with the `@theme inline` mapping in
  `theme.css` (`--color-x: hsl(var(--x))`) and with the `hsl(var(--x))` colors in portals that
  still have a `tailwind.config.ts`.
- tessera-ui's own `src/index.css` (Storybook entry) imports `theme.css`; the Storybook toolbar has
  a Light/Dark toggle.

### Layer 1 — neutral tokens

The conversa/modela palette (blue-tinted, hue 217) was chosen over the more common
identies/indexa/looply/orcha/vaulta palette: muted text on cards is more readable (6.33 vs
5.21:1), borders are more visible (1.47 vs 1.31:1) and the dark destructive label passes (4.73 vs
3.78:1). Light mode uses the same family.

| Token                                        | Light           | Dark          |
| -------------------------------------------- | --------------- | ------------- |
| `--background`                               | `217 40% 98%`   | `217 35% 10%` |
| `--foreground`                               | `217 30% 15%`   | `217 25% 95%` |
| `--card` / `--popover`                       | `0 0% 100%`     | `217 30% 17%` |
| `--card-foreground` / `--popover-foreground` | `217 30% 15%`   | `217 25% 92%` |
| `--secondary`                                | `217 20% 93%`   | `217 20% 22%` |
| `--secondary-foreground`                     | `217 30% 20%`   | `217 25% 92%` |
| `--muted`                                    | `217 25% 94%`   | `217 25% 18%` |
| `--muted-foreground`                         | `217 15% 45%`   | `217 15% 65%` |
| `--border` / `--input`                       | `217 20% 88%`   | `217 20% 25%` |
| `--destructive`                              | `0 84% 60%`     | `0 70% 50%`   |
| `--destructive-foreground`                   | `0 0% 100%`     | `0 0% 98%`    |
| `--sidebar-background`                       | `0 0% 100%`     | `220 18% 16%` |
| `--sidebar-foreground`                       | `0 0% 9%`       | `0 0% 95%`    |
| `--sidebar-border`                           | `var(--border)` | `220 15% 28%` |
| `--radius`                                   | `0.75rem`       | —             |

Deviations from the original conversa/modela values:

- **Dark card raised from 14% to 17%** so cards separate from the background (card/background
  1.11 → 1.21:1).
- **Secondary desaturated** (v0.1.1). conversa's secondary was part of its blue brand (70%
  saturation), which put blue Cancel buttons next to green/orange primaries in other portals.
- **Light `--sidebar-border` follows `--border`** instead of sendly's warm `30 30% 88%`.

### Layer 2 — brand tokens

- Apps override only `--primary`, `--primary-foreground`, `--accent`, `--accent-foreground`, in
  both `:root` and `.dark`.
- Derived in `theme.css`, declared on both `:root` and `.dark` so they re-resolve wherever `.dark`
  is applied: `--ring: var(--primary)`, `--sidebar-primary: var(--primary)`,
  `--sidebar-primary-foreground: var(--primary-foreground)`, `--sidebar-accent: var(--accent)`,
  `--sidebar-accent-foreground: var(--accent-foreground)`, `--sidebar-ring: var(--ring)`,
  `--chart-1: var(--primary)`.
- `--chart-2` to `--chart-5` are a shared scale in `theme.css`.
- tessera-ui's default brand (used by Storybook and any app that doesn't override) is green
  `99 66% 44%` with a dark label `217 35% 10%` (7.26:1). The previous white label was 2.47:1.

### Contrast rules

Measured with the WCAG 2.x relative luminance formula:

- **Button label** (`--primary-foreground` on `--primary`): at least 4.5:1, in both themes.
- **Primary on card** (`--primary` on `--card`, for focus rings, links, active indicators): at
  least 3:1.
- **Accent chip** (`--accent-foreground` on `--accent`): at least 4.5:1.
- When a dark-mode primary is bright, keep the brand color and switch `--primary-foreground` to a
  dark value (`217 35% 10%`). When a dark-mode primary is too dark to see on cards, lighten the
  primary for dark mode only.

### Component rules

- Components use semantic tokens only. No raw palette classes (`slate-*`, `gray-*`, `navy-*`,
  white/black text or backgrounds) for color — portals don't share a palette (`navy` only exists in
  some portals' configs) and raw classes bypass the theme. Exceptions: modal scrims
  (`bg-black/50`) and the intentional `black` button variant.
- `--primary-foreground` is only for content on a `--primary` background. Using
  `dark:text-primary-foreground` as "white text in dark mode" breaks as soon as an app uses a dark
  label; use `text-foreground` / `dark:text-foreground` instead.
- Overlays that must work on any surface (hover rows, skeletons) use a token with opacity:
  `bg-foreground/5`, `bg-foreground/10`.
- The Button `default` variant uses `text-primary-foreground`; it previously hardcoded white text,
  which made the label token ineffective.

### Versioning

- `v0.1.0`: `theme.css`, component cleanup, Storybook toggle (tesserahq/tessera-ui#93). Minor bump
  because of the visual change.
- `v0.1.1`: neutral `--secondary`.
- Token value changes that alter how portals look are at least a patch release and are listed in
  the PR description; adding or removing a token is a minor release.

### Portal migration

Per portal, in its own PR that links this PRD:

1. Bump `tessera-ui` to the latest tag and add `@import 'tessera-ui/theme.css'` after
   `@import 'tailwindcss'` in `app/styles/root.css`.
2. Delete the app's neutral and derived token definitions; keep only the four brand tokens.
3. Fix the `body` rule to `bg-background text-foreground`. Every portal currently applies
   `dark:text-primary-foreground` there, which turns all body text dark once the label is dark.
4. Replace raw neutral palette classes in `app/` and `app/styles/*.css` with semantic tokens.
5. Search for `primary-foreground` used off a primary background and switch it to `foreground`.
6. Check the brand values against the contrast rules in both themes.

Current dark-mode brand values against the shared neutrals (17% card):

| Portal   | Dark primary   | Button label | Primary on card | Action                                             |
| -------- | -------------- | ------------ | --------------- | -------------------------------------------------- |
| identies | `158 73% 40%`  | 6.45:1       | 5.33:1          | Migrated                                           |
| conversa | `217 91% 65%`  | 3.04:1       | 4.88:1          | Dark label                                         |
| modela   | `217 91% 65%`  | 3.04:1       | 4.88:1          | Dark label; needs its own brand (copy of conversa) |
| custos   | `234 45% 39%`  | 7.32:1       | 1.62:1          | Lighten primary                                    |
| indexa   | `234 45% 49%`  | 6.85:1       | 2.17:1          | Lighten primary                                    |
| looply   | `193 100% 57%` | 1.83:1       | 8.08:1          | Dark label                                         |
| orcha    | `176 88% 45%`  | 1.80:1       | 8.26:1          | Dark label                                         |
| sendly   | `21 100% 55%`  | 2.87:1       | 5.18:1          | Dark label                                         |
| togly    | `219 68% 55%`  | 4.41:1       | 3.36:1          | Dark label or darker primary                       |
| vaulta   | `176 67% 48%`  | 2.00:1       | 7.41:1          | Dark label                                         |

After lightening a primary (custos, indexa), re-check the button label; it may then need a dark
label too.

### Exceptions

An app that needs a neutral token to differ (for example conversa keeping a blue secondary as part
of its brand) overrides it in its own `root.css` with a comment linking this section, and the
exception is listed here. There are no exceptions yet.

## Testing Decisions

- tessera-ui: `bun run check` (format, lint, typecheck) and a Storybook build. Visual check of the
  affected stories with the Light/Dark toolbar toggle.
- Portals: `bun run lint`, `bun run typecheck`, `bun run build`. Before releasing a tessera-ui
  change, test it in a portal with `bun link` (see `CLAUDE.md` for the SSR `react` symlink
  workaround); typecheck errors about duplicate `@types/react` while linked are expected and go
  away with a tag install.
- Check the built CSS: the shared values (for example `--card:217 30% 17%`) are present and no
  rules for raw neutral palette classes remain.
- Visual pass of authenticated pages in light and dark: buttons (primary, secondary, destructive),
  tables, sidebar active state, dialogs, forms.
- Contrast numbers are computed, not eyeballed, against the rules above.

## Out of Scope

- Success/warning/info status tokens. Alerts and badges keep their raw red/green/yellow classes
  until shared status tokens exist.
- Moving token values to OKLCH.
- Theme switching (cookie, client hints, `.dark` on `<html>`); already shared through
  `tessera-ui/react-router` and `tessera-ui/server`.
- An automated lint rule that blocks raw palette classes; recommended as a follow-up.
- Per-portal neutral palettes.

## Further Notes

- **Open: dark `--muted` vs card.** Muted `217 25% 18%` on the 17% card is 1.04:1, so `bg-muted`
  inside cards (TabsList, highlight blocks) blends in. Proposal: raise dark muted to about 21%.
- **Open: blue-tinted neutrals with non-blue brands.** Every neutral is hue 217. If it feels too
  cold next to green/orange brands, lower the neutral saturation rather than changing the palette.
- **Open: modela brand color.** modela's tokens are an exact copy of conversa's.
- Migration status: identies migrated; conversa, custos, indexa, looply, modela, orcha, sendly,
  togly and vaulta not started.
- Audit with per-portal values, previews and contrast numbers:
  https://claude.ai/artifact/2Rj6XscVzNYEXgNJC3QrBc
