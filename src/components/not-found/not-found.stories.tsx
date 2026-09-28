import type { Meta, StoryObj } from '@storybook/react-vite'
import { withRouter } from 'storybook-addon-remix-react-router'
import { Button } from '../ui/button'
import { NotFound } from './not-found'
import NotFoundDocs from './not-found.mdx'

const meta: Meta<typeof NotFound> = {
  title: 'Information/NotFound',
  component: NotFound,
  decorators: [withRouter],
  parameters: {
    docs: {
      page: NotFoundDocs,
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CustomText: Story = {
  args: {
    title: 'Page not found',
    description: 'The page you are looking for does not exist or has been moved.',
    homeHref: '/dashboard',
    homeLabel: 'Go to Dashboard',
  },
}

export const CustomImage: Story = {
  args: {
    image: 'https://placehold.co/600x400',
  },
}

export const CustomStyle: Story = {
  args: {
    image: 'https://placehold.co/600x400',
    className: 'h-[500px] bg-transparent',
    imageClassName: 'w-48 rounded-full',
  },
}

export const CustomAction: Story = {
  args: {
    children: (
      <Button variant="outline" onClick={() => window.history.back()}>
        Go Back
      </Button>
    ),
  },
}
