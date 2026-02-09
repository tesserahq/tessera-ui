import { Input } from '../../ui/input'
import { Label } from '../../ui/label'
import { Textarea } from '../../ui/textarea'
import { cn } from '../../../utils/misc'
import React from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'url' | 'textarea'
  required?: boolean
  error?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
  autoFocus = false,
  disabled = false,
  className,
  children,
}: FormFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={cn('mb-3', className)}>
      <Label htmlFor={name} className={cn(required && 'required')}>
        {label}
      </Label>
      {children || (
        <>
          {type === 'textarea' ? (
            <Textarea
              id={name}
              name={name}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder={placeholder}
              autoFocus={autoFocus}
              disabled={disabled}
              className={cn(error && 'input-error')}
            />
          ) : (
            <Input
              id={name}
              name={name}
              type={type}
              value={value}
              defaultValue={defaultValue}
              onChange={handleChange}
              onBlur={onBlur}
              placeholder={placeholder}
              autoFocus={autoFocus}
              disabled={disabled}
              className={cn(error && 'input-error')}
            />
          )}
        </>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}
