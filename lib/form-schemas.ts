import { FormSchema } from '@/components/form-builder'

// Contact Form Schema
export const contactFormSchema: FormSchema = {
  title: 'Contact Information',
  description: 'Enter the contact details for this record.',
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter first name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Enter last name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      required: true,
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
      }
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter phone number',
      validation: {
        pattern: '^[+]?[0-9\\s\\-()]{10,}$'
      }
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Enter company name',
      validation: {
        maxLength: 100
      }
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      placeholder: 'Enter job position',
      validation: {
        maxLength: 100
      }
    }
  ],
  submitText: 'Save Contact',
  onSubmit: async (data) => {
    console.log('Contact saved:', data)
    // API call would go here
  }
}

// Contract Form Schema
export const contractFormSchema: FormSchema = {
  title: 'Contract Details',
  description: 'Fill in the contract information.',
  layout: 'grid',
  columns: 2,
  fields: [
    {
      name: 'contractNumber',
      label: 'Contract Number',
      type: 'text',
      placeholder: 'Enter contract number',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20
      }
    },
    {
      name: 'contractType',
      label: 'Contract Type',
      type: 'select',
      required: true,
      options: [
        { value: 'service', label: 'Service Contract' },
        { value: 'sales', label: 'Sales Contract' },
        { value: 'partnership', label: 'Partnership Agreement' },
        { value: 'nda', label: 'Non-Disclosure Agreement' }
      ]
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true
    },
    {
      name: 'value',
      label: 'Contract Value',
      type: 'number',
      placeholder: 'Enter amount',
      validation: {
        min: 0
      }
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'select',
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'GBP', label: 'GBP' },
        { value: 'JPY', label: 'JPY' }
      ],
      defaultValue: 'USD'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'pending', label: 'Pending Review' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'terminated', label: 'Terminated' }
      ],
      defaultValue: 'draft'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter contract description',
      validation: {
        maxLength: 500
      }
    }
  ],
  submitText: 'Save Contract',
  onSubmit: async (data) => {
    console.log('Contract saved:', data)
    // API call would go here
  }
}

