import * as React from 'react'

import { showErrorDialog } from '../components/error-dialog/error-dialog-store'
import { toast } from '../components/toast/toast'
import type { ApiError } from '../types/user'

const DEFAULT_DIALOG_CODES = [403]

export interface UseApiErrorHandlerOptions {
  dialogCodes?: number[]
}

export interface UseApiErrorHandlerResult {
  handleError: (error: ApiError) => void
}

export function useApiErrorHandler(options?: UseApiErrorHandlerOptions): UseApiErrorHandlerResult {
  const dialogCodes = options?.dialogCodes ?? DEFAULT_DIALOG_CODES

  const handleError = React.useCallback(
    (error: ApiError) => {
      const matchedCode = dialogCodes.find((code) => code === error.status_code)

      if (matchedCode !== undefined) {
        showErrorDialog({
          statusCode: matchedCode,
          message: error.detail,
        })
        return
      }

      toast.error(`${error.status_code}: ${error.detail}`)
    },
    [dialogCodes]
  )

  return { handleError }
}
