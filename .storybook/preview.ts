import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '@/index.css'
import { Toaster } from '../src/components/toast'

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
