import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './pagination'
import { withRouter } from 'storybook-addon-remix-react-router';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  decorators: [withRouter],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    meta: {
      page: 1,
      pages: 5,
      size: 25,
      total: 120,
    },
  },
}

export const MiddlePage: Story = {
  args: {
    meta: {
      page: 3,
      pages: 8,
      size: 25,
      total: 200,
    },
  },
}

export const ManyPages: Story = {
  args: {
    meta: {
      page: 10,
      pages: 24,
      size: 25,
      total: 580,
    },
  },
}

export const EmptyResults: Story = {
  args: {
    meta: {
      page: 1,
      pages: 0,
      size: 25,
      total: 0,
    },
  },
}
