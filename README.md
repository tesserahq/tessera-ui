# Tessera UI

**Tessera UI** is a reusable component library designed to ensure UI consistency across multiple applications. This project provides a centralized collection of shared, styled, and customizable UI components to accelerate development and maintain a uniform look and feel.

## Documentation

- [Layouts](./src/components/layouts/README.md) - Layout components for building consistent page structures
- [App Menu](./src/components/app-menu/README.md) - Dropdown menu component for displaying and navigating to multiple applications

## Development

Install dependencies:

```shellscript
bun install
```

Run storybook:

```shellscript
bun storybook
```

### Developing Components for Use in Other Projects

To develop components in this library and use them with hot-reload in another project, see [DEVELOPMENT.md](./src/docs/development.md) for detailed instructions.

Quick start:

1. Link this library: `bun link`
2. In your other project: `bun link tessera-ui`
3. Configure path aliases in your other project to use `tessera-ui` prefix (see [DEVELOPMENT.md](./src/docs/development.md))

**Note:** The package name is `tessera-ui`, but you can import using the cleaner `tessera-ui` prefix thanks to path aliases.

## Setup and install

```shellscript
bun install git+https://github.com/tesserahq/tessera-ui.git
```

### Using with `tessera-ui` Import Prefix

To use `tessera-ui` as your import prefix in other apps, configure path aliases:

#### 1. Configure Vite (vite.config.ts)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tessera-ui": path.resolve(__dirname, "node_modules/tessera-ui/src"),
      // Or if using bun link:
      // "tessera-ui": path.resolve(__dirname, "../tessera-ui/src"),
    },
  },
});
```

#### 2. Configure TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "tessera-ui": ["./node_modules/tessera-ui/src"],
      "tessera-ui/*": ["./node_modules/tessera-ui/src/*"]
    }
  }
}
```

#### 3. Configure Tailwind

Add config in `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tessera-ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
```

Or for Tailwind v4, add to your CSS:

```css
@import "tailwindcss";
@source "./node_modules/tessera-ui/src/**/*.{js,jsx,ts,tsx}";
```

#### 4. Import in your App

```typescript
import { Layout, ProfileMenu, FormField } from "tessera-ui/components/layouts";
import { ProfileMenu } from "tessera-ui";
```
