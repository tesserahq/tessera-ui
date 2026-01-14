# DateTime Component

The `DateTime` component provides a comprehensive date and time display with timezone support and a detailed tooltip showing multiple date formats. It automatically detects the user's browser timezone and provides utilities for formatting dates in various timezones.

## Features

- **Timezone Support**: Automatically detects browser timezone or accepts custom timezone
- **Multiple Formats**: Customizable date format using date-fns format strings
- **Rich Tooltip**: Displays UTC, timezone-specific, relative time, and timestamp on hover
- **Relative Time**: Always shows relative time (e.g., "2 months ago") regardless of date distance
- **UTC Handling**: Automatically handles UTC dates and converts them to specified timezones
- **Accessible**: Uses semantic `<time>` element with tooltip for additional information

## Usage

### Basic Example

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function PostCard({ post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>
        Created: <DateTime date={post.createdAt} />
      </p>
    </div>
  );
}
```

### With Custom Format

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function EventCard({ event }) {
  return (
    <div>
      <h2>{event.name}</h2>
      <DateTime
        date={event.startTime}
        formatStr="EEEE, MMMM dd, yyyy 'at' HH:mm"
      />
    </div>
  );
}
```

### With Custom Timezone

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function GlobalEvent({ event }) {
  return (
    <div>
      <h2>{event.name}</h2>
      <DateTime
        date={event.startTime}
        timezone="America/Los_Angeles"
        formatStr="MMM dd, yyyy HH:mm:ss"
      />
    </div>
  );
}
```

### With Timezone Display

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function ScheduledMeeting({ meeting }) {
  return (
    <div>
      <h2>{meeting.title}</h2>
      <DateTime
        date={meeting.scheduledTime}
        timezone="America/New_York"
        showTimezone={true}
      />
    </div>
  );
}
```

### Using Format Functions Directly

```tsx
import {
  formatDateTime,
  getRelativeTime,
} from "tessera-ui/components/datetime";

function CustomDateDisplay({ date }) {
  const formatted = formatDateTime(
    date,
    "MMM dd, yyyy HH:mm",
    "America/New_York",
    true
  );
  const relative = getRelativeTime(new Date(date));

  return (
    <div>
      <p>Formatted: {formatted}</p>
      <p>Relative: {relative}</p>
    </div>
  );
}
```

## Props

### `DateTime`

| Prop           | Type             | Required | Default                   | Description                                                             |
| -------------- | ---------------- | -------- | ------------------------- | ----------------------------------------------------------------------- |
| `date`         | `string \| Date` | Yes      | -                         | The date to display (string or Date object)                             |
| `formatStr`    | `string`         | No       | `"MMM dd, yyyy HH:mm:ss"` | Date format string using date-fns format tokens                         |
| `timezone`     | `string`         | No       | Browser timezone          | IANA timezone string (e.g., "America/New_York", "UTC", "Europe/London") |
| `showTimezone` | `boolean`        | No       | `false`                   | Whether to append timezone abbreviation to the formatted date           |
| `className`    | `string`         | No       | -                         | Additional CSS classes for the time element                             |

## Exported Functions

### `formatDateTime`

Formats a date string or Date object according to the specified format and timezone.

```tsx
formatDateTime(
  date: string | Date,
  formatStr?: string,
  timezone: string,
  showTimezone?: boolean
): string
```

**Parameters:**

- `date`: The date to format (string or Date object)
- `formatStr`: Format string using date-fns tokens (default: `"MMM dd, yyyy HH:mm:ss"`)
- `timezone`: IANA timezone string (required)
- `showTimezone`: Whether to append timezone abbreviation (default: `false`)

**Returns:** Formatted date string

**Example:**

```tsx
const formatted = formatDateTime(
  "2024-01-15T10:30:00Z",
  "MMM dd, yyyy HH:mm",
  "America/New_York",
  true
);
// Returns: "Jan 15, 2024 05:30 (EST)"
```

