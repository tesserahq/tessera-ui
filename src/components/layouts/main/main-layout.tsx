import React from 'react'
import { SidebarInset, SidebarProvider } from '../../ui/sidebar'
import type { MainItemProps } from '../types'
import { SidebarPanel } from './sidebar/sidebar-panel'

/**
 * Props for the MainLayout component
 */
export interface MainLayoutProps {
  /** Main content to display in the layout */
  children: React.ReactNode
  /** Array of menu items to display in the sidebar navigation */
  menuItems: MainItemProps[]
  /** Additional CSS classes for the layout container */
  className?: string
}

/**
 * MainLayout component provides a complete layout structure with a collapsible sidebar navigation and content area.
 *
 * @example
 * ```tsx
 * <MainLayout
 *   menuItems={menuItems}
 *   header={<Header />}
 * >
 *   <YourContent />
 * </MainLayout>
 * ```
 */
export function MainLayout({ children, menuItems }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarPanel menuItems={menuItems} />
      <SidebarInset>
        <div className="pt-[60px] h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
