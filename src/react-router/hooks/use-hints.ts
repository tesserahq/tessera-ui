import type { ClientHints } from '../types'
import { useRequestInfo } from './use-request-info'

export function useHints(): ClientHints {
  return useRequestInfo().hints
}
