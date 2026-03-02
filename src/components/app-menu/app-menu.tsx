import * as React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Button } from '../ui/button'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown'
import { cn } from '../../utils/misc'
import { Link } from 'react-router'
import { Grip } from 'lucide-react'
import { logos } from './logo'

const APPS = [
  'quore',
  'looply',
  'vaulta',
  'identies',
  'custos',
  'indexa',
  'sendly',
  'orcha',
  'conversa',
]

export interface AppHostUrls {
  quore: string
  looply: string
  vaulta: string
  identies: string
  custos: string
  indexa: string
  sendly: string
  orcha: string
  conversa: string
}

type App =
  | 'quore'
  | 'looply'
  | 'vaulta'
  | 'identies'
  | 'custos'
  | 'indexa'
  | 'sendly'
  | 'orcha'
  | 'conversa'

export interface AppMenuProps {
  name: App
  link: string
  logo: string
}

export function AppMenu({
  currentApp,
  appHostUrls,
}: {
  currentApp: string
  appHostUrls: AppHostUrls
}) {
  const [isOpenAppMenu, setIsOpenAppMenu] = React.useState(false)

  const filteredApps = APPS.filter((app) => app.toLowerCase() !== currentApp.toLowerCase())

  const apps: AppMenuProps[] = React.useMemo(() => {
    return filteredApps.map((app) => ({
      name: app as App,
      link: `${appHostUrls[app as keyof AppHostUrls]}?autologin=true`,
      logo: logos[app as keyof typeof logos],
    }))
  }, [filteredApps, currentApp])

  return (
    <DropdownMenu open={isOpenAppMenu} onOpenChange={setIsOpenAppMenu}>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0',
            isOpenAppMenu && 'bg-accent'
          )}>
          <Grip className={cn('text-foreground', isOpenAppMenu && 'text-primary')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="grid max-h-[400px] grid-cols-3 gap-1 overflow-auto p-3"
        align="start">
        {apps.map((app) => {
          return (
            <Link
              key={app.name}
              to={app.link}
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
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
