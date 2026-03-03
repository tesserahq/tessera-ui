import * as React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '../../ui/breadcrumb'

import type { BreadcrumbItemData } from '../types'
import { Link } from 'react-router'
import { cn } from '../../../utils/misc'

function BreadcrumbLoader() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-5 w-16 animate-pulse bg-slate-200 dark:bg-slate-600 rounded-lg"></div>
      <div className="h-5 w-32 animate-pulse bg-slate-200 dark:bg-slate-600 rounded-lg"></div>
      <div className="h-5 w-16 animate-pulse bg-slate-200 dark:bg-slate-600 rounded-lg"></div>
    </div>
  )
}

export function DetailHeader({
  breadcrumbs,
  className,
  isLoading,
}: {
  breadcrumbs: BreadcrumbItemData[]
  isLoading: boolean
  className?: string
}) {
  const shouldCapitalize = (label: string) => !label.includes('@')

  return (
    <div
      className={cn(
        'bg-white dark:bg-sidebar-background w-full fixed top-[60px] z-5 px-3 py-4 border-b',
        className
      )}>
      {isLoading && <BreadcrumbLoader />}
      {!isLoading && breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={item.link}>
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.disabled ? '#' : item.link}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </div>
  )
}
