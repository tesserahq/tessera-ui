# Pagination Component

The `Pagination` component renders a paginated control with page buttons, ellipsis, and an items-per-page selector. It can either update URL query params via `react-router` or emit changes through a callback.

## Features

- **Page Navigation**: First/previous/next/last controls with numbered pages
- **Adaptive Window**: Ellipsis and sliding window for large page counts
- **Items Per Page**: Built-in page size selector (25/50/75/100)
- **URL Sync**: Optional URL query param updates via scoped params
- **Callback Mode**: Optional callback to fully control pagination state

## Usage

### Basic Example (URL Params)

```tsx
import { Pagination } from 'tessera-ui/components/pagination'

function ListPage({ meta }) {
  return <Pagination meta={meta} />
}
```

### With Scope

```tsx
import { Pagination } from 'tessera-ui/components/pagination'

function UsersTable({ meta }) {
  return <Pagination meta={meta} scope="users" />
}
```

### Controlled via Callback

```tsx
import { useState } from 'react'
import { Pagination } from 'tessera-ui/components/pagination'

function OrdersList({ initialMeta }) {
  const [meta, setMeta] = useState(initialMeta)

  return (
    <Pagination
      meta={meta}
      callback={({ page, size }) => {
        setMeta((prev) => ({ ...prev, page, size }))
      }}
    />
  )
}
```

## Props

### `Pagination`

| Prop       | Type                                                           | Required | Default | Description                                   |
| ---------- | -------------------------------------------------------------- | -------- | ------- | --------------------------------------------- |
| `meta`     | `{ page: number; pages: number; size: number; total: number }` | Yes      | -       | Paging metadata                               |
| `scope`    | `string`                                                       | No       | `""`    | Prefix for query params (e.g. `scope:page`)   |
| `callback` | `({ page, size }: { page: number; size: number }) => void`     | No       | -       | Handle pagination changes without URL updates |

## Behavior

### Page Display

- Shows a sliding window of pages around the active page
- Displays ellipsis when there are hidden page ranges
- Normalizes to at least one page (`1 of 1`) for empty results

### Record Range

- Displays `start-end of total` when `total > 0`
- Displays `1 of 1` when `total === 0`

### URL Query Params

- Uses `react-router` navigation when `callback` is not provided
- Updates `page` and `size` params (scoped if `scope` is set)

## Requirements

- `react-router` - Used for URL navigation and location
- Tailwind CSS - Used for styling
- `lucide-react` - Used for pagination icons

## Import Paths

```tsx
// Import component
import { Pagination } from 'tessera-ui/components/pagination'

// Or from main export (if available)
import { Pagination } from 'tessera-ui'
```
