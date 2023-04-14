const getApplicableCharges = (data: []) => {
  return data.map((item: any) => {
    return item?.charge_name
  })
}

export default getApplicableCharges
