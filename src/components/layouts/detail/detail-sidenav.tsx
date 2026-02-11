import * as React from 'react'
import { cn } from '../../../utils/misc'
import { useLocation, Link } from 'react-router'
import type { DetailItemsProps } from '../types'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../ui/accordion'

interface DetailSidenavProps {
  menuItems: DetailItemsProps[]
  className?: string
}

export function DetailSidenav({ menuItems, className }: DetailSidenavProps): React.ReactElement {
  const { pathname } = useLocation()

  const isMenuActive = (menuPath: string) => {
    return pathname === menuPath || pathname.startsWith(menuPath + '/')
  }

  const hasActiveChild = (item: DetailItemsProps): boolean => {
    if (!item.children || item.children.length === 0) return false
    return item.children.some((child) => isMenuActive(child.path))
  }

  const itemClassName = (active: boolean) => {
    return cn(
      `hover:bg-accent w-full text-sm flex p-2 mb-1 items-center justify-start gap-2
        overflow-hidden rounded-md cursor-pointer hover:text-primary!`,
      active && ' text-primary bg-accent border border-primary font-medium'
    )
  }

  return (
    <div
      className={cn(
        'w-56 dark:bg-sidebar-background p-3 fixed h-full border-r bg-white overflow-y-auto',
        className
      )}>
      <Accordion
        type="multiple"
        defaultValue={menuItems
          .filter((item) => item.children && hasActiveChild(item))
          .map((item) => item.path)}
        className="w-full">
        {menuItems.map((item) => (
          <div key={item.path}>
            {item.children && item.children.length > 0 ? (
              <AccordionItem value={item.path} className="border-none">
                <AccordionTrigger
                  disabled={item.disabled}
                  className={itemClassName(isMenuActive(item.path) || hasActiveChild(item))}>
                  <item.icon size={18} />
                  <span className="flex-1 text-left">{item.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="pl-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.disabled ? '#' : child.path}
                        className={itemClassName(isMenuActive(child.path))}>
                        <item.icon size={18} />
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <Link
                to={item.disabled ? '#' : item.path}
                className={itemClassName(isMenuActive(item.path))}>
                <item.icon size={18} />
                {item.title}
              </Link>
            )}

            {item.divider && (
              <hr className="my-2 border-t border-slate-200 dark:border-slate-700" />
            )}
          </div>
        ))}
      </Accordion>
    </div>
  )
}
