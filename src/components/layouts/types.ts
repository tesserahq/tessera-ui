import type { LucideIcon } from 'lucide-react'

export interface MainItemProps {
  title: string
  path: string
  icon: LucideIcon
  children?: ItemProps[]
  divider?: boolean
  disabled?: boolean
}

export interface SidebarPanelProps {
  menuItems: MainItemProps[]
}

interface ItemProps {
  title: string
  path: string
  icon: LucideIcon
  disabled?: boolean
}
export interface DetailItemsProps {
  title: string
  path: string
  icon: LucideIcon
  children?: ItemProps[]
  divider?: boolean
  disabled?: boolean
}

export interface SidebarItemsProps {
  menuItems: DetailItemsProps[]
}

export interface BreadcrumbItemData {
  label: string
  link: string
  disabled?: boolean
}
