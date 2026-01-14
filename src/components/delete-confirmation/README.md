# DeleteConfirmation Component

The `DeleteConfirmation` component provides a reusable dialog for confirming destructive delete actions. It uses an imperative handle pattern, allowing parent components to programmatically open and control the dialog with dynamic configuration.

## Features

- **Imperative Handle API**: Control the dialog programmatically via ref
- **Dynamic Configuration**: Update title, description, and delete handler on-the-fly
- **Loading State**: Built-in loading state with spinner during delete operation
- **Destructive Styling**: Visual emphasis with red accent border and trash icon
- **Accessible**: Built on Radix UI Dialog primitives for accessibility
- **Flexible**: Supports both controlled and uncontrolled usage patterns

## Usage

### Basic Example with useRef

```tsx
import { useRef } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";
import { Button } from "tessera-ui/components/ui/button";

function ItemList({ items, onDelete }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);

  const handleDeleteClick = (itemId: string, itemName: string) => {
    deleteRef.current?.open({
      title: `Delete ${itemName}?`,
      description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      onDelete: async () => {
        await onDelete(itemId);
        deleteRef.current?.close();
      },
    });
  };

  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <Button onClick={() => handleDeleteClick(item.id, item.name)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
      <DeleteConfirmation ref={deleteRef} />
    </>
  );
}
```

### With Loading State

```tsx
import { useRef, useState } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";

function DeleteItem({ itemId, onDelete }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    deleteRef.current?.updateConfig({ isLoading: true });

    try {
      await onDelete(itemId);
      deleteRef.current?.close();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
      deleteRef.current?.updateConfig({ isLoading: false });
    }
  };

  const openDialog = () => {
    deleteRef.current?.open({
      title: "Delete Item?",
      description: "This action cannot be undone.",
      onDelete: handleDelete,
      isLoading: isDeleting,
    });
  };

  return (
    <>
      <button onClick={openDialog}>Delete</button>
      <DeleteConfirmation ref={deleteRef} />
    </>
  );
}
```

### With Default Configuration

```tsx
import { useRef } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";

function ProductList({ products, onDeleteProduct }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);

  const defaultConfig = {
    title: "Delete Product?",
    description: "Are you sure you want to delete this product?",
    onDelete: async () => {},
  };

  const handleDelete = (productId: string) => {
    deleteRef.current?.open({
      ...defaultConfig,
      onDelete: async () => {
        await onDeleteProduct(productId);
        deleteRef.current?.close();
      },
    });
  };

  return (
    <>
      {/* Product list */}
      <DeleteConfirmation ref={deleteRef} defaultConfig={defaultConfig} />
    </>
  );
}
```

### Updating Configuration Dynamically

```tsx
import { useRef } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";

function DynamicDelete({ item }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);

  const handleDeleteClick = () => {
    deleteRef.current?.open({
      title: `Delete ${item.name}?`,
      description: `This will permanently delete "${item.name}" and all associated data.`,
      onDelete: async () => {
        // Update description during deletion
        deleteRef.current?.updateConfig({
          description: "Deleting... Please wait.",
          isLoading: true,
        });

        await deleteItem(item.id);

        deleteRef.current?.close();
      },
    });
  };

  return (
    <>
      <button onClick={handleDeleteClick}>Delete</button>
      <DeleteConfirmation ref={deleteRef} />
    </>
  );
}
```

## Props

### `DeleteConfirmation`

| Prop            | Type                       | Required | Default | Description                                   |
| --------------- | -------------------------- | -------- | ------- | --------------------------------------------- |
| `defaultConfig` | `DeleteConfirmationConfig` | No       | -       | Default configuration for the dialog          |
| `ref`           | `DeleteConfirmationHandle` | Yes      | -       | Ref object to control the dialog imperatively |

### `DeleteConfirmationConfig`

| Property      | Type                          | Required | Description                                                 |
| ------------- | ----------------------------- | -------- | ----------------------------------------------------------- |
| `title`       | `string`                      | Yes      | Title text displayed in the dialog                          |
| `description` | `string`                      | Yes      | Description text displayed below the title                  |
| `onDelete`    | `() => void \| Promise<void>` | Yes      | Function called when user confirms deletion (can be async)  |
| `isLoading`   | `boolean`                     | No       | Whether the delete operation is in progress (shows spinner) |

## Imperative Handle API

The component exposes the following methods via ref:

