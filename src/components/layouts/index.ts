// Main Layout
import Layout from "./layout.tsx";

// Detail Layout
import {
  DetailHeader,
  DetailLayout,
  DetailSidenav,
  DetailContent,
} from "./detail";

// All types from layout
export type {
  DetailItemsProps,
  BreadcrumbItemData,
  SidebarItemsProps,
} from "./types";

// Compound Layout
const LayoutCompound = Object.assign(Layout, {
  Detail: DetailLayout,
  DetailHeader: DetailHeader,
  DetailSidenav: DetailSidenav,
  DetailContent: DetailContent,
});

export { LayoutCompound as Layout };
