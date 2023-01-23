// export type AdditionalDetailsType = {
//   bankName: string
//   bankAddress: string
//   accountName: string
//   accountNumber: string
//   dateOfCreation: string
//   accountStatus: string
// }
export type AdditionalDetailsType = {
  id?: string | number
  'Bank/Branch Name': string
  'Bank/Branch Address': string
  'Account Name': string
  'Account Number': string
  'Date of Creation': string
  'Account Status': 'active' | 'dormant'
}
export type AffiliatedCompanyDetailsType = {
  id?: string | number
  'Name of Company/Body 1': string
  'Name of Company/Body 2': string
  'Name of Company/Body 3': string
  "Parent Company's Country of Incorporation": string
}

export type AdditionalDetailType =
  | 'Bank/Branch Name'
  | 'Bank/Branch Address'
  | 'Account Name'
  | 'Account Number'
  | 'Date of Creation'
  | 'Account Status'

export type AffiliatedCompanyDetailType =
  | 'Name of Company/Body 1'
  | 'Name of Company/Body 2'
  | 'Name of Company/Body 3'
  | "Parent Company's Country of Incorporation"

export type AdditionalDetailField = {
  id: string
  type: 'dropdown' | 'text' | 'date' | 'textarea'
  defaultValue: string
  value: string
  error: string
  required: 'on' | 'off'
  colSpan: number
  fieldLabel: AdditionalDetailType
  placeholder: string
  options?: string[]
  maxLength?: number
  apiProperty?: string
}
export type AffiliatedCompanyDetailField = {
  id: string
  type: 'dropdown' | 'text'
  defaultValue: string
  value: string
  error: string
  required: 'on' | 'off'
  colSpan: number
  fieldLabel: AffiliatedCompanyDetailType
  placeholder: string
  options?: string[]
  maxLength?: number
  apiProperty?: string
}
