import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import DeleteConfirmation, { type DeleteConfirmationHandle } from './delete-confirmation'
import { Button } from '../ui/button'

const meta: Meta<typeof DeleteConfirmation> = {
  title: 'Components/DeleteConfirmation',
  component: DeleteConfirmation,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof meta>

// Wrapper component for stories that need ref control
function DeleteConfirmationWrapper({
  config,
  defaultConfig,
  triggerLabel = 'Delete Item',
}: {
  config?: {
    title: string
    description: string
    onDelete: () => void | Promise<void>
    isLoading?: boolean
  }
  defaultConfig?: {
    title: string
    description: string
    onDelete: () => void | Promise<void>
    isLoading?: boolean
  }
  triggerLabel?: string
}) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null)

  const handleDeleteClick = () => {
    deleteRef.current?.open(
      config || {
        title: 'Delete Item?',
        description: 'Are you sure you want to delete this item? This action cannot be undone.',
        onDelete: async () => {
          console.log('Item deleted')
          deleteRef.current?.close()
        },
      }
    )
  }

  return (
    <>
      <Button onClick={handleDeleteClick} variant="destructive">
        {triggerLabel}
      </Button>
      <DeleteConfirmation ref={deleteRef} defaultConfig={defaultConfig} />
    </>
  )
}

export const Default: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: 'Delete Item?',
        description: 'Are you sure you want to delete this item? This action cannot be undone.',
        onDelete: async () => {
          console.log('Item deleted')
        },
      }}
    />
  ),
}

export const WithLoadingState: Story = {
  render: () => {
    const DeleteWithLoading = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null)
      const [isDeleting, setIsDeleting] = useState(false)

      const handleDelete = async () => {
        setIsDeleting(true)
        deleteRef.current?.updateConfig({ isLoading: true })

        // Simulate async delete operation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log('Item deleted')
        setIsDeleting(false)
        deleteRef.current?.updateConfig({ isLoading: false })
        deleteRef.current?.close()
      }

      const handleClick = () => {
        deleteRef.current?.open({
          title: 'Delete Item?',
          description: 'Are you sure you want to delete this item? This action cannot be undone.',
          onDelete: handleDelete,
          isLoading: isDeleting,
        })
      }

      return (
        <>
          <Button onClick={handleClick} variant="destructive">
            Delete Item
          </Button>
          <DeleteConfirmation ref={deleteRef} />
        </>
      )
    }

    return <DeleteWithLoading />
  },
}

export const LongDescription: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: 'Delete Complex Item?',
        description:
          'This action will permanently delete this item and all of its associated data, including related records, attachments, comments, and history. This operation cannot be undone and may take several minutes to complete. Are you absolutely sure you want to proceed?',
        onDelete: async () => {
          console.log('Complex item deleted')
        },
      }}
    />
  ),
}

export const ShortDescription: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: 'Delete?',
        description: 'This action cannot be undone.',
        onDelete: async () => {
          console.log('Item deleted')
        },
      }}
    />
  ),
}
