// Main Layout
import Layout from './layout.tsx'

// Detail Layout
import { DetailHeader, DetailLayout, DetailSidenav, DetailContent } from './detail'
import { MainLayout } from './main/main-layout'
import { Header } from './main/header/header.tsx'

// All types from layout
export type {
  DetailItemsProps,
  BreadcrumbItemData,
  SidebarItemsProps,
  MainItemProps,
  SidebarPanelProps,
} from './types'

// Compound Layout
const LayoutCompound = Object.assign(Layout, {
  Main: MainLayout,
  Header: Header,
  Detail: DetailLayout,
  DetailHeader: DetailHeader,
  DetailSidenav: DetailSidenav,
  DetailContent: DetailContent,
})

export { LayoutCompound as Layout }
