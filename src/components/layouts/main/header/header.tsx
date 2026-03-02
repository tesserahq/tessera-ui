import React from 'react'
import { Link } from 'react-router'
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar'
import { Separator } from '../../../ui/separator'
import { AppMenu, ProfileMenu, type AppHostUrls } from '../../../../main'

import custos from '../../../../../public/logo/custos-logo.png'
import quore from '../../../../../public/logo/quore-logo.png'
import looply from '../../../../../public/logo/looply-logo.png'
import vaulta from '../../../../../public/logo/vaulta-logo.png'
import identies from '../../../../../public/logo/identies-logo.png'
import indexa from '../../../../../public/logo/indexa-logo.png'
import sendly from '../../../../../public/logo/sendly-logo.png'
import orcha from '../../../../../public/logo/orcha-logo.png'
import conversa from '../../../../../public/logo/conversa-logo.png'

export const logos = {
  custos,
  quore,
  looply,
  vaulta,
  identies,
  indexa,
  sendly,
  orcha,
  conversa,
}

interface IProps {
  title: string
  selectedTheme: string
  onSetTheme: (theme: string) => void
  actionLogout: () => void
  actionProfile: () => void
  appHostUrls: AppHostUrls
  avatarUrl?: string
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
  appHostUrls,
  isStorybook,
  avatarUrl,
}: IProps) {
  const convertTitle = (title: string) => {
    const toCamelCase = title
      .split(' ')
      .map((word, index) =>
        index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('')

    return toCamelCase
  }

  return (
    <header
      className="fixed h-[60px] animate-slide-down duration-100 z-20! left-0 bg-white
        dark:bg-sidebar-background w-full border-b-[0.5px] border-border shrink-0 flex items-center
        justify-between gap-2 top-0 backdrop-blur-md transition-[width,height] ease-linear pe-5
        shadow-2xs ps-2">
      {/* Left Content */}
      <div className="flex items-center gap-2">
        <AppMenu currentApp={title} appHostUrls={appHostUrls} />
        <Link to="/" className="space-x-2">
          <div className="flex items-center gap-2 lg:ml-0">
            <Avatar className="ring-0 w-8 h-8">
              <AvatarImage src={avatarUrl || logos[convertTitle(title) as keyof typeof logos]} />
              <AvatarFallback>{title.charAt(0).toUpperCase()}</AvatarFallback>
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
      <div className="pe-4 flex items-center gap-2">
        {contentRight && <div>{contentRight}</div>}
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
