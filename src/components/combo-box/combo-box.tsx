import React, { useState, useCallback, useRef } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '../../utils/misc'
import { InputFloat } from '../ui/input'
import { Button } from '../ui/button'

interface DataCommandBoxProps<T> {
  name: string
  label: string
  value: string
  onChange: (option: T | undefined) => void
  options: T[]
  getOptionId: (option: T) => string
  getOptionLabel: (option: T) => string
  getSearchValue?: (option: T) => string
  renderOption?: (option: T) => React.ReactNode
  required?: boolean
  error?: string
  placeholder?: string
  className?: string
}

function DataCommandBoxInner<T>(
  props: DataCommandBoxProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    className,
    label,
    name,
    required = false,
    value,
    onChange,
    options,
    getOptionId,
    getOptionLabel,
    getSearchValue,
    renderOption,
    error,
    placeholder = 'Search...',
    ...otherProps
  } = props

  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const selectedOption = options.find((opt) => getOptionId(opt) === selectedValue)
      onChange(selectedOption)
      setOpen(false)
    },
    [onChange, options, getOptionId]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(undefined)
    },
    [onChange]
  )

  const handleInputClick = useCallback(() => {
    setOpen(true)
  }, [])

  // Find the selected option
  const selectedOption = options.find((option) => getOptionId(option) === value)
  const displayValue = selectedOption ? getOptionLabel(selectedOption) : ''

  return (
    <div className="relative w-full" ref={ref} {...otherProps}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <InputFloat
              ref={inputRef}
              label={label}
              required={required}
              value={displayValue}
              readOnly
              onClick={handleInputClick}
              className={cn('cursor-pointer capitalize', error && 'input-error', className)}
            />

            {/* Dropdown arrow */}
            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
              <ChevronDown
                className={cn(
                  'text-muted-foreground h-4 w-4 transition-transform duration-200',
                  open && 'rotate-180'
                )}
              />
            </div>
          </div>
        </PopoverTrigger>

        {/* Clear button - outside trigger, with pointer-events-auto */}
        {displayValue && !required && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="pointer-events-auto absolute top-1/2 right-10 -translate-y-1/2 h-6 w-6 z-10"
            type="button">
            <X className="h-4 w-4" />
          </Button>
        )}
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={true}
          collisionPadding={8}>
          <Command>
            <CommandInput placeholder={placeholder} className="h-10 border-0 border-b" />
            <div className="max-h-64 overflow-y-auto">
              <CommandEmpty className="py-6 text-center text-sm">No items found</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const optionId = getOptionId(option)
                  const searchValue = getSearchValue
                    ? getSearchValue(option)
                    : getOptionLabel(option)

                  return (
                    <CommandItem
                      key={optionId}
                      value={searchValue}
                      onSelect={() => handleSelect(optionId)}
                      className={cn(
                        'dark:hover:bg-navy-300/20 cursor-pointer text-base hover:bg-slate-300/20',
                        value === optionId && 'bg-accent'
                      )}>
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          value === optionId ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {renderOption ? (
                        renderOption(option)
                      ) : (
                        <span className="capitalize">{getOptionLabel(option)}</span>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const ComboBox = React.forwardRef(DataCommandBoxInner) as <T>(
  props: DataCommandBoxProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DataCommandBoxInner>

export { ComboBox }
