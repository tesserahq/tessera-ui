import React, { useState, useCallback, useRef } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronDown, X } from 'lucide-react'
import { cn } from '../../utils/misc'
import { InputFloat } from '../ui/input'
import { Button } from '../ui/button'
import type { ComboBoxProps } from './combo-box.type'

function ComboBoxInner<T>(props: ComboBoxProps<T>, ref: React.ForwardedRef<HTMLDivElement>) {
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
      onChange(selectedOption ?? null)
      setOpen(false)
    },
    [onChange, options, getOptionId]
  )

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(null)
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
          <div className="relative w-full">
            <InputFloat
              ref={inputRef}
              label={label}
              required={required}
              value={displayValue}
              readOnly
              onClick={handleInputClick}
              className={cn('cursor-pointer capitalize pr-16', error && 'input-error', className)}
            />
            <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-x-2">
              {displayValue && !required && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleClear(e)
                  }}
                  className="h-8 w-8 hover:bg-transparent"
                  type="button">
                  <X className="h-4 w-4" />
                </Button>
              )}
              <ChevronDown
                className={cn(
                  `text-muted-foreground h-4 w-4 transition-transform duration-200
                  pointer-events-none `,
                  open && 'rotate-180'
                )}
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0 ring-0 border shadow-card"
          align="start"
          side="bottom"
          sideOffset={4}
          avoidCollisions={true}
          collisionPadding={8}>
          <Command className="border-0 rounded-xl">
            <CommandInput placeholder={placeholder} className="h-10 border-0 border-b" />
            <CommandList className="max-h-64 overflow-y-auto">
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
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

/**
 * DataCommandBox - A flexible searchable dropdown component
 *
 * @see {@link ComboBoxProps} for all available props and examples
 *
 * @example Basic usage with strings
 * ```tsx
 * const [fruit, setFruit] = useState('apple')
 *
 * <DataCommandBox
 *   name="fruit"
 *   label="Select a fruit"
 *   value={fruit}
 *   onChange={(selected) => selected && setFruit(selected)}
 *   options={['apple', 'banana', 'cherry']}
 *   getOptionId={(f) => f}
 *   getOptionLabel={(f) => f}
 * />
 * ```
 *
 * @example Advanced usage with objects
 * ```tsx
 * type User = { id: string; name: string; email: string; role: string }
 *
 * const [selected, setSelected] = React.useState<User | undefined>(users[0])
 *
 * const users: User[] = [
 *   { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *   { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
 * ]
 *
 * <ComboBox
 *   name="user"
 *   label="Assign to user"
 *   value={selected?.id ?? ''}
 *   onChange={(user) => setSelected(user)}
 *   options={users}
 *   getOptionId={(user) => user.id}
 *   getOptionLabel={(user) => user.name}
 *   getSearchValue={(user) => `${user.name} ${user.email}`}
 *   renderOption={(user) => (
 *     <div className="flex flex-col">
 *       <span className="font-medium">{user.name}</span>
 *       <span className="text-muted-foreground text-xs">{user.email}</span>
 *     </div>
 *   )}
 *   placeholder="Search users..."
 * />
 * ```
 *
 * @template T - The type of items in the options array
 */
const ComboBox = React.forwardRef(ComboBoxInner) as <T>(
  props: ComboBoxProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof ComboBoxInner>

export { ComboBox }
