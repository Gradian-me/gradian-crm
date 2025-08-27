'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime-local'
  placeholder?: string
  required?: boolean
  validation?: {
    pattern?: string
    min?: number
    max?: number
    minLength?: number
    maxLength?: number
  }
  options?: Array<{ value: string; label: string }>
  defaultValue?: any
  helpText?: string
  disabled?: boolean
  className?: string
}

export interface FormSchema {
  title?: string
  description?: string
  fields: FormField[]
  submitText?: string
  onSubmit?: (data: Record<string, any>) => void | Promise<void>
  layout?: 'vertical' | 'horizontal' | 'grid'
  columns?: number
  className?: string
}

interface FormBuilderProps {
  schema: FormSchema
  initialData?: Record<string, any>
  className?: string
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  schema,
  initialData = {},
  className = ''
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || value === '')) {
      return `${field.label} is required`
    }

    if (field.validation) {
      const { pattern, min, max, minLength, maxLength } = field.validation

      if (pattern && value && !new RegExp(pattern).test(value)) {
        return `${field.label} format is invalid`
      }

      if (min !== undefined && value !== '' && Number(value) < min) {
        return `${field.label} must be at least ${min}`
      }

      if (max !== undefined && value !== '' && Number(value) > max) {
        return `${field.label} must be at most ${max}`
      }

      if (minLength !== undefined && value && value.length < minLength) {
        return `${field.label} must be at least ${minLength} characters`
      }

      if (maxLength !== undefined && value && value.length > maxLength) {
        return `${field.label} must be at most ${maxLength} characters`
      }
    }

    return ''
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    schema.fields.forEach(field => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (schema.onSubmit) {
      setIsSubmitting(true)
      try {
        await schema.onSubmit(formData)
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name]
    const fieldValue = formData[field.name] ?? field.defaultValue ?? ''

    const commonProps = {
      id: field.name,
      name: field.name,
      value: fieldValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleInputChange(field.name, e.target.value),
      placeholder: field.placeholder,
      required: field.required,
      disabled: field.disabled,
      className: `w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${field.className || ''} ${fieldError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`
    }

    const selectProps = {
      value: fieldValue,
      onValueChange: (value: string) => handleInputChange(field.name, value),
      disabled: field.disabled
    }

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            rows={4}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${fieldError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
          />
        )

      case 'select':
        return (
          <Select {...selectProps}>
            <SelectTrigger className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors ${fieldError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={fieldValue}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
            disabled={field.disabled}
            className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700"
          />
        )

      case 'radio':
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={fieldValue === option.value}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  disabled={field.disabled}
                  className="h-5 w-5 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700"
                />
                <span className="text-sm text-gray-900 dark:text-gray-100">{option.label}</span>
              </label>
            ))}
          </div>
        )

      case 'date':
      case 'time':
      case 'datetime-local':
        return (
          <Input
            {...commonProps}
            type={field.type}
          />
        )

      default:
        return (
          <Input
            {...commonProps}
            type={field.type}
          />
        )
    }
  }

  const renderFieldGroup = (fields: FormField[]) => {
    // Always use responsive grid layout for better dialog experience
    const gridClass = schema.layout === 'grid' && schema.columns 
      ? `grid gap-6 ${schema.columns === 2 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'}`
      : 'grid gap-6 grid-cols-1 lg:grid-cols-2'

    return (
      <div className={gridClass}>
        {fields.map((field) => (
          <div key={field.name} className="space-y-3">
            <label htmlFor={field.name} className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors[field.name]}
              </p>
            )}
            {field.helpText && (
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {field.helpText}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {(schema.title || schema.description) && (
        <div className="mb-6">
          {schema.title && (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {schema.title}
            </h2>
          )}
          {schema.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {schema.description}
            </p>
          )}
        </div>
      )}
      
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderFieldGroup(schema.fields)}
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[120px] bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  schema.submitText || 'Submit'
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormBuilder 