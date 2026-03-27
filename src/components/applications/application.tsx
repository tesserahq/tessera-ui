import React from 'react'
import { Grip, Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { cn } from '../../lib/utils'
import { useApp } from '../../provider/AppProvider'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown'
import { Link } from 'react-router'
import type { Application } from '../../types/application'

export function Applications({ currentApp }: { currentApp: string }) {
  const { isLoadingApps, applications } = useApp()

  const [isOpenApplications, setIsOpenApplications] = React.useState<boolean>(false)

  const currentApps = applications.filter((app) => app.name !== currentApp)

  return (
    <DropdownMenu open={isOpenApplications} onOpenChange={setIsOpenApplications}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0',
            isOpenApplications && 'bg-accent'
          )}>
          <Grip className={cn('text-foreground', isOpenApplications && 'text-primary')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="grid max-h-[400px] grid-cols-3 gap-1 overflow-auto p-3"
        align="start">
        {isLoadingApps ? (
          <div className="w-full h-full flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          currentApps.map((app: Application) => {
            return (
              <Link
                key={app.name}
                to={app.url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center rounded-lg px-4 py-2
                  transition-all duration-200 hover:bg-accent">
                <Avatar className="ring-0">
                  <AvatarImage src={app.logo} alt={`${app.name} logo`} />
                  <AvatarFallback>{app.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-xs capitalize">{app.name}</span>
              </Link>
            )
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
