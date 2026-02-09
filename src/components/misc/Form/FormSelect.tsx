import { Label } from '../../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../ui/select'
import { Button } from '../../ui/button'
import { cn } from '../../../utils/misc'
import React from 'react'

interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SelectAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

interface FormSelectProps {
  label: string
  name: string
  value?: string
  options: SelectOption[]
  required?: boolean
  disabled?: boolean
  placeholder?: string
  error?: string
  onValueChange?: (value: string) => void
  className?: string
  loading?: boolean
  loadingText?: string
  emptyText?: string
  actions?: SelectAction[]
  showSeparator?: boolean
}

const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      name,
      value,
      options,
      required = false,
      disabled = false,
      placeholder = 'Select an option',
      error,
      onValueChange,
      className,
      loading = false,
      loadingText = 'Loading...',
      emptyText = 'No options available',
      actions = [],
      showSeparator = true,
    },
    ref
  ) => {
    return (
      <div className={cn('mb-3', className)}>
        <Label className={cn(required && 'required')}>{label}</Label>
        <Select
          name={name}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled || loading}>
          <SelectTrigger ref={ref} className={cn(error && 'input-error')}>
            {loading ? (
              loadingText
            ) : (
              <div className="flex items-center gap-2">
                {value && options.find((opt) => opt.value === value)?.icon}
                <span className="capitalize">
                  {value ? options.find((opt) => opt.value === value)?.label : placeholder}
                </span>
              </div>
            )}
          </SelectTrigger>
          <SelectContent>
            {options.length === 0 ? (
              <SelectItem value="empty" className="text-muted-foreground">
                {emptyText}
              </SelectItem>
            ) : (
              options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))
            )}

            {/* Show separator if there are actions and options */}
            {showSeparator && actions.length > 0 && options.length > 0 && (
              <div className="my-1 bg-border h-[1px] w-full"></div>
            )}

            {/* Render action buttons */}
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'ghost'}
                size={action.size || 'sm'}
                className={cn('w-full justify-start', action.className)}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  action.onClick()
                }}>
                <div className="flex items-center gap-2">
                  {action.icon}
                  {action.label}
                </div>
              </Button>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="error-message">{error}</span>}
      </div>
    )
  }
)

FormSelect.displayName = 'FormSelect'

export default FormSelect
export type { FormSelectProps, SelectOption, SelectAction }
