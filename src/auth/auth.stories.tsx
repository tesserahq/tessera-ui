import type { Meta } from '@storybook/react-vite'
import AuthDocs from './auth.mdx'

const meta: Meta = {
  title: 'Auth/AuthProvider',
  parameters: {
    docs: {
      page: AuthDocs,
    },
  },
}

export default meta
