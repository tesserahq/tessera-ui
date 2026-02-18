import * as React from 'react'

import { useLocation } from 'react-router'
import { Sidebar, SidebarContent, SidebarRail, useSidebar } from '../../../ui/sidebar'
import type { MainItemProps } from '../../types'
import { SidebarMenu } from './sidebar-menu'

interface IProps {
  menuItems: MainItemProps[]
  collapseSidebar: boolean
  customSidebar?: React.ReactNode
}

export function SidebarPanel({
  menuItems,
  collapseSidebar,
  customSidebar,
  ...props
}: React.ComponentProps<typeof Sidebar> & IProps) {
  const { pathname } = useLocation()
  const { setOpen } = useSidebar()

  // Update sidebar state based on route
  React.useEffect(() => {
    setOpen(!collapseSidebar)
  }, [collapseSidebar, setOpen, pathname])

  return (
    <Sidebar
      collapsible="icon"
      className="animate-slide-left mt-[60px] bg-sidebar-background"
      {...props}>
      <SidebarContent>
        {customSidebar ? customSidebar : <SidebarMenu menuItems={menuItems} />}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
