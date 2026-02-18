import * as React from 'react'
import { cn } from '../../../utils/misc'
import type { BreadcrumbItemData, DetailItemsProps } from '../types'
import { DetailHeader } from './detail-header'
import { DetailSidenav } from './detail-sidenav'
import { DetailContent } from './detail-content'

interface DetailLayoutProps {
  children: React.ReactNode
  menuItems: DetailItemsProps[]
  breadcrumbs: BreadcrumbItemData[]
  isLoading: boolean
  className?: string
  headerClassName?: string
}

export function DetailLayout({
  children,
  menuItems,
  breadcrumbs,
  className,
  headerClassName,
  isLoading,
}: DetailLayoutProps) {
  return (
    <>
      <DetailHeader breadcrumbs={breadcrumbs} className={headerClassName} isLoading={isLoading} />

      <div className={cn('flex items-start gap-3 h-full relative pt-[53px]', className)}>
        <DetailSidenav menuItems={menuItems} />
        <DetailContent>{children}</DetailContent>
      </div>
    </>
  )
}
