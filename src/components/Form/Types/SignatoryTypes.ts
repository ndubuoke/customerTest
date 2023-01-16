import { PrefillerIDTypeType } from 'src/hooks/useIdFormPrefiller'

export type SignatoryDetailsType = {
  // 'Identification Method': string
  // 'ID Number': string
  id?: string | number
  Title: string
  Surname: string
  'First Name': string
  'Other Names': string
  "Mother's Maiden Name": string
  'Date of Birth': string
  'Marital Status': string
  Gender: string
  Nationality: string
  'State of Origin': string
  LGA: string

  'Dual Citizenship': string
  'If yes, specify': string
  'Residential Address': string
  'Detailed Description of Address': string
  Country: string
  State: string
  'City/Town': string
  'LGA-RA': string
  'P.O. Box': string
  'Mobile Number': string
  'Alternate Phone Number': string
  'Email address': string
  'Means of Identification': PrefillerIDTypeType | ''
  'ID Number': string
  'ID Issue Date': string
  'ID Expiry Date': string
  'Employment Status': string
  'Nature of Business/Occupation': string
  'Position/Rank': string
  'Upload Passport Photograph': any
  'Upload Proof of Identity': any
  'Upload Proof of Address': any
}

export type SignatoryDetailType =
  | 'Identification Method'
  | 'ID Number'
  | 'Title'
  | 'Surname'
  | 'First Name'
  | 'Other Names'
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
  | 'Position/Rank'
  | 'Upload Passport Photograph'
  | 'Upload Proof of Identity'
  | 'Upload Proof of Address'

export type SignatoryInitialDetailsType = {
  // 'Identification Method': string
  // 'ID Number': string
  id?: string | number
  title: string
  surname: string
  firstName: string
  otherNames: string
  mothersMaidenName: string
  dateOfBirth: string
  maritalStatus: string
  gender: string
  nationality: string
  stateOfOrigin: string
  lGA: string

  dualCitizenship: string
  ifYesSpecify: string
  residentialAddress: string
  detailedDescriptionOfAddress: string
  country: string
  state: string
  cityTown: string
  lGARA: string
  pOBox: string
  mobileNumber: string
  alternatePhoneNumber: string
  emailAddress: string
  meansOfIdentification: PrefillerIDTypeType | ''
  iDNumber: string
  iDIssueDate: string
  iDExpiryDate: string
  employmentStatus: string
  natureOfBusinessOccupation: string
  positionRank: string
  uploadPassportPhotograph: any
  uploadProofOfIdentity: any
  uploadProofOfAddress: any
}

export type SignatoryInitialDetailType =
  | 'Identification Method'
  | 'ID Number'
  | 'Title'
  | 'Surname'
  | 'First Name'
  | 'Other Names'
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
  | 'Position/Rank'
  | 'Upload Passport Photograph'
  | 'Upload Proof of Identity'
  | 'Upload Proof of Address'
