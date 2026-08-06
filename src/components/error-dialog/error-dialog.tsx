import * as React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { ShieldAlert } from 'lucide-react'
import { hideErrorDialog, useErrorDialogStore } from './error-dialog-store'

export interface ErrorDialogProps {
  renderAction?: (state: { statusCode: number; message: string }) => React.ReactNode
}

export function ErrorDialog({ renderAction }: ErrorDialogProps = {}): React.ReactElement {
  const { open, statusCode, message } = useErrorDialogStore()
  const action = statusCode !== undefined ? renderAction?.({ statusCode, message }) : null

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      hideErrorDialog()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-t-destructive max-w-md border-t-4">
        <DialogHeader className="flex flex-col items-center">
          <div
            className="bg-destructive -mt-16 flex h-16 w-16 items-center justify-center rounded-full
              p-3">
            <ShieldAlert size={100} className="text-white" />
          </div>
          <DialogTitle className="hidden"></DialogTitle>
        </DialogHeader>
        <DialogDescription className="px-3" asChild>
          <div className="flex flex-col items-center max-w-md wrap-break-word">
            <h1
              className="dark:text-secondary-foreground text-center text-3xl font-semibold
                text-black">
              Error {statusCode}
            </h1>
            <p
              className="dark:text-secondary-foreground mt-3 text-center text-base text-black
                max-w-sm wrap-break-word overflow-hidden text-ellipsis">
              {message}
            </p>
          </div>
        </DialogDescription>

        <DialogFooter className="mt-3">
          <div className="flex w-full justify-center gap-2">{action}</div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
