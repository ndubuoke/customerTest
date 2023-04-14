const getApplicableTaxes = (data: []) => {
  return data.map((item: any) => {
    return item?.tax_name
  })
}

export default getApplicableTaxes
