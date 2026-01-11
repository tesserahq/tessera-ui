import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { DetailHeader } from "./detail-header";

const meta: Meta<typeof DetailHeader> = {
  title: "Components/Layouts/DetailLayout/DetailHeader",
  component: DetailHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="pt-[61px]">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumb: [
      { label: "Home", link: "/" },
      { label: "Dashboard", link: "/dashboard" },
    ],
  },
};

export const WithNestedBreadcrumb: Story = {
  args: {
    breadcrumb: [
      { label: "Home", link: "/" },
      { label: "Dashboard", link: "/dashboard" },
      { label: "Settings", link: "/dashboard/settings" },
      { label: "Account", link: "/dashboard/settings/account" },
    ],
  },
};

export const SingleBreadcrumb: Story = {
  args: {
    breadcrumb: [{ label: "Dashboard", link: "/dashboard" }],
  },
};
