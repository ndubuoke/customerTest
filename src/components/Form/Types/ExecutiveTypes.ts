export type ExecutiveDetailsType = {
  // 'Identification Method': string
  // 'ID Number': string
  id?: string | number
  Title: string
  'Enter Surname': string
  'Enter FirstName': string
  'Enter Other Names': string
  "Mother's Maiden Name": string
  'Date of Birth': string
  'Marital Status': string
  Gender: string
  Nationality: string
  'State of Origin': string
  'Enter LGA': string

  'Do you have Dual Citizenship': string
  'If yes, specify': string
  'Residential Address': string
  'Detailed Description of Address': string
  Country: string
  State: string
  'City/Town': string
  'P.O. Box': string
  'Mobile Number': string
  'Alternate Phone Number': string
  'Email address': string
  'Means of Identification': string
  'Enter ID Number': string
  'ID Issue Date': string
  'ID Expiry Date': string
  'Employment Status': string
  'Nature of Business/Occupation': string
  Occupation: string
  'Social Secret Number': string
  'Employee Identification Number': string
  'Percentage Holding': string
  'Position/office of the officer': string
  'Status/Job Title': string
}

export type ExecutiveDetailType =
  | 'Identification Method'
  | 'ID Number'
  | 'Title'
  | 'Enter Surname'
  | 'Enter FirstName'
  | 'Enter Other Names'
  | "Mother's Maiden Name"
  | 'Date of Birth'
  | 'Marital Status'
  | 'Gender'
  | 'Nationality'
  | 'State of Origin'
  | 'LGA'
  | 'Dual Citizenship'
  | 'If yes, specify'
  | 'Residential Address'
  | 'Detailed Description of Address'
  | 'Country'
  | 'State'
  | 'City/Town'
  | 'LGA-RA'
  | 'P.O. Box'
  | 'Mobile Number'
  | 'Alternate Phone Number'
  | 'Email address'
  | 'Means of Identification'
  | 'ID Number'
  | 'ID Issue Date'
  | 'ID Expiry Date'
  | 'Employment Status'
  | 'Nature of Business/Occupation'
  | 'Percentage Holding'
  | 'Employee Identification Number'
  | 'Social Secret Number'
  | 'Do you have Dual Citizenship'
  | 'Position/office of the officer'
  | 'Status/Job Title'
  | 'Occupation'
  | 'State of Origin'
  | 'Biometric ID Number'
  | 'Enter ID Number'

export type ExecutiveField = {
  id: string
  type: 'dropdown' | 'text' | 'date' | 'textarea'
  defaultValue: string
  value: string
  error: string
  required: 'on' | 'off'
  colSpan: number
  fieldLabel: ExecutiveDetailType
  placeholder: string
  options?: string[]
  maxLength?: number
}
