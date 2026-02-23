import * as React from 'react'

import { Check, Copy } from 'lucide-react'

import { cn } from '../../utils/misc'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // noop, fallback below
  }

  try {
    if (typeof document === 'undefined') return false

    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '0'
    textarea.style.left = '0'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export interface ResourceIdProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  value?: string | null
  truncate?: number
  showCopyOnHover?: boolean
  copyFeedbackDurationMs?: number
}

export function ResourceId({
  value,
  truncate = 8,
  showCopyOnHover = true,
  copyFeedbackDurationMs = 2000,
  className,
  ...props
}: ResourceIdProps): React.ReactElement {
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'failed'>('idle')
  const timeoutRef = React.useRef<number | null>(null)

  const safeValue = value ?? ''
  const displayValue = safeValue.slice(0, Math.max(0, truncate))

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const canCopy = safeValue.length > 0

  const handleCopy = async () => {
    if (!canCopy) return

    const ok = await copyTextToClipboard(safeValue)
    setCopyState(ok ? 'copied' : 'failed')

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setCopyState('idle'), copyFeedbackDurationMs)
  }

  const tooltipLabel =
    copyState === 'copied' ? 'Copied' : copyState === 'failed' ? 'Copy failed' : 'Copy'

  return (
    <span
      className={cn(
        'group',
        'inline-flex items-center',
        'gap-0',
        'rounded-md border border-input bg-background',
        'px-2 py-1',
        'text-xs font-medium text-foreground',
        className
      )}
      {...props}>
      <TooltipProvider delayDuration={100}>
        {safeValue ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-mono tabular-nums">{displayValue}</span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <span className="font-mono tabular-nums">{safeValue}</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="font-mono tabular-nums">{displayValue}</span>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'inline-flex',
                'overflow-hidden',
                'transition-[max-width,opacity,margin-left]',
                'duration-200',
                'ease-out',
                showCopyOnHover
                  ? [
                      'pointer-events-none',
                      'max-w-0',
                      'opacity-0',
                      'ml-0',
                      'group-hover:pointer-events-auto',
                      'group-hover:max-w-8',
                      'group-hover:opacity-100',
                      'group-hover:ml-1.5',
                      'group-focus-within:pointer-events-auto',
                      'group-focus-within:max-w-8',
                      'group-focus-within:opacity-100',
                      'group-focus-within:ml-1.5',
                    ]
                  : ['pointer-events-auto', 'max-w-8', 'opacity-100', 'ml-1.5']
              )}>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                className="h-6 w-6 p-0"
                onClick={handleCopy}
                disabled={!canCopy}
                aria-label="Copy resource id">
                {copyState === 'copied' ? <Check /> : <Copy />}
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent side="top">
            <span>{tooltipLabel}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  )
}
