# EmptyContent Component

The `EmptyContent` component displays an empty state with an image, title, optional description, and custom content. It's perfect for showing helpful messages when lists are empty, search results return nothing, or when guiding users to take action.

## Features

- **Visual Image**: Large image display for visual context
- **Flexible Layout**: Responsive layout that adapts to screen size (column on mobile, row on desktop)
- **Custom Content**: Support for custom children (e.g., action buttons)
- **Animated**: Slide-up animation for smooth appearance
- **Accessible**: Semantic HTML structure
- **Dark Mode Support**: Built-in dark mode styling

## Usage

### Basic Example

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";

function EmptyList() {
  return (
    <EmptyContent
      image="/images/empty-folder.svg"
      title="No items found"
      description="Get started by creating your first item."
    />
  );
}
```

### With Action Button

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";

function EmptyProjects({ onCreateProject }) {
  return (
    <EmptyContent
      image="/images/empty-projects.svg"
      title="No projects yet"
      description="Create your first project to get started with organizing your work."
    >
      <Button onClick={onCreateProject}>Create Project</Button>
    </EmptyContent>
  );
}
```

### With Multiple Actions

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";

function EmptySearchResults({ onClearSearch, onNewSearch }) {
  return (
    <EmptyContent
      image="/images/no-results.svg"
      title="No results found"
      description="Try adjusting your search terms or filters."
    >
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClearSearch}>
          Clear Search
        </Button>
        <Button onClick={onNewSearch}>New Search</Button>
      </div>
    </EmptyContent>
  );
}
```

### Without Description

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";

function SimpleEmpty() {
  return <EmptyContent image="/images/empty-state.svg" title="Nothing here" />;
}
```

### With Custom Content

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";
import { Link } from "react-router-dom";

function EmptyDashboard({ userId }) {
  return (
    <EmptyContent
      image="/images/empty-dashboard.svg"
      title="Welcome to your dashboard"
      description="Start by exploring our features or creating your first item."
    >
      <div className="flex flex-col gap-3">
        <Button asChild>
          <Link to="/tutorial">View Tutorial</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/create">Create Item</Link>
        </Button>
      </div>
    </EmptyContent>
  );
}
```

## Props

### `EmptyContent`

| Prop          | Type              | Required | Description                                      |
| ------------- | ----------------- | -------- | ------------------------------------------------ |
| `image`       | `string`          | Yes      | URL or path to the image to display              |
| `title`       | `string`          | Yes      | Main title text                                  |
| `description` | `string`          | No       | Optional description text below the title        |
| `children`    | `React.ReactNode` | No       | Custom content to display (e.g., action buttons) |

## Layout Behavior

### Mobile (< lg breakpoint)

- **Layout**: Vertical (column)
- **Image**: Full width, displayed above content
- **Content**: Centered alignment

### Desktop (≥ lg breakpoint)

- **Layout**: Horizontal (row)
- **Image**: Fixed width (320px / `w-80`)
- **Content**: Left-aligned text, centered items
- **Height**: Minimum height of 500px (`lg:h-[500px]`)

## Styling

### Image

- Width: 320px (`w-80`)
- Rounded corners (`rounded-lg`)
- Responsive sizing

### Title

- Font size: 3xl (`text-3xl`)
- Font weight: Semibold (`font-semibold`)
- Dark mode support with `dark:text-foreground`
- Margin top: 3 units (`mt-3`)

### Description

- Font size: Base (`text-base`)
- Opacity: 70% (`opacity-70`)
- Margin top: 1 unit (`mt-1`)
- Dark mode support

### Container

- Full width and height (`w-full h-full`)
- Flexbox layout with gap of 5 units (`gap-5`)
- Slide-up animation (`animate-slide-up`)
- Centered content alignment

## Animation

The component includes a slide-up animation (`animate-slide-up`) that triggers when the component mounts. Ensure this animation is defined in your CSS/Tailwind configuration.

## Requirements

- Tailwind CSS - Required for styling
- React - Required for React components

## Examples

### Empty Search State

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";

function SearchResults({ query, onClearSearch }) {
  if (results.length === 0) {
    return (
      <EmptyContent
        image="/images/search-empty.svg"
        title={`No results for "${query}"`}
        description="Try different keywords or check your spelling."
      >
        <Button onClick={onClearSearch}>Clear Search</Button>
      </EmptyContent>
    );
  }

  return <ResultsList results={results} />;
}
```

### Empty List with Create Action

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";
import { Plus } from "lucide-react";

function TaskList({ tasks, onCreateTask }) {
  if (tasks.length === 0) {
    return (
      <EmptyContent
        image="/images/empty-tasks.svg"
        title="No tasks yet"
        description="Create your first task to start organizing your work."
      >
        <Button onClick={onCreateTask}>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </EmptyContent>
    );
  }

  return <TaskListItems tasks={tasks} />;
}
```

### Empty State with Multiple Options

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";
import { Button } from "tessera-ui/components/ui/button";

function EmptyWorkspace({ onImport, onCreate, onBrowse }) {
  return (
    <EmptyContent
      image="/images/empty-workspace.svg"
      title="Your workspace is empty"
      description="Get started by importing existing content, creating something new, or browsing templates."
    >
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Button onClick={onCreate} className="w-full">
          Create New
        </Button>
        <Button variant="outline" onClick={onImport} className="w-full">
          Import
        </Button>
        <Button variant="ghost" onClick={onBrowse} className="w-full">
          Browse Templates
        </Button>
      </div>
    </EmptyContent>
  );
}
```

### Conditional Empty State

```tsx
import { EmptyContent } from "tessera-ui/components/empty-content";

function DataTable({ data, isLoading, error }) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <EmptyContent
        image="/images/error.svg"
        title="Something went wrong"
        description={error.message}
      />
    );
  }

  if (data.length === 0) {
    return (
      <EmptyContent
        image="/images/empty-data.svg"
        title="No data available"
        description="Data will appear here once available."
      />
    );
  }

  return <Table data={data} />;
}
```

## Image Recommendations

### Best Practices

- Use SVG images for crisp scaling at any size
- Recommended size: 400-600px width for raster images
- Use illustrations that match your brand style
- Consider dark mode variants if needed
- Keep file sizes optimized for web

### Common Empty State Images

- Empty folder/box illustrations
- Magnifying glass for search
- Document/page illustrations
- Shopping cart for e-commerce
- Calendar for scheduling
- User/avatar for profiles

## Notes

- The component uses semantic HTML for accessibility
- Image alt text is automatically set to the title prop
- Children are rendered below the description with margin top of 5 units
- The component is fully responsive and adapts layout based on screen size
- Dark mode styles are included for title and description
- The slide-up animation should be defined in your global CSS or Tailwind config

## Import Paths

```tsx
// Import component
import { EmptyContent } from "tessera-ui/components/empty-content";

// Or from main export (if available)
import { EmptyContent } from "tessera-ui";
```
