import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-docs', 'storybook-addon-remix-react-router'],
  framework: '@storybook/react-vite',
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {}

    const existingAlias = viteConfig.resolve.alias
    const aliasArray = Array.isArray(existingAlias)
      ? existingAlias
      : existingAlias
        ? [existingAlias]
        : []

    viteConfig.resolve.alias = [
      ...aliasArray,
      { find: 'storybook/internal/theming', replacement: 'storybook/theming' },
    ]

    return viteConfig
  },
}

export default config