### `getRelativeTime`

Gets a relative time string (e.g., "2 months ago", "in 3 days").

```tsx
getRelativeTime(date: Date): string
```

**Parameters:**

- `date`: Date object or string

**Returns:** Relative time string with suffix (e.g., "2 months ago")

**Example:**

```tsx
const relative = getRelativeTime(new Date("2024-01-01"));
// Returns: "2 months ago" (if current date is March 2024)
```

## Tooltip Information

When hovering over the DateTime component, a tooltip displays:

1. **UTC**: The date formatted in UTC timezone
2. **Timezone**: The date formatted in the specified timezone (or browser timezone)
3. **Relative**: Relative time string (e.g., "2 months ago")
4. **Timestamp**: Unix timestamp in milliseconds

## Date Parsing

The component automatically handles date strings:

- If a date string doesn't end with 'Z' or 'z', it appends 'Z' to indicate UTC
- Date strings ending with 'Z' or 'z' are treated as UTC
- Date objects are used as-is

**Examples:**

- `"2024-01-15T10:30:00"` → Treated as `"2024-01-15T10:30:00Z"` (UTC)
- `"2024-01-15T10:30:00Z"` → Treated as UTC
- `new Date("2024-01-15")` → Used directly

## Timezone Detection

The component automatically detects the user's browser timezone using `Intl.DateTimeFormat().resolvedOptions().timeZone`. If detection fails, it falls back to `"America/New_York"`.

## Format String Reference

The `formatStr` prop uses date-fns format tokens. Common examples:

- `"MMM dd, yyyy"` → "Jan 15, 2024"
- `"MMM dd, yyyy HH:mm"` → "Jan 15, 2024 10:30"
- `"MMM dd, yyyy HH:mm:ss"` → "Jan 15, 2024 10:30:45"
- `"EEEE, MMMM dd, yyyy"` → "Monday, January 15, 2024"
- `"yyyy-MM-dd"` → "2024-01-15"

See [date-fns format documentation](https://date-fns.org/docs/format) for complete token reference.

## Requirements

- `date-fns` - Required for date formatting
- `date-fns-tz` - Required for timezone support
- `lucide-react` - Required for icons (if used in parent components)
- Tailwind CSS - Required for styling
- Radix UI Tooltip - Required for tooltip functionality

## Examples

### Displaying Post Timestamps

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h3>{post.title}</h3>
          <DateTime date={post.createdAt} />
        </li>
      ))}
    </ul>
  );
}
```

### Event Schedule with Multiple Timezones

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function EventSchedule({ event }) {
  return (
    <div>
      <h2>{event.name}</h2>
      <div>
        <p>
          New York:{" "}
          <DateTime date={event.startTime} timezone="America/New_York" />
        </p>
        <p>
          London: <DateTime date={event.startTime} timezone="Europe/London" />
        </p>
        <p>
          Tokyo: <DateTime date={event.startTime} timezone="Asia/Tokyo" />
        </p>
      </div>
    </div>
  );
}
```

### Custom Styled DateTime

```tsx
import { DateTime } from "tessera-ui/components/datetime";

function StyledDateTime({ date }) {
  return (
    <DateTime date={date} className="text-lg font-semibold text-blue-600" />
  );
}
```

## Notes

- The component always shows relative time in the tooltip, even for dates more than 1 month old
- UTC dates are automatically detected and handled correctly
- The default format includes seconds (`HH:mm:ss`)
- Timezone abbreviations are shown in the tooltip (e.g., "EST", "PST")
- The tooltip uses custom CSS classes (`d-list`, `d-item`, `d-label`, `d-content`) for styling

## Import Paths

```tsx
// Import component
import { DateTime } from "tessera-ui/components/datetime";

// Import utility functions
import {
  formatDateTime,
  getRelativeTime,
} from "tessera-ui/components/datetime";

// Or from main export (if available)
import { DateTime, formatDateTime, getRelativeTime } from "tessera-ui";
```