### `open(config?: DeleteConfirmationConfig)`

Opens the dialog with optional configuration. If `config` is provided, it updates the dialog configuration before opening.

```tsx
deleteRef.current?.open({
  title: "Delete Item?",
  description: "This action cannot be undone.",
  onDelete: async () => {
    await deleteItem();
    deleteRef.current?.close();
  },
});
```

### `close()`

Closes the dialog.

```tsx
deleteRef.current?.close();
```

### `updateConfig(updates: Partial<DeleteConfirmationConfig>)`

Updates the dialog configuration without opening/closing it. Useful for updating loading state or messages during async operations.

```tsx
deleteRef.current?.updateConfig({
  isLoading: true,
  description: "Deleting... Please wait.",
});
```

## Behavior

### Dialog State

- The dialog is controlled via the imperative handle API
- Opens when `open()` is called
- Closes when:
  - `close()` is called
  - User clicks "Cancel"
  - User clicks outside the dialog (if enabled)
  - Delete operation completes (if handled in `onDelete`)

### Delete Action

- The `onDelete` callback is called when user clicks "Confirm"
- Supports both synchronous and asynchronous operations
- The "Confirm" button is disabled when `isLoading` is `true`
- Shows a spinner and "Deleting..." text during loading state

### Visual Design

- Red accent border at the top (`border-t-destructive`)
- Large trash icon in a circular red background
- Centered title and description
- Full-width buttons in footer
- Responsive layout

## Accessibility

The component is built on Radix UI's `Dialog` primitive, which provides:

- Keyboard navigation support (ESC to close)
- Focus management
- ARIA attributes
- Screen reader announcements
- Focus trap within dialog

## Requirements

- `react` - Required for React hooks and forwardRef
- `lucide-react` - Required for Trash2 and Loader2 icons
- Tailwind CSS - Required for styling
- Radix UI Dialog - Required for dialog functionality
- Radix UI Button - Required for button components

## Examples

### Multiple Items with Shared Dialog

```tsx
import { useRef } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";

function ItemManager({ items, onDelete }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDeleteClick = (itemId: string, itemName: string) => {
    setItemToDelete(itemId);
    deleteRef.current?.open({
      title: `Delete ${itemName}?`,
      description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
      onDelete: async () => {
        if (itemToDelete) {
          await onDelete(itemToDelete);
          setItemToDelete(null);
          deleteRef.current?.close();
        }
      },
    });
  };

  return (
    <>
      <div>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleDeleteClick(item.id, item.name)}
          >
            Delete {item.name}
          </button>
        ))}
      </div>
      <DeleteConfirmation ref={deleteRef} />
    </>
  );
}
```

### With Error Handling

```tsx
import { useRef, useState } from "react";
import DeleteConfirmation, {
  DeleteConfirmationHandle,
} from "tessera-ui/components/delete-confirmation";

function SafeDelete({ item, onDelete }) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setError(null);
    deleteRef.current?.updateConfig({ isLoading: true });

    try {
      await onDelete(item.id);
      deleteRef.current?.close();
    } catch (err) {
      setError("Failed to delete item. Please try again.");
      deleteRef.current?.updateConfig({
        isLoading: false,
        description: `Error: ${err.message}. Please try again.`,
      });
    }
  };

  const openDialog = () => {
    setError(null);
    deleteRef.current?.open({
      title: `Delete ${item.name}?`,
      description: "This action cannot be undone.",
      onDelete: handleDelete,
      isLoading: false,
    });
  };

  return (
    <>
      <button onClick={openDialog}>Delete</button>
      {error && <div className="error">{error}</div>}
      <DeleteConfirmation ref={deleteRef} />
    </>
  );
}
```

## Notes

- The component uses `forwardRef` to expose imperative methods
- The dialog title is visually hidden but present for accessibility
- The trash icon size is set to 100px but may appear smaller due to container constraints
- Description text supports long content with text wrapping and ellipsis
- Both Cancel and Confirm buttons are full-width for better mobile UX
- The component doesn't manage its own loading state - you must update `isLoading` via `updateConfig`

## Import Paths

```tsx
// Import component and types
import DeleteConfirmation, {
  DeleteConfirmationHandle,
  DeleteConfirmationConfig,
} from "tessera-ui/components/delete-confirmation";

// Or from main export (if available)
import { DeleteConfirmation } from "tessera-ui";
```
