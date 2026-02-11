import React from 'react'
import { SidebarPanel } from './sidebar/sidebar-panel'
import type { MainItemProps } from '../types'
import { SidebarInset, SidebarProvider } from '../../ui/sidebar'

/**
 * Props for the MainLayout component
 */
export interface MainLayoutProps {
  /** Main content to display in the layout */
  children: React.ReactNode
  /** Header component to display at the top of the content area */
  header: React.ReactNode
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
function MainLayout({ children, header, menuItems }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarPanel menuItems={menuItems} />
      <SidebarInset>
        {/* Need updated in this issue https://github.com/tesserahq/tessera-ui/issues/44 */}
        {header && header}

        <div className="pt-[60px] h-full">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
