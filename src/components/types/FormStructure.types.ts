export type FormSectionType = {
  sectionName: string
  data: {} // firstName: "Bonaventure"
  sectionId: string | number
  pageId: string | number
}

export type FormStructureType = {
  data: {
    customerData: Array<FormSectionType>
    formInfomation: {
      formId: string | number
      formType: string | number
    }
    waiverData: {
      initiator: string
      initiatorId: string
      justification: string
      type: string | 'documentation' | 'edd'
      documents: Array<string>
    }
    requestData: {
      initiator: string
      initiatorId: string
      requestType: string //'creation'
    }
  }
}
