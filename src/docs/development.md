# Development Guide: Using This Library in Another Project

This guide explains how to link `tessera-ui` to another project for development with hot-reload.

## Using Bun Link

### Step 1: Link This Library

In the `tessera-ui` directory:

```bash
bun link
```

### Step 2: Link in Your Other Project

In your other project directory:

```bash
bun link tessera-ui
```

### Step 3: Configure Vite

In your other project's `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tessera-ui": path.resolve(__dirname, "../tessera-ui/src"),
    },
  },
});
```

### Step 4: Configure TypeScript

In your other project's `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@tessera-ui": ["../tessera-ui/src"],
      "@tessera-ui/*": ["../tessera-ui/src/*"]
    }
  }
}
```

### Step 5: Configure Tailwind

In your other project's `tailwind.config.ts`:

```typescript
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../tessera-ui/src/**/*.{js,jsx,ts,tsx}",
  ],
};
```

### Step 6: Install Peer Dependencies

```bash
bun add react react-dom tailwindcss class-variance-authority
```

### Step 7: Import and Use

```typescript
import { ProfileMenu, FormField, CoreUIProvider } from "@tessera-ui";
import { Layout } from "@tessera-ui/components/layouts";
import "@tessera-ui/src/styles/layout.css";
```

## Unlinking

**In your other project:**

```bash
bun unlink tessera-ui
```

**In this library:**

```bash
bun unlink
```
