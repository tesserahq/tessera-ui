import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import {
  Home,
  Settings,
  User,
  FileText,
  BarChart3,
  Mail,
  Bell,
} from "lucide-react";
import { DetailSidenav } from "./detail-sidenav";
import type { DetailItemsProps } from "../types";

const meta: Meta<typeof DetailSidenav> = {
  title: "Components/Layouts/DetailLayout/DetailSidenav",
  component: DetailSidenav,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <div className="flex h-screen">
          <Story />
          <div className="ml-56 p-4">
            <p className="text-muted-foreground">
              Content area would appear here
            </p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultMenuItems: DetailItemsProps[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <Home className="w-4 h-4" />,
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    title: "Documents",
    path: "/dashboard/documents",
    icon: <FileText className="w-4 h-4" />,
    children: [
      {
        title: "All Documents",
        path: "/dashboard/documents",
        icon: <FileText className="w-4 h-4" />,
      },
      {
        title: "Recent",
        path: "/dashboard/documents/recent",
        icon: <FileText className="w-4 h-4" />,
      },
    ],
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <Settings className="w-4 h-4" />,
    divider: true,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <User className="w-4 h-4" />,
  },
];

export const Default: Story = {
  args: {
    menuItems: defaultMenuItems,
  },
};

export const WithManyItems: Story = {
  args: {
    menuItems: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <Home className="w-4 h-4" />,
      },
      {
        title: "Analytics",
        path: "/dashboard/analytics",
        icon: <BarChart3 className="w-4 h-4" />,
      },
      {
        title: "Documents",
        path: "/dashboard/documents",
        icon: <FileText className="w-4 h-4" />,
        children: [
          {
            title: "All Documents",
            path: "/dashboard/documents",
            icon: <FileText className="w-4 h-4" />,
          },
          {
            title: "Recent",
            path: "/dashboard/documents/recent",
            icon: <FileText className="w-4 h-4" />,
          },
          {
            title: "Archived",
            path: "/dashboard/documents/archived",
            icon: <FileText className="w-4 h-4" />,
          },
        ],
      },
      {
        title: "Messages",
        path: "/dashboard/messages",
        icon: <Mail className="w-4 h-4" />,
      },
      {
        title: "Notifications",
        path: "/dashboard/notifications",
        icon: <Bell className="w-4 h-4" />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <Settings className="w-4 h-4" />,
        divider: true,
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <User className="w-4 h-4" />,
      },
    ],
  },
};

export const SimpleMenu: Story = {
  args: {
    menuItems: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <Home className="w-4 h-4" />,
      },
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <Settings className="w-4 h-4" />,
      },
      {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <User className="w-4 h-4" />,
      },
    ],
  },
};
