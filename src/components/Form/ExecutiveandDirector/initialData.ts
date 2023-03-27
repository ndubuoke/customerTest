import { useState } from 'react'
import { generateID } from 'Utilities/generateId'
import { ExecutiveField } from '../Types/ExecutiveTypes'

export const executiveDetailsInitial = (): ExecutiveField[] => [
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Means of Identification',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'Select ',
    options: ['BVN', 'PVC', 'Drivers license', 'NIN'],
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Enter ID Number',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 2,
    placeholder: 'ID Number',
    maxLength: 20, 
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Title',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'select',
    options: ['mr', 'mrs', 'pastor'],
    apiProperty: 'title',
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Enter Surname',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'enter surname',
    maxLength: 90,
    apiProperty: 'lastName',
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Enter FirstName',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter First name',
    maxLength: 90,
    apiProperty: 'firstName',
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Enter Other Names',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 2,
    placeholder: 'Enter Other Names',
    maxLength: 90,
  },
  {
    id: generateID(),
    type: 'date',
    fieldLabel: 'Date of Birth',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: '',
    apiProperty: 'dateOfBirth',
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: "Mother's Maiden Name",
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 2,
    placeholder: 'Enter Name',
    maxLength: 30,
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Gender',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Select ',
    options: ['male', 'female', 'others'],
    apiProperty: 'gender',
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Residential Address',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 2,
    placeholder: 'Enter Address',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Marital Status',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Select ',
    options: ['Single', 'Married', 'Complicated', 'Divorced'],
  },
  {
    id: generateID(),
    type: 'textarea',
    fieldLabel: 'Detailed Description of Address',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 3,
    placeholder: 'Enter Description ',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Mobile Number',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'Enter Mobile Number',
    maxLength: 160,
    apiProperty: 'mobile',
  },

  {
    id: generateID(),
    type: 'date',
    fieldLabel: 'ID Issue Date',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: '',
    maxLength: 30,
  },
  {
    id: generateID(),
    type: 'date',
    fieldLabel: 'ID Expiry Date',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: '',
    maxLength: 30,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Biometric ID Number',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'Biometric ID Number',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Nationality',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'Enter Nationality',
    apiProperty: 'country',
    options: ['Nigeria', 'Ghana', 'Algeria', 'Egypt'],
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'State of Origin',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter State of Origin',
    options: ['Nigeria', 'Ghana', 'Algeria', 'Egypt'],
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'LGA',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter LGA',
    options: ['Nigeria', 'Ghana', 'Algeria', 'Egypt'],
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'City/Town',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter City/Town',
    maxLength: 160,
    options: ['Nigeria', 'Ghana', 'Algeria', 'Egypt'],
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Occupation',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter Occupation',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Status/Job Title',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter Status/Job Title',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Position/office of the officer',
    defaultValue: '',
    value: '',
    error: '',
    required: 'on',
    colSpan: 1,
    placeholder: 'Enter Position',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'dropdown',
    fieldLabel: 'Do you have Dual Citizenship',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Select ',
    options: ['yes', 'no'],
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'If yes, specify',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: '',
    maxLength: 160,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Social Secret Number',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter SSN',
    maxLength: 30,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Employee Identification Number',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter EIN',
    maxLength: 30,
  },
  {
    id: generateID(),
    type: 'text',
    fieldLabel: 'Percentage Holding',
    defaultValue: '',
    value: '',
    error: '',
    required: 'off',
    colSpan: 1,
    placeholder: 'Enter Percentage Holding',
    maxLength: 3,
  },
]
