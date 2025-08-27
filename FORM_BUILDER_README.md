# Form Builder Component

The Form Builder component is a dynamic, schema-driven form rendering system that replaces hardcoded forms across all pages in the Gradian CRM application.

## Features

- **Dynamic Form Generation**: Renders forms based on JSON schemas
- **Multiple Field Types**: Supports text, email, password, number, select, checkbox, radio, date, time, textarea, and more
- **Validation**: Built-in client-side validation with customizable rules
- **Flexible Layouts**: Vertical, horizontal, and grid layouts
- **Responsive Design**: Automatically adapts to different screen sizes
- **Reusable Schemas**: Common form schemas can be shared across pages

## Usage

### Basic Implementation

```tsx
import FormBuilder from '@/components/form-builder'
import { contactFormSchema } from '@/lib/form-schemas'

function MyPage() {
  return (
    <FormBuilder 
      schema={contactFormSchema}
      onSubmit={async (data) => {
        console.log('Form submitted:', data)
        // Handle form submission
      }}
    />
  )
}
```

### Schema Structure

```tsx
interface FormSchema {
  title?: string
  description?: string
  fields: FormField[]
  submitText?: string
  onSubmit?: (data: Record<string, any>) => void | Promise<void>
  layout?: 'vertical' | 'horizontal' | 'grid'
  columns?: number
  className?: string
}

interface FormField {
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
```

## Available Form Schemas

### 1. Contact Form Schema
- **File**: `lib/form-schemas.ts` - `contactFormSchema`
- **Fields**: First Name, Last Name, Email, Phone, Company, Position
- **Usage**: General contact information forms

### 2. Contract Form Schema
- **File**: `lib/form-schemas.ts` - `contractFormSchema`
- **Fields**: Contract details, dates, values, status, type
- **Usage**: Contract creation and management
- **Page**: `/contracts`

### 3. HCP (Healthcare Provider) Form Schema
- **File**: `lib/form-schemas.ts` - `hcpFormSchema`
- **Fields**: Provider information, specialties, contact details
- **Usage**: Healthcare professional management
- **Page**: `/hcp`

### 4. Sales Lead Form Schema
- **File**: `lib/form-schemas.ts` - `salesLeadFormSchema`
- **Fields**: Lead information, company, source, status, value
- **Usage**: Sales opportunity management
- **Page**: `/sales`

### 5. Field Configuration Schema
- **File**: `lib/form-schemas.ts` - `fieldFormSchema`
- **Fields**: Custom field configuration, types, validation
- **Usage**: Dynamic field creation

### 6. Search Form Schema
- **File**: `lib/form-schemas.ts` - `searchFormSchema`
- **Fields**: Search term, type, status filters
- **Usage**: Advanced search functionality

## Field Types

### Text Fields
- `text`: Standard text input
- `email`: Email input with validation
- `password`: Password input
- `number`: Numeric input
- `tel`: Telephone input
- `url`: URL input

### Date/Time Fields
- `date`: Date picker
- `time`: Time picker
- `datetime-local`: Date and time picker

### Selection Fields
- `select`: Dropdown selection
- `checkbox`: Checkbox input
- `radio`: Radio button group

### Multi-line Fields
- `textarea`: Multi-line text input

## Validation Options

```tsx
validation: {
  pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', // Regex pattern
  min: 0, // Minimum value for numbers
  max: 100, // Maximum value for numbers
  minLength: 2, // Minimum character length
  maxLength: 50 // Maximum character length
}
```

## Layout Options

### Vertical Layout (Default)
```tsx
{
  layout: 'vertical',
  fields: [...]
}
```

### Grid Layout
```tsx
{
  layout: 'grid',
  columns: 2, // 2-column grid
  fields: [...]
}
```

### Horizontal Layout
```tsx
{
  layout: 'horizontal',
  fields: [...]
}
```

## Examples

### Simple Contact Form
```tsx
const simpleContactSchema: FormSchema = {
  title: 'Contact Us',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      validation: { minLength: 2 }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
      validation: { minLength: 10 }
    }
  ],
  submitText: 'Send Message'
}
```

