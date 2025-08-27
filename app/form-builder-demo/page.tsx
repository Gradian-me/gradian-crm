'use client'

import React from 'react'
import FormBuilder, { FormSchema } from '@/components/form-builder'

const contactFormSchema: FormSchema = {
  title: 'Contact Form',
  description: 'Fill out the form below to get in touch with us.',
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'Enter your first name',
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
      placeholder: 'Enter your last name',
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
      placeholder: 'Enter your email address',
      required: true,
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter your phone number',
      validation: {
        pattern: '^[+]?[0-9\\s\\-()]{10,}$'
      }
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      required: true,
      options: [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Technical Support' },
        { value: 'billing', label: 'Billing Question' },
        { value: 'feedback', label: 'Feedback' }
      ]
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Enter your message here...',
      required: true,
      validation: {
        minLength: 10,
        maxLength: 1000
      }
    }
  ],
  submitText: 'Send Message',
  onSubmit: async (data) => {
    console.log('Form submitted:', data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Form submitted successfully!')
  }
}

const userProfileSchema: FormSchema = {
  title: 'User Profile',
  description: 'Update your profile information.',
  layout: 'grid',
  columns: 2,
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 20
      }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true
    },
    {
      name: 'dateOfBirth',
      label: 'Date of Birth',
      type: 'date'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Prefer not to say' }
      ]
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      validation: {
        maxLength: 500
      }
    },
    {
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkbox',
      defaultValue: false
    }
  ],
  submitText: 'Update Profile',
  onSubmit: async (data) => {
    console.log('Profile updated:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Profile updated successfully!')
  }
}

const settingsSchema: FormSchema = {
  title: 'Application Settings',
  description: 'Configure your application preferences.',
  fields: [
    {
      name: 'theme',
      label: 'Theme',
      type: 'select',
      required: true,
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'auto', label: 'Auto (System)' }
      ],
      defaultValue: 'auto'
    },
    {
      name: 'language',
      label: 'Language',
      type: 'select',
      required: true,
      options: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'de', label: 'German' }
      ],
      defaultValue: 'en'
    },
    {
      name: 'notifications',
      label: 'Enable Notifications',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'emailNotifications',
      label: 'Email Notifications',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'sessionTimeout',
      label: 'Session Timeout (minutes)',
      type: 'number',
      validation: {
        min: 5,
        max: 480
      },
      defaultValue: 30
    }
  ],
  submitText: 'Save Settings',
  onSubmit: async (data) => {
    console.log('Settings saved:', data)
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Settings saved successfully!')
  }
}

export default function FormBuilderDemo() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Form Builder Demo</h1>
        <p className="text-lg text-gray-600">
          Examples of dynamic forms built with the FormBuilder component
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <FormBuilder schema={contactFormSchema} />
        
        <FormBuilder schema={userProfileSchema} />
        
        <FormBuilder schema={settingsSchema} />
      </div>
    </div>
  )
} 