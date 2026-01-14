import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateTime } from "./date-time";

const meta: Meta<typeof DateTime> = {
  title: "Components/DateTime",
  component: DateTime,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Sample dates for stories
const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

export const Default: Story = {
  args: {
    date: now,
  },
};

export const WithStringDate: Story = {
  args: {
    date: now.toISOString(),
  },
};

export const CustomFormat: Story = {
  args: {
    date: now,
    formatStr: "MMM dd, yyyy 'at' h:mm a",
  },
};

export const ShortFormat: Story = {
  args: {
    date: now,
    formatStr: "MM/dd/yyyy",
  },
};

export const LongFormat: Story = {
  args: {
    date: now,
    formatStr: "EEEE, MMMM dd, yyyy 'at' h:mm:ss a",
  },
};

export const WithTimezone: Story = {
  args: {
    date: now,
    timezone: "America/Los_Angeles",
  },
};

export const WithTimezoneUTC: Story = {
  args: {
    date: now,
    timezone: "UTC",
  },
};

export const WithTimezoneTokyo: Story = {
  args: {
    date: now,
    timezone: "Asia/Tokyo",
  },
};

export const WithTimezoneLondon: Story = {
  args: {
    date: now,
    timezone: "Europe/London",
  },
};

export const ShowTimezone: Story = {
  args: {
    date: now,
    showTimezone: true,
  },
};

export const ShowTimezoneWithCustomTimezone: Story = {
  args: {
    date: now,
    timezone: "America/Los_Angeles",
    showTimezone: true,
  },
};

export const Yesterday: Story = {
  args: {
    date: yesterday,
  },
};

export const Tomorrow: Story = {
  args: {
    date: tomorrow,
  },
};

export const LastWeek: Story = {
  args: {
    date: lastWeek,
    formatStr: "E, MM MMM yyyy, p zzzz",
  },
};

export const NextMonth: Story = {
  args: {
    date: nextMonth,
    formatStr: "E, MM MMM yyyy, p zzzz",
  },
};

export const WithCustomClassName: Story = {
  args: {
    date: now,
    className: "text-lg font-semibold text-blue-600",
  },
};

export const ISOStringDate: Story = {
  args: {
    date: "2024-01-15T10:30:00Z",
    timezone: "America/New_York",
  },
};

export const DateOnlyFormat: Story = {
  args: {
    date: now,
    formatStr: "yyyy-MM-dd",
  },
};

export const TimeOnlyFormat: Story = {
  args: {
    date: now,
    formatStr: "h:mm:ss a zzzz",
  },
};
