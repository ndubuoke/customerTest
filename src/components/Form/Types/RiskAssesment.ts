export type CreateCustomerDataItem = {
  sectionName: string
  data: any
}
export type CreateCustomer = {
  data: {
    customerData: CreateCustomerDataItem[]
    waiverData: {
      initiator: string
      initiatorId: string
      justification: string
      type: 'documentation' | 'creation'
      documents: string[]
    }
    requestData: {
      initiator: string
      initiatorId: string
      requestType: 'creation' | 'maker'
    }
  }
}
