const getRequestDetail = (request, field: string): string | string[] | '' => {
  if (field === 'surname') {
    return request?.data?.customerData.map((detail) => {
      return detail?.surname
    })
  }
  if (field === 'firstName') {
    return request?.data?.customerData.map((detail) => {
      return detail?.firstName
    })
  }
}


export default getRequestDetail