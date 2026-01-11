import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import { AppMenu } from "./app-menu";
import type { AppMenuProps } from "./app-menu";

const meta: Meta<typeof AppMenu> = {
  title: "Components/AppMenu/AppMenu",
  component: AppMenu,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultApps: AppMenuProps[] = [
  { name: "quore", link: "https://quore.example.com" },
  { name: "looply", link: "https://looply.example.com" },
  { name: "vaulta", link: "https://vaulta.example.com" },
  { name: "identies", link: "https://identies.example.com" },
];

export const Default: Story = {
  args: {
    apps: defaultApps,
  },
};
