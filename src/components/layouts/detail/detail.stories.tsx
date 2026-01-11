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
  Shield,
} from "lucide-react";
import { DetailLayout } from "./detail.layout";
import type { DetailItemsProps, BreadcrumbItemData } from "../types";

const meta: Meta<typeof DetailLayout> = {
  title: "Components/Layouts/DetailLayout",
  component: DetailLayout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/dashboard"]}>
        <div className="h-screen">
          <Story />
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

const defaultBreadcrumb: BreadcrumbItemData[] = [
  { label: "Home", link: "/" },
  { label: "Dashboard", link: "/dashboard" },
];

export const DefaultDetailLayout: Story = {
  args: {
    menuItems: defaultMenuItems,
    breadcrumb: defaultBreadcrumb,
    children: (
      <div className="space-y-4 p-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your dashboard. This is the main content area.
        </p>
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

export const WithNestedBreadcrumb: Story = {
  args: {
    menuItems: defaultMenuItems,
    breadcrumb: [
      { label: "Home", link: "/" },
      { label: "Dashboard", link: "/dashboard" },
      { label: "Settings", link: "/dashboard/settings" },
      { label: "Account", link: "/dashboard/settings/account" },
    ],
    children: (
      <div className="space-y-4 p-3">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
    ),
  },
};

export const WithManyMenuItems: Story = {
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
      {
        title: "Security",
        path: "/dashboard/security",
        icon: <Shield className="w-4 h-4" />,
      },
    ],
    breadcrumb: defaultBreadcrumb,
    children: (
      <div className="space-y-4 p-3">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          This layout demonstrates scrolling when there are many menu items.
        </p>
      </div>
    ),
  },
};
