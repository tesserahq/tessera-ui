import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import DeleteConfirmation, {
  type DeleteConfirmationHandle,
} from "./delete-confirmation";
import { Button } from "../ui/button";

const meta: Meta<typeof DeleteConfirmation> = {
  title: "Components/DeleteConfirmation",
  component: DeleteConfirmation,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Wrapper component for stories that need ref control
function DeleteConfirmationWrapper({
  config,
  defaultConfig,
  triggerLabel = "Delete Item",
}: {
  config?: {
    title: string;
    description: string;
    onDelete: () => void | Promise<void>;
    isLoading?: boolean;
  };
  defaultConfig?: {
    title: string;
    description: string;
    onDelete: () => void | Promise<void>;
    isLoading?: boolean;
  };
  triggerLabel?: string;
}) {
  const deleteRef = useRef<DeleteConfirmationHandle>(null);

  const handleDeleteClick = () => {
    deleteRef.current?.open(
      config || {
        title: "Delete Item?",
        description:
          "Are you sure you want to delete this item? This action cannot be undone.",
        onDelete: async () => {
          console.log("Item deleted");
          deleteRef.current?.close();
        },
      }
    );
  };

  return (
    <>
      <Button onClick={handleDeleteClick} variant="destructive">
        {triggerLabel}
      </Button>
      <DeleteConfirmation ref={deleteRef} defaultConfig={defaultConfig} />
    </>
  );
}

export const Default: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: "Delete Item?",
        description:
          "Are you sure you want to delete this item? This action cannot be undone.",
        onDelete: async () => {
          console.log("Item deleted");
        },
      }}
    />
  ),
};

export const DeleteProject: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      triggerLabel="Delete Project"
      config={{
        title: "Delete Project?",
        description:
          "Are you sure you want to delete this project? All associated data will be permanently removed.",
        onDelete: async () => {
          console.log("Project deleted");
        },
      }}
    />
  ),
};

export const DeleteUser: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      triggerLabel="Delete User"
      config={{
        title: "Delete User Account?",
        description:
          "This will permanently delete the user account and all associated data. This action cannot be undone.",
        onDelete: async () => {
          console.log("User deleted");
        },
      }}
    />
  ),
};

export const WithLoadingState: Story = {
  render: () => {
    const DeleteWithLoading = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null);
      const [isDeleting, setIsDeleting] = useState(false);

      const handleDelete = async () => {
        setIsDeleting(true);
        deleteRef.current?.updateConfig({ isLoading: true });

        // Simulate async delete operation
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Item deleted");
        setIsDeleting(false);
        deleteRef.current?.updateConfig({ isLoading: false });
        deleteRef.current?.close();
      };

      const handleClick = () => {
        deleteRef.current?.open({
          title: "Delete Item?",
          description:
            "Are you sure you want to delete this item? This action cannot be undone.",
          onDelete: handleDelete,
          isLoading: isDeleting,
        });
      };

      return (
        <>
          <Button onClick={handleClick} variant="destructive">
            Delete Item
          </Button>
          <DeleteConfirmation ref={deleteRef} />
        </>
      );
    };

    return <DeleteWithLoading />;
  },
};

export const LongDescription: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: "Delete Complex Item?",
        description:
          "This action will permanently delete this item and all of its associated data, including related records, attachments, comments, and history. This operation cannot be undone and may take several minutes to complete. Are you absolutely sure you want to proceed?",
        onDelete: async () => {
          console.log("Complex item deleted");
        },
      }}
    />
  ),
};

export const ShortDescription: Story = {
  render: () => (
    <DeleteConfirmationWrapper
      config={{
        title: "Delete?",
        description: "This action cannot be undone.",
        onDelete: async () => {
          console.log("Item deleted");
        },
      }}
    />
  ),
};

export const WithDefaultConfig: Story = {
  render: () => {
    const DeleteWithDefault = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null);

      const defaultConfig = {
        title: "Delete Item?",
        description:
          "Are you sure you want to delete this item? This action cannot be undone.",
        onDelete: async () => {
          console.log("Item deleted");
          deleteRef.current?.close();
        },
      };

      const handleClick = () => {
        deleteRef.current?.open();
      };

      return (
        <>
          <Button onClick={handleClick} variant="destructive">
            Delete Item
          </Button>
          <DeleteConfirmation ref={deleteRef} defaultConfig={defaultConfig} />
        </>
      );
    };

    return <DeleteWithDefault />;
  },
};

export const DynamicUpdate: Story = {
  render: () => {
    const DeleteWithDynamicUpdate = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null);

      const handleDelete = async () => {
        // Update description during deletion
        deleteRef.current?.updateConfig({
          description: "Deleting... Please wait.",
          isLoading: true,
        });

        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        deleteRef.current?.updateConfig({
          description: "Item deleted successfully!",
          isLoading: false,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        deleteRef.current?.close();
      };

      const handleClick = () => {
        deleteRef.current?.open({
          title: "Delete Item?",
          description:
            "Are you sure you want to delete this item? This action cannot be undone.",
          onDelete: handleDelete,
        });
      };

      return (
        <>
          <Button onClick={handleClick} variant="destructive">
            Delete Item
          </Button>
          <DeleteConfirmation ref={deleteRef} />
        </>
      );
    };

    return <DeleteWithDynamicUpdate />;
  },
};

export const MultipleItems: Story = {
  render: () => {
    const MultipleDeleteExample = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null);
      const items = [
        { id: 1, name: "Project Alpha" },
        { id: 2, name: "Project Beta" },
        { id: 3, name: "Project Gamma" },
      ];

      const handleDeleteClick = (itemId: number, itemName: string) => {
        deleteRef.current?.open({
          title: `Delete ${itemName}?`,
          description: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
          onDelete: async () => {
            console.log(`Deleted item ${itemId}: ${itemName}`);
            deleteRef.current?.close();
          },
        });
      };

      return (
        <>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded"
              >
                <span>{item.name}</span>
                <Button
                  onClick={() => handleDeleteClick(item.id, item.name)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <DeleteConfirmation ref={deleteRef} />
        </>
      );
    };

    return <MultipleDeleteExample />;
  },
};

export const ErrorHandling: Story = {
  render: () => {
    const DeleteWithError = () => {
      const deleteRef = useRef<DeleteConfirmationHandle>(null);
      const [error, setError] = useState<string | null>(null);

      const handleDelete = async () => {
        setError(null);
        deleteRef.current?.updateConfig({ isLoading: true });

        try {
          // Simulate potential error
          await new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.5) {
                reject(new Error("Failed to delete item"));
              } else {
                resolve(null);
              }
            }, 1500);
          });

          console.log("Item deleted successfully");
          deleteRef.current?.close();
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error occurred";
          setError(errorMessage);
          deleteRef.current?.updateConfig({
            isLoading: false,
            description: `Error: ${errorMessage}. Please try again.`,
          });
        }
      };

      const handleClick = () => {
        setError(null);
        deleteRef.current?.open({
          title: "Delete Item?",
          description:
            "Are you sure you want to delete this item? This action cannot be undone.",
          onDelete: handleDelete,
        });
      };

      return (
        <>
          <div className="flex flex-col gap-2">
            <Button onClick={handleClick} variant="destructive">
              Delete Item (May Fail)
            </Button>
            {error && (
              <div className="text-red-600 text-sm">Error: {error}</div>
            )}
          </div>
          <DeleteConfirmation ref={deleteRef} />
        </>
      );
    };

    return <DeleteWithError />;
  },
};
