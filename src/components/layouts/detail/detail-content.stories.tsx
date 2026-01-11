import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailContent } from "./detail-content";

const meta: Meta<typeof DetailContent> = {
  title: "Components/Layouts/DetailLayout/DetailContent",
  component: DetailContent,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Content Area</h1>
        <p className="text-muted-foreground">
          This is the main content area with proper spacing and margins.
        </p>
        <div className="p-4 border rounded-lg">
          <p>Content goes here</p>
        </div>
      </div>
    ),
  },
};

export const WithCards: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Revenue</h3>
            <p className="text-2xl font-bold">$45,678</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Orders</h3>
            <p className="text-2xl font-bold">567</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithForm: Story = {
  args: {
    children: (
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="space-y-4 p-4 border rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Save Changes
          </button>
        </div>
      </div>
    ),
  },
};
