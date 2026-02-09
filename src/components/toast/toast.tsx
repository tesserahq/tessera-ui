import React from 'react'

import { Toaster as SonnerToaster } from 'sonner'
import type { ToasterProps } from 'sonner'

export type { ToasterProps }
export { toast } from 'sonner'

export function Toaster(props: ToasterProps): React.ReactElement {
  return <SonnerToaster closeButton duration={Infinity} richColors {...props} />
}
