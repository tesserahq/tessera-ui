import { CircleHelp } from 'lucide-react'
import * as React from 'react'
import { Link } from 'react-router'
import { cn } from '../../utils/misc'
import { Button } from '../ui/button'

interface INotFoundProps {
  /** Image URL shown above the title. Defaults to a help icon. */
  image?: string
  title?: string
  description?: string
  /** Target of the default "Back to Home" link. */
  homeHref?: string
  homeLabel?: string
  /** Replaces the default "Back to Home" link. */
  children?: React.ReactNode
  /** Merged over the root container's default classes. */
  className?: string
  /** Merged over the image's default classes. Only used when `image` is set. */
  imageClassName?: string
}

/**
 * Full-page 404 view. It does not read any loader data, so it can be rendered
 * by a root ErrorBoundary where the root loader did not run.
 */
export function NotFound({
  image,
  title = 'Whoops!',
  description = 'Nothing here yet!',
  homeHref = '/',
  homeLabel = 'Back to Home',
  children,
  className,
  imageClassName,
}: INotFoundProps) {
  return (
    <div
      className={cn(
        'bg-card flex h-screen w-full flex-col items-center justify-center gap-2 rounded-md px-6',
        className
      )}>
      {image ? (
        <img src={image} alt={title} className={cn('w-80 max-w-full rounded-lg', imageClassName)} />
      ) : (
        <div
          className="border-border bg-card hover:border-primary/40 flex h-16 w-16 items-center
            justify-center rounded-2xl border">
          <CircleHelp className="text-primary/60 h-8 w-8 stroke-[1.5px]" />
        </div>
      )}
      <div className="flex flex-col items-center gap-2">
        <p className="text-primary text-2xl font-medium dark:text-primary-foreground">{title}</p>
        <p className="text-primary/60 text-center text-lg font-normal dark:text-primary-foreground">
          {description}
        </p>
        <div className="mt-3">
          {children ?? (
            <Button asChild>
              <Link to={homeHref}>{homeLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
