# ResourceID Component

The `ResourceID` component displays a resource identifier in a compact, monospaced “pill”, with an optional copy-to-clipboard action.

## Features

- **Compact display**: Truncates long IDs to a configurable length
- **Full value tooltip**: Hover the value to see the complete ID (when `value` is set)
- **Copy action**: Copy button with success/failure feedback
- **Hover behavior**: Optionally show the copy button only on hover/focus
- **Accessible**: Copy button includes an `aria-label`

## Usage

### Basic Example

```tsx
import { ResourceID } from 'tessera-ui/components/resource-id'

export function Row({ id }: { id: string }) {
  return <ResourceID value={id} />
}
```

### Custom truncation

```tsx
import { ResourceID } from 'tessera-ui/components/resource-id'

export function Row({ id }: { id: string }) {
  return <ResourceID value={id} truncate={12} />
}
```

### Always show the copy button

```tsx
import { ResourceID } from 'tessera-ui/components/resource-id'

export function Row({ id }: { id: string }) {
  return <ResourceID value={id} showCopyOnHover={false} />
}
```

## Props

### `ResourceID`

| Prop                     | Type             | Required | Default | Description                          |
| ------------------------ | ---------------- | -------- | ------- | ------------------------------------ |
| `value`                  | `string \| null` | No       | -       | Full identifier to display and copy  |
| `truncate`               | `number`         | No       | `8`     | Number of characters to show         |
| `showCopyOnHover`        | `boolean`        | No       | `true`  | Show copy button only on hover/focus |
| `copyFeedbackDurationMs` | `number`         | No       | `2000`  | How long to show copy feedback (ms)  |

`ResourceID` also accepts standard HTML attributes for a `span` (e.g. `className`).

## Behavior

- When `value` is empty/null, the copy action is disabled and the full-value tooltip is omitted.
- The value tooltip shows the full `value`; the rendered text shows the truncated value.
- After clicking copy, the icon/tooltip briefly changes to reflect success/failure, then resets.

## Requirements

- Tailwind CSS - Used for styling
- `lucide-react` - Used for copy/feedback icons
- Radix UI Tooltip - Used for tooltips

## Import Paths

```tsx
// Import component
import { ResourceID } from 'tessera-ui/components/resource-id'

// Or from the components barrel export
import { ResourceID } from 'tessera-ui/components'
```
