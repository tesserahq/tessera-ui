import React from 'react'

import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner'
import 'sonner/dist/styles.css'
import type { ToasterProps } from 'sonner'

const SUCCESS_AUTO_CLOSE_MS = 3000

const toast = ((...args: Parameters<typeof sonnerToast>) =>
  sonnerToast(...args)) as typeof sonnerToast

Object.assign(toast, sonnerToast, {
  success: (message: string, options?: Parameters<typeof sonnerToast.success>[1]) => {
    return sonnerToast.success(message, {
      ...options,
      duration: options?.duration ?? SUCCESS_AUTO_CLOSE_MS,
    })
  },
})

export type { ToasterProps }
export { toast }

export function Toaster(props: ToasterProps): React.ReactElement {
  return <SonnerToaster closeButton duration={Infinity} richColors {...props} />
}
