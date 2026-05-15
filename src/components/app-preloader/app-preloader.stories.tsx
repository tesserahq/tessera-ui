import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppPreloader } from './app-preloader'
import AppPreloaderDocs from './app-preloader.mdx'

const meta: Meta<typeof AppPreloader> = {
  title: 'Feedback/AppPreloader',
  component: AppPreloader,
  parameters: {
    docs: {
      page: AppPreloaderDocs,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithCustomClass: Story = {
  args: {
    className: 'h-64 w-64 border border-dashed rounded-lg',
  },
}

export const FullScreen: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100vw' }}>
        <Story />
      </div>
    ),
  ],
}
