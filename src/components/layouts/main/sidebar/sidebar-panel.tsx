import * as React from 'react'

import { useLocation } from 'react-router'
import { Sidebar, SidebarContent, SidebarRail, useSidebar } from '../../../ui/sidebar'
import type { MainItemProps } from '../../types'
import { SidebarMenu } from './sidebar-menu'

interface IProps {
  menuItems: MainItemProps[]
}

export function SidebarPanel({
  menuItems,
  ...props
}: React.ComponentProps<typeof Sidebar> & IProps) {
  const { pathname } = useLocation()
  const { setOpen } = useSidebar()

  // Check if route matches /roles/:id/overview pattern
  const isOverviewPage = React.useMemo(() => {
    return pathname.split('/').length > 2
  }, [pathname])

  // Update sidebar state based on route
  React.useEffect(() => {
    setOpen(!isOverviewPage)
  }, [isOverviewPage, setOpen, pathname])

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className="animate-slide-left mt-[60px] bg-sidebar-background">
      <SidebarContent>
        <SidebarMenu menuItems={menuItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
