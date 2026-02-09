import * as React from 'react'
import type { IPagingInfo } from './types'
import {
  PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from '../ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useScopedParams } from '../../helpers/params.helper'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface IProps {
  meta: IPagingInfo
  scope?: string
  callback?: ({ page, size }: { page: number; size: number }) => void // to handle value wihtout send into query params
}

export const Pagination = ({ meta, scope, callback }: IProps) => {
  const { getScopedSearch } = useScopedParams(scope)
  const navigate = useNavigate()
  const [pagination, setPagination] = React.useState<IPagingInfo>(meta)
  const { pages, page, total, size } = pagination
  const totalPages = Math.max(1, pages)
  const currentPage = Math.min(Math.max(1, page), totalPages)

  // Build a sliding window of pages around the active page
  const getVisiblePages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

    const delta = 2 // Number of pages to show on each side of current page
    let start = Math.max(1, currentPage - delta)
    let end = Math.min(totalPages, currentPage + delta)

    // Adjust to ensure we show enough pages
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(totalPages, start + 4)
      } else if (end === totalPages) {
        start = Math.max(1, end - 4)
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  const windowPages = getVisiblePages()
  const showLeadingEllipsis = windowPages[0] > 2
  const showTrailingEllipsis = windowPages[windowPages.length - 1] < totalPages - 1
  const showFirstPage = windowPages[0] > 1
  const showLastPage = windowPages[windowPages.length - 1] < totalPages

  // Calculate record range
  const startRecord = total === 0 ? 0 : (currentPage - 1) * size + 1
  const endRecord = total === 0 ? 0 : Math.min(currentPage * size, total)
  const pageCountLabel = `${currentPage} of ${totalPages}`
  const rangeLabel =
    total === 0 ? pageCountLabel : `${startRecord}-${endRecord} of ${total.toLocaleString()}`

  const [row, setRow] = React.useState<string>(size.toString())

  const onChange = (value: string) => {
    const currentValue = { size: Number(value), page: 1 }

    if (callback) {
      callback(currentValue)
      setPagination({ ...meta, ...currentValue })
    } else {
      navigate(getScopedSearch(currentValue))
    }

    setRow(value)
  }

  const onNavigate = (value: number) => {
    if (callback) {
      callback({ page: value, size })
      setPagination({ ...meta, page: value, size })
    } else {
      navigate(getScopedSearch({ page: value }))
    }
  }

  React.useEffect(() => {
    setPagination(meta)
  }, [meta])

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-1">
        <p className="text-navy-800 dark:text-navy-200 w-28 text-sm">Items per page:</p>
        <div className="w-20">
          <Select value={row} onValueChange={onChange}>
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="75">75</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <PaginationComponent className="justify-end">
        <PaginationContent>
          <div className="text-navy-800 dark:text-navy-200 mr-2 text-sm">{rangeLabel}</div>
          {/* First page button */}
          {showFirstPage && (
            <PaginationItem>
              <Button variant="outline" size="icon" onClick={() => onNavigate(1)}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
          {/* Previous page button */}
          {currentPage > 1 && (
            <PaginationItem>
              <Button variant="outline" size="icon" onClick={() => onNavigate(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
          {/* First page number */}
          {showFirstPage && (
            <PaginationItem>
              <Button
                variant={1 === currentPage ? 'default' : 'outline'}
                onClick={() => onNavigate(1)}>
                1
              </Button>
            </PaginationItem>
          )}
          {/* Leading ellipsis */}
          {showLeadingEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {/* Window pages */}
          {windowPages.map((val) => (
            <PaginationItem key={val}>
              <Button
                variant={val === currentPage ? 'default' : 'outline'}
                onClick={() => {
                  if (val !== currentPage) {
                    onNavigate(val)
                  }
                }}>
                {val}
              </Button>
            </PaginationItem>
          ))}
          {/* Trailing ellipsis */}
          {showTrailingEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {/* Last page number */}
          {showLastPage && (
            <PaginationItem>
              <Button
                variant={totalPages === currentPage ? 'default' : 'outline'}
                onClick={() => onNavigate(totalPages)}>
                {totalPages}
              </Button>
            </PaginationItem>
          )}
          {/* Next page button */}
          {currentPage < totalPages && (
            <PaginationItem>
              <Button variant="outline" size="icon" onClick={() => onNavigate(currentPage + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
          {/* Last page button */}
          {showLastPage && (
            <PaginationItem>
              <Button variant="outline" size="icon" onClick={() => onNavigate(totalPages)}>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          )}
        </PaginationContent>
      </PaginationComponent>
    </div>
  )
}
