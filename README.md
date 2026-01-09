# Tessera UI

**Tessera UI** is a reusable component library designed to ensure UI consistency across multiple applications. This project provides a centralized collection of shared, styled, and customizable UI components to accelerate development and maintain a uniform look and feel.

## Development

Install dependencies:

```shellscript
bun install
```

Run storybook:

```shellscript
bun storybook
```

## Setup and install

```shellscript
bun install git+https://github.com/estate-buddy-tech/core-ui.git
```

Add config in tailwind.config.ts

```shellscript
content: [
  './node_modules/core-ui/src/**/*.{js,jsx,ts,tsx}',
],
```

Import in your App

```shellscript
import ProfileMenu from 'core-ui'
```
