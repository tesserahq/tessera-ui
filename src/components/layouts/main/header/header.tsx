import React from 'react'
import { Link } from 'react-router'
import { ProfileMenu, useApp } from '../../../../main'
import { Applications } from '../../../applications/application'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'
import { Separator } from '../../../ui/separator'
import { SidebarTrigger } from '../../../ui/sidebar'

interface IProps {
  title: string
  selectedTheme: string
  onSetTheme: (theme: string) => void
  actionLogout: () => void
  actionProfile: () => void
  defaultLogo?: string
  defaultAvatar?: string
  contentLeft?: React.ReactNode
  contentCenter?: React.ReactNode
  contentRight?: React.ReactNode
  isStorybook?: boolean
}

export function Header({
  title,
  contentLeft,
  contentRight,
  contentCenter,
  selectedTheme,
  actionLogout,
  actionProfile,
  onSetTheme,
  defaultAvatar,
  isStorybook,
  defaultLogo,
}: IProps) {
  const { applications } = useApp()
  const currentApp = applications.find((app) => app.name === title)

  return (
    <header
      className="fixed h-[60px] animate-slide-down duration-100 z-20! left-0 bg-white
        dark:bg-sidebar-background w-full border-b-[0.5px] border-border shrink-0 flex items-center
        justify-between gap-2 top-0 backdrop-blur-md transition-[width,height] ease-linear pe-5
        shadow-2xs ps-2">
      {/* Left Content */}
      <div className="flex items-center gap-1 md:gap-2">
        <Applications currentApp={title} />
        <Link to="/" className="space-x-2">
          <div className="flex items-center gap-2 lg:ml-0">
            <Avatar className="ring-0 w-6 h-6">
              <AvatarImage src={currentApp?.logo} alt="logo" />
              <AvatarFallback>
                <img src={defaultLogo} />
              </AvatarFallback>
            </Avatar>
            <span className="text-base font-bold">{title}</span>
          </div>
        </Link>
        {contentLeft && (
          <>
            <Separator
              orientation="vertical"
              className="mr-1.5 h-3 bg-slate-400 dark:bg-slate-500"
            />
            {contentLeft}
          </>
        )}
      </div>

      {contentCenter && <div className="flex-1">{contentCenter}</div>}

      {/* Right Content */}
      <div className="md:pe-4 flex items-center gap-2">
        {contentRight && <div>{contentRight}</div>}
        <SidebarTrigger className="md:hidden" />
        <ProfileMenu
          isStorybook={isStorybook}
          selectedTheme={selectedTheme}
          onSetTheme={onSetTheme}
          actionLogout={actionLogout}
          actionProfile={actionProfile}
          defaultAvatar={defaultAvatar}
        />
      </div>
    </header>
  )
}
