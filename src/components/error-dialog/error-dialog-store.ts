import * as React from 'react'

export interface ErrorDialogState {
  open: boolean
  statusCode?: number
  message: string
}

export interface ShowErrorDialogPayload {
  statusCode: number
  message: string
}

let state: ErrorDialogState = {
  open: false,
  message: '',
}

const listeners = new Set<() => void>()

function emitChange() {
  listeners.forEach((listener) => listener())
}

export function showErrorDialog(payload: ShowErrorDialogPayload): void {
  state = { open: true, ...payload }
  emitChange()
}

export function hideErrorDialog(): void {
  state = { ...state, open: false }
  emitChange()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): ErrorDialogState {
  return state
}

export function useErrorDialogStore(): ErrorDialogState {
  return React.useSyncExternalStore(subscribe, getSnapshot)
}
