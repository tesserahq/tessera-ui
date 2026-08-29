import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { TagsInput } from './tags-input'
import TagsInputDocs from './tags-input.mdx'

const meta: Meta<typeof TagsInput> = {
  title: 'Form/TagsInput',
  component: TagsInput,
  parameters: {
    layout: 'centered',
    docs: {
      page: TagsInputDocs,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])
    return <TagsInput value={tags} onChange={setTags} />
  },
}

export const WithInitialTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['newsletter', 'vip'])
    return <TagsInput value={tags} onChange={setTags} />
  },
}

export const CustomPlaceholder: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>([])
    return <TagsInput value={tags} onChange={setTags} placeholder="Type and press Enter..." />
  },
}

export const Disabled: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['broadcast', 'campaign:ab12cd34'])
    return <TagsInput value={tags} onChange={setTags} disabled />
  },
}
