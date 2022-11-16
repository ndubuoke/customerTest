const getCustomerDetail = (customer, field) => {
  if (field === 'surname') {
    return customer.customer_profiles.map((profile) => {
      return profile.surname
    })
  }
  if (field === 'mobileNumber') {
    return customer.customer_profiles.map((profile) => {
      return profile.mobileNumber
    })
  }
  if (field === 'firstName') {
    return customer.customer_profiles.map((profile) => {
      return profile.firstName
    })
  }
  if (field === 'emailAddress') {
    return customer.customer_profiles.map((profile) => {
      return profile.emailAddress
    })
  }
  if (field === 'customerEntityId') {
    return customer.customer_profiles.map((profile) => {
      return profile.customerEntityId
    })
  }

  if (field === 'motherMaidenName') {
    return customer.customer_profiles.map((profile) => {
      return profile.motherMaidenName
    })
  }
  if (field === 'otherNames') {
    return customer.customer_profiles.map((profile) => {
      return profile.otherNames
    })
  }
  if (field === 'customerId') {
    return customer.customer_profiles.map((profile) => {
      return profile.customerId.slice(0, 10)
    })
  }
   if (field === 'bvn') {
     return customer.customer_profiles.map((profile) => {
       return profile.bvn
     })
   }
   if (field === 'riskStatus') {
     return customer.customer_profiles.map((profile) => {
       return profile.riskStatus
     })
   }
   if (field === 'customerGroups') {
     return customer.customer_profiles.map((profile) => {
       return profile.customerGroups
     })
   }
}

export default getCustomerDetail
