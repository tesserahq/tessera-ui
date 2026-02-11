import { Link, useLocation } from 'react-router'
import { cn } from '../../../../utils/misc'
import {
  SidebarGroup,
  SidebarMenu as SidebarMenuComponent,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../../ui/sidebar'
import type { MainItemProps } from '../../types'

export function SidebarMenu({ menuItems }: { menuItems: MainItemProps[] }) {
  const { pathname } = useLocation()

  const isActive = (itemUrl: string) => {
    // For exact match (like Dashboard at /inside or News at /inside/news)
    if (pathname === itemUrl) {
      return true
    }

    // For nested routes (like News at /inside/news/new, etc.)
    // Check if pathname starts with itemUrl + '/'
    if (pathname.startsWith(itemUrl + '/')) {
      // But first, check if there's a more specific item that matches
      // This prevents parent routes from being active when a child route matches
      const hasMoreSpecificMatch = menuItems.some(
        (otherItem) =>
          otherItem.path !== itemUrl &&
          otherItem.path.startsWith(itemUrl + '/') &&
          pathname.startsWith(otherItem.path)
      )

      // Only return true if there's no more specific match
      return !hasMoreSpecificMatch
    }

    return false
  }

  return (
    <SidebarGroup className="h-full">
      <SidebarMenuComponent className="flex flex-col justify-between h-full">
        <div className="flex-1 space-y-1">
          {menuItems?.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  to={item.path}
                  className={cn(
                    'hover:bg-accent! hover:text-primary!',
                    isActive(item.path) &&
                      'text-primary! bg-accent border border-primary font-semibold'
                  )}>
                  <item.icon size={18} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      </SidebarMenuComponent>
    </SidebarGroup>
  )
}
