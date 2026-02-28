import type { Preview } from '@storybook/react-vite'
import '@/index.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Docs Overview', '*'],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
