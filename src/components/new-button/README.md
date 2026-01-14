# NewButton Component

The `NewButton` component provides a standardized "New" button with a plus icon and tooltip. It's designed for consistent creation actions throughout the application, such as creating new items, documents, or entries.

## Features

- **Consistent Design**: Standardized "New" button with plus icon
- **Tooltip Support**: Helpful tooltip on hover showing the action label
- **Flexible Sizing**: Supports multiple button sizes
- **Disabled State**: Built-in disabled state support
- **Accessible**: Uses Radix UI Tooltip for accessibility
- **Customizable**: Accepts custom onClick handler and styling

## Usage

### Basic Example

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function ProjectHeader({ onCreateProject }) {
  return (
    <div className="flex items-center justify-between">
      <h1>Projects</h1>
      <NewButton label="Create a new project" onClick={onCreateProject} />
    </div>
  );
}
```

### With Different Sizes

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function Toolbar() {
  return (
    <div className="flex gap-2">
      <NewButton label="Create item" onClick={handleCreate} size="sm" />
      <NewButton label="Create item" onClick={handleCreate} size="default" />
      <NewButton label="Create item" onClick={handleCreate} size="lg" />
    </div>
  );
}
```

### With Disabled State

```tsx
import { useState } from "react";
import { NewButton } from "tessera-ui/components/new-button";

function CreateForm({ onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NewButton
      label="Create new item"
      onClick={handleCreate}
      disabled={isSubmitting}
    />
  );
}
```

### In a Table Header

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function DataTable({ data, onCreate }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2>Items</h2>
        <NewButton label="Add new item to the list" onClick={onCreate} />
      </div>
      <table>{/* Table content */}</table>
    </div>
  );
}
```

### With Permission Check

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function ItemList({ items, userPermissions, onCreate }) {
  const canCreate = userPermissions.includes("create");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Items</h1>
        {canCreate && (
          <NewButton label="Create a new item" onClick={onCreate} />
        )}
      </div>
      {/* Item list */}
    </div>
  );
}
```

## Props

### `NewButton`

| Prop       | Type                                                               | Required | Default     | Description                    |
| ---------- | ------------------------------------------------------------------ | -------- | ----------- | ------------------------------ |
| `label`    | `string`                                                           | Yes      | -           | Tooltip text shown on hover    |
| `onClick`  | `() => void`                                                       | Yes      | -           | Click handler function         |
| `size`     | `"sm" \| "lg" \| "default" \| "xs" \| "icon" \| null \| undefined` | No       | `"default"` | Button size variant            |
| `disabled` | `boolean`                                                          | No       | `false`     | Whether the button is disabled |

## Button Sizes

The component supports the following size options (passed to the underlying Button component):

- `"xs"` - Extra small
- `"sm"` - Small
- `"default"` - Default size
- `"lg"` - Large
- `"icon"` - Icon-only size

## Behavior

### Tooltip

- Appears on hover with a 100ms delay (`delayDuration={100}`)
- Positioned at the bottom of the button
- Shows the `label` prop text
- Uses Radix UI Tooltip for accessibility

### Button Content

- Plus icon (`<Plus />`) from lucide-react
- "New" text with semibold font weight
- Icon and text are displayed side by side

### Click Handling

- Calls the `onClick` prop when clicked
- Respects the `disabled` state
- No default behavior (e.g., form submission)

## Requirements

- `lucide-react` - Required for Plus icon
- Tailwind CSS - Required for styling
- Radix UI Tooltip - Required for tooltip functionality
- Radix UI Button - Required for button component

## Examples

### In a Card Header

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function Card({ title, onCreate }) {
  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3>{title}</h3>
        <NewButton
          label={`Create new ${title.toLowerCase()}`}
          onClick={onCreate}
          size="sm"
        />
      </div>
      <div className="card-content">{/* Card content */}</div>
    </div>
  );
}
```

### Multiple New Buttons

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function Dashboard({ onCreateProject, onCreateTask, onCreateNote }) {
  return (
    <div className="dashboard">
      <div className="grid grid-cols-3 gap-4">
        <div className="card">
          <h3>Projects</h3>
          <NewButton label="Create new project" onClick={onCreateProject} />
        </div>
        <div className="card">
          <h3>Tasks</h3>
          <NewButton label="Create new task" onClick={onCreateTask} />
        </div>
        <div className="card">
          <h3>Notes</h3>
          <NewButton label="Create new note" onClick={onCreateNote} />
        </div>
      </div>
    </div>
  );
}
```

### With Loading State

```tsx
import { useState } from "react";
import { NewButton } from "tessera-ui/components/new-button";

function CreateButton({ onCreate }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onCreate();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NewButton
      label="Create new item"
      onClick={handleClick}
      disabled={isLoading}
    />
  );
}
```

### With Confirmation

```tsx
import { useState } from "react";
import { NewButton } from "tessera-ui/components/new-button";

function CreateWithConfirmation({ onCreate }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (showConfirm) {
      onCreate();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <NewButton
      label={showConfirm ? "Click again to confirm" : "Create new item"}
      onClick={handleClick}
    />
  );
}
```

### In a Sidebar

```tsx
import { NewButton } from "tessera-ui/components/new-button";

function Sidebar({ onCreateItem }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Items</h2>
        <NewButton label="Add new item" onClick={onCreateItem} size="sm" />
      </div>
      {/* Sidebar content */}
    </aside>
  );
}
```

## Styling

The button uses the default Button component styling with:

- Plus icon from lucide-react
- "New" text with `font-semibold` class
- Tooltip positioned at the bottom
- Standard button hover and focus states

## Accessibility

- Uses Radix UI Tooltip which provides:
  - Keyboard navigation support
  - ARIA attributes
  - Focus management
  - Screen reader announcements
- Button respects `disabled` state for accessibility
- Tooltip provides additional context for screen readers

## Notes

- The tooltip delay is set to 100ms for quick feedback
- The "New" text is always displayed (not just an icon)
- The component wraps the Button in a TooltipProvider
- Size prop is passed directly to the underlying Button component
- The label prop is used exclusively for the tooltip, not button text

## Import Paths

```tsx
// Import component
import { NewButton } from "tessera-ui/components/new-button";

// Or from main export (if available)
import { NewButton } from "tessera-ui";
```
