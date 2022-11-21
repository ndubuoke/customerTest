export type UserInputData = {}

export type FormSectionType = {
  sectionName: string
  data: {}
  sectionId: string | number
  pageId: string | number
}

export type FormStrutureType = {
  data: {
    customerData: Array<FormSectionType> | Array<{}>
    formInfomation: {
      formId: string | number
      formType: string | number
    }
    waiverData: {
      initiator: string
      initiatorId: string
      justification: string
      type: string
      documents: Array<string>
    }
    requestData: {
      initiator: string
      initiatorId: string
      requestType: string //'creation'
    }
  }
}
