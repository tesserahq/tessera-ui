import * as React from 'react'

import { cn } from '../../utils/misc'
import { Button } from './button'
import { Eye, EyeOff, X } from 'lucide-react'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `file:text-foreground placeholder:text-muted-foreground selection:bg-primary
        selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0
        rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow]
        outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm
        file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed
        disabled:opacity-50 md:text-sm`,
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        `aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
        aria-invalid:border-destructive`,
        className
      )}
      {...props}
    />
  )
}

interface InputProps extends React.ComponentProps<'input'> {
  label?: string
  required?: boolean
  withClearButton?: boolean
  onClearButtonClick?: () => void
}

const InputFloat = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, id, required = false, onClearButtonClick, withClearButton, ...props },
    ref
  ) => {
    const [fieldType, setFieldType] = React.useState<string>(type || 'text')
    const inputRef = React.useRef<HTMLInputElement>(null)
    const isPassword = type === 'password'

    React.useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="relative w-full">
        <input
          type={fieldType}
          id={id}
          placeholder=" "
          className={cn(
            `peer h-12 w-full rounded-md border border-input bg-transparent px-3 text-[16px]
            font-medium placeholder-transparent transition-all duration-100 hover:border-primary
            focus:ring-0 focus:ring-offset-0 focus-visible:border-primary focus-visible:outline-none
            focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed
            disabled:opacity-50 dark:text-primary-foreground`,
            className
          )}
          ref={inputRef}
          {...props}
        />

        {label && (
          <label
            htmlFor={id}
            onClick={() => inputRef.current?.focus()}
            className="absolute -top-2 left-2 cursor-text bg-card px-2 text-xs text-muted-foreground
              transition-all duration-300 peer-placeholder-shown:top-2.5
              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
              peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {isPassword && (
          <Button
            size="icon"
            variant="ghost"
            type="button"
            onClick={() => setFieldType((prev) => (prev === 'text' ? 'password' : 'text'))}
            className="absolute right-1 top-2 h-8 w-8 p-0 hover:bg-transparent">
            {fieldType === 'text' ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
        )}
        {withClearButton && (
          <Button
            size="icon"
            variant="ghost"
            type="button"
            onClick={onClearButtonClick}
            className="absolute right-1 top-2 h-8 w-8 p-0 hover:bg-transparent">
            <X size={18} />
          </Button>
        )}
      </div>
    )
  }
)

InputFloat.displayName = 'InputFloat'

export { Input, InputFloat }