### Advanced Form with Grid Layout
```tsx
const advancedFormSchema: FormSchema = {
  title: 'Advanced Form',
  description: 'This form demonstrates advanced features',
  layout: 'grid',
  columns: 2,
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      validation: { minLength: 2, maxLength: 50 }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      validation: { minLength: 2, maxLength: 50 }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validation: { pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      validation: { pattern: '^[+]?[0-9\\s\\-()]{10,}$' }
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      required: true,
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' }
      ]
    },
    {
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkbox',
      defaultValue: false
    }
  ],
  submitText: 'Submit Form'
}
```

## Integration with Existing Pages

### Before (Hardcoded Form)
```tsx
<DialogContent className="max-w-2xl">
  <DialogHeader>
    <DialogTitle>Create New Contract</DialogTitle>
    <DialogDescription>Add a new contract</DialogDescription>
  </DialogHeader>
  <div className="grid gap-4 py-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Contract Title</label>
        <Input placeholder="Enter title" />
      </div>
      {/* More hardcoded fields... */}
    </div>
  </div>
  <div className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Create Contract</Button>
  </div>
</DialogContent>
```

### After (Form Builder)
```tsx
<DialogContent className="max-w-4xl">
  <DialogHeader>
    <DialogTitle>Create New Contract</DialogTitle>
    <DialogDescription>Add a new contract</DialogDescription>
  </DialogHeader>
  <FormBuilder 
    schema={contractFormSchema}
    onSubmit={async (data) => {
      console.log('New contract created:', data)
      // Handle submission
    }}
  />
</DialogContent>
```

## Benefits

1. **Maintainability**: Single component to maintain instead of multiple hardcoded forms
2. **Consistency**: Uniform look and feel across all forms
3. **Reusability**: Schemas can be shared and reused
4. **Flexibility**: Easy to modify forms by changing schemas
5. **Validation**: Centralized validation logic
6. **Accessibility**: Built-in accessibility features
7. **Responsiveness**: Automatic responsive behavior

## Customization

### Styling
The component uses Tailwind CSS classes and can be customized through the `className` prop:

```tsx
<FormBuilder 
  schema={mySchema}
  className="max-w-2xl mx-auto"
/>
```

### Field Styling
Individual fields can be styled through the `className` property in the field definition:

```tsx
{
  name: 'customField',
  label: 'Custom Field',
  type: 'text',
  className: 'bg-blue-50 border-blue-200'
}
```

### Custom Validation
Add custom validation patterns and rules:

```tsx
{
  name: 'phone',
  label: 'Phone Number',
  type: 'tel',
  validation: {
    pattern: '^[+]?[0-9\\s\\-()]{10,}$',
    helpText: 'Enter a valid phone number with country code'
  }
}
```

## Migration Guide

### Step 1: Import Components
```tsx
import FormBuilder from '@/components/form-builder'
import { appropriateSchema } from '@/lib/form-schemas'
```

### Step 2: Replace Form Content
Replace the hardcoded form HTML with the FormBuilder component.

### Step 3: Update Dialog Size
Change dialog size from `max-w-2xl` to `max-w-4xl` to accommodate the form builder.

### Step 4: Test Functionality
Ensure the form submission and validation work as expected.

## Future Enhancements

- **File Upload**: Support for file input fields
- **Conditional Fields**: Show/hide fields based on other field values
- **Multi-step Forms**: Wizard-style form progression
- **Form Templates**: Pre-built form templates for common use cases
- **API Integration**: Direct API schema generation
- **Real-time Validation**: Server-side validation feedback
- **Form Analytics**: Track form completion rates and user behavior

## Troubleshooting

### Common Issues

1. **Form not rendering**: Check that the schema is properly imported and structured
2. **Validation not working**: Ensure validation rules are correctly formatted
3. **Styling issues**: Verify Tailwind CSS classes are available
4. **Submit not working**: Check that the onSubmit function is properly defined

### Debug Mode
Enable console logging to debug form behavior:

```tsx
<FormBuilder 
  schema={mySchema}
  onSubmit={(data) => {
    console.log('Form data:', data)
    console.log('Schema:', mySchema)
  }}
/>
```

## Support

For questions or issues with the Form Builder component, refer to:
- Component source: `components/form-builder.tsx`
- Schema definitions: `lib/form-schemas.ts`
- Demo page: `/form-builder-demo`
- This documentation 