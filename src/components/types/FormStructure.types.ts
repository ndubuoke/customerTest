import { SignatoryDetailsType } from 'Components/Form/Types/SignatoryTypes'

export type FormSectionType = {
  sectionName: string
  data: {} // firstName: "Bonaventure"
  sectionId: string | number
  pageId: string | number
}

export type WaiverDataType = {
  initiator: string
  initiatorId: string
  justification: string
  type: string | 'documentation' | 'edd'
  documents: Array<string>
}

export type FormStructureType = {
  data: {
    customerData: Array<FormSectionType>
    formInfomation: {
      formId: string | number
      formType: string | number
    }
    waiverData: Array<WaiverDataType>
    requestData: {
      initiator: string
      initiatorId: string
      requestType: string //'creation'
    }
    signatoryData?: [
      {
        sectionName: 'Account Signatory Details'
        data: Array<SignatoryDetailsType>
      }
    ]
  }
}
