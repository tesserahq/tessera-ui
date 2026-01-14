import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyContent } from "./empty-content";
import { Button } from "../ui/button";

const meta: Meta<typeof EmptyContent> = {
  title: "Components/EmptyContent",
  component: EmptyContent,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "No items found",
    description: "Get started by creating your first item.",
  },
};

export const WithAction: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "No projects yet",
    description: "Create your first project to get started.",
    children: (
      <Button onClick={() => console.log("Create clicked")} variant="black">
        Create Project
      </Button>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "No data available",
    description: "You can either import existing data or start fresh.",
    children: (
      <div className="flex gap-3">
        <Button onClick={() => console.log("Import clicked")}>
          Import Data
        </Button>
        <Button
          variant="outline"
          onClick={() => console.log("Start fresh clicked")}
        >
          Start Fresh
        </Button>
      </div>
    ),
  },
};

export const NoDescription: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "Nothing here",
  },
};

export const LongDescription: Story = {
  args: {
    image: "https://placehold.co/600x400",
    title: "No results found",
    description:
      "We couldn't find any items matching your search criteria. Try adjusting your filters or search terms to see more results.",
    children: (
      <Button
        variant="outline"
        onClick={() => console.log("Clear filters clicked")}
      >
        Clear Filters
      </Button>
    ),
  },
};