// HCP (Healthcare Provider) Form Schema
export const hcpFormSchema: FormSchema = {
  title: 'Healthcare Provider Information',
  description: 'Enter the healthcare provider details.',
  fields: [
    {
      name: 'providerName',
      label: 'Provider Name',
      type: 'text',
      placeholder: 'Enter provider name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'providerType',
      label: 'Provider Type',
      type: 'select',
      required: true,
      options: [
        { value: 'physician', label: 'Physician' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'pharmacist', label: 'Pharmacist' },
        { value: 'therapist', label: 'Therapist' },
        { value: 'specialist', label: 'Specialist' }
      ]
    },
    {
      name: 'licenseNumber',
      label: 'License Number',
      type: 'text',
      placeholder: 'Enter license number',
      validation: {
        minLength: 5,
        maxLength: 20
      }
    },
    {
      name: 'specialization',
      label: 'Specialization',
      type: 'text',
      placeholder: 'Enter specialization',
      validation: {
        maxLength: 100
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter phone number',
      required: true
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      placeholder: 'Enter address',
      validation: {
        maxLength: 200
      }
    },
    {
      name: 'isActive',
      label: 'Active Provider',
      type: 'checkbox',
      defaultValue: true
    }
  ],
  submitText: 'Save Provider',
  onSubmit: async (data) => {
    console.log('Provider saved:', data)
    // API call would go here
  }
}

// Sales Lead Form Schema
export const salesLeadFormSchema: FormSchema = {
  title: 'Sales Lead Information',
  description: 'Capture new sales lead details.',
  layout: 'grid',
  columns: 2,
  fields: [
    {
      name: 'leadName',
      label: 'Lead Name',
      type: 'text',
      placeholder: 'Enter lead name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Enter company name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      placeholder: 'Enter phone number',
      required: true
    },
    {
      name: 'leadSource',
      label: 'Lead Source',
      type: 'select',
      required: true,
      options: [
        { value: 'website', label: 'Website' },
        { value: 'referral', label: 'Referral' },
        { value: 'social', label: 'Social Media' },
        { value: 'cold-call', label: 'Cold Call' },
        { value: 'event', label: 'Event' },
        { value: 'other', label: 'Other' }
      ]
    },
    {
      name: 'leadStatus',
      label: 'Lead Status',
      type: 'select',
      required: true,
      options: [
        { value: 'new', label: 'New' },
        { value: 'contacted', label: 'Contacted' },
        { value: 'qualified', label: 'Qualified' },
        { value: 'proposal', label: 'Proposal Sent' },
        { value: 'negotiation', label: 'Negotiation' },
        { value: 'closed', label: 'Closed' }
      ],
      defaultValue: 'new'
    },
    {
      name: 'estimatedValue',
      label: 'Estimated Value',
      type: 'number',
      placeholder: 'Enter estimated value',
      validation: {
        min: 0
      }
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'textarea',
      placeholder: 'Enter additional notes',
      validation: {
        maxLength: 500
      }
    }
  ],
  submitText: 'Save Lead',
  onSubmit: async (data) => {
    console.log('Lead saved:', data)
    // API call would go here
  }
}

// Field (Custom Field) Form Schema
export const fieldFormSchema: FormSchema = {
  title: 'Custom Field Configuration',
  description: 'Configure custom fields for your CRM.',
  fields: [
    {
      name: 'fieldName',
      label: 'Field Name',
      type: 'text',
      placeholder: 'Enter field name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        pattern: '^[a-zA-Z][a-zA-Z0-9_]*$'
      },
      helpText: 'Field name must start with a letter and contain only letters, numbers, and underscores'
    },
    {
      name: 'displayName',
      label: 'Display Name',
      type: 'text',
      placeholder: 'Enter display name',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'fieldType',
      label: 'Field Type',
      type: 'select',
      required: true,
      options: [
        { value: 'text', label: 'Text' },
        { value: 'number', label: 'Number' },
        { value: 'email', label: 'Email' },
        { value: 'phone', label: 'Phone' },
        { value: 'date', label: 'Date' },
        { value: 'select', label: 'Select' },
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'textarea', label: 'Text Area' }
      ]
    },
    {
      name: 'isRequired',
      label: 'Required Field',
      type: 'checkbox',
      defaultValue: false
    },
    {
      name: 'defaultValue',
      label: 'Default Value',
      type: 'text',
      placeholder: 'Enter default value'
    },
    {
      name: 'helpText',
      label: 'Help Text',
      type: 'textarea',
      placeholder: 'Enter help text for users',
      validation: {
        maxLength: 200
      }
    },
    {
      name: 'isActive',
      label: 'Active Field',
      type: 'checkbox',
      defaultValue: true
    }
  ],
  submitText: 'Save Field',
  onSubmit: async (data) => {
    console.log('Field saved:', data)
    // API call would go here
  }
}

// Generic Search Form Schema
export const searchFormSchema: FormSchema = {
  title: 'Search',
  description: 'Search for records in the system.',
  layout: 'grid',
  columns: 3,
  fields: [
    {
      name: 'searchTerm',
      label: 'Search Term',
      type: 'text',
      placeholder: 'Enter search term',
      required: true
    },
    {
      name: 'searchType',
      label: 'Search Type',
      type: 'select',
      options: [
        { value: 'all', label: 'All Records' },
        { value: 'contacts', label: 'Contacts' },
        { value: 'contracts', label: 'Contracts' },
        { value: 'hcp', label: 'Healthcare Providers' },
        { value: 'sales', label: 'Sales Leads' }
      ],
      defaultValue: 'all'
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' }
      ],
      defaultValue: 'all'
    }
  ],
  submitText: 'Search',
  onSubmit: async (data) => {
    console.log('Search executed:', data)
    // Search logic would go here
  }
} 